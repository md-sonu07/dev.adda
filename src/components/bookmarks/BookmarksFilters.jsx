import React, { useState } from 'react';
import {
    HiOutlineClock,
    HiOutlineSquares2X2,
    HiOutlineFire,
    HiOutlineCpuChip,
    HiOutlineShieldCheck,
    HiOutlineGlobeAlt
} from 'react-icons/hi2';

const BookmarksFilters = ({ activeFilter, setActiveFilter }) => {
    const filters = [
        { id: 'all', label: 'All Saved', icon: HiOutlineSquares2X2 },
        { id: 'history', label: 'History', icon: HiOutlineClock },
        { id: 'programming', label: 'Programming', icon: HiOutlineFire },
        { id: 'ai', label: 'AI & ML', icon: HiOutlineCpuChip },
        { id: 'security', label: 'Security', icon: HiOutlineShieldCheck },
        { id: 'web', label: 'Web Dev', icon: HiOutlineGlobeAlt },
    ];

    return (
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 mb-8 -mx-1 px-1">
            {filters.map((filter) => {
                const Icon = filter.icon;
                const isActive = activeFilter === filter.id;

                return (
                    <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`
                            flex items-center gap-2.5 px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 whitespace-nowrap border
                            ${isActive
                                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105'
                                : 'border-default text-muted hover:border-primary/40 hover:text-primary'}
                        `}
                    >
                        <Icon className={`text-base ${isActive ? 'text-white' : 'text-primary'}`} />
                        {filter.label}
                    </button>
                );
            })}
        </div>
    );
};

export default BookmarksFilters;
