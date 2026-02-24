import React, { useEffect, useState, useRef } from 'react';
import { HiOutlineEllipsisVertical, HiOutlineShieldCheck, HiOutlineUserCircle, HiOutlineTrash, HiOutlineUser, HiOutlineEnvelope, HiOutlineCalendarDays, HiOutlineIdentification, HiXMark, HiOutlineMapPin } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAction, updateUserRoleAction, deleteUserAction } from '../../../redux/thunks/userThunk';
import SkeletonImage from '../../common/SkeletonImage';
import { toast } from 'react-hot-toast';
import Modal from '../../common/Modal';

const UsersTable = () => {
    const dispatch = useDispatch();
    const { users, loading } = useSelector(state => state.user);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, userId: null });
    const [viewUser, setViewUser] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => {
        dispatch(getAllUsersAction());
    }, [dispatch]);

    // Handle click outside to close menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await dispatch(updateUserRoleAction({ userId, role: newRole })).unwrap();
            toast.success(`Role updated to ${newRole} successfully`);
            setOpenMenuId(null);
        } catch (error) {
            toast.error(error || "Failed to update role");
        }
    };

    const confirmDelete = async () => {
        try {
            await dispatch(deleteUserAction(deleteModal.userId)).unwrap();
            toast.success("User deleted successfully");
            setDeleteModal({ isOpen: false, userId: null });
            setOpenMenuId(null);
        } catch (error) {
            toast.error(error || "Failed to delete user");
        }
    };

    if (loading && users.length === 0) {
        return (
            <div className="bg-card rounded-2xl border border-default p-12 flex flex-col items-center justify-center gap-4 shadow-sm">
                <div className="size-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted">Synchronizing User Database...</p>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-xl border border-default overflow-hidden shadow-sm">
            <div className="overflow-x-auto no-scrollbar min-h-[400px]">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-box/50 border-b border-default">
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted">User</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted">Role</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted text-center">Joined</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-default">
                        {users && users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user._id} className="hover:bg-box/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-xl bg-box overflow-hidden border border-default">
                                                <SkeletonImage
                                                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.fullName}&background=random`}
                                                    alt={user.fullName}
                                                    className="w-full h-full"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-body">{user.fullName}</p>
                                                <p className="text-[10px] font-bold text-muted">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${user.role === 'admin'
                                            ? 'text-primary bg-primary/10 border-primary/20'
                                            : 'bg-box border-default text-muted'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${!user.isBlocked
                                            ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
                                            : 'text-rose-500 bg-rose-500/10 border-rose-500/20'
                                            }`}>
                                            {user.isBlocked ? 'Blocked' : 'Active'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center text-[10px] font-black uppercase tracking-widest text-muted">
                                        {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-4 text-right relative">
                                        <button
                                            onClick={() => setOpenMenuId(openMenuId === user._id ? null : user._id)}
                                            className="p-2 text-muted hover:text-primary transition-colors cursor-pointer"
                                        >
                                            <HiOutlineEllipsisVertical className="text-xl" />
                                        </button>

                                        {openMenuId === user._id && (
                                            <div
                                                ref={menuRef}
                                                className="absolute right-6 top-14 w-48 bg-white dark:bg-gray-800 border border-default rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                                            >
                                                <div className="p-1.5 space-y-1">
                                                    <p className="px-3 py-2 text-[9px] font-black uppercase tracking-widest text-muted border-b border-default/50 mb-1">Actions</p>

                                                    <button
                                                        onClick={() => {
                                                            setViewUser(user);
                                                            setOpenMenuId(null);
                                                        }}
                                                        className="w-full flex items-center gap-2 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-body hover:bg-primary/10 hover:text-primary rounded-lg transition-all cursor-pointer group/item"
                                                    >
                                                        <HiOutlineUser className="text-base text-muted group-hover/item:text-primary" />
                                                        View Details
                                                    </button>

                                                    {user.role === 'user' ? (
                                                        <button
                                                            onClick={() => handleRoleChange(user._id, 'admin')}
                                                            className="w-full flex items-center gap-2 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-body hover:bg-primary/10 hover:text-primary rounded-lg transition-all cursor-pointer group/item"
                                                        >
                                                            <HiOutlineShieldCheck className="text-base text-muted group-hover/item:text-primary" />
                                                            Make Admin
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleRoleChange(user._id, 'user')}
                                                            className="w-full flex items-center gap-2 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-body hover:bg-rose-500/10 hover:text-rose-500 rounded-lg transition-all cursor-pointer group/item"
                                                        >
                                                            <HiOutlineUserCircle className="text-base text-muted group-hover/item:text-rose-500" />
                                                            Make User
                                                        </button>
                                                    )}

                                                    <button
                                                        onClick={() => setDeleteModal({ isOpen: true, userId: user._id })}
                                                        className="w-full flex items-center gap-2 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer group/item"
                                                    >
                                                        <HiOutlineTrash className="text-base group-hover/item:scale-110 transition-transform" />
                                                        Delete User
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-xs font-bold text-muted uppercase tracking-widest">
                                    No users found in the system
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="p-4 bg-box/30 border-t border-default flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted">Showing {users?.length || 0} users total</p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-card border border-default rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-box transition-all disabled:opacity-50">Prev</button>
                    <button className="px-4 py-2 bg-card border border-default rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-box transition-all">Next</button>
                </div>
            </div>

            {/* View User Details Modal */}
            <AnimatePresence>
                {viewUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-background/60 backdrop-blur-md"
                            onClick={() => setViewUser(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative w-full max-w-md bg-card border border-default rounded-[32px] shadow-2xl overflow-hidden"
                        >
                            {/* Accent Line */}
                            <div className="h-1.5 w-full bg-primary" />

                            <button
                                onClick={() => setViewUser(null)}
                                className="absolute top-4 right-4 size-8 flex items-center justify-center rounded-xl bg-card border border-default text-muted hover:text-body transition-colors z-20 cursor-pointer"
                            >
                                <HiXMark className="text-lg" />
                            </button>

                            <div className="p-6 flex flex-col items-center">
                                <div className="size-20 rounded-3xl overflow-hidden border-4 border-background shadow-lg mb-3 bg-box">
                                    <SkeletonImage
                                        src={viewUser.avatar || `https://ui-avatars.com/api/?name=${viewUser.fullName}&background=random`}
                                        alt={viewUser.fullName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="text-center mb-5">
                                    <h2 className="text-xl font-black text-body uppercase tracking-tight leading-none">{viewUser.fullName}</h2>
                                    <p className="text-[11px] font-bold text-muted mt-1 mb-2.5">@{viewUser.userName || 'user'}</p>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/20">
                                            {viewUser.role}
                                        </span>
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${!viewUser.isBlocked ? 'text-emerald-500 bg-emerald-500/5 border-emerald-500/20' : 'text-rose-500 bg-rose-500/5 border-rose-500/20'}`}>
                                            {viewUser.isBlocked ? 'Blocked' : 'Active'}
                                        </span>
                                    </div>
                                </div>

                                <div className="w-full space-y-2.5">
                                    <div className="flex items-center gap-3 bg-box/40 p-2.5 rounded-xl border border-default">
                                        <div className="size-8 rounded-lg bg-card flex items-center justify-center text-muted border border-default shrink-0">
                                            <HiOutlineEnvelope className="text-base" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-[8px] font-black uppercase tracking-widest text-muted">Email Address</p>
                                            <p className="text-xs font-bold text-body truncate">{viewUser.email}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2.5">
                                        <div className="flex items-center gap-3 bg-box/40 p-2.5 rounded-xl border border-default">
                                            <div className="size-8 rounded-lg bg-card flex items-center justify-center text-muted border border-default shrink-0">
                                                <HiOutlineMapPin className="text-base" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[8px] font-black uppercase tracking-widest text-muted">Location</p>
                                                <p className="text-xs font-bold text-body truncate">{viewUser.location || 'Not set'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 bg-box/40 p-2.5 rounded-xl border border-default">
                                            <div className="size-8 rounded-lg bg-card flex items-center justify-center text-muted border border-default shrink-0">
                                                <HiOutlineCalendarDays className="text-base" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[8px] font-black uppercase tracking-widest text-muted">Joined</p>
                                                <p className="text-xs font-bold text-body truncate">
                                                    {new Date(viewUser.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setViewUser(null)}
                                    className="mt-5 w-full py-3 bg-box border border-default hover:bg-default text-[9px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-[0.98] cursor-pointer"
                                >
                                    Done
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Confirmation Modal */}
            <Modal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, userId: null })}
                onConfirm={confirmDelete}
                title="Delete User?"
                type="danger"
                confirmText="Delete User"
            >
                Are you sure you want to permanently delete this user? All their associated data might be affected. This action is irreversible.
            </Modal>
        </div>
    );
};

export default UsersTable;
