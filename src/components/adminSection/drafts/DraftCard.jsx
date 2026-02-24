import React from 'react';
import { HiOutlinePencilSquare, HiOutlineClock, HiOutlineTrash, HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2';

const DraftCard = ({ draft }) => {
    return (
        <div className="bg-card p-6 pb-10  rounded-2xl border border-default shadow-sm hover:border-primary/50 transition-all group flex flex-col justify-between h-60">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <span className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
                        <HiOutlinePencilSquare className="text-xl" />
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted">
                        <HiOutlineClock />
                        {draft.lastEdited}
                    </div>
                </div>
                <h3 className="text-sm font-black text-body line-clamp-2 uppercase tracking-tight group-hover:text-primary transition-colors">
                    {draft.title}
                </h3>
            </div>

            <div className="space-y-4">
                <div className="space-y-1.5">
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                        <span className="text-muted">Completion</span>
                        <span className="text-body">{draft.progress}%</span>
                    </div>
                    <div className="h-1 bg-box rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: `${draft.progress}%` }} />
                    </div>
                </div>

                <div className="flex gap-2 ">
                    <button className="flex-1 cursor-pointer py-2 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5">
                        <HiOutlineArrowTopRightOnSquare /> Continue
                    </button>
                    <button className="px-3 py-2 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg transition-all cursor-pointer">
                        <HiOutlineTrash />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DraftCard;
