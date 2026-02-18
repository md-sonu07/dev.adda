import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAllPostsAction } from '../../redux/thunks/postThunk';
import SkeletonImage from '../common/SkeletonImage';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { motion } from 'framer-motion';

const ArticleSidebar = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { posts, loading } = useSelector((state) => state.post);

    useEffect(() => {
        if (posts.length === 0) {
            dispatch(getAllPostsAction());
        }
    }, [dispatch, posts.length]);

    // Filter posts to show related/trending ones (excluding current)
    const sidebarPosts = posts
        .filter(post => post._id !== id && post.status === 'approved')
        .slice(0, 4);

    if (loading && posts.length === 0) {
        return (
            <aside className="hidden lg:flex flex-col gap-8 w-[320px] animate-pulse">
                <div className="h-64 bg-box/40 rounded-2xl" />
                <div className="h-48 bg-box/40 rounded-2xl" />
            </aside>
        );
    }

    return (
        <aside className="hidden lg:flex flex-col gap-8 w-[320px]">

            {/* Dynamic Articles Section */}
            {sidebarPosts.length > 0 && (
                <div className="rounded-[24px] border border-default bg-card/30 backdrop-blur-sm p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2.5">
                            <div className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(19,91,236,0.5)] animate-pulse" />
                            <h4 className="text-text-heading font-black text-[10px] uppercase tracking-[0.2em]">Latest Intel</h4>
                        </div>
                        <span className="text-[9px] font-black text-muted/40 uppercase tracking-widest">Live</span>
                    </div>

                    <div className="flex flex-col gap-6">
                        {sidebarPosts.map((article, idx) => (
                            <motion.div
                                key={article._id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * idx }}
                            >
                                <Link to={`/article/${article._id}`} className="group flex gap-4 items-center">
                                    <div className="size-16 rounded-[14px] overflow-hidden shrink-0 border border-default/60 shadow-xs ring-4 ring-transparent group-hover:ring-primary/5 transition-all duration-500">
                                        <SkeletonImage
                                            src={article.coverImage || "No Image"}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <p className="text-text-heading text-[13px] font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                            {article.title}
                                        </p>
                                        <div className="flex items-center gap-2.5 text-[8.5px] font-black text-muted/70 uppercase tracking-[0.1em]">
                                            <span className="text-primary/80">{article.category?.categoryName || "Tech"}</span>
                                            <span className="size-0.5 rounded-full bg-default/50" />
                                            <span>{article.readTime || '5m'} read</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <Link
                        to="/"
                        className="w-full mt-7 py-3 bg-secondary/30 border border-default/80 text-text-heading rounded-xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 flex items-center justify-center gap-2.5 group shadow-xs hover:shadow-lg hover:shadow-primary/20"
                    >
                        Intel Feed
                        <HiOutlineArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            )}


            {/* Premium Newsletter Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="rounded-3xl bg-linear-to-br from-primary/10 via-background to-primary/5 border border-primary/20 p-8 relative overflow-hidden group/news shadow-xl shadow-primary/5"
            >
                <div className="absolute top-0 right-0 size-40 bg-primary/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover/news:bg-primary/30 transition-colors" />

                <div className="relative z-10">
                    <div className="size-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                        <span className="text-primary text-xl">✨</span>
                    </div>
                    <h4 className="text-text-heading font-black text-lg leading-tight mb-3">DevDaily Digest</h4>
                    <p className="text-muted text-[13px] font-medium leading-relaxed mb-8">
                        The web's most curated developer news, delivered to your inbox every Sunday.
                    </p>
                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                className="w-full bg-background/50 backdrop-blur-md border border-default rounded-2xl p-4 text-[13px] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-hidden transition-all font-bold placeholder:font-medium shadow-inner"
                                placeholder="name@domain.com"
                                type="email"
                            />
                        </div>
                        <button className="w-full bg-primary text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-300">
                            Join 10k+ Devs
                        </button>
                    </div>
                    <p className="mt-6 text-[10px] text-muted/60 text-center font-bold uppercase tracking-[0.1em]">
                        No spam. One-click unsubscribe.
                    </p>
                </div>
            </motion.div>
        </aside>
    );
};

export default ArticleSidebar;
