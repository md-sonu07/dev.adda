import ArticleMobileActions from './ArticleMobileActions';
import SkeletonImage from '../common/SkeletonImage';
import './ArticleContent.css';

const ArticleContent = ({ post }) => {
    return (
        <section className="transition-all duration-300">
            {/* Main Article Poster */}
            {post?.coverImage && (
                <div className="mb-10 rounded-4xl overflow-hidden shadow-2xl border border-default">
                    <SkeletonImage
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-auto aspect-video object-cover"
                    />
                </div>
            )}

            {/* Dynamic Content */}
            <div
                className="article-content-body mb-8"
                dangerouslySetInnerHTML={{ __html: post?.content }}
            />

            {/* Dynamic Tags */}
            <div className="flex flex-wrap gap-2 mt-10 mb-12">
                {post?.tags?.map((tag, idx) => (
                    <span
                        key={idx}
                        className="px-3.5 py-1.5 rounded-xl bg-box border border-default text-muted text-[10px] font-black uppercase tracking-widest hover:border-primary/40 hover:text-primary transition-all cursor-pointer"
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
