import { Link } from 'react-router-dom';
import SkeletonImage from '../common/SkeletonImage';
import { HiHome, HiCalendar, HiClock, HiShare } from 'react-icons/hi2';
import { motion } from 'framer-motion';

const ArticleHero = ({ post }) => {
    return (
        <header className="mb-12">
            {/* Simplified Breadcrumbs */}
            <nav className="flex items-center gap-3 mb-10 text-[10px] font-bold uppercase tracking-[0.22em] text-muted/80">
                <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1.5 group">
                    <HiHome className="text-[15px] opacity-60 group-hover:opacity-100 -translate-y-px" />
                    <span className="leading-none">Home</span>
                </Link>

                <span className="text-default/20 font-light -translate-y-[0.5px]">/</span>

                <Link to="/articles" className="hover:text-primary transition-colors leading-none">
                    Articles
                </Link>

                <span className="text-default/20 font-light -translate-y-[0.5px]">/</span>

                <span className="text-primary flex items-center gap-2 leading-none">
                    <span className="size-1 bg-primary rounded-full animate-pulse-soft translate-y-[0.5px]" />
                    {post?.category?.categoryName || post?.category || "Technology"}
                </span>
            </nav>

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
            >
                <h1 className="text-text-heading text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                    {post?.title}
                </h1>

                {/* Author & Actions Strip - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-default/60">
                    <div className="flex items-center gap-4">
                        <div className="relative group cursor-pointer shrink-0">
                            <div className="size-11 sm:size-12 rounded-full p-0.5 bg-linear-to-tr from-primary/20 to-transparent ring-1 ring-primary/10 group-hover:ring-primary/40 transition-all duration-500 shadow-md">
                                <div className="relative w-full h-full rounded-full overflow-hidden">
                                    <SkeletonImage
                                        src={post?.author?.avatar || `https://ui-avatars.com/api/?name=${post?.author?.fullName || 'A'}&background=random`}
                                        alt={post?.author?.fullName}
                                        customWidth={100}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 size-3.5 sm:size-4 bg-primary rounded-full border-2 border-background flex items-center justify-center shadow-sm">
                                <span className="text-[7px] sm:text-[8px] text-white">★</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 sm:gap-0.5">
                            <div className="flex items-center gap-2">
                                <p className="text-text-heading font-black text-sm tracking-tight leading-none group-hover:text-primary transition-colors">
                                    {post?.author?.fullName}
                                </p>
                                <span className="text-[8px] font-black uppercase tracking-widest text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                                    Pro
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted text-[10px] font-bold uppercase tracking-[0.1em]">
                                <span className="flex items-center gap-1 shrink-0">
                                    <HiCalendar className="text-xs opacity-60" />
                                    {new Date(post?.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                                </span>
                                <span className="hidden sm:block size-1 bg-default/80 rounded-full" />
                                <span className="flex items-center gap-1 shrink-0">
                                    <HiClock className="text-xs opacity-60" />
                                    {post?.readTime || `${Math.ceil(post?.content?.split(' ').length / 200) || 5}`} MIN READ
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-muted hover:text-primary font-black uppercase tracking-[0.2em] text-[10px] px-4 sm:px-5 py-2.5 rounded-[12px] border border-default/60 hover:border-primary/30 transition-all bg-background/50 backdrop-blur-sm group/share">
                            <HiShare className="text-sm transition-transform group-hover/share:-rotate-12" />
                            <span>Share</span>
                        </button>
                        <button className="flex-1 sm:flex-none bg-primary text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-[12px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] hover:shadow-[0_10px_20px_rgba(19,91,236,0.25)] transition-all active:scale-95 shadow-lg shadow-primary/10">
                            Follow Author
                        </button>
                    </div>
                </div>
            </motion.div>
        </header>
    );
};

export default ArticleHero;
