import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminCommentsAction, deleteCommentAction } from '../../redux/thunks/commentThunk';
import { HiTrash, HiChatBubbleLeftRight, HiChevronLeft, HiChevronRight, HiEye } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Modal from '../../components/common/Modal';

const AdminComments = () => {
    const dispatch = useDispatch();
    const { adminComments, totalAdminComments, loading } = useSelector((state) => state.comment);
    const [page, setPage] = useState(1);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const limit = 10;

    useEffect(() => {
        dispatch(getAdminCommentsAction({
            limit,
            startIndex: (page - 1) * limit
        }));
    }, [dispatch, page]);

    const handleDelete = (commentId) => {
        setCommentToDelete(commentId);
    };

    const handleConfirmDelete = async () => {
        if (!commentToDelete) return;
        setIsDeleting(true);
        try {
            await dispatch(deleteCommentAction(commentToDelete)).unwrap();
            toast.success("Comment deleted successfully");
            setCommentToDelete(null);
        } catch (error) {
            toast.error(error?.message || "Action failed");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-text-heading flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <HiChatBubbleLeftRight className="text-primary" />
                        </div>
                        Comment Management
                    </h1>
                    <p className="text-muted text-sm mt-1">Monitor and manage all user discussions across articles</p>
                </div>
            </div>



            {/* Table */}
            <div className="bg-card border border-default rounded-2xl overflow-hidden shadow-xl shadow-black/5">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-box/40 border-b border-default">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-muted">Commenter</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-muted w-[50%]">Content</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-muted text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-default/50">
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="3" className="px-6 py-10">
                                            <div className="h-4 bg-box rounded w-full"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : adminComments.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="px-6 py-20 text-center text-muted italic font-medium">
                                        No comments found in the system.
                                    </td>
                                </tr>
                            ) : (
                                adminComments.map((comment) => (
                                    <tr key={comment._id} className="hover:bg-box/20 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full overflow-hidden bg-box shrink-0">
                                                    <img
                                                        src={comment.userId?.avatar || `https://ui-avatars.com/api/?name=${comment.userId?.fullName || comment.userId?.userName || 'U'}&background=random`}
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-text-heading line-clamp-1">{comment.userId?.fullName || comment.userId?.userName || 'Unknown'}</span>
                                                    <span className="text-[10px] text-muted truncate max-w-[120px]">{comment.userId?.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {comment.parentId && (
                                                <div className="flex items-center gap-1.5 mb-2">
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-primary/60">Replying to</span>
                                                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                                                        @{comment.parentId.userId?.fullName || comment.parentId.userId?.userName || 'User'}
                                                    </span>
                                                </div>
                                            )}
                                            <p className="text-sm text-text-muted leading-relaxed line-clamp-2">
                                                {comment.text}
                                            </p>
                                            <span className="text-[10px] text-muted mt-1 block">
                                                {new Date(comment.createdAt).toLocaleDateString()} at {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    to={`/article/${comment.postId?._id}`}
                                                    className="p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-sm group/view"
                                                    title="View Article"
                                                >
                                                    <HiEye className="text-sm group-hover/view:scale-110 transition-transform" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(comment._id)}
                                                    className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm group/del"
                                                    title="Delete Comment"
                                                >
                                                    <HiTrash className="text-sm group-hover/del:scale-110 transition-transform" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalAdminComments > limit && (
                    <div className="px-6 py-4 bg-box/20 border-t border-default flex items-center justify-between">
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest">
                            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalAdminComments)} of {totalAdminComments} comments
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                                className="p-2 rounded-lg border border-default bg-card text-muted hover:text-primary hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <HiChevronLeft />
                            </button>
                            <span className="text-xs font-bold text-text-heading px-2">{page}</span>
                            <button
                                disabled={page * limit >= totalAdminComments}
                                onClick={() => setPage(page + 1)}
                                className="p-2 rounded-lg border border-default bg-card text-muted hover:text-primary hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <HiChevronRight />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!commentToDelete}
                onClose={() => setCommentToDelete(null)}
                onConfirm={handleConfirmDelete}
                title="Delete Comment"
                type="danger"
                confirmText={isDeleting ? "Deleting..." : "Delete Permanently"}
                isSubmitting={isDeleting}
            >
                Are you sure you want to delete this comment? This action will permanently remove the message and all its nested replies. This cannot be undone.
            </Modal>
        </div>
    );
};

export default AdminComments;
