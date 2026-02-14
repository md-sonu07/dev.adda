import React from 'react';
import AnalyticsStats from '../../components/admin/analytics/AnalyticsStats';
import AnalyticsChart from '../../components/admin/analytics/AnalyticsChart';
import TrafficSources from '../../components/admin/analytics/TrafficSources';
import TrendingContent from '../../components/admin/analytics/TrendingContent';

const Analytics = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-2xl font-black uppercase tracking-tight">System Analytics</h1>
                <p className="text-muted text-sm font-bold">Deep dive into platform engagement and performance metrics</p>
            </div>

            <AnalyticsStats />
            <AnalyticsChart />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TrafficSources />
                <TrendingContent />
            </div>
        </div>
    );
};

export default Analytics;
