import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserProfileAction } from '../../redux/thunks/userThunk';
import { getMyPostsAction } from '../../redux/thunks/postThunk';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileTabs from '../../components/profile/ProfileTabs';
import ProfilePosts from '../../components/profile/ProfilePosts';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('posted');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserData = async () => {
            await dispatch(getUserProfileAction());
            // Fetch posts after user data is ready
            await dispatch(getMyPostsAction());
        };
        fetchUserData();
    }, [dispatch]);

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