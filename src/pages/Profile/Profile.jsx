import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserProfileAction, getUserByIdAction } from '../../redux/thunks/userThunk';
import { getMyPostsAction, getAllPostsAction } from '../../redux/thunks/postThunk';
import { getFollowersAction, getFollowingAction } from '../../redux/thunks/followThunk';
import { clearUserProfile } from '../../redux/slices/userSlice';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileTabs from '../../components/profile/ProfileTabs';
import ProfilePosts from '../../components/profile/ProfilePosts';

const Profile = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('posted');
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (id) {
                    // Fetch someone else's profile
                    await dispatch(getUserByIdAction(id));
                    await dispatch(getAllPostsAction({ author: id }));
                    await dispatch(getFollowersAction(id));
                    await dispatch(getFollowingAction(id));
                } else if (currentUser?._id) {
                    // Fetch logged in user profile and stats
                    await dispatch(getUserProfileAction());
                    await dispatch(getMyPostsAction());
                    await dispatch(getFollowersAction(currentUser._id));
                    await dispatch(getFollowingAction(currentUser._id));
                }
            } catch (error) {
                console.error("Profile fetch error:", error);
            }
        };
        fetchUserData();

        // Cleanup function to clear profile when leaving or switching between profiles
        return () => {
            dispatch(clearUserProfile());
        };
    }, [dispatch, id, currentUser?._id]);

    return (
        <div className="min-h-screen bg-background transition-colors duration-500">
            {/* Profile Main Content */}
            <main className="max-w-[1400px] mx-auto pt-10 px-6 sm:px-14">
                <div className="max-w-5xl mx-auto">
                    {/* Integrated Header Section */}
                    <ProfileHeader />

                    {/* Navigation Tabs Section */}
                    <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                    {/* Posts/Articles Section */}
                    <ProfilePosts activeTab={activeTab} />
                </div>
            </main>
        </div>
    );
};

export default Profile;