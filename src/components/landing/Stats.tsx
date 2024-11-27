import React from 'react';
import { Users, BookOpen, Award } from 'lucide-react';

const stats = [
  {
    label: 'Active Learners',
    value: '50K+',
    icon: Users,
    description: 'Growing community of Web3 enthusiasts'
  },
  {
    label: 'Courses',
    value: '200+',
    icon: BookOpen,
    description: 'Expert-curated blockchain content'
  },
  {
    label: 'Certificates Issued',
    value: '25K+',
    icon: Award,
    description: 'NFT-backed credentials'
  }
];

export function Stats() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute -top-4 left-8">
                <div className="bg-gradient-to-r from-purple-600 to-teal-400 p-3 rounded-xl">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-teal-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">{stat.label}</h3>
                <p className="mt-2 text-gray-600">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}