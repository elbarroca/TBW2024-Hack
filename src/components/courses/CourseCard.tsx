import React from 'react';
import { Clock, Users, Star } from 'lucide-react';
import type { Course } from '../../types/course';
import { Button } from '../ui/Button';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
            {course.category}
          </span>
          {course.rating && (
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium text-gray-600">
                {course.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
        <h3 className="mt-4 text-xl font-semibold text-gray-900">
          {course.title}
        </h3>
        <p className="mt-2 text-gray-600 line-clamp-2">
          {course.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {course.duration}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              {course.enrolled.toLocaleString()}
            </div>
          </div>
          <span className="font-bold text-lg">{course.price} SOL</span>
        </div>
        <Button variant="outline" className="w-full mt-4">
          Learn More
        </Button>
      </div>
    </div>
  );
}