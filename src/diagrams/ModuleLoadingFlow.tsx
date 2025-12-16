import { motion } from 'framer-motion';

/**
 * ModuleLoadingFlowDiagram - Simple vertical flowchart
 * Clean and easy to follow
 */
export const ModuleLoadingFlowDiagram = () => {
    const steps = [
        { num: 1, title: 'User navigates to /products', type: 'user', color: '#64748b' },
        { num: 2, title: 'Host calls import("remote2/ProductGrid")', type: 'host', color: '#06b6d4' },
        { num: 3, title: 'Fetch remoteEntry.js from CDN', type: 'network', color: '#3b82f6' },
        { num: 4, title: 'Check shared deps: react@18 already loaded', type: 'check', color: '#22c55e' },
        { num: 5, title: 'Fetch ProductGrid.js chunk', type: 'network', color: '#3b82f6' },
        { num: 6, title: 'Render <ProductGrid /> with shared React', type: 'success', color: '#22c55e' },
    ];

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="space-y-3">
                {steps.map((step, i) => (
                    <motion.div
                        key={step.num}
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 }}
                    >
                        {/* Step number */}
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-base font-bold shrink-0"
                            style={{
                                backgroundColor: `${step.color}20`,
                                color: step.color,
                                border: `2px solid ${step.color}`
                            }}
                        >
                            {step.num}
                        </div>

                        {/* Arrow connector */}
                        {i < steps.length - 1 && (
                            <div
                                className="absolute left-[19px] mt-12 w-0.5 h-3"
                                style={{ backgroundColor: step.color }}
                            />
                        )}

                        {/* Content */}
                        <div
                            className="flex-1 px-4 py-3 rounded-lg border-l-4"
                            style={{
                                backgroundColor: `${step.color}10`,
                                borderColor: step.color
                            }}
                        >
                            <span className="text-white text-sm">{step.title}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Key takeaway */}
            <motion.div
                className="mt-6 glass p-4 rounded-lg text-center text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <span className="text-[var(--accent-green)] font-bold">Key:</span>
                <span className="text-[var(--text-secondary)]"> React được share nên không download lại → tiết kiệm bandwidth</span>
            </motion.div>
        </div>
    );
};

export default ModuleLoadingFlowDiagram;
