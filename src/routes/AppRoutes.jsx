import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ProtectedRoute, AdminRoute } from './ProtectedRoute';

const Home = lazy(() => import('../pages/Home/Home'));
const Articles = lazy(() => import('../pages/Articles/Articles'));

const AddPost = lazy(() => import('../pages/AddPost/AddPost'));
const Profile = lazy(() => import('../pages/Profile/Profile'));
const SavePost = lazy(() => import('../pages/Bookmarks/Bookmarks'));
const Login = lazy(() => import('../pages/Auth/Login'));
const Signup = lazy(() => import('../pages/Auth/Signup'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));
const ComingSoon = lazy(() => import('../pages/ComingSoon/ComingSoon'));
const AdminRoutes = lazy(() => import('./AdminRoutes'));

const PageLoader = () => (
    <div className="min-h-[60vh] flex items-center justify-center">
        <div className="size-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
);

function AppRoutes() {
    return (
        <Suspense fallback={<PageLoader />}>
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
                <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/bookmarks" element={<ProtectedRoute><SavePost /></ProtectedRoute>} />
                <Route path="/notifications" element={<ProtectedRoute><ComingSoon featureName="Notifications Center" /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}

export default AppRoutes