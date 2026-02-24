import React from 'react';
import BreakingHeader from '../../components/adminSection/breaking/BreakingHeader';
import ActiveBroadcasts from '../../components/adminSection/breaking/ActiveBroadcasts';
import BroadcastForm from '../../components/adminSection/breaking/BroadcastForm';

const BreakingNews = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <BreakingHeader />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <ActiveBroadcasts />
                </div>
                <div>
                    <BroadcastForm />
                </div>
            </div>
        </div>
    );
};

export default BreakingNews;
