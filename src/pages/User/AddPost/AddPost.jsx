import React, { useState, useEffect } from 'react';
import PostWritingTips from '../../../components/userSection/addPost/PostWritingTips';
import PostEditor from '../../../components/userSection/addPost/PostEditor';
import { HiOutlineGlobeAlt, HiOutlineLockClosed } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesAction } from '../../../redux/thunks/categoryThunk';
import { createPostAction } from '../../../redux/thunks/postThunk';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function AddPost() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categories } = useSelector(state => state.category);
    const { loading } = useSelector(state => state.post);
    const [isSavingDraft, setIsSavingDraft] = useState(false);

    const [postData, setPostData] = useState({
        title: '',
        description: '',
        content: '',
        category: '',
        projectLink: '',
        tags: [],
        coverImage: null,
        visibility: 'public'
    });

    useEffect(() => {
        dispatch(getAllCategoriesAction());
        document.title = "Create New Publication | Dev Adda";
        return () => {
            document.title = "Dev Adda | Tech News & Developer Updates";
        };
    }, [dispatch]);

    useEffect(() => {
        if (categories.length > 0 && !postData.category) {
            setPostData(prev => ({ ...prev, category: categories[0]._id }));
        }
    }, [categories]);

    const updatePostData = (updates) => {
        setPostData(prev => ({ ...prev, ...updates }));
    };

    const handleSaveDraft = async () => {
        if (!postData.title || !postData.content || !postData.category) {
            return toast.error("Please fill in all required fields (Title, Content, Category)");
        }
        setIsSavingDraft(true);
        try {
            const formData = new FormData();
            formData.append('title', postData.title);
            formData.append('description', postData.description);
            formData.append('content', postData.content);
            formData.append('category', postData.category);
            formData.append('projectLink', postData.projectLink);
            formData.append('visibility', postData.visibility);
            formData.append('userStatus', 'draft');
            formData.append('status', 'pending');

            // Add tags
            postData.tags.forEach(tag => {
                formData.append('tags', tag);
            });

            // Handle cover image
            if (postData.coverImage instanceof File) {
                formData.append('image', postData.coverImage);
            } else if (postData.coverImage) {
                formData.append('coverImage', postData.coverImage);
            }

            await dispatch(createPostAction(formData)).unwrap();
            toast.success("Draft saved successfully! View it on your profile.");
            navigate('/profile');
        } catch (error) {
            toast.error(error.message || error || "Failed to save draft");
        } finally {
            setIsSavingDraft(false);
        }
    };

    const handlePublish = async () => {
        if (!postData.title || !postData.content || !postData.category) {
            return toast.error("Please fill in all required fields (Title, Content, Category)");
        }
        try {
            const formData = new FormData();
            formData.append('title', postData.title);
            formData.append('description', postData.description);
            formData.append('content', postData.content);
            formData.append('category', postData.category);
            formData.append('projectLink', postData.projectLink);
            formData.append('visibility', postData.visibility);
            formData.append('userStatus', 'published');
            formData.append('status', 'pending');

            // Add tags
            postData.tags.forEach(tag => {
                formData.append('tags', tag);
            });

            // Handle cover image
            if (postData.coverImage instanceof File) {
                formData.append('image', postData.coverImage);
            } else if (postData.coverImage) {
                formData.append('coverImage', postData.coverImage);
            }

            await dispatch(createPostAction(formData)).unwrap();
            toast.success("Post published successfully!");
            navigate('/');
        } catch (error) {
            toast.error(error.message || error || "Failed to publish post");
        }
    };

    return (
        <div className="relative flex w-full flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Mobile-only visibility toggle bar for data : Privite/Public */}
            <div className="lg:hidden sticky top-[64px] z-20 bg-background/80 backdrop-blur-xl border-b border-default px-4 py-2.5">
                <div className="flex items-center justify-between max-w-3xl mx-auto">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted">Visibility</span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => updatePostData({ visibility: 'public' })}
                            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${postData.visibility === 'public'
                                ? 'bg-primary text-white border-primary'
                                : 'text-muted border-default hover:border-primary/30'
                                }`}
                        >
                            <HiOutlineGlobeAlt className="text-sm" />
                            Public
                        </button>
                        <button
                            onClick={() => updatePostData({ visibility: 'private' })}
                            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${postData.visibility === 'private'
                                ? 'bg-primary text-white border-primary'
                                : 'text-muted border-default hover:border-primary/30'
                                }`}
                        >
                            <HiOutlineLockClosed className="text-sm" />
                            Private
                        </button>
                    </div>
                </div>
            </div>

            {/* Compact Editor Status Bar */}
            <div className="hidden lg:block sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-default px-10 py-3.5">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <h1 className="text-xs font-black tracking-[0.2em] uppercase text-body">Station Editor</h1>
                        <div className="h-3 w-px bg-default opacity-50" />
                        <div className="flex items-center gap-5 text-[10px] font-bold text-muted uppercase tracking-widest leading-none">
                            <span>{postData.content.replace(/<[^>]*>/g, '').trim() === '' ? 0 : postData.content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length} words</span>
                            <div className="size-1 rounded-full bg-default opacity-30" />
                            <span>{Math.max(1, Math.ceil(postData.content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length / 200))} min read</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 opacity-80">
                        <div className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-muted">Cloud Synced</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <PostWritingTips postData={postData} updatePostData={updatePostData} />
                <PostEditor
                    postData={postData}
                    updatePostData={updatePostData}
                    handlePublish={handlePublish}
                    handleSaveDraft={handleSaveDraft}
                    loading={loading}
                    isSavingDraft={isSavingDraft}
                />
            </div>
        </div>
    );
}

export default AddPost;
