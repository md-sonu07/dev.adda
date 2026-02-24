import React, { useEffect } from 'react';
import {
    HiOutlineHandThumbUp,
    HiHandThumbUp,
    HiOutlineChatBubbleBottomCenterText,
    HiOutlineBookmark,
    HiBookmark,
    HiOutlineShare
} from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toggleBookmarkAction } from '../../../redux/thunks/bookmarkThunk';
import { toggleLikeAction, getPostLikesAction } from '../../../redux/thunks/likeThunk';
import toast from 'react-hot-toast';

import { sharePost } from '../../../utils/shareUtils';

const ArticleMobileActions = ({ post: initialPost }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { bookmarkedPosts } = useSelector((state) => state.bookmark);
    const { postLikes } = useSelector((state) => state.like);

    const isBookmarked = bookmarkedPosts.some(p => p._id === id);
    const likeInfo = postLikes[id] || { count: initialPost?.likesCount || 0, isLiked: false };

    useEffect(() => {
        if (id) {
            dispatch(getPostLikesAction(id));
        }
    }, [id, dispatch]);

    const handleToggleBookmark = async (e) => {
        e.stopPropagation();
        if (!user) {
            toast.error("Please login to bookmark");
            return navigate("/login");
        }
        try {
            const result = await dispatch(toggleBookmarkAction({ postId: id, post: initialPost })).unwrap();
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
            const result = await dispatch(toggleLikeAction(id)).unwrap();
            toast.success(result.isLiked ? "Post liked" : "Post unliked");
        } catch (error) {
            toast.error(error?.message || "Action failed");
        }
    };

    const handleShare = (e) => {
        e.stopPropagation();
        sharePost({
            title: initialPost?.title,
            text: initialPost?.summary,
            url: window.location.href
        });
    };

    return (
        <div className="xl:hidden w-full bg-white/80 dark:bg-[#1a2233]/80 backdrop-blur-xl border-t border-slate-200 dark:border-[#232f48] flex items-center justify-around rounded-b-lg py-3 px-4 z-50">
            <button
                onClick={handleToggleLike}
                className={`flex items-center gap-2 font-bold group transition-all active:scale-125 ${likeInfo.isLiked
                    ? 'text-blue-500'
                    : 'text-muted hover:text-blue-500'}`}
            >
                {likeInfo.isLiked ? <HiHandThumbUp className="text-xl animate-pop" /> : <HiOutlineHandThumbUp className="text-xl" />}
                <span className="text-[10px] font-black">{likeInfo.count}</span>
            </button>
            <button
                onClick={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 text-muted font-bold group hover:text-emerald-500 active:scale-125 transition-all"
            >
                <HiOutlineChatBubbleBottomCenterText className="text-xl" />
                <span className="text-[10px] font-black">{initialPost?.commentCount || 0}</span>
            </button>
            <button
                onClick={handleToggleBookmark}
                className={`flex items-center justify-center size-10 rounded-xl transition-all active:scale-125 ${isBookmarked
                    ? 'text-amber-500 bg-amber-500/10'
                    : 'text-muted hover:text-amber-500 hover:bg-amber-500/10'}`}
            >
                {isBookmarked ? <HiBookmark className="text-xl animate-pop" /> : <HiOutlineBookmark className="text-xl" />}
            </button>
            <button
                onClick={handleShare}
                className="flex items-center justify-center size-10 rounded-xl text-muted font-bold active:scale-125 hover:text-indigo-500 hover:bg-indigo-500/10 transition-all"
            >
                <HiOutlineShare className="text-xl" />
            </button>
        </div>
    );
};

export default ArticleMobileActions;
