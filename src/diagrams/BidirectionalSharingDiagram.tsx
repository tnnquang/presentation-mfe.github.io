import { motion } from 'framer-motion';

/**
 * BidirectionalSharingDiagram - UML sequence diagram
 * Shows how Remote1 and Remote2 share components with cached manifests
 */
export const BidirectionalSharingDiagram = () => {
    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Actors */}
            <div className="grid grid-cols-4 gap-4 mb-4">
                {[
                    { name: 'Host App', color: '#06b6d4' },
                    { name: 'Remote 1', subtitle: 'remote-umi', color: '#a855f7' },
                    { name: 'Remote 2', subtitle: 'remote-vite', color: '#22c55e' },
                    { name: 'Cache', subtitle: 'Memory', color: '#f97316' },
                ].map((actor, i) => (
                    <motion.div
                        key={actor.name}
                        className="text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div
                            className="mx-auto px-3 py-2 rounded-lg font-bold text-xs border-2"
                            style={{ borderColor: actor.color, backgroundColor: `${actor.color}15`, color: actor.color }}
                        >
                            {actor.name}
                        </div>
                        {actor.subtitle && (
                            <div className="text-[10px] text-[var(--text-muted)] mt-1">{actor.subtitle}</div>
                        )}
                        <div className="w-0.5 h-[220px] mx-auto mt-2" style={{ backgroundColor: `${actor.color}30` }} />
                    </motion.div>
                ))}
            </div>

            {/* Flow arrows */}
            <div className="relative -mt-[220px] h-[220px] text-[10px]">
                {/* Phase 1: Initial load */}
                <FlowLine y={20} from={0} to={1} label="1. preload remoteEntry.js" color="#06b6d4" delay={0.3} />
                <FlowLine y={40} from={0} to={2} label="2. preload remoteEntry.js" color="#06b6d4" delay={0.4} />
                <FlowLine y={60} from={1} to={3} label="3. store manifest" color="#a855f7" delay={0.5} />
                <FlowLine y={80} from={2} to={3} label="4. store manifest" color="#22c55e" delay={0.6} />

                {/* Phase 2: Cross-remote usage */}
                <FlowLine y={110} from={0} to={1} label="5. load Remote1 component" color="#06b6d4" delay={0.8} />
                <FlowLine y={130} from={1} to={3} label="6. need Remote2 component?" color="#a855f7" delay={0.9} />
                <FlowLine y={150} from={3} to={1} label="7. ✓ manifest cached!" color="#f97316" delay={1.0} dashed />
                <FlowLine y={170} from={1} to={2} label="8. fetch ComponentX.js only" color="#a855f7" delay={1.1} />
                <FlowLine y={190} from={2} to={1} label="9. return component" color="#22c55e" delay={1.2} dashed />
            </div>

            {/* Legend */}
            <motion.div
                className="mt-8 flex justify-center gap-6 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <div className="flex items-center gap-2">
                    <div className="w-6 h-0.5 bg-[var(--accent-cyan)]" />
                    <span className="text-[var(--text-muted)]">Request</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-0.5 border-t border-dashed border-[var(--accent-orange)]" />
                    <span className="text-[var(--text-muted)]">Response (cached)</span>
                </div>
            </motion.div>
        </div>
    );
};

const FlowLine = ({ y, from, to, label, color, delay, dashed = false }: {
    y: number;
    from: number;
    to: number;
    label: string;
    color: string;
    delay: number;
    dashed?: boolean;
}) => {
    const colWidth = 25;
    const startX = from * colWidth + colWidth / 2;
    const endX = to * colWidth + colWidth / 2;
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
                className="absolute px-1 py-0.5 rounded whitespace-nowrap font-mono"
                style={{
                    backgroundColor: '#0a0a12',
                    color: color,
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '9px'
                }}
            >
                {label}
            </span>
        </motion.div>
    );
};

export default BidirectionalSharingDiagram;
