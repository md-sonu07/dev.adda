import React from 'react';
import { HiOutlinePaintBrush } from 'react-icons/hi2';
import SettingsCard from './SettingsCard';

const GeneralSettings = () => {
    return (
        <SettingsCard
            title="Platform Identity"
            subtitle="Basic configuration for your news portal"
            icon={HiOutlinePaintBrush}
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2">Portal Name</label>
                    <input type="text" defaultValue="DevAdda" className="w-full px-4 py-3 bg-box border border-default rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2">Portal Description</label>
                    <textarea rows="3" defaultValue="The ultimate engineering news and journal platform." className="w-full px-4 py-3 bg-box border border-default rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
                </div>
            </div>
        </SettingsCard>
    );
};

export default GeneralSettings;
