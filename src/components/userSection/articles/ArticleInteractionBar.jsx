import React, { useEffect } from 'react';
import {
    HiOutlineHandThumbUp,
    HiHandThumbUp,
    HiOutlineChatBubbleBottomCenterText,
    HiOutlineBookmark,
    HiBookmark,
    HiOutlineShare
} from 'react-icons/hi2';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmarkAction } from '../../../redux/thunks/bookmarkThunk';
import { toggleLikeAction, getPostLikesAction } from '../../../redux/thunks/likeThunk';

import toast from 'react-hot-toast';

import { sharePost } from '../../../utils/shareUtils';

const ArticleInteractionBar = ({ post }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { bookmarkedPosts } = useSelector((state) => state.bookmark);
    const { postLikes } = useSelector((state) => state.like);

    const isBookmarked = bookmarkedPosts.some(p => p._id === id);
    const likeInfo = postLikes[id] || { count: 0, isLiked: false };

    useEffect(() => {
        if (id) {
            dispatch(getPostLikesAction(id));
        }
    }, [id, dispatch]);

    const handleToggleBookmark = async () => {
        if (!user) {
            toast.error("Please login to bookmark");
            return navigate("/login");
        }
        try {
            const result = await dispatch(toggleBookmarkAction({ postId: id, post: post })).unwrap();
            toast.success(result.isBookmarked ? "Post saved to bookmarks" : "Post removed from bookmarks");
        } catch (error) {
            toast.error(error?.message || "Action failed");
        }
    };

    const handleToggleLike = async () => {
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


    const actions = [
        {
            icon: likeInfo.isLiked ? HiHandThumbUp : HiOutlineHandThumbUp,
            label: likeInfo.count > 0 ? (likeInfo.count >= 1000 ? (likeInfo.count / 1000).toFixed(1) + 'k' : likeInfo.count) : '0',
            accessibilityLabel: 'Like article',
            color: likeInfo.isLiked
                ? 'text-blue-500 bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/20 shadow-blue-500/5'
                : 'hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-500/30',
            onClick: handleToggleLike
        },
        {
            icon: HiOutlineChatBubbleBottomCenterText,
            label: post?.commentCount || '0',
            accessibilityLabel: 'View comments',
            color: 'hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:border-emerald-500/30',
            onClick: () => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            icon: isBookmarked ? HiBookmark : HiOutlineBookmark,
            accessibilityLabel: 'Bookmark article',
            color: isBookmarked
                ? 'text-amber-500 bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/20 shadow-amber-500/5'
                : 'hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:border-amber-500/30',
            onClick: handleToggleBookmark
        },
        {
            icon: HiOutlineShare,
            accessibilityLabel: 'Share article',
            color: 'hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:border-indigo-500/30',
            onClick: () => sharePost({
                title: post?.title,
                text: post?.summary,
                url: window.location.href
            })
        },
    ];



    return (
        <aside className="hidden xl:flex flex-col items-center gap-8 sticky top-32 mt-24">
            {actions.map((action, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx, duration: 0.5 }}
                    className="flex flex-col items-center gap-2 group will-change-transform"
                >
                    <button
                        onClick={action.onClick}
                        className={`flex size-12 items-center justify-center rounded-2xl bg-box/40 dark:bg-[#1a2333]/40 backdrop-blur-md border border-default transition-all duration-300 shadow-sm hover:shadow-lg active:scale-90 ${action.color}`}
                        aria-label={action.accessibilityLabel}
                    >
                        <action.icon className={`text-xl group-hover:scale-110 transition-transform ${isBookmarked && action.accessibilityLabel === 'Bookmark article' ? 'animate-pop' : ''} ${likeInfo.isLiked && action.accessibilityLabel === 'Like article' ? 'animate-pop' : ''}`} />
                    </button>
                    {action.label !== undefined && (
                        <span className="text-[10px] font-black tracking-tighter text-muted/80">{action.label}</span>
                    )}
                </motion.div>
            ))}
        </aside>
    );
};

export default ArticleInteractionBar;
