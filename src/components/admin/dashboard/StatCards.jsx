import React from 'react';
import { HiOutlineUsers, HiOutlineDocumentText, HiOutlineClock, HiOutlineShieldCheck } from 'react-icons/hi2';

const StatCard = ({ title, value, icon: Icon, trend, trendText, color, data }) => (
    <div className="bg-card p-6 rounded-2xl border border-default shadow-sm hover:border-primary/40 transition-all hover:shadow-xl hover:shadow-primary/5 group">
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">{title}</p>
                <h3 className="text-2xl font-black text-body tracking-tight">{value}</h3>
            </div>
            <div className={`p-2.5 ${color} bg-opacity-10 rounded-xl border border-default group-hover:scale-110 transition-transform`}>
                <Icon className={`text-xl text-white`} />
            </div>
        </div>

        {/* Decorative Sparkline Bars */}
        <div className="flex items-end gap-1 h-8 mb-4">
            {data.map((h, i) => (
                <div
                    key={i}
                    className={`flex-1 rounded-sm opacity-20 group-hover:opacity-40 transition-all ${color}`}
                    style={{ height: `${h}%` }}
                />
            ))}
        </div>

        <div className={`flex items-center text-[10px] font-black uppercase tracking-widest ${trend.includes('+') ? 'text-emerald-500' : 'text-amber-500'}`}>
            <span className="mr-1.5 px-1.5 py-0.5 rounded bg-current/10 border border-current/20">{trend}</span>
            <span className="text-muted">{trendText}</span>
        </div>
    </div>
);

const StatCards = () => {
    const stats = [
        {
            title: 'Total Users',
            value: '12,482',
            icon: HiOutlineUsers,
            trend: '+5.2%',
            trendText: 'vs last month',
            color: 'bg-primary',
            data: [40, 60, 45, 70, 50, 85, 60, 90]
        },
        {
            title: 'Total Posts',
            value: '1,042',
            icon: HiOutlineDocumentText,
            trend: '+12',
            trendText: 'new today',
            color: 'bg-indigo-500',
            data: [30, 50, 40, 60, 55, 70, 65, 80]
        },
        {
            title: 'Pending Review',
            value: '24',
            icon: HiOutlineClock,
            trend: '8 Urgent',
            trendText: 'priority items',
            color: 'bg-amber-500',
            data: [20, 40, 30, 50, 45, 60, 55, 75]
        },
        {
            title: 'Verified Authors',
            value: '89%',
            icon: HiOutlineShieldCheck,
            trend: '+2.4%',
            trendText: 'trust score growth',
            color: 'bg-emerald-500',
            data: [50, 70, 60, 80, 75, 90, 85, 100]
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
};

export default StatCards;
