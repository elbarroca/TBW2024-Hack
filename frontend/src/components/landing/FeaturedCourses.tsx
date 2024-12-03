import { ChevronRight, Star, Clock, Users, Sparkles } from 'lucide-react';
import { Level } from '@/types/course';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';

interface FeaturedCourse {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    Creator: {
        id: string;
        name: string;
        avatar: string;
    };
    price: number;
    originalPrice: number;
    image: string;
    category: string;
    duration: string;
    enrolled: number;
    rating: number;
    reviews: number;
    level: Level;
    language: string;
    lastUpdated: string;
}

const FEATURED_COURSES: FeaturedCourse[] = [
    {
        id: '1',
        title: 'Solana Development Fundamentals',
        subtitle: 'Build Production-Ready dApps on Solana',
        description: 'Learn to build decentralized applications on Solana',
        Creator: {
            id: '1',
            name: 'Alex Rivera',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        price: 2.5,
        originalPrice: 3.0,
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
        category: 'Blockchain',
        duration: '8 weeks',
        enrolled: 1234,
        rating: 4.8,
        reviews: 234,
        level: 'Intermediate',
        language: 'English',
        lastUpdated: '2023-12-01',
    },
    {
        id: '2',
        title: 'Web3 Design Patterns',
        subtitle: 'Modern Design for Web3 Applications',
        description: 'Master the art of designing Web3 applications',
        Creator: {
            id: '2',
            name: 'Sarah Chen',
            avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        },
        price: 1.8,
        originalPrice: 2.2,
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766',
        category: 'Design',
        duration: '6 weeks',
        enrolled: 892,
        rating: 4.7,
        reviews: 156,
        level: 'Beginner',
        language: 'English',
        lastUpdated: '2023-11-15',
    },
    {
        id: '3',
        title: 'Smart Contract Security',
        subtitle: 'Advanced Security for Blockchain Apps',
        description: 'Learn to secure blockchain applications',
        Creator: {
            id: '3',
            name: 'Michael Brown',
            avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        },
        price: 2.0,
        originalPrice: 2.5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        category: 'Security',
        duration: '4 weeks',
        enrolled: 1023,
        rating: 4.7,
        reviews: 321,
        level: 'Advanced',
        language: 'English',
        lastUpdated: '2024-04',
    },
];

export default function FeaturedCourses() {
    return (
        <section className="py-24 bg-gradient-to-b from-purple-50 via-white to-gray-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-purple/[0.03] bg-[size:40px_40px]" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 mb-4">
                        <Sparkles className="h-5 w-5" />
                        <span className="font-medium">Featured Courses</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                        Explore Our Top Courses
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Learn from the best in Web3 and blockchain technology
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURED_COURSES.map((course, index) => {
                        const courseSlug = course.title.toLowerCase().replace(/\s+/g, '-');
                        const creatorSlug = course.Creator.name.toLowerCase().replace(/\s+/g, '-');
                        const courseUrl = `/${creatorSlug}/${courseSlug}`;

                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                key={course.id}
                            >
                                <Link to={courseUrl} className="block">
                                    <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 group border-2 hover:border-purple-400">
                                        <CardHeader className="p-0">
                                            <div className="relative w-full pt-[56.25%] overflow-hidden">
                                                <img 
                                                    src={course.image} 
                                                    alt={course.title}
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            <div className="flex items-center space-x-4 mb-4">
                                                <Avatar className="ring-2 ring-purple-100 group-hover:ring-purple-400 transition-all">
                                                    <AvatarImage src={course.Creator.avatar} alt={course.Creator.name} />
                                                    <AvatarFallback>{course.Creator.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <CardTitle className="text-xl font-bold line-clamp-1 group-hover:text-purple-600 transition-colors">
                                                        {course.title}
                                                    </CardTitle>
                                                    <CardDescription className="text-sm">
                                                        by {course.Creator.name}
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{course.description}</p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 hover:from-purple-200 hover:to-purple-300">
                                                    {course.level}
                                                </Badge>
                                                <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-300">
                                                    {course.category}
                                                </Badge>
                                            </div>
                                            <Separator className="my-4" />
                                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center">
                                                        <Users className="h-4 w-4 mr-1 text-purple-500" />
                                                        {course.enrolled.toLocaleString()}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                                                        {course.rating}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Clock className="h-4 w-4 mr-1 text-blue-500" />
                                                        {course.duration}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="px-6 py-4 bg-gray-50 flex justify-between items-center border-t">
                                            <div className="flex items-center gap-2">
                                                {course.originalPrice > course.price && (
                                                    <span className="text-sm line-through text-muted-foreground">
                                                        ${course.originalPrice}
                                                    </span>
                                                )}
                                                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                                    ${course.price}
                                                </span>
                                            </div>
                                            <Button variant="ghost" className="gap-2 group-hover:text-purple-600">
                                                Enroll Now <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
