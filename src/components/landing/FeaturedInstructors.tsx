import React from 'react';
import { Star, Users, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const instructors = [
  {
    id: '1',
    name: 'Alex Rivera',
    slug: 'alex-rivera',
    role: 'Senior Blockchain Developer',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    rating: 4.8,
    students: 1234,
    courses: 5,
    duration: '8 weeks',
    level: 'Intermediate'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    slug: 'sarah-chen',
    role: 'DeFi Protocol Engineer',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 4.7,
    students: 892,
    courses: 4,
    duration: '6 weeks',
    level: 'Beginner'
  },
  {
    id: '3',
    name: 'Michael Brown',
    slug: 'michael-brown',
    role: 'Smart Contract Auditor',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    rating: 4.9,
    students: 1567,
    courses: 6,
    duration: '10 weeks',
    level: 'Advanced'
  }
];

export function FeaturedInstructors() {
  const navigate = useNavigate();

  const handleInstructorClick = (instructor: typeof instructors[0]) => {
    navigate(`/${instructor.slug}`);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Instructors</h2>
            <p className="mt-2 text-lg text-gray-600">Learn from industry experts</p>
          </div>
          <button 
            onClick={() => navigate('/instructors')}
            className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
          >
            View all
            <span className="text-xl">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => handleInstructorClick(instructor)}
            >
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={instructor.avatar}
                    alt={instructor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{instructor.name}</h3>
                    <p className="text-purple-600">{instructor.role}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{instructor.rating}</span>
                  <span className="text-gray-500">•</span>
                  <Users className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{instructor.students}</span>
                  <span className="text-gray-500">•</span>
                  <BookOpen className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{instructor.courses} courses</span>
                </div>

                <div className="mt-6 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700">
                      {instructor.duration}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-50 text-gray-700">
                      {instructor.level}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInstructorClick(instructor);
                  }}
                  className="mt-6 w-full bg-white text-purple-600 border-2 border-purple-600 px-4 py-2 rounded-full hover:bg-purple-50 transition-colors font-medium"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}