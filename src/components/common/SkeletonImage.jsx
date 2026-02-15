import React, { useState } from 'react';

const SkeletonImage = ({ src, alt, className, skeletonClassName }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {!isLoaded && (
                <div className={`absolute inset-0 bg-box/60 animate-pulse ${skeletonClassName}`} />
            )}
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
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
