import { HiOutlineHandThumbUp, HiOutlineChatBubbleBottomCenterText, HiChevronDown } from 'react-icons/hi2';
import { IoImageOutline, IoCodeOutline } from 'react-icons/io5';

const ArticleComments = () => {
    return (
        <section className="mb-24 pt-10" id="comments">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl md:text-3xl font-black text-text-heading">Discussion</h2>
                    <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                        <span className="size-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-black text-primary uppercase tracking-widest">45 Comments</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-box/40 border border-default p-1 rounded-xl">
                    <button className="px-4 py-1.5 rounded-lg bg-box shadow-sm text-xs font-black text-text-heading border border-default/60">Newest</button>
                    <button className="px-4 py-1.5 rounded-lg text-xs font-black text-muted hover:text-text-heading transition-colors">Oldest</button>
                </div>
            </div>

            {/* Premium Comment Input */}
            <div className="group relative mb-16 bg-box/40 border border-default rounded-3xl p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                <div className="flex gap-4 mb-6">
                    <div className="size-10 rounded-2xl overflow-hidden bg-linear-to-tr from-primary/20 to-transparent p-0.5">
                        <img
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                            alt="Current User"
                            className="w-full h-full rounded-[14px] object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="comment-textarea" className="sr-only">Comment</label>
                        <textarea
                            id="comment-textarea"
                            name="comment"
                            className="w-full bg-transparent border-none focus:ring-0 text-text-heading placeholder:text-muted/60 resize-none min-h-[100px] text-sm md:text-base leading-relaxed"
                            placeholder="Share your technical perspective..."
                        ></textarea>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-default/60">
                    <div className="flex items-center gap-3">
                        <button aria-label="Attach Image" title="Attach Image" className="size-10 flex items-center justify-center rounded-xl hover:bg-box text-muted hover:text-primary transition-all group/btn">
                            <IoImageOutline className="text-xl group-hover:scale-110 transition-transform" />
                        </button>
                        <button aria-label="Add Code" title="Add Code" className="size-10 flex items-center justify-center rounded-xl hover:bg-box text-muted hover:text-green-500 transition-all group/btn">
                            <IoCodeOutline className="text-xl group-hover:scale-110 transition-transform" />
                        </button>
                        <button aria-label="Bold Text" title="Bold Text" className="size-10 flex items-center justify-center rounded-xl hover:bg-box text-muted hover:text-blue-500 transition-all font-serif font-black text-lg">
                            B
                        </button>
                    </div>
                    <button className="bg-primary text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:shadow-lg hover:shadow-primary/25 transition-all active:scale-95">
                        Post Comment
                    </button>
                </div>
            </div>

            {/* Mock Comments List */}
            <div className="space-y-8">
                {[1, 2].map(id => (
                    <div key={id} className={`group flex gap-5 ${id === 2 ? 'ml-14 border-l-2 border-default/40 pl-8' : ''}`}>
                        <div className="size-12 rounded-2xl overflow-hidden shrink-0 shadow-md">
                            <img
                                src={`https://i.pravatar.cc/150?u=${id}`}
                                alt={`User ${id}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h4 className="font-black text-text-heading text-sm mb-0.5">Alex Rivers</h4>
                                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Software Engineer @ Stack</span>
                                </div>
                                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">2h ago</span>
                            </div>
                            <p className="text-text-muted text-sm md:text-base leading-relaxed mb-6">
                                This is a fantastic deep dive into React architecture! The section on reconciliation patterns was particularly insightful.
                                Have you considered how this might change with the upcoming compiler updates?
                            </p>
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 px-3 py-1.5 rounded-full transition-all duration-300 group/likebtn">
                                    <HiOutlineHandThumbUp className="text-lg group-hover/likebtn:scale-110 transition-transform" />
                                    <span>24 Likes</span>
                                </button>
                                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 px-3 py-1.5 rounded-full transition-all duration-300 group/replybtn">
                                    <HiOutlineChatBubbleBottomCenterText className="text-lg group-hover/replybtn:scale-110 transition-transform" />
                                    <span>Reply</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <button className="w-full py-5 rounded-2xl border border-dashed border-default hover:border-primary/50 text-muted hover:text-primary transition-all font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 group">
                    <HiChevronDown className="text-lg group-hover:translate-y-1 transition-transform" />
                    Load More Comments
                </button>
            </div>
        </section>
    );
};

export default ArticleComments;
