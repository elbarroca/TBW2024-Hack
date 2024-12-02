import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Star, Clock, CheckCircle2, Users, 
    MessageCircle, Heart, Play,
    Twitter, Github, Linkedin, ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COURSES } from '@/data/courses';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function CourseDetailsPage() {
    const { creatorSlug, courseSlug } = useParams();
    const [isWishlisted, setIsWishlisted] = useState(false);

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
        <div className="min-h-screen bg-gray-50">
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
                                <Button 
                                    variant="secondary"
                                    className="bg-white/20 hover:bg-white/30 text-white border-none"
                                    onClick={() => window.location.href = `/${course.creator.id}`}
                                >
                                    View Profile
                                </Button>
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
                        <div className="relative h-48 bg-gradient-to-r from-purple-600 to-blue-600">
                            <div 
                                className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"
                                style={{ backgroundSize: '30px 30px' }}
                            />
                        </div>
                        <div className="relative px-8 -mt-16 pb-8">
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Creator Profile */}
                                <div className="flex-shrink-0 flex flex-col items-center md:items-start">
                                    <div className="w-32 h-32 rounded-xl ring-4 ring-white shadow-xl overflow-hidden">
                                        <img 
                                            src={course.creator.avatar} 
                                            alt={course.creator.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="mt-4 text-center md:text-left">
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {course.creator.name}
                                        </h3>
                                        <p className="text-purple-600 font-medium">
                                            {course.creator.title}
                                        </p>
                                    </div>
                                    {/* Social Links */}
                                    <div className="flex items-center gap-3 mt-4">
                                        <Button variant="outline" size="icon" className="rounded-full">
                                            <Twitter className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="rounded-full">
                                            <Github className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="rounded-full">
                                            <Linkedin className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Creator Info */}
                                <div className="flex-1 space-y-6">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">About the Creator</h4>
                                        <p className="text-gray-600 leading-relaxed">
                                            {course.creator.bio}
                                        </p>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                                            <div className="text-2xl font-bold text-purple-600">12+</div>
                                            <div className="text-sm text-gray-600">Courses Created</div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                                            <div className="text-2xl font-bold text-purple-600">10k+</div>
                                            <div className="text-sm text-gray-600">Students</div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                                            <div className="text-2xl font-bold text-purple-600">4.9</div>
                                            <div className="text-sm text-gray-600">Avg. Rating</div>
                                        </div>
                                    </div>

                                    {/* Expertise */}
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Areas of Expertise</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {course.creator.expertise.map((skill, index) => (
                                                <Badge 
                                                    key={index}
                                                    variant="secondary" 
                                                    className="bg-purple-100 text-purple-700 hover:bg-purple-200"
                                                >
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Other Courses */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="text-lg font-semibold text-gray-900">Other Courses by Creator</h4>
                                            <Button variant="link" className="text-purple-600">
                                                View All →
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            {COURSES.filter(c => 
                                                c.creator.id === course.creator.id && 
                                                c.id !== course.id
                                            ).slice(0, 2).map((course, index) => (
                                                <div 
                                                    key={index}
                                                    className="group relative rounded-lg overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors"
                                                >
                                                    <div className="aspect-video rounded-lg overflow-hidden">
                                                        <img 
                                                            src={course.image} 
                                                            alt={course.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="p-4">
                                                        <h5 className="font-medium text-gray-900 line-clamp-1">
                                                            {course.title}
                                                        </h5>
                                                        <div className="flex items-center mt-2 text-sm text-gray-600">
                                                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                                            <span>{course.rating}</span>
                                                            <span className="mx-2">•</span>
                                                            <span>{course.enrolled} students</span>
                                                        </div>
                                                    </div>
                                                    <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
} 