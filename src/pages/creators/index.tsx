import { useState } from 'react';
import { Search, Star, Users, BookOpen, Sparkles } from 'lucide-react';
import { CreatorCard } from '@/components/creator/CreatorCard';
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

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

export default function CreatorsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('popularity');

    const filteredCreators = creators
        .filter((creator) => {
            const matchesCategory = selectedCategory === 'all' || creator.category === selectedCategory;
            const matchesSearch =
                creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                creator.expertise.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return parseFloat(b.rating) - parseFloat(a.rating);
                case 'courses':
                    return b.courses - a.courses;
                default:
                    return b.students - a.students;
            }
        });

    const featuredCreators = creators.filter(creator => creator.isTopCreator);

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Hero Section with enhanced gradients */}
            <div className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 overflow-hidden pt-20">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rotate-45 transform scale-150" />
                </div>

                <div className="relative container mx-auto px-4 py-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto text-center mb-12"
                    >
                        <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
                            Discover Inspiring Creators
                        </h1>
                        <p className="text-xl text-purple-100 leading-relaxed">
                            Explore profiles, learn their journeys, and connect with industry experts
                        </p>
                    </motion.div>

                    {/* Enhanced Search and Filter Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-4xl mx-auto space-y-4"
                    >
                        <div className="flex gap-4 flex-col sm:flex-row">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <Input
                                    type="text"
                                    placeholder="Search creators by name or expertise..."
                                    className="w-full pl-10 bg-white/90 backdrop-blur-sm border-purple-200 focus:border-purple-400 transition-colors"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="w-full sm:w-[180px] bg-white/90 backdrop-blur-sm border-purple-200">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="blockchain">Blockchain</SelectItem>
                                    <SelectItem value="security">Security</SelectItem>
                                    <SelectItem value="engineering">Engineering</SelectItem>
                                    <SelectItem value="architecture">Architecture</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full sm:w-[180px] bg-white/90 backdrop-blur-sm border-purple-200">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="popularity">Most Popular</SelectItem>
                                    <SelectItem value="rating">Highest Rated</SelectItem>
                                    <SelectItem value="courses">Most Courses</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div 
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12"
                    >
                        <motion.div variants={item} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center space-x-4">
                            <div className="p-3 bg-purple-500/20 rounded-lg">
                                <Users className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">500+</div>
                                <div className="text-purple-100">Active Students</div>
                            </div>
                        </motion.div>
                        <motion.div variants={item} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center space-x-4">
                            <div className="p-3 bg-purple-500/20 rounded-lg">
                                <BookOpen className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">50+</div>
                                <div className="text-purple-100">Courses</div>
                            </div>
                        </motion.div>
                        <motion.div variants={item} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center space-x-4">
                            <div className="p-3 bg-purple-500/20 rounded-lg">
                                <Star className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">4.9</div>
                                <div className="text-purple-100">Average Rating</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12">
                <Tabs defaultValue="featured" className="w-full">
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                        <TabsTrigger value="featured" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Featured Creators
                        </TabsTrigger>
                        <TabsTrigger value="all" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                            <Users className="w-4 h-4 mr-2" />
                            All Creators
                        </TabsTrigger>
                    </TabsList>

                    <div className="overflow-auto">
                        <TabsContent value="featured" className="space-y-8">
                            <motion.div 
                                variants={container}
                                initial="hidden"
                                animate="show"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {featuredCreators.map((creator) => (
                                    <motion.div key={creator.id} variants={item}>
                                        <CreatorCard {...creator} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="all" className="space-y-8">
                            <motion.div 
                                variants={container}
                                initial="hidden"
                                animate="show"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {filteredCreators.map((creator) => (
                                    <motion.div key={creator.id} variants={item}>
                                        <CreatorCard {...creator} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </main>
    );
}
