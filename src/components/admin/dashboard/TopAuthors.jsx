import React from 'react';

const TopAuthors = () => {
    const authors = [
        { name: 'David Grant', articles: 42, reads: '12.4k', rank: 1, img: 'https://i.pravatar.cc/150?u=david', color: 'text-primary' },
        { name: 'Leila Smith', articles: 38, reads: '9.1k', rank: 2, img: 'https://i.pravatar.cc/150?u=leila', color: 'text-indigo-500' },
        { name: 'Julian Oh', articles: 25, reads: '7.2k', rank: 3, img: 'https://i.pravatar.cc/150?u=julian', color: 'text-emerald-500' },
    ];

    return (
        <div className="bg-card rounded-2xl border border-default flex flex-col h-full shadow-sm">
            <div className="p-6 border-b border-default flex items-center justify-between">
                <h2 className="text-[10px] font-black uppercase tracking-widest text-body">Top Authors</h2>
                <div className="px-2 py-0.5 bg-primary/10 rounded text-[9px] font-black uppercase text-primary tracking-widest">Growth</div>
            </div>
            <div className="p-6 space-y-5 flex-1">
                {authors.map((author, index) => (
                    <div key={index} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <img className="size-10 rounded-xl object-cover border border-default group-hover:border-primary transition-colors" src={author.img} alt={author.name} />
                                <div className={`absolute -bottom-1 -right-1 size-5 bg-card border border-default text-[9px] font-black ${author.color} flex items-center justify-center rounded-lg shadow-sm group-hover:scale-110 transition-transform`}>
                                    #{author.rank}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-black text-body group-hover:text-primary transition-colors uppercase tracking-tight">{author.name}</p>
                                <p className="text-[10px] text-muted font-bold tracking-tight uppercase">{author.articles} Stories</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`text-sm font-black ${author.color}`}>{author.reads}</p>
                            <p className="text-[10px] text-muted font-black uppercase tracking-widest">Impression</p>
                        </div>
                    </div>
                ))}

                <button className="w-full py-3.5 mt-2 bg-box border border-default rounded-xl text-[10px] font-black uppercase tracking-widest text-muted hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95">
                    Full Leaderboard
                </button>
            </div>
        </div>
    );
};

export default TopAuthors;
