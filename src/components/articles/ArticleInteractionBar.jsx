import React from 'react';
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
import { toggleBookmarkAction } from '../../redux/thunks/bookmarkThunk';
import toast from 'react-hot-toast';

const ArticleInteractionBar = ({ post }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { bookmarkedPosts } = useSelector((state) => state.bookmark);

    const isBookmarked = bookmarkedPosts.some(p => p._id === id);

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

    const actions = [
        {
            icon: HiOutlineHandThumbUp,
            label: '1.2k',
            accessibilityLabel: 'Like article',
            color: 'hover:text-blue-500'
        },
        {
            icon: HiOutlineChatBubbleBottomCenterText,
            label: '45',
            accessibilityLabel: 'View comments',
            color: 'hover:text-green-500'
        },
        {
            icon: isBookmarked ? HiBookmark : HiOutlineBookmark,
            accessibilityLabel: 'Bookmark article',
            color: isBookmarked ? 'text-primary' : 'hover:text-yellow-500',
            onClick: handleToggleBookmark
        },
        {
            icon: HiOutlineShare,
            accessibilityLabel: 'Share article',
            color: 'hover:text-indigo-500',
            onClick: () => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard");
            }
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
                        className={`flex size-12 items-center justify-center rounded-2xl bg-box/40 dark:bg-[#1a2333]/40 backdrop-blur-md border border-default hover:border-primary/30 text-muted transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/10 active:scale-90 ${action.color}`}
                        aria-label={action.accessibilityLabel}
                    >
                        <action.icon className={`text-xl group-hover:scale-110 transition-transform ${isBookmarked && action.accessibilityLabel === 'Bookmark article' ? 'text-primary' : ''}`} />
                    </button>
                    {action.label && (
                        <span className="text-[10px] font-black tracking-tighter text-muted/80">{action.label}</span>
                    )}
                </motion.div>
            ))}
        </aside>
    );
};

export default ArticleInteractionBar;
