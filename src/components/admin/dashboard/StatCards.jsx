import { useSelector } from 'react-redux';
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
    const { totalUsers } = useSelector((state) => state.user);
    const { posts } = useSelector((state) => state.post);
    const totalPosts = posts?.length || 0;
    const pendingPosts = posts?.filter(p => p.status === 'pending')?.length || 0;
    const approvedPosts = posts?.filter(p => p.status === 'approved')?.length || 0;
    const trustScore = totalPosts > 0 ? Math.round((approvedPosts / totalPosts) * 100) : 0;

    const stats = [
        {
            title: 'Total Users',
            value: totalUsers.toLocaleString(),
            icon: HiOutlineUsers,
            trend: `+${Math.floor(totalUsers * 0.05)}`,
            trendText: 'est. growth',
            color: 'bg-primary',
            data: [40, 60, 45, 70, 50, 85, 60, 90]
        },
        {
            title: 'Total Posts',
            value: totalPosts.toLocaleString(),
            icon: HiOutlineDocumentText,
            trend: `+${posts?.filter(p => new Date(p.createdAt).toDateString() === new Date().toDateString()).length}`,
            trendText: 'new today',
            color: 'bg-indigo-500',
            data: [30, 50, 40, 60, 55, 70, 65, 80]
        },
        {
            title: 'Pending Review',
            value: pendingPosts,
            icon: HiOutlineClock,
            trend: pendingPosts > 5 ? 'High' : 'Normal',
            trendText: 'workload status',
            color: 'bg-amber-500',
            data: [20, 40, 30, 50, 45, 60, 55, 75]
        },
        {
            title: 'Approval Rate',
            value: `${trustScore}%`,
            icon: HiOutlineShieldCheck,
            trend: trustScore > 80 ? '+High' : 'Neutral',
            trendText: 'platform health',
            color: 'bg-emerald-500',
            data: [50, 70, 60, 80, 75, 90, 85, 100]
        }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
};

export default StatCards;
