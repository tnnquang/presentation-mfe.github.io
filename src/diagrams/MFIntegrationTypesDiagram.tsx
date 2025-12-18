import { motion } from 'framer-motion';

/**
 * MFIntegrationTypesDiagram - Comparison of Build-time vs Runtime integration approaches
 */
export const MFIntegrationTypesDiagram = () => {
    return (
        <div className="w-full">
            {/* Title */}
            <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] bg-clip-text text-transparent">
                Các phương pháp tích hợp Micro-Frontend
            </h2>

            <div className="grid grid-cols-3 gap-4">
                {/* Build-time Integration */}
                <motion.div
                    className="glass p-4 rounded-xl border-2 border-[var(--accent-blue)]/40"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="text-center mb-3">
                        <span className="text-3xl">📦</span>
                        <h3 className="text-[var(--accent-blue)] font-bold text-base mt-1">Build-time</h3>
                        <p className="text-[var(--text-muted)] text-xs">NPM packages / Monorepo</p>
                    </div>
                    <div className="space-y-2 text-xs">
                        <div className="p-2 rounded bg-[var(--accent-green)]/10">
                            <span className="text-[var(--accent-green)]">✅</span> Type-safe, tree-shaking
                        </div>
                        <div className="p-2 rounded bg-[var(--accent-green)]/10">
                            <span className="text-[var(--accent-green)]">✅</span> Tối ưu bundle size
                        </div>
                        <div className="p-2 rounded bg-[var(--accent-red)]/10">
                            <span className="text-[var(--accent-red)]">❌</span> Deploy phụ thuộc nhau
                        </div>
                        <div className="p-2 rounded bg-[var(--accent-red)]/10">
                            <span className="text-[var(--accent-red)]">❌</span> Rebuild toàn bộ
                        </div>
                    </div>
                    <div className="mt-3 p-2 rounded bg-[#0a0a12] text-[10px] font-mono text-center">
                        Nx, Turborepo, Lerna
                    </div>
                </motion.div>

                {/* Runtime Integration - Module Federation */}
                <motion.div
                    className="glass p-4 rounded-xl border-2 border-[var(--accent-purple)]/60 ring-2 ring-[var(--accent-purple)]/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[var(--accent-purple)] text-[9px] font-bold text-white">
                        DEMO
                    </div>
                    <div className="text-center mb-3">
                        <span className="text-3xl">🔗</span>
                        <h3 className="text-[var(--accent-purple)] font-bold text-base mt-1">Runtime (MF)</h3>
                        <p className="text-[var(--text-muted)] text-xs">Module Federation</p>
                    </div>
                    <div className="space-y-2 text-xs">
                        <div className="p-2 rounded bg-[var(--accent-green)]/10">
                            <span className="text-[var(--accent-green)]">✅</span> Deploy độc lập
                        </div>
                        <div className="p-2 rounded bg-[var(--accent-green)]/10">
                            <span className="text-[var(--accent-green)]">✅</span> Share dependencies
                        </div>
                        <div className="p-2 rounded bg-[var(--accent-green)]/10">
                            <span className="text-[var(--accent-green)]">✅</span> Dynamic loading
                        </div>
                        <div className="p-2 rounded bg-[var(--accent-orange)]/10">
                            <span className="text-[var(--accent-orange)]">⚠️</span> Version conflicts
                        </div>
                    </div>
                    <div className="mt-3 p-2 rounded bg-[#0a0a12] text-[10px] font-mono text-center text-[var(--accent-purple)]">
                        Webpack 5, Vite, Rspack
                    </div>
                </motion.div>

                {/* Server-side Composition */}
                <motion.div
                    className="glass p-4 rounded-xl border-2 border-[var(--accent-orange)]/40"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="text-center mb-3">
                        <span className="text-3xl">🖥️</span>
                        <h3 className="text-[var(--accent-orange)] font-bold text-base mt-1">Server-side</h3>
                        <p className="text-[var(--text-muted)] text-xs">Edge / SSI / ESI</p>
                    </div>
                    <div className="space-y-2 text-xs">
                        <div className="p-2 rounded bg-[var(--accent-green)]/10">
                            <span className="text-[var(--accent-green)]">✅</span> SEO tốt nhất
                        </div>
                        <div className="p-2 rounded bg-[var(--accent-green)]/10">
                            <span className="text-[var(--accent-green)]">✅</span> Fast initial load
                        </div>
                        <div className="p-2 rounded bg-[var(--accent-red)]/10">
                            <span className="text-[var(--accent-red)]">❌</span> Phức tạp hơn
                        </div>
                        <div className="p-2 rounded bg-[var(--accent-red)]/10">
                            <span className="text-[var(--accent-red)]">❌</span> State management khó
                        </div>
                    </div>
                    <div className="mt-3 p-2 rounded bg-[#0a0a12] text-[10px] font-mono text-center">
                        Tailor, Mosaic, Podium
                    </div>
                </motion.div>
            </div>

            {/* Additional methods */}
            <motion.div
                className="mt-4 grid grid-cols-2 gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div className="glass p-3 rounded-lg border border-[var(--accent-cyan)]/30">
                    <h4 className="text-[var(--accent-cyan)] font-bold text-sm mb-1">🧩 Web Components</h4>
                    <p className="text-[var(--text-muted)] text-xs">
                        Framework-agnostic, encapsulated. Custom Elements + Shadow DOM.
                    </p>
                </div>
                <div className="glass p-3 rounded-lg border border-[var(--accent-pink)]/30">
                    <h4 className="text-[var(--accent-pink)] font-bold text-sm mb-1">🪟 iFrame</h4>
                    <p className="text-[var(--text-muted)] text-xs">
                        Hoàn toàn isolated, nhưng UX kém và communication phức tạp.
                    </p>
                </div>
            </motion.div>

            {/* Why Module Federation */}
            <motion.div
                className="mt-4 p-3 rounded-xl border-2 border-dashed border-[var(--accent-purple)]/50 bg-[var(--accent-purple)]/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
            >
                <div className="text-center">
                    <span className="text-[var(--accent-purple)] font-bold text-sm">
                        💡 Demo này sử dụng Module Federation vì:
                    </span>
                    <p className="text-[var(--text-muted)] text-xs mt-1">
                        Deploy độc lập • Shared React/libs • Hot reload • Phù hợp enterprise scale
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default MFIntegrationTypesDiagram;
