import React from 'react';
import {
    HiOutlineBookmark,
    HiOutlineTrash,
    HiOutlineShare,
    HiOutlineArrowTopRightOnSquare,
    HiOutlineClock
} from 'react-icons/hi2';

const BookmarksList = ({ filter }) => {
    // Mock data for saved articles
    const savedArticles = [
        {
            id: 1,
            title: "Exploring the Future of Web Assembly in 2024",
            category: "Web Dev",
            savedAt: "Saved 2 hours ago",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
            readTime: "5 min read"
        },
        {
            id: 2,
            title: "Advanced CSS Grid: Mastery within a Week",
            category: "Programming",
            savedAt: "Saved yesterday",
            image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=600&auto=format&fit=crop",
            readTime: "12 min read"
        },
        {
            id: 3,
            title: "Cybersecurity Trends: Protecting Modern Infrastructure",
            category: "Security",
            savedAt: "Saved 3 days ago",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
            readTime: "15 min read"
        }
    ];

    const filteredArticles = filter === 'all'
        ? savedArticles
        : savedArticles.filter(art => art.category.toLowerCase() === filter || (filter === 'history' && art.savedAt.includes('ago')));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-muted">
                    {filter === 'history' ? 'Recently Viewed' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Collections`}
                </h2>
                <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
                    Clear {filter === 'history' ? 'History' : 'All'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                    <div key={article.id} className="group rounded-xl border border-default p-4 flex gap-4 hover:border-primary/40 transition-all duration-300">
                        <div className="size-24 rounded-lg overflow-hidden shrink-0">
                            <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>

                        <div className="flex flex-col justify-between flex-1 min-w-0">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded-md">
                                        {article.category}
                                    </span>
                                    <span className="text-[9px] font-bold text-muted flex items-center gap-1">
                                        <HiOutlineClock className="text-xs" />
                                        {article.readTime}
                                    </span>
                                </div>
                                <h3 className="text-sm font-black line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                                    {article.title}
                                </h3>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <span className="text-[9px] font-bold text-muted">{article.savedAt}</span>
                                <div className="flex items-center gap-1">
                                    <button className="p-2 text-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="External Link">
                                        <HiOutlineArrowTopRightOnSquare className="text-sm" />
                                    </button>
                                    <button className="p-2 text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Remove">
                                        <HiOutlineTrash className="text-sm" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredArticles.length === 0 && (
                    <div className="col-span-full py-20 text-center space-y-4 rounded-2xl border-2 border-dashed border-default">
                        <div className="p-4 rounded-full w-fit mx-auto shadow-sm border border-default">
                            <HiOutlineBookmark className="text-3xl text-muted" />
                        </div>
                        <div className="space-y-1">
                            <p className="font-black uppercase tracking-widest text-xs">Nothing Here Yet</p>
                            <p className="text-xs text-muted font-medium">Stories you save will appear in this section.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookmarksList;
