import { motion } from 'framer-motion';

/**
 * CICDPipelineDiagram - Technical flowchart
 * Shows deployment pipeline stages
 */
export const CICDPipelineDiagram = () => {
    const stages = [
        { id: 'push', name: 'Push', cmd: 'git push', color: '#64748b' },
        { id: 'build', name: 'Build', cmd: 'npm run build', color: '#3b82f6' },
        { id: 'test', name: 'Test', cmd: 'npm test', color: '#a855f7' },
        { id: 'deploy', name: 'Deploy', cmd: 'aws s3 sync', color: '#22c55e' },
        { id: 'verify', name: 'Verify', cmd: 'curl /remoteEntry.js', color: '#06b6d4' },
    ];

    const cacheMethods = [
        { name: 'Hash Filename', example: 'remoteEntry.[hash].js', color: '#3b82f6' },
        { name: 'Query Param', example: '?v=1702656000', color: '#a855f7' },
        { name: 'Manifest', example: 'manifest.json', color: '#22c55e' },
    ];

    return (
        <div className="w-full max-w-5xl mx-auto font-mono text-sm">
            {/* Pipeline stages */}
            <div className="flex items-stretch justify-between gap-2 mb-8">
                {stages.map((stage, i) => (
                    <motion.div
                        key={stage.id}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        {/* Stage box */}
                        <div
                            className="border-2 rounded-lg overflow-hidden w-24"
                            style={{ borderColor: stage.color }}
                        >
                            <div
                                className="px-2 py-1 font-bold text-center text-xs"
                                style={{ backgroundColor: `${stage.color}15`, borderBottom: `2px solid ${stage.color}` }}
                            >
                                <span style={{ color: stage.color }}>{stage.name}</span>
                            </div>
                            <div className="p-2 bg-[var(--bg-secondary)] text-[10px] text-center text-[var(--text-muted)]">
                                {stage.cmd}
                            </div>
                        </div>

                        {/* Arrow */}
                        {i < stages.length - 1 && (
                            <div className="flex items-center mx-1">
                                <div className="w-4 h-0.5" style={{ backgroundColor: stage.color }} />
                                <div className="w-0 h-0"
                                    style={{
                                        borderTop: '4px solid transparent',
                                        borderBottom: '4px solid transparent',
                                        borderLeft: `6px solid ${stages[i + 1].color}`,
                                    }}
                                />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Cache Busting Strategies */}
            <motion.div
                className="border-2 rounded-lg overflow-hidden mb-4"
                style={{ borderColor: '#f97316' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <div
                    className="px-4 py-2 font-bold text-center"
                    style={{ backgroundColor: '#f9731615', borderBottom: '2px solid #f97316' }}
                >
                    <span style={{ color: '#f97316' }}>CACHE BUSTING</span>
                </div>
                <div className="p-3 bg-[var(--bg-secondary)]">
                    <div className="grid grid-cols-3 gap-3">
                        {cacheMethods.map((method) => (
                            <div
                                key={method.name}
                                className="border rounded p-2 text-center"
                                style={{ borderColor: `${method.color}50`, backgroundColor: `${method.color}08` }}
                            >
                                <div className="font-bold text-xs" style={{ color: method.color }}>{method.name}</div>
                                <div className="text-[10px] text-[var(--text-muted)] mt-1 font-mono">{method.example}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Independent deploy note */}
            <motion.div
                className="flex items-center justify-center gap-6 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <div className="flex items-center gap-2">
                    <span className="text-[var(--accent-green)]">✓</span>
                    <span>Host deploy <span className="text-[var(--accent-cyan)] font-semibold">độc lập</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[var(--accent-green)]">✓</span>
                    <span>Remote deploy <span className="text-[var(--accent-cyan)] font-semibold">độc lập</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[var(--accent-green)]">✓</span>
                    <span>Không <span className="text-[var(--accent-red)]">block</span> nhau</span>
                </div>
            </motion.div>
        </div>
    );
};

export default CICDPipelineDiagram;

