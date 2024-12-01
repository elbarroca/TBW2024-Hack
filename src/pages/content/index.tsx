import { useState } from 'react';
import { CategoryList } from '@/components/courses/CategoryList';
import { ChevronDown, Search, Filter } from 'lucide-react';
import { ContentCard } from '@/components/content/ContentCard';

interface ContentItem {
    id: string;
    title: string;
    creator: string;
    price: number;
    type: string;
    thumbnail: string;
    downloads: number;
    rating: number;
    category: string;
}

// Mock data
const MOCK_CONTENT: ContentItem[] = [
    {
        id: '1',
        title: 'The Complete Guide to DeFi Trading',
        creator: 'Alex Thompson',
        price: 29.99,
        type: 'ebooks',
        thumbnail: '/content/defi-guide.jpg',
        downloads: 1200,
        rating: 4.8,
        category: 'defi',
    },
    {
        id: '2',
        title: 'Meme Coin Analysis Framework',
        creator: 'Sarah Chen',
        price: 9.99,
        type: 'pdfs',
        thumbnail: '/content/meme-analysis.jpg',
        downloads: 3500,
        rating: 4.5,
        category: 'memecoins',
    },
    {
        id: '3',
        title: 'Smart Contract Security Best Practices',
        creator: 'Michael Rodriguez',
        price: 49.99,
        type: 'ebooks',
        thumbnail: '/content/security-guide.jpg',
        downloads: 800,
        rating: 4.9,
        category: 'security',
    },
    {
        id: '4',
        title: 'Crypto Marketing Fundamentals',
        creator: 'Emma Davis',
        price: 0,
        type: 'blogs',
        thumbnail: '/content/marketing-basics.jpg',
        downloads: 5000,
        rating: 4.3,
        category: 'marketing',
    },
];

const CONTENT_TYPES = [
    { id: 'ebooks', name: 'eBooks', icon: '📚' },
    { id: 'blogs', name: 'Blogs', icon: '✍️' },
    { id: 'pdfs', name: 'PDFs', icon: '📄' },
    { id: 'research', name: 'Research', icon: '🔬' },
];

const PRICE_RANGES = [
    { id: 'free', name: 'Free', range: [0, 0] },
    { id: 'low', name: '$1-$10', range: [1, 10] },
    { id: 'medium', name: '$10-$50', range: [10, 50] },
    { id: 'high', name: '$50+', range: [50, Infinity] },
];

export default function ContentMarketplace() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedPriceRange, setSelectedPriceRange] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const handleBuyClick = (id: string) => {
        // TODO: Implement purchase flow
        console.log('Buy clicked for content:', id);
    };

    const filteredContent = MOCK_CONTENT.filter((content) => {
        const matchesCategory = selectedCategory === 'all' || content.category === selectedCategory;
        const matchesType = selectedType === 'all' || content.type === selectedType;
        const matchesSearch =
            content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            content.creator.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesPriceRange = true;
        if (selectedPriceRange !== 'all') {
            const range = PRICE_RANGES.find((r) => r.id === selectedPriceRange)?.range;
            if (range) {
                matchesPriceRange = content.price >= range[0] && content.price <= range[1];
            }
        }

        return matchesCategory && matchesType && matchesSearch && matchesPriceRange;
    });

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                    <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
                        Monetize Your Content On-Chain
                    </h1>
                    <p className="text-xl md:text-2xl text-center mb-12 text-purple-100 max-w-3xl mx-auto">
                        Sell blogs, eBooks, PDFs, and more directly to your audience with the power
                        of decentralization
                    </p>
                    <div className="flex justify-center">
                        <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 transition-colors text-lg">
                            Start Selling
                        </button>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col space-y-6">
                    {/* Top Bar with Search and Filter Toggle */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search Bar */}
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search content..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>

                        {/* Filter Toggle Button */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-purple-400 transition-colors"
                        >
                            <Filter className="h-5 w-5 text-gray-600" />
                            <span>Filters</span>
                        </button>
                    </div>

                    {/* Expandable Filters Section */}
                    <div
                        className={`transition-all duration-300 ${showFilters ? 'block' : 'hidden'}`}
                    >
                        {/* Categories */}
                        <CategoryList
                            selectedCategory={selectedCategory}
                            onCategorySelect={setSelectedCategory}
                        />

                        {/* Content Type and Price Range Filters */}
                        <div className="flex flex-wrap gap-4 mt-6">
                            <div className="flex-1 flex flex-wrap gap-4">
                                <button
                                    onClick={() => setSelectedType('all')}
                                    className={`px-6 py-2 rounded-full border transition-colors ${
                                        selectedType === 'all'
                                            ? 'bg-purple-50 border-purple-400 text-purple-700'
                                            : 'bg-white border-gray-200 hover:border-purple-400'
                                    }`}
                                >
                                    All Types
                                </button>
                                {CONTENT_TYPES.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setSelectedType(type.id)}
                                        className={`flex items-center space-x-2 px-6 py-2 rounded-full border transition-colors ${
                                            selectedType === type.id
                                                ? 'bg-purple-50 border-purple-400 text-purple-700'
                                                : 'bg-white border-gray-200 hover:border-purple-400'
                                        }`}
                                    >
                                        <span>{type.icon}</span>
                                        <span>{type.name}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Price Range Dropdown */}
                            <div className="relative">
                                <select
                                    value={selectedPriceRange}
                                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                                    className="appearance-none bg-white border border-gray-200 rounded-full px-6 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                >
                                    <option value="all">All Prices</option>
                                    {PRICE_RANGES.map((range) => (
                                        <option key={range.id} value={range.id}>
                                            {range.name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredContent.map((content) => (
                        <ContentCard key={content.id} {...content} onBuyClick={handleBuyClick} />
                    ))}
                </div>
            </div>
        </div>
    );
}
