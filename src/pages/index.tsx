import React from 'react';
import Header from '../components/layout/Header';
import Hero from '../components/Hero';
import { Stats } from '../components/landing/Stats';
import { Testimonials } from '../components/landing/Testimonials';
import { FeaturedInstructors } from '../components/landing/FeaturedInstructors';
import FeaturedCourses from '../components/FeaturedCourses';
import { CategoryList } from '../components/courses/CategoryList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <CategoryList />
        <FeaturedCourses />
        <FeaturedInstructors />
        <Stats />
        <Testimonials />
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EduChain</h3>
              <p className="text-gray-400">Empowering the next generation of Web3 developers</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Courses</li>
                <li>Tutorials</li>
                <li>Documentation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Discord</li>
                <li>Twitter</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
