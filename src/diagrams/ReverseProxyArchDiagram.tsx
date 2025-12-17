import { motion } from 'framer-motion';

/**
 * ReverseProxyArchDiagram - Architecture diagram
 * Shows Nginx reverse proxy hiding remote domains
 */
export const ReverseProxyArchDiagram = () => {
    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Browser */}
            <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="inline-block px-6 py-3 rounded-xl glass border-2 border-[var(--accent-cyan)]/30">
                    <div className="text-2xl mb-1">🌐</div>
                    <div className="text-[var(--accent-cyan)] font-bold">Browser</div>
                    <div className="text-[10px] text-[var(--text-muted)]">User chỉ thấy: app.company.com</div>
                </div>
            </motion.div>

            {/* Arrow down */}
            <motion.div
                className="flex justify-center mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex flex-col items-center">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-[var(--accent-cyan)] to-[var(--accent-purple)]" />
                    <div className="text-[10px] text-[var(--text-muted)] my-1">HTTPS + Cookies</div>
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-[var(--accent-purple)]" />
                </div>
            </motion.div>

            {/* Nginx */}
            <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="inline-block px-8 py-4 rounded-2xl border-2 border-[var(--accent-purple)] bg-[var(--accent-purple)]/10">
                    <div className="text-xl mb-2">⚡</div>
                    <div className="text-[var(--accent-purple)] font-bold text-lg">Nginx / Kong / Traefik</div>
                    <div className="text-xs text-[var(--text-muted)] mt-2">app.company.com</div>
                    <div className="grid grid-cols-3 gap-2 mt-3 text-[9px]">
                        <div className="px-2 py-1 rounded bg-white/5">/mfe/umi/*</div>
                        <div className="px-2 py-1 rounded bg-white/5">/mfe/vite/*</div>
                        <div className="px-2 py-1 rounded bg-white/5">/api/*</div>
                    </div>
                </div>
            </motion.div>

            {/* Arrows to internal services */}
            <motion.div
                className="flex justify-center gap-16 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {[
                    { label: 'proxy_pass', color: '#a855f7' },
                    { label: 'proxy_pass', color: '#22c55e' },
                    { label: 'proxy_pass', color: '#f97316' },
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="w-0.5 h-6" style={{ backgroundColor: item.color }} />
                        <div className="text-[8px] my-1" style={{ color: item.color }}>{item.label}</div>
                        <div className="w-0 h-0 border-l-3 border-r-3 border-t-4 border-transparent" style={{ borderTopColor: item.color }} />
                    </div>
                ))}
            </motion.div>

            {/* Internal Services */}
            <motion.div
                className="grid grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                {[
                    { name: 'Remote UMI', icon: '📦', url: 'internal-umi:3001', color: '#a855f7', label: 'host-umi4' },
                    { name: 'Remote Vite', icon: '⚡', url: 'internal-vite:3002', color: '#22c55e', label: 'remote-vite' },
                    { name: 'API Gateway', icon: '🔐', url: 'api-gateway:8080', color: '#f97316', label: 'Backend' },
                ].map((service, i) => (
                    <motion.div
                        key={service.name}
                        className="text-center p-4 rounded-xl glass"
                        style={{ borderColor: `${service.color}30` }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                    >
                        <div className="text-xl mb-2">{service.icon}</div>
                        <div className="font-bold text-sm" style={{ color: service.color }}>{service.name}</div>
                        <div className="text-[10px] text-[var(--text-muted)] mt-1">{service.url}</div>
                        <div className="text-[9px] text-[var(--text-muted)] mt-1 opacity-50">{service.label}</div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Internal Network Label */}
            <motion.div
                className="text-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <span className="text-xs text-[var(--accent-red)] bg-[var(--accent-red)]/10 px-3 py-1 rounded-full">
                    🔒 Internal Network - Không expose ra internet
                </span>
            </motion.div>
        </div>
    );
};

export default ReverseProxyArchDiagram;
