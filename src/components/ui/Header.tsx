import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Plus } from 'lucide-react';
import { WalletPicker } from '../solana/WalletPicker';
import { useAppSelector } from '@/store';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
    const { address } = useAppSelector((state) => state.auth);

    // Base navigation links
    const navLinks = [
        { path: '/courses', label: 'Courses' },
        { path: '/content', label: 'Content' },
        { path: '/creators', label: 'Creators' },
        { path: '/about', label: 'About' },
    ];

    const createMenuItems = [
        { path: '/create/ebook', label: 'eBook' },
        { path: '/create/research-paper', label: 'Research Paper' },
        { path: '/create/file', label: 'File' },
        { path: '/create/course', label: 'Course' },
        { path: '/create/article', label: 'Article' },
        { path: '/create/video', label: 'Video' },
    ];

    // Add Profile link if wallet is connected
    const allNavLinks = address ? [...navLinks, { path: '/profile', label: 'Profile' }] : navLinks;

    // Effect to handle navigation when wallet disconnects
    useEffect(() => {
        if (!address && location.pathname === '/profile') {
            navigate('/', { replace: true });
        }
    }, [address, location.pathname, navigate]);

    // Close create menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.create-menu')) {
                setIsCreateMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-teal-400 bg-clip-text text-transparent"
                        >
                            Mentora
                        </Link>
                    </div>

                    {/* Navigation and Wallet - Desktop */}
                    <div className="hidden md:flex items-center space-x-8">
                        <nav className="flex items-center space-x-6">
                            {/* Regular Nav Links */}
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`${
                                        location.pathname === link.path
                                            ? 'text-purple-600'
                                            : 'text-gray-700 hover:text-purple-600'
                                    } transition-colors`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Create Dropdown */}
                            {address && (
                                <div className="relative create-menu">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsCreateMenuOpen(!isCreateMenuOpen);
                                        }}
                                        className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors"
                                    >
                                        <Plus className="h-4 w-4" />
                                        <span>Create</span>
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform ${isCreateMenuOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isCreateMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                                            {createMenuItems.map((item) => (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                                                    onClick={() => setIsCreateMenuOpen(false)}
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {address && (
                                <Link
                                    to="/profile"
                                    className={`${
                                        location.pathname === '/profile'
                                            ? 'text-purple-600'
                                            : 'text-gray-700 hover:text-purple-600'
                                    } transition-colors`}
                                >
                                    Profile
                                </Link>
                            )}
                        </nav>

                        {/* Wallet Button */}
                        <WalletPicker />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6 text-gray-700" />
                        ) : (
                            <Menu className="h-6 w-6 text-gray-700" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
                            {/* Mobile Navigation Links */}
                            {allNavLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`${
                                        location.pathname === link.path
                                            ? 'bg-purple-50 text-purple-600'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                                    } block px-3 py-2 rounded-lg text-base font-medium transition-colors`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Mobile Create Menu */}
                            {address && (
                                <div className="px-3 py-2">
                                    <div className="text-sm font-medium text-gray-500 mb-2">
                                        Create Content
                                    </div>
                                    {createMenuItems.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-50 hover:text-purple-600 rounded-lg"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Mobile Wallet Button */}
                            <div className="px-3 py-2">
                                <WalletPicker />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
