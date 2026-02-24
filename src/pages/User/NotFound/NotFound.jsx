import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineCommandLine, HiOutlineHome, HiOutlineArrowLeft } from 'react-icons/hi2';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6 text-center">
            <div className="max-w-md w-full animate-in fade-in zoom-in-95 duration-700">
                <div className="relative mb-8">
                    <h1 className="text-[120px] font-black text-slate-300 dark:text-slate-800/40 leading-none select-none">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center pt-8">
                        <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary rotate-12 animate-bounce">
                            <HiOutlineCommandLine className="text-4xl" />
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-3">Page Not Found</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium mb-10 leading-relaxed">
                    The requested URL was not found on this server. It might have been moved, deleted, or never existed in the first place.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[11px] px-8 py-4 rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95"
                    >
                        <HiOutlineHome className="text-lg" />
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-black uppercase tracking-widest text-[11px] px-8 py-4 rounded-xl transition-all active:scale-95"
                    >
                        <HiOutlineArrowLeft className="text-lg" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
