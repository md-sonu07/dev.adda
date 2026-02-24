import React from 'react';

const TrafficSources = () => {
    const sources = [
        { label: 'Direct Traffic', val: 45, color: 'bg-primary' },
        { label: 'Organic Search', val: 32, color: 'bg-indigo-500' },
        { label: 'Social Media', val: 18, color: 'bg-emerald-500' },
        { label: 'Referrals', val: 5, color: 'bg-amber-500' },
    ];

    return (
        <div className="bg-card rounded-2xl border border-default p-6 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest text-body mb-6">Traffic Sources</h3>
            <div className="space-y-4">
                {sources.map((src, i) => (
                    <div key={i} className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                            <span className="text-muted">{src.label}</span>
                            <span className="text-body">{src.val}%</span>
                        </div>
                        <div className="h-2 bg-box rounded-full overflow-hidden">
                            <div className={`h-full ${src.color}`} style={{ width: `${src.val}%` }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrafficSources;
