import { motion } from 'framer-motion';

/**
 * BroadcastChannelDiagram - UML-style sequence diagram
 * Shows how BroadcastChannel works across tabs
 */
export const BroadcastChannelDiagram = () => {
    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Actors */}
            <div className="grid grid-cols-3 gap-8 mb-4">
                {[
                    { name: 'Tab A', subtitle: 'App chính', color: '#06b6d4' },
                    { name: 'BroadcastChannel', subtitle: '"mfe-sync"', color: '#a855f7' },
                    { name: 'Tab B', subtitle: 'App khác', color: '#22c55e' },
                ].map((actor, i) => (
                    <motion.div
                        key={actor.name}
                        className="text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div
                            className="mx-auto px-4 py-2 rounded-lg font-bold text-sm border-2"
                            style={{ borderColor: actor.color, backgroundColor: `${actor.color}20`, color: actor.color }}
                        >
                            {actor.name}
                        </div>
                        <div className="text-xs text-[var(--text-muted)] mt-1">{actor.subtitle}</div>
                        <div className="w-0.5 h-[180px] mx-auto mt-2" style={{ backgroundColor: `${actor.color}40` }} />
                    </motion.div>
                ))}
            </div>

            {/* Flow arrows */}
            <div className="relative -mt-[180px] h-[180px]">
                <FlowArrow y={30} from="left" label="postMessage({ type: 'LOGOUT' })" color="#06b6d4" delay={0.4} />
                <FlowArrow y={80} from="right" label="onmessage → event.data" color="#22c55e" delay={0.7} />
                <FlowArrow y={130} from="right" label="clearToken() → redirect" color="#22c55e" delay={1} dashed />
            </div>
        </div>
    );
};

const FlowArrow = ({ y, from, label, color, delay, dashed = false }: {
    y: number;
    from: 'left' | 'right';
    label: string;
    color: string;
    delay: number;
    dashed?: boolean;
}) => (
    <motion.div
        className="absolute left-1/4 right-1/4 flex items-center"
        style={{ top: y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay }}
    >
        <div className={`flex-1 h-0.5 ${dashed ? 'border-dashed border-t-2' : ''}`}
            style={{ backgroundColor: dashed ? 'transparent' : color, borderColor: color }} />
        <div className="w-0 h-0 border-t-4 border-b-4 border-transparent"
            style={{ [from === 'left' ? 'borderLeft' : 'borderRight']: `6px solid ${color}` }} />
        <span className="absolute left-1/2 -translate-x-1/2 -top-4 px-2 py-0.5 text-[10px] font-mono rounded whitespace-nowrap"
            style={{ backgroundColor: '#1e1e2e', color }}>
            {label}
        </span>
    </motion.div>
);

export default BroadcastChannelDiagram;
