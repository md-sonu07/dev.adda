import React from 'react';
import { HiOutlineHandThumbUp, HiOutlineChatBubbleBottomCenterText, HiChevronDown } from 'react-icons/hi2';
import { IoImageOutline, IoCodeOutline } from 'react-icons/io5';
import { MdFormatBold } from 'react-icons/md';

const ArticleComments = () => {
    return (
        <section className="mb-20" id="comments">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Discussion (45)</h3>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <span>Sort by:</span>
                    <button className="text-primary flex items-center gap-1">
                        Top <HiChevronDown className="text-xs" />
                    </button>
                </div>
            </div>

            {/* Comment Input */}
            <div className="bg-slate-100 dark:bg-[#1a2233] p-4 rounded-xl border border-slate-200 dark:border-[#232f48] mb-12">
                <div className="flex gap-4">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
                        style={{
                            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBXocbmxMc8rzD36P0oTKHlNalwLE0K3ZwUQ0AzpL51xUfaKAeG_Yy8CRNKz4M3qJKcUlSKn0ravQ9MALK7qkDZ6JaW7R2Lwl4Xx_MdKFnItYlzMiqWmmgzzzDvNRjb0c53PVFbiCd8-98kmF0MNOksX7C2lriDwyQGjKvl40Qs-hOpd8RzbU4nDnPnGCPv8Fc0BFrcQWVgegjkOrCZEyLiJwBxcr7YxTN0ZgSjwaUHPy3UsqMtfonG3EHpe6pvseeMJyQWhyBbFkJF")'
                        }}
                    ></div>
                    <div className="flex-1">
                        <textarea
                            className="w-full bg-white dark:bg-[#101622] border border-slate-200 dark:border-[#232f48] rounded-lg p-3 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-[#92a4c9] focus:ring-1 focus:ring-primary focus:border-primary min-h-[100px] text-sm resize-none mb-3"
                            placeholder="Add to the discussion..."
                        ></textarea>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <button className="p-2 text-slate-500 hover:text-primary transition-colors">
                                    <IoImageOutline className="text-xl" />
                                </button>
                                <button className="p-2 text-slate-500 hover:text-primary transition-colors">
                                    <IoCodeOutline className="text-xl" />
                                </button>
                                <button className="p-2 text-slate-500 hover:text-primary transition-colors">
                                    <MdFormatBold className="text-xl" />
                                </button>
                            </div>
                            <button className="bg-primary text-white px-5 py-2 rounded-lg font-bold text-sm hover:opacity-90">
                                Post Comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comment Threads */}
            <div className="space-y-8">
                {/* Comment 1 */}
                <div className="flex gap-4">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
                        style={{
                            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC3DQgMruYGoQue4ERJjnMLzouAj5srjoo5CYxbw32YsUBhNdH4BIRsHasDPKqmEBdb9Ws9LeVnO_6YqDqHFIop30Z6tQ9vOuHH7c4hh7LR5m-puQHO6L79WSFXaq8H2zCMJ46UEM1qQKIwZ7tBOD_nn7A9td-YAkwf3BPhjMcsZ3n-lYdlHOrtASD-l59KuEDFC8Io3iC04BNfpnXyieTBwCcO3fBhAy0azP3pbFms9ea85dML4Wp5owp1sYKYgXac-vREpqRn2pj5")'
                        }}
                    ></div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-slate-900 dark:text-white">Alex Rivera</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">• 2h ago</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                            Great breakdown of the ownership model. I found that the 'Copy' vs 'Clone' distinction was also a major sticking point when I started. Maybe a future article on that?
                        </p>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary transition-colors">
                                <HiOutlineHandThumbUp className="text-sm" /> 12
                            </button>
                            <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary transition-colors">
                                <HiOutlineChatBubbleBottomCenterText className="text-sm" /> Reply
                            </button>
                        </div>

                        {/* Nested Reply */}
                        <div className="mt-6 pl-6 border-l-2 border-slate-200 dark:border-[#232f48] space-y-6">
                            <div className="flex gap-4">
                                <div
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0 ring-2 ring-primary/40"
                                    style={{
                                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBzlUuSLSBnwYg59pZiJbf2pESq5PNwN_XBt0KBHWOZTrr8k8dDkvaFWSQs7acIQmfi9vCVFrgj0ciXMeR0OHiOXg2Qv78V0kg8Gsma-pdcJQXJOhijMYOUmZntsTJjdOzJC9W3hmpqyJ-1EBkLvJs0ZI--jUu2fiSQw1MtjRxgiJgKbcLop_LIiM1Xt5qYzDBzXXyKjnAXpwJgp76gk4riWNDB4_osp6TeidmgXf3JJYauTInz0y0_spNbwFNs_TT0QDzlN5-yepWh")'
                                    }}
                                ></div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-slate-900 dark:text-white">Jane Doe</span>
                                        <span className="bg-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
                                            Author
                                        </span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">• 1h ago</span>
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                                        Thanks Alex! Definitely. I'm planning a "Rust Type System" series that will cover Copy, Clone, and traits like Send/Sync in depth.
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary transition-colors">
                                            <HiOutlineHandThumbUp className="text-sm" /> 5
                                        </button>
                                        <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary transition-colors">
                                            <HiOutlineChatBubbleBottomCenterText className="text-sm" /> Reply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comment 2 */}
                <div className="flex gap-4">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
                        style={{
                            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAKDPaE3EEi5XHH-_JOUfDuQj97YtZU7G6L-kGhh_2SJZxcSY4qeS7gQh-xk52Gg08ne7R51TnikGDkoNtQIKa2hAtBw3mZFVhRzv_NzLnZAgYuhcGqzWYhMMGMWkbRUJl8XT8-w_Q_lgtLlKKKQukhBmwwdWIZyh5vSFUUEuuN6GuSQoCTobc5e_mRmIi0Nvhb9nHnYmaykwFbVO_8qTuDDqpYYHFonVTf9G0FMRXCe8D-RbvG8JXQV2kb_jcjeoQN0QKHhZK7-GHO")'
                        }}
                    ></div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-slate-900 dark:text-white">Marcus Smith</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">• 4h ago</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                            Does this model significantly impact compilation times compared to C++? I've heard the borrow checker can be quite slow on larger projects.
                        </p>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary transition-colors">
                                <HiOutlineHandThumbUp className="text-sm" /> 2
                            </button>
                            <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary transition-colors">
                                <HiOutlineChatBubbleBottomCenterText className="text-sm" /> Reply
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <button className="w-full mt-10 py-3 rounded-xl border border-dashed border-slate-300 dark:border-[#232f48] text-slate-500 dark:text-[#92a4c9] font-bold text-sm hover:bg-slate-50 dark:hover:bg-[#1a2233] transition-colors">
                Load More Comments
            </button>
        </section>
    );
};

export default ArticleComments;
