import { motion } from 'framer-motion';

/**
 * RSCFlowDiagram - UML sequence diagram showing RSC flow and why MF doesn't work
 */
export const RSCFlowDiagram = () => {
    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Actors */}
            <div className="grid grid-cols-4 gap-3 mb-3">
                {[
                    { name: 'Browser', icon: '🌐', color: '#06b6d4' },
                    { name: 'Next.js', icon: '▲', subtitle: 'App Router', color: '#a855f7' },
                    { name: 'RSC Engine', icon: '⚛️', color: '#22c55e' },
                    { name: 'Module Fed', icon: '📦', color: '#f97316' },
                ].map((actor, i) => (
                    <motion.div
                        key={actor.name}
                        className="text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div
                            className="mx-auto px-2 py-1.5 rounded-lg font-bold text-[10px] border-2 flex items-center justify-center gap-1"
                            style={{ borderColor: actor.color, backgroundColor: `${actor.color}15`, color: actor.color }}
                        >
                            <span>{actor.icon}</span>
                            <span>{actor.name}</span>
                        </div>
                        {actor.subtitle && (
                            <div className="text-[8px] text-[var(--text-muted)] mt-0.5">{actor.subtitle}</div>
                        )}
                        <div className="w-0.5 h-[170px] mx-auto mt-2" style={{ backgroundColor: `${actor.color}30` }} />
                    </motion.div>
                ))}
            </div>

            {/* Timeline */}
            <div className="relative -mt-[170px] h-[170px] text-[8px]">
                {/* Request */}
                <FlowArrow y={10} from={0} to={1} label="1. GET /page" color="#06b6d4" delay={0.3} />

                {/* RSC Render */}
                <FlowArrow y={30} from={1} to={2} label="2. Render Server Component" color="#a855f7" delay={0.4} />
                <FlowArrow y={50} from={2} to={1} label="3. React Flight payload (no JS)" color="#22c55e" delay={0.5} dashed />

                {/* Try to load MF */}
                <FlowArrow y={75} from={1} to={3} label="4. Load remoteEntry.js?" color="#a855f7" delay={0.6} />
                <FlowArrow y={95} from={3} to={1} label="❌ No JS context in RSC!" color="#f97316" delay={0.7} dashed error />

                {/* Send to browser */}
                <FlowArrow y={120} from={1} to={0} label="5. Stream HTML (no MF bundle)" color="#a855f7" delay={0.8} dashed />

                {/* Client only */}
                <FlowArrow y={145} from={0} to={0} label="6. Client Components hydrate" note="MF chỉ hoạt động ở đây" color="#06b6d4" delay={0.9} self />
            </div>

            {/* Key insight */}
            <motion.div
                className="mt-6 grid grid-cols-2 gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
            >
                <div className="p-2 rounded-lg bg-[var(--accent-red)]/10 border border-[var(--accent-red)]/30">
                    <div className="text-[var(--accent-red)] font-bold text-[10px] mb-1">❌ Server Components</div>
                    <p className="text-[9px] text-[var(--text-muted)]">
                        Không có JS runtime → MF không thể execute remoteEntry.js
                    </p>
                </div>
                <div className="p-2 rounded-lg bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/30">
                    <div className="text-[var(--accent-green)] font-bold text-[10px] mb-1">✅ Client Components</div>
                    <p className="text-[9px] text-[var(--text-muted)]">
                        Có JS runtime → MF hoạt động bình thường (sau hydration)
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

const FlowArrow = ({ y, from, to, label, note, color, delay, dashed = false, self = false, error = false }: {
    y: number;
    from: number;
    to: number;
    label: string;
    note?: string;
    color: string;
    delay: number;
    dashed?: boolean;
    self?: boolean;
    error?: boolean;
}) => {
    const colWidth = 25;
    const startX = from * colWidth + colWidth / 2;
    const endX = to * colWidth + colWidth / 2;

    if (self) {
        return (
            <motion.div
                className="absolute flex items-center"
                style={{ top: y, left: `${startX - 8}%`, width: '20%' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay }}
            >
                <div className="px-2 py-0.5 rounded font-mono text-center w-full bg-[var(--accent-cyan)]/10" style={{ color }}>
                    <div>{label}</div>
                    {note && <div className="text-[7px] text-[var(--text-muted)]">{note}</div>}
                </div>
            </motion.div>
        );
    }

    const isReverse = from > to;

    return (
        <motion.div
            className="absolute"
            style={{
                top: y,
                left: `${Math.min(startX, endX)}%`,
                width: `${Math.abs(endX - startX)}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay }}
        >
            <div className="relative h-2 flex items-center">
                <div
                    className="flex-1 h-0.5"
                    style={{
                        backgroundColor: dashed ? 'transparent' : color,
                        borderStyle: dashed ? 'dashed' : 'solid',
                        borderWidth: dashed ? '1px 0 0 0' : '0',
                        borderColor: error ? '#ef4444' : color,
                    }}
                />
                <div
                    className="w-0 h-0 border-t-[3px] border-b-[3px] border-transparent absolute"
                    style={{
                        [isReverse ? 'borderRight' : 'borderLeft']: `5px solid ${error ? '#ef4444' : color}`,
                        [isReverse ? 'left' : 'right']: 0
                    }}
                />
            </div>
            <div className="flex justify-center mt-0.5">
                <span className={`px-1 rounded font-mono ${error ? 'bg-[var(--accent-red)]/20 text-[var(--accent-red)]' : 'bg-[#0a0a12]'}`} style={{ color: error ? '#ef4444' : color }}>
                    {label}
                </span>
            </div>
        </motion.div>
    );
};

export default RSCFlowDiagram;
