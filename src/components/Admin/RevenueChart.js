'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RevenueChart = ({ data }) => {
    return (
        <div className="h-[400px] w-full bg-[#1E1E1E] p-6 rounded-xl shadow-lg border border-[#333333]">
            <h3 className="text-lg font-bold text-white mb-6">Revenue Overview</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333333" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        tickFormatter={(value) => `₹${value}`}
                    />
                    <Tooltip
                        cursor={{ fill: '#2A2A2A' }}
                        contentStyle={{
                            backgroundColor: '#1E1E1E',
                            borderRadius: '8px',
                            border: '1px solid #333333',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
                            color: '#fff'
                        }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Bar
                        dataKey="total"
                        fill="#FF385C"
                        radius={[4, 4, 0, 0]}
                        barSize={40}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueChart;
