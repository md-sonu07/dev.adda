import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineTrash, HiOutlinePlus, HiOutlineTag } from 'react-icons/hi2';
import { createCategoryAction, deleteCategoryAction } from '../../../redux/thunks/categoryThunk';
import toast from 'react-hot-toast';

const CategoriesTable = () => {
    const dispatch = useDispatch();
    const { categories, loading } = useSelector((state) => state.category);
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return toast.error("Category name required");
        try {
            await dispatch(createCategoryAction({ categoryName: newCategory })).unwrap();
            toast.success("Category created!");
            setNewCategory('');
        } catch (error) {
            toast.error(error.message || "Action failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this category?")) return;
        try {
            await dispatch(deleteCategoryAction(id)).unwrap();
            toast.success("Category removed");
        } catch (error) {
            toast.error(error.message || "Delete failed");
        }
    };

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Creation Card */}
            <div className="bg-card rounded-2xl border border-default p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <HiOutlineTag className="text-2xl" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black text-body uppercase tracking-widest">Protocol Index</h2>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">Classification Management System</p>
                    </div>
                </div>

                <form onSubmit={handleAddCategory} className="flex gap-4">
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="NEW_IDENTIFIER..."
                        className="flex-1 bg-box/50 border border-default rounded-xl px-5 py-3 text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/40 focus:bg-card transition-all outline-none placeholder:text-muted/40 uppercase tracking-widest"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? (
                            <div className="size-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                            <HiOutlinePlus className="text-sm" />
                        )}
                        Initialize
                    </button>
                </form>
            </div>

            {/* List Table */}
            <div className="bg-card rounded-2xl border border-default overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-box/20 border-b border-default">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted">Category ID</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted">Manifest Name</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted">Registry Handle</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted text-right">Directives</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-default">
                            {categories.map((cat) => (
                                <tr key={cat._id} className="hover:bg-box/30 transition-all group">
                                    <td className="px-8 py-5">
                                        <code className="text-[10px] font-black text-primary/60 bg-primary/5 px-2 py-1 rounded">
                                            {cat._id.slice(-8).toUpperCase()}
                                        </code>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-sm font-black text-body uppercase tracking-tight">{cat.categoryName}</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-[10px] font-bold text-muted">/{cat.slug || 'unclassified'}</span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button
                                            onClick={() => handleDelete(cat._id)}
                                            className="p-2 text-muted hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                                            title="TERMINATE_ENTRY"
                                        >
                                            <HiOutlineTrash className="text-lg" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && !loading && (
                                <tr>
                                    <td colSpan="4" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="size-12 rounded-2xl bg-box flex items-center justify-center border border-default">
                                                <HiOutlineTag className="text-2xl text-muted" />
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">No protocols registered in the current index</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CategoriesTable;
