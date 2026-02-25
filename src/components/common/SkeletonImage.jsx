import React, { useState } from 'react';

import FallbackAvatar from './FallbackAvatar';

const SkeletonImage = ({ src, alt, className, skeletonClassName, fetchPriority, loading = "lazy", customWidth = 800 }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Optimized ImageKit URL if applicable
    const getOptimizedUrl = (url) => {
        if (!url || !url.includes('ik.imagekit.io')) return url;

        const separator = url.includes('?') ? '&' : '?';
        // Auto-format, auto-quality, and reasonable width for LCP optimization
        return `${url}${separator}tr=w-${customWidth},q-75,f-auto`;
    };

    const optimizedSrc = getOptimizedUrl(src);
    const showError = hasError || !src;

    return (
        <div className={`relative overflow-hidden flex items-center justify-center ${className}`}>
            {!isLoaded && !showError && fetchPriority !== 'high' && (
                <div className={`absolute inset-0 bg-box/60 animate-pulse ${skeletonClassName}`} />
            )}

            {showError ? (
                <FallbackAvatar name={alt} className="absolute inset-0" />
            ) : (
                <img
                    src={optimizedSrc}
                    alt={alt}
                    fetchPriority={fetchPriority}
                    loading={loading}
                    decoding="async"
                    className={`w-full h-full object-cover ${fetchPriority === 'high' ? 'opacity-100' : `transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}`}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => {
                        setHasError(true);
                        setIsLoaded(true);
                    }}
                />
            )}
        </div>
    );
};

export default SkeletonImage;
