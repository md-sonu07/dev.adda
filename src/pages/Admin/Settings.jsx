import React from 'react';
import SettingsHeader from '../../components/admin/settings/SettingsHeader';
import GeneralSettings from '../../components/admin/settings/GeneralSettings';
import SecuritySettings from '../../components/admin/settings/SecuritySettings';
import NotificationSettings from '../../components/admin/settings/NotificationSettings';
import SystemHealth from '../../components/admin/settings/SystemHealth';
import BackupSettings from '../../components/admin/settings/BackupSettings';

const Settings = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
            <SettingsHeader />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GeneralSettings />
                <SecuritySettings />
                <NotificationSettings />
                <SystemHealth />
                <BackupSettings />
            </div>
        </div>
    );
};

export default Settings;
