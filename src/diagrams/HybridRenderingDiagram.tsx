import { motion } from 'framer-motion';

/**
 * HybridRenderingDiagram - UML sequence diagram for hybrid rendering solutions
 */
export const HybridRenderingDiagram = () => {
    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Actors */}
            <div className="grid grid-cols-5 gap-2 mb-4">
                {[
                    { name: 'Browser', color: '#06b6d4' },
                    { name: 'Next.js Host', subtitle: 'App Router', color: '#a855f7' },
                    { name: 'Edge Runtime', color: '#f97316' },
                    { name: 'Remote CSR', subtitle: 'React SPA', color: '#22c55e' },
                    { name: 'Remote API', color: '#ec4899' },
                ].map((actor, i) => (
                    <motion.div
                        key={actor.name}
                        className="text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                    >
                        <div
                            className="mx-auto px-2 py-1.5 rounded-lg font-bold text-[10px] border-2"
                            style={{ borderColor: actor.color, backgroundColor: `${actor.color}15`, color: actor.color }}
                        >
                            {actor.name}
                        </div>
                        {actor.subtitle && (
                            <div className="text-[8px] text-[var(--text-muted)] mt-0.5">{actor.subtitle}</div>
                        )}
                        <div className="w-0.5 h-[180px] mx-auto mt-2" style={{ backgroundColor: `${actor.color}30` }} />
                    </motion.div>
                ))}
            </div>

            {/* Flow */}
            <div className="relative -mt-[180px] h-[180px] text-[8px]">
                <FlowLine y={15} from={0} to={1} label="1. Request /page" color="#06b6d4" delay={0.3} />
                <FlowLine y={35} from={1} to={4} label="2. fetch() API data" color="#a855f7" delay={0.4} />
                <FlowLine y={55} from={4} to={1} label="3. JSON response" color="#ec4899" delay={0.5} dashed />
                <FlowLine y={75} from={1} to={2} label="4. SSR skeleton + data" color="#a855f7" delay={0.6} />
                <FlowLine y={95} from={2} to={0} label="5. Stream HTML" color="#f97316" delay={0.7} dashed />
                <FlowLine y={115} from={0} to={3} label="6. Load remoteEntry.js" color="#06b6d4" delay={0.8} />
                <FlowLine y={135} from={3} to={0} label="7. CSR Component" color="#22c55e" delay={0.9} dashed />
                <FlowLine y={155} from={0} to={0} label="8. Hydrate & Mount" color="#06b6d4" delay={1.0} self />
            </div>

            {/* Legend */}
            <motion.div
                className="mt-8 grid grid-cols-3 gap-3 text-[9px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                <div className="glass p-2 rounded-lg text-center">
                    <div className="text-[var(--accent-purple)] font-bold">Server Phase</div>
                    <div className="text-[var(--text-muted)]">RSC + API fetch</div>
                </div>
                <div className="glass p-2 rounded-lg text-center">
                    <div className="text-[var(--accent-orange)] font-bold">Edge Phase</div>
                    <div className="text-[var(--text-muted)]">Stream skeleton</div>
                </div>
                <div className="glass p-2 rounded-lg text-center">
                    <div className="text-[var(--accent-green)] font-bold">Client Phase</div>
                    <div className="text-[var(--text-muted)]">Load CSR remote</div>
                </div>
            </motion.div>
        </div>
    );
};

const FlowLine = ({ y, from, to, label, color, delay, dashed = false, self = false }: {
    y: number;
    from: number;
    to: number;
    label: string;
    color: string;
    delay: number;
    dashed?: boolean;
    self?: boolean;
}) => {
    const colWidth = 20;
    const startX = from * colWidth + colWidth / 2;
    const endX = to * colWidth + colWidth / 2;

    if (self) {
        return (
            <motion.div
                className="absolute flex items-center justify-center"
                style={{ top: y, left: `${startX}%`, width: '15%' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay }}
            >
                <div className="px-2 py-0.5 rounded bg-[#0a0a12] font-mono" style={{ color }}>
                    {label}
                </div>
            </motion.div>
        );
    }

    const isReverse = from > to;

    return (
        <motion.div
            className="absolute flex items-center"
            style={{
                top: y,
                left: `${Math.min(startX, endX)}%`,
                width: `${Math.abs(endX - startX)}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay }}
        >
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
            <span
                className="absolute px-1 py-0.5 rounded whitespace-nowrap bg-[#0a0a12] font-mono"
                style={{ color, top: '-10px', left: '50%', transform: 'translateX(-50%)' }}
            >
                {label}
            </span>
        </motion.div>
    );
};

export default HybridRenderingDiagram;
