import { useState } from 'react';
import { Search } from 'lucide-react';
import { ContentCard } from '@/components/content/ContentCard';
import { CategoryList, CategoryKey, COURSE_CATEGORIES } from '@/components/courses/CategoryList';

interface ContentItem {
    id: string;
    title: string;
    creator: string;
    price: number;
    type: string;
    thumbnail: string;
    downloads: number;
    rating: number;
    category: CategoryKey;
    description: string;
    lastUpdated: string;
    tags?: string[];
}

// Enhanced mock data with high-quality images and more metadata
const MOCK_CONTENT: ContentItem[] = [
    {
        id: '1',
        title: 'The Complete Guide to DeFi Trading',
        creator: 'Alex Thompson',
        price: 29.99,
        type: 'ebooks',
        thumbnail: '/content/defi-guide-enhanced.jpg',
        downloads: 1200,
        rating: 4.8,
        category: 'DeFi',
        tags: ['Yield Farming', 'DEX Trading', 'Liquidity Pools'],
        description: 'Master DeFi trading with comprehensive strategies and real-world examples',
        lastUpdated: '2024-01-15',
    },
    {
        id: '2',
        title: 'Meme Coin Analysis Framework',
        creator: 'Sarah Chen',
        price: 9.99,
        type: 'pdfs',
        thumbnail: '/content/meme-analysis-pro.jpg',
        downloads: 3500,
        rating: 4.5,
        category: 'Memecoins',
        tags: ['BONK', 'Meme Trading', 'Token Launch'],
        description: 'Professional framework for analyzing and evaluating meme coins',
        lastUpdated: '2024-01-20',
    },
    {
        id: '3',
        title: 'Smart Contract Security Best Practices',
        creator: 'Michael Rodriguez',
        price: 49.99,
        type: 'ebooks',
        thumbnail: '/content/security-guide-premium.jpg',
        downloads: 800,
        rating: 4.9,
        category: 'Development',
        tags: ['Smart Contracts', 'Security Best Practices', 'Testing & Auditing'],
        description: 'Essential security practices for smart contract development',
        lastUpdated: '2024-01-18',
    },
    {
        id: '4',
        title: 'Crypto Marketing Fundamentals',
        creator: 'Emma Davis',
        price: 0,
        type: 'blogs',
        thumbnail: '/content/marketing-master.jpg',
        downloads: 5000,
        rating: 4.3,
        category: 'Education',
        tags: ['Blockchain Basics', 'Crypto Fundamentals', 'Research Methods'],
        description: 'Comprehensive guide to marketing in the crypto space',
        lastUpdated: '2024-01-22',
    },
];

const CONTENT_TYPES = [
    { id: 'ebooks', name: 'eBooks', icon: '📚' },
    { id: 'blogs', name: 'Blogs', icon: '✍️' },
    { id: 'pdfs', name: 'PDFs', icon: '📄' },
    { id: 'research', name: 'Research', icon: '🔬' },
];

export default function ContentMarketplace() {
    const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedType, setSelectedType] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const handleTagSelect = (tag: string) => {
        setSelectedTags(prev => [...prev, tag]);
    };

    const handleTagRemove = (tag: string) => {
        setSelectedTags(prev => prev.filter(t => t !== tag));
    };

    const filteredContent = MOCK_CONTENT.filter((content) => {
        const matchesCategory = !selectedCategory || content.category === selectedCategory;
        const matchesType = selectedType === 'all' || content.type === selectedType;
        const matchesSearch = !searchQuery || 
            content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            content.creator.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTags = selectedTags.length === 0 || 
            selectedTags.some(tag => content.tags?.includes(tag));

        return matchesCategory && matchesType && matchesSearch && matchesTags;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Enhanced Gradient */}
            <div className="bg-gradient-to-br from-purple-500 via-emerald-400 to-yellow-500 pt-40 pb-24">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center">
                        Discover Premium Web3 Content
                    </h1>
                    <p className="text-xl text-purple-100 mb-12 text-center max-w-3xl mx-auto">
                        Access high-quality resources, guides, and educational content
                    </p>
                    <div className="relative max-w-2xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search content..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-lg"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Category List */}
            <div className="py-6 bg-white border-b">
                <CategoryList
                    selectedMainCategory={selectedCategory}
                    selectedTags={selectedTags}
                    onMainCategorySelect={setSelectedCategory}
                    onTagSelect={handleTagSelect}
                    onTagRemove={handleTagRemove}
                />
            </div>

            {/* Content Type Filter */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex gap-4 overflow-x-auto pb-2">
                    <button
                        onClick={() => setSelectedType('all')}
                        className={`px-6 py-2 rounded-full border transition-colors whitespace-nowrap ${
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
                            className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-colors whitespace-nowrap ${
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
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredContent.map((content) => (
                        <ContentCard
                            key={content.id}
                            id={content.id}
                            title={content.title}
                            creator={content.creator}
                            price={content.price}
                            type={content.type}
                            thumbnail={content.thumbnail}
                            downloads={content.downloads}
                            rating={content.rating}
                            onBuyClick={(id) => console.log('Buy clicked for content:', id)}
                        />
                    ))}
                </div>
                
                {filteredContent.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No content found matching your criteria
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
