import React from 'react';
import { HiOutlineHandThumbUp, HiOutlineChatBubbleBottomCenterText, HiOutlineBookmark, HiOutlineShare } from 'react-icons/hi2';

const ArticleInteractionBar = () => {
    return (
        <aside className="hidden xl:flex flex-col items-center gap-6 sticky-interaction-bar mt-20">
            <div className="flex flex-col items-center gap-2 group">
                <button
                    className="flex size-12 items-center justify-center rounded-full bg-slate-100 dark:bg-[#232f48] text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/10 transition-all border border-transparent hover:border-primary/30">
                    <HiOutlineHandThumbUp className="text-xl" />
                </button>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">1.2k</span>
            </div>
            <div className="flex flex-col items-center gap-2 group">
                <button
                    className="flex size-12 items-center justify-center rounded-full bg-slate-100 dark:bg-[#232f48] text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/10 transition-all border border-transparent hover:border-primary/30">
                    <HiOutlineChatBubbleBottomCenterText className="text-xl" />
                </button>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">45</span>
            </div>
            <div className="flex flex-col items-center gap-2 group">
                <button
                    className="flex size-12 items-center justify-center rounded-full bg-slate-100 dark:bg-[#232f48] text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/10 transition-all border border-transparent hover:border-primary/30">
                    <HiOutlineBookmark className="text-xl" />
                </button>
            </div>
            <div className="flex flex-col items-center gap-2 group">
                <button
                    className="flex size-12 items-center justify-center rounded-full bg-slate-100 dark:bg-[#232f48] text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/10 transition-all border border-transparent hover:border-primary/30">
                    <HiOutlineShare className="text-xl" />
                </button>
            </div>
        </aside>
    );
};

export default ArticleInteractionBar;
