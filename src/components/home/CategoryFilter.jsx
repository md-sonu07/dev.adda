

function CategoryFilter() {
    const categories = ['Trending', 'Latest', 'Following'];
    const tags = ['#AI', '#React', '#Rust'];

    return (
        <div className="w-full pt-8 sm:pt-12 px-4 sm:px-14">
            <div className="inline-flex items-center gap-2 p-1.5 dark:bg-black/30 bg-black/30 backdrop-blur-3xl rounded-xl border border-white/10 shadow-2xl overflow-x-auto no-scrollbar scroll-smooth w-full sm:w-auto">
                {categories.map((category, index) => (
                    <button
                        key={category}
                        className={`px-6 py-2.5 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap ${index === 0
                            ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105'
                            : 'bg-transparent text-white/70 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        {category}
                    </button>
                ))}

                {/* Refined Divider */}
                <div className="h-4 w-px bg-white/10 mx-3 shrink-0"></div>

                {tags.map((tag) => (
                    <button
                        key={tag}
                        className="px-5 py-2.5 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white hover:bg-white/5 transition-all duration-500 whitespace-nowrap"
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;
