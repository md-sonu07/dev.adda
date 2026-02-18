import React, { useState, useEffect } from 'react';
import { HiOutlineLink, HiXMark } from 'react-icons/hi2';

const InputModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    placeholder,
    label,
    confirmText = 'Insert',
    initialValue = ''
}) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (isOpen) {
            setValue(initialValue);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen, initialValue]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(value);
        setValue('');
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
                <div className="h-2 w-full bg-primary" />

                <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                        <div className="size-12 rounded-2xl bg-box flex items-center justify-center border border-default shadow-inner">
                            <HiOutlineLink className="text-2xl text-primary" />
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-box rounded-xl text-muted transition-colors"
                        >
                            <HiXMark className="text-xl" />
                        </button>
                    </div>

                    <div className="space-y-4 mb-8">
                        <h2 className="text-xl font-black tracking-tight text-body uppercase">{title}</h2>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted block ml-1">{label}</label>
                            <input
                                autoFocus
                                id="modal-input"
                                name="modal-input"
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder={placeholder}
                                className="w-full bg-box border border-default rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleSubmit}
                            disabled={!value.trim()}
                            className="flex-1 py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white bg-primary shadow-lg shadow-primary/20 transition-all hover:scale-103 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                        >
                            {confirmText}
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest text-body bg-box border border-default hover:bg-default transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputModal;
