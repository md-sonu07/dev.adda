import React from 'react';
import UsersHeader from '../../components/admin/users/UsersHeader';
import UserFilters from '../../components/admin/users/UserFilters';
import UsersTable from '../../components/admin/users/UsersTable';

const Users = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <UsersHeader onAddUser={() => console.log('Add user clicked')} />
            <UserFilters />
            <UsersTable />
        </div>
    );
};

export default Users;
