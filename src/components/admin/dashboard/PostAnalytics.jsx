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
import { useMemo } from 'react';

const PostAnalytics = () => {
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
                    <ResponsiveContainer width="100%" height="100%">
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
                    <select className="bg-box border border-default rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-widest outline-none focus:border-primary/50">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                    </select>
                </div>

                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
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
