import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SlideProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'title' | 'section' | 'code' | 'diagram';
    slideNumber?: number;
    totalSlides?: number;
    title?: string;
    sectionSlideNumber?: number;
    sectionTotalSlides?: number;
}

const slideVariants = {
    initial: { opacity: 0, scale: 0.98, filter: 'blur(10px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 1.02, filter: 'blur(10px)' }
};

export const Slide = ({
    children,
    className = '',
    variant: _variant = 'default',
    slideNumber,
    totalSlides,
    title,
    sectionSlideNumber,
    sectionTotalSlides
}: SlideProps) => {
    return (
        <motion.div
            className={`
                relative w-full h-full flex flex-col overflow-hidden
                ${className}
            `}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
            {/* Animated background orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)' }}
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(0, 212, 255, 0.12) 0%, transparent 70%)' }}
                    animate={{
                        x: [0, -40, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 25, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(255, 107, 203, 0.1) 0%, transparent 70%)' }}
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
                />
            </div>

            {/* Header with glass effect */}
            {(title || slideNumber) && (
                <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-10 py-5 z-10">
                    {title && (
                        <motion.div
                            className="flex items-center gap-3 px-4 py-2 rounded-2xl glass-frost"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <span className="w-1 h-5 rounded-full bg-gradient-to-b from-[var(--accent-purple)] to-[var(--accent-pink)]" />
                            <span className="text-base font-medium bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-pink)] bg-clip-text text-transparent">
                                {title}
                            </span>
                            {sectionSlideNumber && sectionTotalSlides && (
                                <span className="text-xs text-[var(--text-muted)] ml-2">
                                    ({sectionSlideNumber}/{sectionTotalSlides})
                                </span>
                            )}
                        </motion.div>
                    )}
                    {slideNumber && totalSlides && (
                        <motion.div
                            className="flex items-center gap-2 px-4 py-2 rounded-2xl glass-frost"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <span className="text-[var(--accent-cyan)] font-bold">{slideNumber}</span>
                            <span className="text-[var(--text-muted)]">/</span>
                            <span className="text-[var(--text-secondary)]">{totalSlides}</span>
                        </motion.div>
                    )}
                </div>
            )}

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center items-center px-8 py-16 relative z-10">
                <div className={`w-full mx-auto flex flex-col items-center ${_variant === 'diagram' ? 'max-w-7xl' : 'max-w-5xl'}`}>
                    {children}
                </div>
            </div>

            {/* Author Watermark - Bottom Left */}
            <div className="absolute bottom-6 left-10 z-10">
                <motion.div
                    className="text-xs text-[var(--text-muted)] opacity-60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="font-medium">Quang Đẹp Trai</div>
                    <div className="text-[10px]">(Trần Ngọc Nhật Quang)</div>
                </motion.div>
            </div>

            {/* Company Logo - Bottom Right */}
            <div className="absolute bottom-6 right-10 z-10">
                <motion.img
                    src="https://www.finviet.com.vn/wp-content/uploads/2024/08/logo-2048x1207.png"
                    alt="FinViet"
                    className="h-8 w-auto object-contain opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.5 }}
                />
            </div>

            {/* Bottom gradient line with glow */}
            <div className="absolute bottom-0 left-0 right-0">
                <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent-purple)] to-transparent opacity-50" />
                <div className="h-8 bg-gradient-to-t from-[var(--accent-purple)]/5 to-transparent blur-xl" />
            </div>

            {/* Subtle corner decorations */}
            <div className="absolute top-8 left-8 opacity-30">
                <div className="w-16 h-px bg-gradient-to-r from-[var(--accent-cyan)] to-transparent" />
                <div className="w-px h-16 bg-gradient-to-b from-[var(--accent-cyan)] to-transparent" />
            </div>
            <div className="absolute top-8 right-8 opacity-30">
                <div className="w-16 h-px bg-gradient-to-l from-[var(--accent-purple)] to-transparent ml-auto" />
                <div className="w-px h-16 bg-gradient-to-b from-[var(--accent-purple)] to-transparent ml-auto" />
            </div>
        </motion.div>
    );
};
