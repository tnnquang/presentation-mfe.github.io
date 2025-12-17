import { motion } from 'framer-motion';

/**
 * RSCChallengesDiagram - UML diagram showing RSC vs MF incompatibility
 */
export const RSCChallengesDiagram = () => {
    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-2 gap-8">
                {/* RSC Side */}
                <motion.div
                    className="glass p-4 rounded-xl border border-[var(--accent-purple)]/30"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h3 className="text-[var(--accent-purple)] font-bold mb-4 text-center">
                        React Server Components
                    </h3>
                    <div className="space-y-3">
                        {[
                            { icon: '🖥️', text: 'Render trên Server', desc: 'Không gửi JS về client' },
                            { icon: '📡', text: 'Streaming HTML', desc: 'Partial hydration' },
                            { icon: '🔒', text: 'Server-only code', desc: 'DB queries, secrets' },
                            { icon: '⚡', text: 'Zero JS bundle', desc: 'Cho server components' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-start gap-2 text-xs"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <div>
                                    <div className="text-white font-medium">{item.text}</div>
                                    <div className="text-[var(--text-muted)]">{item.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* MF Side */}
                <motion.div
                    className="glass p-4 rounded-xl border border-[var(--accent-cyan)]/30"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h3 className="text-[var(--accent-cyan)] font-bold mb-4 text-center">
                        Module Federation
                    </h3>
                    <div className="space-y-3">
                        {[
                            { icon: '📦', text: 'JS Bundle', desc: 'Remote là JavaScript' },
                            { icon: '🌐', text: 'Browser Runtime', desc: 'Cần window/document' },
                            { icon: '🔗', text: 'Shared Scope', desc: 'Runtime object sharing' },
                            { icon: '💧', text: 'Full Hydration', desc: 'Client-side bootstrap' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-start gap-2 text-xs"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <div>
                                    <div className="text-white font-medium">{item.text}</div>
                                    <div className="text-[var(--text-muted)]">{item.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Conflict Zone */}
            <motion.div
                className="mt-6 p-4 rounded-xl border-2 border-dashed border-[var(--accent-red)]/50 bg-[var(--accent-red)]/5 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <div className="text-[var(--accent-red)] font-bold mb-2">❌ Xung đột cốt lõi</div>
                <div className="text-xs text-[var(--text-muted)] space-y-1">
                    <p>RSC: "Tôi không gửi JS về client" → MF: "Tôi CẦN JS để chạy"</p>
                    <p>RSC: "Server render xong rồi" → MF: "Tôi cần hydrate lại"</p>
                    <p>RSC: "Streaming partial" → MF: "Tôi cần full bundle loaded"</p>
                </div>
            </motion.div>
        </div>
    );
};

export default RSCChallengesDiagram;
