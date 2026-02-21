import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMyBookmarksAction } from '../../redux/thunks/bookmarkThunk';
import BookmarksHeader from '../../components/bookmarks/BookmarksHeader';
import BookmarksFilters from '../../components/bookmarks/BookmarksFilters';
import BookmarksList from '../../components/bookmarks/BookmarksList';

const Bookmarks = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyBookmarksAction());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-background transition-colors duration-500">
            <main className="max-w-[1400px] mx-auto pt-10 px-6 sm:px-14">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <BookmarksHeader />

                    {/* Filters & Navigation */}
                    <BookmarksFilters
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                    />

                    {/* Main Content List */}
                    <BookmarksList filter={activeFilter} />

                    {/* Extra Spacing */}
                    <div className="h-20" />
                </div>
            </main>
        </div>
    );
};

export default Bookmarks;
