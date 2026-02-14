import React from 'react';
import { HiOutlineUserPlus } from 'react-icons/hi2';

const UsersHeader = ({ onAddUser }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-black uppercase tracking-tight">User Management</h1>
                <p className="text-muted text-sm font-bold">Manage system users, roles and permissions</p>
            </div>
            <button
                onClick={onAddUser}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20"
            >
                <HiOutlineUserPlus className="text-lg" />
                Add New User
            </button>
        </div>
    );
};

export default UsersHeader;
