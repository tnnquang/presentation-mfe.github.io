import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize, Minimize, List, Home, Grid3X3 } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

interface NavigationProps {
    currentSlide: number;
    totalSlides: number;
    onNavigate: (slide: number) => void;
    onToggleFullscreen?: () => void;
    onToggleTOC?: () => void;
    isFullscreen?: boolean;
    slideTitles?: string[];
}

export const Navigation = ({
    currentSlide,
    totalSlides,
    onNavigate,
    onToggleFullscreen,
    onToggleTOC,
    isFullscreen = false,
    slideTitles = []
}: NavigationProps) => {
    const [showControls, setShowControls] = useState(true);
    const [showSlidePreview, setShowSlidePreview] = useState(false);

    const goNext = useCallback(() => {
        if (currentSlide < totalSlides - 1) {
            onNavigate(currentSlide + 1);
        }
    }, [currentSlide, totalSlides, onNavigate]);

    const goPrev = useCallback(() => {
        if (currentSlide > 0) {
            onNavigate(currentSlide - 1);
        }
    }, [currentSlide, onNavigate]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowRight':
                case 'PageDown':
                    e.preventDefault();
                    goNext();
                    break;
                case ' ':
                    if (!e.shiftKey) {
                        e.preventDefault();
                        goNext();
                    }
                    break;
                case 'ArrowLeft':
                case 'PageUp':
                    e.preventDefault();
                    goPrev();
                    break;
                case 'Home':
                    e.preventDefault();
                    onNavigate(0);
                    break;
                case 'End':
                    e.preventDefault();
                    onNavigate(totalSlides - 1);
                    break;
                case 'f':
                case 'F':
                    if (!e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                        onToggleFullscreen?.();
                    }
                    break;
                case 'Escape':
                    if (isFullscreen) {
                        onToggleFullscreen?.();
                    }
                    break;
                case 't':
                case 'T':
                    if (!e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                        onToggleTOC?.();
                    }
                    break;
                case 'g':
                case 'G':
                    if (!e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                        setShowSlidePreview(prev => !prev);
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goNext, goPrev, onNavigate, totalSlides, onToggleFullscreen, onToggleTOC, isFullscreen]);

    // Auto-hide controls
    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        const handleMouseMove = () => {
            setShowControls(true);
            clearTimeout(timeout);
            timeout = setTimeout(() => setShowControls(false), 4000);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(timeout);
        };
    }, []);

    const progress = ((currentSlide + 1) / totalSlides) * 100;

    return (
        <>
            {/* Progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-black/30 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: showControls ? 1 : 0.3 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="h-full bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-purple)] to-[var(--accent-pink)] shadow-lg shadow-purple-500/30"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                />
            </motion.div>

            {/* Slide preview grid */}
            {showSlidePreview && (
                <motion.div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowSlidePreview(false)}
                >
                    <div className="grid grid-cols-5 gap-3 max-w-5xl w-full">
                        {Array.from({ length: totalSlides }, (_, i) => (
                            <motion.button
                                key={i}
                                className={`rounded-lg border-2 p-3 text-left
                                   transition-all hover:scale-[1.02]
                                   ${currentSlide === i
                                        ? 'border-[var(--accent-purple)] bg-[var(--accent-purple)]/20 text-white'
                                        : 'border-white/20 bg-white/5 text-[var(--text-muted)] hover:border-white/40 hover:bg-white/10'
                                    }`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.015 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onNavigate(i);
                                    setShowSlidePreview(false);
                                }}
                            >
                                <div className="flex items-start gap-2">
                                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${currentSlide === i ? 'bg-[var(--accent-purple)]' : 'bg-white/20'}`}>
                                        {i + 1}
                                    </span>
                                    <span className="text-xs font-medium line-clamp-2 leading-tight">
                                        {slideTitles[i] || `Slide ${i + 1}`}
                                    </span>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Navigation controls */}
            <motion.div
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: showControls ? 1 : 0,
                    y: showControls ? 0 : 20
                }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex items-center gap-2 p-2 rounded-2xl 
                       bg-[#1e1e2e]/90 backdrop-blur-xl border border-white/10 
                       shadow-2xl shadow-black/50">

                    {/* Home */}
                    <button
                        onClick={() => onNavigate(0)}
                        disabled={currentSlide === 0}
                        className="p-1 rounded-xl hover:bg-white/10 transition-all duration-200 
                       disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                        title="First slide (Home)"
                    >
                        <Home className="w-5 h-5 text-[var(--text-secondary)]" />
                    </button>

                    <div className="w-px h-6 bg-white/10" />

                    {/* Previous */}
                    <button
                        onClick={goPrev}
                        disabled={currentSlide === 0}
                        className="p-1 rounded-xl hover:bg-white/10 transition-all duration-200 
                       disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                        title="Previous (←)"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Slide counter */}
                    <div className="min-w-[100px] text-center p-1 rounded-xl bg-white/5">
                        <span className="text-base font-bold text-[var(--accent-cyan)]">{currentSlide + 1}</span>
                        <span className="text-[var(--text-muted)] mx-1">/</span>
                        <span className="text-base text-[var(--text-secondary)]">{totalSlides}</span>
                    </div>

                    {/* Next */}
                    <button
                        onClick={goNext}
                        disabled={currentSlide === totalSlides - 1}
                        className="p-1 rounded-xl hover:bg-white/10 transition-all duration-200 
                       disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                        title="Next (→)"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    <div className="w-px h-6 bg-white/10" />

                    {/* Grid view */}
                    <button
                        onClick={() => setShowSlidePreview(prev => !prev)}
                        className="p-2.5 rounded-xl hover:bg-white/10 transition-all duration-200 hover:scale-105 active:scale-95"
                        title="Slide overview (G)"
                    >
                        <Grid3X3 className="w-5 h-5 text-[var(--text-secondary)]" />
                    </button>

                    {/* TOC button */}
                    <button
                        onClick={onToggleTOC}
                        className="p-2.5 rounded-xl hover:bg-white/10 transition-all duration-200 hover:scale-105 active:scale-95"
                        title="Table of Contents (T)"
                    >
                        <List className="w-5 h-5 text-[var(--text-secondary)]" />
                    </button>

                    {/* Fullscreen */}
                    <button
                        onClick={onToggleFullscreen}
                        className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95
                       ${isFullscreen ? 'bg-[var(--accent-purple)]/30 text-[var(--accent-purple)]' : 'hover:bg-white/10'}`}
                        title="Fullscreen (F)"
                    >
                        {isFullscreen ? (
                            <Minimize className="w-5 h-5" />
                        ) : (
                            <Maximize className="w-5 h-5 text-[var(--text-secondary)]" />
                        )}
                    </button>
                </div>
            </motion.div>

            {/* Keyboard shortcuts hint (shows on first load) */}
            <motion.div
                className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: 10 }}
                transition={{ delay: 5, duration: 1 }}
            >
                <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-black/50 backdrop-blur-sm text-sm text-[var(--text-muted)]">
                    <span>←→ Navigate</span>
                    <span>•</span>
                    <span>F Fullscreen</span>
                    <span>•</span>
                    <span>T Contents</span>
                    <span>•</span>
                    <span>G Overview</span>
                </div>
            </motion.div>
        </>
    );
};
