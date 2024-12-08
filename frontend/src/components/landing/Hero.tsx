import { ArrowRight, Sparkles, BookOpen, Shield, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Hero() {
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const features = [
        {
            icon: BookOpen,
            title: 'Expert-Led Courses',
            description: 'Learn from industry leaders',
        },
        {
            icon: Shield,
            title: 'Verified Certificates',
            description: 'Blockchain-backed credentials',
        },
        {
            icon: Users,
            title: 'Active Community',
            description: 'Connect with Peers',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <>
        <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#9945FF] via-[#14F195] to-[#00C2FF] pt-16">
            {/* Animated background particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-2 w-2 rounded-full bg-white/20"
                        animate={{
                            x: ['0%', '100%'],
                            y: ['-100%', '100%'],
                            scale: [1, 0.5, 1],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 20,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: Math.random() * 5,
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Background patterns */}
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px] animate-grid-flow" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-[2px]" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="py-20 md:py-28"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Content */}
                        <motion.div 
                            className="text-center md:text-left space-y-8"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Sparkles className="h-5 w-5 text-yellow-300 mr-2 animate-pulse" />
                                <span className="text-white font-medium">Welcome to Mentora</span>
                            </motion.div>

                            <motion.h1 
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                                variants={itemVariants}
                            >
                                Learn Blockchain{' '}
                                <span className="relative">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14F195] via-[#00C2FF] to-[#14F195] animate-gradient">
                                        Build the Future
                                    </span>
                                    <motion.span
                                        className="absolute -inset-1 bg-gradient-to-r from-[#14F195]/20 via-[#00C2FF]/20 to-[#14F195]/20 blur-lg"
                                        animate={{
                                            opacity: [0.5, 1, 0.5],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                        }}
                                    />
                                </span>
                            </motion.h1>

                            <motion.p 
                                className="text-xl text-gray-100 max-w-2xl"
                                variants={itemVariants}
                            >
                                Upload, earn, and own your creations on a decentralized platform powered by Solana’s 
                                cutting-edge technology.
                            </motion.p>

                            <motion.div 
                                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4"
                                variants={itemVariants}
                            >
                                <Button
                                    onClick={() => navigate('/courses')}
                                    className="relative group bg-gradient-to-r from-[#14F195] to-[#00C2FF] hover:from-[#00C2FF] hover:to-[#14F195] text-gray-900 transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                    size="lg"
                                >
                                    <span className="relative z-10 font-medium">Begin Learning Now</span>
                                    <motion.span
                                        className="absolute inset-0 bg-gradient-to-r from-[#14F195]/40 to-[#00C2FF]/40"
                                        animate={{
                                            opacity: [0, 1, 0],
                                            scale: [0.95, 1.05, 0.95],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                                </Button>
                                <Button
                                    onClick={() => navigate('/about')}
                                    variant="outline"
                                    className="border-2 border-[#14F195]/20 hover:border-[#14F195]/40 hover:bg-white/10"
                                    size="lg"
                                >
                                    Learn More
                                </Button>
                            </motion.div>

                            {/* Features Grid */}
                            <motion.div 
                                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12"
                                variants={containerVariants}
                            >
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05 }}
                                        className="relative"
                                    >
                                        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 overflow-hidden">
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-[#14F195]/10 to-[#00C2FF]/10"
                                                animate={{
                                                    opacity: [0.5, 0.8, 0.5],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: index * 0.3,
                                                }}
                                            />
                                            <div className="relative flex items-center space-x-3">
                                                <feature.icon className="h-6 w-6 text-[#14F195]" />
                                                <div>
                                                    <h3 className="text-white font-medium">{feature.title}</h3>
                                                    <p className="text-white/70 text-sm">{feature.description}</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right Column - Visual */}
                        <motion.div 
                            className="relative hidden md:block"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="absolute -inset-4 bg-[#14F195]/10 rounded-2xl backdrop-blur-lg"
                                animate={{
                                    rotate: [6, -2, 6],
                                    scale: [1, 1.02, 1],
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                            <div className="relative bg-gradient-to-br from-black/80 to-black/60 rounded-xl p-6 shadow-2xl border border-[#14F195]/20">
                                <motion.div 
                                    className="aspect-[4/3] rounded-lg overflow-hidden bg-black/50"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.img
                                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                                        alt="Learning Platform"
                                        className={cn(
                                            "w-full h-full object-cover transition-all duration-700",
                                            isLoaded ? "opacity-90" : "opacity-0 scale-95"
                                        )}
                                        onLoad={() => setIsLoaded(true)}
                                        animate={isLoaded ? { scale: [0.95, 1] } : {}}
                                    />
                                </motion.div>
                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    {[...Array(3)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="h-24 rounded-lg bg-gradient-to-br from-[#14F195]/20 to-[#00C2FF]/20"
                                            animate={{
                                                opacity: [0.5, 1, 0.5],
                                                scale: [1, 1.02, 1],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: i * 0.3,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>

        {/* Why Choose Mentora Section */}
        <section className="bg-white py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
            
            <motion.div 
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="text-center mb-16">
                    <motion.h2 
                        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Why Choose Mentora?
                    </motion.h2>
                    <motion.p 
                        className="text-xl text-gray-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Discover a decentralized platform for creators and learners to thrive together.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "No Middleman",
                            description: "Direct peer-to-peer learning with zero intermediaries or platform fees",
                            icon: "🔗",
                            stats: "100% Direct Access"
                        },
                        {
                            title: "Own Your Content",
                            description: "Full ownership and control of your created content on the blockchain",
                            icon: "📜",
                            stats: "True Digital Ownership"
                        },
                        {
                            title: "NFT Certification",
                            description: "Receive verifiable blockchain credentials as NFTs upon completion",
                            icon: "🏆",
                            stats: "Blockchain-Verified"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="relative group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 * index }}
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                            <div className="relative bg-white p-8 rounded-lg shadow-xl border border-gray-200">
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 mb-4">{item.description}</p>
                                <div className="text-sm font-semibold text-purple-600">{item.stats}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <Button
                        onClick={() => navigate('/courses')}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                        size="lg"
                    >
                        Start Your Journey
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </motion.div>
            </motion.div>
        </section>
        </>
    );
}