import { useState } from 'react';
import { Search } from 'lucide-react';
import { ContentCard } from '@/components/content/ContentCard';
import { CategoryList, CategoryKey } from '@/components/courses/CategoryList';
import { ContentType } from '@/types/content-details';

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
        title: 'Smart Contract Security Audit Report: Common Vulnerabilities & Best Practices',
        creator: 'Elena Rodriguez',
        price: 0.8,
        type: 'ebook',
        thumbnail: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.h6lpyFKPz2w6wgBW7f8edAHaEK%26pid%3DApi&f=1&ipt=f22d811b530d9a4df1b0b1f6a00e2af2bf7f3fe4fb97340366ec788269ec8453&ipo=images',
        downloads: 3156,
        rating: 4.8,
        category: 'Development',
        tags: ['Security', 'Smart Contracts', 'Auditing', 'Best Practices'],
        description: 'Comprehensive guide on identifying and preventing smart contract vulnerabilities.',
        lastUpdated: '2024-01-15',
    },
    {
        id: '2', 
        title: 'Web3 Gaming Economics: Building Sustainable Token Models',
        creator: 'James Wilson',
        price: 0,
        type: 'article',
        thumbnail: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.wRf4E0-pguP9iaWFlBiv1QHaEK%26pid%3DApi&f=1&ipt=865f2ff3c53ec0356f286fa19d97aee794f8259b56972ceca174b0106ba5ba78&ipo=images',
        downloads: 2876,
        rating: 4.7,
        category: 'NFTs & Gaming',
        tags: ['GameFi', 'Tokenomics', 'Web3 Gaming', 'Economics'],
        description: 'Deep dive into creating sustainable economic models for blockchain games.',
        lastUpdated: '2024-01-18',
    },
    {
        id: '3',
        title: 'DeFi Market Analysis: Q4 2024 Research Report',
        creator: 'Michael Brown',
        price: 1.2,
        type: 'file',
        thumbnail: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Nu5zDQe4R6pXDEYKHJObMAHaEK%26pid%3DApi&f=1&ipt=c7d8c574d88fb16d2cc3989c2e1ae9ae27bf734e74a167fefc41655c0cefd67d&ipo=images',
        downloads: 1567,
        rating: 4.9,
        category: 'DeFi',
        tags: ['Research', 'Market Analysis', 'DeFi Trends', 'Statistics'],
        description: 'Comprehensive analysis of DeFi market trends and predictions for 2024.',
        lastUpdated: '2024-01-20',
    },
    {
        id: '4',
        title: 'Zero Knowledge Proofs: A Visual Guide',
        creator: 'Alex Rivera',
        price: 0.5,
        type: 'video',
        thumbnail: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.IRtt0BffPTVMnBO4zwJZ4wHaE3%26pid%3DApi&f=1&ipt=bcca05a468d1652524bf0cd6a1d5117b7cf1c83fc0a681163b85e718bd866386&ipo=imagesx`x',
        downloads: 934,
        rating: 4.8,
        category: 'Development',
        tags: ['ZK-Proofs', 'Privacy', 'Cryptography', 'Blockchain'],
        description: 'Visual explanation of Zero Knowledge Proofs and their blockchain applications.',
        lastUpdated: '2024-01-22',
    }
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
                            type={content.type as ContentType}
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
