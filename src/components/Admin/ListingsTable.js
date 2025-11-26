'use client';

import React from 'react';
import DataTable from '@/components/Admin/DataTable';
import ListingActions from '@/components/Admin/ListingActions';
import Image from 'next/image';

export default function ListingsTable({ listings }) {
    const columns = [
        {
            header: 'Image',
            accessorKey: 'image',
            cell: (row) => (
                <div className="relative w-16 h-12 rounded-md overflow-hidden bg-[#2A2A2A]">
                    <Image
                        src={row.images?.[0] || row.image || '/placeholder.png'}
                        alt={row.title}
                        fill
                        className="object-cover"
                    />
                </div>
            ),
        },
        {
            header: 'Title',
            accessorKey: 'title',
            cell: (row) => <span className="font-medium text-white">{row.title}</span>,
        },
        {
            header: 'Location',
            accessorKey: 'location',
        },
        {
            header: 'Price',
            accessorKey: 'price',
            cell: (row) => `₹${row.price.toLocaleString('en-IN')}`,
        },
        {
            header: 'Actions',
            cell: (row) => <ListingActions listingId={row.id} />,
        },
    ];

    return <DataTable columns={columns} data={listings} searchKey="title" />;
}
