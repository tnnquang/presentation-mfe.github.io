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
            <div className="grid grid-cols-2 gap-3">
                {strategies.map((strategy, i) => (
                    <motion.div
                        key={strategy.name}
                        className={`glass p-4 rounded-xl ${strategy.recommended ? 'ring-2 ring-[var(--accent-green)]' : ''}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{strategy.icon}</span>
                            <h3 className="font-bold text-base" style={{ color: strategy.color }}>
                                {strategy.name}
                            </h3>
                            {strategy.recommended && (
                                <span className="bg-[var(--accent-green)] text-black text-[10px] px-2 py-0.5 rounded-full font-bold ml-auto">
                                    Recommend
                                </span>
                            )}
                        </div>

                        <div className="bg-black/30 rounded-lg px-2 py-1.5 mb-2">
                            <code className="text-xs text-[var(--text-secondary)]">
                                {strategy.example}
                            </code>
                        </div>

                        <ul className="space-y-0.5">
                            {strategy.pros.map((pro, j) => (
                                <li key={j} className="text-xs flex items-center gap-1.5">
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
                className="mt-4 glass p-3 rounded-xl border border-yellow-500/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div className="flex items-center gap-2 text-yellow-400 text-sm">
                    <span>⚠️</span>
                    <span className="font-semibold">Global CSS Rule</span>
                    <span className="text-[var(--text-secondary)] text-xs ml-2">
                        Host quản lý: reset.css, normalize.css, CSS Variables
                    </span>
                </div>
            </motion.div>
        </div>
    );
};

export default CSSIsolationDiagram;

