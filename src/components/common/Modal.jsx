import React, { useEffect } from 'react';
import { HiOutlineExclamationTriangle, HiXMark } from 'react-icons/hi2';

const Modal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    children,
    type = 'danger',
    confirmText = 'Confirm',
    cancelText = 'Cancel'
}) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEscape);
        }
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const typeColors = {
        danger: 'bg-rose-500 shadow-rose-500/20',
        primary: 'bg-primary shadow-primary/20',
        success: 'bg-emerald-500 shadow-emerald-500/20'
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-card border border-default rounded-[28px] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
                {/* Header/Banner */}
                <div className={`h-2 w-full ${typeColors[type] || typeColors.primary}`} />

                <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                        <div className="size-12 rounded-2xl bg-box flex items-center justify-center border border-default shadow-inner">
                            <HiOutlineExclamationTriangle className={`text-2xl ${type === 'danger' ? 'text-rose-500' : 'text-primary'}`} />
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-box rounded-xl text-muted transition-colors"
                        >
                            <HiXMark className="text-xl" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-black tracking-tight text-body uppercase">{title}</h2>
                        <div className="text-muted text-sm font-medium leading-relaxed">
                            {children}
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={onConfirm}
                            className={`flex-1 py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all hover:scale-103 active:scale-95 ${typeColors[type] || typeColors.primary}`}
                        >
                            {confirmText}
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest text-body bg-box border border-default hover:bg-default transition-all active:scale-95"
                        >
                            {cancelText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
