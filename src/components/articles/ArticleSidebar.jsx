import React from 'react';

const ArticleSidebar = () => {
    return (
        <aside className="hidden lg:flex flex-col gap-8 w-[320px]">
            {/* Related Articles */}
            <div className="rounded-2xl border border-slate-200 dark:border-[#232f48] bg-white dark:bg-[#1a2233] p-5 shadow-sm">
                <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-4">Trending in Rust</h4>
                <div className="flex flex-col gap-6">
                    <a className="group" href="#">
                        <p className="text-slate-900 dark:text-white text-sm font-bold leading-snug group-hover:text-primary transition-colors mb-2">
                            WebAssembly with Rust: Building a Video Editor
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-[#92a4c9]">
                            <span>5 min read</span>
                            <span>•</span>
                            <span>342 likes</span>
                        </div>
                    </a>
                    <a className="group" href="#">
                        <p className="text-slate-900 dark:text-white text-sm font-bold leading-snug group-hover:text-primary transition-colors mb-2">
                            Async Rust: From Futures to Pinning
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-[#92a4c9]">
                            <span>12 min read</span>
                            <span>•</span>
                            <span>89 likes</span>
                        </div>
                    </a>
                    <a className="group" href="#">
                        <p className="text-slate-900 dark:text-white text-sm font-bold leading-snug group-hover:text-primary transition-colors mb-2">
                            Why I'm Moving my API from Go to Rust
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-[#92a4c9]">
                            <span>7 min read</span>
                            <span>•</span>
                            <span>1.5k likes</span>
                        </div>
                    </a>
                </div>
                <button className="w-full mt-6 py-2.5 bg-slate-100 dark:bg-[#232f48] text-slate-700 dark:text-white rounded-lg text-sm font-bold hover:opacity-80 transition-opacity">
                    View More
                </button>
            </div>

            {/* Newsletter Card */}
            <div className="rounded-2xl bg-primary/10 border border-primary/20 p-5">
                <h4 className="text-primary font-extrabold text-lg mb-2">DevDaily Weekly</h4>
                <p className="text-slate-600 dark:text-[#92a4c9] text-xs leading-relaxed mb-4">
                    Get the top curated developer news directly in your inbox every Sunday.
                </p>
                <input
                    className="w-full bg-white dark:bg-[#101622] border-slate-200 dark:border-primary/30 rounded-lg p-2.5 text-sm mb-3 focus:ring-1 focus:ring-primary"
                    placeholder="email@example.com"
                    type="email"
                />
                <button className="w-full bg-primary text-white py-2.5 rounded-lg text-sm font-bold shadow-md shadow-primary/20">
                    Subscribe
                </button>
            </div>
        </aside>
    );
};

export default ArticleSidebar;
