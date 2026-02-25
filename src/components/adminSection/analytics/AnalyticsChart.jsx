import React, { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi2';

const AnalyticsChart = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState('Last 30 Days');
    const ranges = ['Last 30 Days', 'Last 7 Days', 'This Year'];
    return (
        <div className="bg-card rounded-2xl border border-default p-8 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-body">Traffic Overview</h3>
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-box border border-default rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-widest outline-none flex items-center gap-2 hover:bg-default transition-all"
                    >
                        {selectedRange}
                        <HiChevronDown className={`text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                            <div className="absolute right-0 top-full mt-2 w-full min-w-[120px] dark:bg-gray-900 bg-card/95 backdrop-blur-md border border-default rounded-xl shadow-2xl overflow-hidden z-50 p-1.5 transform transition-all">
                                {ranges.map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => {
                                            setSelectedRange(range);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full text-nowrap text-left px-3 py-2.5 mb-1 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedRange === range
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                            : 'hover:bg-box text-muted hover:text-body'
                                            }`}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-px sm:gap-4 group">
                {[65, 45, 75, 55, 85, 95, 40, 60, 80, 70, 90, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-primary/20 rounded-t-lg relative group cursor-pointer" style={{ height: `${h}%` }}>
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-body text-card text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {h * 10}k
                        </div>
                        <div className="w-full h-full bg-primary rounded-t-lg opacity-0 group-hover:opacity-100 transition-all scale-x-110" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnalyticsChart;
