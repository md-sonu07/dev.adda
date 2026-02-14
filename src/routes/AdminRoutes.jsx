import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Admin/Dashboard';
import Users from '../pages/Admin/Users';
import Posts from '../pages/Admin/Posts';
import Settings from '../pages/Admin/Settings';
import Analytics from '../pages/Admin/Analytics';
import Drafts from '../pages/Admin/Drafts';
import BreakingNews from '../pages/Admin/BreakingNews';
import AdminCategories from '../pages/Admin/AdminCategories';
import AdminLayout from '../pages/Admin/AdminLayout';

function AdminRoutes() {
    return (
        <AdminLayout>
            <Routes>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="all-posts" element={<Posts />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="drafts" element={<Drafts />} />
                <Route path="breaking" element={<BreakingNews />} />
                <Route path="settings" element={<Settings />} />

                {/* Catch all for admin sub-routes */}
                <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
        </AdminLayout>
    );
}

export default AdminRoutes;
