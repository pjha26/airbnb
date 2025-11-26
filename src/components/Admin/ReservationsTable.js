'use client';

import React from 'react';
import DataTable from '@/components/Admin/DataTable';

export default function ReservationsTable({ reservations }) {
    const columns = [
        {
            header: 'Listing',
            accessorKey: 'listing.title',
            cell: (row) => <span className="font-medium text-white">{row.listing?.title || 'Unknown Listing'}</span>,
        },
        {
            header: 'Guest',
            accessorKey: 'user.name',
            cell: (row) => (
                <div>
                    <p className="font-medium text-white">{row.user?.name || 'Unknown Guest'}</p>
                    <p className="text-xs text-gray-400">{row.user?.email}</p>
                </div>
            ),
        },
        {
            header: 'Dates',
            cell: (row) => {
                const start = new Date(row.startDate).toLocaleDateString();
                const end = new Date(row.endDate).toLocaleDateString();
                return (
                    <div className="text-sm text-gray-300">
                        <p>{start}</p>
                        <p className="text-gray-500 text-xs">to</p>
                        <p>{end}</p>
                    </div>
                );
            },
        },
        {
            header: 'Price',
            accessorKey: 'totalPrice',
            cell: (row) => `₹${row.totalPrice.toLocaleString('en-IN')}`,
        },
        {
            header: 'Status',
            accessorKey: 'paymentStatus',
            cell: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.paymentStatus === 'PAID' ? 'bg-green-900/30 text-green-400 border border-green-900' :
                        row.paymentStatus === 'PENDING' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-900' :
                            'bg-red-900/30 text-red-400 border border-red-900'
                    }`}>
                    {row.paymentStatus}
                </span>
            ),
        },
    ];

    return <DataTable columns={columns} data={reservations} searchKey="listing.title" />;
}
