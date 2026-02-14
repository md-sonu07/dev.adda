import React from 'react';
import CategoryFilter from '../../components/home/CategoryFilter';
import FeedHeader from '../../components/home/FeedHeader';

function Header() {
    return (
        <section className="flex flex-col">
            {/* Edge-to-Edge Hero & Overlay Navigation */}
            <CategoryFilter />

            {/* Constrained Feed Section */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-14 w-full mt-10">
                <FeedHeader />
            </div>
        </section>
    );
}

export default Header;

