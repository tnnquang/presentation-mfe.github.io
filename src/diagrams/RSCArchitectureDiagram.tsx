import { motion } from 'framer-motion';

/**
 * RSCArchitectureDiagram - Detailed explanation of RSC architecture and why MF doesn't work
 */
export const RSCArchitectureDiagram = () => {
    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
                <h3 className="text-[var(--accent-purple)] font-bold text-lg">React Server Components (Next.js App Router)</h3>
                <p className="text-[var(--text-muted)] text-xs">Server Component chạy trên server, không gửi JS về client</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Server Components */}
                <motion.div
                    className="glass p-3 rounded-xl border border-[var(--accent-purple)]/30"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h4 className="text-[var(--accent-purple)] font-bold mb-2 text-sm">🖥️ Server Components</h4>
                    <ul className="text-[10px] text-[var(--text-muted)] space-y-1.5">
                        <li className="flex items-start gap-1">
                            <span className="text-[var(--accent-purple)]">•</span>
                            <span>Render <strong className="text-white">hoàn toàn trên server</strong></span>
                        </li>
                        <li className="flex items-start gap-1">
                            <span className="text-[var(--accent-purple)]">•</span>
                            <span><strong className="text-white">Không gửi JS</strong> về client (0 bundle)</span>
                        </li>
                        <li className="flex items-start gap-1">
                            <span className="text-[var(--accent-purple)]">•</span>
                            <span>Có thể truy cập DB, file system, secrets</span>
                        </li>
                        <li className="flex items-start gap-1">
                            <span className="text-[var(--accent-purple)]">•</span>
                            <span>Streaming HTML qua React Flight protocol</span>
                        </li>
                    </ul>
                    <div className="mt-2 p-1.5 rounded bg-[var(--accent-red)]/10 text-[9px]">
                        <span className="text-[var(--accent-red)]">❌ MF không thể load:</span> Không có JS runtime để execute remoteEntry.js
                    </div>
                </motion.div>

                {/* Client Components */}
                <motion.div
                    className="glass p-3 rounded-xl border border-[var(--accent-cyan)]/30"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h4 className="text-[var(--accent-cyan)] font-bold mb-2 text-sm">🌐 Client Components</h4>
                    <ul className="text-[10px] text-[var(--text-muted)] space-y-1.5">
                        <li className="flex items-start gap-1">
                            <span className="text-[var(--accent-cyan)]">•</span>
                            <span>Đánh dấu bằng <code className="text-[var(--accent-orange)]">'use client'</code></span>
                        </li>
                        <li className="flex items-start gap-1">
                            <span className="text-[var(--accent-cyan)]">•</span>
                            <span><strong className="text-white">Có gửi JS</strong> về client (bundled)</span>
                        </li>
                        <li className="flex items-start gap-1">
                            <span className="text-[var(--accent-cyan)]">•</span>
                            <span>Có thể dùng hooks, events, browser APIs</span>
                        </li>
                        <li className="flex items-start gap-1">
                            <span className="text-[var(--accent-cyan)]">•</span>
                            <span>Hydration theo selective/partial pattern</span>
                        </li>
                    </ul>
                    <div className="mt-2 p-1.5 rounded bg-[var(--accent-green)]/10 text-[9px]">
                        <span className="text-[var(--accent-green)]">✅ MF có thể load:</span> Nhưng chỉ trong Client Component boundary
                    </div>
                </motion.div>
            </div>

            {/* Key difference */}
            <motion.div
                className="mt-4 p-3 rounded-xl border-2 border-dashed border-[var(--accent-orange)]/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <h4 className="text-[var(--accent-orange)] font-bold mb-2 text-sm">🔑 Sự khác biệt cốt lõi: SSR vs RSC</h4>
                <div className="grid grid-cols-2 gap-4 text-[10px]">
                    <div>
                        <div className="text-[var(--accent-green)] font-bold mb-1">Traditional SSR (Pages Router)</div>
                        <p className="text-[var(--text-muted)]">
                            Server render HTML → <strong className="text-white">Gửi TOÀN BỘ JS bundle</strong> →
                            Client hydrate lại TOÀN BỘ app → MF runtime execute → ✅ Works
                        </p>
                    </div>
                    <div>
                        <div className="text-[var(--accent-purple)] font-bold mb-1">RSC (App Router)</div>
                        <p className="text-[var(--text-muted)]">
                            Server render RSC → <strong className="text-white">CHỈ gửi JS của Client Components</strong> →
                            Partial hydration → MF không có context → ❌ Không thể share scope
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Implication */}
            <motion.div
                className="mt-3 p-2 rounded-lg bg-[var(--accent-red)]/10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <span className="text-xs text-[var(--text-muted)]">
                    <span className="text-[var(--accent-red)]">⚠️</span> Module Federation cần{' '}
                    <strong className="text-white">full JS runtime</strong> để khởi tạo shared scope.
                    RSC không cung cấp điều này cho Server Components.
                </span>
            </motion.div>
        </div>
    );
};

export default RSCArchitectureDiagram;
