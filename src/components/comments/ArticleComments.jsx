import { useState, useRef, useEffect } from 'react';
import { HiOutlineHandThumbUp, HiOutlineChatBubbleBottomCenterText, HiChevronDown } from 'react-icons/hi2';

const ArticleComments = () => {
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [sortBy, setSortBy] = useState("Newest first");
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsSortOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const sortOptions = ["Newest first", "Oldest first", "Most liked"];

    const handleSortSelect = (option) => {
        setSortBy(option);
        setIsSortOpen(false);
    };
    return (
        <section className="mb-24 pt-10 border-t border-default/30" id="comments">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-text-heading">Comments</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                        45
                    </span>
                </div>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-box/40 border transition-all duration-300 shadow-sm shadow-black/5 ${isSortOpen ? 'border-primary/40 text-text-heading' : 'border-default/40 hover:border-primary/40 text-sm font-medium text-muted hover:text-text-heading'}`}
                    >
                        {sortBy}
                        <HiChevronDown className={`text-base transition-all duration-300 ${isSortOpen ? 'text-primary rotate-180' : 'text-muted'}`} />
                    </button>

                    {/* Dropdown menu */}
                    <div className={`absolute right-0 top-full mt-2 w-36 bg-surface border border-default/50 rounded-xl shadow-xl shadow-black/10 transition-all duration-200 origin-top-right z-10 flex flex-col overflow-hidden ${isSortOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}>
                        {sortOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleSortSelect(option)}
                                className={`text-left px-4 py-2.5 text-sm font-medium transition-colors ${sortBy === option ? 'text-text-heading bg-primary/10 hover:bg-primary/15' : 'text-muted hover:text-text-heading hover:bg-box/50'}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Premium Simple Input */}
            <div className="flex gap-4 mb-12">
                <div className="size-10 rounded-full overflow-hidden shrink-0 mt-1">
                    <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                        alt="Current User"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 bg-box/30 rounded-2xl p-4 border border-default/40 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-300">
                    <label htmlFor="comment-textarea" className="sr-only">Comment</label>
                    <textarea
                        id="comment-textarea"
                        name="comment"
                        className="w-full bg-transparent border-none focus:ring-0 outline-none text-text-heading placeholder:text-muted/60 resize-none min-h-[80px] text-base leading-relaxed p-0"
                        placeholder="What are your thoughts?"
                    ></textarea>

                    <div className="flex items-center justify-end mt-4 pt-4 border-t border-default/30">
                        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95">
                            Post to discussion
                        </button>
                    </div>
                </div>
            </div>

            {/* Clean Comments List */}
            <div className="space-y-8">
                {[1, 2].map(id => (
                    <div key={id} className={`flex gap-4 ${id === 2 ? 'ml-12 border-l-2 border-default/30 pl-6' : ''}`}>
                        <div className="size-10 rounded-full overflow-hidden shrink-0 mt-1">
                            <img
                                src={`https://i.pravatar.cc/150?u=${id}`}
                                alt={`User ${id}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-baseline gap-3 mb-1">
                                <h4 className="font-semibold text-text-heading text-base">Alex Rivers</h4>
                                <span className="text-xs text-muted">2 hours ago</span>
                            </div>
                            <p className="text-text-muted text-base leading-relaxed mb-4">
                                This is a fantastic deep dive into React architecture! The section on reconciliation patterns was particularly insightful.
                                Have you considered how this might change with the upcoming compiler updates?
                            </p>
                            <div className="flex items-center gap-6">
                                <button className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary transition-colors group">
                                    <HiOutlineHandThumbUp className="text-[1.1rem] group-active:scale-90 transition-transform" />
                                    <span>24</span>
                                </button>
                                <button className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary transition-colors group">
                                    <HiOutlineChatBubbleBottomCenterText className="text-[1.1rem] group-active:scale-90 transition-transform" />
                                    <span>Reply</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="pt-4">
                    <button className="w-full py-3.5 rounded-xl bg-box/30 hover:bg-box/50 border border-default/40 text-text-heading text-sm font-semibold transition-all flex items-center justify-center gap-2 group">
                        Load more comments
                        <HiChevronDown className="text-lg text-muted group-hover:translate-y-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ArticleComments;
