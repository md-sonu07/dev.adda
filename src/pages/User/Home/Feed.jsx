import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostsAction } from '../../../redux/thunks/postThunk';
import { toggleBookmarkAction } from '../../../redux/thunks/bookmarkThunk';
import { resetPosts, setCategory } from '../../../redux/slices/postSlice';
import { toggleLikeAction } from '../../../redux/thunks/likeThunk';
import { sharePost } from '../../../utils/shareUtils';
import {
    HiOutlineHandThumbUp,
    HiHandThumbUp,
    HiOutlineChatBubbleBottomCenterText,
    HiOutlineBookmark,
    HiBookmark,
    HiOutlineShare,
    HiArrowUpRight,
    HiOutlineXMark,
    HiOutlineEye,
    HiOutlineEyeSlash
} from 'react-icons/hi2';
import toast from 'react-hot-toast';
import advertisements from '../../../assets/data/advertisment.js';
import SkeletonImage from '../../../components/common/SkeletonImage';

import { useNavigate, useSearchParams } from 'react-router-dom';

const LIMIT = 10;

function Feed() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q');
    const { posts, loading, selectedCategory, pagination } = useSelector((state) => state.post);

    // Use refs so the IntersectionObserver callback always has fresh values
    // without needing to be recreated on every render.
    const loadingRef = useRef(loading);
    const paginationRef = useRef(pagination);
    const isFetchingRef = useRef(false);

    useEffect(() => { loadingRef.current = loading; }, [loading]);
    useEffect(() => { paginationRef.current = pagination; }, [pagination]);

    const observer = useRef();
    const lastPostElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (
                entries[0].isIntersecting &&
                paginationRef.current.hasMore &&
                !loadingRef.current &&
                !isFetchingRef.current
            ) {
                isFetchingRef.current = true;
                const { currentPage, limit } = paginationRef.current;
                dispatch(getAllPostsAction({
                    q,
                    page: currentPage + 1,
                    limit,
                    category: selectedCategory &&
                        !selectedCategory.startsWith('#') &&
                        !['Latest', 'Trending', 'Following', 'Authors'].includes(selectedCategory)
                        ? selectedCategory
                        : undefined
                })).finally(() => {
                    isFetchingRef.current = false;
                });
            }
        }, { threshold: 0.1 });
        if (node) observer.current.observe(node);
    }, [q, selectedCategory, dispatch]);

    // Reset and fetch first page whenever the search query or category changes
    useEffect(() => {
        isFetchingRef.current = true;
        dispatch(resetPosts());

        // Scroll to top when category or search changes
        window.scrollTo({ top: 0, behavior: 'instant' });

        const category =
            selectedCategory &&
                !selectedCategory.startsWith('#') &&
                !['Latest', 'Trending', 'Following', 'Authors'].includes(selectedCategory)
                ? selectedCategory
                : undefined;
        dispatch(getAllPostsAction({ q, page: 1, limit: LIMIT, category })).finally(() => {
            isFetchingRef.current = false;
        });
    }, [dispatch, q, selectedCategory]);

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    };

    // Note: In a real app, backend would handle category-based filtering perfectly.
    // Keeping client-side logic for special categories like 'Trending' if data is already fetched.
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
                return filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
            case 'Following':
                // For now, if no backend implementation, show all approved
                return filtered;
            case 'Authors':
                return filtered;
            default:
                return filtered;
        }
    };

    const filteredPosts = getFilteredPosts();

    return (
        <div className="max-w-[1400px] py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPosts.map((post, index) => {
                    if (filteredPosts.length === index + 1) {
                        return (
                            <div ref={lastPostElementRef} key={post._id}>
                                <ArticleCard
                                    article={post}
                                    formatTime={formatTime}
                                    fetchPriority={index < 2 ? "high" : "auto"}
                                />
                            </div>
                        );
                    } else {
                        return (
                            <ArticleCard
                                key={post._id}
                                article={post}
                                formatTime={formatTime}
                                fetchPriority={index < 2 ? "high" : "auto"}
                            />
                        );
                    }
                })}
            </div>

            {/* Advertisements section - appearing after posts if they exist */}
            {posts.length > 0 && advertisements.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {advertisements.map((ad, idx) => (
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
            )}

            {loading && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {[1, 2].map((i) => (
                        <SkeletonCard key={`extra-skeleton-${i}`} />
                    ))}
                </div>
            )}

            {!loading && posts.length > 0 && !pagination.hasMore && (
                <div className="flex flex-col items-center justify-center mt-12 pb-10 gap-3 grayscale opacity-40">
                    <div className="h-px w-20 bg-default"></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em]">Reached The End</p>
                    <div className="h-px w-20 bg-default"></div>
                </div>
            )}

            {!loading && filteredPosts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 px-6 mt-6 bg-card/30 rounded-3xl border border-default border-dashed animate-in fade-in zoom-in duration-500">
                    <div className="w-16 h-16 mb-6 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10">
                        <HiOutlineEyeSlash className="text-3xl text-primary/40" />
                    </div>
                    <h3 className="text-lg font-bold text-body mb-2">No articles found</h3>
                    <p className="text-muted text-sm max-w-[280px] text-center leading-relaxed">
                        We couldn't find any articles in the <span className="text-primary font-semibold">{selectedCategory}</span> feed. Try checking back later or exploring other categories.
                    </p>
                    <button
                        onClick={() => dispatch(setCategory('Latest'))}
                        className="mt-8 px-6 py-2.5 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:shadow-lg hover:shadow-primary/20 transition-all"
                    >
                        Back to Latest
                    </button>
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

const ArticleCard = ({ article, formatTime, fetchPriority = "auto" }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { bookmarkedPosts } = useSelector((state) => state.bookmark);
    const { postLikes } = useSelector((state) => state.like);

    const isBookmarked = bookmarkedPosts.some(post => post._id === article?._id);
    const likeInfo = postLikes[article?._id] || { count: article.likesCount || 0, isLiked: false };

    const handleToggleBookmark = async (e) => {
        e.stopPropagation();
        if (!user) {
            toast.error("Please login to bookmark");
            return navigate("/login");
        }
        try {
            const result = await dispatch(toggleBookmarkAction({ postId: article?._id, post: article })).unwrap();
            toast.success(result.isBookmarked ? "Post saved to bookmarks" : "Post removed from bookmarks");
        } catch (error) {
            toast.error(error?.message || "Action failed");
        }
    };

    const handleToggleLike = async (e) => {
        e.stopPropagation();
        if (!user) {
            toast.error("Please login to like");
            return navigate("/login");
        }
        try {
            const result = await dispatch(toggleLikeAction(article?._id)).unwrap();
            toast.success(result.isLiked ? "Post liked" : "Post unliked");
        } catch (error) {
            toast.error(error?.message || "Action failed");
        }
    }

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

                <div className="flex items-center gap-2 font-display text-body">
                    <button
                        onClick={handleToggleLike}
                        className={`group/like flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 text-[10px] font-bold ${likeInfo.isLiked
                            ? 'text-blue-500 bg-blue-500/10 dark:bg-blue-500/20 shadow-sm border border-blue-500/20'
                            : 'bg-box/50 border border-default/60 text-muted hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-500'}`}
                    >
                        {likeInfo.isLiked ? <HiHandThumbUp className="text-base animate-pop" /> : <HiOutlineHandThumbUp className="text-base group-hover/like:scale-110 transition-transform" />}
                        <span>{likeInfo.count}</span>
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/article/${article._id}#comments`);
                        }}
                        className="group/comment flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-box/50 border border-default/60 text-muted hover:border-emerald-500/30 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-500 transition-all duration-300 text-[10px] font-bold"
                    >
                        <HiOutlineChatBubbleBottomCenterText className="text-base group-hover/comment:scale-110 transition-transform" />
                        <span>{article.commentCount || 0}</span>
                    </button>

                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-box/20 border border-default/40 text-muted/80 text-[10px] font-bold">
                        <HiOutlineEye className="text-base" />
                        <span>{article.views || 0}</span>
                    </div>

                    {article.tags?.includes("ADD") && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            className="flex items-center cursor-pointer gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 transition-all text-[10px] font-bold text-red-500 m-auto"
                        >
                            Remove Ad
                            <HiOutlineXMark className="text-base" />
                        </button>
                    )}

                    <button
                        onClick={handleToggleBookmark}
                        className={`group/bookmark flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 text-[10px] font-bold ml-auto cursor-pointer ${isBookmarked
                            ? 'text-amber-500 bg-amber-500/10 dark:bg-amber-500/20 shadow-sm border border-amber-500/20'
                            : 'bg-box/50 border border-default/60 text-muted hover:border-amber-500/30 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:text-amber-500'}`}
                    >
                        {isBookmarked ? <HiBookmark className="text-base animate-pop" /> : <HiOutlineBookmark className="text-base group-hover/bookmark:scale-110 transition-transform" />}
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            sharePost({
                                title: article.title,
                                text: article.summary,
                                url: `${window.location.origin}/article/${article._id}`
                            });
                        }}
                        className="group/share flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-box/50 border border-default/60 text-muted hover:border-indigo-500/30 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-500 transition-all duration-300 text-[10px] font-bold"
                    >
                        <HiOutlineShare className="text-base group-hover/share:scale-110 transition-transform" />
                    </button>
                </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full sm:w-[35%] p-3">
                <div className="relative h-full w-full rounded-xl overflow-hidden group/img">
                    <SkeletonImage
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-44 sm:h-full group-hover:scale-110 transition-transform duration-700"
                        fetchPriority={fetchPriority}
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
                            <SkeletonImage
                                src={article.author?.avatar}
                                alt={article.author?.fullName || "A"}
                                className="h-6 w-6 rounded-full border border-white/20"
                            />
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