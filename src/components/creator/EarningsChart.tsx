import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', earnings: 2.5 },
  { month: 'Feb', earnings: 3.8 },
  { month: 'Mar', earnings: 5.2 },
  { month: 'Apr', earnings: 4.7 },
  { month: 'May', earnings: 6.3 },
  { month: 'Jun', earnings: 7.1 }
];

export function EarningsChart() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Earnings Overview</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem'
              }}
              formatter={(value) => [`${value} SOL`, 'Earnings']}
            />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: '#8b5cf6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}