import { motion } from 'framer-motion';

/**
 * CSS Isolation Strategies Diagram
 * Shows different approaches to CSS isolation in MFE
 */
export const CSSIsolationDiagram = () => {
    const strategies = [
        {
            name: 'CSS Modules',
            icon: '📦',
            color: 'var(--accent-blue)',
            example: '.btn → .Button_btn_a1b2c3',
            pros: ['Auto hash', 'Build-time', 'Zero runtime'],
            recommended: true,
        },
        {
            name: 'Styled Components',
            icon: '💅',
            color: 'var(--accent-purple)',
            example: '.btn → .sc-bdfBQB.kTzXmj',
            pros: ['Dynamic styles', 'Theme support', 'CSS-in-JS'],
            recommended: false,
        },
        {
            name: 'BEM + Prefix',
            icon: '🏷️',
            color: 'var(--accent-cyan)',
            example: '.btn → .remote1-btn',
            pros: ['Simple', 'No tooling', 'Team convention'],
            recommended: false,
        },
        {
            name: 'Shadow DOM',
            icon: '🛡️',
            color: 'var(--accent-green)',
            example: 'Encapsulated DOM tree',
            pros: ['Full isolation', 'No leaks', 'Web standard'],
            recommended: false,
        },
    ];

    return (
        <div className="w-full">
            <div className="grid grid-cols-2 gap-4">
                {strategies.map((strategy, i) => (
                    <motion.div
                        key={strategy.name}
                        className={`glass p-5 rounded-xl relative ${strategy.recommended ? 'ring-2 ring-[var(--accent-green)]' : ''}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        {strategy.recommended && (
                            <div className="absolute -top-2 -right-2 bg-[var(--accent-green)] text-black text-xs px-2 py-1 rounded-full font-bold">
                                Recommended
                            </div>
                        )}

                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">{strategy.icon}</span>
                            <h3 className="font-bold text-lg" style={{ color: strategy.color }}>
                                {strategy.name}
                            </h3>
                        </div>

                        <div className="bg-black/30 rounded-lg px-3 py-2 mb-3">
                            <code className="text-sm text-[var(--text-secondary)]">
                                {strategy.example}
                            </code>
                        </div>

                        <ul className="space-y-1">
                            {strategy.pros.map((pro, j) => (
                                <li key={j} className="text-sm flex items-center gap-2">
                                    <span className="text-[var(--accent-green)]">✓</span>
                                    {pro}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

            {/* Global CSS rule */}
            <motion.div
                className="mt-6 glass p-4 rounded-xl border border-yellow-500/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                    <span>⚠️</span>
                    <span className="font-semibold">Global CSS Rule</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                    Host quản lý: reset.css, normalize.css, CSS Variables
                    <br />
                    Remote: CHỈ component-scoped styles
                </p>
            </motion.div>
        </div>
    );
};

export default CSSIsolationDiagram;
