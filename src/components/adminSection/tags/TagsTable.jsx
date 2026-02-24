import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineTrash, HiOutlinePlus, HiOutlineHashtag } from 'react-icons/hi2';
import { createTagAction, deleteTagAction } from '../../../redux/thunks/tagThunk';
import toast from 'react-hot-toast';

const TagsTable = () => {
    const dispatch = useDispatch();
    const { tags, loading } = useSelector((state) => state.tag);
    const [newTag, setNewTag] = useState('');

    const handleAddTag = async (e) => {
        e.preventDefault();
        if (!newTag.trim()) return toast.error("Tag name required");
        try {
            await dispatch(createTagAction({ tagName: newTag })).unwrap();
            toast.success("Tag created!");
            setNewTag('');
        } catch (error) {
            toast.error(error.message || "Action failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this tag?")) return;
        try {
            await dispatch(deleteTagAction(id)).unwrap();
            toast.success("Tag removed");
        } catch (error) {
            toast.error(error.message || "Delete failed");
        }
    };

    return (
        <div className="bg-card rounded-xl border border-default overflow-hidden shadow-sm animate-in fade-in duration-500">
            {/* Compact Header with Integrated Form */}
            <div className="p-4 border-b border-default bg-box/30">
                <form onSubmit={handleAddTag} className="flex gap-2">
                    <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="New tag..."
                        className="flex-1 bg-background border border-default rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-primary/90 transition-all flex items-center gap-2"
                    >
                        {loading ? <div className="size-3 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <HiOutlinePlus />}
                        Add
                    </button>
                </form>
            </div>

            {/* List Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-box/10 border-b border-default">
                            <th className="px-5 py-3 text-[10px] font-bold text-muted uppercase tracking-wider">Tag Name</th>
                            <th className="px-5 py-3 text-[10px] font-bold text-muted uppercase tracking-wider">Slug</th>
                            <th className="px-5 py-3 text-[10px] font-bold text-muted uppercase tracking-wider text-right">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-default">
                        {tags.map((tag) => (
                            <tr key={tag._id} className="hover:bg-box/20 transition-all group">
                                <td className="px-5 py-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-primary/50 font-bold">#</span>
                                        <span className="text-sm font-bold text-body">{tag.tagName}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-3">
                                    <span className="text-xs text-muted">/{tag.slug || 'na'}</span>
                                </td>
                                <td className="px-5 py-3 text-right">
                                    <button
                                        onClick={() => handleDelete(tag._id)}
                                        className="p-1.5 text-muted hover:text-rose-500 hover:bg-rose-500/10 rounded-md transition-all"
                                    >
                                        <HiOutlineTrash className="text-base" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {tags.length === 0 && !loading && (
                            <tr>
                                <td colSpan="3" className="px-5 py-8 text-center text-xs text-muted italic">
                                    Empty index
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TagsTable;
