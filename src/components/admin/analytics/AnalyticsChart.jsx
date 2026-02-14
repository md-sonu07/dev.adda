import React from 'react';

const AnalyticsChart = () => {
    return (
        <div className="bg-card rounded-2xl border border-default p-8 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-body">Traffic Overview</h3>
                <select className="bg-box border border-default rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-widest outline-none">
                    <option>Last 30 Days</option>
                    <option>Last 7 Days</option>
                    <option>This Year</option>
                </select>
            </div>
            <div className="h-64 flex items-end justify-between gap-px sm:gap-4 group">
                {[65, 45, 75, 55, 85, 95, 40, 60, 80, 70, 90, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-primary/20 rounded-t-lg relative group cursor-pointer" style={{ height: `${h}%` }}>
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-body text-card text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {h * 10}k
                        </div>
                        <div className="w-full h-full bg-primary rounded-t-lg opacity-0 group-hover:opacity-100 transition-all scale-x-110" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnalyticsChart;
