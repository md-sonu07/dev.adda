import React, { useRef, useState } from 'react';
import Modal from '../common/Modal';
import {
    HiCheckBadge,
    HiOutlinePencilSquare,
    HiOutlineShare,
    HiOutlineGlobeAlt,
    HiOutlineCodeBracket,
    HiAtSymbol,
    HiOutlineCalendar,
    HiOutlineMapPin,
    HiOutlineSun,
    HiOutlineMoon,
    HiOutlineShieldCheck
} from 'react-icons/hi2';
import { IoBookmarksOutline, IoNotificationsOutline, IoLogOutOutline } from 'react-icons/io5';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { logoutAction } from '../../redux/thunks/authThunk';
import { followUserAction, unfollowUserAction, getFollowersAction, getFollowingAction } from '../../redux/thunks/followThunk';
import toast from 'react-hot-toast';

import EditProfileModal from './EditProfileModal';
import SkeletonImage from '../common/SkeletonImage';
import { sharePost } from '../../utils/shareUtils';

const ProfileHeader = () => {
    const { id } = useParams();
    const isDark = useSelector((state) => state.theme.isDark);
    const { userProfile, loading } = useSelector((state) => state.user);
    const { myPosts } = useSelector((state) => state.post);
    const { followers, following } = useSelector((state) => state.follow);
    const { isAdmin, user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isOwnProfile = !id || id === user?._id;
    const isFollowing = followers.some(f => f._id === user?._id);

    const handleFollow = async () => {
        if (!user) {
            toast.error("Please login to follow");
            return navigate('/login');
        }
        try {
            if (isFollowing) {
                await dispatch(unfollowUserAction(id)).unwrap();
                toast.success('Unfollowed successfully');
            } else {
                await dispatch(followUserAction(id)).unwrap();
                toast.success('Followed successfully');
            }
            // Re-fetch data to reflect changes instantly
            dispatch(getFollowersAction(id));
            dispatch(getFollowingAction(id));
        } catch (error) {
            toast.error(error?.message || 'Action failed');
        }
    };

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
        toast.success(`${!isDark ? 'Dark' : 'Light'} Mode Activated`, {
            icon: !isDark ? <HiOutlineMoon className="text-primary" /> : <HiOutlineSun className="text-orange-500" />,
            duration: 2000,
        });
    };


    const handleLogout = async () => {
        try {
            await dispatch(logoutAction()).unwrap();
            toast.success('Logged out successfully');
            navigate('/');
        } catch (error) {
            toast.error(error || 'Logout failed');
        }
    };

    if (loading && !userProfile) {
        return (
            <div className="rounded-xl border border-default p-6 mb-6 shadow-sm animate-pulse">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        {/* Avatar Skeleton */}
                        <div className="size-40 sm:size-34 rounded-[32px] bg-box/60 border-4 border-background overflow-hidden" />

                        <div className="text-center sm:text-left space-y-3 flex-1">
                            <div className="space-y-2">
                                {/* Name & Bio Skeleton */}
                                <div className="h-8 w-48 bg-box/60 rounded-lg mx-auto sm:mx-0" />
                                <div className="h-4 w-full max-w-[250px] bg-box/40 rounded mx-auto sm:mx-0" />
                            </div>

                            {/* Meta Info Skeleton */}
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-5 pt-1">
                                <div className="h-3 w-24 bg-box/40 rounded" />
                                <div className="h-3 w-24 bg-box/40 rounded" />
                            </div>

                            {/* Social Icons Skeleton */}
                            <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
                                <div className="size-9 bg-box/40 rounded-xl" />
                                <div className="size-9 bg-box/40 rounded-xl" />
                                <div className="size-9 bg-box/40 rounded-xl" />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons Skeleton */}
                    <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto">
                        <div className="h-11 w-full md:w-40 bg-box/60 rounded-xl" />
                        <div className="h-11 w-full md:w-40 bg-box/40 rounded-xl" />
                    </div>
                </div>

                {/* Stats Bar Skeleton */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-default">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div className="h-8 w-12 bg-box/60 rounded-lg" />
                            <div className="h-2 w-16 bg-box/30 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!user) return null;

    const userData = userProfile || {};

    const handleShare = (e) => {
        e.preventDefault();
        sharePost({
            title: `${userData.fullName || 'User'} Profile | Dev Adda`,
            text: userData.bio || `Check out ${userData.fullName}'s professional profile on Dev Adda.`,
            url: window.location.href
        });
    };

    return (
        <div className="rounded-xl border border-default p-5 mb-4 shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="relative group">
                        <div className="size-40 sm:size-34 rounded-[32px] border-4 border-background overflow-hidden shadow-xl transition-transform duration-500 group-hover:scale-105">
                            <SkeletonImage
                                src={userData.avatar || `https://ui-avatars.com/api/?name=${userData.fullName || 'User'}&background=random`}
                                alt={userData.fullName || "User Profile"}
                                className="w-full h-full"
                            />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-green-500 size-5 rounded-2xl border-4 border-background shadow-lg"></div>
                    </div>

                    <div className="text-center sm:text-left space-y-3">
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-2 justify-center sm:justify-start">
                                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{userData.fullName || "Guest User"}</h1>
                                {userData?.isVerified && <HiCheckBadge className="text-primary text-xl" />}
                            </div>
                            <p className="text-muted font-bold text-base">{userData.bio || "No bio yet"}</p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-1 text-[13px] font-black tracking-widest text-muted">
                            <span className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                                <HiAtSymbol className="text-base" />
                                {userData.userName || "username"}
                            </span>
                            <span className="flex items-center gap-1">
                                <HiOutlineCalendar className="text-base" />
                                {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Joined ..."}
                            </span>
                            {userData.location && (
                                <span className="flex items-center gap-1">
                                    <HiOutlineMapPin className="text-base" />
                                    {userData.location}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                            {/* Website Link */}
                            <a href="#" className="p-2 hidden sm:flex rounded-xl border border-default hover:bg-primary/5 hover:border-primary/50 text-muted hover:text-primary transition-all shadow-sm">
                                <HiOutlineGlobeAlt className="text-lg" />
                            </a>

                            {/* Share Link */}
                            <button
                                onClick={handleShare}
                                className="p-2 flex rounded-xl border border-default hover:bg-primary/5 hover:border-primary/50 text-muted hover:text-primary transition-all shadow-sm cursor-pointer"
                                title="Share Profile"
                            >
                                <HiOutlineShare className="text-lg" />
                            </button>

                            {/* Admin Dashboard */}
                            {isAdmin && (
                                <Link
                                    to="/admin/dashboard"
                                    className="p-2 rounded-xl border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-all shadow-sm flex items-center gap-2"
                                    title="Admin Dashboard"
                                >
                                    <HiOutlineShieldCheck className="text-lg" />
                                    <span className="text-[10px] font-black uppercase tracking-widest px-1">Admin</span>
                                </Link>
                            )}

                            {/* Theme Toggle */}
                            <button
                                onClick={handleThemeToggle}
                                className="p-2 sm:hidden flex rounded-xl border border-default hover:bg-primary/10 hover:border-primary/50 text-muted hover:text-primary transition-all shadow-sm cursor-pointer"
                                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            >
                                {isDark ? (
                                    <HiOutlineSun className="text-lg transition-transform duration-300 hover:rotate-180" />
                                ) : (
                                    <HiOutlineMoon className="text-lg transition-transform duration-300 hover:-rotate-12" />
                                )}
                            </button>

                            {/* Bookmarks & Notifications (Separated) */}
                            <Link to="/bookmarks" className="p-2 sm:hidden flex rounded-xl border border-default hover:bg-primary/5 hover:border-primary/50 text-muted hover:text-primary transition-all shadow-sm">
                                <IoBookmarksOutline className="text-xl" />
                            </Link>

                            <Link to="/notifications" className="p-2 sm:hidden flex rounded-xl border border-default hover:bg-primary/5 hover:border-primary/50 text-muted hover:text-primary transition-all shadow-sm relative">
                                <IoNotificationsOutline className="text-xl" />
                                <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto">
                    {isOwnProfile ? (
                        <>
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="flex-1 flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-white text-[10px] font-black uppercase tracking-widest py-3 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-90 group cursor-pointer"
                            >
                                <HiOutlinePencilSquare className="text-lg group-hover:rotate-12 transition-transform" />
                                Edit Profile
                            </button>
                            <button
                                onClick={() => setIsLogoutModalOpen(true)}
                                className="flex-1 flex items-center justify-center gap-2.5 border border-default text-muted text-[10px] font-black uppercase tracking-widest py-3 px-6 rounded-xl transition-all active:scale-90 group cursor-pointer hover:border-red-500/50 hover:text-red-500 hover:bg-red-500/5"
                            >
                                <IoLogOutOutline className="text-lg group-hover:scale-110 transition-transform" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleFollow}
                            className={`flex-1 flex items-center justify-center gap-2.5 text-[10px] font-black uppercase tracking-widest py-3 px-12 rounded-xl transition-all shadow-lg active:scale-90 group cursor-pointer ${isFollowing
                                ? 'bg-box border border-default text-muted hover:border-red-500/30 hover:text-red-500'
                                : 'bg-primary text-white hover:bg-primary/90 shadow-primary/20'
                                }`}
                        >
                            {isFollowing ? 'Unfollow' : 'Follow User'}
                        </button>
                    )}
                </div>
            </div>

            {/* Profile Stats Bar (Condensed) */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-default">
                <div className="text-center group cursor-pointer">
                    <p className="text-2xl font-black group-hover:text-primary transition-colors">{myPosts?.length || 0}</p>
                    <p className="text-[9px] uppercase tracking-widest font-black text-muted mt-1">Total Posts</p>
                </div>
                <div className="text-center border-x border-default group cursor-pointer px-4">
                    <p className="text-2xl font-black group-hover:text-primary transition-colors">{followers?.length || 0}</p>
                    <p className="text-[9px] uppercase tracking-widest font-black text-muted mt-1">Followers</p>
                </div>
                <div className="text-center group cursor-pointer">
                    <p className="text-2xl font-black group-hover:text-primary transition-colors">{following?.length || 0}</p>
                    <p className="text-[9px] uppercase tracking-widest font-black text-muted mt-1">Following</p>
                </div>
            </div>
            <Modal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogout}
                title="Logout"
                type="danger"
                confirmText="Logout"
                cancelText="Cancel"
            >
                <p>Are you sure you want to logout?</p>
            </Modal>

            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={userData}
            />
        </div>
    );
};

export default ProfileHeader;
