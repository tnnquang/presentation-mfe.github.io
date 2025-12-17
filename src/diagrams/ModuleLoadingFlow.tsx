import { motion } from 'framer-motion';

/**
 * ModuleLoadingFlowDiagram - UML-style sequence diagram
 * Shows the flow between Host, CDN, and Runtime
 */
export const ModuleLoadingFlowDiagram = () => {
    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Actors */}
            <div className="grid grid-cols-4 gap-4 mb-4">
                {[
                    { name: 'Browser', color: '#64748b' },
                    { name: 'Host App', color: '#06b6d4' },
                    { name: 'CDN', color: '#3b82f6' },
                    { name: 'Runtime', color: '#22c55e' },
                ].map((actor, i) => (
                    <motion.div
                        key={actor.name}
                        className="text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div
                            className="mx-auto w-20 h-10 rounded-lg flex items-center justify-center font-bold text-xs border-2"
                            style={{ borderColor: actor.color, backgroundColor: `${actor.color}20`, color: actor.color }}
                        >
                            {actor.name}
                        </div>
                        <div className="w-0.5 h-[280px] mx-auto mt-2" style={{ backgroundColor: `${actor.color}40` }} />
                    </motion.div>
                ))}
            </div>

            {/* Flow arrows - positioned absolutely */}
            <div className="relative -mt-[280px] h-[280px]">
                {/* Step 1: Browser -> Host */}
                <FlowArrow from={0} to={1} y={20} label="navigate('/products')" color="#64748b" delay={0.3} />

                {/* Step 2: Host -> CDN */}
                <FlowArrow from={1} to={2} y={60} label="GET remoteEntry.js" color="#06b6d4" delay={0.5} />

                {/* Step 3: CDN -> Host (response) */}
                <FlowArrow from={2} to={1} y={100} label="manifest + metadata" color="#3b82f6" delay={0.7} dashed />

                {/* Step 4: Host -> Runtime */}
                <FlowArrow from={1} to={3} y={140} label="parse & check shared" color="#06b6d4" delay={0.9} />

                {/* Step 5: Runtime -> Host (shared ok) */}
                <FlowArrow from={3} to={1} y={180} label="react@18 ✓ reuse" color="#22c55e" delay={1.1} dashed />

                {/* Step 6: Host -> CDN (fetch chunk) */}
                <FlowArrow from={1} to={2} y={220} label="GET ProductGrid.js" color="#06b6d4" delay={1.3} />

                {/* Step 7: CDN -> Browser (render) */}
                <FlowArrow from={1} to={0} y={260} label="render <ProductGrid/>" color="#22c55e" delay={1.5} dashed />
            </div>
        </div>
    );
};

// Helper component for flow arrows
const FlowArrow = ({
    from,
    to,
    y,
    label,
    color,
    delay,
    dashed = false
}: {
    from: number;
    to: number;
    y: number;
    label: string;
    color: string;
    delay: number;
    dashed?: boolean;
}) => {
    const colWidth = 25; // percentage
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
            {/* Arrow line */}
            <div
                className="flex-1 h-0.5"
                style={{
                    backgroundColor: color,
                    borderStyle: dashed ? 'dashed' : 'solid',
                    borderWidth: dashed ? '1px' : '0',
                    borderColor: color,
                    height: dashed ? '0' : '2px'
                }}
            />

            {/* Arrow head */}
            <div
                className="w-0 h-0 border-t-4 border-b-4 border-transparent"
                style={{
                    [isReverse ? 'borderRight' : 'borderLeft']: `6px solid ${color}`,
                    position: 'absolute',
                    [isReverse ? 'left' : 'right']: 0
                }}
            />

            {/* Label */}
            <span
                className="absolute px-2 py-0.5 text-[10px] font-mono rounded whitespace-nowrap"
                style={{
                    backgroundColor: '#1e1e2e',
                    color: color,
                    top: '-16px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}
            >
                {label}
            </span>
        </motion.div>
    );
};

export default ModuleLoadingFlowDiagram;
