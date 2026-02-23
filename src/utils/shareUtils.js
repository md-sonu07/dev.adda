import toast from 'react-hot-toast';

/**
 * Robust share function using Web Share API with a clipboard fallback.
 * @param {Object} options - Share data
 * @param {string} options.title - Post title
 * @param {string} options.text - Post summary/description
 * @param {string} options.url - Absolute URL of the post
 */
export const sharePost = async ({ title, text, url }) => {
    const shareData = {
        title: title || 'Dev Adda',
        text: text || 'Check out this interesting article on Dev Adda',
        url: url || window.location.href,
    };

    try {
        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            await navigator.share(shareData);
        } else {
            // Fallback for browsers that don't support Web Share API
            await navigator.clipboard.writeText(shareData.url);
            toast.success("Link copied to clipboard");
        }
    } catch (error) {
        // Handle cancellation or other errors
        if (error.name !== 'AbortError') {
            console.error('Error sharing:', error);
            // Fallback to clipboard if share fails for non-abort reasons
            try {
                await navigator.clipboard.writeText(shareData.url);
                toast.success("Link copied to clipboard");
            } catch (copyError) {
                toast.error("Failed to share or copy link");
            }
        }
    }
};
