import { motion } from 'framer-motion';

/**
 * MessageChannelDiagram - UML-style diagram
 * Shows direct port-to-port communication
 */
export const MessageChannelDiagram = () => {
    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Main diagram */}
            <div className="grid grid-cols-3 gap-4 items-center">
                {/* Host App */}
                <motion.div
                    className="glass p-4 rounded-lg border-2 border-[#06b6d4]/50 text-center"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="text-[var(--accent-cyan)] font-bold mb-2">Host App</div>
                    <div className="text-xs text-[var(--text-secondary)]">
                        const channel = new MessageChannel();<br />
                        <span className="text-[var(--accent-green)]">port1</span>.onmessage = ...
                    </div>
                </motion.div>

                {/* Arrows */}
                <motion.div
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center gap-2 text-[var(--accent-cyan)]">
                        <span className="text-sm font-mono">port1</span>
                        <span>←→</span>
                        <span className="text-sm font-mono text-[var(--accent-green)]">port2</span>
                    </div>
                    <div className="w-full h-0.5 bg-gradient-to-r from-[#06b6d4] to-[#22c55e]" />
                    <div className="text-xs text-[var(--text-muted)]">2 chiều trực tiếp</div>
                </motion.div>

                {/* Iframe/Worker */}
                <motion.div
                    className="glass p-4 rounded-lg border-2 border-[#22c55e]/50 text-center"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="text-[var(--accent-green)] font-bold mb-2">Iframe / Worker</div>
                    <div className="text-xs text-[var(--text-secondary)]">
                        window.onmessage = (e) =&gt;<br />
                        e.ports[0].postMessage(...)
                    </div>
                </motion.div>
            </div>

            {/* Code snippet */}
            <motion.div
                className="mt-6 glass p-4 rounded-lg font-mono text-xs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="text-[var(--text-muted)]">// Khởi tạo</div>
                <div>const <span className="text-[var(--accent-purple)]">channel</span> = new <span className="text-[var(--accent-cyan)]">MessageChannel</span>();</div>
                <div>iframe.<span className="text-[var(--accent-green)]">postMessage</span>('init', '*', [channel.<span className="text-[var(--accent-orange)]">port2</span>]);</div>
            </motion.div>
        </div>
    );
};

export default MessageChannelDiagram;
