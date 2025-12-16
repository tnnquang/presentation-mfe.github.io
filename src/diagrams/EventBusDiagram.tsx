import { motion } from 'framer-motion';

/**
 * EventBusDiagram - Technical component diagram
 * Shows Pub/Sub pattern with BroadcastChannel
 */
export const EventBusDiagram = () => {
    const components = [
        { id: 'pub', name: 'Publisher', subtitle: 'Remote 1 (:3001)', color: '#3b82f6' },
        { id: 'bus', name: 'Event Bus', subtitle: 'BroadcastChannel', color: '#f97316' },
        { id: 'sub', name: 'Subscriber', subtitle: 'Remote 2 (:3002)', color: '#22c55e' },
    ];

    const events = [
        { name: 'user:selected', color: '#3b82f6' },
        { name: 'cart:updated', color: '#a855f7' },
        { name: 'auth:logout', color: '#ef4444' },
    ];

    return (
        <div className="w-full max-w-5xl mx-auto font-mono text-sm">
            {/* Component Nodes */}
            <div className="grid grid-cols-3 gap-8 mb-8">
                {components.map((comp, idx) => (
                    <motion.div
                        key={comp.id}
                        className="border-2 rounded-lg overflow-hidden"
                        style={{ borderColor: comp.color }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        {/* Header */}
                        <div
                            className="px-4 py-2 font-bold text-center text-sm"
                            style={{ backgroundColor: `${comp.color}15`, borderBottom: `2px solid ${comp.color}` }}
                        >
                            <span style={{ color: comp.color }}>{comp.name}</span>
                        </div>

                        {/* Body */}
                        <div className="p-4 bg-[var(--bg-secondary)]">
                            <div className="text-xs text-[var(--text-muted)] text-center mb-3">{comp.subtitle}</div>

                            {comp.id === 'pub' && (
                                <div className="text-xs px-2 py-1 rounded border text-center" style={{ borderColor: `${comp.color}50` }}>
                                    <span className="text-[var(--accent-pink)]">emit</span>
                                    <span className="text-white">(eventName, data)</span>
                                </div>
                            )}

                            {comp.id === 'bus' && (
                                <div className="space-y-1">
                                    {events.map((evt) => (
                                        <div
                                            key={evt.name}
                                            className="text-[10px] px-2 py-1 rounded border text-center"
                                            style={{ borderColor: `${evt.color}50`, backgroundColor: `${evt.color}10` }}
                                        >
                                            <span style={{ color: evt.color }}>{evt.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {comp.id === 'sub' && (
                                <div className="text-xs px-2 py-1 rounded border text-center" style={{ borderColor: `${comp.color}50` }}>
                                    <span className="text-[var(--accent-pink)]">on</span>
                                    <span className="text-white">(eventName, handler)</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Connection Arrows */}
            <div className="relative h-12 mb-6">
                {/* Left arrow: Publisher → Bus */}
                <motion.div
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{ left: '20%', width: '26%' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="h-0.5 w-full bg-gradient-to-r from-[#3b82f6] to-[#f97316]" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0"
                        style={{
                            borderTop: '5px solid transparent',
                            borderBottom: '5px solid transparent',
                            borderLeft: '8px solid #f97316',
                        }}
                    />
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] px-2 py-0.5 rounded bg-[var(--bg-primary)] border border-[var(--text-muted)]/30">
                        <span className="text-[var(--accent-cyan)]">postMessage()</span>
                    </div>
                </motion.div>

                {/* Right arrow: Bus → Subscriber */}
                <motion.div
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{ left: '54%', width: '26%' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="h-0.5 w-full bg-gradient-to-r from-[#f97316] to-[#22c55e]" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0"
                        style={{
                            borderTop: '5px solid transparent',
                            borderBottom: '5px solid transparent',
                            borderLeft: '8px solid #22c55e',
                        }}
                    />
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] px-2 py-0.5 rounded bg-[var(--bg-primary)] border border-[var(--text-muted)]/30">
                        <span className="text-[var(--accent-cyan)]">onmessage</span>
                    </div>
                </motion.div>
            </div>

            {/* Features */}
            <motion.div
                className="grid grid-cols-3 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
            >
                {[
                    { label: 'Decoupled', desc: 'Apps không cần biết nhau', color: '#3b82f6' },
                    { label: 'Cross-Tab', desc: 'Sync giữa browser tabs', color: '#f97316' },
                    { label: 'Real-time', desc: 'Update ngay lập tức', color: '#22c55e' },
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

            {/* Legend */}
            <motion.div
                className="flex justify-center gap-8 mt-4 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
            >
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded border-2" style={{ borderColor: '#3b82f6' }} />
                    <span className="text-[var(--text-muted)]">Publisher</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded border-2" style={{ borderColor: '#f97316' }} />
                    <span className="text-[var(--text-muted)]">Channel</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded border-2" style={{ borderColor: '#22c55e' }} />
                    <span className="text-[var(--text-muted)]">Subscriber</span>
                </div>
            </motion.div>
        </div>
    );
};

export default EventBusDiagram;

