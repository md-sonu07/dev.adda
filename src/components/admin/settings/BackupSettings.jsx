import React from 'react';
import { HiOutlineCloudArrowUp } from 'react-icons/hi2';
import SettingsCard from './SettingsCard';

const BackupSettings = () => {
    return (
        <SettingsCard
            title="Backups & Data"
            subtitle="Database snapshots and export tools"
            icon={HiOutlineCloudArrowUp}
        >
            <div className="flex flex-col gap-3">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Last Backup: 2h ago</p>
                    <button className="text-[9px] font-black uppercase tracking-widest bg-emerald-500 text-white px-3 py-1 rounded-lg">Restore</button>
                </div>
                <button className="w-full py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all">
                    Create Full Cloud Backup
                </button>
            </div>
        </SettingsCard>
    );
};

export default BackupSettings;
