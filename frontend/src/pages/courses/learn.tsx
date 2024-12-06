import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    CheckCircle2, Lock,
    ThumbsUp, Share2, ChevronLeft, Wallet, Coins, Sparkles, X, MessageSquarePlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/Badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import VideoPlayer from '@/components/VideoPlayer';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Interfaces
interface Resource {
    id: string;
    title: string;
    type: 'pdf' | 'youtube' | 'slides' | 'link';
    url: string;
    icon: string;
}

interface Comment {
    id: string;
    user: {
        name: string;
        avatar: string;
    };
    content: string;
    timestamp: string;
    likes: number;
    replies: Comment[];
}

interface Lesson {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    duration: string;
    completed: boolean;
    locked: boolean;
    resources?: Resource[];
    comments?: Comment[];
}

interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

interface Course {
    id: string;
    slug: string;
    title: string;
    creator: {
        name: string;
        avatar: string;
        slug: string;
    };
    modules: Module[];
    progress: number;
}

// Mock data
const mockCourseData: Course = {
    id: '1',
    slug: 'defi-protocol-development',
    title: 'DeFi Protocol Development',
    creator: {
        name: 'Elena Rodriguez',
        avatar: '/avatars/elena.jpg',
        slug: 'elena-rodriguez'
    },
    modules: [
        {
            id: 'm1',
            title: 'Introduction to DeFi',
            lessons: [
                {
                    id: 'l1',
                    title: 'What is DeFi?',
                    description: "Understanding the fundamentals of decentralized finance and its core principles. We will explore the key concepts that make DeFi revolutionary, including permissionless systems, liquidity pools, and yield farming.",
                    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                    duration: '15:00',
                    completed: true,
                    locked: false,
                    resources: [
                        {
                            id: 'r1',
                            title: 'DeFi Fundamentals Slides',
                            type: 'slides',
                            url: '/resources/defi-fundamentals.pdf',
                            icon: '/icons/slides.svg'
                        },
                    ],
                    comments: [
                        {
                            id: 'c1',
                            user: {
                                name: 'Alex Chen',
                                avatar: '/avatars/alex.jpg'
                            },
                            content: "Great explanation of the basics! Could you elaborate more on yield farming?",
                            timestamp: '2024-01-12T15:30:00Z',
                            likes: 8,
                            replies: []
                        }
                    ]
                },
                {
                    id: 'l2',
                    title: 'Smart Contract Basics',
                    description: "Learn the fundamentals of smart contract development for DeFi protocols. We will cover Solidity basics, security best practices, and common DeFi contract patterns.",
                    videoUrl: 'https://example.com/videos/smart-contracts.mp4',
                    duration: '20:00',
                    completed: false,
                    locked: false,
                    resources: [
                        {
                            id: 'r3',
                            title: 'Smart Contract Security Checklist',
                            type: 'pdf',
                            url: '/resources/security-checklist.pdf',
                            icon: '/icons/pdf.svg'
                        }
                    ]
                }
            ]
        }
    ],
    progress: 30
};

// Add handleTip function
const handleTip = async (amount: number) => {
    try {
        // TODO: Implement wallet connection and BONK transfer
        console.log(`Tipping ${amount} BONK`);
    } catch (error) {
        console.error('Failed to send tip:', error);
    }
};

export default function LearnPage() {
    const { creatorSlug, courseSlug, lessonId } = useParams<{
        creatorSlug: string;
        courseSlug: string;
        lessonId?: string;
    }>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isWritingComment, setIsWritingComment] = useState(false);

    // Find current course and lesson
    const currentCourse = mockCourseData.creator.slug === creatorSlug && 
                         mockCourseData.slug === courseSlug ? mockCourseData : null;
    
    const currentLesson = currentCourse?.modules
        .flatMap(m => m.lessons)
        .find(l => l.id === lessonId) || currentCourse?.modules[0].lessons[0];

    useEffect(() => {
        if (currentCourse && !lessonId) {
            // Redirect to first lesson if no lesson specified
            navigate(`/${creatorSlug}/${courseSlug}/learn/${currentCourse.modules[0].lessons[0].id}`, { replace: true });
        }
        setIsLoading(false);
    }, [creatorSlug, courseSlug, lessonId, navigate, currentCourse]);

    const navigateToLesson = (moduleId: string, lessonId: string) => {
        navigate(`/${creatorSlug}/${courseSlug}/learn/${lessonId}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!currentCourse || !currentLesson) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h1>
                <p className="text-gray-600 mb-4">The requested course could not be found.</p>
                <Button onClick={() => navigate('/courses')} variant="outline">
                    Back to Courses
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
            <Header />
            
            {/* Main Content */}
            <main className="flex-1">
                {/* Course Navigation */}
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="fixed top-[60px] left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-[90] shadow-sm py-2"
                >
                    <div className="max-w-[90%] mx-auto px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button 
                                variant="ghost" 
                                onClick={() => navigate(`/${currentCourse.creator.slug}/${currentCourse.slug}`)}
                                className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Back to Course
                            </Button>
                            <Separator orientation="vertical" className="h-6" />
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">{currentCourse.title}</h2>
                                <p className="text-sm text-gray-500">by {currentCourse.creator.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge variant="outline" className="py-1.5 px-3 border-purple-200 text-purple-800">
                                Lesson {currentCourse.modules.flatMap(m => m.lessons).findIndex(l => l.id === currentLesson.id) + 1} of {currentCourse.modules.reduce((acc, m) => acc + m.lessons.length, 0)}
                            </Badge>
                            <Badge variant="secondary" className="py-1.5 px-3 bg-purple-100 text-purple-800">
                                {currentLesson.duration}
                            </Badge>
                        </div>
                    </div>
                </motion.div>

                {/* Content Container */}
                <div className="pt-[120px]">
                    <div className="container mx-auto max-w-[1400px] px-4">
                        {/* Title */}
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent mb-8 pt-14"
                        >
                            {currentLesson.title}
                        </motion.h1>

                        {/* Video Section */}
                        <div className="relative mb-8 bg-black/5 rounded-3xl p-8">
                            <motion.section 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="relative w-full aspect-video shadow-2xl rounded-2xl overflow-hidden border border-purple-200/20"
                            >
                                <VideoPlayer url={currentLesson.videoUrl} />
                            </motion.section>
                        </div>

                        {/* Progress Bar */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full bg-white/50 backdrop-blur-sm shadow-sm py-4 rounded-xl mb-8"
                        >
                            <div className="max-w-[90%] mx-auto">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-semibold text-gray-900">Course Progress</h3>
                                        <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">
                                            {currentCourse.progress}% Complete
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <motion.div 
                                            className="px-3 py-1.5 bg-purple-100/80 backdrop-blur-sm text-purple-800 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            Level {Math.floor(currentCourse.progress / 20) + 1}
                                        </motion.div>
                                        <motion.div 
                                            className="px-3 py-1.5 bg-green-100/80 backdrop-blur-sm text-green-800 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {currentCourse.progress} XP
                                        </motion.div>
                                    </div>
                                </div>
                                <div className="relative h-4">
                                    <div 
                                        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 rounded-full shadow-lg" 
                                        style={{ width: `${currentCourse.progress}%` }} 
                                    />
                                    <div className="absolute inset-0 bg-gray-200/50 backdrop-blur-sm rounded-full -z-10" />
                                    <motion.div 
                                        className="absolute -top-1 bg-white rounded-full shadow-lg p-1.5 cursor-pointer border border-purple-200"
                                        style={{ left: `${currentCourse.progress}%` }}
                                        whileHover={{ scale: 1.2 }}
                                        animate={{ y: [0, -3, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <div className="w-3 h-3 bg-purple-600 rounded-full" />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                            {/* Left Column - About, Discussions, Tip */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* About Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100"
                                >
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent mb-4">
                                        About This Lesson
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        {currentLesson.description}
                                    </p>
                                </motion.div>

                                {/* Discussions Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">
                                            Discussion
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <Badge variant="outline" className="bg-purple-50 text-purple-800">
                                                {currentLesson.comments?.length || 0} comments
                                            </Badge>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setIsWritingComment(!isWritingComment)}
                                                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                                            >
                                                {isWritingComment ? (
                                                    <X className="h-4 w-4" />
                                                ) : (
                                                    <MessageSquarePlus className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Add Comment Section - Dynamic */}
                                    <AnimatePresence>
                                        {isWritingComment && (
                                            <motion.div 
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-purple-100">
                                                    <div className="flex gap-4">
                                                        <Avatar className="w-10 h-10 border-2 border-purple-100">
                                                            <AvatarImage src="/avatars/default.png" />
                                                            <AvatarFallback>ME</AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1 space-y-4">
                                                            <textarea
                                                                placeholder="Share your thoughts..."
                                                                className="w-full p-3 rounded-lg border border-purple-100 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 min-h-[100px] transition-all"
                                                            />
                                                            <div className="flex justify-end gap-2">
                                                                <Button 
                                                                    variant="outline" 
                                                                    className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                                                                    onClick={() => setIsWritingComment(false)}
                                                                >
                                                                    Cancel
                                                                </Button>
                                                                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                                                                    Post Comment
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Comments List */}
                                    <div className="space-y-4">
                                        {currentLesson.comments?.map((comment) => (
                                            <motion.div 
                                                key={comment.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <Avatar className="w-10 h-10">
                                                        <AvatarImage src={comment.user.avatar} />
                                                        <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="font-medium text-gray-900">{comment.user.name}</h4>
                                                            <span className="text-sm text-gray-500">
                                                                {new Date(comment.timestamp).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <p className="mt-1 text-gray-700">{comment.content}</p>
                                                        <div className="flex items-center gap-4 mt-2">
                                                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-purple-600">
                                                                <ThumbsUp className="w-4 h-4 mr-1" />
                                                                {comment.likes}
                                                            </Button>
                                                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-purple-600">
                                                                <Share2 className="w-4 h-4 mr-1" />
                                                                Share
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Tip Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="rounded-2xl overflow-hidden bg-white border border-purple-100">
                                        {/* Header */}
                                        <div className="bg-purple-600 px-8 py-6 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-12 w-12 border-2 border-white/20">
                                                    <AvatarImage src={currentCourse.creator.avatar} alt={currentCourse.creator.name} />
                                                    <AvatarFallback>{currentCourse.creator.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="text-white">
                                                    <h3 className="text-xl font-semibold">Support {currentCourse.creator.name}</h3>
                                                    <p className="text-sm opacity-80">with $BONK</p>
                                                </div>
                                            </div>
                                            <motion.div
                                                animate={{ rotate: [0, 15, -15, 0] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="text-yellow-300"
                                            >
                                                <Sparkles className="h-5 w-5" />
                                            </motion.div>
                                        </div>

                                        {/* Info Banner */}
                                        <div className="px-8 py-4 bg-purple-50/50 flex items-center gap-2">
                                            <Coins className="h-4 w-4 text-purple-600" />
                                            <p className="text-sm text-purple-700">Feeless & instant on Solana!</p>
                                        </div>

                                        {/* Tip Options */}
                                        <div className="p-8 grid grid-cols-3 gap-4">
                                            {[
                                                { amount: 1000, label: '1K', usd: 0.01 },
                                                { amount: 5000, label: '5K', usd: 0.05 },
                                                { amount: 10000, label: '10K', usd: 0.1 }
                                            ].map((option) => (
                                                <motion.button
                                                    key={option.amount}
                                                    onClick={() => handleTip(option.amount)}
                                                    className="bg-purple-50/50 rounded-xl py-5 px-4 flex flex-col items-center hover:bg-purple-100/50 transition-colors"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <span className="text-2xl font-semibold text-purple-900">{option.label}</span>
                                                    <span className="text-sm text-purple-600">${option.usd}</span>
                                                </motion.button>
                                            ))}
                                        </div>

                                        {/* Connect Wallet */}
                                        <div className="px-8 pb-8">
                                            <Button 
                                                variant="outline" 
                                                className="w-full border-purple-200 bg-white hover:bg-purple-50 text-purple-600 gap-2 font-medium h-12"
                                                onClick={() => {/* Handle wallet connection */}}
                                            >
                                                <Wallet className="h-4 w-4" />
                                                Connect Wallet
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right Column - Course Content */}
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 sticky top-[calc(60px+80px)]"
                                >
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent mb-6">
                                        Course Content
                                    </h2>
                                    <ScrollArea className="h-[calc(100vh-400px)]">
                                        <div className="space-y-6">
                                            {currentCourse.modules.map((module) => (
                                                <div key={module.id} className="space-y-2">
                                                    <h4 className="font-medium text-gray-900">{module.title}</h4>
                                                    <div className="space-y-2">
                                                        {module.lessons.map((lesson) => (
                                                            <motion.button
                                                                key={lesson.id}
                                                                onClick={() => navigateToLesson(module.id, lesson.id)}
                                                                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                                                                    lesson.id === currentLesson.id
                                                                        ? 'bg-purple-50 text-purple-900 border border-purple-200'
                                                                        : lesson.locked
                                                                        ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                                                        : 'hover:bg-gray-50'
                                                                }`}
                                                                disabled={lesson.locked}
                                                                whileHover={!lesson.locked ? { scale: 1.02 } : {}}
                                                                whileTap={!lesson.locked ? { scale: 0.98 } : {}}
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <motion.div
                                                                        animate={lesson.completed ? { scale: [1, 1.2, 1] } : {}}
                                                                        transition={{ duration: 0.5 }}
                                                                    >
                                                                        {lesson.completed ? (
                                                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                                        ) : lesson.locked ? (
                                                                            <Lock className="h-5 w-5 text-gray-400" />
                                                                        ) : (
                                                                            <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                                                                        )}
                                                                    </motion.div>
                                                                    <span className="text-sm font-medium">{lesson.title}</span>
                                                                </div>
                                                                <span className="text-sm text-gray-500">
                                                                    {lesson.duration}
                                                                </span>
                                                            </motion.button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}