import ArticleInteractionBar from '../../components/articles/ArticleInteractionBar'
import ArticleHero from '../../components/articles/ArticleHero'
import ArticleContent from '../../components/articles/ArticleContent'
import ArticleComments from '../../components/articles/ArticleComments'
import ArticleSidebar from '../../components/articles/ArticleSidebar'
import ReadingProgressBar from '../../components/articles/ReadingProgressBar'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPostByIdAction } from '../../redux/thunks/postThunk'
import { useEffect, useLayoutEffect } from 'react'

const ArticleSkeleton = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-500 animate-pulse flex flex-col">
      <main className="mx-auto flex w-full max-w-[1280px] items-start gap-8 px-4 py-8 md:px-10">
        {/* Left Sticky Bar Skeleton */}
        <div className="hidden lg:flex flex-col gap-6 sticky top-24 pt-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="size-10 rounded-full bg-box/60" />
          ))}
        </div>

        {/* Center Content Skeleton */}
        <article className="flex-1 max-w-[800px]">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-4 w-16 bg-box/40 rounded" />
            <div className="h-4 w-4 bg-box/30 rounded" />
            <div className="h-4 w-24 bg-box/40 rounded" />
          </div>

          {/* Title */}
          <div className="space-y-4 mb-8">
            <div className="h-10 w-full bg-box/60 rounded-lg" />
            <div className="h-10 w-3/4 bg-box/60 rounded-lg" />
          </div>

          {/* Author Card */}
          <div className="p-4 rounded-xl border border-default bg-box/20 flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-full bg-box/60" />
              <div className="space-y-2">
                <div className="h-5 w-32 bg-box/60 rounded" />
                <div className="h-4 w-48 bg-box/40 rounded" />
              </div>
            </div>
            <div className="h-10 w-24 bg-box/50 rounded-lg" />
          </div>

          {/* Content Lines */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className={`h-4 bg-box/40 rounded ${i % 3 === 0 ? 'w-full' : i % 3 === 1 ? 'w-11/12' : 'w-4/5'}`} />
            ))}
          </div>
        </article>

        {/* Right Sidebar Skeleton */}
        <div className="hidden xl:block w-80 space-y-8">
          <div className="h-40 w-full bg-box/30 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-6 w-32 bg-box/50 rounded" />
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-3">
                <div className="size-16 bg-box/40 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-full bg-box/40 rounded" />
                  <div className="h-3 w-2/3 bg-box/30 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

function Articles() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singlePost: post, loading } = useSelector((state) => state.post);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    async function fetchPost() {
      await dispatch(getPostByIdAction(id));
    }
    fetchPost();
  }, [dispatch, id]);

  useEffect(() => {
    if (post?.title) {
      document.title = `${post.title} | Dev Adda`;
    }
    return () => {
      document.title = "Dev Adda | Tech News & Developer Updates";
    };
  }, [post]);

  if (loading || !post) {
    return <ArticleSkeleton />;
  }
  console.log("Post", post);


  return (
    <div className="min-h-screen bg-background">
      <ReadingProgressBar />
      <main className="mx-auto flex w-full max-w-[1280px] grow items-start gap-8 px-4 py-8 md:px-10">
        {/* Left Sticky Interaction Bar (Desktop) */}
        <ArticleInteractionBar />

        {/* Center Content Area */}
        <article className="flex flex-1 flex-col max-w-[840px] overflow-hidden">
          <ArticleHero post={post} />
          <ArticleContent post={post} />

          {/* Premium Bottom Section Divider */}
          <div className="flex items-center gap-6 my-16">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-default to-transparent" />
            <div className="size-2 rounded-full bg-primary/20 border border-primary/40 animate-pulse" />
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-default to-transparent opacity-0" />
          </div>

          <ArticleComments />
        </article>

        {/* Right Sidebar */}
        <ArticleSidebar />
      </main>

    </div>
  )
}

export default Articles