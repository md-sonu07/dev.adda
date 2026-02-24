import React, { useState } from 'react';
import { HiOutlineMegaphone, HiChevronDown } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';

const BroadcastForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('General Info');
    const types = ['General Info', 'Breaking Event', 'Emergency Alert'];
    return (
        <div className="bg-card border border-default rounded-2xl p-6 shadow-sm h-fit sticky top-24">
            <div className="flex items-center gap-2 mb-6">
                <HiOutlineMegaphone className="text-xl text-primary" />
                <h3 className="text-xs font-black uppercase tracking-widest text-body">New Broadcast</h3>
            </div>

            <form className="space-y-4">
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2">Alert Title</label>
                    <input type="text" placeholder="E.g. Apple Event 2024" className="w-full px-4 py-3 bg-box border border-default rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2">Notice Type</label>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full px-4 py-3 bg-box border border-default rounded-xl text-[10px] font-black uppercase tracking-widest outline-none flex items-center justify-between hover:bg-default transition-all"
                        >
                            {selectedType}
                            <HiChevronDown className={`text-sm transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute left-0 top-full mt-2 w-full bg-card border border-default rounded-2xl shadow-2xl overflow-hidden z-50 p-1.5"
                                    >
                                        {types.map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedType(type);
                                                    setIsOpen(false);
                                                }}
                                                className={`w-full text-left px-3 py-2.5 mb-1 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedType === type
                                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                                    : 'hover:bg-box text-muted hover:text-body'
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2">Short Description</label>
                    <textarea rows="3" placeholder="Brief details about the alert..." className="w-full px-4 py-3 bg-box border border-default rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
                </div>
                <button className="w-full py-4 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
                    Launch Broadcast
                </button>
            </form>
        </div>
    );
};

export default BroadcastForm;
