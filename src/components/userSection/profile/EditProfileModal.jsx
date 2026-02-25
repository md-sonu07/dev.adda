import React, { useState, useEffect } from 'react';
import { HiXMark, HiOutlineCamera, HiOutlineUser, HiOutlineAtSymbol, HiOutlineChatBubbleBottomCenterText, HiOutlineMapPin } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { updateProfileAction } from '../../../redux/thunks/userThunk';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import SkeletonImage from '../../common/SkeletonImage';

const EditProfileModal = ({ isOpen, onClose, user }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        userName: '',
        bio: '',
        location: '',
    });
    const [avatar, setAvatar] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || '',
                userName: user.userName || '',
                bio: user.bio || '',
                location: user.location || '',
            });
            setPreviewUrl(user.avatar || '');
        }
    }, [user, isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setAvatar(null);
        setPreviewUrl(user.avatar || '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append('fullName', formData.fullName);
            data.append('userName', formData.userName);
            data.append('bio', formData.bio);
            data.append('location', formData.location);
            if (avatar) {
                data.append('image', avatar);
            }

            await dispatch(updateProfileAction(data)).unwrap();
            toast.success('Profile updated successfully');
            onClose();
        } catch (error) {
            toast.error(error.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-background/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative w-full max-w-lg bg-card border border-default rounded-[28px] shadow-2xl overflow-hidden"
                    >
                        <div className="p-7">
                            <div className="flex items-center justify-between mb-7">
                                <div>
                                    <h2 className="text-xl font-black tracking-tight text-body uppercase">Edit Profile</h2>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-muted mt-1">Update your basic info</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="size-9 lg:size-10 flex items-center justify-center hover:bg-box rounded-xl text-muted hover:text-body transition-colors active:scale-95"
                                >
                                    <HiXMark className="text-xl" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="flex flex-col sm:flex-row items-center gap-8">
                                    {/* Simplified Avatar Section */}
                                    <div className="relative group shrink-0 mt-6">
                                        <div className="size-30 rounded-[28px]  border border-default overflow-hidden bg-box transition-transform duration-300 group-hover:scale-105">
                                            <SkeletonImage
                                                src={previewUrl}
                                                alt="Avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Remove Selected Image Button */}
                                        {(avatar || previewUrl) && (
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute -top-2 -right-2 z-10 size-7 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-all hover:scale-110 active:scale-90"
                                            >
                                                <HiXMark className="text-sm" />
                                            </button>
                                        )}

                                        <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity rounded-[28px]">
                                            <HiOutlineCamera className="text-white text-2xl mb-1" />
                                            <span className="text-[7px] font-black text-white uppercase tracking-widest">Change</span>
                                            <input type="file" className="hidden" onChange={handleImageChange} />
                                        </label>
                                    </div>

                                    <div className="flex-1 w-full space-y-4">
                                        {/* Name Row */}
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-muted/60 ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                className="w-full bg-box border border-default rounded-xl px-4 py-3 text-xs font-bold focus:border-primary/50 outline-none transition-all"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-muted/60 ml-1">Username</label>
                                            <input
                                                type="text"
                                                name="userName"
                                                value={formData.userName}
                                                onChange={handleInputChange}
                                                className="w-full bg-box border border-default rounded-xl px-4 py-3 text-xs font-bold focus:border-primary/50 outline-none transition-all"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-2">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-muted/60 ml-1">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            placeholder="e.g. New York, USA"
                                            className="w-full bg-box border border-default rounded-xl px-4 py-3 text-xs font-bold focus:border-primary/50 outline-none transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center ml-1">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-muted/60">Bio</label>
                                            <span className="text-[8px] font-bold text-muted/40 uppercase tracking-tighter">{formData.bio.length}/200</span>
                                        </div>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleInputChange}
                                            rows="2"
                                            maxLength={200}
                                            className="w-full bg-box border border-default rounded-xl px-4 py-3 text-xs font-bold focus:border-primary/50 outline-none transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 py-4 bg-box border border-default rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-default transition-all active:scale-95"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-2 py-4 bg-primary text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center"
                                    >
                                        {loading ? <div className="size-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EditProfileModal;
