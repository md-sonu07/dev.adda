import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiOutlineCommandLine,
    HiXMark,
    HiOutlineSquares2X2,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineTag,
    HiOutlineChartBar,
    HiOutlinePencilSquare,
    HiOutlineNewspaper,
    HiOutlineCog6Tooth,
    HiOutlineArrowLeftOnRectangle,
    HiOutlineArrowTopRightOnSquare,
    HiOutlineSun,
    HiOutlineMoon
} from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../redux/thunks/authThunk';
import { toggleTheme } from '../../redux/slices/themeSlice';
import Logo from '../common/Logo';
import SkeletonImage from '../common/SkeletonImage';
import toast from 'react-hot-toast';

const NavLink = ({ to, icon: Icon, label, active }) => (
    <Link
        to={to}
        className="relative flex items-center px-4 py-3 text-sm font-bold rounded-xl group transition-all duration-300"
    >
        {/* Sophisticated Fluid Background */}
        {active && (
            <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-lg"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
        )}

        <div className={`relative z-10 flex items-center gap-3.5 w-full transition-colors duration-300 ${active ? 'text-primary' : 'text-body/60 group-hover:text-body'}`}>
            <Icon className={`text-xl transition-all duration-300 ${active ? 'scale-105' : 'group-hover:scale-110 group-hover:text-primary'}`} />
            <span className="truncate tracking-tight">{label}</span>
        </div>
    </Link>
);

const SectionTitle = ({ children }) => (
    <p className="px-5 text-[10px] font-black uppercase tracking-widest text-body/30 mt-6 mb-2">
        {children}
    </p>
);

const AdminSidebar = ({ isOpen, onClose }) => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { isDark } = useSelector(state => state.theme);

    // Initialize state immediately to prevent "flash" of sidebar on mobile
    const [isMobile, setIsMobile] = React.useState(() =>
        typeof window !== 'undefined' ? window.innerWidth < 768 : false
    );

    // Dynamic breakpoint detection
    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleLogout = async () => {
        try {
            await dispatch(logoutAction()).unwrap();
            toast.success('Admin logged out');
            if (onClose) onClose();
        } catch (error) {
            toast.error('Logout failed');
        }
    };

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    const mainMenu = [
        { to: '/admin/dashboard', icon: HiOutlineSquares2X2, label: 'Dashboard' },
        { to: '/admin/users', icon: HiOutlineUsers, label: 'Users' },
        { to: '/admin/all-posts', icon: HiOutlineDocumentText, label: 'Posts' },
        { to: '/admin/categories', icon: HiOutlineTag, label: 'Categories' },
        { to: '/admin/analytics', icon: HiOutlineChartBar, label: 'Analytics' },
    ];

    const editorialMenu = [
        { to: '/admin/drafts', icon: HiOutlinePencilSquare, label: 'Drafts' },
        { to: '/admin/breaking', icon: HiOutlineNewspaper, label: 'Breaking News' },
    ];

    return (
        <>
            {/* MOBILE BACKDROP */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* SIDEBAR CONTAINER */}
            <motion.aside
                initial={false}
                animate={{
                    x: isMobile ? (isOpen ? 0 : -300) : 0,
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className={`fixed md:static inset-y-0 left-0 z-110 w-72 shrink-0 bg-card border-r border-default flex flex-col transition-none`}
            >
                {/* Mobile Actions (Top Right) */}
                <div className="md:hidden absolute top-6 right-6 flex items-center gap-2">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="p-2.5 rounded-xl bg-box border border-default text-muted hover:text-primary transition-all active:scale-95"
                    >
                        <HiXMark className="text-xl" />
                    </button>
                </div>

                <div className="p-6">
                    <Logo to="/admin" />
                </div>

                <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto no-scrollbar">
                    <Link
                        to="/"
                        className="flex items-center px-4 py-3 text-sm font-bold rounded-md text-body/60 hover:bg-primary/5 transition-all duration-300 group"
                    >
                        <HiOutlineArrowTopRightOnSquare className="mr-3.5 text-xl group-hover:scale-110 transition-transform" />
                        View Live Site
                    </Link>
                    <SectionTitle>Main Menu</SectionTitle>
                    {mainMenu.map((item) => (
                        <NavLink
                            key={item.to}
                            {...item}
                            active={pathname === item.to || (item.to === '/admin/dashboard' && pathname === '/admin')}
                        />
                    ))}

                    <SectionTitle>Editorial</SectionTitle>
                    {editorialMenu.map((item) => (
                        <NavLink key={item.to} {...item} active={pathname === item.to} />
                    ))}

                    <SectionTitle>System</SectionTitle>
                    <button
                        onClick={handleThemeToggle}
                        className="w-full flex items-center px-4 py-3 text-sm font-bold rounded-md text-body/60 hover:bg-primary/5 hover:text-primary transition-all duration-300 group cursor-pointer"
                    >
                        {isDark ? (
                            <>
                                <HiOutlineSun className="mr-3.5 text-xl group-hover:scale-110 transition-transform" />
                                Light Mode
                            </>
                        ) : (
                            <>
                                <HiOutlineMoon className="mr-3.5 text-xl group-hover:scale-110 transition-transform" />
                                Dark Mode
                            </>
                        )}
                    </button>
                    <NavLink to="/admin/settings" icon={HiOutlineCog6Tooth} label="Settings" active={pathname === '/admin/settings'} />

                    <div className="pt-4 mt-4 border-t border-box">


                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-rose-500 hover:bg-rose-500/10 transition-all mt-1"
                        >
                            <HiOutlineArrowLeftOnRectangle className="mr-3 text-lg" />
                            Logout
                        </button>
                    </div>
                </nav>

                <div className="p-4 border-t border-default">
                    <div className="flex items-center p-3 rounded-xl bg-box border border-default">
                        <SkeletonImage
                            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.fullName || 'Admin'}&background=random`}
                            alt="Admin Profile"
                            className="w-8 h-8 rounded-lg border border-default"
                        />
                        <div className="ml-3 overflow-hidden">
                            <p className="text-xs font-black truncate text-body">{user?.fullName || 'Loading...'}</p>
                            <p className="text-[10px] text-muted uppercase font-bold tracking-tight">{user?.role || 'Admin'}</p>
                        </div>
                    </div>
                </div>
            </motion.aside>
        </>
    );
};

export default AdminSidebar;
