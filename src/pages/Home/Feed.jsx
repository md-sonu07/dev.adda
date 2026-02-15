import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostsAction } from '../../redux/thunks/postThunk';
import {
    HiOutlineHandThumbUp,
    HiOutlineChatBubbleBottomCenterText,
    HiOutlineBookmark,
    HiOutlineShare,
    HiChevronDown,
    HiArrowUpRight,
    HiOutlineXMark
} from 'react-icons/hi2';
import advertisements from '../../assets/data/advertisment.js';
import SkeletonImage from '../../components/common/SkeletonImage';

import { useNavigate, useSearchParams } from 'react-router-dom';

function Feed() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q');
    const { posts, loading, selectedCategory } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(getAllPostsAction({ q }));
    }, [dispatch, q]);

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    };

    // --- Dynamic Filtering Logic ---
    const getFilteredPosts = () => {
        let filtered = [...posts].filter(post => post.status === 'approved');

        if (selectedCategory.startsWith('#')) {
            const tag = selectedCategory.slice(1).toLowerCase();
            return filtered.filter(post =>
                post.tags?.some(t => t.toLowerCase() === tag)
            );
        }

        switch (selectedCategory) {
            case 'Latest':
                return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case 'Trending':
                // For trending, we could sort by likes or just show most recent
                return filtered.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
            case 'Following':
                // Placeholder: currently shows all approved posts
                return filtered;
            default:
                return filtered;
        }
    };

    const filteredPosts = getFilteredPosts();

    if (loading && posts.length === 0) {
        return (
            <div className="max-w-[1400px] py-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                    <ArticleCard key={post._id} article={post} formatTime={formatTime} />
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {advertisements && advertisements.map((ad, idx) => (
                    <ArticleCard
                        key={`ad-${idx}`}
                        article={{
                            ...ad,
                            summary: ad.description,
                            coverImage: ad.image,
                            likes: { length: ad.likes },
                            author: { ...ad.author, fullName: ad.author.name },
                            tags: ad.tags ? ad.tags.map(t => t.name || t) : []
                        }}
                        formatTime={() => ad.time}
                    />
                ))}
            </div>

            {posts.length > 0 && (
                <div className="flex justify-center mt-12 pb-10">
                    <button
                        className="px-8 py-3 bg-box border border-default rounded-xl text-sm font-bold text-body transition-all flex items-center gap-2 hover:bg-primary/10"
                    >
                        <HiChevronDown className="text-xl" />
                        Load More Content
                    </button>
                </div>
            )}

            {!loading && posts.length === 0 && (
                <div className="text-center mt-10 shadow-xl py-20 bg-card rounded-2xl border border-default border-dashed">
                    <p className="text-muted font-medium">No articles found in the feed.</p>
                </div>
            )}
        </div>
    );
}

const SkeletonCard = () => {
    return (
        <div className="flex flex-col sm:flex-row bg-card rounded-2xl border border-default overflow-hidden h-auto sm:h-72 animate-pulse">
            <div className="w-full sm:w-[65%] p-4 md:p-6 flex flex-col justify-between">
                <div>
                    <div className="flex gap-2 mb-4">
                        <div className="h-4 w-16 bg-box rounded-md"></div>
                        <div className="h-4 w-16 bg-box rounded-md"></div>
                    </div>
                    <div className="h-7 w-5/6 bg-box rounded-lg mb-3"></div>
                    <div className="h-7 w-2/3 bg-box rounded-lg mb-4"></div>
                    <div className="space-y-2.5">
                        <div className="h-3 w-full bg-box rounded-md"></div>
                        <div className="h-3 w-4/5 bg-box rounded-md"></div>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                    <div className="h-8 w-12 bg-box rounded-full"></div>
                    <div className="h-8 w-12 bg-box rounded-full"></div>
                    <div className="h-8 w-8 bg-box rounded-full ml-auto"></div>
                    <div className="h-8 w-8 bg-box rounded-full"></div>
                </div>
            </div>
            <div className="w-full sm:w-[35%] p-3">
                <div className="h-44 sm:h-full w-full bg-box rounded-xl"></div>
            </div>
        </div>
    );
};

const ArticleCard = ({ article, formatTime }) => {
    const navigate = useNavigate();
    // Generate some deterministic colors for tags since we don't have them in DB
    const tagColors = [
        "text-primary bg-primary/10",
        "text-purple-500 bg-purple-500/10",
        "text-orange-500 bg-orange-500/10",
        "text-teal-500 bg-teal-500/10",
        "text-pink-500 bg-pink-500/10",
        "text-blue-500 bg-blue-500/10"
    ];

    const getTagColor = (index) => tagColors[index % tagColors.length];

    // Author color fallback
    const authorColors = [
        "bg-primary", "bg-purple-500", "bg-orange-500", "bg-teal-500", "bg-red-500"
    ];
    const getAuthorColor = (name) => {
        if (!name) return authorColors[0];
        const charCodeSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return authorColors[charCodeSum % authorColors.length];
    };

    const handleCardClick = () => {
        navigate(`/article/${article?._id}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className="group flex flex-col sm:flex-row bg-card rounded-2xl border border-default overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer h-auto sm:h-72 shadow-sm"
        >

            {/* LEFT CONTENT */}
            <div className="w-full sm:w-[65%] p-4 md:p-6 flex flex-col justify-between">
                <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {article.tags && article.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${getTagColor(idx)}`}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <h2 className="text-lg md:text-xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2 duration-700">
                        {article.title}
                    </h2>

                    <p className="text-muted line-clamp-2 text-xs leading-relaxed mb-4">
                        {article.summary}
                    </p>
                </div>

                <div className="flex items-center gap-1.5 font-display text-body">
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-box hover:bg-primary/10 transition-all text-[10px] font-bold"
                    >
                        <HiOutlineHandThumbUp className="text-base" />
                        {article.likes ? article.likes.length : 0}
                    </button>

                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-box hover:bg-primary/10 transition-all text-[10px] font-bold"
                    >
                        <HiOutlineChatBubbleBottomCenterText className="text-base" />
                        0
                    </button>
                    {article.tags?.includes("ADD") && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                // Add remove ad logic if needed
                            }}
                            className="flex items-center cursor-pointer gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 transition-all text-[10px] font-bold text-red-500 m-auto"
                        >
                            Remove Ad
                            <HiOutlineXMark className="text-base" />
                        </button>
                    )}

                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-box hover:bg-primary/10 transition-all text-[10px] font-bold ml-auto"
                    >
                        <HiOutlineBookmark className="text-base" />
                    </button>

                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-box hover:bg-primary/10 transition-all text-[10px] font-bold"
                    >
                        <HiOutlineShare className="text-base" />
                    </button>
                </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full sm:w-[35%] p-3">
                <div className="relative h-full w-full rounded-xl overflow-hidden group/img">
                    <SkeletonImage
                        src={article.coverImage || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop"}
                        alt={article.title}
                        className="w-full h-44 sm:h-full group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px] z-10">
                        <div className="bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full flex items-center gap-2 transform translate-y-4 group-hover/img:translate-y-0 transition-transform duration-300">
                            <span className="text-white text-xs font-bold uppercase tracking-wider">Read article</span>
                            <HiArrowUpRight className="text-white text-sm" />
                        </div>
                    </div>

                    {/* Author */}
                    <div className="absolute top-0 left-0 right-0 p-3 bg-linear-to-b from-black/70 to-transparent">
                        <div className="flex items-center gap-2">
                            {article.author?.avatar ? (
                                <SkeletonImage src={article.author.avatar} alt="" className="h-6 w-6 rounded-full border border-white/20" />
                            ) : (
                                <div className={`h-6 w-6 rounded-full border border-white/20 ${getAuthorColor(article.author?.fullName)}`}></div>
                            )}
                            <span className="text-[10px] font-semibold text-white truncate">
                                {article.author?.fullName || "Anonymous"}
                            </span>
                        </div>
                    </div>

                    {/* Time */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/70 to-transparent">
                        <span className="text-[9px] font-bold text-white/90 uppercase tracking-widest">
                            {formatTime(article.createdAt)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Feed;