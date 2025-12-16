import { motion } from 'framer-motion';

/**
 * ModuleLoadingFlowDiagram - Visual technical flowchart
 * Shows step-by-step module loading process with clean visual design
 */
export const ModuleLoadingFlowDiagram = () => {
    const steps = [
        {
            num: 1,
            title: 'Navigate',
            desc: '/products',
            color: '#64748b',
        },
        {
            num: 2,
            title: 'Lazy Import',
            desc: 'import("remote2/...")',
            color: '#06b6d4',
        },
        {
            num: 3,
            title: 'Fetch Manifest',
            desc: 'remoteEntry.js (~5KB)',
            color: '#3b82f6',
        },
        {
            num: 4,
            title: 'Parse Metadata',
            desc: 'exposes, shared',
            color: '#a855f7',
        },
        {
            num: 5,
            title: 'Verify Shared',
            desc: 'react@18.2.0 ✓',
            color: '#22c55e',
        },
        {
            num: 6,
            title: 'Fetch Code',
            desc: 'ProductGrid.js',
            color: '#f59e0b',
        },
        {
            num: 7,
            title: 'Render',
            desc: '<ProductGrid />',
            color: '#22c55e',
        },
    ];

    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Main Flow - Horizontal Timeline */}
            <div className="relative">
                {/* Timeline line */}
                <div className="absolute top-6 left-8 right-8 h-1 bg-gradient-to-r from-[#64748b] via-[#3b82f6] via-[#a855f7] via-[#22c55e] to-[#22c55e] rounded-full" />

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
                            {/* Step number circle */}
                            <motion.div
                                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-3 shadow-lg"
                                style={{
                                    borderColor: step.color,
                                    backgroundColor: `${step.color}20`,
                                    boxShadow: `0 0 15px ${step.color}30`,
                                    color: step.color
                                }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                {step.num}
                            </motion.div>

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
                    <div className="font-bold text-[var(--accent-cyan)] mb-3">Host App</div>
                    <div className="text-xs space-y-1 text-[var(--text-secondary)]">
                        <div>• Trigger lazy import</div>
                        <div>• Parse manifest</div>
                        <div>• Render component</div>
                    </div>
                </div>

                {/* Network Arrow */}
                <div className="flex flex-col items-center justify-center">
                    <motion.div
                        className="text-2xl text-[var(--accent-blue)] font-mono"
                        animate={{ x: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        {"<---->"}
                    </motion.div>
                    <div className="mt-2 glass px-3 py-1 rounded-full text-xs">
                        <span className="text-[var(--accent-blue)]">HTTP/2</span>
                    </div>
                </div>

                {/* Remote/CDN Box */}
                <div className="glass p-4 rounded-xl border-2 border-[#f59e0b]/50">
                    <div className="font-bold text-[var(--accent-orange)] mb-3">Remote CDN</div>
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
                <div className="glass px-4 py-2 rounded-lg">
                    <div className="text-xs">
                        <div className="text-[var(--accent-green)] font-bold">First Load</div>
                        <div className="text-[var(--text-muted)]">~55KB total</div>
                    </div>
                </div>
                <div className="glass px-4 py-2 rounded-lg">
                    <div className="text-xs">
                        <div className="text-[var(--accent-cyan)] font-bold">Cached Load</div>
                        <div className="text-[var(--text-muted)]">Near instant</div>
                    </div>
                </div>
                <div className="glass px-4 py-2 rounded-lg">
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
