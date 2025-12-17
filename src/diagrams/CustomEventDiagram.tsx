import { motion } from 'framer-motion';

/**
 * CustomEventDiagram - Simple flow diagram
 * Shows CustomEvent dispatch and listen pattern
 */
export const CustomEventDiagram = () => {
    return (
        <div className="w-full">
            <div className="flex flex-col gap-4">
                {/* Remote A */}
                <motion.div
                    className="glass p-3 rounded-lg border-2 border-[#a855f7]/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="text-[var(--accent-purple)] font-bold text-sm">Remote A</div>
                    <div className="text-xs text-[var(--text-muted)]">dispatchEvent()</div>
                </motion.div>

                {/* Arrow down */}
                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex flex-col items-center">
                        <div className="w-0.5 h-6 bg-[var(--accent-purple)]" />
                        <div className="text-xs text-[var(--text-muted)] px-2">CustomEvent</div>
                        <div className="w-0.5 h-6 bg-[var(--accent-purple)]" />
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-[var(--accent-purple)]" />
                    </div>
                </motion.div>

                {/* Window */}
                <motion.div
                    className="glass p-3 rounded-lg border-2 border-[var(--text-muted)]/50 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="font-bold text-sm text-white">window</div>
                    <div className="text-xs text-[var(--text-muted)]">Global event target</div>
                </motion.div>

                {/* Arrow down */}
                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex flex-col items-center">
                        <div className="w-0.5 h-6 bg-[var(--accent-green)]" />
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-[var(--accent-green)]" />
                    </div>
                </motion.div>

                {/* Remote B */}
                <motion.div
                    className="glass p-3 rounded-lg border-2 border-[#22c55e]/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="text-[var(--accent-green)] font-bold text-sm">Remote B</div>
                    <div className="text-xs text-[var(--text-muted)]">addEventListener()</div>
                </motion.div>
            </div>
        </div>
    );
};

export default CustomEventDiagram;
