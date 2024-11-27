import React from 'react';
import { EarningsChart } from './EarningsChart';
import { CourseStats } from './CourseStats';
import { CourseList } from './CourseList';
import { CourseAnalytics } from './CourseAnalytics';
import { Button } from '../ui/Button';
import { Plus, Filter } from 'lucide-react';

export function CreatorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Creator Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage your courses and track performance</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" icon={Filter}>Filter</Button>
            <Button icon={Plus}>Create New Course</Button>
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