import { motion } from 'framer-motion';

/**
 * RoutingFlowDiagram - Technical component diagram
 * Shows route mapping between Host and Remote
 */
export const RoutingFlowDiagram = () => {
    const hostRoutes = [
        { path: '/', component: 'HomePage', type: 'local' },
        { path: '/users', component: 'UserPage', type: 'local' },
        { path: '/products/*', component: 'RemoteProducts', type: 'remote' },
    ];

    const remoteRoutes = [
        { path: '/products/list', component: 'ProductList' },
        { path: '/products/:id', component: 'ProductDetail' },
        { path: '/products/:id/edit', component: 'ProductEdit' },
    ];

    return (
        <div className="w-full max-w-5xl mx-auto font-mono text-sm">
            {/* Host and Remote nodes */}
            <div className="grid grid-cols-2 gap-8 mb-6">
                {/* Host */}
                <motion.div
                    className="border-2 rounded-lg overflow-hidden"
                    style={{ borderColor: '#06b6d4' }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div
                        className="px-4 py-2 font-bold text-center"
                        style={{ backgroundColor: '#06b6d415', borderBottom: '2px solid #06b6d4' }}
                    >
                        <span style={{ color: '#06b6d4' }}>HOST</span>
                        <span className="text-[var(--text-muted)] ml-2">:3100</span>
                    </div>
                    <div className="p-3 bg-[var(--bg-secondary)]">
                        <div className="text-[10px] text-[var(--text-muted)] mb-2">routes:</div>
                        <div className="space-y-1">
                            {hostRoutes.map((route) => (
                                <div
                                    key={route.path}
                                    className={`text-xs px-2 py-1 rounded border flex justify-between ${route.type === 'remote'
                                            ? 'border-[#a855f7]/50 bg-[#a855f7]/10'
                                            : 'border-[var(--text-muted)]/30'
                                        }`}
                                >
                                    <span className="text-[var(--accent-cyan)]">{route.path}</span>
                                    <span className={route.type === 'remote' ? 'text-[#a855f7]' : 'text-[var(--text-muted)]'}>
                                        {route.component}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* History instance */}
                        <div
                            className="mt-3 px-2 py-1 rounded text-[10px] text-center border"
                            style={{ borderColor: '#22c55e50', backgroundColor: '#22c55e10' }}
                        >
                            <span style={{ color: '#22c55e' }}>createBrowserHistory()</span>
                        </div>
                    </div>
                </motion.div>

                {/* Remote */}
                <motion.div
                    className="border-2 rounded-lg overflow-hidden"
                    style={{ borderColor: '#a855f7' }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div
                        className="px-4 py-2 font-bold text-center"
                        style={{ backgroundColor: '#a855f715', borderBottom: '2px solid #a855f7' }}
                    >
                        <span style={{ color: '#a855f7' }}>REMOTE (Products)</span>
                        <span className="text-[var(--text-muted)] ml-2">:3002</span>
                    </div>
                    <div className="p-3 bg-[var(--bg-secondary)]">
                        <div className="text-[10px] text-[var(--text-muted)] mb-2">internal routes:</div>
                        <div className="space-y-1">
                            {remoteRoutes.map((route) => (
                                <div
                                    key={route.path}
                                    className="text-xs px-2 py-1 rounded border border-[var(--text-muted)]/30 flex justify-between"
                                >
                                    <span className="text-[var(--accent-cyan)]">{route.path}</span>
                                    <span className="text-white">{route.component}</span>
                                </div>
                            ))}
                        </div>

                        {/* basePath prop */}
                        <div
                            className="mt-3 px-2 py-1 rounded text-[10px] text-center border"
                            style={{ borderColor: '#f9731650', backgroundColor: '#f9731610' }}
                        >
                            <span className="text-[var(--text-muted)]">props.</span>
                            <span style={{ color: '#f97316' }}>basePath</span>
                            <span className="text-white"> = "/products"</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Connection arrow */}
            <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="flex items-center gap-2">
                    <div className="w-16 h-0.5 bg-gradient-to-r from-[#06b6d4] to-[#a855f7]" />
                    <div className="text-[10px] px-2 py-1 rounded bg-[var(--bg-primary)] border border-[var(--text-muted)]/30">
                        <span className="text-[var(--accent-cyan)]">lazy import</span>
                    </div>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-[#a855f7] to-[#a855f7]" />
                    <div className="w-0 h-0"
                        style={{
                            borderTop: '5px solid transparent',
                            borderBottom: '5px solid transparent',
                            borderLeft: '8px solid #a855f7',
                        }}
                    />
                </div>
            </motion.div>

            {/* Features */}
            <motion.div
                className="grid grid-cols-3 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {[
                    { label: 'Single History', desc: 'Một instance duy nhất', color: '#22c55e' },
                    { label: 'Back/Forward', desc: 'Browser navigation works', color: '#06b6d4' },
                    { label: 'URL Sync', desc: 'Tự động đồng bộ URL', color: '#a855f7' },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="border rounded-lg p-3 text-center text-xs"
                        style={{ borderColor: `${item.color}50`, backgroundColor: `${item.color}08` }}
                    >
                        <div className="font-bold" style={{ color: item.color }}>{item.label}</div>
                        <div className="text-[var(--text-muted)] mt-1">{item.desc}</div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default RoutingFlowDiagram;

