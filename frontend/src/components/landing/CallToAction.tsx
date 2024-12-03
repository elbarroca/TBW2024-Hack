import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function CallToAction() {
    const navigate = useNavigate();

    const handleExplore = () => {
        navigate('/courses');
    };

    return (
        <section className="py-24 bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px] animate-[grid_20s_linear_infinite]" />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-600/50 via-purple-500/30 to-transparent backdrop-blur-sm" />
            
            {/* Floating orbs decoration */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-purple-400/20 rounded-full blur-xl animate-float" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-300/20 rounded-full blur-xl animate-float-delayed" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 hover:bg-white/20 transition-colors"
                    >
                        <Sparkles className="h-5 w-5 text-yellow-300 mr-2 animate-pulse" />
                        <span className="text-white font-medium">Start Learning Today</span>
                    </motion.div>

                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                    >
                        Begin Your Web3 Journey
                    </motion.h2>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-xl text-purple-100 mb-12"
                    >
                        Join thousands of students and become a part of the decentralized future.
                        Get started with our comprehensive courses today.
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="inline-flex items-center px-8 py-4 rounded-full bg-white text-purple-600 font-semibold shadow-lg hover:bg-purple-50 transition-all group relative overflow-hidden"
                            onClick={handleExplore}
                        >
                            <span className="relative z-10">Start Now</span>
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="inline-flex items-center px-8 py-4 rounded-full text-white border-2 border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm"
                            onClick={() => navigate('/about')}
                        >
                            Learn More
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
}
