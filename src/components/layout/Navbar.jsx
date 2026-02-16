import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { IoSearch, IoAdd, IoBookmarksOutline, IoNotificationsOutline, IoCloseOutline } from 'react-icons/io5';
import { useState, useEffect, useRef } from 'react';
import { HiOutlineMoon, HiOutlineSun, HiOutlineShieldCheck } from 'react-icons/hi2';

import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/slices/themeSlice';
import toast from 'react-hot-toast';

import Logo from '../common/Logo';
import SkeletonImage from '../common/SkeletonImage';
import { getAllPostsAction } from '../../redux/thunks/postThunk';
import { HiOutlineArrowRight } from 'react-icons/hi2';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const { isDark } = useSelector((state) => state.theme);
    const { isAdmin, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const searchInputRef = useRef(null);

    useEffect(() => {
        setSearchQuery(searchParams.get('q') || '');
    }, [searchParams]);

    // Handle ⌘K or Ctrl+K shortcut
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Live Feed Search: Update URL automatically as user types
    useEffect(() => {
        // Only trigger this logic if we are on the home page
        const isHomePage = location.pathname === '/';
        if (!isHomePage) return;

        const hasSearchQuery = searchParams.get('q');

        const timeoutId = setTimeout(() => {
            if (searchQuery.trim()) {
                navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
            } else if (hasSearchQuery) {
                // If input is empty but URL still has 'q', reset to home
                navigate('/');
            }
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [searchQuery, navigate, searchParams, location.pathname]);

    // Live search dropdown (for quick previews)
    useEffect(() => {
        if (searchQuery.length < 2) {
            setSearchResults([]);
            return;
        }

        const timeoutId = setTimeout(async () => {
            setIsSearching(true);
            try {
                const response = await dispatch(getAllPostsAction({ q: searchQuery })).unwrap();
                setSearchResults(response.posts.slice(0, 5));
            } catch (err) {
                console.error("Live search failed:", err);
            } finally {
                setIsSearching(false);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, dispatch]);

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchResults([]);
            searchInputRef.current?.blur();
        }
        if (e.key === 'Escape') {
            searchInputRef.current?.blur();
            setSearchResults([]);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        navigate('/');
    };

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
        toast.success(`${!isDark ? 'Dark' : 'Light'} Mode Activated`, {
            icon: !isDark ? <HiOutlineMoon className="text-primary" /> : <HiOutlineSun className="text-orange-500" />,
            duration: 2000,
        });
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-default bg-card/80 backdrop-blur-xl transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-4 md:gap-8">

                {/* LEFT: LOGO */}
                <Logo collapsed={searchQuery.length > 0} />

                {/* CENTER: SEARCH */}
                <div className="flex-1 max-w-xl ">
                    <div className="relative group flex items-center">
                        <div className="absolute left-4 z-10 text-muted/40 group-focus-within:text-primary transition-colors duration-300">
                            <IoSearch className="text-lg" />
                        </div>

                        <input
                            ref={searchInputRef}
                            className="w-full bg-box/30 hover:bg-box/50 text-body border border-default rounded-lg py-2.5 pl-11 pr-14 text-sm transition-all outline-none duration-300 focus:bg-card focus:border-primary/50 focus:ring-4 focus:ring-primary/10 placeholder:text-muted/40"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            placeholder="Search articles..."
                            type="text"
                        />

                        <div className="absolute right-3 flex items-center gap-1">
                            {searchQuery && (
                                <>
                                    <button
                                        onClick={clearSearch}
                                        type="button"
                                        className="p-1.5 hover:bg-box rounded-md transition-colors text-muted hover:text-primary cursor-pointer active:scale-90"
                                        title="Clear search"
                                    >
                                        <IoCloseOutline className="text-xl" />
                                    </button>
                                    <div className="w-1 h-4 bg-default mx-1"></div>
                                </>
                            )}

                            {!searchQuery && (
                                <kbd className="hidden md:flex items-center gap-1  px-1 bg-box border border-default rounded text-[10px] font-bold text-muted/60 shadow-sm uppercase">
                                    <span className="text-sm">⌘</span>
                                    <span>K</span>
                                </kbd>
                            )}

                            {searchQuery && (
                                <button
                                    onClick={() => {
                                        navigate(`/?q=${searchQuery}`);
                                        setSearchResults([]);
                                    }}
                                    className="flex items-center p-1.5 bg-primary/10 text-primary rounded-md hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
                                >
                                    <IoSearch className="text-sm" />
                                </button>
                            )}
                        </div>

                        {/* Search Results Dropdown */}
                        {searchQuery.length >= 2 && (isSearching || searchResults.length > 0) ? (
                            <>
                                {/* Click-away overlay */}
                                <div
                                    className="fixed inset-0 z-90"
                                    onClick={() => setSearchResults([])}
                                />
                                <div className="absolute top-[calc(100%+8px)] inset-x-0 bg-card/80 dark:bg-black/60 border border-default rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-100 backdrop-blur-xl">
                                    <div className="p-2">
                                        {isSearching ? (
                                            <div className="flex items-center justify-center py-8 gap-3">
                                                <div className="size-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                                                <span className="text-xs font-bold text-muted uppercase tracking-widest">Searching...</span>
                                            </div>
                                        ) : (
                                            <div className="space-y-1">
                                                {searchResults.map((post) => (
                                                    <Link
                                                        key={post._id}
                                                        to={`/article/${post._id}`}
                                                        onClick={() => {
                                                            setSearchResults([]);
                                                        }}
                                                        className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-box/50 transition-all group/item"
                                                    >
                                                        <div className="size-12 rounded-lg overflow-hidden border border-default shrink-0">
                                                            <SkeletonImage src={post.coverImage} alt={post.title} className="w-full h-full" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-sm font-bold text-body truncate group-hover/item:text-primary transition-colors">{post.title}</h4>
                                                            <p className="text-[10px] text-muted font-black uppercase tracking-tight mt-1 truncate">
                                                                {post.author?.fullName} • {post.category?.categoryName}
                                                            </p>
                                                        </div>
                                                        <HiOutlineArrowRight className="opacity-0 group-hover/item:opacity-100 group-hover/item:text-primary transition-all pr-1" />
                                                    </Link>
                                                ))}

                                                <button
                                                    onClick={() => {
                                                        navigate(`/?q=${searchQuery}`);
                                                        setSearchResults([]);
                                                    }}
                                                    className="w-full mt-2 py-3 bg-primary/5 hover:bg-primary/10 text-primary dark:text-white text-[10px] font-black uppercase tracking-widest transition-all rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                                                >
                                                    See all results for "{searchQuery}"
                                                    <HiOutlineArrowRight />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>

                {/* RIGHT: ACTIONS */}
                <div className="flex items-center gap-2 sm:gap-4 shrink-0">

                    {/* ALWAYS SHOW: Story Button (Redirects to login if guest) */}
                    <Link
                        to={user ? "/create-post" : "/login"}
                        className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 slant-glow group"
                    >
                        <IoAdd className="text-xl group-hover:rotate-90 transition-transform duration-500" />
                        <span className="tracking-tight">Story</span>
                    </Link>

                    {user ? (
                        <>
                            {/* User Action Island */}
                            <div className="flex items-center gap-1 p-1 bg-box/40 rounded-xl border border-default transition-all duration-500 overflow-hidden sm:opacity-100 sm:w-auto max-sm:w-0 max-sm:opacity-0 max-sm:p-0 max-sm:border-0 max-sm:pointer-events-none">
                                {/* Theme Toggle */}
                                <button
                                    onClick={handleThemeToggle}
                                    className="p-2 rounded-xl text-muted hover:text-primary hover:bg-card active:scale-90 transition-all duration-200 cursor-pointer"
                                    title={isDark ? 'Light Mode' : 'Dark Mode'}
                                >
                                    {isDark ? <HiOutlineSun className="text-xl shrink-0" /> : <HiOutlineMoon className="text-xl shrink-0" />}
                                </button>

                                {/* Bookmarks */}
                                <Link
                                    to="/bookmarks"
                                    className="p-2 rounded-xl text-muted hover:text-primary hover:bg-card transition-all duration-200 "
                                >
                                    <IoBookmarksOutline className="text-xl shrink-0" />
                                </Link>

                                {/* Notifications */}
                                <Link
                                    to="/notifications"
                                    className="p-2 rounded-xl text-muted hover:text-primary hover:bg-card relative transition-all duration-200"
                                >
                                    <IoNotificationsOutline className="text-xl shrink-0" />
                                    <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                    </span>
                                </Link>
                            </div>

                            {/* Admin Dashboard */}
                            {isAdmin && (
                                <Link
                                    to="/admin/dashboard"
                                    className="p-2.5 hidden sm:flex rounded-lg text-primary bg-primary/5 hover:bg-primary/10 border border-primary/20 transition-all duration-200 shrink-0"
                                    title="Admin Dashboard"
                                >
                                    <HiOutlineShieldCheck className="text-xl" />
                                </Link>
                            )}

                            {/* Profile */}
                            <Link
                                to="/profile"
                                className="group relative shrink-0"
                            >
                                <div className="h-10 w-10 rounded-xl overflow-hidden border-2 border-default group-hover:border-primary/60 group-hover:scale-105 transition-all duration-500 shadow-sm">
                                    <SkeletonImage
                                        src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.fullName || 'User'}&background=random`}
                                        alt="Profile"
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-green-500 rounded-full border-2 border-background shadow-md"></div>
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            {/* Theme Toggle for guests */}
                            <button
                                onClick={handleThemeToggle}
                                className="p-2.5 rounded-xl text-muted hover:text-primary hover:bg-box/50 active:scale-95 transition-all duration-200 cursor-pointer border border-transparent hover:border-default shadow-sm"
                                title={isDark ? 'Light Mode' : 'Dark Mode'}
                            >
                                {isDark ? <HiOutlineSun className="text-xl shrink-0" /> : <HiOutlineMoon className="text-xl shrink-0" />}
                            </button>

                            <Link
                                to="/login"
                                className="px-6 py-2.5 rounded-xl bg-box/50 text-body border border-default text-sm font-bold hover:bg-box hover:border-primary/30 transition-all duration-300"
                            >
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;