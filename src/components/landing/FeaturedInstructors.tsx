import React from 'react';
import { Star, Award } from 'lucide-react';

const instructors = [
  {
    id: 1,
    name: 'Alex Rivera',
    role: 'Senior Blockchain Developer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    rating: 4.9,
    students: 12500,
    courses: 5,
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'DeFi Protocol Engineer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    rating: 4.8,
    students: 9800,
    courses: 4,
  },
  {
    id: 3,
    name: 'Michael Brown',
    role: 'Smart Contract Auditor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    rating: 4.9,
    students: 11200,
    courses: 6,
  },
];

export function FeaturedInstructors() {
  return (
    <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Learn from Industry Experts</h2>
          <p className="mt-4 text-lg text-gray-600">Our instructors are leading professionals in Web3</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center">
                <img
                  src={instructor.avatar}
                  alt={instructor.name}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-purple-100"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{instructor.name}</h3>
                <p className="text-purple-600">{instructor.role}</p>
                
                <div className="flex items-center mt-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-gray-600">{instructor.rating}</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-purple-600">
                    {(instructor.students / 1000).toFixed(1)}k
                  </p>
                  <p className="text-sm text-gray-600">Students</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-purple-600">{instructor.courses}</p>
                  <p className="text-sm text-gray-600">Courses</p>
                </div>
              </div>

              <button className="mt-6 w-full bg-white border-2 border-purple-600 text-purple-600 px-4 py-2 rounded-full hover:bg-purple-50 transition-colors">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}