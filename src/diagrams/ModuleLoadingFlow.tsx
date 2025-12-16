import { motion } from 'framer-motion';

/**
 * ModuleLoadingFlowDiagram - Technical flowchart
 * Shows step-by-step module loading process
 */
export const ModuleLoadingFlowDiagram = () => {
    const steps = [
        { num: 1, action: 'navigate("/products")', actor: 'User', color: '#64748b' },
        { num: 2, action: 'React.lazy(() => import("remote2/ProductGrid"))', actor: 'Host', color: '#06b6d4' },
        { num: 3, action: 'GET /remoteEntry.js', actor: 'Host → CDN', color: '#3b82f6', size: '~5KB' },
        { num: 4, action: 'Parse module manifest', actor: 'Host', color: '#a855f7' },
        { num: 5, action: 'Check shared: react@18.2.0 ✓', actor: 'Runtime', color: '#22c55e' },
        { num: 6, action: 'GET /ProductGrid.js', actor: 'Host → CDN', color: '#3b82f6', size: '~50KB' },
        { num: 7, action: 'render(<ProductGrid />)', actor: 'Host', color: '#22c55e' },
    ];

    return (
        <div className="w-full max-w-4xl mx-auto font-mono text-sm">
            {/* Steps */}
            <div className="space-y-2">
                {steps.map((step, i) => (
                    <motion.div
                        key={step.num}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        {/* Step number */}
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2"
                            style={{ borderColor: step.color, color: step.color, backgroundColor: `${step.color}15` }}
                        >
                            {step.num}
                        </div>

                        {/* Connecting line */}
                        {i < steps.length - 1 && (
                            <div
                                className="absolute left-4 mt-10 w-0.5 h-4"
                                style={{
                                    background: `linear-gradient(to bottom, ${step.color}, ${steps[i + 1].color})`
                                }}
                            />
                        )}

                        {/* Content */}
                        <div
                            className="flex-1 border-2 rounded-lg px-4 py-2 flex items-center justify-between"
                            style={{ borderColor: step.color, backgroundColor: `${step.color}08` }}
                        >
                            <div>
                                <span className="text-[var(--text-muted)] text-xs">{step.actor}: </span>
                                <span className="text-white">{step.action}</span>
                            </div>
                            {step.size && (
                                <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-primary)] border border-[var(--text-muted)]/30 text-[var(--text-muted)]">
                                    {step.size}
                                </span>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Code example */}
            <motion.div
                className="mt-6 border-2 rounded-lg overflow-hidden"
                style={{ borderColor: '#06b6d4' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <div
                    className="px-4 py-2 text-xs font-bold"
                    style={{ backgroundColor: '#06b6d415', borderBottom: '2px solid #06b6d4' }}
                >
                    <span style={{ color: '#06b6d4' }}>Usage</span>
                </div>
                <div className="p-3 bg-[var(--bg-secondary)] text-xs">
                    <span className="text-[var(--accent-pink)]">const</span>
                    <span className="text-white"> ProductGrid = </span>
                    <span className="text-[var(--accent-cyan)]">lazy</span>
                    <span className="text-white">(() =&gt; </span>
                    <span className="text-[var(--accent-cyan)]">import</span>
                    <span className="text-[var(--accent-orange)]">('remote2/ProductGrid')</span>
                    <span className="text-white">);</span>
                </div>
            </motion.div>

            {/* Legend */}
            <motion.div
                className="flex justify-center gap-6 mt-4 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: '#3b82f6' }} />
                    <span className="text-[var(--text-muted)]">Network</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: '#22c55e' }} />
                    <span className="text-[var(--text-muted)]">Success</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: '#a855f7' }} />
                    <span className="text-[var(--text-muted)]">Processing</span>
                </div>
            </motion.div>
        </div>
    );
};

export default ModuleLoadingFlowDiagram;

