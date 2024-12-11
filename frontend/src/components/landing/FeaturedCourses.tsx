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
        title: 'Mastering DeFi: Building Advanced Protocols on Solana',
        subtitle: 'Learn to develop scalable DeFi protocols and financial instruments',
        description: 'Learn to develop scalable DeFi protocols and financial instruments.',
        Creator: {
            id: '1',
            name: 'Elena Rodriguez',
            avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.HOZaU4vS3wNJL3wVCbmvZgHaE8%26pid%3DApi&f=1&ipt=97edf2f00edd9924e524525c27799d6e07435c173c281c894e51cffbaaaccc59&ipo=images',
        },
        price: 2.8,
        originalPrice: 3.5,
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fm.economictimes.com%2Fthumb%2Fmsid-89746097%2Cwidth-4206%2Cheight-2366%2Cresizemode-4%2Cimgsize-229482%2Fdefi.jpg&f=1&nofb=1&ipt=8c4dff121325571412897078b79bc04d804860e80baa50083284af48a3b1cd71&ipo=images',
        category: 'Development',
        duration: '12 weeks',
        enrolled: 2156,
        rating: 4.8,
        reviews: 423,
        level: 'Advanced',
        language: 'English',
        lastUpdated: '2024-11-15'
    },
    {
        id: '2', 
        title: 'Launch Your Own NFT Marketplace on Solana',
        subtitle: 'Build a high-performance NFT marketplace from scratch',
        description: 'Learn to build and deploy your own NFT marketplace on Solana.',
        Creator: {
            id: '2',
            name: 'James Wilson',
            avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnftcalendar.io%2Fstorage%2Fuploads%2F2022%2F09%2F18%2Ffcxhlajxwaak-78_0918202215072863273430d9b55.jpeg&f=1&nofb=1&ipt=786ba5aa90f6428dc0fc6e61a25f028f203c5445d5be88be4ae8ca9388582d83&ipo=images',
        },
        price: 2.5,
        originalPrice: 3.0,
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.QMN1NYCZ3td6rXQHrf_wuwHaE8%26pid%3DApi&f=1&ipt=99ff60de16698353007d319cdee55cebe09a15b7363d43297770d8a13928918e&ipo=images',
        category: 'Development',
        duration: '10 weeks',
        enrolled: 1876,
        rating: 4.7,
        reviews: 321,
        level: 'Advanced',
        language: 'English',
        lastUpdated: '2024-10-22'
    },
    {
        id: '3',
        title: 'Hack-Proof Smart Contracts: Security Best Practices',
        subtitle: 'Master techniques to secure your blockchain applications',
        description: 'Learn essential security practices for smart contract development.',
        Creator: {
            id: '3',
            name: 'Michael Brown',
            avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthevrsoldier.com%2Fwp-content%2Fuploads%2F2022%2F03%2Fballoonsville-2-metaverse-nft-collection-solana.jpg&f=1&nofb=1&ipt=2df877ae50677a253ef9c0555ab3324893e510ee74a9253a2c5981332d0a9bf6&ipo=images',
        },
        price: 3.2,
        originalPrice: 4.0,
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.jMLhphFHQlUe6AR_iCv6FwHaE8%26pid%3DApi&f=1&ipt=bb2f77608a2f0a91ad9d8e5bfffb7f678842a90277c1fd102454b5f1f16df5b2&ipo=images',
        category: 'Security',
        duration: '10 weeks',
        enrolled: 1567,
        rating: 4.9,
        reviews: 312,
        level: 'Advanced',
        language: 'English',
        lastUpdated: '2024-09-30'
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
