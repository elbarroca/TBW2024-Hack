import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "The NFT certificates add real value to my portfolio. Employers can verify my skills instantly.",
    author: "Alex Thompson",
    role: "Blockchain Developer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    content: "Best platform for learning Solana development. The community support is incredible.",
    author: "Sarah Chen",
    role: "DeFi Engineer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
  },
  {
    id: 3,
    content: "Earned my first Web3 job after completing the Smart Contract Security course.",
    author: "Michael Rodriguez",
    role: "Security Auditor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
  }
];

export function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Students Say</h2>
          <p className="mt-4 text-lg text-gray-600">Join thousands of successful Web3 developers</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-purple-600 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">{testimonial.content}</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}