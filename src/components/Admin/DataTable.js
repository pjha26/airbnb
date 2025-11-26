'use client';

import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const DataTable = ({ columns, data, searchKey }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 10;

    // Filter data
    const filteredData = data.filter((item) => {
        if (!searchKey || !searchTerm) return true;
        const value = item[searchKey];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="bg-[#1E1E1E] rounded-xl shadow-lg border border-[#333333] overflow-hidden">
            {/* Header / Search */}
            <div className="p-4 border-b border-[#333333] flex justify-between items-center">
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#2A2A2A] border border-[#333333] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent placeholder-gray-500"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-[#2A2A2A]">
                        <tr>
                            {columns.map((col, idx) => (
                                <th
                                    key={idx}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#333333]">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, rowIdx) => (
                                <tr key={rowIdx} className="hover:bg-[#2A2A2A] transition-colors">
                                    {columns.map((col, colIdx) => (
                                        <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {col.cell ? col.cell(row) : row[col.accessorKey]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                                    No results found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-[#333333] flex justify-between items-center">
                <span className="text-sm text-gray-400">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 border border-[#333333] text-gray-400 rounded-lg hover:bg-[#2A2A2A] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 border border-[#333333] text-gray-400 rounded-lg hover:bg-[#2A2A2A] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
