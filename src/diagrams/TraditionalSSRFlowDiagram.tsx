import { motion } from 'framer-motion';

/**
 * TraditionalSSRFlowDiagram - UML sequence diagram for traditional SSR lifecycle
 */
export const TraditionalSSRFlowDiagram = () => {
    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Title */}
            <div className="text-center mb-4">
                <h3 className="text-[var(--accent-green)] font-bold text-lg">Traditional SSR (Next.js Pages Router)</h3>
                <p className="text-[var(--text-muted)] text-xs">Request → Server Render → Full JS Bundle → Hydration</p>
            </div>

            {/* Actors */}
            <div className="grid grid-cols-4 gap-3 mb-3">
                {[
                    { name: 'Browser', icon: '🌐', color: '#06b6d4' },
                    { name: 'Server', icon: '🖥️', color: '#a855f7' },
                    { name: 'React', icon: '⚛️', color: '#22c55e' },
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
                        <div className="w-0.5 h-[200px] mx-auto mt-2" style={{ backgroundColor: `${actor.color}30` }} />
                    </motion.div>
                ))}
            </div>

            {/* Timeline */}
            <div className="relative -mt-[200px] h-[200px] text-[9px]">
                {/* Request phase */}
                <TimelineStep y={10} from={0} to={1} label="1. GET /page" note="Browser request" color="#06b6d4" delay={0.3} />

                {/* Server SSR phase */}
                <TimelineStep y={35} from={1} to={2} label="2. getServerSideProps()" note="Data fetch on server" color="#a855f7" delay={0.4} />
                <TimelineStep y={60} from={2} to={1} label="3. renderToString()" note="Full HTML generated" color="#22c55e" delay={0.5} dashed />

                {/* Response phase */}
                <TimelineStep y={85} from={1} to={0} label="4. HTML + Full JS bundle" note="Includes ALL React code" color="#a855f7" delay={0.6} dashed />

                {/* Hydration phase */}
                <TimelineStep y={110} from={0} to={3} label="5. Load remoteEntry.js" note="MF chunks loaded" color="#06b6d4" delay={0.7} />
                <TimelineStep y={135} from={3} to={0} label="6. Shared scope init" note="React, libs shared" color="#f97316" delay={0.8} dashed />
                <TimelineStep y={160} from={0} to={0} label="7. hydrate()" note="React takes over DOM" color="#22c55e" delay={0.9} self />
                <TimelineStep y={180} from={0} to={0} label="8. ✅ Interactive!" note="MF components work" color="#22c55e" delay={1.0} self success />
            </div>

            {/* Key insight */}
            <motion.div
                className="mt-6 p-3 rounded-lg bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                <div className="text-[var(--accent-green)] font-bold text-xs mb-1">✅ Tại sao MF hoạt động với SSR?</div>
                <p className="text-[var(--text-muted)] text-[10px]">
                    <strong>Full JS bundle gửi về client</strong> → MF runtime có thể tải & execute remoteEntry.js →
                    Shared scope được khởi tạo → React hydrate toàn bộ DOM → Remote components mount bình thường
                </p>
            </motion.div>
        </div>
    );
};

const TimelineStep = ({ y, from, to, label, note, color, delay, dashed = false, self = false, success = false }: {
    y: number;
    from: number;
    to: number;
    label: string;
    note: string;
    color: string;
    delay: number;
    dashed?: boolean;
    self?: boolean;
    success?: boolean;
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
                <div className={`px-2 py-0.5 rounded font-mono text-center w-full ${success ? 'bg-[var(--accent-green)]/20' : 'bg-[#0a0a12]'}`} style={{ color }}>
                    <div>{label}</div>
                    <div className="text-[8px] text-[var(--text-muted)]">{note}</div>
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
            <div className="relative h-3 flex items-center">
                <div
                    className="flex-1 h-0.5"
                    style={{
                        backgroundColor: dashed ? 'transparent' : color,
                        borderStyle: dashed ? 'dashed' : 'solid',
                        borderWidth: dashed ? '1px 0 0 0' : '0',
                        borderColor: color,
                    }}
                />
                <div
                    className="w-0 h-0 border-t-[3px] border-b-[3px] border-transparent absolute"
                    style={{
                        [isReverse ? 'borderRight' : 'borderLeft']: `5px solid ${color}`,
                        [isReverse ? 'left' : 'right']: 0
                    }}
                />
            </div>
            <div className="flex justify-center mt-0.5">
                <div className="text-center">
                    <span className="px-1 rounded bg-[#0a0a12] font-mono" style={{ color }}>{label}</span>
                    <div className="text-[8px] text-[var(--text-muted)]">{note}</div>
                </div>
            </div>
        </motion.div>
    );
};

export default TraditionalSSRFlowDiagram;
