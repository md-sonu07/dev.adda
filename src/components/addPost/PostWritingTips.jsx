import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
    HiOutlineLightBulb,
    HiOutlineGlobeAlt,
    HiOutlineLockClosed,
    HiCheck,
    HiOutlinePresentationChartBar,
    HiOutlineDocumentText,
    HiXMark
} from 'react-icons/hi2';

const PostWritingTips = ({ postData = {}, updatePostData }) => {
    const [isMarkdownModalOpen, setIsMarkdownModalOpen] = useState(false);
    const { title = '', description = '', tags = [], coverImage = null, visibility = 'public' } = postData;

    const checklist = [
        { task: "Catchy Title", done: title.length > 10 },
        { task: "Short Summary", done: description.length > 20 },
        { task: "Cover Image", done: !!coverImage },
        { task: "Tags added", done: tags.length >= 1 }
    ];

    const completedCount = checklist.filter(item => item.done).length;
    const progressPercent = Math.round((completedCount / checklist.length) * 100);

    return (
        <aside className="w-[320px] pb-20 border-r border-default bg-background backdrop-blur-xl overflow-y-auto no-scrollbar p-6 hidden lg:flex flex-col gap-8">

            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <HiOutlineLightBulb className="text-xl" />
                </div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-body">
                    Writing Insights
                </h4>
            </div>

            {/* Publish Settings */}
            <div className="space-y-3">
                <h5 className="text-[9px] font-black uppercase tracking-[0.2em] text-muted px-1">
                    Publish Settings
                </h5>

                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => updatePostData?.({ visibility: 'public' })}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${visibility === 'public'
                                ? 'bg-primary text-white border-primary'
                                : 'text-muted border-default hover:border-primary/30'
                            }`}
                    >
                        <HiOutlineGlobeAlt className="text-sm" />
                        Public
                    </button>

                    <button
                        onClick={() => updatePostData?.({ visibility: 'private' })}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${visibility === 'private'
                                ? 'bg-primary text-white border-primary'
                                : 'text-muted border-default hover:border-primary/30'
                            }`}
                    >
                        <HiOutlineLockClosed className="text-sm" />
                        Private
                    </button>
                </div>
            </div>

            {/* SEO Preview */}
            <div className="p-4 rounded-xl bg-background border border-default shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">
                        Search Preview
                    </h5>
                    <HiOutlinePresentationChartBar className="text-primary" />
                </div>

                <div className="space-y-2 mb-3">
                    <div className="h-1 w-full bg-border-default rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-700"
                            style={{ width: `${Math.min(100, (title.length / 70) * 100)}%` }}
                        />
                    </div>

                    <div className="flex justify-between text-[8px] font-black uppercase text-muted">
                        <span>Title SEO</span>
                        <span>{title.length}/70</span>
                    </div>
                </div>

                <div className="p-3 rounded-lg bg-background border border-default">
                    <div className="text-primary text-[14px] font-bold line-clamp-1 mb-1">
                        {title || 'Your Article Title'}
                    </div>
                    <div className="text-body text-[12px] line-clamp-2">
                        {description || 'Article meta description will appear here...'}
                    </div>
                </div>
            </div>

            {/* Progress Section */}
            <div className="bg-background border border-default rounded-xl p-6 shadow-sm">
                <div className="flex flex-col items-center gap-3 text-center">

                    <div className="relative size-16">
                        <svg className="size-16 -rotate-90">
                            <circle
                                cx="32"
                                cy="32"
                                r="28"
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="6"
                                className="text-border-default text-primary/30"
                            />
                            <circle
                                cx="32"
                                cy="32"
                                r="28"
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="6"
                                strokeDasharray="175.9"
                                strokeDashoffset={175.9 - (175.9 * progressPercent) / 100}
                                className="text-primary"
                                strokeLinecap="round"
                            />
                        </svg>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-black text-body">
                                {progressPercent}%
                            </span>
                        </div>
                    </div>

                    <h4 className="text-sm font-black text-body">
                        Ready to Go?
                    </h4>
                </div>

                <div className="mt-6 space-y-3">
                    {checklist.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2.5">
                            <div className={`flex h-4 w-4 items-center justify-center rounded-full transition-all 
                                ${item.done
                                    ? 'bg-primary text-white'
                                    : 'border border-default'}`}>
                                {item.done && <HiCheck className="text-[10px]" />}
                            </div>

                            <span className={`text-[10px] font-bold uppercase 
                                ${item.done ? 'text-body' : 'text-muted'}`}>
                                {item.task}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

        </aside>
    );
};

export default PostWritingTips;
