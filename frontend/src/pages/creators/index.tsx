import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { CreatorCard } from '@/components/creator/CreatorCard';
import { creators } from '@/data/creators';

const categories = [
    { label: 'All', value: 'all' },
    { label: 'DeFi', value: 'DeFi' },
    { label: 'NFTs & Gaming', value: 'NFTs & Gaming' },
    { label: 'Development', value: 'Development' },
    { label: 'Security', value: 'Security' },
    { label: 'Education', value: 'Education' }
];

const sortOptions = [
    { label: 'Rating', value: 'rating' },
    { label: 'Courses', value: 'courses' },
    { label: 'Students', value: 'students' }
];

const CreatorsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('rating');

    // Get featured creators (top 3 by rating)
    const featuredCreators = [...creators]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

    // Filter and sort creators
    const filteredCreators = creators
        .filter(creator => {
            const matchesCategory = selectedCategory === 'all' || creator.category === selectedCategory;
            const matchesSearch =
                creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                creator.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                creator.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return b.rating - a.rating;
                case 'courses':
                    return b.courses - a.courses;
                case 'students':
                    return b.students - a.students;
                default:
                    return 0;
            }
        });

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

    return (
        <main className="min-h-screen bg-gradient-to-br from-white via-purple-50/80 to-blue-50/80 py-24">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-6">
                        Discover Top Creators
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Learn from the best minds in blockchain and Web3
                    </p>
                </motion.div>

                <Tabs defaultValue="featured" className="mb-16">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-purple-100/50 shadow-lg">
                        <TabsList className="bg-purple-100/50">
                            <TabsTrigger value="featured" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Featured</TabsTrigger>
                            <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">All Creators</TabsTrigger>
                        </TabsList>

                        <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
                            <div className="relative flex-grow md:flex-grow-0 md:w-96">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
                                <Input
                                    placeholder="Search creators..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 py-6 bg-white/70 border-purple-100 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <div className="flex gap-6">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-6 py-3 rounded-xl border border-purple-100 bg-white/70 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:bg-white transition-colors"
                                >
                                    {categories.map((category) => (
                                        <option key={category.value} value={category.value}>
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-6 py-3 rounded-xl border border-purple-100 bg-white/70 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:bg-white transition-colors"
                                >
                                    {sortOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            Sort by {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <TabsContent value="featured">
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {featuredCreators.map((creator) => (
                                <motion.div key={creator.slug} variants={item}>
                                    <CreatorCard {...creator} isTopCreator={true} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="all">
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredCreators.map((creator) => (
                                <motion.div key={creator.slug} variants={item}>
                                    <CreatorCard {...creator} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
};

export default CreatorsPage;
