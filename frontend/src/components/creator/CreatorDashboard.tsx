import React, { useState } from 'react';
import { EarningsChart } from './EarningsChart';
import { CourseStats } from './CourseStats';
import { CourseList } from './CourseList';
import { CourseAnalytics } from './CourseAnalytics';
import { Button } from '../ui/CustomButton';
import { Plus, Filter, Download, Upload } from 'lucide-react';

// Sample data - replace with real data from your backend
const DASHBOARD_STATS = {
    totalStudents: 1250,
    totalEarnings: 450.75,
    averageRating: 4.8,
    completionRate: 85,
};

export function CreatorDashboard() {
    const [selectedTimeRange, setSelectedTimeRange] = useState('last6weeks');
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

    const handleCreateCourse = () => {
        // Navigate to course creation page
        window.location.href = '/creator/courses/new';
    };

    const handleExportData = () => {
        // In a real app, this would trigger a CSV download
        console.log('Exporting analytics data...');
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Creator Dashboard</h1>
                        <p className="mt-2 text-gray-600">
                            Manage your courses and track performance
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" icon={Download} onClick={handleExportData}>
                            Export Data
                        </Button>
                        <Button variant="outline" icon={Filter}>
                            Filter
                        </Button>
                        <Button icon={Plus} onClick={handleCreateCourse}>
                            Create Course
                        </Button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-gray-500 text-sm font-medium">Total Students</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            {DASHBOARD_STATS.totalStudents}
                        </p>
                        <div className="mt-2 text-sm text-green-600">↑ 12% from last month</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-gray-500 text-sm font-medium">Total Earnings</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            {DASHBOARD_STATS.totalEarnings} SOL
                        </p>
                        <div className="mt-2 text-sm text-green-600">↑ 8% from last month</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-gray-500 text-sm font-medium">Average Rating</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            {DASHBOARD_STATS.averageRating}
                        </p>
                        <div className="mt-2 text-sm text-gray-600">From 350 reviews</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-gray-500 text-sm font-medium">Completion Rate</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            {DASHBOARD_STATS.completionRate}%
                        </p>
                        <div className="mt-2 text-sm text-green-600">↑ 5% from last month</div>
                    </div>
                </div>

                {/* Analytics Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Time Range Selector */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Performance Overview
                                </h3>
                                <select
                                    value={selectedTimeRange}
                                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="last6weeks">Last 6 Weeks</option>
                                    <option value="last3months">Last 3 Months</option>
                                    <option value="lastyear">Last Year</option>
                                </select>
                            </div>
                            <EarningsChart />
                        </div>

                        <CourseAnalytics />
                    </div>

                    {/* Course List and Quick Actions */}
                    <div className="space-y-8">
                        <CourseList />

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Quick Actions
                            </h3>
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-between p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center">
                                        <Upload className="h-5 w-5 text-gray-400 mr-3" />
                                        <span>Upload New Content</span>
                                    </div>
                                    <span className="text-gray-400">→</span>
                                </button>
                                <button className="w-full flex items-center justify-between p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center">
                                        <Download className="h-5 w-5 text-gray-400 mr-3" />
                                        <span>Download Reports</span>
                                    </div>
                                    <span className="text-gray-400">→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
