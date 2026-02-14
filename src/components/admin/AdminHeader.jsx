import React from 'react';
import { HiOutlineMagnifyingGlass, HiOutlineBell, HiOutlinePlusCircle, HiOutlineChevronRight } from 'react-icons/hi2';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { HiOutlineMoon, HiOutlineSun, HiOutlineCommandLine } from 'react-icons/hi2';

const AdminHeader = () => {
    const { pathname } = useLocation();
    const { isDark } = useSelector((state) => state.theme);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // Enhanced Breadcrumb UI
    const pathSegments = pathname.split('/').filter(Boolean);
    const currentPage = pathSegments[pathSegments.length - 1] || 'Dashboard';
    const formattedPage = currentPage.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <header className="h-20 shrink-0 bg-card/60 backdrop-blur-xl border-b border-default flex items-center justify-between px-8 sticky top-0 z-60 transition-colors duration-500">
            {/* Left side: Navigation Context */}
            <div className="flex items-center space-x-5">

                <div className="hidden lg:flex flex-col">
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-muted">
                        <Link to="/admin" className="hover:text-primary transition-colors">Admin</Link>
                        <HiOutlineChevronRight className="text-[10px]" />
                        <span className="text-primary font-black">Portal</span>
                    </div>
                    <h1 className="text-sm font-black text-body uppercase tracking-widest mt-0.5">
                        {formattedPage} <span className="text-muted tracking-tight font-bold">Terminal</span>
                    </h1>
                </div>
            </div>

            {/* Right side: Global Actions & Profile */}
            <div className="flex items-center gap-8">
                {/* Search Interface */}
                <div className="relative hidden md:flex items-center group">
                    <div className="absolute left-4 z-10">
                        <HiOutlineMagnifyingGlass className="text-muted text-lg group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                        className="w-72 bg-box/50 border border-default rounded-xl py-2.5 pl-12 pr-4 text-[11px] font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/5 focus:border-primary/40 focus:bg-card transition-all outline-none placeholder:text-muted/50"
                        placeholder="Global Query..."
                        type="text"
                    />
                    <div className="absolute right-3 px-1.5 py-0.5 rounded-md border border-default bg-card text-[9px] font-black text-muted group-focus-within:hidden">
                        ⌘K
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Activity Feed */}
                    <button className="relative p-2.5 text-muted hover:bg-primary/10 hover:text-primary rounded-xl border border-transparent hover:border-primary/20 transition-all duration-300 group">
                        <HiOutlineBell className="text-xl" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-card animate-pulse shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]"></span>
                    </button>


                    {/* Dark/Light Sync */}
                    <button
                        onClick={() => dispatch(toggleTheme())}
                        className="p-2.5 rounded-xl border border-default bg-box hover:bg-primary/10 text-muted hover:text-primary transition-all shadow-sm cursor-pointer group"
                    >
                        {isDark ? (
                            <HiOutlineSun className="text-lg group-hover:rotate-90 transition-transform duration-500" />
                        ) : (
                            <HiOutlineMoon className="text-lg group-hover:-rotate-12 transition-transform duration-500" />
                        )}
                    </button>


                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
