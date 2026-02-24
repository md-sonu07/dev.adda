import React from 'react';
import { HiOutlineBolt, HiOutlineXMark, HiOutlineCheckCircle } from 'react-icons/hi2';

const ActiveBroadcasts = () => {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-body">Active Broadcasts</h3>
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                    <button className="text-rose-500 hover:scale-110 transition-transform"><HiOutlineXMark className="text-xl" /></button>
                </div>
                <div className="flex items-center gap-2 text-rose-500 mb-2">
                    <HiOutlineBolt className="text-xl animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Urgent Advisory</span>
                </div>
                <h4 className="text-lg font-black text-rose-600 uppercase tracking-tight mb-2">System Maintenance Scheduled for 12:00 AM UTC</h4>
                <p className="text-xs font-bold text-rose-500/80 mb-4">The platform will be temporarily unavailable for performance upgrades.</p>
                <div className="flex gap-4 text-[10px] font-black text-rose-500 uppercase tracking-widest">
                    <span>Started: 10m ago</span>
                    <span>Target: Global</span>
                </div>
            </div>

            <div className="bg-card border border-default rounded-2xl p-6 opacity-60">
                <div className="flex items-center gap-2 text-muted mb-2">
                    <HiOutlineCheckCircle className="text-xl" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Broadcast Expired</span>
                </div>
                <h4 className="text-sm font-black text-muted uppercase tracking-tight">Next.js 15 Launch Coverage Live Now</h4>
                <p className="text-[10px] text-muted">A recap of the announcement event.</p>
            </div>
        </div>
    );
};

export default ActiveBroadcasts;
