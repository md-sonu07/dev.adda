import { useLocation } from "react-router-dom";
import Feed from "./Feed.jsx";
import HomeThumbnail from "./HomeThumbnail.jsx";
import CategoryFilter from "../../../components/userSection/home/CategoryFilter";
import FeedHeader from "../../../components/userSection/home/FeedHeader";
import { Helmet } from "react-helmet-async";

function Home() {
    const location = useLocation();
    const isArticlesPage = location.pathname === '/articles';

    return (
        <main className="min-h-screen w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Helmet>
                <title>Dev Adda | Curated Intelligence for the Modern Engineer</title>
                <meta name="description" content="Dev Adda is a news blog for tech enthusiasts and developers. Stay updated with the latest in tech, engineering, and programming." />
                <link rel="canonical" href="https://dev-adda-news.vercel.app/" />
            </Helmet>
            {/* Floating Sticky Navigation Overlay */}
            <div className={`sticky inset-x-0 z-30 transition-all duration-500 ${isArticlesPage
                ? "top-16 py-4"
                : "sm:top-6 top-10 h-0 pointer-events-none"
                }`}>
                <div className="max-w-[1400px] mx-auto px-8 sm:px-14 pointer-events-auto">
                    <CategoryFilter />
                </div>
            </div>

            {/* Immersive Full-Screen Hero Section - Hidden on /articles */}
            {!isArticlesPage && (
                <div className="relative w-full h-screen">
                    <HomeThumbnail />
                </div>
            )}

            {/* Content Section */}
            <div className={`max-w-[1400px] mx-auto px-8 sm:px-14 bg-background transition-all duration-500 ${isArticlesPage ? 'pt-6' : 'pt-16'}`}>
                <FeedHeader />
                <div className="mt-8">
                    <Feed />
                </div>
            </div>
        </main>
    );
}

export default Home;
