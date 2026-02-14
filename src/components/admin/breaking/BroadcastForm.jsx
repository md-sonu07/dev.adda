import React from 'react';
import { HiOutlineMegaphone } from 'react-icons/hi2';

const BroadcastForm = () => {
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
                    <select className="w-full px-4 py-3 bg-box border border-default rounded-xl text-[10px] font-black uppercase tracking-widest outline-none">
                        <option>General Info</option>
                        <option>Breaking Event</option>
                        <option>Emergency Alert</option>
                    </select>
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
