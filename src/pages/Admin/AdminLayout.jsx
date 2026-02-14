import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

const AdminLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-card sm:bg-box/20 overflow-hidden">
            {/* Sidebar - Fixed to the left */}
            <AdminSidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                <AdminHeader />

                {/* Content Container - Scrollable */}
                <div className="flex-1 overflow-y-auto no-scrollbar p-4 sm:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
