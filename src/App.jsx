import { useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import MobileActions from "./components/layout/MobileActions";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserProfileAction } from "./redux/thunks/userThunk";
import Footer from "./components/layout/Footer";

const authRoutes = ["/login", "/signup"];

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const isAuthPage = authRoutes.includes(pathname);
  const isAdminPage = pathname.startsWith('/admin');
  const shouldHideNav = isAuthPage || isAdminPage;

  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      {!shouldHideNav && <Navbar />}
      <AppRoutes />
      {!shouldHideNav && <MobileActions />}
      {pathname !== "/create-post" && !shouldHideNav && <Footer />}
    </div>
  );
}

export default App;
