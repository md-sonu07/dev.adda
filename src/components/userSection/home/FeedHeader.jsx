import { IoOptionsOutline, IoChevronDownOutline } from 'react-icons/io5';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { getAllCategoriesAction } from '../../../redux/thunks/categoryThunk';
import { setCategory } from '../../../redux/slices/postSlice';
import { motion, AnimatePresence } from 'framer-motion';

function FeedHeader() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const { selectedCategory } = useSelector((state) => state.post);
    const { categories } = useSelector((state) => state.category);

    const q = searchParams.get('q');
    const isArticlesPage = location.pathname === '/articles';

    useEffect(() => {
        dispatch(getAllCategoriesAction());
    }, [dispatch]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCategorySelect = (categoryName) => {
        dispatch(setCategory(categoryName));
        setIsOpen(false);
        if (location.pathname !== '/articles') {
            navigate('/articles');
        }
    };

    const getHeadingText = () => {
        if (q) return <>Results for <span className="text-primary italic">"{q}"</span></>;

        const category = selectedCategory || 'Latest';
        const isTag = category.startsWith('#');
        const displayCategory = isTag ? category.slice(1) : category;

        if (isTag) return <>Topic: <span className="text-primary italic">#{displayCategory}</span></>;

        return <>{displayCategory} <span className="text-primary italic">{isArticlesPage ? 'Index' : 'Feed'}</span></>;
    };

    const getDescriptionText = () => {
        if (q) return `Found matching insights for your search`;
        if (selectedCategory && selectedCategory.startsWith('#')) return `Exploring stories tagged with #${selectedCategory.slice(1)}`;
        if (selectedCategory === 'Trending') return `The most read and discussed stories right now`;
        if (selectedCategory === 'Following') return `Latest updates from authors you follow`;
        if (selectedCategory === 'Authors') return `Discover the voices behind our top content`;

        return isArticlesPage ? `Explore our complete collection of stories` : `Curated intelligence for the modern engineer`;
    };

    return (
        <div className="relative">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

                {/* Heading */}
                <div className="border-l-[6px] border-primary pl-6 py-1">
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-body">
                        {getHeadingText()}
                    </h2>

                    <p className="text-[13px] font-medium text-muted mt-2 tracking-wide uppercase opacity-60">
                        {getDescriptionText()}
                    </p>
                </div>

                {/* Filter Button & Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`hidden sm:flex sticky sm:top-6 top-10 items-center gap-3 px-6 py-3 rounded-xl border cursor-pointer transition-all duration-300 shadow-sm group ${isOpen
                            ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                            : 'bg-box/50 border-box hover:border-primary/30 hover:bg-card text-body'
                            } text-[11px] font-black uppercase tracking-[0.2em]`}
                    >
                        <IoOptionsOutline className={`text-xl transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                        {selectedCategory && !selectedCategory.startsWith('#') && !['Latest', 'Trending', 'Following', 'Authors'].includes(selectedCategory)
                            ? selectedCategory
                            : 'Filters'}
                        <IoChevronDownOutline className={`text-lg transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute right-0 mt-3 w-64 z-100 bg-card/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2"
                            >
                                <div className="text-[10px] font-black uppercase tracking-widest text-muted/40 px-3 py-2 mb-1">
                                    Browse Categories
                                </div>
                                <div className="max-h-[300px] overflow-y-auto no-scrollbar space-y-1">
                                    <button
                                        onClick={() => handleCategorySelect('Latest')}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all ${selectedCategory === 'Latest'
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-muted hover:bg-box hover:text-body'
                                            }`}
                                    >
                                        Latest Feed
                                    </button>

                                    <div className="h-px bg-white/5 mx-2 my-2" />

                                    {categories && categories.length > 0 ? (
                                        categories.map((cat) => (
                                            <button
                                                key={cat._id}
                                                onClick={() => handleCategorySelect(cat.categoryName)}
                                                className={`w-full text-left px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all ${selectedCategory === cat.categoryName
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'text-muted hover:bg-box hover:text-body'
                                                    }`}
                                            >
                                                {cat.categoryName}
                                            </button>
                                        ))
                                    ) : (
                                        <div className="px-4 py-8 text-center text-xs text-muted/40 font-bold italic">
                                            No categories found
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}

export default FeedHeader;
