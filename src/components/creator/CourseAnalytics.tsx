import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const analyticsData = [
    { week: 'Week 1', completions: 45, engagement: 78 },
    { week: 'Week 2', completions: 52, engagement: 85 },
    { week: 'Week 3', completions: 38, engagement: 65 },
    { week: 'Week 4', completions: 61, engagement: 89 },
    { week: 'Week 5', completions: 55, engagement: 92 },
    { week: 'Week 6', completions: 58, engagement: 88 },
];

export function CourseAnalytics() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Course Analytics</h3>
                <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="last6weeks">Last 6 Weeks</option>
                    <option value="last3months">Last 3 Months</option>
                    <option value="lastyear">Last Year</option>
                </select>
            </div>

            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="week" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '0.5rem',
                            }}
                        />
                        <Bar
                            dataKey="completions"
                            name="Completions"
                            fill="#8b5cf6"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="engagement"
                            name="Engagement"
                            fill="#06b6d4"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Average Completion Rate</p>
                    <p className="text-2xl font-bold text-purple-600">78%</p>
                </div>
                <div className="p-4 bg-cyan-50 rounded-lg">
                    <p className="text-sm text-gray-600">Student Engagement</p>
                    <p className="text-2xl font-bold text-cyan-600">85%</p>
                </div>
            </div>
        </div>
    );
}
