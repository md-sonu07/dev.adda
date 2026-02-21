import ArticleMobileActions from './ArticleMobileActions';
import SkeletonImage from '../common/SkeletonImage';
import './ArticleContent.css';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMaximize, FiX } from 'react-icons/fi';

const ArticleContent = ({ post }) => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    return (
        <section className="transition-all duration-300">
            {/* Main Article Poster with Premium Hover Options */}
            {post?.coverImage && (
                <div
                    className="group relative mb-12 rounded-3xl overflow-hidden shadow-2xl border border-default bg-box cursor-zoom-in"
                    onClick={() => setIsLightboxOpen(true)}
                >
                    <SkeletonImage
                        src={post.coverImage}
                        alt={post.title}
                        fetchPriority="high"
                        loading="eager"
                        customWidth={700}
                        className="w-full h-auto aspect-video object-cover transition-transform duration-1000 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Single Interactive Button - Mobile Optimized */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                        <div className="flex items-end justify-between gap-6">
                            <div className="flex-1">
                                <span className="text-primary-light text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] mb-2 sm:mb-3 block">Perspective Image</span>
                                <h3 className="text-white text-xl sm:text-3xl font-black leading-tight drop-shadow-lg line-clamp-2">
                                    {post?.title}
                                </h3>
                            </div>

                            <div className="shrink-0 flex items-center justify-center">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-primary text-white text-[10px] sm:text-[11px] font-black uppercase tracking-widest shadow-[0_10_20_rgba(19,91,236,0.3)] transition-all"
                                >
                                    <FiMaximize size={16} />
                                    <span className="hidden sm:inline">Expand View</span>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Premium Lightbox Popup */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsLightboxOpen(false)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 bg-black/95 backdrop-blur-md cursor-zoom-out"
                    >
                        <motion.button
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="absolute top-6 right-6 size-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-60"
                            onClick={() => setIsLightboxOpen(false)}
                        >
                            <FiX size={24} />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative max-w-7xl max-h-full overflow-hidden rounded-2xl shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-full object-contain max-h-[85vh]"
                            />
                            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 bg-linear-to-t from-black/80 via-black/40 to-transparent">
                                <div className="max-w-3xl">
                                    <span className="text-primary-light text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">Viewing High Resolution</span>
                                    <h2 className="text-white text-xl sm:text-2xl font-black leading-tight">
                                        {post?.title}
                                    </h2>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Premium Article Typography Container */}
            <div
                className="article-content-body mb-12 prose dark:prose-invert max-w-none 
                prose-p:text-text-body prose-p:text-[1.15rem] prose-p:leading-[1.8] prose-p:mb-6
                prose-headings:text-text-heading prose-headings:font-black prose-headings:tracking-tight
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:px-8 prose-blockquote:py-2 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-xl
                prose-img:rounded-3xl prose-img:shadow-xl
                prose-code:bg-box prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:text-primary prose-code:font-bold
                prose-strong:text-text-heading prose-strong:font-black"
                dangerouslySetInnerHTML={{ __html: post?.content }}
            />

            {/* Dynamic Tags */}
            <div className="flex flex-wrap gap-2 mt-10 mb-12">
                {post?.tags?.map((tag, idx) => (
                    <span
                        key={idx}
                        className="px-3.5 py-1.5 rounded-xl bg-box border border-default text-muted text-[10px] font-black uppercase tracking-widest hover:border-primary/40 hover:text-primary transition-all cursor-pointer"
                    >
                        #{tag}
                    </span>
                ))}
            </div>


            <ArticleMobileActions />
        </section>
    );
};

export default ArticleContent;
