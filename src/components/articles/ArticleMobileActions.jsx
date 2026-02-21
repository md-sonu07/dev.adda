import React from 'react';
import {
    HiOutlineHandThumbUp,
    HiOutlineChatBubbleBottomCenterText,
    HiOutlineBookmark,
    HiBookmark,
    HiOutlineShare
} from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toggleBookmarkAction } from '../../redux/thunks/bookmarkThunk';
import toast from 'react-hot-toast';

const ArticleMobileActions = ({ post }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { bookmarkedPosts } = useSelector((state) => state.bookmark);

    // Sync with the same URL-based ID used in desktop view
    const isBookmarked = bookmarkedPosts.some(p => p._id === id);

    const handleToggleBookmark = async (e) => {
        e.stopPropagation();
        if (!user) {
            toast.error("Please login to bookmark");
            return navigate("/login");
        }
        try {
            const result = await dispatch(toggleBookmarkAction({ postId: id, post })).unwrap();
            toast.success(result.isBookmarked ? "Post saved to bookmarks" : "Post removed from bookmarks");
        } catch (error) {
            toast.error(error?.message || "Action failed");
        }
    };

    const handleShare = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard");
    };

    return (
        <div className="xl:hidden w-full bg-white dark:bg-[#1a2233] border-t border-slate-200 dark:border-[#232f48] flex items-center justify-around rounded-lg py-3 px-4 z-50">
            <button className="flex items-center gap-1.5 text-muted font-bold group">
                <HiOutlineHandThumbUp className="text-xl group-active:scale-125 transition-transform" />
                <span className="text-xs">{post?.likes?.length || 0}</span>
            </button>
            <button className="flex items-center gap-1.5 text-muted font-bold group">
                <HiOutlineChatBubbleBottomCenterText className="text-xl group-active:scale-125 transition-transform" />
                <span className="text-xs">{post?.comments?.length || 0}</span>
            </button>
            <button
                onClick={handleToggleBookmark}
                className={`flex items-center gap-1.5 font-bold transition-all active:scale-125 ${isBookmarked ? 'text-primary' : 'text-muted'}`}
            >
                {isBookmarked ? <HiBookmark className="text-xl" /> : <HiOutlineBookmark className="text-xl" />}
            </button>
            <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-muted font-bold active:scale-125 transition-transform"
            >
                <HiOutlineShare className="text-xl" />
            </button>
        </div>
    );
};

export default ArticleMobileActions;
