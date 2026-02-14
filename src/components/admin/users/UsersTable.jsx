import React, { useEffect } from 'react';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAction } from '../../../redux/thunks/userThunk';

const UsersTable = () => {
    const dispatch = useDispatch();
    const { users, loading } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllUsersAction());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="bg-card rounded-2xl border border-default p-12 flex flex-col items-center justify-center gap-4 shadow-sm">
                <div className="size-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted">Synchronizing User Database...</p>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-xl border border-default overflow-hidden shadow-sm">
            <div className="overflow-x-auto no-scrollbar">
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
                                                <img
                                                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.fullName}&background=random`}
                                                    alt={user.fullName}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-body">{user.fullName}</p>
                                                <p className="text-[10px] font-bold text-muted">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-box border border-default rounded-lg">
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
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-muted hover:text-primary transition-colors">
                                            <HiOutlineEllipsisVertical className="text-xl" />
                                        </button>
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
        </div>
    );
};

export default UsersTable;
