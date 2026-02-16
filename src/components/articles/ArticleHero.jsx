import React from 'react';
import { Link } from 'react-router-dom';
import SkeletonImage from '../common/SkeletonImage';

const ArticleHero = ({ post }) => {
    return (
        <header className="mb-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-6 text-[10px] font-black uppercase tracking-widest">
                <Link className="text-muted hover:text-primary transition-colors" to="/articles">
                    Articles
                </Link>
                <span className="text-slate-400 text-xs translate-y-[0.5px]">/</span>
                <span className="text-primary">{post?.category?.categoryName || post?.category || "Technology"}</span>
            </nav>

            {/* Article Header Title */}
            <h1 className="text-text-heading text-3xl md:text-5xl font-black leading-[1.1] tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {post?.title}
            </h1>

            {/* Author Info Card */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-xl bg-box/40 border border-default shadow-sm group hover:bg-box/60 transition-all duration-300">
                <div className="flex items-center gap-4">
                    <div className="size-14 rounded-full overflow-hidden ring-4 ring-primary/5 group-hover:ring-primary/20 transition-all duration-500 shadow-inner bg-background">
                        <SkeletonImage
                            src={post?.author?.avatar || `https://ui-avatars.com/api/?name=${post?.author?.fullName || 'A'}&background=random`}
                            alt={post?.author?.fullName}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-text-heading font-black leading-none mb-1.5 text-lg">{post?.author?.fullName}</p>
                        <p className="text-muted text-sm font-bold">
                            {post?.author?.bio || 'Passionate Author'} • {new Date(post?.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                        </p>
                        <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mt-1.5">{post?.readTime || `${Math.ceil(post?.content?.split(' ').length / 200) || 5}`} min read</p>
                    </div>
                </div>
                <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
                    Follow
                </button>
            </div>
        </header>
    );
};

export default ArticleHero;
