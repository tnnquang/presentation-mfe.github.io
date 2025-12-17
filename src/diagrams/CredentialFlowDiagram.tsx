import { motion } from 'framer-motion';

/**
 * CredentialFlowDiagram - UML sequence diagram
 * Shows cookie/token flow through reverse proxy
 */
export const CredentialFlowDiagram = () => {
    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Actors */}
            <div className="grid grid-cols-4 gap-4 mb-4">
                {[
                    { name: 'Browser', color: '#06b6d4' },
                    { name: 'Nginx', subtitle: 'app.company.com', color: '#a855f7' },
                    { name: 'Remote App', subtitle: 'internal:3001', color: '#22c55e' },
                    { name: 'API', subtitle: 'internal:8080', color: '#f97316' },
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
                            <div className="text-[9px] text-[var(--text-muted)] mt-1">{actor.subtitle}</div>
                        )}
                        <div className="w-0.5 h-[200px] mx-auto mt-2" style={{ backgroundColor: `${actor.color}30` }} />
                    </motion.div>
                ))}
            </div>

            {/* Flow */}
            <div className="relative -mt-[200px] h-[200px] text-[9px]">
                {/* Step 1: Browser to Nginx */}
                <FlowArrow y={20} from={0} to={1}
                    label="GET /mfe/products/Component.js"
                    sublabel="Cookie: refresh_token=xxx"
                    color="#06b6d4" delay={0.3} />

                {/* Step 2: Nginx to Remote */}
                <FlowArrow y={60} from={1} to={2}
                    label="proxy_pass + Cookie forward"
                    sublabel="proxy_set_header Cookie $http_cookie"
                    color="#a855f7" delay={0.5} />

                {/* Step 3: Remote to API */}
                <FlowArrow y={100} from={2} to={3}
                    label="fetch('/api/data')"
                    sublabel="credentials: 'include'"
                    color="#22c55e" delay={0.7} />

                {/* Step 4: API response */}
                <FlowArrow y={140} from={3} to={2}
                    label="JSON response"
                    color="#f97316" delay={0.9} dashed />

                {/* Step 5: Final response */}
                <FlowArrow y={170} from={1} to={0}
                    label="Component + Data"
                    color="#a855f7" delay={1.1} dashed />
            </div>

            {/* Key Points */}
            <motion.div
                className="mt-8 grid grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
            >
                <div className="glass p-3 rounded-lg text-xs">
                    <div className="text-[var(--accent-green)] font-bold mb-1">✅ Same Origin Benefits</div>
                    <ul className="text-[var(--text-muted)] space-y-1">
                        <li>• Cookie tự động gửi kèm</li>
                        <li>• Không cần CORS config</li>
                        <li>• httpOnly cookies work</li>
                    </ul>
                </div>
                <div className="glass p-3 rounded-lg text-xs">
                    <div className="text-[var(--accent-cyan)] font-bold mb-1">🔧 Nginx Config</div>
                    <code className="text-[var(--text-muted)] text-[9px] block">
                        proxy_set_header Cookie $http_cookie;<br />
                        proxy_set_header Authorization $http_authorization;
                    </code>
                </div>
            </motion.div>
        </div>
    );
};

const FlowArrow = ({ y, from, to, label, sublabel, color, delay, dashed = false }: {
    y: number;
    from: number;
    to: number;
    label: string;
    sublabel?: string;
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
            <div className="relative h-4 flex items-center">
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
            <div className="text-center mt-0.5">
                <span className="px-1 py-0.5 rounded bg-[#0a0a12] font-mono" style={{ color }}>
                    {label}
                </span>
                {sublabel && (
                    <div className="text-[8px] text-[var(--text-muted)] mt-0.5">{sublabel}</div>
                )}
            </div>
        </motion.div>
    );
};

export default CredentialFlowDiagram;
