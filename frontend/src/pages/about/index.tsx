import { fadeInUp, staggerChildren } from '@/lib/animations';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github, Globe } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <motion.div
                className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 text-white overflow-hidden min-h-[40vh] flex items-center justify-center"
                initial={{ backgroundPosition: '0% 50%' }}
                animate={{ backgroundPosition: '100% 50%' }}
                transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
            >
                <div className="absolute inset-0">
                    <motion.div
                        className="absolute inset-0 bg-[url('/hexagon-pattern.svg')] opacity-15"
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                        aria-hidden="true"
                    />
                </div>

                <div className="container mx-auto px-4 py-12 relative">
                    <motion.div
                        className="max-w-3xl mx-auto text-center"
                        variants={staggerChildren}
                        initial="initial"
                        animate="animate"
                    >
                        <motion.h1
                            variants={fadeInUp}
                            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white"
                        >
                            Empowering Blockchain Education for Everyone
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-lg md:text-xl text-purple-100 mb-6"
                        >
                            Breaking barriers in blockchain learning with decentralized solutions
                            for a better future.
                        </motion.p>

                        <motion.a
                            href="/courses"
                            className="inline-block bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold px-6 py-2 rounded-lg text-base transition-all transform hover:scale-105 hover:shadow-lg hover:from-purple-600 hover:to-purple-700"
                            whileHover={{ scale: 1.05, y: -1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Start Learning
                        </motion.a>
                    </motion.div>
                </div>
            </motion.div>
            {/* Meet the Founders */}
            <motion.section
                className="py-24 bg-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <motion.h2
                        variants={fadeInUp}
                        className="text-3xl font-bold text-gray-900 mb-12 text-center"
                    >
                        Meet the Founders
                    </motion.h2>

                    <motion.div
                        className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8"
                        variants={staggerChildren}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {/* Ricardo's Card */}
                        <motion.div
                            className="group bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 flex flex-col h-full"
                            variants={fadeInUp}
                            whileHover={{ y: -5 }}
                        >
                            <div className="flex flex-col items-center mb-4">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-1 mb-4">
                                    <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                                        <img
                                            src="https://framerusercontent.com/images/vVZ5boECZpOdVfsfUDdc1ybbWU.jpg?scale-down-to=512"
                                            alt="Ricardo Barroca"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                    Ricardo Barroca
                                </h3>
                                <p className="text-purple-600 font-medium mb-2">
                                    Co-Founder & Growth Lead
                                </p>
                            </div>
                            <p className="text-gray-600 text-center flex-grow">
                                Passionate entrepreneur with a track record of success. Generated
                                $500K+ in client value through innovative tech solutions and trading
                                strategies. Self-taught developer who thrives on turning bold ideas
                                into impactful businesses at the intersection of AI and finance.
                            </p>
                            <div className="mt-6 flex justify-center space-x-4">
                                <motion.a
                                    href="https://x.com/degenroca888"
                                    className="text-gray-400 hover:text-purple-600 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="sr-only">X (formerly Twitter)</span>
                                    <Twitter className="h-5 w-5" />
                                </motion.a>
                                <motion.a
                                    href="https://linkedin.com/in/ricardoBarroca"
                                    className="text-gray-400 hover:text-purple-600 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="sr-only">LinkedIn</span>
                                    <Linkedin className="h-5 w-5" />
                                </motion.a>
                                <motion.a
                                    href="https://github.com/elbarroca"
                                    className="text-gray-400 hover:text-purple-600 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="sr-only">GitHub</span>
                                    <Github className="h-5 w-5" />
                                </motion.a>
                                <motion.a
                                    href="https://rbarroca.com"
                                    className="text-gray-400 hover:text-purple-600 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="sr-only">Personal Website</span>
                                    <Globe className="h-5 w-5" />
                                </motion.a>
                            </div>
                        </motion.div>

                        {/* Co-founder's Card */}
                        <motion.div
                            className="group bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 flex flex-col h-full"
                            variants={fadeInUp}
                            whileHover={{ y: -5 }}
                        >
                            <div className="flex flex-col items-center mb-4">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-1 mb-4">
                                    <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                                        <img
                                            src="https://www.riki.bio/pfpHacker.png"
                                            alt="Ricardo Castelló"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                    Ricardo Castelló
                                </h3>
                                <p className="text-purple-600 font-medium mb-2">
                                    Co-Founder & Tech Lead
                                </p>
                            </div>
                            <p className="text-gray-600 text-center flex-grow">
                                A tech visionary with deep Solana expertise, Ricardo combines his
                                Computer Science and Business Management background to revolutionize
                                blockchain education. His innovative solutions and entrepreneurial
                                drive make him a dynamic force in the crypto space.
                            </p>
                            <div className="mt-6 flex justify-center space-x-4">
                                <motion.a
                                    href="https://x.com/ricardocr987"
                                    className="text-gray-400 hover:text-purple-600 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="sr-only">X (formerly Twitter)</span>
                                    <Twitter className="h-5 w-5" />
                                </motion.a>
                                <motion.a
                                    href="https://github.com/ricardocr987"
                                    className="text-gray-400 hover:text-purple-600 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="sr-only">GitHub</span>
                                    <Github className="h-5 w-5" />
                                </motion.a>
                                <motion.a
                                    href="https://www.riki.bio/"
                                    className="text-gray-400 hover:text-purple-600 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="sr-only">Personal Website</span>
                                    <Globe className="h-5 w-5" />
                                </motion.a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Mission Statement */}
            <motion.section
                className="py-24 bg-gray-50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <motion.div
                        className="max-w-3xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 shadow-xl backdrop-blur-sm border border-white/20"
                        variants={fadeInUp}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            We believe education should be free from centralized control, empowering
                            learners to take ownership of their growth. Our platform bridges the gap
                            between blockchain technology and those eager to master it, fostering a
                            decentralized future for everyone.
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Our Story */}
            <motion.section
                className="py-24 bg-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <motion.div
                        className="max-w-4xl mx-auto"
                        variants={staggerChildren}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <motion.h2
                            variants={fadeInUp}
                            className="text-3xl font-bold text-gray-900 mb-8 text-center"
                        >
                            Our Story
                        </motion.h2>

                        <motion.div
                            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                            variants={fadeInUp}
                        >
                            <div className="space-y-6">
                                <motion.div
                                    className="flex items-center gap-4 mb-6"
                                    variants={fadeInUp}
                                >
                                    <div className="h-12 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full" />
                                    <p className="text-gray-700 leading-relaxed">
                                        Founded by two passionate students, Ricardo and Ricardo, our
                                        project was born out of a shared frustration with the
                                        challenges of learning blockchain technology.
                                    </p>
                                </motion.div>

                                <motion.div className="flex items-center gap-4" variants={fadeInUp}>
                                    <div className="h-12 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                                    <p className="text-gray-700 leading-relaxed">
                                        We decided to change that. Our project, built during the
                                        Taipei Blockchain Week Hackathon, is our contribution to
                                        democratizing blockchain education.
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Call to Action */}
            <motion.section
                className="py-16 bg-gradient-to-r from-purple-900 to-blue-900 text-white relative overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <motion.div
                    className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 1, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                />
                <div className="container mx-auto px-4 text-center relative">
                    <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-6">
                        Join us in breaking barriers and shaping the future of blockchain education
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="text-xl text-purple-100 mb-8">
                        Whether you're a beginner or a blockchain pro, our platform is here to
                        empower you.
                    </motion.p>
                    <motion.a
                        href="/courses"
                        className="inline-block bg-white text-purple-900 font-semibold px-8 py-3 rounded-lg transition-all hover:bg-purple-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Start Learning
                    </motion.a>
                </div>
            </motion.section>
        </main>
    );
}
