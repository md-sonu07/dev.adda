import React, { useState } from 'react';
import UsersHeader from '../../components/adminSection/users/UsersHeader';
import UserFilters from '../../components/adminSection/users/UserFilters';
import UsersTable from '../../components/adminSection/users/UsersTable';

const Users = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('All Roles');

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <UsersHeader onAddUser={() => console.log('Add user clicked')} />
            <UserFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
            />
            <UsersTable
                searchTerm={searchTerm}
                selectedRole={selectedRole}
            />
        </div>
    );
};

export default Users;
