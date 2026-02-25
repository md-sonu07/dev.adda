import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineRocketLaunch, HiOutlineCommandLine, HiOutlineBellAlert } from 'react-icons/hi2';

const ComingSoon = ({ featureName = "This Feature" }) => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
            <div className="max-w-xl w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-primary/5 text-primary mb-8 animate-pulse">
                    <HiOutlineRocketLaunch className="text-5xl" />
                </div>

                <div className="space-y-4 mb-10">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">System Update</h2>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                        {featureName} is <br /> <span className="text-primary italic">Coming Soon</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium max-w-md mx-auto leading-relaxed">
                        Our engineering team is currently deploying this module. We're fine-tuning the last bits of code to ensure a world-class experience.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-6">
                    <div className="flex w-full max-w-sm p-1 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <input
                            type="email"
                            placeholder="Get notified on launch..."
                            className="flex-1 bg-transparent border-none outline-none px-4 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400"
                        />
                        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
                            Notify Me
                        </button>
                    </div>

                    <Link to="/" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2">
                        <HiOutlineCommandLine className="text-lg" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;
