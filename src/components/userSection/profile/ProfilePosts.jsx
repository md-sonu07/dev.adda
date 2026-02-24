import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { deletePostAction, updatePostAction } from '../../../redux/thunks/postThunk';
import { toggleBookmarkAction } from '../../../redux/thunks/bookmarkThunk';
import Modal from '../../common/Modal';
import {
    HiOutlineClock,
    HiOutlineCalendarDays,
    HiOutlineHeart,
    HiOutlineChatBubbleOvalLeftEllipsis,
    HiOutlineBookmark,
    HiBookmark,
    HiOutlineCheckCircle,
    HiOutlineExclamationCircle,
    HiChevronDown,
    HiOutlinePencilSquare,
    HiOutlineTrash,
    HiOutlineCloudArrowUp,
    HiOutlineLockClosed,
    HiOutlineGlobeAlt
} from 'react-icons/hi2';
import { useState } from 'react';

import SkeletonImage from '../../common/SkeletonImage';

const ProfilePosts = ({ activeTab }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
    const { posts, myPosts, loading } = useSelector((state) => state.post);
    const { bookmarkedPosts } = useSelector((state) => state.bookmark);

    const isOwnProfile = !id || id === user?._id;
    const displayPosts = isOwnProfile ? myPosts : posts;

    const handleToggleBookmark = async (e, post) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) {
            toast.error("Please login to bookmark");
            return navigate("/login");
        }
        try {
            await dispatch(toggleBookmarkAction({ postId: post._id, post })).unwrap();
        } catch (error) {
            toast.error(error?.message || "Action failed");
        }
    };

    const [deleteModal, setDeleteModal] = useState({ isOpen: false, postId: null });

    const handleDeleteClick = (e, id) => {
        e.stopPropagation();
        setDeleteModal({ isOpen: true, postId: id });
    };

    const confirmDelete = async () => {
        try {
            const result = await dispatch(deletePostAction(deleteModal.postId)).unwrap();
            if (result.success) {
                toast.success('Article deleted successfully');
            }
        } catch (error) {
            toast.error(error?.message || 'Failed to delete article');
        } finally {
            setDeleteModal({ isOpen: false, postId: null });
        }
    };

    const handleEdit = (e, id) => {
        e.stopPropagation();
        navigate(`/edit-post/${id}`);
    };

    const handlePushPost = async (e, id) => {
        e.stopPropagation();
        try {
            await dispatch(updatePostAction({
                id,
                postData: { userStatus: 'published', status: 'pending' }
            })).unwrap();
            toast.success('Post submitted for admin review!');
        } catch (error) {
            toast.error(error?.message || 'Failed to submit post');
        }
    };

    const handleToggleVisibility = async (e, post) => {
        e.stopPropagation();
        const newPrivacy = !post.isPrivate;
        try {
            await dispatch(updatePostAction({
                id: post._id,
                postData: { isPrivate: newPrivacy }
            })).unwrap();
            toast.success(`Visibility updated: ${newPrivacy ? 'Followers Only' : 'Public'}`);
        } catch (error) {
            toast.error(error?.message || 'Failed to update visibility');
        }
    };

    const handleCardClick = (id) => {
        navigate(`/article/${id}`);
    };

    // For other tabs (saved, history, liked), we might still need mock data if not implemented in backend
    const mockPosts = [
        {
            _id: 'm1',
            tab: 'saved',
            category: { categoryName: 'AI & ML' },
            title: 'Transformer Architecture Explained Simply',
            readTime: '20 min read',
            createdAt: new Date().toISOString(),
            likes: [],
            comments: [],
            status: 'approved',
            coverImage: ''
        },
        // Add more mocks if needed
    ];

    // Filter posts based on the active tab
    const filteredPosts = activeTab === 'posted'
        ? displayPosts
        : mockPosts.filter(post => post.tab === activeTab);

    const tabLabels = {
        posted: isOwnProfile ? 'Your Articles' : 'Articles',
        saved: 'Saved Articles',
        history: 'Recently Read',
        liked: 'Liked Posts'
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        return date.toLocaleDateString();
    };

    if (loading && filteredPosts.length === 0) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-xl border border-default p-4 flex gap-4 animate-pulse">
                        <div className="size-24 rounded-lg bg-box/60 shrink-0" />
                        <div className="flex flex-col justify-between flex-1">
                            <div className="space-y-2">
                                <div className="h-3 w-16 bg-box/40 rounded" />
                                <div className="space-y-1">
                                    <div className="h-4 w-full bg-box/60 rounded" />
                                    <div className="h-4 w-2/3 bg-box/60 rounded" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <div className="h-2 w-20 bg-box/30 rounded" />
                                <div className="flex gap-2">
                                    <div className="size-6 bg-box/40 rounded-lg" />
                                    <div className="size-6 bg-box/40 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-20">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-muted">
                    {tabLabels[activeTab]}
                </h2>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted">
                    {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                    <div
                        key={post._id}
                        onClick={() => handleCardClick(post._id)}
                        className="group rounded-xl border border-default p-4 flex gap-4 hover:border-primary/40 transition-all duration-300 cursor-pointer"
                    >
                        <div className="size-24 rounded-lg overflow-hidden shrink-0 relative">
                            <SkeletonImage
                                src={post.coverImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.title)}&background=random&size=512&color=fff&bold=true`}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Status overlay on image */}
                            {activeTab === 'posted' && (
                                <div className={`absolute bottom-0 inset-x-0 flex items-center justify-center gap-1 py-1 text-[8px] font-black uppercase tracking-widest
                                    ${post.userStatus === 'draft'
                                        ? 'bg-slate-500/90 text-white'
                                        : post.isPrivate
                                            ? 'bg-indigo-500/90 text-white' // Indigo for followers only
                                            : post.status === 'approved'
                                                ? 'bg-green-500/90 text-white'
                                                : post.status === 'rejected'
                                                    ? 'bg-red-500/90 text-white'
                                                    : 'bg-amber-500/90 text-white'
                                    }`}>
                                    {post.userStatus === 'draft' ? (
                                        <><HiOutlineClock className="text-xs" /> Draft</>
                                    ) : post.isPrivate ? (
                                        <><HiOutlineLockClosed className="text-xs" /> Followers</>
                                    ) : post.status === 'approved' ? (
                                        <><HiOutlineCheckCircle className="text-xs" /> Live</>
                                    ) : post.status === 'rejected' ? (
                                        <><HiOutlineExclamationCircle className="text-xs" /> Rejected</>
                                    ) : (
                                        <><HiOutlineExclamationCircle className="text-xs" /> Pending</>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col justify-between flex-1 min-w-0">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded-md">
                                        {post.category?.categoryName || post.category || 'General'}
                                    </span>
                                    <span className="text-[9px] font-bold text-muted flex items-center gap-1">
                                        <HiOutlineClock className="text-xs" />
                                        {post.readTime || `${Math.ceil(post.content?.split(' ').length / 200) || 5} min read`}
                                    </span>
                                </div>
                                <h3 className="text-sm font-black line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-2">
                                <span className="text-[9px] font-bold text-muted flex items-center gap-1">
                                    <HiOutlineCalendarDays className="text-xs" />
                                    {formatTime(post.createdAt)}
                                </span>
                                <div className="flex items-center gap-2">
                                    {/* Stats (Visible to everyone) */}
                                    <div className="flex items-center gap-2 pr-2 border-r border-default mr-1">
                                        <div className="flex items-center gap-1 text-muted" title="Likes">
                                            <HiOutlineHeart className="text-[14px]" />
                                            <span className="text-[10px] font-black">{post.likesCount || post.likes?.length || 0}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-muted" title="Comments">
                                            <HiOutlineChatBubbleOvalLeftEllipsis className="text-[14px]" />
                                            <span className="text-[10px] font-black">{post.commentCount || post.comments?.length || 0}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    {(activeTab === 'posted' && isOwnProfile) ? (
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={(e) => handleEdit(e, post._id)}
                                                className="p-1 text-muted hover:text-primary transition-colors rounded-lg bg-box/50 border border-default hover:border-primary/50"
                                                title="Edit Article"
                                            >
                                                <HiOutlinePencilSquare className="text-sm" />
                                            </button>

                                            {post.userStatus === 'draft' && (
                                                <button
                                                    onClick={(e) => handlePushPost(e, post._id)}
                                                    className="p-1 text-primary hover:bg-primary hover:text-white transition-all rounded-lg bg-primary/10 border border-primary/20 hover:border-primary"
                                                    title="Push to Review"
                                                >
                                                    <HiOutlineCloudArrowUp className="text-sm" />
                                                </button>
                                            )}

                                            <button
                                                onClick={(e) => handleToggleVisibility(e, post)}
                                                className={`p-1 transition-colors rounded-lg bg-box/50 border border-default ${post.isPrivate ? 'text-indigo-500 hover:text-primary hover:border-primary/50' : 'text-muted hover:text-indigo-500 hover:border-indigo-500/50'}`}
                                                title={post.isPrivate ? "Make Public" : "Make Followers Only"}
                                            >
                                                {!post.isPrivate ? <HiOutlineGlobeAlt className="text-sm" /> : <HiOutlineLockClosed className="text-sm" />}
                                            </button>

                                            <button
                                                onClick={(e) => handleDeleteClick(e, post._id)}
                                                className="p-1 text-muted hover:text-red-500 transition-colors rounded-lg bg-box/50 border border-default hover:border-red-500/50"
                                                title="Delete Article"
                                            >
                                                <HiOutlineTrash className="text-sm" />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={(e) => handleToggleBookmark(e, post)}
                                            className={`p-1 transition-colors rounded-lg ${bookmarkedPosts.some(p => p._id === post._id) ? 'text-primary' : 'text-muted hover:text-primary'}`}
                                            title="Bookmark"
                                        >
                                            {bookmarkedPosts.some(p => p._id === post._id) ? <HiBookmark className="text-sm" /> : <HiOutlineBookmark className="text-sm" />}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredPosts.length === 0 && (
                    <div className="col-span-full py-20 text-center space-y-4 rounded-2xl border-2 border-dashed border-default">
                        <div className="p-4 rounded-full w-fit mx-auto shadow-sm border border-default">
                            <HiOutlineBookmark className="text-3xl text-muted" />
                        </div>
                        <div className="space-y-1">
                            <p className="font-black uppercase tracking-widest text-xs">Nothing Here Yet</p>
                            <p className="text-xs text-muted font-medium">No articles found in this section.</p>
                        </div>
                    </div>
                )}
            </div>

            {filteredPosts.length > 0 && (
                <button className="group w-full py-5 border-2 border-dashed border-default rounded-2xl text-muted font-black uppercase tracking-[0.3em] text-[10px] hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-3 active:scale-[0.99]">
                    <HiChevronDown className="text-lg animate-bounce" />
                    Load More
                </button>
            )}

            {/* Custom Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, postId: null })}
                onConfirm={confirmDelete}
                title="Delete Publication?"
                type="danger"
                confirmText="Terminate Article"
            >
                Are you sure you want to permanently delete this article? This action is irreversible and all associated data will be lost from our servers.
            </Modal>
        </div>
    );
};

export default ProfilePosts;
