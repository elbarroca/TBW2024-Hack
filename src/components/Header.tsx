import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Wallet, Menu } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/courses', label: 'Courses' },
    { path: '/community', label: 'Community' },
    { path: '/about', label: 'About' },
  ];

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-teal-400 bg-clip-text text-transparent">
              EduChain
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${
                    isActivePath(link.path)
                      ? 'text-purple-600'
                      : 'text-gray-700 hover:text-purple-600'
                  } transition-colors`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-teal-400 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
              <Wallet className="h-4 w-4" />
              <span>Connect Wallet</span>
            </button>
          </div>

          <button className="md:hidden">
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
}