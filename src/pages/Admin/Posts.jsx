import React, { useState } from 'react';
import PostsHeader from '../../components/adminSection/posts/PostsHeader';
import PostFilters from '../../components/adminSection/posts/PostFilters';
import PostsTable from '../../components/adminSection/posts/PostsTable';

const Posts = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All Status');

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <PostsHeader />
            <PostFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
            />
            <PostsTable
                searchTerm={searchTerm}
                selectedStatus={selectedStatus}
            />
        </div>
    );
};

export default Posts;
