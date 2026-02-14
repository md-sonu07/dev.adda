import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    HiOutlineCommandLine,
    HiOutlineSquares2X2,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineTag,
    HiOutlineChartBar,
    HiOutlinePencilSquare,
    HiOutlineNewspaper,
    HiOutlineCog6Tooth,
    HiOutlineArrowLeftOnRectangle,
    HiOutlineArrowTopRightOnSquare
} from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../redux/thunks/authThunk';
import toast from 'react-hot-toast';

const NavLink = ({ to, icon: Icon, label, active }) => (
    <Link
        to={to}
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${active
            ? 'bg-primary/10 text-primary border border-primary/20'
            : 'text-muted hover:bg-primary/10 hover:text-primary'
            }`}
    >
        <Icon className={`mr-3 text-lg ${active ? 'text-primary' : ''}`} />
        {label}
    </Link>
);

const SectionTitle = ({ children }) => (
    <p className="px-3 text-[10px] font-black uppercase tracking-widest text-muted mt-4 mb-2">
        {children}
    </p>
);

const AdminSidebar = () => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const handleLogout = async () => {
        try {
            await dispatch(logoutAction()).unwrap();
            toast.success('Admin logged out');
        } catch (error) {
            toast.error('Logout failed');
        }
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
        <aside className="w-64 shrink-0 bg-card border-r border-default hidden md:flex flex-col">
            <div className="p-6">
                <Link to="/admin" className="flex items-center space-x-3 text-primary group">
                    <div className="size-8 bg-primary rounded flex items-center justify-center group-hover:scale-110 transition-transform">
                        <HiOutlineCommandLine className="text-white text-lg" />
                    </div>
                    <span className="font-black text-xl tracking-tight uppercase text-body">DevAdda</span>
                </Link>
            </div>

            <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto no-scrollbar">
                <Link
                    to="/"
                    className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-muted hover:bg-primary/10 hover:text-primary transition-all duration-200"
                >
                    <HiOutlineArrowTopRightOnSquare className="mr-3 text-lg" />
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
                <NavLink to="/admin/settings" icon={HiOutlineCog6Tooth} label="Settings" active={pathname === '/admin/settings'} />

                <div className="pt-4 mt-4 border-t border-box border-default/50">


                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all mt-1"
                    >
                        <HiOutlineArrowLeftOnRectangle className="mr-3 text-lg" />
                        Logout
                    </button>
                </div>
            </nav>

            <div className="p-4 border-t border-default">
                <div className="flex items-center p-3 rounded-xl bg-box border border-default">
                    {user?.avatar ? (
                        <img
                            className="w-8 h-8 rounded-lg object-cover border border-default"
                            src={user?.avatar}
                            alt="Admin Profile"
                        />
                    ) : (
                        <img
                            className="w-8 h-8 rounded-lg object-cover border border-default"
                            src={`https://ui-avatars.com/api/?name=${user?.fullName}&background=random`}
                            alt="Admin Profile"
                        />
                    )}
                    <div className="ml-3 overflow-hidden">
                        <p className="text-xs font-black truncate text-body">{user?.fullName || 'Admin'}</p>
                        <p className="text-[10px] text-muted uppercase font-bold tracking-tight">{user?.role || 'Admin'}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;
