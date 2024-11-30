import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORIES = [
    { id: 'blockchain', name: 'Blockchain', icon: '🔗' },
    { id: 'defi', name: 'DeFi', icon: '💰' },
    { id: 'nft', name: 'NFT', icon: '🎨' },
    { id: 'web3', name: 'Web3', icon: '🌐' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'development', name: 'Development', icon: '💻' },
];

export function CategoryList() {
    const scrollContainer = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainer.current) {
            const scrollAmount = direction === 'left' ? -200 : 200;
            scrollContainer.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
            >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>

            <div
                ref={scrollContainer}
                className="flex space-x-4 overflow-x-auto scrollbar-hide py-4 px-8"
            >
                {CATEGORIES.map((category) => (
                    <button
                        key={category.id}
                        className="flex items-center space-x-2 whitespace-nowrap px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-purple-400 transition-colors"
                    >
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                    </button>
                ))}
            </div>

            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
            >
                <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
        </div>
    );
}
