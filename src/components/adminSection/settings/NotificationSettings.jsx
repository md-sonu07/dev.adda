import React from 'react';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import SettingsCard from './SettingsCard';

const NotificationSettings = () => {
    return (
        <SettingsCard
            title="Email & Notifications"
            subtitle="System alert and user engagement triggers"
            icon={HiOutlineEnvelope}
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2">SMTP Server</label>
                    <input type="text" placeholder="smtp.provider.com" className="w-full px-4 py-3 bg-box border border-default rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
                <div className="flex gap-4">
                    <button className="flex-1 py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all">Save Changes</button>
                    <button className="px-6 py-3 bg-box border border-default text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-card transition-all">Test SMTP</button>
                </div>
            </div>
        </SettingsCard>
    );
};

export default NotificationSettings;
