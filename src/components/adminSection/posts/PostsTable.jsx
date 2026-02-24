import React, { useEffect, useState, useRef } from 'react';
import { HiOutlineEllipsisVertical, HiOutlineEye, HiOutlineChatBubbleLeftRight, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineClock, HiOutlineTrash, HiOutlineUserMinus } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostsAction, updatePostStatusAction, deletePostAction } from '../../../redux/thunks/postThunk';
import { deleteUserAction } from '../../../redux/thunks/userThunk';
import Modal from '../../common/Modal';
import toast from 'react-hot-toast';
import SkeletonImage from '../../common/SkeletonImage';

const PostsTable = () => {
    const dispatch = useDispatch();
    const { posts, loading } = useSelector(state => state.post);
    const [activeMenu, setActiveMenu] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, postId: null });
    const [deleteUserModal, setDeleteUserModal] = useState({ isOpen: false, userId: null });
    const menuRef = useRef(null);

    useEffect(() => {
        dispatch(getAllPostsAction({ status: 'all' }));
    }, [dispatch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleUpdateStatus = (id, status) => {
        dispatch(updatePostStatusAction({ id, status }));
        setActiveMenu(null);
    };

    const confirmDelete = async () => {
        try {
            const result = await dispatch(deletePostAction(deleteModal.postId)).unwrap();
            if (result.success) {
                toast.success('Post deleted successfully');
            }
        } catch (error) {
            toast.error(error?.message || 'Failed to delete post');
        } finally {
            setDeleteModal({ isOpen: false, postId: null });
            setActiveMenu(null);
        }
    };

    const confirmDeleteUser = async () => {
        try {
            await dispatch(deleteUserAction(deleteUserModal.userId)).unwrap();
            toast.success('Author deleted successfully');
            // Refresh posts as some might have been removed if cascaded (though backend doesn't show cascade yet)
            dispatch(getAllPostsAction({ status: 'all' }));
        } catch (error) {
            toast.error(error?.message || 'Failed to delete author');
        } finally {
            setDeleteUserModal({ isOpen: false, userId: null });
            setActiveMenu(null);
        }
    };

    const handleDeleteClick = (e, id) => {
        e.stopPropagation();
        setDeleteModal({ isOpen: true, postId: id });
    };

    if (loading && posts.length === 0) {
        return (
            <div className="bg-card rounded-xl border border-default p-12 flex flex-col items-center justify-center gap-4 shadow-sm">
                <div className="size-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted">Indexing Content Library...</p>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-xl border border-default overflow-hidden shadow-sm">
            <div className="overflow-x-auto h-82 no-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className=" border-b border-default">
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted">Article</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted">Author</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted text-center">Stats</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted text-center">Date</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-box">
                        {posts && posts.length > 0 ? (
                            posts.map((post) => (
                                <tr key={post._id} className="hover:bg-box/30 transition-colors group">
                                    <td className="px-6 py-4 min-w-[300px]">
                                        <div className="flex items-center gap-3">
                                            <div className="size-12 rounded-xl bg-box overflow-hidden border border-default shrink-0">
                                                <SkeletonImage
                                                    src={post.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=200&auto=format&fit=crop'}
                                                    alt={post.title}
                                                    className="w-full h-full"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-body line-clamp-1">{post.title}</p>
                                                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">
                                                    {post.category?.categoryName || 'Uncategorized'}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <SkeletonImage
                                                className="w-6 h-6 rounded-lg border border-default"
                                                src={post.author?.avatar || `https://ui-avatars.com/api/?name=${post.author?.fullName}&background=random`}
                                                alt="Author Profile"
                                            />
                                            <p className="text-xs font-black text-body">{post.author?.fullName || 'Unknown'}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {/* Minimalist Indicator Dot */}
                                            <div className={`size-2 rounded-full shrink-0 ${post.status === 'approved' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]' :
                                                post.status === 'rejected' ? 'bg-rose-500' : 'bg-amber-500 animate-pulse'
                                                }`} />

                                            <div className="flex flex-col gap-0.5">
                                                <span className={`text-[11px] font-black uppercase tracking-widest leading-none ${post.status === 'approved' ? 'text-emerald-600 dark:text-emerald-400' :
                                                    post.status === 'rejected' ? 'text-rose-600 dark:text-rose-400' :
                                                        'text-amber-600 dark:text-amber-400'
                                                    }`}>
                                                    {post.status}
                                                </span>
                                                <span className="text-[10px] font-bold text-muted/50 uppercase tracking-tight leading-none">
                                                    {post.userStatus}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="flex items-center gap-1.5 text-[10px] font-black text-muted">
                                                <HiOutlineEye className="text-xs" />
                                                {post.views || 0}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] font-black text-muted">
                                                <HiOutlineChatBubbleLeftRight className="text-xs" />
                                                {post.likes?.length || 0}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center text-[10px] font-black uppercase tracking-widest text-muted whitespace-nowrap">
                                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="relative inline-block text-left">
                                            <button
                                                onClick={() => setActiveMenu(activeMenu === post._id ? null : post._id)}
                                                className="p-2 text-muted hover:text-primary hover:bg-box rounded-xl transition-all cursor-pointer"
                                            >
                                                <HiOutlineEllipsisVertical className="text-xl" />
                                            </button>

                                            {activeMenu === post._id && (
                                                <div
                                                    ref={menuRef}
                                                    className="absolute right-0 mt-2 w-48 bg-white/80 dark:bg-gray-800 [&_button]:cursor-pointer border border-default rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                                                >
                                                    <div className="p-2 space-y-1">
                                                        <button
                                                            onClick={() => {
                                                                window.open(`/article/${post._id}`, '_blank');
                                                                setActiveMenu(null);
                                                            }}
                                                            className="w-full flex items-center gap-3 px-3 py-2 text-xs font-black uppercase tracking-widest text-muted hover:text-primary hover:bg-primary/5 rounded-xl transition-all group/item"
                                                        >
                                                            <HiOutlineEye className="text-lg group-hover/item:scale-110 transition-transform" />
                                                            View Post
                                                        </button>

                                                        <button
                                                            onClick={(e) => {
                                                                handleDeleteClick(e, post._id);
                                                            }}
                                                            className="w-full flex items-center gap-3 px-3 py-2 text-xs font-black uppercase tracking-widest text-muted hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all group/item"
                                                        >
                                                            <HiOutlineTrash className="text-lg group-hover/item:scale-110 transition-transform" />
                                                            Delete Post
                                                        </button>

                                                        <button
                                                            onClick={() => {
                                                                setDeleteUserModal({ isOpen: true, userId: post.author?._id });
                                                            }}
                                                            className="w-full flex items-center gap-3 px-3 py-2 text-xs font-black uppercase tracking-widest text-muted hover:text-rose-600 hover:bg-rose-600/5 rounded-xl transition-all group/item"
                                                            disabled={!post.author?._id}
                                                        >
                                                            <HiOutlineUserMinus className="text-lg group-hover/item:scale-110 transition-transform" />
                                                            Delete Author
                                                        </button>

                                                        <div className="h-px bg-default mx-2 my-1" />

                                                        <p className="px-3 py-1 text-[9px] font-black text-muted/60 uppercase tracking-[0.2em]">Change Status</p>

                                                        <button
                                                            onClick={() => {
                                                                handleUpdateStatus(post._id, 'approved')
                                                                toast.success('Post approved successfully');
                                                            }}
                                                            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all group/item ${post.status === 'approved' ? 'text-emerald-500 bg-emerald-500/5' : 'text-muted hover:text-emerald-500 hover:bg-emerald-500/5'}`}
                                                        >
                                                            <HiOutlineCheckCircle className="text-lg group-hover/item:scale-110 transition-transform" />
                                                            Approve
                                                        </button>

                                                        <button
                                                            onClick={() => {
                                                                handleUpdateStatus(post._id, 'rejected')
                                                                toast.success('Post rejected successfully');
                                                            }}
                                                            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all group/item ${post.status === 'rejected' ? 'text-red-500 bg-red-500/5' : 'text-muted hover:text-red-500 hover:bg-red-500/5'}`}
                                                        >
                                                            <HiOutlineXCircle className="text-lg group-hover/item:scale-110 transition-transform" />
                                                            Reject
                                                        </button>

                                                        <button
                                                            onClick={() => {
                                                                handleUpdateStatus(post._id, 'pending')
                                                                toast.success('Post pending successfully');
                                                            }}
                                                            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all group/item ${post.status === 'pending' ? 'text-amber-500 bg-amber-500/5' : 'text-muted hover:text-amber-500 hover:bg-amber-500/5'}`}
                                                        >
                                                            <HiOutlineClock className="text-lg group-hover/item:scale-110 transition-transform" />
                                                            Pending
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-xs font-bold text-muted uppercase tracking-widest">
                                    No posts found in the system
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="p-4 bg-box/30 border-t border-default flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted">Showing {posts?.length || 0} articles total</p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-card border border-default rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-box transition-all">Prev</button>
                    <button className="px-4 py-2 bg-card border border-default rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-box transition-all">Next</button>
                </div>
            </div>
            {/* Post Confirmation Modal */}
            <Modal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, postId: null })}
                onConfirm={confirmDelete}
                title="Delete Post?"
                type="danger"
                confirmText="Delete Post"
            >
                Are you sure you want to permanently delete this post? This action is irreversible.
            </Modal>

            {/* User Confirmation Modal */}
            <Modal
                isOpen={deleteUserModal.isOpen}
                onClose={() => setDeleteUserModal({ isOpen: false, userId: null })}
                onConfirm={confirmDeleteUser}
                title="Delete Author?"
                type="danger"
                confirmText="Delete Author"
            >
                Are you sure you want to permanently delete this author? This will remove their entire account and associated profile. This action cannot be undone.
            </Modal>
        </div>
    );
};

export default PostsTable;
