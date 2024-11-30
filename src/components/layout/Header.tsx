import { useState } from 'react';
import { Wallet, Menu, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SearchBar } from '../ui/SearchBar';
import { Button } from '../ui/Button';
import { MobileMenu } from './MobileMenu';

const navLinks = [
  { path: '/courses', label: 'Courses' },
  { path: '/about', label: 'About' },
  { path: '/creator/dashboard', label: 'Creator Dashboard' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActivePath = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link 
                to="/" 
                className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-teal-400 bg-clip-text text-transparent"
                aria-label="EduChain Home"
              >
                EduChain
              </Link>
            </div>

            {/* Desktop Navigation */}
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
              
              <SearchBar />

              <Button 
                icon={Wallet}
                onClick={() => console.log('Connect wallet clicked')}
              >
                Connect Wallet
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}