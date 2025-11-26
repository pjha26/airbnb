'use client';

import React from 'react';
import DataTable from '@/components/Admin/DataTable';
import UserActions from '@/components/Admin/UserActions';
import Image from 'next/image';

export default function UsersTable({ users }) {
    const columns = [
        {
            header: 'User',
            accessorKey: 'name',
            cell: (row) => (
                <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#2A2A2A]">
                        <Image
                            src={row.image || '/placeholder-user.png'}
                            alt={row.name || 'User'}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <p className="font-medium text-white">{row.name || 'Guest'}</p>
                        <p className="text-xs text-gray-400">{row.email}</p>
                    </div>
                </div>
            ),
        },
        {
            header: 'Role',
            accessorKey: 'isAdmin',
            cell: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.isAdmin ? 'bg-purple-900/30 text-purple-400 border border-purple-900' : 'bg-[#2A2A2A] text-gray-400 border border-[#333]'
                    }`}>
                    {row.isAdmin ? 'Admin' : 'User'}
                </span>
            ),
        },
        {
            header: 'Status',
            accessorKey: 'isBlocked',
            cell: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.isBlocked ? 'bg-red-900/30 text-red-400 border border-red-900' : 'bg-green-900/30 text-green-400 border border-green-900'
                    }`}>
                    {row.isBlocked ? 'Blocked' : 'Active'}
                </span>
            ),
        },
        {
            header: 'Actions',
            cell: (row) => <UserActions userId={row.id} isBlocked={row.isBlocked} />,
        },
    ];

    return <DataTable columns={columns} data={users} searchKey="name" />;
}
