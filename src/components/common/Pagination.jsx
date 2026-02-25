import React from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage
}) => {
    if (totalPages <= 0) return null;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const getPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
        } else {
            if (currentPage <= 3) {
                pageNumbers.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pageNumbers;
    };

    return (
        <div className="p-4 bg-box/30 border-t border-default flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
            </p>
            <div className="flex items-center gap-1.5 md:gap-2">
                <button
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="size-9 md:size-10 shrink-0 flex items-center justify-center bg-card border border-default rounded-lg text-lg font-black text-muted hover:bg-box hover:text-primary transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                    <HiOutlineChevronLeft />
                </button>

                <div className="flex items-center gap-1.5 md:gap-2">
                    {getPageNumbers().map((num, idx) => (
                        <button
                            key={idx}
                            onClick={() => num !== '...' && onPageChange(num)}
                            disabled={num === '...'}
                            className={`size-9 md:size-10 shrink-0 flex items-center justify-center rounded-lg text-xs md:text-sm font-bold transition-all ${num === currentPage
                                ? 'bg-primary text-white shadow-lg shadow-primary/30 border-transparent'
                                : num === '...'
                                    ? 'bg-transparent text-muted cursor-default border-transparent'
                                    : 'bg-card border border-default text-muted hover:border-primary/50 hover:text-primary cursor-pointer shadow-sm'
                                }`}
                        >
                            {num}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="size-9 md:size-10 shrink-0 flex items-center justify-center bg-card border border-default rounded-lg text-lg font-black text-muted hover:bg-box hover:text-primary transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                    <HiOutlineChevronRight />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
