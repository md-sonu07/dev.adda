import React from 'react';
import { HiOutlineEye, HiOutlineLink } from 'react-icons/hi2';
import { useSelector } from 'react-redux';

const RecentPosts = ({ posts: propsPosts }) => {
    const { posts: reduxPosts, loading } = useSelector(state => state.post);

    // Use prop posts if available, otherwise use redux posts
    const displayPosts = propsPosts || reduxPosts;

    // Get the 5 most recent posts
    const recentPosts = displayPosts ? [...displayPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5) : [];

    if (loading) {
        return (
            <div className="bg-card rounded-xl border border-default p-12 flex flex-col items-center justify-center gap-4 shadow-sm h-full">
                <div className="size-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted">Refreshing Feed...</p>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-xl border border-default overflow-hidden flex flex-col h-full shadow-sm">
            <div className="p-6 border-b border-default flex justify-between items-center bg-box/20">
                <div>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-body">Recent Publications</h2>
                    <p className="text-[9px] font-bold text-muted uppercase mt-0.5 tracking-tight">Latest activity across the platform</p>
                </div>
                <button className="px-3 py-1.5 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                    View Library
                </button>
            </div>
            <div className="overflow-x-auto no-scrollbar flex-1">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-default text-[9px] font-black uppercase tracking-widest text-muted">
                            <th className="px-6 py-4">Title & Context</th>
                            <th className="px-6 py-4">Author</th>
                            <th className="px-6 py-4 text-center">Reach</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-box divide-default/60">
                        {recentPosts.length > 0 ? (
                            recentPosts.map((post) => (
                                <tr key={post._id} className="hover:bg-box/30 transition-all group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="size-11 rounded-md bg-box overflow-hidden border border-default group-hover:border-primary transition-colors shrink-0">
                                                <img
                                                    src={post.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=200&auto=format&fit=crop'}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-body line-clamp-1 group-hover:text-primary transition-colors uppercase tracking-tight">
                                                    {post.title || 'No Title'}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[9px] font-black text-primary uppercase tracking-widest px-1.5 py-0.5 bg-primary/5 rounded">
                                                        {post.category?.categoryName || 'General'}
                                                    </span>
                                                    <span className="text-[9px] font-bold text-muted uppercase">
                                                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2.5">
                                            <img
                                                className="size-6 rounded-lg object-cover border border-default"
                                                src={post.author?.avatar || `https://ui-avatars.com/api/?name=${post.author?.fullName}&background=random`}
                                                alt=""
                                            />
                                            <span className="text-[11px] font-black uppercase text-body tracking-tighter">{post.author?.fullName || 'No Author'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-500">
                                                <HiOutlineEye className="text-sm" />
                                                {post.views || 0}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex flex-col items-center gap-1">
                                            <span className={`px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.15em] rounded-full border flex items-center gap-1.5 transition-all duration-300 ${post.status === 'approved'
                                                ? 'text-emerald-500 bg-emerald-500/5 border-emerald-500/20'
                                                : post.status === 'rejected'
                                                    ? 'text-red-500 bg-red-500/5 border-red-500/20'
                                                    : 'text-amber-500 bg-amber-500/5 border-amber-500/20'
                                                }`}>
                                                <div className={`size-1 rounded-full ${post.status === 'approved' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse' :
                                                    post.status === 'rejected' ? 'bg-red-500' : 'bg-amber-500'
                                                    }`} />
                                                {post.status}
                                            </span>
                                            <span className={`text-[7px] font-black uppercase tracking-[0.2em] px-1.5 py-0.5 rounded opacity-50 ${post.userStatus === 'published' ? 'text-primary' : 'text-muted'}`}>
                                                {post.userStatus}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => window.open(`/article/${post._id}`, '_blank')}
                                            className="p-2 text-muted hover:text-primary hover:bg-primary/10 rounded-xl transition-all hover:scale-110 active:scale-95"
                                        >
                                            <HiOutlineLink className="text-lg" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-20 text-center">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">No publications found</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="p-4 bg-box/10 border-t border-default group cursor-pointer hover:bg-box/20 transition-colors">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-center text-primary group-hover:tracking-[0.4em] transition-all">
                    Access Intelligence Archive →
                </p>
            </div>
        </div>
    );
};

export default RecentPosts;
