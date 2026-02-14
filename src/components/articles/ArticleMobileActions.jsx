import React from 'react';
import { HiOutlineHandThumbUp, HiOutlineChatBubbleBottomCenterText, HiOutlineBookmark, HiOutlineShare } from 'react-icons/hi2';

const ArticleMobileActions = () => {
    return (
        <div className="xl:hidden w-full bg-white dark:bg-[#1a2233] border-t border-slate-200 dark:border-[#232f48] flex items-center justify-around rounded-lg py-3 px-4 z-50">
            <button className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-bold">
                <HiOutlineHandThumbUp className="text-xl" />
                <span className="text-xs">1.2k</span>
            </button>
            <button className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-bold">
                <HiOutlineChatBubbleBottomCenterText className="text-xl" />
                <span className="text-xs">45</span>
            </button>
            <button className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-bold">
                <HiOutlineBookmark className="text-xl" />
            </button>
            <button className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-bold">
                <HiOutlineShare className="text-xl" />
            </button>
        </div>
    );
};

export default ArticleMobileActions;
