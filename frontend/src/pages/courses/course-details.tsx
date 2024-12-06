import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Star, Clock, CheckCircle2, Users, 
    Play, Shield,
    Users2,
    ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COURSES } from '@/data/courses';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/Dialog";
import {
    Card,
    CardContent
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LessonSelector } from '@/components/courses/LessonSelector';
import { CreatorCard } from '@/components/creator/CreatorCard';
import Footer from '@/components/layout/Footer';
import { CourseCard } from '@/components/courses/CourseCard';
import { CurrencySelector } from '@/components/solana/CurrencySelector';
import { useAppSelector } from '@/store';
import { WalletPicker } from '@/components/solana/WalletPicker';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

// Define types for prerequisites and target audiences
type Prerequisite = string;
type TargetAudience = string;

// Sample data for prerequisites and target audiences
const prerequisites: Prerequisite[] = [
    "Basic understanding of blockchain technology and cryptography",
    "Familiarity with JavaScript/TypeScript programming",
    "Knowledge of Web3 fundamentals",
    "Understanding of smart contract basics"
];

const targetAudiences: TargetAudience[] = [
    "Web3 developers looking to specialize in DeFi",
    "Smart contract engineers interested in protocol development",
    "DeFi enthusiasts wanting to build decentralized applications",
    "Blockchain developers seeking advanced protocol knowledge"
];

// Mock data for creator
const creatorData = {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80",
    expertise: "DeFi Protocol Architect",
    rating: "4.9",
    bio: "Experienced blockchain developer specializing in DeFi protocols. Previously led development at major DeFi projects and contributed to key protocol implementations.",
    courses: 12,
    students: 15000,
    slug: "elena-rodriguez",
    isTopCreator: true,
    twitterHandle: "elenarod_web3",
    tags: ["DeFi", "Solidity", "Web3", "Smart Contracts"]
};

// Mock data for course modules and lessons
const courseModules = [
    {
        id: "module-1",
        title: "Introduction to DeFi Protocols",
        description: "Learn the fundamentals of decentralized finance and protocol development",
        lessons: [
            {
                id: "lesson-1-1",
                title: "Understanding DeFi Fundamentals",
                description: "An overview of decentralized finance, its importance, and core concepts",
                slug: "defi-fundamentals",
                duration: "45 min"
            },
            {
                id: "lesson-1-2",
                title: "Protocol Architecture Deep Dive",
                description: "Explore the architecture patterns of successful DeFi protocols",
                slug: "protocol-architecture",
                duration: "60 min"
            }
        ]
    },
    {
        id: "module-2",
        title: "Smart Contract Development",
        description: "Master the art of writing secure and efficient smart contracts",
        lessons: [
            {
                id: "lesson-2-1",
                title: "Advanced Solidity Patterns",
                description: "Learn advanced Solidity patterns and best practices for DeFi protocols",
                slug: "advanced-solidity",
                duration: "90 min"
            },
            {
                id: "lesson-2-2",
                title: "Security Considerations",
                description: "Understanding common vulnerabilities and security best practices",
                slug: "security-considerations",
                duration: "75 min"
            }
        ]
    },
    {
        id: "module-3",
        title: "Protocol Integration & Testing",
        description: "Learn how to integrate and thoroughly test your DeFi protocol",
        lessons: [
            {
                id: "lesson-3-1",
                title: "Frontend Integration",
                description: "Build user interfaces that interact with your protocol",
                slug: "frontend-integration",
                duration: "60 min"
            },
            {
                id: "lesson-3-2",
                title: "Testing Strategies",
                description: "Comprehensive testing approaches for DeFi protocols",
                slug: "testing-strategies",
                duration: "45 min"
            },
            {
                id: "lesson-3-3",
                title: "Deployment & Monitoring",
                description: "Learn how to deploy and monitor your protocol in production",
                slug: "deployment-monitoring",
                duration: "60 min"
            }
        ]
    }
];

export default function CourseDetailsPage() {
    const { creatorSlug, courseSlug } = useParams();
    const [showCurrencySelector, setShowCurrencySelector] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const { user } = useAppSelector((state) => state.auth);
    const [showWalletPicker, setShowWalletPicker] = useState(false);

    const currencies = [
        { name: "BONK", rate: 0.000001 },
        { name: "SOL", rate: 100 },
        { name: "USDC", rate: 1 },
    ];

    const calculatePrice = (basePrice: number, currency: string) => {
        const selectedRate = currencies.find(c => c.name === currency)?.rate || 1;
        return (basePrice / selectedRate).toFixed(2);
    };

    // Find the course by matching creator ID and course ID
    const course = COURSES.find(
        (c) => 
            c.creator.id === creatorSlug &&
            c.id === courseSlug
    );

    if (!course) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Course not found</h2>
                    <p className="text-gray-600">Looking for: {creatorSlug}/{courseSlug}</p>
                </div>
            </div>
        );
    }

    const handleBuyClick = () => {
        if (!user) {
            setShowWalletPicker(true);
        } else if (!selectedCurrency) {
            setShowCurrencySelector(true);
        } else {
            // Implement purchase logic
            console.log('Purchase with', selectedCurrency);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="flex-grow pb-24">
                {/* Hero Banner */}
                <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white pt-32 pb-24">
                    {/* Decorative grid pattern */}
                    <div 
                        className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"
                        style={{ backgroundSize: '30px 30px' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={fadeInUp}
                                className="space-y-8"
                            >
                                <div className="flex items-center space-x-3">
                                    <Badge 
                                        variant="secondary" 
                                        className="bg-white/20 hover:bg-white/30 text-white border-none"
                                    >
                                        {course.category}
                                    </Badge>
                                    <Badge 
                                        variant="secondary"
                                        className="bg-white/20 hover:bg-white/30 text-white border-none"
                                    >
                                        {course.level}
                                    </Badge>
                                    <Badge 
                                        variant="secondary"
                                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-none shadow-lg"
                                    >
                                        Certified Course
                                    </Badge>
                                </div>
                                <div className="space-y-4">
                                    <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                                        {course.title}
                                    </h1>
                                    <p className="text-xl text-white/90 max-w-xl">
                                        {course.subtitle}
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center gap-6 text-sm">
                                    <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                                        <Star className="h-5 w-5 text-yellow-400 mr-1" />
                                        <span>{course.rating} ({course.reviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                                        <Users className="h-5 w-5 mr-1" />
                                        <span>{course.enrolled} students</span>
                                    </div>
                                    <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                                        <Clock className="h-5 w-5 mr-1" />
                                        <span>{course.duration}</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-6">
                                    <div className="flex items-center space-x-4">
                                        <div 
                                            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm 
                                            flex items-center justify-center ring-2 ring-white/20 hover:ring-white/40 
                                            transition-all cursor-pointer"
                                            onClick={() => window.location.href = `/${course.creator.id}`}
                                        >
                                            <img 
                                                src={course.creator.avatar} 
                                                alt={course.creator.name}
                                                className="w-12 h-12 rounded-full"
                                            />
                                        </div>
                                        <div>
                                            <h3 
                                                className="font-medium hover:text-white/80 cursor-pointer"
                                                onClick={() => window.location.href = `/${course.creator.id}`}
                                            >
                                                {course.creator.name}
                                            </h3>
                                            <p className="text-sm text-white/80">
                                                {course.creator.title}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <Button 
                                            variant="secondary"
                                            className="bg-white/20 hover:bg-white/30 text-white border-none"
                                            onClick={() => window.location.href = `/${course.creator.id}`}
                                        >
                                            View Profile
                                        </Button>
                                        <Button
                                            variant="default"
                                            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6"
                                            onClick={handleBuyClick}
                                        >
                                            {course.price} USDC
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={fadeInUp}
                                className="relative group"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                                <div className="relative">
                                    <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                                        <img 
                                            src={course.image} 
                                            alt={course.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Play className="w-16 h-16 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="space-y-12">
                        {/* What You'll Learn and Course Description */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* What You'll Learn */}
                            <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-none">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                                    What You'll Learn
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        "Build decentralized applications (dApps) from scratch using industry best practices",
                                        "Implement smart contracts with Solidity and deploy to multiple chains", 
                                        "Create secure and scalable blockchain architectures",
                                        "Master Web3.js and Ethers.js for blockchain interactions",
                                        "Understand DeFi protocols and implement key financial primitives"
                                    ].map((item, index) => (
                                        <div key={index} className="flex gap-4 items-start bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg hover:shadow-md transition-all">
                                            <div className="flex-shrink-0">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                                                    <CheckCircle2 className="h-5 w-5 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-gray-800 font-medium">{item}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Course Description */}
                            <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-none">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                                    Course Overview
                                </h2>
                                <div className="space-y-6">
                                    <div className="prose prose-purple max-w-none">
                                        <p className="text-gray-700 leading-relaxed text-lg">
                                            Dive deep into blockchain development with this comprehensive course. You'll learn everything from basic concepts to advanced implementation techniques. Through hands-on projects and real-world examples, you'll gain practical experience in building decentralized applications that can scale.
                                        </p>
                                        <p className="text-gray-700 leading-relaxed text-lg mt-4">
                                            This course combines theoretical knowledge with practical implementation, ensuring you're ready to tackle real-world blockchain development challenges. Perfect for developers looking to transition into Web3 or enhance their existing blockchain skills.
                                        </p>
                                        <div className="mt-8 flex justify-center">
                                            <Button
                                                onClick={() => {
                                                    const buySection = document.getElementById('buy-section');
                                                    buySection?.scrollIntoView({ behavior: 'smooth' });
                                                }}
                                                className="group font-semibold text-lg px-12 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl"
                                            >
                                                <span className="flex items-center">
                                                    Buy Now
                                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        {/* Prerequisites & Target Audience */}
                        <div className="grid grid-cols-2 gap-8 mt-12">
                            {/* Prerequisites */}
                            <Card className="bg-white/50 backdrop-blur-sm border-purple-100/50 overflow-hidden p-8">
                                <div className="border-l-4 border-blue-500 px-6 py-4 bg-blue-50/50">
                                    <h2 className="text-2xl font-bold text-blue-900">Prerequisites</h2>
                                </div>
                                <CardContent className="p-6">
                                    <ScrollArea className="h-[200px] pr-4">
                                        {prerequisites.length > 0 ? (
                                            <ul className="space-y-4">
                                                {prerequisites.map((prerequisite, index) => (
                                                    <motion.li 
                                                        key={index}
                                                        className="flex items-start gap-3 p-3 rounded-lg bg-white/70 border border-blue-100/50"
                                                        whileHover={{ x: 4 }}
                                                    >
                                                        <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                                        <span className="text-gray-700">{prerequisite}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-500 text-center py-4">Add prerequisites to help students understand what they need to know before starting.</p>
                                        )}
                                    </ScrollArea>
                                </CardContent>
                            </Card>

                            {/* Target Audience */}
                            <Card className="bg-white/50 backdrop-blur-sm border-purple-100/50 overflow-hidden p-8">
                                <div className="border-l-4 border-green-500 px-6 py-4 bg-green-50/50">
                                    <h2 className="text-2xl font-bold text-green-900">Target Audience</h2>
                                </div>
                                <CardContent className="p-6">
                                    <ScrollArea className="h-[200px] pr-4">
                                        {targetAudiences.length > 0 ? (
                                            <ul className="space-y-4">
                                                {targetAudiences.map((audience, index) => (
                                                    <motion.li 
                                                        key={index}
                                                        className="flex items-start gap-3 p-3 rounded-lg bg-white/70 border border-green-100/50"
                                                        whileHover={{ x: 4 }}
                                                    >
                                                        <Users2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                        <span className="text-gray-700">{audience}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-500 text-center py-4">Add target audiences to show who this video is designed for.</p>
                                        )}
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Course Curriculum */}
                        <div className="mt-12">
                            <LessonSelector 
                                modules={courseModules}
                                className="bg-white/50 backdrop-blur-sm border-purple-100/50"
                            />
                        </div>


                        {/* Buy Now Section with Price Logic */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mt-12"
                        >
                            <Card className="relative overflow-hidden p-8">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/95 via-indigo-600/95 to-purple-800/95" />
                                <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
                                <CardContent className="relative z-10 p-10">
                                    <div className="text-center space-y-8">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-4"
                                        >
                                            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-white">
                                                Start Your Learning Journey Today
                                            </h2>
                                            <p className="text-purple-100 text-lg max-w-2xl mx-auto leading-relaxed">
                                                Join thousands of students already mastering {course.title || 'this video'}.
                                                Get lifetime access to all video materials and future updates.
                                            </p>
                                        </motion.div>

                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="flex flex-col items-center gap-6"
                                        >
                                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                                <div className="flex items-baseline justify-center gap-3 mb-2">
                                                    <span className="text-5xl font-bold text-white">
                                                        ${course.price}
                                                    </span>
                                                </div>
                                                <p className="text-purple-200 text-sm">
                                                    One-time payment   Lifetime access   Free updates
                                                </p>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="space-y-6"
                                        >
                                            <div className="flex flex-col items-center gap-4">
                                                <Button 
                                                    size="lg"
                                                    className="group font-semibold text-lg px-12 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-white to-purple-50 hover:from-purple-50 hover:to-white text-purple-700 hover:text-purple-800"
                                                >
                                                    <span>Buy Now</span>
                                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Course Information Grid */}
                        <div className="grid grid-cols-12 gap-8 mt-16">
                            {/* Creator Section */}
                            <div className="col-span-4">
                                <div className="sticky top-24">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Meet Your Instructor
                                    </h2>
                                    <CreatorCard {...creatorData} />
                                </div>
                            </div>

                            {/* Recommended Courses */}
                            <div className="col-span-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Similar Courses
                                </h2>
                                <div className="grid grid-cols-2 gap-6">
                                    {COURSES.slice(0,2).map((course) => (
                                        <CourseCard key={course.id} course={course} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <Footer />

                {/* Sticky Buy Button - now positioned above footer */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="text-2xl font-bold text-gray-900">
                                    {course.price} USDC
                                </div>
                                {selectedCurrency && (
                                    <div className="text-lg text-gray-600">
                                        ≈ {calculatePrice(course.price, selectedCurrency)} {selectedCurrency}
                                    </div>
                                )}
                            </div>
                            <Button
                                size="lg"
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg px-12 py-6"
                                onClick={handleBuyClick}
                            >
                                {!user 
                                    ? "Connect Wallet" 
                                    : !selectedCurrency 
                                        ? "Select Currency" 
                                        : "Buy Now"}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Add WalletPicker Dialog */}
                <Dialog open={showWalletPicker} onOpenChange={setShowWalletPicker}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-center">Connect Your Wallet</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col items-center justify-center p-6">
                            <p className="text-center text-muted-foreground mb-6">
                                Connect your wallet to purchase this course
                            </p>
                            <WalletPicker />
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Currency Selector Dialog */}
                <CurrencySelector
                    open={showCurrencySelector}
                    onOpenChange={setShowCurrencySelector}
                    selectedCurrency={selectedCurrency}
                    setSelectedCurrency={setSelectedCurrency}
                    basePrice={course.price}
                    onConfirm={() => setShowCurrencySelector(false)}
                />
            </div>
        </div>
    );
}