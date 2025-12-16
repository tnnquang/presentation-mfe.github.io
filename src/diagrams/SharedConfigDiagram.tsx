import { motion } from 'framer-motion';

/**
 * Shared Config Diagram
 * Shows Module Federation shared dependencies configuration
 */
export const SharedConfigDiagram = () => {
    const options = [
        {
            name: 'singleton',
            type: 'boolean',
            desc: 'Chỉ 1 instance trong toàn app',
            required: 'BẮT BUỘC cho React!',
            color: 'var(--accent-red)',
        },
        {
            name: 'eager',
            type: 'boolean',
            desc: 'Load ngay khi app start',
            required: 'Khuyên dùng cho React',
            color: 'var(--accent-blue)',
        },
        {
            name: 'requiredVersion',
            type: 'string',
            desc: 'Version tối thiểu cần có',
            required: 'Optional',
            color: 'var(--accent-cyan)',
        },
        {
            name: 'strictVersion',
            type: 'boolean',
            desc: 'Phải đúng version, không fallback',
            required: 'Optional',
            color: 'var(--accent-purple)',
        },
    ];

    return (
        <div className="w-full">
            {/* Options table */}
            <div className="space-y-3 mb-6">
                {options.map((opt, i) => (
                    <motion.div
                        key={opt.name}
                        className="glass p-4 rounded-xl flex items-center gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="w-32">
                            <code className="text-sm" style={{ color: opt.color }}>
                                {opt.name}
                            </code>
                        </div>
                        <div className="w-20 text-xs text-[var(--text-muted)]">
                            {opt.type}
                        </div>
                        <div className="flex-1 text-sm">
                            {opt.desc}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded ${opt.required.includes('BẮT BUỘC')
                                ? 'bg-red-500/20 text-red-400'
                                : opt.required.includes('Khuyên')
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : 'bg-gray-500/20 text-gray-400'
                            }`}>
                            {opt.required}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Code example */}
            <motion.div
                className="glass p-5 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div className="text-xs text-[var(--text-muted)] mb-2">Best Practice Config:</div>
                <pre className="text-sm text-[var(--accent-cyan)] whitespace-pre-wrap">
                    {`shared: {
  react: { singleton: true, eager: true },
  'react-dom': { singleton: true, eager: true },
  antd: { singleton: true },
  zustand: { singleton: true },
}`}
                </pre>
            </motion.div>

            {/* Warning */}
            <motion.div
                className="mt-4 flex items-start gap-2 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
            >
                <span className="text-yellow-400">⚠️</span>
                <span className="text-[var(--text-secondary)]">
                    React không có <code className="text-[var(--accent-red)]">singleton: true</code> →
                    Lỗi "Invalid hook call" hoặc "Two copies of React"
                </span>
            </motion.div>
        </div>
    );
};

export default SharedConfigDiagram;
