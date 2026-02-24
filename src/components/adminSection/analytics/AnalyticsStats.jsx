import React from 'react';
import { HiOutlineChartPie, HiOutlineArrowUpRight, HiOutlineArrowDownRight, HiOutlineUserGroup, HiOutlineClock } from 'react-icons/hi2';

const AnalyticsStats = () => {
    const stats = [
        { title: 'Total Engagement', val: '842.5k', change: '+12.4%', up: true, icon: HiOutlineChartPie },
        { title: 'Avg. Retention', val: '4m 32s', change: '-2.1%', up: false, icon: HiOutlineClock },
        { title: 'New Users Today', val: '284', change: '+5.2%', up: true, icon: HiOutlineUserGroup },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, i) => (
                <div key={i} className="bg-card p-6 rounded-2xl border border-default shadow-sm group hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted">{stat.title}</p>
                        <stat.icon className="text-xl text-primary" />
                    </div>
                    <h3 className="text-3xl font-black text-body mb-2">{stat.val}</h3>
                    <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${stat.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {stat.up ? <HiOutlineArrowUpRight /> : <HiOutlineArrowDownRight />}
                        {stat.change}
                        <span className="text-muted ml-1">vs last period</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnalyticsStats;
