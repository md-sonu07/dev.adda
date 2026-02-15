import React, { useState, useEffect } from 'react';
import { HiXMark, HiOutlineCamera, HiOutlineUser, HiOutlineAtSymbol, HiOutlineChatBubbleBottomCenterText, HiOutlineMapPin } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { updateProfileAction } from '../../redux/thunks/userThunk';
import toast from 'react-hot-toast';
import SkeletonImage from '../common/SkeletonImage';

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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 ">
            <div className="absolute inset-0 bg-background/90 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />

            <div className="relative w-full max-w-xl bg-card border border-default rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-8 ">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-black tracking-tight text-body uppercase">Edit Profile</h2>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted mt-1">Update your personal information</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-box rounded-xl text-muted transition-colors">
                            <HiXMark className="text-2xl" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Avatar Upload */}
                        <div className="flex flex-col items-center gap-4 mb-8">
                            <div className="relative group">
                                <div className="size-32 rounded-[32px] border-4 border-background overflow-hidden bg-box shadow-xl group-hover:scale-105 transition-transform duration-500">
                                    <SkeletonImage
                                        src={previewUrl || 'https://ui-avatars.com/api/?name=User&background=random'}
                                        alt="Avatar Preview"
                                        className="w-full h-full"
                                    />
                                    <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <HiOutlineCamera className="text-white text-3xl mb-1" />
                                        <span className="text-[8px] font-black text-white uppercase tracking-widest">Change</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted ml-1">
                                    <HiOutlineUser className="text-sm" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your name"
                                    className="w-full bg-box border border-default rounded-xl px-4 py-3 text-xs font-bold focus:border-primary/50 outline-none transition-all"
                                    required
                                />
                            </div>

                            {/* Username */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted ml-1">
                                    <HiOutlineAtSymbol className="text-sm" />
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleInputChange}
                                    placeholder="Choose username"
                                    className="w-full bg-box border border-default rounded-xl px-4 py-3 text-xs font-bold focus:border-primary/50 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted ml-1">
                                <HiOutlineChatBubbleBottomCenterText className="text-sm" />
                                Bio
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                placeholder="Tell us about yourself..."
                                rows="3"
                                className="w-full bg-box border border-default rounded-xl px-4 py-3 text-xs font-bold focus:border-primary/50 outline-none transition-all resize-none"
                            />
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted ml-1">
                                <HiOutlineMapPin className="text-sm" />
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder="e.g. New York, USA"
                                className="w-full bg-box border border-default rounded-xl px-4 py-3 text-xs font-bold focus:border-primary/50 outline-none transition-all"
                            />
                        </div>

                        <div className="pt-4 flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-4 bg-box border border-default rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-default transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-2 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <div className="size-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
