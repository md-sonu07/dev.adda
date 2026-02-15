import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { pathname } = useLocation();

    // Close sidebar when route changes on mobile
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    return (
        <div className="flex h-screen bg-card sm:bg-box/20 overflow-hidden relative">
            {/* Sidebar - Fixed to the left */}
            <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />

                {/* Content Container - Scrollable */}
                <div className="flex-1 overflow-y-auto no-scrollbar p-4 sm:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
