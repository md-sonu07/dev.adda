import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import SkeletonImage from '../../common/SkeletonImage';

const TopAuthors = () => {
    const { posts } = useSelector((state) => state.post);

    const authors = useMemo(() => {
        if (!posts || posts.length === 0) return [];

        // Aggregate data by author
        const authorMap = {};
        posts.forEach(post => {
            if (!post.author) return;
            const authorId = post.author._id;
            if (!authorMap[authorId]) {
                authorMap[authorId] = {
                    name: post.author.fullName,
                    img: post.author.avatar,
                    articles: 0,
                    reads: 0,
                };
            }
            authorMap[authorId].articles += 1;
            authorMap[authorId].reads += (post.views || 0);
        });

        // Convert to array and sort
        const authorList = Object.values(authorMap)
            .sort((a, b) => b.articles - a.articles)
            .slice(0, 3)
            .map((author, index) => {
                const colors = ['text-primary', 'text-indigo-500', 'text-emerald-500'];
                return {
                    ...author,
                    rank: index + 1,
                    color: colors[index % colors.length],
                    reads: author.reads > 1000 ? (author.reads / 1000).toFixed(1) + 'k' : author.reads.toString()
                };
            });

        return authorList;
    }, [posts]);

    return (
        <div className="bg-card rounded-2xl border border-default flex flex-col h-full shadow-sm">
            <div className="p-6 border-b border-default flex items-center justify-between">
                <h2 className="text-[10px] font-black uppercase tracking-widest text-body">Top Authors</h2>
                <div className="px-2 py-0.5 bg-primary/10 rounded text-[9px] font-black uppercase text-primary tracking-widest">Growth</div>
            </div>
            <div className="p-6 space-y-5 flex-1">
                {authors.length > 0 ? (
                    authors.map((author, index) => (
                        <div key={index} className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <SkeletonImage
                                        className="size-10 rounded-xl border border-default group-hover:border-primary transition-colors"
                                        src={author.img}
                                        alt={author.name}
                                    />
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
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 opacity-50">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted">No data available</p>
                    </div>
                )}

                <button className="w-full py-3.5 mt-2 bg-box border border-default rounded-xl text-[10px] font-black uppercase tracking-widest text-muted hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95">
                    Full Leaderboard
                </button>
            </div>
        </div>
    );
};

export default TopAuthors;
