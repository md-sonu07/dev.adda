import ArticleHero from '../../../components/userSection/articles/ArticleHero'
import ArticleContent from '../../../components/userSection/articles/ArticleContent'
import ArticleSidebar from '../../../components/userSection/articles/ArticleSidebar'
import ReadingProgressBar from '../../../components/userSection/articles/ReadingProgressBar'
import { useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPostByIdAction, incrementViewsAction } from '../../../redux/thunks/postThunk'
import { useEffect, useLayoutEffect, lazy, Suspense, useRef } from 'react'
import { Helmet } from 'react-helmet-async'

import { addToHistory } from '../../../redux/slices/historySlice';

const ArticleComments = lazy(() => import('../../../components/userSection/comments/ArticleComments'));
const ArticleInteractionBar = lazy(() => import('../../../components/userSection/articles/ArticleInteractionBar'));

// Tracker to prevent double-incrementing in development (React Strict Mode)
let lastIncrementedId = null;

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
  const location = useLocation();
  const dispatch = useDispatch();
  const { singlePost, posts, loading } = useSelector((state) => state.post);

  // Instant discovery: if the post is already in our list, use it while fetching full details
  const postFromList = posts.find(p => p._id === id);
  const post = (singlePost?._id === id) ? singlePost : postFromList;

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!id) return;

    async function fetchPost() {
      // Always fetch fresh data
      await dispatch(getPostByIdAction(id));

      // Only increment views once per unique article load
      // Using external tracker to prevent double-firing in Strict Mode
      if (lastIncrementedId !== id) {
        lastIncrementedId = id;
        await dispatch(incrementViewsAction(id));
      }
    }
    fetchPost();
  }, [dispatch, id]);

  useEffect(() => {
    if (post && post._id === id) {
      dispatch(addToHistory(post));
    }
  }, [dispatch, post, id]);

  // Show skeleton only if we have NO data about the post (e.g. direct link visit)
  if (!post && loading) {
    return <ArticleSkeleton />;
  }

  // If we have no post data and are not loading, either 404 or just loading
  if (!post) return <ArticleSkeleton />;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post?.title ? `${post.title} | Dev Adda` : "Dev Adda article"}</title>
        <meta name="description" content={post?.summary || "Read the latest tech insights on Dev Adda."} />
        <meta name="author" content={post?.author?.fullName || "Dev Adda Team"} />
        <link rel="canonical" href={`https://dev-adda-news.vercel.app/article/${id}`} />

        {/* Open Graph Tags for Social Sharing */}
        <meta property="og:title" content={post?.title} />
        <meta property="og:description" content={post?.summary} />
        <meta property="og:image" content={post?.coverImage} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://dev-adda-news.vercel.app/article/${id}`} />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post?.title} />
        <meta name="twitter:description" content={post?.summary} />
        <meta name="twitter:image" content={post?.coverImage} />
      </Helmet>
      <ReadingProgressBar />
      <main className="mx-auto flex w-full max-w-[1280px] grow items-start gap-8 px-4 py-8 md:px-10">
        {/* Left Sticky Interaction Bar (Desktop) */}
        <Suspense fallback={<div className="hidden xl:block size-12 rounded-2xl bg-box/20 animate-pulse" />}>
          <ArticleInteractionBar post={post} />
        </Suspense>

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

          <Suspense fallback={<div className="h-64 bg-box/20 rounded-3xl animate-pulse" />}>
            <ArticleComments postId={post?._id} postAuthorId={post?.author?._id} />
          </Suspense>
        </article>

        {/* Right Sidebar */}
        <ArticleSidebar />
      </main>

    </div>
  )
}

export default Articles