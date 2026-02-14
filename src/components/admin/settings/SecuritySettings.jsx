import React from 'react';
import { HiOutlineShieldCheck } from 'react-icons/hi2';
import SettingsCard from './SettingsCard';

const SecuritySettings = () => {
    return (
        <SettingsCard
            title="Security & Auth"
            subtitle="Manage authentication and protection layers"
            icon={HiOutlineShieldCheck}
        >
            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-box rounded-xl border border-default">
                    <div>
                        <p className="text-xs font-black text-body">Two-Factor Authentication</p>
                        <p className="text-[10px] font-bold text-muted">Require 2FA for all admin accounts</p>
                    </div>
                    <div className="size-10 flex items-center justify-center">
                        <input type="checkbox" defaultChecked className="size-5 accent-primary cursor-pointer" />
                    </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-box rounded-xl border border-default">
                    <div>
                        <p className="text-xs font-black text-body">New User Registration</p>
                        <p className="text-[10px] font-bold text-muted">Allow new users to sign up freely</p>
                    </div>
                    <input type="checkbox" defaultChecked className="size-5 accent-primary cursor-pointer" />
                </div>
            </div>
        </SettingsCard>
    );
};

export default SecuritySettings;
