import React, { useState } from 'react';

const SkeletonImage = ({ src, alt, className, skeletonClassName, fetchPriority, loading = "lazy", customWidth = 800 }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    // Optimized ImageKit URL if applicable
    const getOptimizedUrl = (url) => {
        if (!url || !url.includes('ik.imagekit.io')) return url;

        const separator = url.includes('?') ? '&' : '?';
        // Auto-format, auto-quality, and reasonable width for LCP optimization
        return `${url}${separator}tr=w-${customWidth},q-75,f-auto`;
    };

    const optimizedSrc = getOptimizedUrl(src);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {!isLoaded && fetchPriority !== 'high' && (
                <div className={`absolute inset-0 bg-box/60 animate-pulse ${skeletonClassName}`} />
            )}
            <img
                src={optimizedSrc}
                alt={alt}
                fetchPriority={fetchPriority}
                loading={loading}
                decoding="async"
                className={`w-full h-full object-cover ${fetchPriority === 'high' ? 'opacity-100' : `transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}`}
                onLoad={() => setIsLoaded(true)}
                onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${alt || 'User'}&background=random`;
                    setIsLoaded(true);
                }}
            />
        </div>
    );
};

export default SkeletonImage;
