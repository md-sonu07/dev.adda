import React from 'react';
import { HiOutlineMagnifyingGlass, HiOutlineFunnel } from 'react-icons/hi2';

const PostFilters = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
                <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-lg" />
                <input
                    type="text"
                    placeholder="Search posts by title, author or category..."
                    className="w-full pl-12 pr-4 py-3 bg-card border border-default rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
            </div>
            <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-3 bg-card border border-default rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-box transition-all">
                    <HiOutlineFunnel className="text-lg" />
                    Filters
                </button>
                <select className="px-4 py-3 bg-card border border-default rounded-xl text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer">
                    <option>All Status</option>
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Scheduled</option>
                </select>
            </div>
        </div>
    );
};

export default PostFilters;
