import React, { useState } from 'react';
import { HiOutlineMagnifyingGlass, HiOutlineFunnel, HiChevronDown } from 'react-icons/hi2';

const PostFilters = ({ searchTerm, setSearchTerm, selectedStatus, setSelectedStatus }) => {
    const [isOpen, setIsOpen] = useState(false);

    const statuses = ['All Status', 'Approved', 'Rejected', 'Pending', 'Draft', 'Scheduled'];

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
                <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-lg" />
                <input
                    type="text"
                    placeholder="Search posts by title, author or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-card border border-default rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
            </div>
            <div className="flex gap-2">


                {/* Custom Status Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center justify-between gap-3 min-w-[140px] px-4 py-3 bg-card border border-default rounded-xl text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer hover:bg-box transition-all"
                    >
                        {selectedStatus}
                        <HiChevronDown className={`text-lg transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                            <div className="absolute right-0 top-full mt-2 w-full min-w-[160px] dark:bg-gray-900 bg-card/95 backdrop-blur-md border border-default rounded-xl shadow-2xl overflow-hidden z-50 p-1.5 transform transition-all">
                                {statuses.map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => {
                                            setSelectedStatus(status);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full text-nowrap text-left px-3 py-2.5 mb-1 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedStatus === status
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                            : 'hover:bg-box text-muted hover:text-body'
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostFilters;
