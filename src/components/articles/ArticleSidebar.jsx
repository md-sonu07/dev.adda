import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAllPostsAction } from '../../redux/thunks/postThunk';
import SkeletonImage from '../common/SkeletonImage';
import { HiOutlineArrowRight, HiOutlinePhoto } from 'react-icons/hi2';
import { motion } from 'framer-motion';

const ArticleSidebar = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { posts, singlePost, loading } = useSelector((state) => state.post);

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
            {/* Current Story Poster / Fallback */}
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-default aspect-4/5 bg-box/10 dark:bg-box/5">
                {singlePost?.coverImage ? (
                    <>
                        <SkeletonImage
                            src={singlePost.coverImage}
                            alt={singlePost.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Glassmorphic Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">Featured Publication</span>
                            <h1 className="text-white font-black text-xl leading-tight mb-4 line-clamp-2">{singlePost.title}</h1>

                            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                <div className="size-8 rounded-full overflow-hidden border border-white/20">
                                    <SkeletonImage
                                        src={singlePost.author?.avatar || `https://ui-avatars.com/api/?name=${singlePost.author?.fullName}&background=random`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/90">
                                        {singlePost.author?.fullName}
                                    </span>
                                    <span className="text-[8px] font-bold text-primary uppercase tracking-tight">Verified Publisher</span>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="w-full h-full flex flex-col p-6">
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="size-16 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <HiOutlinePhoto className="text-3xl text-primary/30" />
                            </div>
                            <div className="space-y-1.5 px-4">
                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Visual Identity</p>
                                <p className="text-muted text-[11px] font-bold leading-relaxed">No cover illustration has been provided for this publication.</p>
                            </div>
                        </div>

                        {/* Author Info (Persistent fallback) */}
                        <div className="pt-4 border-t border-default/50">
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-full overflow-hidden border border-default">
                                    <SkeletonImage
                                        src={singlePost?.author?.avatar || `https://ui-avatars.com/api/?name=${singlePost?.author?.fullName}&background=random`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-text-heading">
                                        {singlePost?.author?.fullName}
                                    </span>
                                    <span className="text-[8px] font-bold text-primary uppercase tracking-tight">Verified Publisher</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Dynamic Articles Section */}
            {sidebarPosts.length > 0 && (
                <div className="rounded-3xl border border-default bg-card/30 backdrop-blur-sm p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="size-2 rounded-full bg-primary shadow-[0_0_10px_rgba(19,91,236,0.6)] animate-pulse" />
                            <h4 className="text-text-heading font-black text-[11px] uppercase tracking-[0.2em]">Latest Intel</h4>
                        </div>
                        <span className="text-[10px] font-bold text-muted/60 uppercase">Realtime</span>
                    </div>

                    <div className="flex flex-col gap-8">
                        {sidebarPosts.map((article, idx) => (
                            <motion.div
                                key={article._id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * idx }}
                            >
                                <Link to={`/article/${article._id}`} className="group flex gap-5 items-start">
                                    <div className="size-20 rounded-2xl overflow-hidden shrink-0 border border-default shadow-sm ring-4 ring-transparent group-hover:ring-primary/5 transition-all duration-500">
                                        <SkeletonImage
                                            src={article.coverImage || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200"}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-text-heading text-sm font-black leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                            {article.title}
                                        </p>
                                        <div className="flex items-center gap-3 text-[9px] font-black text-muted uppercase tracking-[0.1em]">
                                            <span className="bg-box px-2 py-0.5 rounded text-primary">{article.category?.categoryName || "Tech"}</span>
                                            <span>{article.readTime || '5m'} readout</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <Link
                        to="/"
                        className="w-full mt-10 py-4 bg-box border border-default text-text-heading rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 flex items-center justify-center gap-3 group shadow-sm hover:shadow-lg hover:shadow-primary/20"
                    >
                        Intel Feed
                        <HiOutlineArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
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
