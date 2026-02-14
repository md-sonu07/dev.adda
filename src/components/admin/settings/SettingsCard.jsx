import React from 'react';

const SettingsCard = ({ title, subtitle, icon: Icon, children }) => (
    <div className="bg-card rounded-2xl border border-default p-6 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="text-xl text-primary" />
            </div>
            <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-body">{title}</h3>
                <p className="text-xs font-bold text-muted">{subtitle}</p>
            </div>
        </div>
        {children}
    </div>
);

export default SettingsCard;
