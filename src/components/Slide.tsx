import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SlideProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'title' | 'section' | 'code' | 'diagram';
    slideNumber?: number;
    totalSlides?: number;
    title?: string;
}

const slideVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
};

const backgroundStyles = {
    default: 'bg-gradient-to-br from-[#1e1e2e] via-[#2d2d44] to-[#1e1e2e]',
    title: 'bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#1e1e2e]',
    section: 'bg-gradient-to-br from-[#2d2d44] via-[#363654] to-[#1e1e2e]',
    code: 'bg-[#1e1e2e]',
    diagram: 'bg-gradient-to-br from-[#1e1e2e] to-[#2d2d44]'
};

export const Slide = ({
    children,
    className = '',
    variant = 'default',
    slideNumber,
    totalSlides,
    title
}: SlideProps) => {
    return (
        <motion.div
            className={`
        relative w-full h-full flex flex-col overflow-hidden
        ${backgroundStyles[variant]}
        ${className}
      `}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
            {/* Header */}
            {(title || slideNumber) && (
                <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-10 py-5 z-10">
                    {title && (
                        <motion.div
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="w-1.5 h-6 bg-[var(--accent-purple)] rounded-full" />
                            <span className="text-lg text-[var(--accent-purple)] font-medium tracking-wide">
                                {title}
                            </span>
                        </motion.div>
                    )}
                    {slideNumber && totalSlides && (
                        <motion.div
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="text-[var(--accent-cyan)] font-bold">{slideNumber}</span>
                            <span className="text-[var(--text-muted)]">/</span>
                            <span className="text-[var(--text-secondary)]">{totalSlides}</span>
                        </motion.div>
                    )}
                </div>
            )}

            {/* Content - NO SCROLL, fit viewport for presentation */}
            <div className="flex-1 flex flex-col justify-center items-center px-16 py-20">
                <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
                    {children}
                </div>
            </div>

            {/* Decorative gradient line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-purple)] to-[var(--accent-pink)]" />

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 opacity-20">
                <div className="absolute top-4 left-4 w-12 h-px bg-gradient-to-r from-[var(--accent-blue)] to-transparent" />
                <div className="absolute top-4 left-4 w-px h-12 bg-gradient-to-b from-[var(--accent-blue)] to-transparent" />
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                <div className="absolute top-4 right-4 w-12 h-px bg-gradient-to-l from-[var(--accent-purple)] to-transparent" />
                <div className="absolute top-4 right-4 w-px h-12 bg-gradient-to-b from-[var(--accent-purple)] to-transparent" />
            </div>
        </motion.div>
    );
};
