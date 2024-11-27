import React from 'react';
import { Clock, Users, ChevronRight } from 'lucide-react';
import type { Course } from '../types';

const FEATURED_COURSES: Course[] = [
  {
    id: '1',
    title: 'Solana Development Fundamentals',
    description: 'Learn to build decentralized applications on Solana',
    instructor: 'Alex Rivera',
    price: 2.5,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    category: 'Blockchain',
    duration: '8 weeks',
    enrolled: 1234
  },
  {
    id: '2',
    title: 'Web3 Design Patterns',
    description: 'Master the art of designing Web3 applications',
    instructor: 'Sarah Chen',
    price: 1.8,
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766',
    category: 'Design',
    duration: '6 weeks',
    enrolled: 892
  },
  {
    id: '3',
    title: 'Smart Contract Security',
    description: 'Learn to secure blockchain applications',
    instructor: 'Michael Brown',
    price: 3.2,
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
    category: 'Security',
    duration: '10 weeks',
    enrolled: 1567
  }
];

export default function FeaturedCourses() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
          <button className="flex items-center text-purple-600 hover:text-purple-700">
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_COURSES.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  {course.category}
                </span>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}