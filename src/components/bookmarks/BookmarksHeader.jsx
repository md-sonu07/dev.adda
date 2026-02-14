import React from 'react';
import { HiOutlineBookmark, HiOutlineClock, HiOutlineSquares2X2 } from 'react-icons/hi2';

const BookmarksHeader = () => {
    return (
        <div className="rounded-xl border border-default p-8 mb-8 shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-primary">
                        <div className="p-2.5 rounded-xl bg-primary/10">
                            <HiOutlineBookmark className="text-2xl" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight uppercase">Your Library</h1>
                    </div>
                    <p className="text-muted font-medium max-w-lg">
                        Manage your saved stories, reading history, and categorized collections in one place.
                    </p>
                </div>

                <div className="flex items-center gap-4 p-2 rounded-2xl border border-default">
                    <div className="flex flex-col items-center px-4 py-2 text-center border-r border-default">
                        <span className="text-2xl font-black">42</span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-muted">Saved</span>
                    </div>
                    <div className="flex flex-col items-center px-4 py-2 text-center">
                        <span className="text-2xl font-black">12</span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-muted">Collections</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookmarksHeader;
