import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
    title?: string;
    highlightLines?: number[];
    className?: string;
}

export const CodeBlock = ({
    code,
    language = 'typescript',
    showLineNumbers = true,
    title,
    highlightLines = [],
    className = ''
}: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const customStyle = {
        ...dracula,
        'pre[class*="language-"]': {
            ...dracula['pre[class*="language-"]'],
            background: 'transparent',
            margin: 0,
            padding: '0.75rem 1rem',
            fontSize: 'inherit',
            lineHeight: '1.4'
        },
        'code[class*="language-"]': {
            ...dracula['code[class*="language-"]'],
            background: 'transparent',
            fontSize: 'inherit',
            lineHeight: '1.4'
        }
    };

    return (
        <motion.div
            className={`code-block relative group rounded-2xl overflow-hidden border border-white/10 ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Header */}
            {title && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
                    <span className="text-base text-[var(--accent-cyan)] font-medium">{title}</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--text-muted)] uppercase px-2 py-1 rounded bg-white/5">{language}</span>
                    </div>
                </div>
            )}

            {/* Copy button */}
            <button
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/5 hover:bg-white/15 
                   transition-all opacity-0 group-hover:opacity-100 z-10 hover:scale-105"
                title="Copy code"
            >
                {copied ? (
                    <Check className="w-5 h-5 text-[var(--accent-green)]" />
                ) : (
                    <Copy className="w-5 h-5 text-[var(--text-secondary)]" />
                )}
            </button>

            {/* Code content - scroll if content too long */}
            <div className="text-slide-code max-h-[50vh] overflow-y-auto">
                <SyntaxHighlighter
                    language={language}
                    style={customStyle}
                    showLineNumbers={showLineNumbers}
                    wrapLines={true}
                    wrapLongLines={true}
                    lineProps={(lineNumber) => {
                        const style: React.CSSProperties = {
                            display: 'block',
                            padding: '0.15rem 0.75rem'
                        };
                        if (highlightLines.includes(lineNumber)) {
                            style.backgroundColor = 'rgba(97, 218, 251, 0.1)';
                            style.borderLeft = '3px solid var(--accent-blue)';
                        }
                        return { style };
                    }}
                >
                    {code.trim()}
                </SyntaxHighlighter>
            </div>
        </motion.div>
    );
};
