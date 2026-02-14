import React from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import ArticleMobileActions from './ArticleMobileActions';

const ArticleContent = ({ post }) => {
    return (
        <section className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
            {/* Dynamic Content */}
            <div
                className="mb-8"
                dangerouslySetInnerHTML={{ __html: post?.content }}
            />

            {/* Dynamic Tags */}
            <div className="flex flex-wrap gap-3 mt-10 mb-12">
                {post?.tags?.map((tag, idx) => (
                    <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-slate-200 dark:bg-[#232f48] text-slate-600 dark:text-[#92a4c9] text-sm font-medium"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
            <ArticleMobileActions />
        </section>
    );
};

export default ArticleContent;
