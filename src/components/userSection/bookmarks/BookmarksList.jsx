import {
    HiOutlineBookmark,
    HiOutlineTrash,
    HiOutlineArrowTopRightOnSquare,
    HiOutlineClock
} from 'react-icons/hi2';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleBookmarkAction } from '../../../redux/thunks/bookmarkThunk';
import toast from 'react-hot-toast';

const BookmarksList = ({ filter }) => {
    const dispatch = useDispatch();
    const { bookmarkedPosts, loading } = useSelector((state) => state.bookmark);

    const handleDelete = async (postId) => {
        try {
            await dispatch(toggleBookmarkAction({ postId })).unwrap();
            toast.success("Bookmark removed");
        } catch (error) {
            toast.error(error?.message || "Failed to remove bookmark");
        }
    };

    const handleClearAll = async () => {
        if (filteredArticles.length === 0) return;

        toast.promise(
            Promise.all(filteredArticles.map(article =>
                dispatch(toggleBookmarkAction({ postId: article._id })).unwrap()
            )),
            {
                loading: 'Clearing bookmarks...',
                success: 'All bookmarks removed',
                error: 'Failed to clear some bookmarks',
            }
        );
    };

    const filteredArticles = filter === 'all'
        ? bookmarkedPosts
        : bookmarkedPosts.filter(post => post.category?.categoryName?.toLowerCase() === filter.toLowerCase());

    if (loading && bookmarkedPosts.length === 0) {
        return <div className="py-20 text-center font-black uppercase tracking-widest text-xs animate-pulse">Loading saved posts...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-muted">
                    {filter === 'history' ? 'Recently Viewed' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Collections`}
                </h2>
                <button
                    onClick={handleClearAll}
                    className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                >
                    Clear {filter === 'history' ? 'History' : 'All'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                    <div key={article._id} className="group rounded-xl border border-default p-4 flex gap-4 hover:border-primary/40 transition-all duration-300">
                        <Link to={`/article/${article._id}`} className="size-24 rounded-lg overflow-hidden shrink-0">
                            <img
                                src={article.coverImage}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </Link>

                        <div className="flex flex-col justify-between flex-1 min-w-0">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded-md">
                                        {article.category?.categoryName || 'General'}
                                    </span>
                                    <span className="text-[9px] font-bold text-muted flex items-center gap-1">
                                        <HiOutlineClock className="text-xs" />
                                        5 min read
                                    </span>
                                </div>
                                <Link to={`/article/${article._id}`}>
                                    <h3 className="text-sm font-black line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                                        {article.title}
                                    </h3>
                                </Link>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <span className="text-[9px] font-bold text-muted">
                                    {new Date(article.createdAt).toLocaleDateString()}
                                </span>
                                <div className="flex items-center gap-1">
                                    <a href={article.projectLink} target="_blank" rel="noreferrer" className="p-2 text-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="External Link">
                                        <HiOutlineArrowTopRightOnSquare className="text-sm" />
                                    </a>
                                    <button
                                        onClick={() => handleDelete(article._id)}
                                        className="p-2 text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                        title="Remove"
                                    >
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
