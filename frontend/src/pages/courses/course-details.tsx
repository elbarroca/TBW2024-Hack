import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Star, Clock, CheckCircle2, Users, 
    MessageCircle, Play,
    Github, Linkedin
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
import Footer from '@/components/layout/Footer';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function CourseDetailsPage() {
    const { creatorSlug, courseSlug } = useParams();
    const [showCurrencySelector, setShowCurrencySelector] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [isWalletConnected, setIsWalletConnected] = useState(false);

    const currencies = [
        { name: "BONK", rate: 0.000001 },
        { name: "SOL", rate: 100 },
        { name: "USDC", rate: 1 },
    ];

    const handleConnectWallet = async () => {
        // Implement wallet connection logic here
        setIsWalletConnected(true);
    };

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
                                            onClick={() => {
                                                if (!isWalletConnected) {
                                                    handleConnectWallet();
                                                } else {
                                                    setShowCurrencySelector(true);
                                                }
                                            }}
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
                        {/* What You'll Learn */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl shadow-sm overflow-hidden"
                        >
                            <div className="border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50 p-8">
                                <h3 className="text-2xl font-semibold text-gray-900">What You'll Learn</h3>
                                <p className="mt-2 text-gray-600">Skills and knowledge you'll gain from this course</p>
                            </div>
                            <div className="p-8">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {course.whatYouWillLearn.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                            className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex-shrink-0">
                                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                                    <CheckCircle2 className="h-5 w-5 text-purple-600" />
                                                </div>
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className="font-medium text-gray-900">{item}</p>
                                                <p className="text-sm text-gray-600">
                                                    Master this concept through practical examples and hands-on exercises
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Course Description */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-xl shadow-sm overflow-hidden"
                        >
                            <div className="border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50 p-8">
                                <h3 className="text-2xl font-semibold text-gray-900">Course Description</h3>
                                <p className="mt-2 text-gray-600">Detailed overview of course content and objectives</p>
                            </div>
                            <div className="p-8">
                                <div className="prose prose-purple max-w-none">
                                    <p className="text-gray-600 leading-relaxed">
                                        {course.description}
                                    </p>
                                    
                                    {/* Key Features */}
                                    <div className="mt-8 grid sm:grid-cols-2 gap-6">
                                        <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                                            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                                <Clock className="h-6 w-6 text-purple-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">Self-Paced Learning</h4>
                                                <p className="text-sm text-gray-600">Learn at your own speed</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                                            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                                <MessageCircle className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">Expert Support</h4>
                                                <p className="text-sm text-gray-600">Get help when you need it</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Prerequisites */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-xl shadow-sm overflow-hidden"
                        >
                            <div className="border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50 p-8">
                                <h3 className="text-2xl font-semibold text-gray-900">Prerequisites</h3>
                                <p className="mt-2 text-gray-600">Required knowledge and tools before starting</p>
                            </div>
                            <div className="p-8">
                                <div className="grid gap-6">
                                    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">Basic Blockchain Knowledge</h4>
                                            <p className="mt-1 text-gray-600">
                                                Understanding of blockchain fundamentals and distributed systems
                                            </p>
                                            <div className="mt-3">
                                                <Button variant="link" className="h-auto p-0 text-purple-600">
                                                    View Recommended Resources →
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">JavaScript Programming</h4>
                                            <p className="mt-1 text-gray-600">
                                                Familiarity with JavaScript ES6+ features and async programming
                                            </p>
                                            <div className="mt-3">
                                                <Button variant="link" className="h-auto p-0 text-purple-600">
                                                    Take JavaScript Assessment →
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* About the Creator */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white rounded-xl shadow-sm overflow-hidden"
                        >
                            <div className="relative h-48">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600">
                                    <div 
                                        className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"
                                        style={{ backgroundSize: '30px 30px' }}
                                    />
                                </div>
                            </div>
                            <div className="relative px-8 -mt-24 pb-8">
                                <div className="flex flex-col items-center text-center">
                                    {/* Creator Profile */}
                                    <div className="w-40 h-40 rounded-2xl ring-4 ring-white shadow-xl overflow-hidden bg-white">
                                        <img 
                                            src={course.creator.avatar} 
                                            alt={course.creator.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {course.creator.name}
                                        </h3>
                                        <p className="text-purple-600 font-medium text-lg mt-1">
                                            {course.creator.title}
                                        </p>
                                    </div>

                                    {/* Social Links */}
                                    <div className="flex items-center gap-4 mt-6">
                                        <Button variant="outline" size="icon" className="rounded-full w-12 h-12 bg-black hover:bg-gray-900">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"/>
                                            </svg>
                                        </Button>
                                        <Button variant="outline" size="icon" className="rounded-full w-12 h-12 bg-gray-900 hover:bg-black">
                                            <Github className="w-5 h-5 text-white" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700">
                                            <Linkedin className="w-5 h-5 text-white" />
                                        </Button>
                                    </div>

                                    {/* Bio with Elevator Pitch */}
                                    <div className="mt-10 max-w-2xl text-center space-y-4">
                                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl">
                                            <p className="text-lg text-purple-900 font-medium italic">
                                                "Empowering the next generation of DeFi developers with practical, hands-on knowledge. 
                                                Let's build the future of finance together."
                                            </p>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed">
                                            {course.creator.bio}
                                        </p>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-8 mt-10 w-full max-w-2xl">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-purple-600">12+</div>
                                            <div className="text-sm text-gray-600 mt-1">Courses Created</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-purple-600">10k+</div>
                                            <div className="text-sm text-gray-600 mt-1">Students</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-purple-600">4.9</div>
                                            <div className="text-sm text-gray-600 mt-1">Avg. Rating</div>
                                        </div>
                                    </div>

                                    {/* Expertise */}
                                    <div className="mt-8">
                                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Areas of Expertise</h4>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {course.creator.expertise.map((skill, index) => (
                                                <Badge 
                                                    key={index}
                                                    variant="secondary" 
                                                    className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-1 text-sm"
                                                >
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Other Courses Section */}
                                    <div className="mt-16 w-full max-w-4xl">
                                        <div className="flex items-center justify-between mb-6">
                                            <h4 className="text-2xl font-bold text-gray-900">Other Courses by {course.creator.name}</h4>
                                            <Button variant="link" className="text-purple-600 font-medium">
                                                View All →
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {COURSES.filter(c => 
                                                c.creator.id === course.creator.id && 
                                                c.id !== course.id
                                            ).slice(0, 2).map((otherCourse, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.1 * index }}
                                                    className="group relative rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300"
                                                >
                                                    <div className="aspect-video relative overflow-hidden">
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                                        <img 
                                                            src={otherCourse.image} 
                                                            alt={otherCourse.title}
                                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                        <div className="absolute bottom-4 left-4 right-4 z-20">
                                                            <h5 className="text-xl font-bold text-white mb-2">
                                                                {otherCourse.title}
                                                            </h5>
                                                            <div className="flex items-center space-x-4">
                                                                <div className="flex items-center text-white/90 text-sm">
                                                                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                                                    <span>{otherCourse.rating}</span>
                                                                    <span className="mx-2">•</span>
                                                                    <span>{otherCourse.enrolled.toLocaleString()} students</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="p-6">
                                                        <p className="text-gray-600 line-clamp-2 mb-4">
                                                            {otherCourse.subtitle}
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-2">
                                                                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                                                                    {otherCourse.level}
                                                                </Badge>
                                                                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                                                    {otherCourse.duration}
                                                                </Badge>
                                                            </div>
                                                            <div className="text-lg font-bold text-purple-600">
                                                                {otherCourse.price} USDC
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="absolute inset-0 bg-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
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
                            onClick={() => {
                                if (!isWalletConnected) {
                                    handleConnectWallet();
                                } else if (!selectedCurrency) {
                                    setShowCurrencySelector(true);
                                } else {
                                    // Implement purchase logic
                                    console.log('Purchase with', selectedCurrency);
                                }
                            }}
                        >
                            {!isWalletConnected 
                                ? "Connect Wallet" 
                                : !selectedCurrency 
                                    ? "Select Currency" 
                                    : "Buy Now"}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Currency Selector Dialog */}
            <Dialog open={showCurrencySelector} onOpenChange={setShowCurrencySelector}>
                <DialogContent className="sm:max-w-md bg-gradient-to-b from-gray-50 to-white">
                    <DialogHeader className="space-y-3 pb-4">
                        <DialogTitle className="text-2xl font-bold text-center">Select Payment Currency</DialogTitle>
                        <p className="text-gray-500 text-center text-sm">Choose your preferred currency for payment</p>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        <div className="space-y-4">
                            {currencies.map((currency) => (
                                <div
                                    key={currency.name}
                                    className={`relative p-4 rounded-lg border-2 transition-all cursor-pointer
                                        ${selectedCurrency === currency.name 
                                            ? 'border-purple-500 bg-purple-50' 
                                            : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'}`}
                                    onClick={() => setSelectedCurrency(currency.name)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                                                <img 
                                                    src={`/images/currencies/${currency.name.toLowerCase()}.png`} 
                                                    alt={currency.name}
                                                    className="w-6 h-6"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{currency.name}</h3>
                                                <p className="text-sm text-gray-500">
                                                    Rate: 1 USDC = {currency.rate} {currency.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-purple-600">
                                                {calculatePrice(course.price, currency.name)}
                                            </div>
                                            <div className="text-sm text-gray-500">{currency.name}</div>
                                        </div>
                                    </div>
                                    {selectedCurrency === currency.name && (
                                        <div className="absolute top-1/2 -right-3 -translate-y-1/2">
                                            <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                                                <CheckCircle2 className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {selectedCurrency && (
                            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium text-gray-500">You'll Pay</div>
                                        <div className="text-2xl font-bold text-purple-600">
                                            {calculatePrice(course.price, selectedCurrency)} {selectedCurrency}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-gray-500">Original Price</div>
                                        <div className="text-lg font-semibold text-gray-900">
                                            {course.price} USDC
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <Button
                            className={`w-full py-6 text-lg font-semibold transition-all ${
                                selectedCurrency 
                                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl' 
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                            onClick={() => setShowCurrencySelector(false)}
                            disabled={!selectedCurrency}
                        >
                            {selectedCurrency ? 'Confirm Selection' : 'Please Select a Currency'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}