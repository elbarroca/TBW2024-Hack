import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Star, Users, BookOpen, ChevronRight, Award } from 'lucide-react';

type Instructor = {
  id: number;
  name: string;
  expertise: string;
  image: string;
  bio: string;
  courses: number;
  students: number;
  category: 'twitter' | 'professor' | 'provider';
  rating: number;
  twitterHandle?: string;
  slug: string;
  isTopInstructor?: boolean;
};

const instructors: Instructor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    expertise: 'Blockchain Development',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Expert in blockchain architecture and smart contract development',
    courses: 3,
    students: 1200,
    category: 'professor',
    rating: 4.9,
    slug: 'sarah-johnson',
    isTopInstructor: true
  },
  {
    id: 2,
    name: 'Prof. Michael Chen',
    expertise: 'Web3 Technologies',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Specializes in decentralized applications and Web3 integration',
    courses: 5,
    students: 2300,
    category: 'twitter',
    rating: 4.8,
    twitterHandle: '@web3chen',
    slug: 'michael-chen'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    expertise: 'Smart Contract Security',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Security expert focusing on smart contract auditing and best practices',
    courses: 4,
    students: 1800,
    category: 'provider',
    rating: 4.7,
    slug: 'emma-rodriguez',
    isTopInstructor: true
  },
];

const StatCard = ({ icon: Icon, value, label }: { icon: any, value: string, label: string }) => (
  <div className="group relative bg-white/10 backdrop-blur-lg rounded-xl p-4 flex items-center space-x-4 
                  transform hover:scale-105 transition-all duration-300 overflow-hidden
                  hover:bg-white/15 hover:shadow-lg hover:shadow-purple-500/20">
    <div className="absolute inset-0 bg-gradient-to-r from-[#6c63ff]/0 to-[#00ffa3]/0 
                    group-hover:from-[#6c63ff]/10 group-hover:to-[#00ffa3]/10 
                    transition-all duration-300 pointer-events-none" />
    
    <div className="relative p-3 bg-white/20 rounded-lg transform group-hover:rotate-6 
                    transition-transform duration-300 group-hover:bg-white/30">
      <Icon className="h-6 w-6 text-white transform group-hover:scale-110 transition-transform duration-300" />
    </div>
    
    <div className="relative">
      <div className="text-2xl font-bold text-white transform transition-all duration-300 
                      group-hover:translate-x-1 group-hover:text-transparent group-hover:bg-clip-text 
                      group-hover:bg-gradient-to-r group-hover:from-[#6c63ff] group-hover:to-[#00ffa3]">
        {value}
      </div>
      <div className="text-purple-100 text-sm transform transition-all duration-300 
                      group-hover:translate-x-1">
        {label}
      </div>
    </div>
  </div>
);

export default function InstructorsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCtaExpanded, setIsCtaExpanded] = useState(true);

  const filteredInstructors = instructors.filter(instructor => {
    const matchesCategory = selectedCategory === 'all' || instructor.category === selectedCategory;
    const matchesSearch = instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         instructor.expertise.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', name: 'All Instructors' },
    { id: 'twitter', name: 'Twitter Influencers' },
    { id: 'professor', name: 'Professors' },
    { id: 'provider', name: 'Course Providers' },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Enhanced Gradient */}
      <div className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 overflow-hidden pt-20">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
        </div>
        
        <div className="relative">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
                Meet Our Expert Instructors
              </h1>
              <p className="text-xl text-purple-100 leading-relaxed">
                Learn from industry leaders, academic professionals, and thought influencers in your field
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <StatCard icon={Users} value="500+" label="Active Students" />
              <StatCard icon={BookOpen} value="50+" label="Courses" />
              <StatCard icon={Star} value="4.9" label="Average Rating" />
            </div>
          </div>
        </div>
      </div>

      {/* Instructor Grid Container with increased spacing */}
      <div className="container mx-auto px-4 py-12 mb-20">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Enhanced Search and Filter Section */}
          <div className="mb-12 space-y-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search instructors by name or expertise..."
                className="w-full pl-12 pr-4 py-4 border-0 rounded-full bg-white shadow-lg focus:ring-2 focus:ring-purple-500 transition-shadow duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex justify-center gap-3 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105
                    ${selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Instructor Grid with improved spacing and hover effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInstructors.map((instructor) => (
              <Link
                to={`/creator/${instructor.slug}`}
                key={instructor.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                <div className="relative">
                  <div className="aspect-w-3 aspect-h-2">
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {instructor.isTopInstructor && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#6c63ff] to-[#00ffa3] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Award className="w-4 h-4" />
                      <span>Top Instructor</span>
                    </div>
                  )}
                  {instructor.category === 'twitter' && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-[#6c63ff] to-[#00ffa3] text-white text-xs px-3 py-1 rounded-full shadow-lg">
                      {instructor.twitterHandle}
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#6c63ff] transition-colors">
                      {instructor.name}
                    </h2>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-700">
                        {instructor.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-[#6c63ff] font-medium text-sm">
                    {instructor.expertise}
                  </p>

                  <p className="text-gray-600 line-clamp-2">
                    {instructor.bio}
                  </p>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex space-x-4">
                        <span className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {instructor.courses} Courses
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {instructor.students.toLocaleString()} Students
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#6c63ff] transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Floating CTA Side Banner */}
      <div 
        className={`fixed right-8 bottom-8 transition-all duration-300 transform ${
          isCtaExpanded ? 'w-[280px]' : 'w-[60px]'
        } rounded-xl overflow-hidden shadow-lg backdrop-blur-lg`}
      >
        <div 
          className="bg-gradient-to-r from-[#6c63ff] to-[#00ffa3] p-4 cursor-pointer"
          onClick={() => setIsCtaExpanded(!isCtaExpanded)}
        >
          <div className="flex items-center justify-between">
            {isCtaExpanded ? (
              <>
                <div className="text-white">
                  <h2 className="text-lg font-bold mb-1">Become an Instructor</h2>
                  <p className="text-sm text-white/90">Join our expert community</p>
                </div>
                <ChevronRight 
                  className={`w-5 h-5 text-white transform transition-transform ${
                    isCtaExpanded ? 'rotate-180' : ''
                  }`}
                />
              </>
            ) : (
              <div className="w-full flex justify-center">
                <ChevronRight 
                  className="w-5 h-5 text-white transform hover:scale-110 transition-transform"
                />
              </div>
            )}
          </div>
          {isCtaExpanded && (
            <button 
              className="mt-4 w-full px-4 py-2 bg-white text-[#6c63ff] rounded-lg font-medium 
                       hover:bg-purple-50 transform hover:scale-105 transition-all duration-200"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </main>
  );
} 