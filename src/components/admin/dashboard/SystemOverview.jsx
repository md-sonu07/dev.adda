import React from 'react';
import { HiOutlineCpuChip, HiOutlineBolt, HiOutlineSquare3Stack3D } from 'react-icons/hi2';

const SystemOverview = () => {
    return (
        <div className="bg-card rounded-2xl border border-default p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-[10px] font-black uppercase tracking-widest text-body">System Overview</h2>
                <div className="flex items-center gap-1.5">
                    <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Live</span>
                </div>
            </div>

            <div className="space-y-6">
                {[
                    { label: 'Server Load', val: '24%', icon: HiOutlineCpuChip, color: 'text-primary' },
                    { label: 'API Latency', val: '42ms', icon: HiOutlineBolt, color: 'text-amber-500' },
                    { label: 'Data Sync', val: '99.9%', icon: HiOutlineSquare3Stack3D, color: 'text-emerald-500' }
                ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 bg-box rounded-xl border border-default group hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-card border border-default flex items-center justify-center group-hover:scale-110 transition-transform">
                                <item.icon className={`text-lg ${item.color}`} />
                            </div>
                            <span className="text-xs font-black text-muted uppercase tracking-tight">{item.label}</span>
                        </div>
                        <span className="text-sm font-black text-body">{item.val}</span>
                    </div>
                ))}

                <button className="w-full mt-2 py-3 border border-dashed border-default rounded-xl text-[9px] font-black uppercase tracking-widest text-muted hover:border-primary hover:text-primary transition-all">
                    Generate Diagnostics Report
                </button>
            </div>
        </div>
    );
};

export default SystemOverview;
