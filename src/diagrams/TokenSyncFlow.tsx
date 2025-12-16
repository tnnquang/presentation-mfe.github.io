import { motion } from 'framer-motion';

/**
 * TokenSyncFlowDiagram - Technical sequence diagram
 * Shows token synchronization between browser tabs
 */
export const TokenSyncFlowDiagram = () => {
    const actors = [
        { id: 'tab1', name: 'Tab 1', subtitle: 'Login Page', color: '#3b82f6' },
        { id: 'channel', name: 'BroadcastChannel', subtitle: 'mfe-token-sync', color: '#f97316' },
        { id: 'tab2', name: 'Tab 2', subtitle: 'Dashboard', color: '#22c55e' },
    ];

    const messages = [
        { from: 0, to: 0, label: 'user.login()', type: 'self', num: 1 },
        { from: 0, to: 0, label: 'tokenStore.set(token)', type: 'self', num: 2, note: 'In-Memory' },
        { from: 0, to: 1, label: 'postMessage({ auth, token })', type: 'sync', num: 3 },
        { from: 1, to: 2, label: 'onmessage(event)', type: 'sync', num: 4, note: 'Broadcast' },
        { from: 2, to: 2, label: 'tokenStore.set(token)', type: 'self', num: 5, note: 'Synced!' },
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
                            <div className="text-xs text-[var(--text-muted)] mt-1">{actor.subtitle}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lifelines Container */}
            <div className="relative" style={{ minHeight: '280px' }}>
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
                <div className="relative space-y-6 py-4">
                    {messages.map((msg, idx) => {
                        const fromX = 16.67 + msg.from * 33.33;
                        const toX = 16.67 + msg.to * 33.33;
                        const isLeftToRight = msg.to > msg.from;
                        const isSelf = msg.type === 'self';

                        return (
                            <motion.div
                                key={idx}
                                className="relative h-8 flex items-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 + idx * 0.2 }}
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
                                            background: actors[msg.from].color
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
                                            width: '10%',
                                            height: '24px',
                                            borderColor: actors[msg.from].color,
                                        }}
                                    >
                                        <div
                                            className="absolute bottom-0 left-0 w-0 h-0"
                                            style={{
                                                borderTop: '4px solid transparent',
                                                borderBottom: '4px solid transparent',
                                                borderRight: `6px solid ${actors[msg.from].color}`,
                                                transform: 'translateX(-6px)'
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Label */}
                                <div
                                    className="absolute px-2 py-1 rounded text-xs whitespace-nowrap bg-[var(--bg-primary)] border border-[var(--text-muted)]/30"
                                    style={{
                                        left: isSelf
                                            ? `${fromX + 11}%`
                                            : `${(fromX + toX) / 2}%`,
                                        transform: isSelf ? 'translateX(0)' : 'translateX(-50%)',
                                        top: isSelf ? '-4px' : '50%',
                                        marginTop: isSelf ? 0 : '-10px',
                                    }}
                                >
                                    <span className="text-white">{msg.label}</span>
                                    {msg.note && (
                                        <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-[var(--accent-green)]/20 text-[var(--accent-green)]">
                                            {msg.note}
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Security Note */}
            <motion.div
                className="mt-6 border-2 rounded-lg overflow-hidden"
                style={{ borderColor: '#ef4444' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
            >
                <div
                    className="px-4 py-2 font-bold text-sm"
                    style={{ backgroundColor: '#ef444415', borderBottom: '2px solid #ef4444' }}
                >
                    <span style={{ color: '#ef4444' }}>⚠ SECURITY</span>
                </div>
                <div className="p-4 bg-[var(--bg-secondary)] text-xs space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-[var(--accent-green)]">✓</span>
                        <span><code className="text-[var(--accent-cyan)]">accessToken</code> in Memory (RAM) - XSS cannot read</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[var(--accent-green)]">✓</span>
                        <span><code className="text-[var(--accent-cyan)]">refreshToken</code> in httpOnly Cookie - JS cannot access</span>
                    </div>
                </div>
            </motion.div>

            {/* Legend */}
            <motion.div
                className="flex justify-center gap-8 mt-4 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
            >
                <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-[#f97316]" />
                    <span className="text-[var(--text-muted)]">Message</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-4 border-r-2 border-t-2 border-b-2 rounded-r-lg" style={{ borderColor: '#3b82f6' }} />
                    <span className="text-[var(--text-muted)]">Self-call</span>
                </div>
            </motion.div>
        </div>
    );
};

