import React from 'react';
import { Wallet, Menu } from 'lucide-react';
import { SearchBar } from '../ui/SearchBar';
import { Button } from '../ui/Button';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-teal-400 bg-clip-text text-transparent">
              EduChain
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-purple-600">Courses</a>
              <a href="#" className="text-gray-700 hover:text-purple-600">Community</a>
              <a href="#" className="text-gray-700 hover:text-purple-600">About</a>
            </nav>
            
            <SearchBar />
            <Button icon={Wallet}>Connect Wallet</Button>
          </div>

          <button className="md:hidden">
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
}