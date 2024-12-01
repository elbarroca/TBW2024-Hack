import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Users, BookOpen, ChevronRight, Award } from 'lucide-react';

type Creator = {
    id: string;
    name: string;
    image: string;
    expertise: string;
    rating: string;
    bio: string;
    courses: number;
    students: number;
    category: string;
    slug: string;
    twitterHandle?: string;
    isTopCreator?: boolean;
};

const creators: Creator[] = [
    {
        id: '1',
        name: 'Alex Rivera',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        expertise: 'Senior Blockchain Developer',
        rating: '4.9',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        courses: 10,
        students: 12500,
        category: 'blockchain',
        slug: 'alex-rivera',
        twitterHandle: '@alexrivera',
        isTopCreator: true,
    },
    {
        id: '2',
        name: 'Sarah Chen',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        expertise: 'Web3 Security Expert',
        rating: '4.8',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        courses: 8,
        students: 9800,
        category: 'security',
        slug: 'sarah-chen',
        twitterHandle: '@sarahchen',
    },
    {
        id: '3',
        name: 'Michael Chang',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        expertise: 'Smart Contract Engineer',
        rating: '4.7',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        courses: 7,
        students: 8200,
        category: 'engineering',
        slug: 'michael-chang',
    },
    {
        id: '4',
        name: 'Emma Wilson',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        expertise: 'DeFi Protocol Architect',
        rating: '4.9',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        courses: 9,
        students: 11300,
        category: 'architecture',
        slug: 'emma-wilson',
    },
];

const StatCard = ({
    icon: Icon,
    value,
    label,
}: {
    icon: React.ComponentType;
    value: string;
    label: string;
}) => (
    <div
        className="group relative bg-white/10 backdrop-blur-lg rounded-xl p-4 flex items-center space-x-4 
                  transform hover:scale-105 transition-all duration-300 overflow-hidden
                  hover:bg-white/15 hover:shadow-lg hover:shadow-purple-500/20"
    >
        <div
            className="absolute inset-0 bg-gradient-to-r from-[#6c63ff]/0 to-[#00ffa3]/0 
                    group-hover:from-[#6c63ff]/10 group-hover:to-[#00ffa3]/10 
                    transition-all duration-300 pointer-events-none"
        />

        <div
            className="relative p-3 bg-white/20 rounded-lg transform group-hover:rotate-6 
                    transition-transform duration-300 group-hover:bg-white/30"
        >
            <Icon className="h-6 w-6 text-white transform group-hover:scale-110 transition-transform duration-300" />
        </div>

        <div className="relative">
            <div
                className="text-2xl font-bold text-white transform transition-all duration-300 
                      group-hover:translate-x-1 group-hover:text-transparent group-hover:bg-clip-text 
                      group-hover:bg-gradient-to-r group-hover:from-[#6c63ff] group-hover:to-[#00ffa3]"
            >
                {value}
            </div>
            <div
                className="text-purple-100 text-sm transform transition-all duration-300 
                      group-hover:translate-x-1"
            >
                {label}
            </div>
        </div>
    </div>
);

export default function CreatorsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isCtaExpanded, setIsCtaExpanded] = useState(true);

    const filteredCreators = creators.filter((creator) => {
        const matchesCategory = selectedCategory === 'all' || creator.category === selectedCategory;
        const matchesSearch =
            creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            creator.expertise.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const categories = [
        { id: 'all', name: 'All Creators' },
        { id: 'blockchain', name: 'Blockchain' },
        { id: 'security', name: 'Security' },
        { id: 'engineering', name: 'Engineering' },
        { id: 'architecture', name: 'Architecture' },
    ];

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section with Enhanced Gradient */}
            <div className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 overflow-hidden pt-20">
                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
                </div>

                <div className="relative">
                    <div className="container mx-auto px-4 py-16">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
                                Meet Our Expert Creators
                            </h1>
                            <p className="text-xl text-purple-100 leading-relaxed">
                                Learn from industry leaders, academic professionals, and thought
                                influencers in your field
                            </p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            <StatCard icon={Users} value="500+" label="Active Students" />
                            <StatCard icon={BookOpen} value="50+" label="Courses" />
                            <StatCard icon={Star} value="4.9" label="Average Rating" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Creator Grid Container */}
            <div className="container mx-auto px-4 py-12 mb-20">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Enhanced Search and Filter Section */}
                    <div className="mb-12 space-y-6">
                        <div className="relative max-w-2xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search creators by name or expertise..."
                                className="w-full pl-12 pr-4 py-4 border-0 rounded-full bg-white shadow-lg focus:ring-2 focus:ring-purple-500 transition-shadow duration-200"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-center gap-3 flex-wrap">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105
                    ${
                        selectedCategory === category.id
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced Creator Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCreators.map((creator) => (
                            <Link
                                to={`/creator/${creator.slug}`}
                                key={creator.id}
                                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                            >
                                <div className="relative">
                                    <div className="aspect-w-3 aspect-h-2">
                                        <img
                                            src={creator.image}
                                            alt={creator.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {creator.isTopCreator && (
                                        <div className="absolute top-4 right-4 bg-gradient-to-r from-[#6c63ff] to-[#00ffa3] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                            <Award className="w-4 h-4" />
                                            <span>Top Creator</span>
                                        </div>
                                    )}
                                    {creator.twitterHandle && (
                                        <div className="absolute top-4 left-4 bg-gradient-to-r from-[#6c63ff] to-[#00ffa3] text-white text-xs px-3 py-1 rounded-full shadow-lg">
                                            {creator.twitterHandle}
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#6c63ff] transition-colors">
                                            {creator.name}
                                        </h2>
                                        <div className="flex items-center text-purple-600">
                                            <Star className="w-5 h-5 fill-current" />
                                            <span className="ml-1 text-sm font-medium text-gray-700">
                                                {creator.rating}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-[#6c63ff] font-medium text-sm">
                                        {creator.expertise}
                                    </p>

                                    <p className="text-gray-600 line-clamp-2">{creator.bio}</p>

                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex space-x-4">
                                                <span className="flex items-center">
                                                    <BookOpen className="w-4 h-4 mr-1" />
                                                    {
                                                        creator.courses
                                                    } Courses
                                                </span>
                                                <span className="flex items-center">
                                                    <Users className="w-4 h-4 mr-1" />
                                                    {creator.students.toLocaleString()} Students
                                                </span>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-[#6c63ff] transform group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating CTA Side Banner */}
            <div
                className={`fixed right-8 bottom-8 transition-all duration-300 transform ${
                    isCtaExpanded ? 'w-[280px]' : 'w-[60px]'
                } rounded-xl overflow-hidden shadow-lg backdrop-blur-lg`}
            >
                <div
                    className="bg-gradient-to-r from-[#6c63ff] to-[#00ffa3] p-4 cursor-pointer"
                    onClick={() => setIsCtaExpanded(!isCtaExpanded)}
                >
                    <div className="flex items-center justify-between">
                        {isCtaExpanded ? (
                            <>
                                <div className="text-white">
                                    <h2 className="text-lg font-bold mb-1">Become a Creator</h2>
                                    <p className="text-sm text-white/90">
                                        Join our expert community
                                    </p>
                                </div>
                                <ChevronRight
                                    className={`w-5 h-5 text-white transform transition-transform ${
                                        isCtaExpanded ? 'rotate-180' : ''
                                    }`}
                                />
                            </>
                        ) : (
                            <div className="w-full flex justify-center">
                                <ChevronRight className="w-5 h-5 text-white transform hover:scale-110 transition-transform" />
                            </div>
                        )}
                    </div>
                    {isCtaExpanded && (
                        <button
                            className="mt-4 w-full px-4 py-2 bg-white text-[#6c63ff] rounded-lg font-medium 
                       hover:bg-purple-50 transform hover:scale-105 transition-all duration-200"
                        >
                            Get Started
                        </button>
                    )}
                </div>
            </div>
        </main>
    );
}
