import { motion } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';

interface TOCItem {
    title: string;
    slideIndex: number;
    section?: string;
}

interface TableOfContentsProps {
    items: TOCItem[];
    currentSlide: number;
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (slideIndex: number) => void;
}

export const TableOfContents = ({
    items,
    currentSlide,
    isOpen,
    onClose,
    onNavigate
}: TableOfContentsProps) => {
    if (!isOpen) return null;

    // Group items by section
    const sections = items.reduce((acc, item) => {
        const section = item.section || 'Other';
        if (!acc[section]) acc[section] = [];
        acc[section].push(item);
        return acc;
    }, {} as Record<string, TOCItem[]>);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            />

            {/* Modal */}
            <motion.div
                className="relative w-full max-w-5xl max-h-[85vh] overflow-hidden flex flex-col 
                   bg-[#1e1e2e]/95 backdrop-blur-xl rounded-2xl
                   border border-white/10 shadow-2xl shadow-purple-900/20"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-10 py-8 border-b border-white/10">
                    <h2 className="text-3xl font-bold">
                        <span className="text-[var(--accent-purple)]">📋</span> Mục lục
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-3 rounded-xl hover:bg-white/10 transition-all duration-200 
                       hover:scale-105 active:scale-95"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-10 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Object.entries(sections).map(([section, sectionItems], sectionIndex) => (
                            <motion.div
                                key={section}
                                className="bg-white/5 rounded-xl p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: sectionIndex * 0.05 }}
                            >
                                <h3 className="text-xl font-semibold text-[var(--accent-cyan)] mb-4 pb-2 border-b border-white/10">
                                    {section}
                                </h3>
                                <ul className="space-y-2">
                                    {sectionItems.map((item) => {
                                        const isActive = currentSlide === item.slideIndex;
                                        return (
                                            <li key={item.slideIndex}>
                                                <button
                                                    onClick={() => {
                                                        onNavigate(item.slideIndex);
                                                        onClose();
                                                    }}
                                                    className={`
                            w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left
                            transition-all duration-200
                            ${isActive
                                                            ? 'bg-[var(--accent-purple)]/30 border-l-4 border-[var(--accent-purple)] shadow-lg shadow-purple-500/10'
                                                            : 'hover:bg-white/10 hover:translate-x-1'
                                                        }
                          `}
                                                >
                                                    <span className={`text-sm font-mono min-w-[32px] px-2 py-1 rounded-lg text-center
                                          ${isActive ? 'bg-[var(--accent-purple)] text-white' : 'bg-white/10 text-[var(--text-muted)]'}`}>
                                                        {item.slideIndex + 1}
                                                    </span>
                                                    <span className={`flex-1 ${isActive ? 'text-white font-medium' : 'text-[var(--text-secondary)]'}`}>
                                                        {item.title}
                                                    </span>
                                                    {isActive && (
                                                        <ChevronRight className="w-5 h-5 text-[var(--accent-purple)]" />
                                                    )}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-10 py-6 border-t border-white/10 bg-black/20">
                    <div className="flex justify-center items-center gap-6">
                        <span className="text-sm text-[var(--text-muted)] flex items-center gap-2">
                            <kbd className="px-3 py-1.5 rounded-lg bg-white/10 font-mono text-xs border border-white/10">T</kbd>
                            <span>Toggle</span>
                        </span>
                        <span className="w-px h-4 bg-white/20" />
                        <span className="text-sm text-[var(--text-muted)] flex items-center gap-2">
                            <kbd className="px-3 py-1.5 rounded-lg bg-white/10 font-mono text-xs border border-white/10">Esc</kbd>
                            <span>Close</span>
                        </span>
                        <span className="w-px h-4 bg-white/20" />
                        <span className="text-sm text-[var(--text-muted)] flex items-center gap-2">
                            <kbd className="px-3 py-1.5 rounded-lg bg-white/10 font-mono text-xs border border-white/10">←→</kbd>
                            <span>Navigate</span>
                        </span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
