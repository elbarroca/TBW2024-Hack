import { Star, Users, BookOpen, Sparkles, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/Badge';
import { Separator } from '../ui/separator';
import { motion } from 'framer-motion';
import { creators } from '@/data/creators';

const FeaturedCreators = () => {
    // Take only the first 3 creators for the featured section
    const featuredCreators = creators.slice(0, 3);

    return (
        <section className="py-20 bg-gradient-to-b from-white via-purple-50 to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 mb-4">
                        <Sparkles className="h-5 w-5" />
                        <span className="font-medium">World-Class Instructors</span>
                    </div>
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                        Featured Creators
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Learn from industry experts who are shaping the future of blockchain and Web3
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredCreators.map((creator, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            key={creator.slug}
                        >
                            <Link to={`/${creator.slug}`}>
                                <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 hover:border-purple-400">
                                    <CardContent className="p-8">
                                        <div className="relative mb-8">
                                            <div className="absolute -top-4 -right-4">
                                                <Badge variant="secondary" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                                                    Top Creator
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-20 w-20 ring-4 ring-purple-200 group-hover:ring-purple-400 transition-all">
                                                    <AvatarImage src={creator.avatar} alt={creator.name} />
                                                    <AvatarFallback>{creator.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                                        {creator.name}
                                                    </h3>
                                                    <p className="text-lg text-purple-600 font-medium">{creator.role}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 line-clamp-2 mb-6">{creator.bio}</p>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {creator.expertise.map((skill) => (
                                                <Badge key={skill} variant="secondary" className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 hover:from-purple-200 hover:to-blue-200">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="bg-purple-50 p-4 rounded-lg text-center">
                                                <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                                                <p className="text-sm text-gray-600">Total Earnings</p>
                                                <p className="text-lg font-bold text-purple-600">${creator.earnings?.toLocaleString()}</p>
                                            </div>
                                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                                                <Award className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                                                <p className="text-sm text-gray-600">Tips Received</p>
                                                <p className="text-lg font-bold text-blue-600">${creator.tips?.toLocaleString()}</p>
                                            </div>
                                        </div>

                                        <Separator className="my-6" />

                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-2">
                                                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                                <span className="font-bold text-lg">{creator.rating}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="h-5 w-5 text-purple-600" />
                                                <span className="font-medium">{creator.students.toLocaleString()} students</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="h-5 w-5 text-blue-600" />
                                                <span className="font-medium">{creator.courses} courses</span>
                                            </div>
                                        </div>

                                        <Button 
                                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all"
                                        >
                                            View Profile
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCreators;
