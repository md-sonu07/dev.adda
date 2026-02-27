import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../../redux/slices/postSlice';
import { getAllCategoriesAction } from '../../../redux/thunks/categoryThunk';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

function CategoryFilter() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedCategory, posts } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(getAllCategoriesAction());
    }, [dispatch]);

    const isArticlesPage = location.pathname === '/articles';

    // 1. Standard Filters
    const standardFilters = ['Latest', 'Trending', 'Following', 'Authors'];

    // 2. Tags from most liked posts (top 4)
    const mostLikedTags = Array.from(new Set(
        [...posts]
            .sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0))
            .flatMap(post => post.tags || [])
    )).slice(0, 4);
    const tags = mostLikedTags;

    const handleSelect = (category) => {
        dispatch(setCategory(category));

        // If not 'Latest' and not already on /articles, navigate to /articles
        if (category !== 'Latest' && location.pathname !== '/articles') {
            navigate('/articles');
        }
    };

    return (
        <div className={`w-full transition-all duration-500 overflow-hidden ${isArticlesPage ? 'pt-0' : 'pt-8 sm:pt-12'}`}>
            <div className={`flex items-center gap-2 p-1.5 rounded-xl border transition-all duration-500 overflow-x-auto no-scrollbar scroll-smooth w-full sm:w-max max-w-full ${isArticlesPage
                ? "bg-box border-default shadow-sm"
                : "dark:bg-black/30 bg-black/30 backdrop-blur-3xl border-white/10 shadow-2xl"
                }`}>

                {/* SECTION 1: Standard Filters */}
                {standardFilters.map((filter) => {
                    const isActive = selectedCategory === filter;
                    return (
                        <button
                            key={filter}
                            onClick={() => handleSelect(filter)}
                            className={`relative px-4 py-2.5 rounded-xl text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 whitespace-nowrap cursor-pointer shrink-0 ${isActive
                                ? 'text-white'
                                : isArticlesPage ? 'text-muted hover:text-body' : 'text-white/70 hover:text-white'
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="magic-pill"
                                    className="absolute inset-0 bg-primary rounded-xl shadow-xl shadow-primary/20"
                                    transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{filter}</span>
                        </button>
                    );
                })}

                {/* Divider */}
                <div className={`h-4 w-px mx-3 shrink-0 ${isArticlesPage ? 'bg-default' : 'bg-white/10'}`}></div>

                {/* SECTION 2: Tags */}
                {tags.map((tag) => {
                    const tagWithHash = `#${tag}`;
                    const isActive = selectedCategory === tagWithHash;
                    return (
                        <button
                            key={tag}
                            onClick={() => handleSelect(tagWithHash)}
                            className={`relative px-5 py-2.5 rounded-xl text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 whitespace-nowrap cursor-pointer shrink-0 ${isActive
                                ? 'text-primary'
                                : isArticlesPage ? 'text-muted/60 hover:text-body' : 'text-white/40 hover:text-white'
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="tag-pill"
                                    className={`absolute inset-0 border rounded-xl shadow-lg shadow-primary/5 ${isArticlesPage ? 'bg-primary/5 border-primary/20' : 'bg-primary/10 border-primary/20'
                                        }`}
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

