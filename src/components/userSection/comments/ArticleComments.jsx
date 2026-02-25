import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineHandThumbUp, HiHandThumbUp, HiOutlineChatBubbleBottomCenterText, HiChevronDown, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import { getCommentsAction, createCommentAction, likeCommentAction, updateCommentAction, deleteCommentAction } from '../../../redux/thunks/commentThunk';
import { resetComments } from '../../../redux/slices/commentSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Modal from '../../common/Modal';

const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

const CommentItem = ({
    comment,
    isReply = false,
    user,
    isAdmin,
    replyTo,
    setReplyTo,
    replyText,
    setReplyText,
    handlePostComment,
    handleLikeComment,
    handleUpdateComment,
    handleDeleteComment,
    editingCommentId,
    setEditingCommentId,
    editText,
    setEditText,
    allComments,
    postAuthorId,
    isSubmitting
}) => {
    const commentReplies = allComments.filter(c => c.parentId === comment._id);
    const isAuthor = comment.userId?._id === postAuthorId;
    const isOwner = comment.userId?._id === user?._id;
    const isPostAuthor = user?._id === postAuthorId;
    const canEdit = isOwner || isAdmin;
    const canDelete = isOwner || isAdmin || isPostAuthor;
    const parentComment = allComments.find(c => c._id === comment.parentId);

    return (
        <div className={`space-y-4 ${isReply ? 'ml-6 border-l-2 border-default/20 pl-4 mt-4' : 'mt-8'}`}>
            <div key={comment._id} className="flex gap-4 group/comment">
                <div className="size-10 rounded-full overflow-hidden shrink-0 mt-1 ring-2 ring-default/20">
                    <img
                        src={comment.userId?.avatar}
                        alt={comment.userId?.userName}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-text-heading text-[14px] flex items-center gap-2">
                            {comment.userId?.fullName || comment.userId?.userName || "Deleted User"}
                            {isAuthor && (
                                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-primary/20">
                                    Author
                                </span>
                            )}
                            {parentComment && isReply && (
                                <span className="text-xs text-muted font-normal flex items-center gap-1 ml-1">
                                    <span className="opacity-50 text-[10px]">to</span>
                                    <span className="text-primary/80 font-medium">{parentComment.userId?.fullName || parentComment.userId?.userName}</span>
                                </span>
                            )}
                        </h4>
                        <span className="text-xs text-muted">{formatTime(comment.createdAt)}</span>
                    </div>

                    {editingCommentId === comment._id ? (
                        <div className="mt-2 bg-box/20 rounded-xl p-3 border border-primary/30">
                            <textarea
                                autoFocus
                                onFocus={(e) => {
                                    const val = e.target.value;
                                    e.target.value = '';
                                    e.target.value = val.trim();
                                }}
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleUpdateComment(comment._id);
                                    }
                                }}
                                className="w-full bg-transparent border-none focus:ring-0 outline-none text-text-heading placeholder:text-muted/60 resize-none min-h-[60px] text-sm"
                            ></textarea>
                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    onClick={() => setEditingCommentId(null)}
                                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted hover:bg-box/50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleUpdateComment(comment._id)}
                                    disabled={isSubmitting || !editText.trim()}
                                    className="bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
                                >
                                    {isSubmitting ? "Saving..." : "Save changes"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-text-muted text-base leading-relaxed mb-4 whitespace-pre-wrap">
                            {comment.text}
                        </p>
                    )}

                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => handleLikeComment(comment._id)}
                            className={`flex items-center gap-1.5 text-sm font-medium transition-colors group ${comment.likes?.includes(user?._id) ? 'text-primary' : 'text-muted hover:text-primary'}`}
                        >
                            {comment.likes?.includes(user?._id) ? <HiHandThumbUp className="text-[1.1rem]" /> : <HiOutlineHandThumbUp className="text-[1.1rem] group-active:scale-90 transition-transform" />}
                            <span>{comment.numberOfLikes || 0}</span>
                        </button>

                        <button
                            onClick={() => {
                                setReplyTo(replyTo === comment._id ? null : comment._id);
                                setReplyText("");
                                setEditingCommentId(null);
                            }}
                            className={`flex items-center gap-1.5 text-sm font-medium transition-colors group ${replyTo === comment._id ? 'text-primary' : 'text-muted hover:text-primary'}`}
                        >
                            <HiOutlineChatBubbleBottomCenterText className="text-[1.1rem] group-active:scale-90 transition-transform" />
                            <span>{replyTo === comment._id ? "Cancel" : "Reply"}</span>
                        </button>

                        {canEdit && (
                            <button
                                onClick={() => {
                                    setEditingCommentId(comment._id);
                                    setEditText(comment.text);
                                    setReplyTo(null);
                                }}
                                className="flex items-center text-sm font-medium text-muted hover:text-primary transition-colors group"
                            >
                                <HiOutlinePencilSquare className="text-[1rem] group-active:scale-90 transition-transform" />
                            </button>
                        )}

                        {canDelete && (
                            <button
                                onClick={() => handleDeleteComment(comment._id)}
                                className="flex items-center text-sm font-medium text-muted hover:text-red-500 transition-colors group"
                            >
                                <HiOutlineTrash className="text-[1rem] group-active:scale-90 transition-transform" />
                            </button>
                        )}
                    </div>

                    {/* Reply Input Area */}
                    {replyTo === comment._id && (
                        <div className="mt-4 flex gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="flex-1 bg-box/20 rounded-xl p-3 border border-default/40 focus-within:border-primary/50 transition-all">
                                <textarea
                                    autoFocus
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handlePostComment(comment._id);
                                        }
                                    }}
                                    className="w-full bg-transparent border-none focus:ring-0 outline-none text-text-heading placeholder:text-muted/60 resize-none min-h-[60px] text-sm"
                                    placeholder={`Replying to ${comment.userId?.fullName || comment.userId?.userName || "User"}...`}
                                ></textarea>
                                <div className="flex justify-end mt-2">
                                    <button
                                        onClick={() => handlePostComment(comment._id)}
                                        disabled={isSubmitting || !replyText.trim()}
                                        className="bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
                                    >
                                        {isSubmitting ? "Posting..." : "Post Reply"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Recursive Replies */}
            {allComments.filter(c => c.parentId === comment._id).map(reply => (
                <CommentItem
                    key={reply._id}
                    comment={reply}
                    isReply={true}
                    user={user}
                    isAdmin={isAdmin}
                    replyTo={replyTo}
                    setReplyTo={setReplyTo}
                    replyText={replyText}
                    setReplyText={setReplyText}
                    handlePostComment={handlePostComment}
                    handleLikeComment={handleLikeComment}
                    handleUpdateComment={handleUpdateComment}
                    handleDeleteComment={handleDeleteComment}
                    editingCommentId={editingCommentId}
                    setEditingCommentId={setEditingCommentId}
                    editText={editText}
                    setEditText={setEditText}
                    allComments={allComments}
                    postAuthorId={postAuthorId}
                    isSubmitting={isSubmitting}
                />
            ))}
        </div>
    );
};

const ArticleComments = ({ postId, postAuthorId }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAdmin } = useSelector((state) => state.auth);
    const { comments, totalComments, loading } = useSelector((state) => state.comment);

    const [isSortOpen, setIsSortOpen] = useState(false);
    const [sortBy, setSortBy] = useState("Newest first");
    const [commentText, setCommentText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [replyTo, setReplyTo] = useState(null); // Track which comment is being replied to
    const [replyText, setReplyText] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editText, setEditText] = useState("");
    const [commentToDelete, setCommentToDelete] = useState(null);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsSortOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Fetch initial comments
    useEffect(() => {
        if (postId) {
            dispatch(resetComments());
            fetchComments(0, sortBy);
        }
    }, [dispatch, postId, sortBy]);

    const fetchComments = (startIndex = 0, sort = "Newest first") => {
        let sortQuery = "newest";
        if (sort === "Oldest first") sortQuery = "oldest";
        if (sort === "Most liked") sortQuery = "likes";

        dispatch(getCommentsAction({
            postId,
            sort: sortQuery,
            startIndex,
            limit: 20 // Fetch more at once to handle nesting better
        }));
    };

    const handleSortSelect = (option) => {
        setSortBy(option);
        setIsSortOpen(false);
    };

    const handlePostComment = async (parentId = null) => {
        if (!user) {
            toast.error("Please login to comment");
            return navigate("/login");
        }

        const text = parentId ? replyText : commentText;
        if (!text.trim()) return;

        setIsSubmitting(true);
        try {
            await dispatch(createCommentAction({
                postId,
                text,
                parentId
            })).unwrap();

            if (parentId) {
                setReplyText("");
                setReplyTo(null);
            } else {
                setCommentText("");
            }
            toast.success("Comment posted successfully");
        } catch (error) {
            toast.error(error?.message || "Failed to post comment");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLikeComment = async (commentId) => {
        if (!user) {
            toast.error("Please login to like comments");
            return navigate("/login");
        }
        try {
            await dispatch(likeCommentAction(commentId)).unwrap();
        } catch (error) {
            toast.error(error?.message || "Action failed");
        }
    };

    const handleLoadMore = () => {
        fetchComments(comments.length, sortBy);
    };

    const handleUpdateComment = async (commentId) => {
        if (!editText.trim()) return;
        setIsSubmitting(true);
        try {
            await dispatch(updateCommentAction({ commentId, text: editText })).unwrap();
            setEditingCommentId(null);
            setEditText("");
            toast.success("Comment updated");
        } catch (error) {
            toast.error(error?.message || "Failed to update comment");
        } finally {
            setIsSubmitting(false);
        }
    };

    const triggerDelete = (commentId) => {
        setCommentToDelete(commentId);
    };

    const handleDeleteComment = async () => {
        if (!commentToDelete) return;
        try {
            await dispatch(deleteCommentAction(commentToDelete)).unwrap();
            toast.success("Comment deleted");
            setCommentToDelete(null);
        } catch (error) {
            toast.error(error?.message || "Failed to delete comment");
        }
    };

    // Organize comments into a tree structure
    const getTopLevelComments = () => comments.filter(c => !c.parentId || c.parentId === null);

    const sortOptions = ["Newest first", "Oldest first", "Most liked"];

    const topLevelComments = getTopLevelComments();

    return (
        <section className="mb-24 pt-10 border-t border-default/30" id="comments">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-text-heading">Comments</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                        {totalComments}
                    </span>
                </div>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-box/40 border transition-all duration-300 shadow-sm shadow-black/5 ${isSortOpen ? 'border-primary/40 text-text-heading' : 'border-default/40 hover:border-primary/40 text-sm font-medium text-muted hover:text-text-heading'}`}
                    >
                        {sortBy}
                        <HiChevronDown className={`text-base transition-all duration-300 ${isSortOpen ? 'text-primary rotate-180' : 'text-muted'}`} />
                    </button>

                    {/* Dropdown menu */}
                    <div className={`absolute right-0 top-full mt-2 w-36 bg-surface border border-default/50 rounded-xl shadow-xl shadow-black/10 transition-all duration-200 origin-top-right z-10 flex flex-col overflow-hidden ${isSortOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}>
                        {sortOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleSortSelect(option)}
                                className={`text-left px-4 py-2.5 text-sm font-medium transition-colors ${sortBy === option ? 'text-text-heading bg-primary/10 hover:bg-primary/15' : 'text-muted hover:text-text-heading hover:bg-box/50'}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Premium Simple Input */}
            <div className="flex gap-4 mb-12">
                <div className="size-10 rounded-full overflow-hidden shrink-0 mt-1 ring-2 ring-primary/20">
                    <img
                        src={user?.avatar}
                        alt="Current User"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 bg-box/30 rounded-xl p-4 border border-default/40 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-300">
                    <label htmlFor="comment-textarea" className="sr-only">Comment</label>
                    <textarea
                        id="comment-textarea"
                        name="comment"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handlePostComment();
                            }
                        }}
                        className="w-full bg-transparent border-none focus:ring-0 outline-none text-text-heading placeholder:text-muted/60 resize-none min-h-[80px] text-base leading-relaxed px-4"
                        placeholder="What are your thoughts?"
                    ></textarea>

                    <div className="flex items-center justify-end mt-4 pt-4 border-t border-default/30">
                        <button
                            onClick={() => handlePostComment()}
                            disabled={isSubmitting || !commentText.trim()}
                            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Posting..." : "Post to discussion"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Clean Comments List */}
            <div className="space-y-4">
                {topLevelComments.map(comment => (
                    <CommentItem
                        key={comment._id}
                        comment={comment}
                        user={user}
                        isAdmin={isAdmin}
                        replyTo={replyTo}
                        setReplyTo={setReplyTo}
                        replyText={replyText}
                        setReplyText={setReplyText}
                        handlePostComment={handlePostComment}
                        handleLikeComment={handleLikeComment}
                        handleUpdateComment={handleUpdateComment}
                        handleDeleteComment={triggerDelete}
                        editingCommentId={editingCommentId}
                        setEditingCommentId={setEditingCommentId}
                        editText={editText}
                        setEditText={setEditText}
                        allComments={comments} // Pass the full comments array
                        postAuthorId={postAuthorId}
                        isSubmitting={isSubmitting}
                    />
                ))}

                {comments.length === 0 && !loading && (
                    <div className="text-center py-10 text-muted">
                        No comments yet. Be the first to share your thoughts!
                    </div>
                )}

                {comments.length < totalComments && (
                    <div className="pt-8">
                        <button
                            onClick={handleLoadMore}
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-box/30 hover:bg-box/50 border border-default/40 text-text-heading text-sm font-semibold transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                        >
                            {loading ? "Loading..." : "Load more comments"}
                            {!loading && <HiChevronDown className="text-lg text-muted group-hover:translate-y-0.5 transition-transform" />}
                        </button>
                    </div>
                )}
            </div>

            {/* Custom Delete Confirmation Modal */}
            <Modal
                isOpen={!!commentToDelete}
                onClose={() => setCommentToDelete(null)}
                onConfirm={handleDeleteComment}
                title="Delete Comment"
                type="danger"
                confirmText="Delete Permanently"
            >
                Are you sure you want to delete this comment? This action cannot be undone and will remove all replies associated with it.
            </Modal>
        </section>
    );
};


export default ArticleComments;
