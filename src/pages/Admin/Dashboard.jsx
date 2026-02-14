import WelcomeHeader from '../../components/admin/dashboard/WelcomeHeader';
import StatCards from '../../components/admin/dashboard/StatCards';
import RecentPosts from '../../components/admin/dashboard/RecentPosts';
import TopAuthors from '../../components/admin/dashboard/TopAuthors';
import SystemOverview from '../../components/admin/dashboard/SystemOverview';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserProfileAction } from '../../redux/thunks/userThunk';
import { getAllPostsAction } from '../../redux/thunks/postThunk';

const Dashboard = () => {
    const { user } = useSelector(state => state.auth);
    const { posts } = useSelector(state => state.post);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProfileAction());
        dispatch(getAllPostsAction());
    }, [dispatch]);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Welcome Section */}
            <WelcomeHeader adminName={user?.fullName || 'Admin'} />

            {/* Stat Cards Section */}
            <StatCards />

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-8">
                {/* Main Content Area */}
                <div className="xl:col-span-3 space-y-8">
                    {/* Recent Posts Table */}
                    <div className="min-h-[400px]">
                        <RecentPosts posts={posts} />
                    </div>

                    {/* Data Visualization Placeholder / Second Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <SystemOverview />
                        <TopAuthors />
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    <div className="bg-card rounded-2xl border border-default p-6 shadow-sm">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-muted mb-6">Quick Actions</h3>
                        <div className="space-y-3">
                            {[
                                { label: 'New Campaign', color: 'bg-primary' },
                                { label: 'Audit Logs', color: 'bg-box' },
                                { label: 'Deploy Updates', color: 'bg-box' },
                                { label: 'Server Restart', color: 'bg-rose-500/10 text-rose-500 border border-rose-500/20' }
                            ].map((btn, i) => (
                                <button key={i} className={`w-full py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 ${btn.color.includes('bg-primary') ? 'bg-primary text-white shadow-lg shadow-primary/20' : btn.color
                                    }`}>
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-primary/5 rounded-2xl border border-primary/10 p-6">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Editor's Tip</h3>
                        <p className="text-xs font-bold text-body/80 leading-relaxed">
                            Maintain high engagement by scheduling "Breaking" alerts during peak traffic hours (9 AM - 11 AM UTC).
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-12 flex flex-col md:flex-row items-center justify-between text-muted text-[10px] font-black uppercase tracking-widest pb-8 border-t border-default pt-6">
                <p>© 2024 DevAdda Intelligence Hub. Final version 2.4.1</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a className="hover:text-primary transition-colors" href="#">Diagnostics</a>
                    <a className="hover:text-primary transition-colors" href="#">Security API</a>
                    <a className="hover:text-primary transition-colors" href="#">Node Status</a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
