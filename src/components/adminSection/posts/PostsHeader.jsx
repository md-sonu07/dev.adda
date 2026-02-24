import React from 'react';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';

const PostsHeader = () => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
                <h1 className="text-2xl font-black uppercase tracking-tight">Content Management</h1>
                <p className="text-muted text-sm font-bold">Manage all articles, stories and discussions</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20">
                <HiOutlineDocumentPlus className="text-lg" />
                Create New Post
            </button>
        </div>
    );
};

export default PostsHeader;
