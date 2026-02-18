import ArticleMobileActions from './ArticleMobileActions';
import SkeletonImage from '../common/SkeletonImage';
import './ArticleContent.css';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiMaximize, FiMinimize } from 'react-icons/fi';

const ArticleContent = ({ post }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null);

    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const handleViewImage = () => {
        window.open(post.coverImage, '_blank');
    };

    return (
        <section className="transition-all duration-300">
            {/* Main Article Poster with Premium Hover Options */}
            {post?.coverImage && (
                <div
                    ref={containerRef}
                    className="group relative mb-12 rounded-3xl overflow-hidden shadow-2xl border border-default bg-box"
                >
                    <SkeletonImage
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-auto aspect-video object-cover transition-transform duration-1000 group-hover:scale-105"
                    />

                    {/* Gradient Overlay (Always subtly present, strong on hover) */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Revealable Content on Hover */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="flex-1 max-w-[75%]">
                                <span className="text-primary-light text-[10px] font-black uppercase tracking-[0.3em] mb-3 block">Perspective Image</span>
                                <h3 className="text-white text-2xl md:text-3xl font-black leading-tight drop-shadow-lg">
                                    {post?.title}
                                </h3>
                            </div>

                            <div className="flex gap-3 shrink-0">
                                <button
                                    onClick={handleViewImage}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl active:scale-95"
                                >
                                    <FiExternalLink size={16} />
                                    View Source
                                </button>
                                <button
                                    onClick={toggleFullscreen}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-[11px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-[0_10px_20px_rgba(19,91,236,0.4)] active:scale-95"
                                >
                                    {isFullscreen ? <FiMinimize size={16} /> : <FiMaximize size={16} />}
                                    {isFullscreen ? 'Exit' : 'Full Focus'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
