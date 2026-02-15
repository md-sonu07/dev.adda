
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../redux/slices/postSlice';
import { motion } from 'framer-motion';

function CategoryFilter() {
    const dispatch = useDispatch();
    const { selectedCategory } = useSelector((state) => state.post);

    const categories = ['Trending', 'Latest', 'Following'];
    const tags = ['AI', 'React', 'Rust'];

    const handleSelect = (category) => {
        dispatch(setCategory(category));
    };

    return (
        <div className="w-full pt-8 sm:pt-12 md:pt-12 px-4 sm:px-14">
            <div className="inline-flex items-center gap-2 p-1.5 dark:bg-black/30 bg-black/30 backdrop-blur-3xl rounded-xl border border-white/10 shadow-2xl overflow-x-auto no-scrollbar scroll-smooth w-full sm:w-auto">
                {categories.map((category) => {
                    const isActive = selectedCategory === category;
                    return (
                        <button
                            key={category}
                            onClick={() => handleSelect(category)}
                            className={`relative px-6 py-2.5 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-300 whitespace-nowrap cursor-pointer hover:text-white ${isActive ? 'text-white' : 'text-white/70'
                                }`}
                        >
                            {/* Magic Background Pill */}
                            {isActive && (
                                <motion.div
                                    layoutId="magic-pill"
                                    className="absolute inset-0 bg-primary rounded-xl shadow-xl shadow-primary/20"
                                    transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{category}</span>
                        </button>
                    );
                })}

                {/* Refined Divider */}
                <div className="h-4 w-px bg-white/10 mx-3 shrink-0"></div>

                {tags.map((tag) => {
                    const tagWithHash = `#${tag}`;
                    const isActive = selectedCategory === tagWithHash;
                    return (
                        <button
                            key={tag}
                            onClick={() => handleSelect(tagWithHash)}
                            className={`relative px-5 py-2.5 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-300 whitespace-nowrap cursor-pointer ${isActive ? 'text-primary' : 'text-white/40 hover:text-white'
                                }`}
                        >
                            {/* Tag Active Indicator */}
                            {isActive && (
                                <motion.div
                                    layoutId="tag-pill"
                                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl shadow-lg shadow-primary/5"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                />
                            )}
                            <span className="relative z-10">#{tag}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default CategoryFilter;
