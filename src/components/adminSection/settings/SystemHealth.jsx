import React from 'react';
import { HiOutlineCpuChip } from 'react-icons/hi2';
import SettingsCard from './SettingsCard';

const SystemHealth = () => {
    return (
        <SettingsCard
            title="System Health"
            subtitle="Current server status and maintenance"
            icon={HiOutlineCpuChip}
        >
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-box rounded-xl border border-default">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">CPU Load</p>
                        <p className="text-lg font-black text-emerald-500">12%</p>
                    </div>
                    <div className="p-3 bg-box rounded-xl border border-default">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Mem Usage</p>
                        <p className="text-lg font-black text-amber-500">64%</p>
                    </div>
                </div>
                <button className="w-full py-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-rose-500 hover:text-white transition-all">
                    Maintenance Mode
                </button>
            </div>
        </SettingsCard>
    );
};

export default SystemHealth;
