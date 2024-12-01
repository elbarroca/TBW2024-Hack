import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ConnectWalletButton } from '../ui/ConnectWalletButton';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navLinks: Array<{ path: string; label: string }>;
}

export function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={onClose} />

            {/* Menu panel */}
            <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="px-4 py-6">
                    <nav className="space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="block py-2 text-base font-medium text-gray-900 hover:text-purple-600"
                                onClick={onClose}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-6 pt-6 border-t">
                        <ConnectWalletButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
