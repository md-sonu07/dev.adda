import React from 'react';

const ProfileTabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'posted', label: 'Posted News' },
        { id: 'saved', label: 'Saved Articles' },
        { id: 'history', label: 'Reading History' },
        { id: 'liked', label: 'Liked Posts' }
    ];

    return (
        <div className="sticky top-[72px] z-40 bg-background/80 backdrop-blur-3xl py-4 -mx-4 px-4 sm:-mx-8 sm:px-8 border-b border-default mb-8 overflow-hidden">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-2 sm:gap-10 overflow-x-auto no-scrollbar scroll-smooth">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`group relative flex flex-col items-center justify-center pb-4 pt-2 transition-all duration-300 whitespace-nowrap px-2 outline-none`}
                        >
                            <span className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === tab.id
                                ? 'text-primary'
                                : 'text-muted hover:text-body'
                                }`}>
                                {tab.label}
                            </span>

                            {/* Animated Active Indicator */}
                            {activeTab === tab.id ? (
                                <div className="absolute bottom-0 w-full h-1 bg-primary rounded-t-full shadow-[0_-4px_12px_rgba(19,91,236,0.4)] animate-in slide-in-from-bottom-2 duration-300"></div>
                            ) : (
                                <div className="absolute bottom-0 w-0 group-hover:w-full h-1 bg-border transition-all duration-300 rounded-t-full"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileTabs;
