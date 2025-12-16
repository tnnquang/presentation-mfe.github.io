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
                        ['<span class="text-[var(--accent-blue)] font-bold">Host</span> <span class="text-[var(--text-muted)]">(Ứng dụng Cha)</span>', 'App chính tiêu thụ (consume) modules từ các ứng dụng con'],
                        ['<span class="text-[var(--accent-green)] font-bold">Remote</span> <span class="text-[var(--text-muted)]">(Ứng dụng Con)</span>', 'App con cung cấp (expose) modules cho ứng dụng cha'],
                        ['<span class="text-[var(--accent-orange)] font-bold">remoteEntry.js</span>', 'File manifest chứa thông tin về các modules được expose'],
                        ['<span class="text-[var(--accent-purple)] font-bold">Shared</span>', 'Dependencies được chia sẻ giữa Host và Remote (React, antd...)'],
                        ['<span class="text-[var(--accent-cyan)] font-bold">Singleton</span>', 'Đảm bảo chỉ có 1 instance của dependency (tránh multiple React)'],
                    ]}
                />
                <motion.div
                    className="mt-6 glass p-4 rounded-lg border border-[var(--accent-blue)]/30 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <strong className="text-[var(--accent-blue)]">💡 Lưu ý:</strong> Trong code config vẫn sử dụng thuật ngữ tiếng Anh (<code>remotes</code>, <code>exposes</code>, <code>host</code>) để đồng bộ với thư viện.
                </motion.div>
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

    // ===== SLIDE 16: CSS Solutions with DX Comparison =====
    {
        id: 16,
        title: 'So sánh các giải pháp CSS',
        section: 'CSS Isolation',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    So sánh các giải pháp CSS Isolation
                </h2>
                <Table
                    headers={['Giải pháp', 'Isolation', 'Setup', 'Developer Experience']}
                    rows={[
                        ['<span class="text-[var(--accent-blue)] font-bold">CSS Modules</span> ✅', '<span class="text-[var(--accent-green)]">Tốt</span>', 'Zero config', 'DX tuyệt vời - viết CSS bình thường, tự động unique'],
                        ['<span class="text-[var(--accent-purple)]">CSS-in-JS</span>', '<span class="text-[var(--accent-green)]">Tốt</span>', 'Cài lib', 'Phải học syntax mới, runtime cost'],
                        ['<span class="text-[var(--accent-orange)]">BEM Naming</span>', '<span class="text-[var(--accent-orange)]">Trung bình</span>', 'Không cần', 'Đặt tên dài, dễ quên convention'],
                        ['<span class="text-[var(--accent-cyan)]">Shadow DOM</span>', '<span class="text-[var(--accent-green)]">Hoàn hảo</span>', 'Phức tạp', 'Khó style global, khó debug'],
                    ]}
                />
                <motion.div
                    className="mt-6 glass p-4 rounded-lg border-2 border-[var(--accent-green)]/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h4 className="text-[var(--accent-green)] font-bold mb-2">🏆 Tại sao recommend CSS Modules?</h4>
                    <ul className="text-sm space-y-1 text-[var(--text-secondary)]">
                        <li>• <strong>Zero config</strong> - Vite/Webpack hỗ trợ sẵn, chỉ cần đổi extension .module.css</li>
                        <li>• <strong>Zero runtime</strong> - Compile-time transform, không ảnh hưởng performance</li>
                        <li>• <strong>Familiar syntax</strong> - Viết CSS bình thường, không cần học thêm</li>
                        <li>• <strong>Type-safe</strong> - TypeScript plugin hỗ trợ autocomplete</li>
                    </ul>
                </motion.div>
            </div>
        ),
    },

    // ===== SLIDE 17: Cross-App Communication =====
    {
        id: 17,
        title: 'Giao tiếp giữa các MFE',
        section: 'Communication',
        variant: 'section',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-8">
                    Giao tiếp giữa các Micro-Frontend
                </h2>
                <Table
                    headers={['Phương thức', 'Phạm vi', 'Ưu điểm', 'Nhược điểm']}
                    rows={[
                        ['<span class="text-[var(--accent-blue)]">BroadcastChannel</span>', 'Cùng domain, nhiều tab', 'Đơn giản, có sẵn', 'Chỉ cùng domain'],
                        ['<span class="text-[var(--accent-green)]">MessageChannel</span>', 'Cùng trang, khác origin', 'Nhanh, 2 chiều', 'Cấu hình phức tạp'],
                        ['<span class="text-[var(--accent-purple)]">CustomEvent</span>', 'Cùng trang', 'Rất đơn giản', 'Chỉ cùng trang'],
                        ['<span class="text-[var(--accent-orange)]">PostMessage</span>', 'Khác origin', 'Cross-origin', 'Lo ngại bảo mật'],
                        ['<span class="text-[var(--accent-cyan)]">Shared State</span>', 'Cùng trang', 'Type-safe', 'Chỉ cùng trang'],
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
                <div className="grid grid-cols-2 gap-4 mt-8">
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
                <h2 className="text-slide-header mb-6">
                    <span className="text-[var(--accent-purple)]">🧠</span> In-Memory Token = Private Class = RAM
                </h2>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <CodeBlock
                            title="TokenStore.ts"
                            language="typescript"
                            showLineNumbers={false}
                            code={`class TokenStore {
  // Private variable - không thể access từ bên ngoài
  #accessToken: string | null = null;

  set(token: string) {
    this.#accessToken = token; // → V8 Heap
  }

  get(): string | null {
    return this.#accessToken;
  }

  clear() {
    this.#accessToken = null;
  }
}

// Singleton instance
export const tokenStore = new TokenStore();`}
                        />
                    </div>
                    <div className="space-y-4">
                        <motion.div
                            className="glass p-5 rounded-xl border-2 border-[var(--accent-red)]/50"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h4 className="text-[var(--accent-red)] font-bold mb-2">❌ localStorage - Rủi ro XSS</h4>
                            <p className="text-sm text-[var(--text-secondary)]">
                                <code className="text-[var(--accent-orange)]">localStorage.getItem('token')</code>
                                <br />Script độc hại gọi trực tiếp được → Lấy token ngay lập tức
                            </p>
                        </motion.div>
                        <motion.div
                            className="glass p-5 rounded-xl border-2 border-[var(--accent-green)]/50"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h4 className="text-[var(--accent-green)] font-bold mb-2">✅ Private Class - An toàn hơn</h4>
                            <p className="text-sm text-[var(--text-secondary)]">
                                Attacker phải import đúng module + gọi đúng hàm. <strong>Khó hơn nhiều</strong> nhưng vẫn cần kết hợp các lớp bảo vệ khác.
                            </p>
                        </motion.div>
                        <motion.div
                            className="glass p-5 rounded-xl border-2 border-[var(--accent-cyan)]/50"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h4 className="text-[var(--accent-cyan)] font-bold mb-2">🛡️ Defense in Depth (4 lớp)</h4>
                            <ol className="text-sm space-y-1 text-[var(--text-secondary)] pl-4">
                                <li><strong>1.</strong> Ngăn XSS (CSP, sanitize) - <span className="text-[var(--accent-green)]">Quan trọng nhất</span></li>
                                <li><strong>2.</strong> httpOnly cookie cho refresh token</li>
                                <li><strong>3.</strong> Private class cho access token</li>
                                <li><strong>4.</strong> Short-lived tokens (5-15 phút)</li>
                            </ol>
                        </motion.div>
                    </div>
                </div>
            </div>
        ),
    },

    // ===== SLIDE 21: Event Bus Definition =====
    {
        id: 21,
        title: 'Event Bus là gì?',
        section: 'Communication',
        variant: 'section',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    Event Bus là gì?
                </h2>
                <motion.div
                    className="glass p-6 rounded-xl mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <p className="text-slide-body leading-relaxed">
                        <span className="text-[var(--accent-cyan)] font-semibold">Event Bus</span> là một pattern cho phép các component/micro-frontend
                        <span className="text-[var(--accent-green)]"> giao tiếp với nhau</span> mà không cần biết về sự tồn tại của nhau.
                    </p>
                </motion.div>
                <div className="grid grid-cols-3 gap-4">
                    <motion.div className="glass p-5 rounded-lg text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <div className="text-3xl mb-2">📤</div>
                        <h4 className="text-[var(--accent-blue)] font-bold">Publisher</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Phát sự kiện (emit)</p>
                    </motion.div>
                    <motion.div className="glass p-5 rounded-lg text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <div className="text-3xl mb-2">🚌</div>
                        <h4 className="text-[var(--accent-orange)] font-bold">Event Bus</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Trung gian truyền tải</p>
                    </motion.div>
                    <motion.div className="glass p-5 rounded-lg text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <div className="text-3xl mb-2">📥</div>
                        <h4 className="text-[var(--accent-green)] font-bold">Subscriber</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Nhận và xử lý sự kiện</p>
                    </motion.div>
                </div>
                <motion.div
                    className="mt-6 glass p-4 rounded-lg border border-[var(--accent-purple)]/30 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <strong className="text-[var(--accent-purple)]">💡 Ưu điểm:</strong> Loose coupling - Remote 1 không cần import Remote 2, chỉ cần emit event lên bus.
                </motion.div>
            </div>
        ),
    },

    // ===== SLIDE 22: Event Bus Implementation =====
    {
        id: 22,
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
                    highlightLines={[8, 9]}
                />
                <motion.div
                    className="mt-6 grid grid-cols-2 gap-4 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="glass p-4 rounded-lg">
                        <h4 className="text-[var(--accent-blue)] font-bold mb-2">Sử dụng trong Remote 1</h4>
                        <code className="text-xs text-[var(--text-secondary)]">eventBus.emit('user:selected', user)</code>
                    </div>
                    <div className="glass p-4 rounded-lg">
                        <h4 className="text-[var(--accent-green)] font-bold mb-2">Sử dụng trong Remote 2</h4>
                        <code className="text-xs text-[var(--text-secondary)]">eventBus.on('user:selected', handleUser)</code>
                    </div>
                </motion.div>
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

    // ===== SLIDE 28: History Synchronization =====
    {
        id: 28,
        title: 'History Synchronization',
        section: 'Navigation',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">
                    <span className="text-[var(--accent-orange)]">⚠️</span> History Synchronization
                </h2>
                <motion.div
                    className="glass p-4 rounded-lg border-2 border-[var(--accent-red)]/50 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <h4 className="text-[var(--accent-red)] font-bold">Vấn đề phổ biến nhất khi làm MFE!</h4>
                    <p className="text-sm text-[var(--text-secondary)]">
                        Khi navigate từ Host → Remote, nút Back/Forward của browser có thể không hoạt động đúng nếu không đồng bộ history object.
                    </p>
                </motion.div>
                <div className="grid grid-cols-2 gap-4">
                    <CodeBlock
                        title="Host App - Truyền history"
                        language="tsx"
                        showLineNumbers={false}
                        code={`// Host truyền history cho Remote
<RemoteApp 
  history={window.history}
  basename="/products" 
/>`}
                    />
                    <CodeBlock
                        title="Remote App - Nhận history"
                        language="tsx"
                        showLineNumbers={false}
                        code={`// Remote sử dụng history từ Host
export function mount({ history, basename }) {
  const router = createBrowserRouter({
    basename,
    history // QUAN TRỌNG!
  });
}`}
                    />
                </div>
                <motion.div
                    className="mt-4 glass p-4 rounded-lg border border-[var(--accent-green)]/30 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <strong className="text-[var(--accent-green)]">💡 Giải pháp:</strong> Remote App phải sử dụng cùng history object với Host, không tự tạo history mới.
                </motion.div>
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

    // ===== SLIDE 30: Versioning Strategy =====
    {
        id: 30,
        title: 'Versioning Strategy',
        section: 'DevOps',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">
                    <span className="text-[var(--accent-purple)]">📦</span> Versioning Strategy
                </h2>
                <motion.div
                    className="glass p-4 rounded-lg border border-[var(--accent-blue)]/30 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <h4 className="text-[var(--accent-blue)] font-bold">Câu hỏi Senior thường hỏi:</h4>
                    <p className="text-sm text-[var(--text-secondary)]">
                        Khi deploy Remote mới, Host làm sao biết có version mới? Cache như thế nào?
                    </p>
                </motion.div>
                <div className="grid grid-cols-3 gap-4">
                    <motion.div className="glass p-5 rounded-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <h4 className="text-[var(--accent-green)] font-bold mb-2">1. Manifest File</h4>
                        <p className="text-xs text-[var(--text-secondary)]">
                            <code>manifest.json</code> chứa version + hash. Host fetch định kỳ.
                        </p>
                        <div className="mt-2 bg-[#282a36] p-2 rounded text-xs font-mono">
                            {`{ "version": "1.2.3", "hash": "abc123" }`}
                        </div>
                    </motion.div>
                    <motion.div className="glass p-5 rounded-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <h4 className="text-[var(--accent-orange)] font-bold mb-2">2. Query Param</h4>
                        <p className="text-xs text-[var(--text-secondary)]">
                            Thêm timestamp/hash vào URL để bust cache.
                        </p>
                        <div className="mt-2 bg-[#282a36] p-2 rounded text-xs font-mono break-all">
                            remoteEntry.js?v=1702700000
                        </div>
                    </motion.div>
                    <motion.div className="glass p-5 rounded-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <h4 className="text-[var(--accent-cyan)] font-bold mb-2">3. Content Hash</h4>
                        <p className="text-xs text-[var(--text-secondary)]">
                            Tên file chứa hash: <code>remoteEntry.abc123.js</code>
                        </p>
                        <div className="mt-2 bg-[#282a36] p-2 rounded text-xs font-mono">
                            Webpack output.filename: [contenthash]
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    className="mt-4 glass p-4 rounded-lg border border-[var(--accent-green)]/30 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <strong className="text-[var(--accent-green)]">💡 Recommend:</strong> Kết hợp Content Hash + Manifest để vừa cache tốt vừa dễ rollback.
                </motion.div>
            </div>
        ),
    },

    // ===== SLIDE 31: remoteEntry.js Deep Dive =====
    {
        id: 31,
        title: 'remoteEntry.js là gì?',
        section: 'Module Federation',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">
                    remoteEntry.js - File Manifest
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <motion.div className="glass p-4 rounded-lg mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h4 className="text-[var(--accent-cyan)] font-bold mb-2">📦 Nội dung chứa gì?</h4>
                            <ul className="text-sm space-y-1 text-[var(--text-secondary)]">
                                <li>• Tên của remote app</li>
                                <li>• Danh sách modules được expose</li>
                                <li>• Version của shared dependencies</li>
                                <li>• Paths đến actual chunk files</li>
                            </ul>
                        </motion.div>
                        <motion.div className="glass p-4 rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                            <h4 className="text-[var(--accent-orange)] font-bold mb-2">🔄 Naming Convention</h4>
                            <Table
                                headers={['Framework', 'Default Name']}
                                rows={[
                                    ['Webpack', 'remoteEntry.js'],
                                    ['UmiJS v4', 'remote.js'],
                                    ['Vite', 'remoteEntry.js'],
                                ]}
                            />
                        </motion.div>
                    </div>
                    <CodeBlock
                        title="Có thể đổi tên"
                        language="typescript"
                        showLineNumbers={false}
                        code={`// Vite
federation({ 
  filename: 'customRemote.js' 
})

// Webpack
new ModuleFederationPlugin({ 
  filename: 'my-entry.js' 
})`}
                    />
                </div>
            </div>
        ),
    },

    // ===== SLIDE 32: Shared Dependencies Deep Dive =====
    {
        id: 32,
        title: 'Shared Dependencies chi tiết',
        section: 'Module Federation',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">
                    Cấu hình Shared Dependencies
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Table
                            headers={['Option', 'Mô tả']}
                            rows={[
                                ['<code>singleton</code>', 'Chỉ 1 instance (React BẮT BUỘC!)'],
                                ['<code>eager</code>', 'Load ngay, không lazy'],
                                ['<code>requiredVersion</code>', 'Version tối thiểu'],
                                ['<code>strictVersion</code>', 'Phải đúng version'],
                            ]}
                        />
                    </div>
                    <CodeBlock
                        title="Ví dụ đầy đủ"
                        language="typescript"
                        showLineNumbers={false}
                        code={`shared: {
  react: {
    singleton: true,  // BẮT BUỘC
    eager: true,      // Tránh flash
    requiredVersion: '^18.0.0',
  },
  antd: {
    singleton: true,
  },
  lodash: {
    // Không singleton OK
  },
}`}
                    />
                </div>
                <motion.div className="mt-4 glass p-4 rounded-lg border-2 border-[var(--accent-red)]/50 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <strong className="text-[var(--accent-red)]">⚠️ Quan trọng:</strong> React PHẢI là singleton, nếu không hooks sẽ break!
                </motion.div>
            </div>
        ),
    },

    // ===== SLIDE 33: CSS Modules Example =====
    {
        id: 33,
        title: 'CSS Modules - Ví dụ thực tế',
        section: 'CSS Isolation',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">
                    CSS Modules - Code Example
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <CodeBlock
                        title="Button.module.css"
                        language="css"
                        showLineNumbers={false}
                        code={`.btn {
  background: red;
  padding: 10px;
}

.btnPrimary {
  background: blue;
}`}
                    />
                    <CodeBlock
                        title="Button.tsx"
                        language="tsx"
                        showLineNumbers={false}
                        code={`import styles from './Button.module.css';

const Button = ({ primary }) => (
  <button className={
    primary ? styles.btnPrimary : styles.btn
  }>
    Click me
  </button>
);

// Output HTML:
// <button class="Button_btn_a1b2c3">`}
                    />
                </div>
                <motion.div className="mt-4 glass p-4 rounded-lg border border-[var(--accent-green)]/30 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <strong className="text-[var(--accent-green)]">✅ Kết quả:</strong> Class name tự động unique → Không conflict!
                </motion.div>
            </div>
        ),
    },

    // ===== SLIDE 34: Styled Components Example =====
    {
        id: 34,
        title: 'CSS-in-JS Example',
        section: 'CSS Isolation',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">
                    Styled Components - Code Example
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <CodeBlock
                        title="Button.tsx"
                        language="tsx"
                        showLineNumbers={false}
                        code={`import styled from 'styled-components';

const StyledButton = styled.button\`
  background: \${p => p.primary ? 'blue' : 'red'};
  padding: 10px;
  
  &:hover {
    opacity: 0.8;
  }
\`;

// Output: <button class="sc-bdfBQB kTzXmj">`}
                    />
                    <div className="space-y-4">
                        <motion.div className="glass p-4 rounded-lg" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <h4 className="text-[var(--accent-green)] font-bold mb-2">✅ Ưu điểm</h4>
                            <ul className="text-xs text-[var(--text-secondary)] space-y-1">
                                <li>• Dynamic styles dễ dàng</li>
                                <li>• Co-located với component</li>
                                <li>• Full CSS support</li>
                            </ul>
                        </motion.div>
                        <motion.div className="glass p-4 rounded-lg" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                            <h4 className="text-[var(--accent-red)] font-bold mb-2">❌ Nhược điểm</h4>
                            <ul className="text-xs text-[var(--text-secondary)] space-y-1">
                                <li>• Runtime cost</li>
                                <li>• Cần share lib trong MFE</li>
                                <li>• Học syntax mới</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>
        ),
    },

    // ===== SLIDE 35: Global CSS Handling =====
    {
        id: 35,
        title: 'Xử lý Global CSS',
        section: 'CSS Isolation',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">
                    Ai quản lý Global CSS?
                </h2>
                <Table
                    headers={['Loại CSS', 'Ai quản lý', 'Cách làm']}
                    rows={[
                        ['Reset/Normalize', '<span class="text-[var(--accent-blue)]">Host only</span>', 'Import 1 lần ở host'],
                        ['Design Tokens', '<span class="text-[var(--accent-purple)]">Shared</span>', 'CSS Variables ở :root'],
                        ['Component Styles', '<span class="text-[var(--accent-green)]">Mỗi Remote</span>', 'CSS Modules'],
                        ['Utility Classes', '<span class="text-[var(--accent-orange)]">Host hoặc Shared</span>', 'Tailwind với prefix'],
                    ]}
                />
                <CodeBlock
                    title="host/global.css"
                    language="css"
                    showLineNumbers={false}
                    code={`@import 'normalize.css';

:root {
  --primary-color: #1890ff;
  --font-family: 'Inter', sans-serif;
}

/* Remote KHÔNG nên có global styles! */`}
                />
            </div>
        ),
    },

    // ===== SLIDE 36: Single History Instance =====
    {
        id: 36,
        title: 'Single History Instance',
        section: 'Navigation',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">
                    Routing: Single History Pattern
                </h2>
                <motion.div className="glass p-4 rounded-lg mb-4 border border-[var(--accent-blue)]/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-sm"><strong className="text-[var(--accent-blue)]">Nguyên tắc:</strong> Chỉ có 1 history instance. Host sở hữu và share cho remotes.</p>
                </motion.div>
                <div className="grid grid-cols-2 gap-4">
                    <CodeBlock
                        title="shared/history.ts"
                        language="typescript"
                        showLineNumbers={false}
                        code={`import { createBrowserHistory } from 'history';

// Singleton - tất cả apps dùng chung
export const history = createBrowserHistory();`}
                    />
                    <CodeBlock
                        title="Remote sử dụng"
                        language="tsx"
                        showLineNumbers={false}
                        code={`// Remote nhận history từ props
const ProductsApp = ({ history, basePath }) => (
  <Router history={history}>
    <Routes>
      <Route path={\`\${basePath}/list\`} 
             element={<ProductList />} />
    </Routes>
  </Router>
);`}
                    />
                </div>
            </div>
        ),
    },

    // ===== SLIDE 37: Lazy Load Routes =====
    {
        id: 37,
        title: 'Lazy Load Remote Routes',
        section: 'Navigation',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">
                    Pattern: Lazy Load Remote Components
                </h2>
                <CodeBlock
                    title="host/pages/products/index.tsx"
                    language="tsx"
                    code={`import { Suspense, lazy } from 'react';
import { useHistory } from 'umi';

// Lazy load từ remote
const ProductGrid = lazy(() => import('remote2/ProductGrid'));

const ProductsPage = () => {
  const history = useHistory();
  
  return (
    <Suspense fallback={<Loading />}>
      <ProductGrid 
        onProductClick={(id) => history.push(\`/products/\${id}\`)}
      />
    </Suspense>
  );
};`}
                    highlightLines={[5, 11, 12, 13]}
                />
            </div>
        ),
    },

    // ===== SLIDE 38: Testing Strategy =====
    {
        id: 38,
        title: 'Testing Strategy',
        section: 'Testing',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    Chiến lược Testing cho MFE
                </h2>
                <div className="grid grid-cols-3 gap-4">
                    <motion.div className="glass p-5 rounded-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h4 className="text-[var(--accent-blue)] font-bold mb-3">🔬 Unit Tests</h4>
                        <ul className="text-xs text-[var(--text-secondary)] space-y-1">
                            <li>• Vitest / Jest</li>
                            <li>• Test isolated components</li>
                            <li>• Mock remote imports</li>
                            <li>• Fast feedback</li>
                        </ul>
                    </motion.div>
                    <motion.div className="glass p-5 rounded-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <h4 className="text-[var(--accent-green)] font-bold mb-3">🔗 Integration Tests</h4>
                        <ul className="text-xs text-[var(--text-secondary)] space-y-1">
                            <li>• Testing Library</li>
                            <li>• Test host + remotes</li>
                            <li>• Mock network</li>
                            <li>• CI/CD integration</li>
                        </ul>
                    </motion.div>
                    <motion.div className="glass p-5 rounded-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <h4 className="text-[var(--accent-purple)] font-bold mb-3">🌐 E2E Tests</h4>
                        <ul className="text-xs text-[var(--text-secondary)] space-y-1">
                            <li>• Playwright / Cypress</li>
                            <li>• Full stack testing</li>
                            <li>• Real remotes</li>
                            <li>• Slow but thorough</li>
                        </ul>
                    </motion.div>
                </div>
                <motion.div className="mt-4 glass p-4 rounded-lg text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <strong className="text-[var(--accent-cyan)]">💡 Tip:</strong> Mock remotes trong Unit/Integration tests. Chỉ dùng real remotes trong E2E.
                </motion.div>
            </div>
        ),
    },

    // ===== SLIDE 39: Troubleshooting =====
    {
        id: 39,
        title: 'Troubleshooting',
        section: 'Troubleshooting',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    Lỗi thường gặp & Cách fix
                </h2>
                <Table
                    headers={['Lỗi', 'Nguyên nhân', 'Cách fix']}
                    rows={[
                        ['<span class="text-[var(--accent-red)]">Shared module not found</span>', 'Version mismatch', 'Check requiredVersion'],
                        ['<span class="text-[var(--accent-red)]">Invalid hook call</span>', 'Multiple React instances', 'Set singleton: true'],
                        ['<span class="text-[var(--accent-red)]">Failed to fetch</span>', 'Remote server down', 'Add Error Boundary'],
                        ['<span class="text-[var(--accent-red)]">CSS conflict</span>', 'Global CSS', 'Use CSS Modules'],
                        ['<span class="text-[var(--accent-red)]">Back button broken</span>', 'Multiple history', 'Share single history'],
                    ]}
                />
            </div>
        ),
    },

    // ===== SLIDE 40: Error Boundary =====
    {
        id: 40,
        title: 'Error Boundary Pattern',
        section: 'Troubleshooting',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">
                    Xử lý lỗi khi Remote fail
                </h2>
                <CodeBlock
                    title="RemoteWrapper.tsx"
                    language="tsx"
                    code={`class RemoteErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <p>Remote không khả dụng</p>
          <button onClick={() => window.location.reload()}>
            Thử lại
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}`}
                    highlightLines={[9, 10, 11, 12, 13, 14, 15, 16]}
                />
            </div>
        ),
    },

    // ===== SLIDE 41: Bidirectional Sharing =====
    {
        id: 41,
        title: 'Bidirectional Sharing',
        section: 'Advanced',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">
                    App vừa là Host vừa là Remote?
                </h2>
                <motion.div className="glass p-4 rounded-lg mb-4 border border-[var(--accent-green)]/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-sm"><strong className="text-[var(--accent-green)]">✅ CÓ THỂ!</strong> Gọi là "Bidirectional Hosts"</p>
                </motion.div>
                <div className="grid grid-cols-2 gap-6">
                    <motion.div className="glass p-6 rounded-lg text-center" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h4 className="text-[var(--accent-blue)] font-bold mb-2">App A</h4>
                        <p className="text-xs text-[var(--text-muted)] mb-2">(host + remote)</p>
                        <div className="text-sm">
                            <div className="text-[var(--accent-green)]">exposes: ./CompA</div>
                            <div className="text-[var(--accent-orange)]">remotes: appB</div>
                        </div>
                    </motion.div>
                    <motion.div className="glass p-6 rounded-lg text-center" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <h4 className="text-[var(--accent-purple)] font-bold mb-2">App B</h4>
                        <p className="text-xs text-[var(--text-muted)] mb-2">(host + remote)</p>
                        <div className="text-sm">
                            <div className="text-[var(--accent-green)]">exposes: ./CompB</div>
                            <div className="text-[var(--accent-orange)]">remotes: appA</div>
                        </div>
                    </motion.div>
                </div>
                <motion.div className="mt-4 text-center text-[var(--accent-cyan)] text-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    ◄───────────────►
                </motion.div>
            </div>
        ),
    },

    // ===== SLIDE 42: Performance Tips =====
    {
        id: 42,
        title: 'Performance Optimization',
        section: 'Performance',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    Tối ưu Performance
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <motion.div className="glass p-5 rounded-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h4 className="text-[var(--accent-green)] font-bold mb-3">✅ Nên làm</h4>
                        <ul className="text-sm text-[var(--text-secondary)] space-y-2">
                            <li>• <strong>Lazy load</strong> remote components</li>
                            <li>• <strong>Prefetch</strong> remoteEntry.js</li>
                            <li>• <strong>Cache</strong> với content hash</li>
                            <li>• <strong>Share</strong> heavy dependencies</li>
                            <li>• <strong>Code split</strong> trong remotes</li>
                        </ul>
                    </motion.div>
                    <motion.div className="glass p-5 rounded-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <h4 className="text-[var(--accent-red)] font-bold mb-3">❌ Tránh</h4>
                        <ul className="text-sm text-[var(--text-secondary)] space-y-2">
                            <li>• Load tất cả remotes lúc start</li>
                            <li>• Duplicate large dependencies</li>
                            <li>• Too many small remotes</li>
                            <li>• Eager load everything</li>
                            <li>• Skip Error Boundary</li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        ),
    },

    // ===== SLIDE 43: Summary =====
    {
        id: 43,
        title: 'Tổng kết',
        section: 'Summary',
        variant: 'section',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    Tổng kết - Key Takeaways
                </h2>
                <div className="space-y-4">
                    {[
                        { title: 'Micro-Frontend', desc: 'Chia app lớn thành apps nhỏ, deploy độc lập', color: 'blue' },
                        { title: 'Module Federation', desc: 'Load modules từ remote server tại runtime', color: 'purple' },
                        { title: 'Host (Ứng dụng Cha)', desc: 'App chính consume modules từ remotes', color: 'green' },
                        { title: 'Remote (Ứng dụng Con)', desc: 'App con expose modules cho host', color: 'orange' },
                        { title: 'CSS Modules', desc: 'Recommend cho CSS isolation, zero config', color: 'cyan' },
                        { title: 'Event Bus', desc: 'Communication giữa các MFE, loose coupling', color: 'pink' },
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            className={`glass p-4 rounded-xl border-l-4 border-[var(--accent-${item.color})] flex items-center gap-4`}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                        >
                            <div>
                                <h3 className={`font-bold text-[var(--accent-${item.color})]`}>{item.title}</h3>
                                <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        ),
    },

    // ===== SLIDE 44: When NOT to use MFE =====
    {
        id: 44,
        title: 'Khi nào KHÔNG nên dùng MFE?',
        section: 'Summary',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    <span className="text-[var(--accent-red)]">⚠️</span> Khi nào KHÔNG nên dùng?
                </h2>
                <div className="grid grid-cols-2 gap-6">
                    <motion.div className="glass p-6 rounded-lg border-2 border-[var(--accent-red)]/50" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h4 className="text-[var(--accent-red)] font-bold mb-4">❌ KHÔNG dùng khi</h4>
                        <ul className="text-sm text-[var(--text-secondary)] space-y-2">
                            <li>• App nhỏ, 1-3 developers</li>
                            <li>• Không cần deploy độc lập</li>
                            <li>• Team nhỏ, không có vấn đề coordination</li>
                            <li>• Startup MVP cần ship nhanh</li>
                            <li>• Chưa có DevOps maturity</li>
                        </ul>
                    </motion.div>
                    <motion.div className="glass p-6 rounded-lg border-2 border-[var(--accent-green)]/50" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <h4 className="text-[var(--accent-green)] font-bold mb-4">✅ NÊN dùng khi</h4>
                        <ul className="text-sm text-[var(--text-secondary)] space-y-2">
                            <li>• Team lớn (&gt;5 devs) hoặc nhiều team</li>
                            <li>• Cần deploy độc lập các feature</li>
                            <li>• Legacy migration dần dần</li>
                            <li>• Nhiều product lines cùng platform</li>
                            <li>• Scale organization, không chỉ code</li>
                        </ul>
                    </motion.div>
                </div>
                <motion.div className="mt-6 glass p-4 rounded-lg text-sm text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <strong className="text-[var(--accent-cyan)]">💡 Remember:</strong> MFE thêm complexity đáng kể. Giải quyết vấn đề organization, không phải technical!
                </motion.div>
            </div>
        ),
    },

    // ===== SLIDE 45: Module Loading Flow =====
    {
        id: 45,
        title: 'Luồng Load Module',
        section: 'Module Federation',
        variant: 'diagram',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    Module Loading Flow
                </h2>
                <ModuleLoadingFlowDiagram />
            </div>
        ),
    },

    // ===== SLIDE 46: Best Practices Checklist =====
    {
        id: 46,
        title: 'Best Practices Checklist',
        section: 'Summary',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    MFE Best Practices Checklist
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { category: 'Configuration', items: ['React: singleton=true', 'Shared dependencies đầy đủ', 'Version matching'] },
                        { category: 'CSS', items: ['CSS Modules hoặc CSS-in-JS', 'Host owns global CSS', 'Remote scoped styles'] },
                        { category: 'Routing', items: ['Single history instance', 'Lazy load remotes', 'Error Boundary'] },
                        { category: 'Communication', items: ['Event Bus pattern', 'Type-safe events', 'Avoid tight coupling'] },
                    ].map((group, i) => (
                        <motion.div
                            key={group.category}
                            className="glass p-4 rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <h4 className="text-[var(--accent-cyan)] font-bold mb-3">{group.category}</h4>
                            <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                                {group.items.map((item, j) => (
                                    <li key={j} className="flex items-center gap-2">
                                        <span className="text-[var(--accent-green)]">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        ),
    },

    // ===== SLIDE 47: Thank You =====
    {
        id: 47,
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
