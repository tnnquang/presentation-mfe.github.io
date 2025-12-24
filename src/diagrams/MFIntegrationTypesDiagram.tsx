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
                {/* Build-time Integration - GREEN background */}
                <motion.div
                    className="p-4 rounded-xl border-2 border-[var(--accent-green)] bg-[var(--accent-green)]/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="text-center mb-3">
                        <span className="text-3xl">📦</span>
                        <h3 className="text-[var(--accent-green)] font-bold text-base mt-1">Build-time</h3>
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

                {/* Runtime Integration - GREEN background + DEMO badge inline */}
                <motion.div
                    className="p-4 rounded-xl border-2 border-[var(--accent-green)] bg-[var(--accent-green)]/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="text-center mb-3">
                        <span className="text-3xl">🔗</span>
                        <h3 className="text-[var(--accent-purple)] font-bold text-base mt-1">
                            Runtime <span className="ml-1 px-2 py-0.5 rounded-full bg-[var(--accent-purple)] text-[8px] text-white align-middle">DEMO</span>
                        </h3>
                        <p className="text-[var(--text-muted)] text-xs">Module Federation</p>
                    </div>
                    <div className="space-y-2 text-xs">
                        <div className="p-2 rounded bg-[var(--accent-green)]/10">
                            <span className="text-[var(--accent-green)]">✅</span> Deploy độc lập
                        </div>
                        <div className="p-2 rounded bg-[var(--accent-green)]/10">
                            <span className="text-[var(--accent-green)]">✅</span> Chia sẻ dependencies
                        </div>
                        <div className="p-2 rounded bg-[var(--accent-green)]/10">
                            <span className="text-[var(--accent-green)]">✅</span> Tải động (lazy load)
                        </div>
                        <div className="p-2 rounded bg-[var(--accent-orange)]/10">
                            <span className="text-[var(--accent-orange)]">⚠️</span> Xung đột version
                        </div>
                    </div>
                    <div className="mt-3 p-2 rounded bg-[#0a0a12] text-[10px] font-mono text-center text-[var(--accent-purple)]">
                        Webpack 5, Vite, Rspack
                    </div>
                </motion.div>

                {/* Server-side Composition - RED background */}
                <motion.div
                    className="p-4 rounded-xl border-2 border-[var(--accent-red)] bg-[var(--accent-red)]/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="text-center mb-3">
                        <span className="text-3xl">🖥️</span>
                        <h3 className="text-[var(--accent-red)] font-bold text-base mt-1">
                            Server-side <span className="ml-1 px-1 py-0.5 rounded bg-[var(--accent-red)] text-[7px] text-white align-middle">CHƯA PHỔ BIẾN</span>
                        </h3>
                        <p className="text-[var(--text-muted)] text-xs">HTML Fragment Stitching</p>
                    </div>
                    <div className="space-y-2 text-xs">
                        <div className="p-2 rounded bg-[var(--accent-green)]/10">
                            <span className="text-[var(--accent-green)]">✅</span> SEO tốt nhất
                        </div>
                        <div className="p-2 rounded bg-[var(--accent-green)]/10">
                            <span className="text-[var(--accent-green)]">✅</span> Tải trang nhanh
                        </div>
                        <div className="p-2 rounded bg-[var(--accent-red)]/10">
                            <span className="text-[var(--accent-red)]">❌</span> Kiến trúc phức tạp
                        </div>
                        <div className="p-2 rounded bg-[var(--accent-red)]/10">
                            <span className="text-[var(--accent-red)]">❌</span> Không dùng Module Federation
                        </div>
                    </div>
                    <div className="mt-3 p-2 rounded bg-[#0a0a12] text-[10px] font-mono text-center">
                        Piral, Tailor, Podium
                    </div>
                    <div className="mt-2 text-[9px] text-[var(--accent-orange)] text-center">
                        ⏳ Đợi MF v2 (ByteDance)
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
        </div>
    );
};

export default MFIntegrationTypesDiagram;

