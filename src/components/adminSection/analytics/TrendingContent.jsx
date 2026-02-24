import React from 'react';
import { HiOutlineLink } from 'react-icons/hi2';

const TrendingContent = () => {
    const trending = [
        { title: 'Why Rust is winning', views: '24.2k' },
        { title: 'Kubernetes vs Docker', views: '18.5k' },
        { title: 'The AI Revolution', views: '12.4k' },
        { title: 'Mastering React 19', views: '10.1k' },
    ];

    return (
        <div className="bg-card rounded-2xl border border-default p-6 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest text-body mb-6">Trending Content</h3>
            <div className="divide-y divide-default">
                {trending.map((link, i) => (
                    <div key={i} className="py-3 flex items-center justify-between group cursor-pointer hover:bg-box/20 px-2 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                            <HiOutlineLink className="text-muted group-hover:text-primary" />
                            <span className="text-xs font-bold text-body">{link.title}</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">{link.views}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingContent;
