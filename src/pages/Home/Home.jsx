import Feed from "./Feed.jsx";
import HomeThumbnail from "./HomeThumbnail.jsx";
import CategoryFilter from "../../components/home/CategoryFilter";
import FeedHeader from "../../components/home/FeedHeader";

function Home() {
    return (
        <main className="min-h-screen w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Floating Sticky Navigation Overlay */}
            <div className="sticky sm:top-6 top-10 px-4 sm:px-0 inset-x-0 z-30 h-0 pointer-events-none">
                <div className="max-w-[1400px] mx-auto pointer-events-auto">
                    <CategoryFilter />
                </div>
            </div>

            {/* Immersive Full-Screen Hero Section */}
            <div className="relative w-full h-screen">
                <HomeThumbnail />
            </div>

            {/* Content Section */}
            <div className="max-w-[1400px] mx-auto px-8 sm:px-14 pt-16 bg-background">
                <FeedHeader />
                <div className="mt-8">
                    <Feed />
                </div>
            </div>
        </main>
    );
}

export default Home;
