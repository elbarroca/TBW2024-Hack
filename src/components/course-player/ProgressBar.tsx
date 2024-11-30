import React from 'react';

interface ProgressBarProps {
    progress: number;
    total: number;
}

export function ProgressBar({ progress, total }: ProgressBarProps) {
    const percentage = (progress / total) * 100;

    return (
        <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{Math.round(percentage)}% Complete</span>
                <span>
                    {progress}/{total} Lessons
                </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
                <div
                    className="h-full bg-gradient-to-r from-purple-600 to-teal-400 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
