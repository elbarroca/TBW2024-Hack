import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Plus, BookOpen, Layout, Users, Info, LucideIcon } from 'lucide-react';
import { useAppSelector } from '@/store';
import { WalletPicker } from '../solana/WalletPicker';

interface NavLink {
    path: string;
    label: string;
    icon: LucideIcon;
}

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
    const { user } = useAppSelector((state) => state.auth);

    // Base navigation links with icons
    const navLinks: NavLink[] = [
        { path: '/courses', label: 'Courses', icon: BookOpen },
        { path: '/content', label: 'Content', icon: Layout },
        { path: '/creators', label: 'Creators', icon: Users },
        { path: '/about', label: 'About', icon: Info },
    ];

    // Create menu items - only shown when connected
    const createMenuItems = [
        { path: '/create/ebook', label: 'eBook' },
        { path: '/create/file', label: 'File' },
        { path: '/create/course', label: 'Course' },
        { path: '/create/article', label: 'Article' },
        { path: '/create/video', label: 'Video' },
    ];

    // Add Profile link only if wallet is connected
    const allNavLinks = user ? [...navLinks, { path: '/profile', label: 'Profile', icon: Users }] : navLinks;

    // Effect to handle navigation when wallet disconnects
    useEffect(() => {
        if (!user && location.pathname === '/profile') {
            navigate('/', { replace: true });
        }
    }, [user, location.pathname, navigate]);

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
        <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
                            aria-label="Mentora Home"
                        >
                            <img 
                                src="/logo.svg" 
                                alt="Mentora" 
                                className="h-20 w-auto" 
                                width="324"
                                height="128"
                            />
                        </Link>
                    </div>

                    {/* Navigation and Wallet - Desktop */}
                    <div className="hidden md:flex items-center space-x-8">
                        <nav className="flex items-center space-x-6">
                            {/* Regular Nav Links */}
                            {allNavLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`${
                                        location.pathname === link.path
                                            ? 'text-purple-600 font-medium'
                                            : 'text-gray-600 hover:text-purple-600'
                                    } transition-colors relative py-2 text-sm font-medium group flex items-center space-x-1.5`}
                                >
                                    <link.icon className="h-4 w-4" />
                                    <span>{link.label}</span>
                                    <span 
                                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform origin-left transition-transform duration-200 ease-out ${
                                            location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                        }`}
                                    />
                                </Link>
                            ))}

                            {/* Create Dropdown - Only show when connected */}
                            {user && (
                                <div className="relative create-menu">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsCreateMenuOpen(!isCreateMenuOpen);
                                        }}
                                        className="flex items-center space-x-1.5 text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium"
                                    >
                                        <Plus className="h-4 w-4" />
                                        <span>Create</span>
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform duration-200 ${isCreateMenuOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isCreateMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
                                            {createMenuItems.map((item) => (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                                                    onClick={() => setIsCreateMenuOpen(false)}
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </nav>

                        {/* Wallet Button */}
                        <div className="flex items-center">
                            <WalletPicker />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-purple-50 transition-colors"
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6 text-gray-600" />
                        ) : (
                            <Menu className="h-6 w-6 text-gray-600" />
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
                                            : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                                    } flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-colors`}
                                >
                                    {link.icon && <link.icon className="h-5 w-5" />}
                                    <span>{link.label}</span>
                                </Link>
                            ))}

                            {/* Mobile Create Menu - Only show when connected */}
                            {user && (
                                <div className="px-3 py-2">
                                    <div className="text-sm font-medium text-gray-500 mb-2">
                                        Create Content
                                    </div>
                                    {createMenuItems.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block px-3 py-2 text-base text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
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
