import React from 'react';
import { HiOutlineHandThumbUp, HiOutlineChatBubbleBottomCenterText, HiChevronDown } from 'react-icons/hi2';
import { IoImageOutline, IoCodeOutline } from 'react-icons/io5';
import { MdFormatBold } from 'react-icons/md';

const ArticleComments = () => {
    return (
        <section className="mb-24 pt-10" id="comments">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                    <h3 className="text-2xl md:text-3xl font-black text-text-heading">Discussion</h3>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black tracking-widest">45</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted">
                    <span>Sort by:</span>
                    <button className="text-primary hover:underline transition-all flex items-center gap-1.5 cursor-pointer">
                        Trending <HiChevronDown className="text-xs" />
                    </button>
                </div>
            </div>

            {/* Premium Comment Input */}
            <div className="bg-box/40 dark:bg-[#1a2333]/40 backdrop-blur-sm p-6 rounded-3xl border border-default mb-16 shadow-sm group focus-within:border-primary/30 transition-all duration-300">
                <div className="flex gap-5">
                    <div className="size-12 rounded-full overflow-hidden border-2 border-primary/20 bg-background shrink-0">
                        <img
                            src="https://ui-avatars.com/api/?name=User&background=random"
                            className="w-full h-full object-cover"
                            alt="CurrentUser"
                        />
                    </div>
                    <div className="flex-1">
                        <textarea
                            className="w-full bg-background/50 border border-default rounded-2xl p-4 text-text-heading placeholder:text-muted/60 focus:ring-2 focus:ring-primary/10 focus:border-primary/40 min-h-[120px] text-[15px] font-medium resize-none mb-4 transition-all shadow-inner"
                            placeholder="Share your technical perspective..."
                        ></textarea>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex gap-1">
                                <button title="Attach Image" className="p-2.5 rounded-xl text-muted hover:text-primary hover:bg-primary/5 transition-all">
                                    <IoImageOutline className="text-xl" />
                                </button>
                                <button title="Add Code" className="p-2.5 rounded-xl text-muted hover:text-primary hover:bg-primary/5 transition-all">
                                    <IoCodeOutline className="text-xl" />
                                </button>
                                <button title="Bold Text" className="p-2.5 rounded-xl text-muted hover:text-primary hover:bg-primary/5 transition-all">
                                    <MdFormatBold className="text-xl" />
                                </button>
                            </div>
                            <button className="bg-primary text-white px-8 py-3 rounded-xl font-black uppercase tracking-[0.15em] text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
                                Post Comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comment Threads */}
            <div className="space-y-12">
                {[1, 2].map((_, i) => (
                    <div key={i} className="group/comment">
                        <div className="flex gap-5">
                            <div className="size-11 rounded-full overflow-hidden border border-default ring-4 ring-transparent group-hover/comment:ring-primary/5 transition-all duration-500 shrink-0 shadow-sm">
                                <img 
                                    src={`https://ui-avatars.com/api/?name=${i === 0 ? 'Alex' : 'Marcus'}&background=random`} 
                                    className="w-full h-full object-cover grayscale-[0.5] group-hover/comment:grayscale-0 transition-all duration-500"
                                    alt="User"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="font-black text-text-heading text-[15px]">{i === 0 ? 'Alex Rivera' : 'Marcus Smith'}</span>
                                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest">• {i === 0 ? '2h ago' : '4h ago'}</span>
                                </div>
                                <p className="text-text-body text-[15px] leading-relaxed mb-4 font-medium opacity-90">
                                    {i === 0 
                                        ? "Great breakdown of the ownership model. I found that the 'Copy' vs 'Clone' distinction was also a major sticking point when I started. Maybe a future article on that?"
                                        : "Does this model significantly impact compilation times compared to C++? I've heard the borrow checker can be quite slow on larger projects."
                                    }
                                </p>
                                <div className="flex items-center gap-6">
                                    <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted hover:text-primary transition-all group/btn">
                                        <HiOutlineHandThumbUp className="text-sm group-hover/btn:-translate-y-0.5 transition-transform" /> 
                                        <span>{i === 0 ? '12' : '2'}</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted hover:text-primary transition-all group/btn">
                                        <HiOutlineChatBubbleBottomCenterText className="text-sm group-hover/btn:-translate-y-0.5 transition-transform" /> 
                                        <span>Reply</span>
                                    </button>
                                </div>

                                {i === 0 && (
                                    <div className="mt-8 pl-8 border-l-2 border-primary/10 space-y-8">
                                        <div className="flex gap-4">
                                            <div className="size-9 rounded-full overflow-hidden border-2 border-primary/20 bg-background shrink-0 shadow-sm">
                                                <img 
                                                    src="https://ui-avatars.com/api/?name=Jane&background=random" 
                                                    className="w-full h-full object-cover"
                                                    alt="Author"
                                                />
                                            </div>
                                            <div className="flex-1 bg-primary/5 p-5 rounded-2xl border border-primary/10">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="font-black text-text-heading text-sm">Jane Doe</span>
                                                    <span className="bg-primary text-white text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-[0.2em]">
                                                        Author
                                                    </span>
                                                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest">• 1h ago</span>
                                                </div>
                                                <p className="text-text-body text-sm leading-relaxed mb-4 font-medium">
                                                    Thanks Alex! Definitely. I'm planning a "Rust Type System" series that will cover Copy, Clone, and traits like Send/Sync in depth.
                                                </p>
                                                <div className="flex items-center gap-6">
                                                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/70 hover:text-primary transition-all">
                                                        <HiOutlineHandThumbUp className="text-sm" /> 5
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-16 py-4 rounded-2xl border-2 border-dashed border-default text-muted font-black text-[11px] uppercase tracking-[0.2em] hover:bg-box hover:text-primary hover:border-primary/30 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md active:scale-[0.99]">
                View All 42 Comments
            </button>
        </section>
    );
};

export default ArticleComments;
