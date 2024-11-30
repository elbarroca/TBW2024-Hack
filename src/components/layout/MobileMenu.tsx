import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { SearchBar } from '../ui/SearchBar';
import { Button } from '../ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ path: string; label: string; }>;
}

export function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  const location = useLocation();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      {/* Menu panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="text-lg font-semibold text-gray-900">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        <div className="px-4 py-6 space-y-6">
          <SearchBar />

          <nav className="space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`block py-2 ${
                  location.pathname === link.path
                    ? 'text-purple-600'
                    : 'text-gray-700 hover:text-purple-600'
                } transition-colors`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-gray-100">
            <Button 
              icon="Wallet"
              onClick={() => {
                console.log('Connect wallet clicked');
                onClose();
              }}
              className="w-full justify-center"
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 