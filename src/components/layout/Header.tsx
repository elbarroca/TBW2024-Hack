import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectWalletButton } from '../ui/ConnectWalletButton';
import { MobileMenu } from './MobileMenu';

const navLinks = [
  { path: '/courses', label: 'Courses' },
  { path: '/about', label: 'About' },
  { path: '/creators', label: 'Creators' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActivePath = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link 
                to="/" 
                className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-teal-400 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
                aria-label="Mentora Home"
              >
                Mentora
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
                        ? 'text-purple-600 font-medium'
                        : 'text-gray-700 hover:text-purple-600'
                    } transition-colors relative group py-2`}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Link>
                ))}
              </nav>
              <ConnectWalletButton />
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-purple-50 transition-colors"
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