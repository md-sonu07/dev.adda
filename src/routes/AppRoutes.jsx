import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Articles from '../pages/Articles/Articles';
import AddPost from '../pages/AddPost/AddPost';
import Profile from '../pages/Profile/Profile';
import SavePost from '../pages/Bookmarks/Bookmarks';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import NotFound from '../pages/NotFound/NotFound';
import ComingSoon from '../pages/ComingSoon/ComingSoon';
import AdminRoutes from './AdminRoutes';
import { ProtectedRoute, AdminRoute } from './ProtectedRoute';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<Articles />} />
            <Route path="/articles" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin Routes Group */}
            <Route
                path="/admin/*"
                element={
                    <AdminRoute>
                        <AdminRoutes />
                    </AdminRoute>
                }
            />

            {/* Protected Routes */}
            <Route path="/create-post" element={<ProtectedRoute><AddPost /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/bookmarks" element={<ProtectedRoute><SavePost /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><ComingSoon featureName="Notifications Center" /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes