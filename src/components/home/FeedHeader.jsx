import { IoOptionsOutline } from 'react-icons/io5';
import { useSearchParams, useLocation } from 'react-router-dom';

function FeedHeader() {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const q = searchParams.get('q');
    const isArticlesPage = location.pathname === '/articles';

    return (
        <div className="">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

                {/* Heading */}
                <div className="border-l-[6px] border-primary pl-6 py-1">
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-body">
                        {q ? (
                            <>Results for <span className="text-primary italic">"{q}"</span></>
                        ) : isArticlesPage ? (
                            <>Article <span className="text-primary italic">Index</span></>
                        ) : (
                            <>Developer's <span className="text-primary italic">Feed</span></>
                        )}
                    </h2>

                    <p className="text-[13px] font-medium text-muted mt-2 tracking-wide uppercase opacity-60">
                        {q ? `Found matching insights for your search` : isArticlesPage ? `Explore our complete collection of stories` : `Curated intelligence for the modern engineer`}
                    </p>
                </div>

                {/* Filter Button */}
                <button className="hidden sm:flex sticky sm:top-6 top-10 items-center gap-3 px-6 py-3 rounded-xl bg-box/50 border border-box cursor-pointer hover:border-primary/30 hover:bg-card text-body text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-sm group">
                    <IoOptionsOutline className="text-xl" />
                    Filters
                </button>

            </div>
        </div>
    );
}

export default FeedHeader;
