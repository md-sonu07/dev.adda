import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCategoriesAction } from '../../redux/thunks/categoryThunk';
import { getAllTagsAction } from '../../redux/thunks/tagThunk';
import CategoriesTable from '../../components/adminSection/categories/CategoriesTable';
import TagsTable from '../../components/adminSection/tags/TagsTable';

const AdminCategories = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategoriesAction());
        dispatch(getAllTagsAction());
    }, [dispatch]);

    return (
        <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Simple Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-body">Content Taxonomy</h1>
                <p className="text-sm text-muted">Manage your article categories and hashtags from a single view</p>
            </div>

            {/* Grid Layout for Categories and Tags */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <div className="size-2 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-body/80">Categories Management</h2>
                    </div>
                    <CategoriesTable />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <div className="size-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-body/80">Hashtags Management</h2>
                    </div>
                    <TagsTable />
                </div>
            </div>
        </div>
    );
};

export default AdminCategories;
