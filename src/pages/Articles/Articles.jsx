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
    <div className="min-h-screen bg-background animate-pulse">
      <main className="mx-auto flex w-full max-w-[1280px] items-start gap-8 px-4 py-8 md:px-10">
        {/* Left Interaction Bar Skeleton */}
        <div className="hidden lg:flex flex-col gap-6 sticky top-24 pt-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="size-11 rounded-full bg-box/40 border border-default/50" />
          ))}
        </div>

        {/* Center Content Area Skeleton */}
        <article className="flex-1 max-w-[840px] overflow-hidden">
          {/* Hero Skeleton */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-10">
              <div className="h-3 w-16 bg-box/40 rounded-full" />
              <div className="h-3 w-2 bg-box/20 rounded-full" />
              <div className="h-3 w-20 bg-box/40 rounded-full" />
            </div>

            <div className="space-y-4 mb-8">
              <div className="h-12 w-full bg-box/60 rounded-2xl" />
              <div className="h-12 w-2/3 bg-box/60 rounded-2xl" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-default/60">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-box/60" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-box/60 rounded-full" />
                  <div className="h-3 w-48 bg-box/40 rounded-full" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-10 w-24 bg-box/40 rounded-xl" />
                <div className="h-10 w-32 bg-box/40 rounded-xl" />
              </div>
            </div>
          </div>

          {/* Cover Image Skeleton */}
          <div className="aspect-video w-full bg-box/40 rounded-3xl mb-12 shadow-sm" />

          {/* Prose Content Skeleton */}
          <div className="space-y-6 mb-12">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="space-y-3">
                <div className={`h-4 bg-box/40 rounded-full ${i % 2 === 0 ? 'w-full' : 'w-[95%]'}`} />
                <div className={`h-4 bg-box/40 rounded-full ${i % 3 === 0 ? 'w-[90%]' : 'w-[85%]'}`} />
              </div>
            ))}
          </div>

          {/* Tags Skeleton */}
          <div className="flex gap-2 mb-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-7 w-20 bg-box/40 rounded-xl" />
            ))}
          </div>
        </article>

        {/* Right Sidebar Skeleton (Compact Version) */}
        <div className="hidden lg:block w-[320px] shrink-0 space-y-8">
          <div className="rounded-[24px] border border-default bg-box/20 p-5 space-y-6">
            <div className="flex justify-between items-center mb-6">
              <div className="h-4 w-24 bg-box/40 rounded-full" />
              <div className="h-3 w-10 bg-box/20 rounded-full" />
            </div>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex gap-4 items-center">
                <div className="size-16 rounded-[14px] bg-box/40 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-full bg-box/40 rounded-full" />
                  <div className="h-3 w-2/3 bg-box/30 rounded-full" />
                </div>
              </div>
            ))}
            <div className="h-11 w-full bg-box/40 rounded-xl mt-7" />
          </div>
          <div className="h-64 w-full bg-box/20 border border-primary/10 rounded-3xl" />
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