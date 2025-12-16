import { motion } from 'framer-motion';

/**
 * SequenceDiagram - ERD/UML style technical diagram
 * Shows module loading flow between actors
 */
export const SequenceDiagram = () => {
    const actors = [
        { id: 'user', name: 'User', port: '', color: '#64748b' },
        { id: 'host', name: 'Host App', port: ':3100', color: '#a855f7' },
        { id: 'remote', name: 'Remote App', port: ':3002', color: '#22c55e' },
    ];

    const messages = [
        { from: 0, to: 1, label: 'navigate("/products")', type: 'sync', num: 1 },
        { from: 1, to: 1, label: 'React.lazy(() => import("remote2/ProductGrid"))', type: 'self', num: 2 },
        { from: 1, to: 2, label: 'GET /remoteEntry.js', type: 'sync', num: 3, size: '~5KB' },
        { from: 2, to: 1, label: 'Module Manifest', type: 'return', num: 4, data: 'JSON' },
        { from: 1, to: 2, label: 'GET /ProductGrid.js', type: 'sync', num: 5, size: '~50KB' },
        { from: 2, to: 1, label: 'Component Bundle', type: 'return', num: 6, data: 'JS' },
        { from: 1, to: 0, label: 'render(<ProductGrid />)', type: 'sync', num: 7 },
    ];

    return (
        <div className="w-full max-w-5xl mx-auto font-mono text-sm">
            {/* Actor Headers */}
            <div className="grid grid-cols-3 gap-8 mb-6">
                {actors.map((actor, idx) => (
                    <motion.div
                        key={actor.id}
                        className="text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div
                            className="inline-block px-6 py-3 rounded-lg border-2 font-bold"
                            style={{
                                borderColor: actor.color,
                                backgroundColor: `${actor.color}15`
                            }}
                        >
                            <div style={{ color: actor.color }}>{actor.name}</div>
                            {actor.port && (
                                <div className="text-xs text-[var(--text-muted)] mt-1">{actor.port}</div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lifelines Container */}
            <div className="relative" style={{ minHeight: '400px' }}>
                {/* Vertical Lifelines */}
                {actors.map((actor, idx) => (
                    <motion.div
                        key={`lifeline-${actor.id}`}
                        className="absolute top-0 bottom-0 w-px"
                        style={{
                            left: `${16.67 + idx * 33.33}%`,
                            background: `repeating-linear-gradient(
                                to bottom,
                                ${actor.color} 0px,
                                ${actor.color} 8px,
                                transparent 8px,
                                transparent 16px
                            )`,
                            opacity: 0.6
                        }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    />
                ))}

                {/* Messages */}
                <div className="relative space-y-4 py-4">
                    {messages.map((msg, idx) => {
                        const fromX = 16.67 + msg.from * 33.33;
                        const toX = 16.67 + msg.to * 33.33;
                        const isLeftToRight = msg.to > msg.from;
                        const isReturn = msg.type === 'return';
                        const isSelf = msg.type === 'self';

                        return (
                            <motion.div
                                key={idx}
                                className="relative h-10 flex items-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 + idx * 0.15 }}
                            >
                                {/* Message number */}
                                <div
                                    className="absolute w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-[var(--bg-secondary)] border border-[var(--text-muted)]"
                                    style={{ left: '2%' }}
                                >
                                    {msg.num}
                                </div>

                                {/* Arrow line */}
                                {!isSelf ? (
                                    <div
                                        className="absolute h-0.5 flex items-center"
                                        style={{
                                            left: `${Math.min(fromX, toX)}%`,
                                            width: `${Math.abs(toX - fromX)}%`,
                                            background: isReturn
                                                ? `repeating-linear-gradient(to right, ${actors[msg.from].color} 0px, ${actors[msg.from].color} 4px, transparent 4px, transparent 8px)`
                                                : actors[msg.from].color
                                        }}
                                    >
                                        {/* Arrow head */}
                                        <div
                                            className={`absolute ${isLeftToRight ? 'right-0' : 'left-0'} w-0 h-0`}
                                            style={{
                                                borderTop: '5px solid transparent',
                                                borderBottom: '5px solid transparent',
                                                [isLeftToRight ? 'borderLeft' : 'borderRight']: `8px solid ${actors[msg.from].color}`,
                                            }}
                                        />
                                    </div>
                                ) : (
                                    /* Self-call loop */
                                    <div
                                        className="absolute rounded-r-lg border-t-2 border-r-2 border-b-2"
                                        style={{
                                            left: `${fromX}%`,
                                            width: '8%',
                                            height: '30px',
                                            borderColor: actors[msg.from].color,
                                        }}
                                    >
                                        <div
                                            className="absolute bottom-0 left-0 w-0 h-0"
                                            style={{
                                                borderTop: '5px solid transparent',
                                                borderBottom: '5px solid transparent',
                                                borderRight: `8px solid ${actors[msg.from].color}`,
                                                transform: 'translateX(-8px)'
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Label */}
                                <div
                                    className={`absolute px-3 py-1 rounded text-xs whitespace-nowrap ${isReturn ? 'bg-[var(--bg-secondary)]' : 'bg-[var(--bg-primary)]'
                                        } border border-[var(--text-muted)]/30`}
                                    style={{
                                        left: isSelf
                                            ? `${fromX + 9}%`
                                            : `${(fromX + toX) / 2}%`,
                                        transform: isSelf ? 'translateX(0)' : 'translateX(-50%)',
                                        top: isSelf ? '-5px' : '50%',
                                        marginTop: isSelf ? 0 : '-12px',
                                    }}
                                >
                                    <span className={isReturn ? 'text-[var(--accent-green)]' : 'text-white'}>
                                        {msg.label}
                                    </span>
                                    {msg.size && (
                                        <span className="ml-2 text-[var(--text-muted)]">({msg.size})</span>
                                    )}
                                    {msg.data && (
                                        <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-[var(--accent-green)]/20 text-[var(--accent-green)]">
                                            {msg.data}
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <motion.div
                className="flex justify-center gap-8 mt-6 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-[var(--accent-purple)]" />
                    <span className="text-[var(--text-muted)]">Sync Call</span>
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className="w-8 h-0.5"
                        style={{
                            background: 'repeating-linear-gradient(to right, var(--accent-green) 0px, var(--accent-green) 4px, transparent 4px, transparent 8px)'
                        }}
                    />
                    <span className="text-[var(--text-muted)]">Return</span>
                </div>
            </motion.div>
        </div>
    );
};

