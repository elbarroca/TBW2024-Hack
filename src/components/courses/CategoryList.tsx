import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

export const COURSE_CATEGORIES = {
    Popular: {
        icon: '🔥',
        color: 'from-orange-400/90 to-red-400/90',
        tags: ['BONK', 'NFTs', 'DeFi', 'Web3', 'Trading', 'Solana'],
    },
    DeFi: {
        icon: '💰', 
        color: 'from-green-400/90 to-emerald-400/90',
        tags: [
            'Yield Farming',
            'Liquidity Pools', 
            'DEX Trading',
            'Lending Protocols',
            'Staking',
            'AMM',
            'Tokenomics',
            'DeFi Strategy',
            'Yield Optimization',
            'Protocol Deep Dive',
        ],
    },
    'NFTs & Gaming': {
        icon: '🎮',
        color: 'from-indigo-400/90 to-purple-400/90',
        tags: [
            'NFT Trading',
            'NFT Art',
            'GameFi', 
            'Play-to-Earn',
            'Metaverse',
            'Virtual Worlds',
            'Digital Collectibles',
            'NFT Projects',
            'Gaming Guilds',
            'Music NFTs',
        ],
    },
    Memecoins: {
        icon: '🐕',
        color: 'from-yellow-400/90 to-orange-400/90',
        tags: [
            'BONK',
            'DOGECOIN',
            'PEPE',
            'Meme Trading',
            'Community Tokens',
            'Viral Tokens',
            'Meme Culture',
            'Token Launch',
            'Memecoin Analysis',
            'Social Tokens',
        ],
    },
    Development: {
        icon: '👨‍💻',
        color: 'from-blue-400/90 to-cyan-400/90',
        tags: [
            'Smart Contracts',
            'Solana Development',
            'Rust Programming',
            'Web3 Integration',
            'dApp Building',
            'Blockchain Architecture',
            'Security Best Practices',
            'Testing & Auditing',
            'Frontend Development',
            'Backend Systems',
        ],
    },
    'Trading & Investment': {
        icon: '📈',
        color: 'from-teal-400/90 to-green-400/90',
        tags: [
            'Technical Analysis',
            'Spot Trading',
            'Futures Trading',
            'Risk Management',
            'Market Analysis',
            'Trading Psychology',
            'Portfolio Strategy',
            'Chart Patterns',
            'Trading Bots',
            'Investment Strategy',
        ],
    },
    Education: {
        icon: '📚',
        color: 'from-purple-400/90 to-pink-400/90',
        tags: [
            'Blockchain Basics',
            'Crypto Fundamentals',
            'Investment Basics',
            'Security Tips',
            'Wallet Management',
            'DeFi Basics',
            'Trading Basics',
            'Research Methods',
            'Due Diligence',
            'Risk Assessment',
        ],
    },
    Ecosystem: {
        icon: '🌐',
        color: 'from-pink-400/90 to-rose-400/90',
        tags: [
            'Solana News',
            'Project Reviews',
            'Ecosystem Updates',
            'Network Analysis',
            'Community Events',
            'Governance',
            'Partnerships',
            'Innovation',
            'Use Cases',
            'Future Trends',
        ],
    },
} as const;

export type CategoryKey = keyof typeof COURSE_CATEGORIES;

interface CategoryListProps {
    selectedMainCategory?: CategoryKey | null;
    selectedTags?: string[];
    onMainCategorySelect?: (category: CategoryKey) => void;
    onTagSelect?: (tag: string) => void;
    onTagRemove?: (tag: string) => void;
    maxTags?: number;
    className?: string;
}

export function CategoryList({
    selectedMainCategory = null,
    selectedTags = [],
    onMainCategorySelect = () => {},
    onTagSelect = () => {},
    onTagRemove = () => {},
    maxTags = 5,
    className,
}: CategoryListProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleMainCategorySelect = (category: CategoryKey) => {
        if (selectedMainCategory === category) {
            onMainCategorySelect(null);
        } else {
            onMainCategorySelect(category);
        }
    };

    const handleTagSelect = (tag: string) => {
        if (selectedTags.length < maxTags && !selectedTags.includes(tag)) {
            onTagSelect(tag);
        }
    };

    return (
        <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8', className)}>
            {/* Main Categories */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {Object.entries(COURSE_CATEGORIES).map(([category, { icon, color }]) => (
                    <button
                        key={category}
                        onClick={() => handleMainCategorySelect(category as CategoryKey)}
                        className={cn(
                            'p-4 rounded-xl border-2 shadow-sm hover:shadow-md transition-all duration-200',
                            'bg-white dark:bg-gray-800',
                            `hover:bg-gradient-to-br ${color}`,
                            selectedMainCategory === category 
                                ? `border-transparent bg-gradient-to-br ${color} text-white`
                                : 'border-gray-200 hover:border-transparent hover:text-white'
                        )}
                    >
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-xl">{icon}</span>
                            <span className="font-medium">{category}</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Sub Tags Section */}
            {selectedMainCategory && (
                <div className="space-y-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm animate-fadeIn">
                    <div className="flex justify-between items-center border-b pb-4">
                        <h3 className="text-xl font-semibold flex items-center gap-3">
                            <span className="text-2xl">{COURSE_CATEGORIES[selectedMainCategory].icon}</span>
                            {selectedMainCategory} Tags
                        </h3>
                        <button
                            onClick={() => onMainCategorySelect(null)}
                            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            Change Category
                        </button>
                    </div>

                    {/* Selected Tags */}
                    <div className="flex flex-wrap gap-2">
                        {selectedTags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="px-4 py-2 flex items-center gap-2 group hover:bg-gray-100/80 backdrop-blur-sm transition-all"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => onTagRemove(tag)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </Badge>
                        ))}
                    </div>

                    {/* Search Tags */}
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder={`Search ${selectedMainCategory} tags...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-900"
                        />
                    </div>

                    {/* Tags Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {COURSE_CATEGORIES[selectedMainCategory].tags
                            .filter((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => handleTagSelect(tag)}
                                    disabled={selectedTags.includes(tag)}
                                    className={cn(
                                        'p-3 rounded-lg border text-sm transition-all duration-200',
                                        selectedTags.includes(tag)
                                            ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200'
                                            : 'hover:border-transparent hover:bg-gradient-to-br hover:from-purple-400/90 hover:to-pink-400/90 hover:text-white border-gray-200'
                                    )}
                                >
                                    {tag}
                                </button>
                            ))}
                    </div>

                    {selectedTags.length >= maxTags && (
                        <p className="text-sm text-amber-600/90 bg-amber-50 rounded-lg p-3">
                            Maximum {maxTags} tags allowed
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}