import React from 'react';
import { CourseList } from '../../components/creator/CourseList';
import { CourseStats } from '../../components/creator/CourseStats';
import { CourseAnalytics } from '../../components/creator/CourseAnalytics';
import { EarningsChart } from '../../components/creator/EarningsChart';

export default function CreatorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Creator Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage your courses and track performance</p>
          </div>
        </div>

        <CourseStats />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <EarningsChart />
            <CourseAnalytics />
          </div>
          <div>
            <CourseList />
          </div>
        </div>
      </div>
    </div>
  );
} 