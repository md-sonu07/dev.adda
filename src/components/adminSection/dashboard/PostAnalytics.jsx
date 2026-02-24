import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';
import { useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';

const PostAnalytics = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState('Last 7 Days');
    const periods = ['Last 7 Days', 'Last 30 Days'];
    const { isDark } = useSelector((state) => state.theme);
    const { posts } = useSelector((state) => state.post);

    // Process real data for charts
    const chartData = useMemo(() => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const last7Days = [];

        // Initialize last 7 days with zero values
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            last7Days.push({
                dateStr: date.toDateString(),
                name: days[date.getDay()],
                posts: 0,
                views: 0
            });
        }

        // Fill with actual data
        posts?.forEach(post => {
            const postDate = new Date(post.createdAt).toDateString();
            const dayEntry = last7Days.find(d => d.dateStr === postDate);
            if (dayEntry) {
                dayEntry.posts += 1;
                dayEntry.views += (post.views || 0);
            }
        });

        return last7Days;
    }, [posts]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-card border border-default p-3 rounded-xl shadow-xl backdrop-blur-md">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="size-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                            <p className="text-xs font-bold text-body">
                                {entry.name}: <span className="text-primary">{entry.value}</span>
                            </p>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
            {/* Post Velocity Chart */}
            <div className="bg-card rounded-2xl border border-default p-6 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Activity Stream</h3>
                        <h2 className="text-sm font-black text-body uppercase tracking-widest">Daily Post</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 rounded-md">
                            <span className="size-1.5 bg-primary rounded-full"></span>
                            <span className="text-[9px] font-black text-primary uppercase">Live</span>
                        </span>
                    </div>
                </div>

                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#135bec" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#135bec" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fontWeight: 700, fill: isDark ? '#94a3b8' : '#64748b' }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fontWeight: 700, fill: isDark ? '#94a3b8' : '#64748b' }}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#135bec', strokeWidth: 1 }} />
                            <Area
                                type="monotone"
                                dataKey="posts"
                                name="New Posts"
                                stroke="#135bec"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorPosts)"
                                animationDuration={2000}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* View Engagement Chart */}
            <div className="bg-card rounded-2xl border border-default p-6 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Performance</h3>
                        <h2 className="text-sm font-black text-body uppercase tracking-widest">Engagement Depth</h2>
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="bg-box border border-default rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-widest outline-none focus:border-primary/50 flex items-center gap-2 hover:bg-default transition-all"
                        >
                            {selectedPeriod}
                            <HiChevronDown className={`text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 top-full mt-2 w-full min-w-[120px] bg-card border border-default rounded-2xl shadow-2xl overflow-hidden z-50 p-1.5"
                                    >
                                        {periods.map((period) => (
                                            <button
                                                key={period}
                                                onClick={() => {
                                                    setSelectedPeriod(period);
                                                    setIsOpen(false);
                                                }}
                                                className={`w-full text-left px-3 py-2.5 mb-1 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedPeriod === period
                                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                                    : 'hover:bg-box text-muted hover:text-body'
                                                    }`}
                                            >
                                                {period}
                                            </button>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fontWeight: 700, fill: isDark ? '#94a3b8' : '#64748b' }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fontWeight: 700, fill: isDark ? '#94a3b8' : '#64748b' }}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                            <Bar dataKey="views" name="Article Views" radius={[6, 6, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={index === 6 ? '#135bec' : (isDark ? '#1e293b' : '#e2e8f0')}
                                        className="transition-all duration-500 hover:fill-primary"
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default PostAnalytics;
