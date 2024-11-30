import React from 'react';
import { MoreVertical, Users } from 'lucide-react';

const courses = [
    {
        id: '1',
        title: 'Solana Development Fundamentals',
        students: 234,
        progress: 78,
    },
    {
        id: '2',
        title: 'Web3 Design Patterns',
        students: 189,
        progress: 92,
    },
    {
        id: '3',
        title: 'Smart Contract Security',
        students: 156,
        progress: 45,
    },
];

export function CourseList() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Active Courses</h3>
            <div className="space-y-4">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="p-4 rounded-lg border border-gray-100 hover:border-purple-200 transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{course.title}</h4>
                            <button className="p-1 hover:bg-gray-100 rounded-full">
                                <MoreVertical className="h-4 w-4 text-gray-500" />
                            </button>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-sm">
                            <div className="flex items-center text-gray-500">
                                <Users className="h-4 w-4 mr-1" />
                                {course.students} students
                            </div>
                            <div className="flex items-center">
                                <div className="w-32 h-2 bg-gray-100 rounded-full mr-2">
                                    <div
                                        className="h-full bg-purple-600 rounded-full"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>
                                <span className="text-gray-600">{course.progress}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
