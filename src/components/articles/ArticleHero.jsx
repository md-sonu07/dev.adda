

const ArticleHero = ({ post }) => {
    return (
        <header className="mb-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-6">
                <a className="text-slate-500 dark:text-[#92a4c9] text-sm hover:underline" href="#">Articles</a>
                <span className="text-slate-400 text-xs">/</span>
                <span className="text-primary text-sm font-medium">{post?.category?.categoryName || post?.category}</span>
            </nav>

            {/* Article Header Title */}
            <h1 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-extrabold leading-[1.1] tracking-tight mb-6">
                {post?.title}
            </h1>

            {/* Author Info Card */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-100 dark:bg-[#1a2233] border border-slate-200 dark:border-[#232f48]">
                <div className="flex items-center gap-4">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-14 ring-2 ring-primary/30"
                        style={{
                            backgroundImage: `url(${post?.author?.avatar || 'https://ui-avatars.com/api/?name=' + post?.author?.fullName + '&background=random'})`
                        }}
                    ></div>
                    <div className="flex flex-col">
                        <p className="text-slate-900 dark:text-white font-bold leading-none mb-1 text-lg">{post?.author?.fullName}</p>
                        <p className="text-slate-500 dark:text-[#92a4c9] text-sm font-medium">
                            {post?.author?.bio || 'Passionate Author'} • {new Date(post?.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                        </p>
                        <p className="text-primary text-xs font-bold uppercase tracking-wider mt-1">{post?.readTime || `${Math.ceil(post?.content?.split(' ').length / 200) || 5}`} min read</p>
                    </div>
                </div>
                <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                    Follow
                </button>
            </div>
        </header>
    );
};

export default ArticleHero;
