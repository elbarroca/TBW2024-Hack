import { Hero } from '../components/landing/Hero';
import { Stats } from '../components/landing/Stats';
import FeaturedCourses from '../components/landing/FeaturedCourses';
import FeaturedCreators from '../components/landing/FeaturedCreators';
import { Testimonials } from '../components/landing/Testimonials';
import { CallToAction } from '../components/landing/CallToAction';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="relative">
        <Hero />
        <Stats />
        <FeaturedCourses />
        <FeaturedCreators />
        <Testimonials />
        <CallToAction />
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Mentora</h3>
              <p className="text-gray-400">Empowering the next generation of Web3 developers</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Courses</li>
                <li className="hover:text-white cursor-pointer transition-colors">Tutorials</li>
                <li className="hover:text-white cursor-pointer transition-colors">Documentation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Discord</li>
                <li className="hover:text-white cursor-pointer transition-colors">Twitter</li>
                <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
                <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2024 Mentora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
