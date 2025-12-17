import { motion } from 'framer-motion';

/**
 * SSRvsRSCDiagram - Visual comparison of SSR vs RSC architecture
 */
export const SSRvsRSCDiagram = () => {
    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-2 gap-6">
                {/* Traditional SSR */}
                <motion.div
                    className="glass p-4 rounded-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h3 className="text-[var(--accent-green)] font-bold mb-4 text-center text-sm">
                        ✅ Traditional SSR + MF
                    </h3>
                    <div className="space-y-2 text-[10px]">
                        <FlowStep icon="🖥️" text="Server render HTML" />
                        <Arrow />
                        <FlowStep icon="📦" text="Load all JS bundles" />
                        <Arrow />
                        <FlowStep icon="💧" text="Full hydration" />
                        <Arrow />
                        <FlowStep icon="🔗" text="MF shared scope works!" highlight="green" />
                    </div>
                    <div className="mt-4 p-2 rounded bg-[var(--accent-green)]/10 text-[9px] text-[var(--text-muted)]">
                        <strong className="text-[var(--accent-green)]">Frameworks:</strong> Next.js Pages Router, Nuxt 2, Angular Universal
                    </div>
                </motion.div>

                {/* RSC */}
                <motion.div
                    className="glass p-4 rounded-xl"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h3 className="text-[var(--accent-red)] font-bold mb-4 text-center text-sm">
                        ❌ RSC + MF (Challenges)
                    </h3>
                    <div className="space-y-2 text-[10px]">
                        <FlowStep icon="🖥️" text="Server render RSC" />
                        <Arrow />
                        <FlowStep icon="📡" text="Stream HTML (no JS)" />
                        <Arrow />
                        <FlowStep icon="🧩" text="Partial hydration only" />
                        <Arrow />
                        <FlowStep icon="❌" text="MF needs full JS bundle!" highlight="red" />
                    </div>
                    <div className="mt-4 p-2 rounded bg-[var(--accent-red)]/10 text-[9px] text-[var(--text-muted)]">
                        <strong className="text-[var(--accent-red)]">Problem:</strong> RSC không gửi JS → MF không thể mount
                    </div>
                </motion.div>
            </div>

            {/* Comparison Table */}
            <motion.div
                className="mt-6 glass p-4 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <table className="w-full text-[10px]">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="py-2 text-left text-[var(--text-muted)]">Aspect</th>
                            <th className="py-2 text-center text-[var(--accent-green)]">SSR</th>
                            <th className="py-2 text-center text-[var(--accent-purple)]">RSC</th>
                        </tr>
                    </thead>
                    <tbody className="text-[var(--text-secondary)]">
                        {[
                            ['JS to client', '✅ Full bundle', '❌ Server components only'],
                            ['Hydration', '✅ Full hydration', '⚡ Partial/selective'],
                            ['MF Compatible', '✅ Yes', '⚠️ Client components only'],
                            ['Use Case', 'SEO + Interactivity', 'Zero-JS server logic'],
                        ].map(([aspect, ssr, rsc], i) => (
                            <motion.tr
                                key={aspect}
                                className="border-b border-white/5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                            >
                                <td className="py-2">{aspect}</td>
                                <td className="py-2 text-center">{ssr}</td>
                                <td className="py-2 text-center">{rsc}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
};

const FlowStep = ({ icon, text, highlight }: { icon: string; text: string; highlight?: string }) => (
    <div className={`flex items-center gap-2 p-2 rounded ${highlight === 'green' ? 'bg-[var(--accent-green)]/10' : highlight === 'red' ? 'bg-[var(--accent-red)]/10' : 'bg-white/5'}`}>
        <span>{icon}</span>
        <span className={highlight === 'green' ? 'text-[var(--accent-green)]' : highlight === 'red' ? 'text-[var(--accent-red)]' : ''}>{text}</span>
    </div>
);

const Arrow = () => (
    <div className="flex justify-center">
        <span className="text-[var(--text-muted)]">↓</span>
    </div>
);

export default SSRvsRSCDiagram;
