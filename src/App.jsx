import { useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import MobileActions from "./components/layout/MobileActions";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfileAction } from "./redux/thunks/userThunk";
import { setLoading } from "./redux/slices/authSlice";
import Footer from "./components/layout/Footer";

const authRoutes = ["/login", "/signup"];

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { isDark } = useSelector((state) => state.theme);

  const isAuthPage = authRoutes.includes(pathname);
  const isAdminPage = pathname.startsWith('/admin');
  const shouldHideNav = isAuthPage || isAdminPage;

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      dispatch(getUserProfileAction());
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return (
    <div className={`${isDark ? 'dark' : ''} min-h-screen bg-background text-body transition-colors duration-300`}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: isDark ? 'var(--color-card)' : '#fff',
            color: isDark ? '#f1f5f9' : '#0f172a',
            border: `1px solid ${isDark ? '#30363d' : '#e2e8f0'}`,
            padding: '12px 20px',
            borderRadius: '16px',
            fontSize: '13px',
            fontWeight: '600',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          success: {
            iconTheme: {
              primary: '#135bec',
              secondary: '#fff',
            },
          },
        }}
      />
      {!shouldHideNav && <Navbar />}
      <div className="flex-1 min-h-[80vh]">
        <AppRoutes />
      </div>
      {!shouldHideNav && <MobileActions />}
      {pathname !== "/create-post" && pathname !== "/profile" && !shouldHideNav && <Footer />}
    </div>
  );
}

export default App;
