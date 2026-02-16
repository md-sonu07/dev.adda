import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAllPostsAction } from '../../redux/thunks/postThunk';
import SkeletonImage from '../common/SkeletonImage';
import { HiOutlineArrowRight, HiOutlinePhoto } from 'react-icons/hi2';

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
                <div className="rounded-2xl border border-default bg-card p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                        <h4 className="text-text-heading font-black text-sm uppercase tracking-widest">Trending Stories</h4>
                        <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                    </div>
                    <div className="flex flex-col gap-6">
                        {sidebarPosts.map((article) => (
                            <Link key={article._id} to={`/article/${article._id}`} className="group flex gap-4 items-start">
                                <div className="size-16 rounded-xl overflow-hidden shrink-0 border border-default">
                                    <SkeletonImage
                                        src={article.coverImage || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200"}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <p className="text-text-heading text-xs font-black leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                        {article.title}
                                    </p>
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase tracking-wider">
                                        <span>{article.readTime || '5 min'} read</span>
                                        <span>•</span>
                                        <span className="text-primary/70">{article.category?.categoryName || "General"}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <Link
                        to="/"
                        className="w-full mt-6 py-3 bg-box border border-default text-text-heading rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center gap-2 group"
                    >
                        Explore More
                        <HiOutlineArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            )}


            {/* Newsletter Card */}
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6 relative overflow-hidden group/news">
                <div className="absolute -top-10 -right-10 size-32 bg-primary/10 rounded-full blur-2xl group-hover/news:bg-primary/20 transition-colors" />

                <h4 className="text-text-heading font-black text-sm uppercase tracking-[0.15em] mb-2">DevDaily Weekly</h4>
                <p className="text-muted text-[11px] font-bold leading-relaxed mb-6">
                    Get the top curated developer news directly in your inbox every Sunday.
                </p>
                <div className="space-y-3">
                    <input
                        className="w-full bg-background border border-default rounded-xl p-3 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-hidden transition-all font-medium"
                        placeholder="Enter your email"
                        type="email"
                    />
                    <button className="w-full bg-primary text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all">
                        Subscribe Now
                    </button>
                </div>
                <p className="mt-4 text-[9px] text-muted text-center font-bold uppercase tracking-wider opacity-60">
                    No spam. Unsubscribe anytime.
                </p>
            </div>
        </aside>
    );
};

export default ArticleSidebar;
