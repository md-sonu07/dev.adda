import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    HiOutlineDocumentText,
    HiOutlineBookmark,
    HiOutlineClock,
    HiOutlineHeart,
    HiOutlineUsers,
    HiOutlineUserPlus
} from 'react-icons/hi2';

const ProfileTabs = ({ activeTab, setActiveTab }) => {
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
    const { postsCount } = useSelector((state) => state.user);
    const { bookmarkedPosts } = useSelector((state) => state.bookmark);
    const { followers, following } = useSelector((state) => state.follow);
    const { historyPosts } = useSelector((state) => state.history);

    const isOwnProfile = !id || id === user?._id;

    const tabs = [
        {
            id: 'posted',
            label: 'Posted News',
            count: postsCount || 0,
            icon: HiOutlineDocumentText,
            show: true
        },
        {
            id: 'saved',
            label: 'Saved Articles',
            count: bookmarkedPosts?.length || 0,
            icon: HiOutlineBookmark,
            show: isOwnProfile
        },
        {
            id: 'liked',
            label: 'Liked Posts',
            count: 0,
            icon: HiOutlineHeart,
            show: isOwnProfile
        },
        {
            id: 'history',
            label: 'History',
            count: historyPosts?.length || 0,
            icon: HiOutlineClock,
            show: isOwnProfile
        },
        {
            id: 'followers',
            label: 'Followers',
            count: followers?.length || 0,
            icon: HiOutlineUsers,
            show: true
        },
        {
            id: 'following',
            label: 'Following',
            count: following?.length || 0,
            icon: HiOutlineUserPlus,
            show: true
        }
    ].filter(tab => tab.show);

    return (
        <div className="sticky top-[72px] z-40 bg-background/80 backdrop-blur-3xl py-4 -mx-4 px-4 sm:-mx-8 sm:px-8 border-b border-default mb-8 overflow-hidden">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-2 sm:gap-8 overflow-x-auto no-scrollbar scroll-smooth">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className="group relative flex items-center gap-2 pb-4 pt-2 transition-all duration-300 whitespace-nowrap px-3 outline-none"
                            >
                                <Icon className={`text-lg transition-transform duration-300 ${isActive ? 'text-primary scale-110' : 'text-muted group-hover:text-body'}`} />

                                <span className={`text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${isActive
                                    ? 'text-primary'
                                    : 'text-muted hover:text-body'
                                    }`}>
                                    {tab.label}
                                </span>

                                {tab.count > 0 && (
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold transition-colors ${isActive
                                        ? 'bg-primary/10 text-primary border border-primary/20'
                                        : 'bg-box text-muted border border-default'}`}>
                                        {tab.count}
                                    </span>
                                )}

                                {/* Animated Active Indicator */}
                                {isActive ? (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full shadow-[0_-4px_12px_rgba(19,91,236,0.3)] animate-in slide-in-from-bottom-2 duration-300"></div>
                                ) : (
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-1 bg-border transition-all duration-300 rounded-t-full"></div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProfileTabs;
