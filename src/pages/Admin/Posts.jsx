import React from 'react';
import PostsHeader from '../../components/admin/posts/PostsHeader';
import PostFilters from '../../components/admin/posts/PostFilters';
import PostsTable from '../../components/admin/posts/PostsTable';

const Posts = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <PostsHeader />
            <PostFilters />
            <PostsTable />
        </div>
    );
};

export default Posts;
