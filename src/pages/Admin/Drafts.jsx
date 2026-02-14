import React from 'react';
import DraftsHeader from '../../components/admin/drafts/DraftsHeader';
import DraftCard from '../../components/admin/drafts/DraftCard';

const Drafts = () => {
    const drafts = [
        { id: 1, title: 'Understanding TypeScript 5.0 Features', lastEdited: '2 hours ago', progress: 85 },
        { id: 2, title: 'A Guide to Microservices with Node.js', lastEdited: 'Yesterday', progress: 40 },
        { id: 3, title: 'Frontend Trends to Watch in 2025', lastEdited: '3 days ago', progress: 10 },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <DraftsHeader />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drafts.map((draft) => (
                    <DraftCard key={draft.id} draft={draft} />
                ))}

                {/* Create New Draft Button */}
                <button className="h-48 rounded-2xl border-2 border-dashed border-default hover:border-primary/50 hover:bg-primary/5 transition-all group flex flex-col items-center justify-center gap-2">
                    <div className="size-10 rounded-full border-2 border-dashed border-default flex items-center justify-center group-hover:border-primary transition-colors">
                        <span className="text-2xl text-muted group-hover:text-primary">+</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted group-hover:text-primary">New Draft</span>
                </button>
            </div>
        </div>
    );
};

export default Drafts;
