import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { CodeBlock } from '../components';
import {
    MonolithVsMfeDiagram,
    ModuleFederationArchDiagram,
    SequenceDiagram,
    TokenSyncFlowDiagram,
    ModuleLoadingFlowDiagram,
    CSSIsolationDiagram,
    RoutingFlowDiagram,
    CICDPipelineDiagram,
    SharedConfigDiagram,
    EventBusDiagram
} from '../diagrams';

export interface SlideData {
    id: number;
    title: string;
    section: string;
    content: ReactNode;
    variant?: 'default' | 'title' | 'section' | 'code' | 'diagram';
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1 }
    })
};

const AnimatedList = ({ items, className = '' }: { items: string[]; className?: string }) => (
    <ul className={`space-y-4 text-slide-body ${className}`}>
        {items.map((item, i) => (
            <motion.li
                key={i}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="flex items-start gap-3"
            >
                <span className="text-[var(--accent-blue)] mt-1">•</span>
                <span dangerouslySetInnerHTML={{ __html: item }} />
            </motion.li>
        ))}
    </ul>
);

const Table = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
    <motion.table
        className="w-full text-left border-collapse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
    >
        <thead>
            <tr className="border-b-2 border-white/20">
                {headers.map((h, i) => (
                    <th key={i} className="py-5 px-6 text-[var(--accent-cyan)] font-semibold text-lg">
                        {h}
                    </th>
                ))}
            </tr>
        </thead>
        <tbody>
            {rows.map((row, i) => (
                <motion.tr
                    key={i}
                    className="border-b border-white/10 hover:bg-white/5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                >
                    {row.map((cell, j) => (
                        <td
                            key={j}
                            className="py-4 px-6 text-lg"
                            dangerouslySetInnerHTML={{ __html: cell }}
                        />
                    ))}
                </motion.tr>
            ))}
        </tbody>
    </motion.table>
);

export const slides: SlideData[] = [
    // ===== SLIDE 1: Title =====
    {
        id: 1,
        title: 'Title',
        section: 'Introduction',
        variant: 'title',
        content: (
            <div className="text-center">
                <motion.div
                    className="text-6xl mb-6"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                >
                    MFE
                </motion.div>
                <motion.h1
                    className="text-slide-title mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Micro-Frontend Architecture
                    <br />
                    <span className="text-[var(--accent-blue)]">with Module Federation</span>
                </motion.h1>
                <motion.p
                    className="text-slide-body text-[var(--text-secondary)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Complete Technical Guide
                </motion.p>
                <motion.div
                    className="mt-12 text-[var(--text-muted)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    Từ người không biết gì → hiểu và triển khai được MFE
                </motion.div>
            </div>
        ),
    },

    // ===== SLIDE 2: Table of Contents =====
    {
        id: 2,
        title: 'Mục lục',
        section: 'Introduction',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header text-center mb-10">
                    Mục lục
                </h2>
                <div className="grid grid-cols-2 gap-6">
                    {[
                        { num: '01', title: 'Micro-Frontend là gì?', icon: '🏗️' },
                        { num: '02', title: 'Module Federation', icon: '🔗' },
                        { num: '03', title: 'Git Submodules', icon: '📦' },
                        { num: '04', title: 'Cấu hình MF', icon: '⚙️' },
                        { num: '05', title: 'Performance Optimization', icon: '⚡' },
                        { num: '06', title: 'CSS Isolation', icon: '🎨' },
                        { num: '07', title: 'Cross-App Communication', icon: '📡' },
                        { num: '08', title: 'BroadcastChannel vs MessageChannel', icon: '📱' },
                        { num: '09', title: 'Secure Token Pattern', icon: '🔐' },
                        { num: '10', title: 'Qiankun vs Module Federation', icon: '⚖️' },
                    ].map((item, i) => (
                        <motion.div
                            key={item.num}
                            className="glass p-6 rounded-xl flex items-center gap-4 hover:border-[var(--accent-blue)]/50 border border-transparent transition-all cursor-pointer"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.02, x: 10 }}
                        >
                            <span className="text-[var(--accent-purple)] font-bold text-xl">{item.num}</span>
                            <span className="text-lg">{item.title}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        ),
    },

    // ===== SLIDE 3: MFE Definition =====
    {
        id: 3,
        title: 'Micro-Frontend là gì?',
        section: 'Micro-Frontend Basics',
        variant: 'section',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-8">
                    Micro-Frontend là gì?
                </h2>
                <motion.div
                    className="glass p-8 rounded-xl mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <p className="text-slide-body leading-relaxed">
                        <span className="text-[var(--accent-cyan)] font-semibold">Micro-Frontend</span> là kiến trúc chia một ứng dụng frontend
                        <span className="text-[var(--accent-red)]"> monolithic</span> thành các ứng dụng nhỏ hơn,
                        <span className="text-[var(--accent-green)]"> độc lập</span>
                    </p>
                </motion.div>
                <AnimatedList
                    items={[
                        '<span class="highlight-green">Phát triển độc lập</span> bởi các team khác nhau',
                        '<span class="highlight-blue">Deploy độc lập</span> không ảnh hưởng đến team khác',
                        '<span class="highlight-purple">Sử dụng công nghệ khác nhau</span> (React, Vue, Angular)',
                    ]}
                />
            </div>
        ),
    },

    // ===== SLIDE 4: Monolith vs MFE Diagram =====
    {
        id: 4,
        title: 'Monolith vs MFE',
        section: 'Micro-Frontend Basics',
        variant: 'diagram',
        content: (
            <div className="w-full">
                <h2 className="text-slide-header text-center mb-8">
                    Monolith → Micro-Frontend
                </h2>
                <MonolithVsMfeDiagram />
            </div>
        ),
    },

    // ===== SLIDE 5: Problems with Monolith =====
    {
        id: 5,
        title: 'Vấn đề với Monolith',
        section: 'Micro-Frontend Basics',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-8">
                    Vấn đề với Monolith
                </h2>
                <Table
                    headers={['Vấn đề', 'Mô tả']}
                    rows={[
                        ['<span class="text-[var(--accent-red)]">Build chậm</span>', 'App lớn → build mất <strong>10-30 phút</strong>'],
                        ['<span class="text-[var(--accent-red)]">Conflict nhiều</span>', '10 developers merge cùng repo → conflicts'],
                        ['<span class="text-[var(--accent-red)]">Coupling cao</span>', 'Thay đổi 1 module → phải test toàn bộ'],
                        ['<span class="text-[var(--accent-red)]">Deploy rủi ro</span>', 'Bug 1 feature → rollback toàn bộ app'],
                        ['<span class="text-[var(--accent-red)]">Khó scale team</span>', 'Thêm người → overhead tăng theo'],
                    ]}
                />
            </div>
        ),
    },

    // ===== SLIDE 6: Benefits of MFE =====
    {
        id: 6,
        title: 'Lợi ích của MFE',
        section: 'Micro-Frontend Basics',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-8">
                    Lợi ích của Micro-Frontend
                </h2>
                <Table
                    headers={['Lợi ích', 'Mô tả']}
                    rows={[
                        ['<span class="text-[var(--accent-green)]">Build nhanh</span>', 'Mỗi app nhỏ → build <strong>1-2 phút</strong>'],
                        ['<span class="text-[var(--accent-green)]">Team độc lập</span>', 'Team A deploy không cần đợi Team B'],
                        ['<span class="text-[var(--accent-green)]">Fault isolation</span>', 'Bug ở Products → Users vẫn hoạt động'],
                        ['<span class="text-[var(--accent-green)]">Tech flexibility</span>', 'Team A dùng React, Team B dùng Vue'],
                        ['<span class="text-[var(--accent-green)]">Scale dễ dàng</span>', 'Thêm team mới = thêm remote app mới'],
                    ]}
                />
            </div>
        ),
    },

    // ===== SLIDE 7: When NOT to use MFE =====
    {
        id: 7,
        title: 'Khi nào KHÔNG dùng MFE?',
        section: 'Micro-Frontend Basics',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-8">
                    Khi nào KHÔNG nên dùng?
                </h2>
                <motion.div
                    className="glass p-8 rounded-xl border-2 border-[var(--accent-orange)] mb-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <p className="text-xl text-[var(--accent-orange)]">
                        Micro-Frontend thêm complexity. Chỉ dùng khi thực sự cần!
                    </p>
                </motion.div>
                <AnimatedList
                    items={[
                        '❌ App nhỏ, <strong>1-3 developers</strong>',
                        '❌ Không có nhu cầu <strong>deploy độc lập</strong>',
                        '❌ Team nhỏ, không có vấn đề về coordination',
                        '❌ Không có requirement về tech diversity',
                    ]}
                />
            </div>
        ),
    },

    // ===== SLIDE 8: Module Federation Definition =====
    {
        id: 8,
        title: 'Module Federation là gì?',
        section: 'Module Federation',
        variant: 'section',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-8">
                    Module Federation là gì?
                </h2>
                <motion.div
                    className="glass p-8 rounded-xl mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <p className="text-slide-body leading-relaxed">
                        <span className="text-[var(--accent-cyan)] font-semibold">Module Federation</span> là plugin của
                        <span className="text-[var(--accent-orange)]"> Webpack 5</span> cho phép:
                    </p>
                </motion.div>
                <AnimatedList
                    items={[
                        'Load JavaScript modules từ <strong class="text-[var(--accent-blue)]">remote server tại runtime</strong>',
                        '<strong>Không</strong> cần publish lên npm',
                        '<strong class="text-[var(--accent-green)]">Share dependencies</strong> để tránh duplicate',
                    ]}
                />
            </div>
        ),
    },

    // ===== SLIDE 9: Module Federation Architecture =====
    {
        id: 9,
        title: 'Kiến trúc Module Federation',
        section: 'Module Federation',
        variant: 'diagram',
        content: (
            <div className="w-full">
                <h2 className="text-slide-header text-center mb-8">
                    Kiến trúc Module Federation
                </h2>
                <ModuleFederationArchDiagram />
            </div>
        ),
    },

    // ===== SLIDE 10: Sequence Diagram =====
    {
        id: 10,
        title: 'Module Loading Flow',
        section: 'Module Federation',
        variant: 'diagram',
        content: (
            <div className="w-full">
                <h2 className="text-slide-header text-center mb-8">
                    Luồng Load Module
                </h2>
                <SequenceDiagram />
            </div>
        ),
    },

    // ===== SLIDE 11: Key Terms =====
    {
        id: 11,
        title: 'Thuật ngữ quan trọng',
        section: 'Module Federation',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-8">
                    Thuật ngữ quan trọng
                </h2>
                <Table
                    headers={['Thuật ngữ', 'Định nghĩa']}
                    rows={[
                        ['<span class="text-[var(--accent-blue)] font-bold">Host</span>', 'App tiêu thụ (consume) modules từ remotes'],
                        ['<span class="text-[var(--accent-green)] font-bold">Remote</span>', 'App cung cấp (expose) modules cho hosts'],
                        ['<span class="text-[var(--accent-orange)] font-bold">remoteEntry.js</span>', 'File metadata chứa thông tin về exposed modules'],
                        ['<span class="text-[var(--accent-purple)] font-bold">Shared</span>', 'Dependencies được chia sẻ giữa host và remotes'],
                        ['<span class="text-[var(--accent-cyan)] font-bold">Singleton</span>', 'Đảm bảo chỉ có 1 instance của dependency (React)'],
                    ]}
                />
            </div>
        ),
    },

    // ===== SLIDE 12: Host Configuration =====
    {
        id: 12,
        title: 'Cấu hình Host',
        section: 'Configuration',
        variant: 'code',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    Cấu hình Host (Consumer)
                </h2>
                <CodeBlock
                    title="host-umi4/.umirc.ts"
                    language="typescript"
                    code={`export default {
  mf: {
    name: 'hostUmi4',
    
    // Danh sách remote apps
    remotes: [
      { name: 'remote1', entry: 'http://localhost:3001/remote.js' },
      { name: 'remote2', entry: 'http://localhost:3002/assets/remoteEntry.js' },
    ],
    
    // Dependencies chia sẻ
    shared: {
      react: { singleton: true, eager: true },
      'react-dom': { singleton: true, eager: true },
      antd: { singleton: true },
    },
  },
};`}
                    highlightLines={[6, 7, 12]}
                />
            </div>
        ),
    },

    // ===== SLIDE 13: Remote Configuration =====
    {
        id: 13,
        title: 'Cấu hình Remote',
        section: 'Configuration',
        variant: 'code',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    Cấu hình Remote (Provider)
                </h2>
                <CodeBlock
                    title="remote-vite/vite.config.ts"
                    language="typescript"
                    code={`import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote2',
      filename: 'remoteEntry.js',
      
      // Components được EXPORT ra ngoài
      exposes: {
        './ProductGrid': './src/components/ProductGrid',
        './InventoryTable': './src/components/InventoryTable',
      },
      
      shared: ['react', 'react-dom', 'antd'],
    }),
  ],
});`}
                    highlightLines={[11, 12, 13]}
                />
            </div>
        ),
    },

    // ===== SLIDE 14: Using Remote Component =====
    {
        id: 14,
        title: 'Sử dụng Remote Component',
        section: 'Configuration',
        variant: 'code',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    Sử dụng Remote Component
                </h2>
                <CodeBlock
                    title="host-umi4/src/pages/products.tsx"
                    language="tsx"
                    code={`import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';

// Dynamic import từ remote
const ProductGrid = lazy(() => import('remote2/ProductGrid'));

const ProductsPage = () => {
  return (
    <Suspense fallback={<Spin size="large" />}>
      <ProductGrid category="electronics" />
    </Suspense>
  );
};`}
                    highlightLines={[5, 9, 10]}
                />
            </div>
        ),
    },

    // ===== SLIDE 15: CSS Isolation =====
    {
        id: 15,
        title: 'CSS Isolation',
        section: 'CSS Isolation',
        variant: 'section',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-8">
                    CSS Isolation
                </h2>
                <motion.div
                    className="glass p-6 rounded-xl border-2 border-[var(--accent-red)] mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <h3 className="text-xl text-[var(--accent-red)] mb-4">⚠️ Vấn đề CSS Conflict</h3>
                    <div className="grid grid-cols-2 gap-4 font-mono text-sm">
                        <div className="bg-[#282a36] p-3 rounded">
                            <div className="text-[var(--text-muted)]">/* remote1/Button.css */</div>
                            <div>.button {'{'} background: <span className="text-red-400">red</span>; {'}'}</div>
                        </div>
                        <div className="bg-[#282a36] p-3 rounded">
                            <div className="text-[var(--text-muted)]">/* remote2/Button.css */</div>
                            <div>.button {'{'} background: <span className="text-blue-400">blue</span>; {'}'}</div>
                        </div>
                    </div>
                    <p className="mt-4 text-center text-[var(--accent-red)]">→ Conflict! Cả 2 đều là .button</p>
                </motion.div>
            </div>
        ),
    },

    // ===== SLIDE 16: CSS Solutions =====
    {
        id: 16,
        title: 'CSS Solutions',
        section: 'CSS Isolation',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-8">
                    Giải pháp CSS Isolation
                </h2>
                <div className="grid grid-cols-2 gap-6">
                    {[
                        { title: 'CSS Modules', desc: 'Auto-generate unique class names', color: 'blue', rec: true },
                        { title: 'CSS-in-JS', desc: 'Styled-components, Emotion', color: 'purple' },
                        { title: 'BEM Naming', desc: 'Block__Element--Modifier', color: 'orange' },
                        { title: 'Shadow DOM', desc: 'Complete isolation', color: 'cyan' },
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            className={`glass p-8 rounded-xl border-2 border-[var(--accent-${item.color})]/50 
                         ${item.rec ? 'ring-2 ring-[var(--accent-green)]' : ''}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            {item.rec && (
                                <span className="text-xs bg-[var(--accent-green)] text-black px-2 py-1 rounded-full mb-3 inline-block">
                                    Recommended
                                </span>
                            )}
                            <h3 className={`text-xl font-bold text-[var(--accent-${item.color})]`}>{item.title}</h3>
                            <p className="text-[var(--text-secondary)] mt-2">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        ),
    },

    // ===== SLIDE 17: Cross-App Communication =====
    {
        id: 17,
        title: 'Cross-App Communication',
        section: 'Communication',
        variant: 'section',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-8">
                    Cross-App Communication
                </h2>
                <Table
                    headers={['Method', 'Scope', 'Pros', 'Cons']}
                    rows={[
                        ['<span class="text-[var(--accent-blue)]">BroadcastChannel</span>', 'Same-origin, cross-tab', 'Simple, built-in', 'Same-origin only'],
                        ['<span class="text-[var(--accent-green)]">MessageChannel</span>', 'Same page, cross-origin', 'Fast, bidirectional', 'Complex setup'],
                        ['<span class="text-[var(--accent-purple)]">CustomEvent</span>', 'Same page', 'Very simple', 'Same page only'],
                        ['<span class="text-[var(--accent-orange)]">PostMessage</span>', 'Cross-origin', 'Cross-origin', 'Security concerns'],
                        ['<span class="text-[var(--accent-cyan)]">Shared State</span>', 'Same page', 'Type-safe', 'Same page only'],
                    ]}
                />
            </div>
        ),
    },

    // ===== SLIDE 18: BroadcastChannel =====
    {
        id: 18,
        title: 'BroadcastChannel',
        section: 'Communication',
        variant: 'code',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    <span className="text-[var(--accent-blue)]">📻</span> BroadcastChannel
                </h2>
                <CodeBlock
                    title="Cross-tab communication"
                    language="typescript"
                    code={`// Tab 1: Create channel và send
const channel = new BroadcastChannel('mfe-events');
channel.postMessage({ type: 'user:selected', userId: '123' });

// Tab 2: Listen (tự động nhận!)
const channel = new BroadcastChannel('mfe-events');
channel.onmessage = (event) => {
  console.log('Received:', event.data); 
  // { type: 'user:selected', userId: '123' }
};`}
                />
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="glass p-4 rounded-lg">
                        <h4 className="text-[var(--accent-green)] font-bold mb-2">✅ Pros</h4>
                        <ul className="text-sm space-y-1 text-[var(--text-secondary)]">
                            <li>• Simple API</li>
                            <li>• Cross-tab support</li>
                            <li>• 1-to-many broadcast</li>
                        </ul>
                    </div>
                    <div className="glass p-4 rounded-lg">
                        <h4 className="text-[var(--accent-red)] font-bold mb-2">❌ Cons</h4>
                        <ul className="text-sm space-y-1 text-[var(--text-secondary)]">
                            <li>• Same-origin only</li>
                            <li>• No confirmation</li>
                        </ul>
                    </div>
                </div>
            </div>
        ),
    },

    // ===== SLIDE 19: Token Sync Flow =====
    {
        id: 19,
        title: 'Token Sync Pattern',
        section: 'Security',
        variant: 'diagram',
        content: (
            <div className="w-full">
                <h2 className="text-slide-header text-center mb-8">
                    <span className="text-[var(--accent-orange)]">🔐</span> Secure Token Sync Pattern
                </h2>
                <TokenSyncFlowDiagram />
            </div>
        ),
    },

    // ===== SLIDE 20: In-Memory Token Storage Explained =====
    {
        id: 20,
        title: 'In-Memory Token Storage',
        section: 'Security',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">
                    <span className="text-[var(--accent-purple)]">🧠</span> In-Memory Token = JS Variable = RAM
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <CodeBlock
                            title="tokenStore.ts"
                            language="typescript"
                            showLineNumbers={false}
                            code={`// Token lưu trong closure (RAM)
let accessToken: string | null = null;

export const tokenStore = {
  set: (token: string) => {
    accessToken = token; // → V8 Heap
  },
  get: () => accessToken,
};`}
                        />
                        <motion.div
                            className="glass p-5 rounded-xl bg-[var(--accent-orange)]/10 border border-[var(--accent-orange)]/30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <p className="text-sm text-[var(--accent-orange)]">
                                <strong>Lưu ý:</strong> Code có thể bị dịch ngược → attacker biết cách access. Đây chỉ là <strong>một lớp bảo vệ</strong>, không phải giải pháp hoàn hảo!
                            </p>
                        </motion.div>
                    </div>
                    <div className="space-y-4">
                        <motion.div
                            className="glass p-6 rounded-xl border-2 border-[var(--accent-red)]/50"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h4 className="text-[var(--accent-red)] font-bold mb-2">localStorage</h4>
                            <p className="text-sm text-[var(--text-secondary)]">
                                <code className="text-[var(--accent-orange)]">localStorage.getItem('token')</code> - XSS gọi trực tiếp được
                            </p>
                        </motion.div>
                        <motion.div
                            className="glass p-6 rounded-xl border-2 border-[var(--accent-green)]/50"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h4 className="text-[var(--accent-green)] font-bold mb-2">In-Memory</h4>
                            <p className="text-sm text-[var(--text-secondary)]">
                                XSS phải biết module path + gọi đúng function. <strong>Khó hơn</strong> nhưng vẫn possible.
                            </p>
                        </motion.div>
                        <motion.div
                            className="glass p-6 rounded-xl border-2 border-[var(--accent-cyan)]/50"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h4 className="text-[var(--accent-cyan)] font-bold mb-3">Defense in Depth (4 lớp)</h4>
                            <ol className="text-sm space-y-2 text-[var(--text-secondary)] pl-4">
                                <li><strong>1.</strong> Ngăn XSS (CSP, sanitize) - <span className="text-[var(--accent-green)]">Quan trọng nhất</span></li>
                                <li><strong>2.</strong> httpOnly cookie cho refresh token</li>
                                <li><strong>3.</strong> In-memory cho access token</li>
                                <li><strong>4.</strong> Short-lived tokens (5-15 phút)</li>
                            </ol>
                        </motion.div>
                    </div>
                </div>
            </div>
        ),
    },

    // ===== SLIDE 21: Event Bus Implementation =====
    {
        id: 21,
        title: 'Event Bus Implementation',
        section: 'Communication',
        variant: 'code',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    Event Bus Implementation
                </h2>
                <CodeBlock
                    title="shared/utils/eventBus.ts"
                    language="typescript"
                    code={`export class EventBus {
  private channel: BroadcastChannel;
  
  constructor(channelName: string) {
    this.channel = new BroadcastChannel(channelName);
  }
  
  emit(eventType: string, data: unknown) {
    // Broadcast đến tất cả tabs
    this.channel.postMessage({ type: eventType, data });
  }
  
  on(eventType: string, callback: (data: unknown) => void) {
    this.channel.onmessage = (event) => {
      if (event.data.type === eventType) {
        callback(event.data.data);
      }
    };
  }
}`}
                    highlightLines={[9, 10]}
                />
            </div>
        ),
    },

    // ===== SLIDE 22: Qiankun vs Module Federation =====
    {
        id: 22,
        title: 'Qiankun vs Module Federation',
        section: 'Comparison',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-8">
                    Qiankun vs Module Federation
                </h2>
                <Table
                    headers={['Tiêu chí', 'Qiankun', 'Module Federation']}
                    rows={[
                        ['<strong>Architecture</strong>', 'HTML-based', 'JavaScript-based'],
                        ['<strong>Granularity</strong>', 'Full app', 'Component level'],
                        ['<strong>Bundler</strong>', 'Any', 'Webpack 5 / Vite plugin'],
                        ['<strong>Sharing</strong>', 'Runtime (global)', 'Build-time + Runtime'],
                        ['<strong>CSS Isolation</strong>', 'Shadow DOM built-in', 'Manual'],
                        ['<strong>Learning Curve</strong>', 'Simple', 'Medium'],
                        ['<strong>Performance</strong>', 'Good', '<span class="text-[var(--accent-green)]">Better</span>'],
                    ]}
                />
            </div>
        ),
    },

    // ===== SLIDE 23: Summary =====
    {
        id: 23,
        title: 'Tổng kết',
        section: 'Summary',
        variant: 'section',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-8">
                    Tổng kết
                </h2>
                <div className="space-y-6">
                    {[
                        { title: 'Micro-Frontend', desc: 'Chia app lớn thành apps nhỏ, độc lập', color: 'blue' },
                        { title: 'Module Federation', desc: 'Load modules từ remote server at runtime', color: 'purple' },
                        { title: 'Git Submodules', desc: 'Share code giữa các apps', color: 'green' },
                        { title: 'BroadcastChannel', desc: 'Cross-tab communication pattern', color: 'cyan' },
                        { title: 'Secure Token', desc: 'Memory storage + httpOnly cookie', color: 'orange' },
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            className={`glass p-6 rounded-xl border-l-4 border-[var(--accent-${item.color})] flex items-center gap-6`}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div>
                                <h3 className={`text-xl font-bold text-[var(--accent-${item.color})]`}>{item.title}</h3>
                                <p className="text-[var(--text-secondary)]">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        ),
    },

    // ===== SLIDE 24: Module Loading Flow =====
    {
        id: 24,
        title: 'Module Loading Flow',
        section: 'Module Federation',
        variant: 'diagram',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    Luồng Load Module (Step-by-step)
                </h2>
                <ModuleLoadingFlowDiagram />
            </div>
        ),
    },

    // ===== SLIDE 25: Shared Config =====
    {
        id: 25,
        title: 'Shared Dependencies Config',
        section: 'Module Federation',
        variant: 'diagram',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    Cấu hình Shared Dependencies
                </h2>
                <SharedConfigDiagram />
            </div>
        ),
    },

    // ===== SLIDE 26: CSS Isolation =====
    {
        id: 26,
        title: 'CSS Isolation Strategies',
        section: 'CSS & Styling',
        variant: 'diagram',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    CSS Isolation Strategies
                </h2>
                <CSSIsolationDiagram />
            </div>
        ),
    },

    // ===== SLIDE 27: Routing =====
    {
        id: 27,
        title: 'Routing & Navigation',
        section: 'Navigation',
        variant: 'diagram',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    Routing trong MFE
                </h2>
                <RoutingFlowDiagram />
            </div>
        ),
    },

    // ===== SLIDE 28: Event Bus =====
    {
        id: 28,
        title: 'Event Bus Pattern',
        section: 'Communication',
        variant: 'diagram',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    Event Bus Pattern (Pub/Sub)
                </h2>
                <EventBusDiagram />
            </div>
        ),
    },

    // ===== SLIDE 29: CI/CD Pipeline =====
    {
        id: 29,
        title: 'Deployment & CI/CD',
        section: 'DevOps',
        variant: 'diagram',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    CI/CD Pipeline for MFE
                </h2>
                <CICDPipelineDiagram />
            </div>
        ),
    },

    // ===== SLIDE 30: Thank You =====
    {
        id: 30,
        title: 'Cảm ơn!',
        section: 'End',
        variant: 'title',
        content: (
            <div className="text-center">
                <motion.div
                    className="text-6xl mb-8 font-bold text-[var(--accent-purple)]"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                >
                    Q&A
                </motion.div>
                <motion.h1
                    className="text-slide-title mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    Cảm ơn đã lắng nghe!
                </motion.h1>
                <motion.p
                    className="text-slide-body text-[var(--text-secondary)] mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Questions & Discussion
                </motion.p>
                <motion.div
                    className="flex justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <span className="glass px-6 py-3 rounded-full">
                        <span className="text-[var(--accent-blue)]">←</span>
                        <span className="text-[var(--accent-purple)]">→</span> Navigate
                    </span>
                    <span className="glass px-6 py-3 rounded-full">
                        <span className="text-[var(--accent-cyan)]">F</span> Fullscreen
                    </span>
                    <span className="glass px-6 py-3 rounded-full">
                        <span className="text-[var(--accent-green)]">T</span> TOC
                    </span>
                </motion.div>
            </div>
        ),
    },
];

export const tocItems = slides.map((slide) => ({
    title: slide.title,
    slideIndex: slide.id - 1,
    section: slide.section,
}));
