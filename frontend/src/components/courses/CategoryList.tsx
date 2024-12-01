import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

export const COURSE_CATEGORIES = {
    Popular: {
        icon: '🔥',
        color: 'from-orange-500 to-red-500',
        tags: ['BONK', 'NFTs', 'DeFi', 'Web3', 'Trading', 'Solana'],
    },
    DeFi: {
        icon: '💰',
        color: 'from-green-500 to-emerald-500',
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
        color: 'from-indigo-500 to-purple-500',
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
        color: 'from-yellow-500 to-orange-500',
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
        color: 'from-blue-500 to-cyan-500',
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
        color: 'from-teal-500 to-green-500',
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
        color: 'from-purple-500 to-pink-500',
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
        color: 'from-pink-500 to-rose-500',
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
        <div className={cn('space-y-6', className)}>
            {/* Main Categories */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {Object.entries(COURSE_CATEGORIES).map(([category, { icon, color }]) => (
                    <button
                        key={category}
                        onClick={() => handleMainCategorySelect(category as CategoryKey)}
                        className={cn(
                            'relative p-4 rounded-xl text-white transition-all duration-300',
                            'bg-gradient-to-br shadow hover:shadow-lg',
                            color,
                            selectedMainCategory === category
                                ? 'ring-2 ring-white ring-offset-2 ring-offset-purple-500 scale-105'
                                : 'hover:scale-105'
                        )}
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">{icon}</span>
                            <span className="font-medium text-sm">{category}</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Sub Tags Section */}
            {selectedMainCategory && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">
                            Select {COURSE_CATEGORIES[selectedMainCategory].icon}{' '}
                            {selectedMainCategory} Tags
                        </h3>
                        <button
                            onClick={() => onMainCategorySelect(null)}
                            className="text-sm text-gray-500 hover:text-gray-700"
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
                                className="px-3 py-1 flex items-center gap-1 group hover:bg-gray-200 transition-colors"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => onTagRemove(tag)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                                >
                                    <X className="h-3 w-3" />
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
                            className="w-full"
                        />
                    </div>

                    {/* Tags Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {COURSE_CATEGORIES[selectedMainCategory].tags
                            .filter((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => handleTagSelect(tag)}
                                    disabled={selectedTags.includes(tag)}
                                    className={cn(
                                        'p-2 text-sm text-left rounded-lg transition-colors',
                                        selectedTags.includes(tag)
                                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                            : 'hover:bg-gray-100'
                                    )}
                                >
                                    {tag}
                                </button>
                            ))}
                    </div>

                    {selectedTags.length >= maxTags && (
                        <p className="text-sm text-amber-600">Maximum {maxTags} tags allowed</p>
                    )}
                </div>
            )}
        </div>
    );
}
