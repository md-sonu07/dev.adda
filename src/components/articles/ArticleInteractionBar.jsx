import React from 'react';
import { HiOutlineHandThumbUp, HiOutlineChatBubbleBottomCenterText, HiOutlineBookmark, HiOutlineShare } from 'react-icons/hi2';
import { motion } from 'framer-motion';

const ArticleInteractionBar = () => {
    const actions = [
        { icon: HiOutlineHandThumbUp, label: '1.2k', accessibilityLabel: 'Like article', color: 'hover:text-blue-500' },
        { icon: HiOutlineChatBubbleBottomCenterText, label: '45', accessibilityLabel: 'View comments', color: 'hover:text-green-500' },
        { icon: HiOutlineBookmark, accessibilityLabel: 'Bookmark article', color: 'hover:text-yellow-500' },
        { icon: HiOutlineShare, accessibilityLabel: 'Share article', color: 'hover:text-indigo-500' },
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
                        className={`flex size-12 items-center justify-center rounded-2xl bg-box/40 dark:bg-[#1a2333]/40 backdrop-blur-md border border-default hover:border-primary/30 text-muted transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/10 active:scale-90 ${action.color}`}
                        aria-label={action.accessibilityLabel}
                    >
                        <action.icon className="text-xl group-hover:scale-110 transition-transform" />
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
