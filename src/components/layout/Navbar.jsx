import { Link } from 'react-router-dom'
import { IoSearch, IoAdd, IoBookmarksOutline, IoNotificationsOutline } from 'react-icons/io5';
import { useState } from 'react';
import { HiOutlineMoon, HiOutlineSun, HiOutlineShieldCheck } from 'react-icons/hi2';

import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/slices/themeSlice';

import Logo from '../common/Logo';

function Navbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const { isDark } = useSelector((state) => state.theme);
    const { isAdmin, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-default bg-card/80 backdrop-blur-xl transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-4 md:gap-8">

                {/* LEFT: LOGO */}
                <Logo collapsed={searchQuery.length > 0} />

                {/* CENTER: SEARCH */}
                <div className="flex-1 max-w-xl">
                    <div className="relative group flex items-center">
                        <div className="absolute left-4 z-10 text-muted/40 group-focus-within:text-primary transition-colors duration-300">
                            <IoSearch className="text-lg" />
                        </div>

                        <input
                            className="w-full bg-box/30 hover:bg-box/50 text-body border border-default rounded-lg py-2.5 pl-11 pr-14 text-sm transition-all outline-none duration-300 focus:bg-card focus:border-primary/50 focus:ring-4 focus:ring-primary/10 placeholder:text-muted/40"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search articles..."
                            type="text"
                        />

                        <div className="absolute right-3 hidden md:flex items-center pointer-events-none group-focus-within:hidden transition-all">
                            <kbd className="flex items-center gap-1 px-1.5 py-1 bg-box border border-default rounded text-[10px] font-bold text-muted/60 shadow-sm uppercase">
                                <span>⌘</span>
                                <span>K</span>
                            </kbd>
                        </div>
                    </div>
                </div>

                {/* RIGHT: ACTIONS */}
                <div className="flex items-center gap-2 sm:gap-4 shrink-0">

                    {/* Enhanced Create Button */}
                    <Link
                        to="/create-post"
                        className="hidden md:flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 slant-glow group"
                    >
                        <IoAdd className="text-xl group-hover:rotate-90 transition-transform duration-500" />
                        <span className="tracking-tight">Story</span>
                    </Link>

                    {/* Action Group Island */}
                    <div className="flex items-center gap-1 p-1 bg-box/40 rounded-xl border border-default">
                        {/* Theme Toggle */}
                        <button
                            onClick={() => dispatch(toggleTheme())}
                            className="p-2 rounded-xl text-muted hover:text-primary hover:bg-card active:scale-90 transition-all duration-200 cursor-pointer"
                            title={isDark ? 'Light Mode' : 'Dark Mode'}
                        >
                            {isDark ? <HiOutlineSun className="text-xl shrink-0" /> : <HiOutlineMoon className="text-xl shrink-0" />}
                        </button>

                        {/* Bookmarks */}
                        <Link
                            to="/bookmarks"
                            className="p-2 rounded-xl text-muted hover:text-primary hover:bg-card transition-all duration-200 hidden sm:flex"
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
                    {/* Division Bar Section */}
                    <div className="h-7 w-[2px] bg-primary/60 mx-1 hidden sm:block opacity-80"></div>

                    {/* Admin Dashboard */}
                    {isAdmin && (
                        <Link
                            to="/admin/dashboard"
                            className="p-2.5 rounded-lg text-primary bg-primary/5 hover:bg-primary/10 border border-primary/20 transition-all duration-200 shrink-0"
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
                            <img
                                src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-green-500 rounded-full border-2 border-background shadow-md"></div>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;