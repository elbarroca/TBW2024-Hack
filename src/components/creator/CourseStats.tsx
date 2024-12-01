import React from 'react';
import { Users, Clock, BookOpen, Award } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string;
    icon: React.ElementType;
    trend?: {
        value: number;
        positive: boolean;
    };
}

function StatCard({ label, value, icon: Icon, trend }: StatCardProps) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{label}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
                    {trend && (
                        <div
                            className={`mt-2 flex items-center text-sm ${trend.positive ? 'text-green-600' : 'text-red-600'}`}
                        >
                            <span>
                                {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
                            </span>
                            <span className="ml-2">vs last month</span>
                        </div>
                    )}
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                    <Icon className="h-6 w-6 text-purple-600" />
                </div>
            </div>
        </div>
    );
}

export function CourseStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                label="Active Students"
                value="1,234"
                icon={Users}
                trend={{ value: 12, positive: true }}
            />
            <StatCard
                label="Avg. Completion Rate"
                value="87%"
                icon={Clock}
                trend={{ value: 5, positive: true }}
            />
            <StatCard label="Total Courses" value="8" icon={BookOpen} />
            <StatCard
                label="Certificates Issued"
                value="956"
                icon={Award}
                trend={{ value: 8, positive: true }}
            />
        </div>
    );
}
