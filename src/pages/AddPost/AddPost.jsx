import React, { useState, useEffect } from 'react';
import PostWritingTips from '../../components/addPost/PostWritingTips';
import PostEditor from '../../components/addPost/PostEditor';
import { HiOutlineGlobeAlt, HiOutlineLockClosed } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesAction } from '../../redux/thunks/categoryThunk';
import { createPostAction } from '../../redux/thunks/postThunk';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function AddPost() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categories } = useSelector(state => state.category);
    const { loading } = useSelector(state => state.post);

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
    }, [dispatch]);

    useEffect(() => {
        if (categories.length > 0 && !postData.category) {
            setPostData(prev => ({ ...prev, category: categories[0]._id }));
        }
    }, [categories]);

    const updatePostData = (updates) => {
        setPostData(prev => ({ ...prev, ...updates }));
    };

    const handlePublish = async () => {
        if (!postData.title || !postData.content || !postData.category) {
            return toast.error("Please fill in all required fields (Title, Content, Category)");
        }
        try {
            await dispatch(createPostAction(postData)).unwrap();
            toast.success("Post published successfully!");
            navigate('/');
        } catch (error) {
            toast.error(error.message || "Failed to publish post");
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

            <div className="flex flex-1 overflow-hidden">
                <PostWritingTips postData={postData} updatePostData={updatePostData} />
                <PostEditor
                    postData={postData}
                    updatePostData={updatePostData}
                    handlePublish={handlePublish}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default AddPost;
