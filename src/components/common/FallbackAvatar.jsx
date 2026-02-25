import React, { useState } from 'react';

const FallbackAvatar = ({ name, className = "" }) => {
    const [bgColor] = useState(() => {
        const colors = ['#ef4444', '#f97316', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
        return colors[Math.floor(Math.random() * colors.length)];
    });

    let initials = 'U';
    if (name) {
        const parts = name.trim().split(' ').filter(Boolean);
        if (parts.length === 1) {
            initials = parts[0].charAt(0).toUpperCase();
        } else if (parts.length > 1) {
            initials = (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
        }
    }

    return (
        <div
            className={`w-full h-full flex items-center justify-center overflow-hidden ${className}`}
            style={{
                backgroundColor: bgColor,
                containerType: 'size'
            }}
        >
            <span
                className="font-medium text-white flex items-center justify-center"
                style={{ fontSize: 'clamp(8px, 45cqmin, 6rem)', lineHeight: 0}}
            >
                {initials}
            </span>
        </div>
    );
};

export default FallbackAvatar;
