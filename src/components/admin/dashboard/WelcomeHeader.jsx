import React from 'react';

const WelcomeHeader = ({ adminName }) => {
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="animate-in fade-in slide-in-from-left-4 duration-700">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">Management Console</p>
                <h1 className="text-3xl font-black tracking-tight text-body uppercase lg:text-4xl">
                    Dashboard <span className="text-muted">Overview</span>
                </h1>
                <p className="text-muted text-sm font-bold mt-2">
                    Welcome back, <span className="text-body">{adminName}</span>. System status is nominal.
                </p>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-box border border-default rounded-xl w-fit animate-in fade-in slide-in-from-right-4 duration-700">
                <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted">{today}</p>
            </div>
        </div>
    );
};

export default WelcomeHeader;
