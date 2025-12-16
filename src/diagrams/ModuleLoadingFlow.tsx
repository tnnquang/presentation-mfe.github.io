import { motion } from 'framer-motion';

/**
 * ModuleLoadingFlowDiagram - Visual technical flowchart
 * Shows step-by-step module loading process with better visual design
 */
export const ModuleLoadingFlowDiagram = () => {
    const steps = [
        {
            num: 1,
            icon: '👆',
            title: 'User Navigate',
            desc: '/products',
            color: '#64748b',
            detail: 'Click link hoặc URL'
        },
        {
            num: 2,
            icon: '🔍',
            title: 'Host tìm Remote',
            desc: 'lazy(() => import("remote2/..."))',
            color: '#06b6d4',
            detail: 'React.lazy detect'
        },
        {
            num: 3,
            icon: '📡',
            title: 'Fetch Manifest',
            desc: 'remoteEntry.js (~5KB)',
            color: '#3b82f6',
            detail: 'GET from CDN'
        },
        {
            num: 4,
            icon: '📋',
            title: 'Parse Metadata',
            desc: 'Đọc exposes, shared versions',
            color: '#a855f7',
            detail: 'Check compatibility'
        },
        {
            num: 5,
            icon: '✅',
            title: 'Verify Shared',
            desc: 'react@18.2.0 ✓ (đã có)',
            color: '#22c55e',
            detail: 'Skip duplicate download'
        },
        {
            num: 6,
            icon: '📦',
            title: 'Fetch Component',
            desc: 'ProductGrid.js (~50KB)',
            color: '#f59e0b',
            detail: 'Actual code'
        },
        {
            num: 7,
            icon: '🎨',
            title: 'Render!',
            desc: '<ProductGrid />',
            color: '#22c55e',
            detail: 'With shared React'
        },
    ];

    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Main Flow - Horizontal Timeline */}
            <div className="relative">
                {/* Timeline line */}
                <div className="absolute top-8 left-8 right-8 h-1 bg-gradient-to-r from-[#64748b] via-[#3b82f6] via-[#a855f7] via-[#22c55e] to-[#22c55e] rounded-full" />

                {/* Steps */}
                <div className="grid grid-cols-7 gap-1 relative z-10">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.num}
                            className="flex flex-col items-center"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.12, duration: 0.4 }}
                        >
                            {/* Step circle */}
                            <motion.div
                                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl border-4 shadow-lg"
                                style={{
                                    borderColor: step.color,
                                    backgroundColor: `${step.color}20`,
                                    boxShadow: `0 0 20px ${step.color}40`
                                }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                {step.icon}
                            </motion.div>

                            {/* Step number badge */}
                            <div
                                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                                style={{ backgroundColor: step.color }}
                            >
                                {step.num}
                            </div>

                            {/* Content below */}
                            <div className="mt-3 text-center">
                                <h4
                                    className="text-xs font-bold"
                                    style={{ color: step.color }}
                                >
                                    {step.title}
                                </h4>
                                <p className="text-[10px] text-[var(--text-muted)] mt-1 leading-tight max-w-[80px]">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Visual Flow Section */}
            <motion.div
                className="mt-8 grid grid-cols-3 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                {/* Host Box */}
                <div className="glass p-4 rounded-xl border-2 border-[#06b6d4]/50">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">🏠</span>
                        <span className="font-bold text-[var(--accent-cyan)]">Host App</span>
                    </div>
                    <div className="text-xs space-y-1 text-[var(--text-secondary)]">
                        <div>• Trigger lazy import</div>
                        <div>• Parse manifest</div>
                        <div>• Render component</div>
                    </div>
                </div>

                {/* Network Arrow */}
                <div className="flex flex-col items-center justify-center">
                    <motion.div
                        className="text-3xl text-[var(--accent-blue)]"
                        animate={{ x: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        ⟷
                    </motion.div>
                    <div className="mt-2 glass px-3 py-1 rounded-full text-xs">
                        <span className="text-[var(--accent-blue)]">HTTP/2</span>
                    </div>
                </div>

                {/* Remote/CDN Box */}
                <div className="glass p-4 rounded-xl border-2 border-[#f59e0b]/50">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">☁️</span>
                        <span className="font-bold text-[var(--accent-orange)]">Remote CDN</span>
                    </div>
                    <div className="text-xs space-y-1 text-[var(--text-secondary)]">
                        <div>• remoteEntry.js</div>
                        <div>• ProductGrid.js</div>
                        <div>• Assets (CSS, images)</div>
                    </div>
                </div>
            </motion.div>

            {/* Bottom Summary */}
            <motion.div
                className="mt-6 flex justify-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
            >
                <div className="glass px-4 py-2 rounded-lg flex items-center gap-2">
                    <span className="text-lg">⚡</span>
                    <div className="text-xs">
                        <div className="text-[var(--accent-green)] font-bold">First Load</div>
                        <div className="text-[var(--text-muted)]">~55KB total</div>
                    </div>
                </div>
                <div className="glass px-4 py-2 rounded-lg flex items-center gap-2">
                    <span className="text-lg">🔄</span>
                    <div className="text-xs">
                        <div className="text-[var(--accent-cyan)] font-bold">Cached Load</div>
                        <div className="text-[var(--text-muted)]">Near instant</div>
                    </div>
                </div>
                <div className="glass px-4 py-2 rounded-lg flex items-center gap-2">
                    <span className="text-lg">📦</span>
                    <div className="text-xs">
                        <div className="text-[var(--accent-purple)] font-bold">Shared React</div>
                        <div className="text-[var(--text-muted)]">No duplicate</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ModuleLoadingFlowDiagram;
