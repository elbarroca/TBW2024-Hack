import { fadeInUp, staggerChildren } from '@/lib/animations';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github, Globe, Rocket, Book, Users, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
    return (
        <ScrollArea className="h-screen">
            <main className="bg-gradient-to-b from-gray-50 to-white pt-16">
                {/* Hero Section */}
                <motion.div
                    className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 text-white overflow-hidden min-h-[50vh] flex items-center justify-center"
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

                    <Container className="relative py-16">
                        <motion.div
                            className="max-w-3xl mx-auto text-center"
                            variants={staggerChildren}
                            initial="initial"
                            animate="animate"
                        >
                            <motion.div variants={fadeInUp} className="mb-4">
                                <Badge variant="secondary" className="mb-4 text-lg px-4 py-1">
                                    Web3 Education Platform
                                </Badge>
                            </motion.div>
                            <motion.h1
                                variants={fadeInUp}
                                className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white"
                            >
                                Empowering Blockchain Education for Everyone
                            </motion.h1>

                            <motion.p
                                variants={fadeInUp}
                                className="text-xl md:text-2xl text-purple-100 mb-8"
                            >
                                Breaking barriers in blockchain learning with decentralized solutions
                                for a better future.
                            </motion.p>

                            <motion.div className="flex gap-4 justify-center">
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="bg-white text-purple-900 hover:bg-purple-50"
                                >
                                    <motion.a
                                        href="/courses"
                                        className="flex items-center gap-2"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Book className="w-4 h-4" />
                                        Start Learning
                                    </motion.a>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="bg-transparent border-white text-white hover:bg-white/10"
                                >
                                    <motion.a
                                        href="#mission"
                                        className="flex items-center gap-2"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Rocket className="w-4 h-4" />
                                        Our Mission
                                    </motion.a>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </Container>
                </motion.div>

                {/* Meet the Founders */}
                <motion.section
                    className="py-24 bg-white"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <Container>
                        <motion.div className="text-center mb-12" variants={fadeInUp}>
                            <Badge variant="outline" className="mb-4">
                                <Users className="w-4 h-4 mr-2" />
                                The Team
                            </Badge>
                            <h2 className="text-4xl font-bold text-gray-900">
                                Meet the Founders
                            </h2>
                        </motion.div>

                        <motion.div
                            className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8"
                            variants={staggerChildren}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                        >
                            {/* Ricardo's Card */}
                            <motion.div variants={fadeInUp}>
                                <HoverCard>
                                    <HoverCardTrigger>
                                        <Card className="group h-full transition-all duration-300 hover:shadow-xl">
                                            <CardHeader className="text-center">
                                                <Avatar className="w-32 h-32 mx-auto mb-4 ring-4 ring-purple-100">
                                                    <AvatarImage 
                                                        src="https://framerusercontent.com/images/vVZ5boECZpOdVfsfUDdc1ybbWU.jpg?scale-down-to=512" 
                                                        alt="Ricardo Barroca" 
                                                    />
                                                    <AvatarFallback>RB</AvatarFallback>
                                                </Avatar>
                                                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                                    Ricardo Barroca
                                                </h3>
                                                <Badge variant="secondary" className="mt-2">
                                                    Co-Founder & Growth Lead
                                                </Badge>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-gray-600 text-center">
                                                    Passionate entrepreneur with a track record of success. Generated
                                                    $500K+ in client value through innovative tech solutions and trading
                                                    strategies.
                                                </p>
                                            </CardContent>
                                            <CardFooter className="justify-center space-x-4">
                                                <Button variant="ghost" size="icon" className="hover:text-purple-600">
                                                    <motion.a
                                                        href="https://x.com/degenroca888"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Twitter className="h-5 w-5" />
                                                    </motion.a>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="hover:text-purple-600">
                                                    <motion.a
                                                        href="https://linkedin.com/in/ricardoBarroca"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Linkedin className="h-5 w-5" />
                                                    </motion.a>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="hover:text-purple-600">
                                                    <motion.a
                                                        href="https://github.com/elbarroca"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Github className="h-5 w-5" />
                                                    </motion.a>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="hover:text-purple-600">
                                                    <motion.a
                                                        href="https://rbarroca.com"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Globe className="h-5 w-5" />
                                                    </motion.a>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-80">
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-semibold">Expertise</h4>
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="outline">Entrepreneurship</Badge>
                                                <Badge variant="outline">Growth Strategy</Badge>
                                                <Badge variant="outline">Tech Solutions</Badge>
                                                <Badge variant="outline">Trading</Badge>
                                            </div>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                            </motion.div>

                            {/* Ricardo Castelló's Card */}
                            <motion.div variants={fadeInUp}>
                                <HoverCard>
                                    <HoverCardTrigger>
                                        <Card className="group h-full transition-all duration-300 hover:shadow-xl">
                                            <CardHeader className="text-center">
                                                <Avatar className="w-32 h-32 mx-auto mb-4 ring-4 ring-purple-100">
                                                    <AvatarImage 
                                                        src="https://www.riki.bio/pfpHacker.png" 
                                                        alt="Ricardo Castelló" 
                                                    />
                                                    <AvatarFallback>RC</AvatarFallback>
                                                </Avatar>
                                                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                                    Ricardo Castelló
                                                </h3>
                                                <Badge variant="secondary" className="mt-2">
                                                    Co-Founder & Tech Lead
                                                </Badge>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-gray-600 text-center">
                                                    A tech visionary with deep Solana expertise, combining Computer Science
                                                    and Business Management to revolutionize blockchain education.
                                                </p>
                                            </CardContent>
                                            <CardFooter className="justify-center space-x-4">
                                                <Button variant="ghost" size="icon" className="hover:text-purple-600">
                                                    <motion.a
                                                        href="https://x.com/ricardocr987"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Twitter className="h-5 w-5" />
                                                    </motion.a>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="hover:text-purple-600">
                                                    <motion.a
                                                        href="https://github.com/ricardocr987"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Github className="h-5 w-5" />
                                                    </motion.a>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="hover:text-purple-600">
                                                    <motion.a
                                                        href="https://www.riki.bio/"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Globe className="h-5 w-5" />
                                                    </motion.a>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-80">
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-semibold">Expertise</h4>
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="outline">Solana</Badge>
                                                <Badge variant="outline">Computer Science</Badge>
                                                <Badge variant="outline">Business Management</Badge>
                                                <Badge variant="outline">Blockchain</Badge>
                                            </div>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                            </motion.div>
                        </motion.div>
                    </Container>
                </motion.section>

                {/* Mission and Story Tabs */}
                <motion.section
                    className="py-24 bg-gray-50"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    id="mission"
                >
                    <Container>
                        <Tabs defaultValue="mission" className="max-w-4xl mx-auto">
                            <TabsList className="grid w-full grid-cols-2 mb-8">
                                <TabsTrigger value="mission">Our Mission</TabsTrigger>
                                <TabsTrigger value="story">Our Story</TabsTrigger>
                            </TabsList>
                            <TabsContent value="mission">
                                <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
                                    <CardContent className="p-8">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="text-center space-y-6"
                                        >
                                            <Badge variant="outline" className="mb-4">Mission Statement</Badge>
                                            <h2 className="text-3xl font-bold text-gray-900">Democratizing Blockchain Education</h2>
                                            <p className="text-xl text-gray-700 leading-relaxed">
                                                We believe education should be free from centralized control, empowering
                                                learners to take ownership of their growth. Our platform bridges the gap
                                                between blockchain technology and those eager to master it.
                                            </p>
                                            <div className="flex flex-wrap justify-center gap-4 pt-6">
                                                <Badge variant="secondary">Decentralized Learning</Badge>
                                                <Badge variant="secondary">Accessible Education</Badge>
                                                <Badge variant="secondary">Community-Driven</Badge>
                                            </div>
                                        </motion.div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="story">
                                <Card>
                                    <CardContent className="p-8">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="space-y-6"
                                        >
                                            <div className="text-center mb-8">
                                                <Badge variant="outline" className="mb-4">Our Journey</Badge>
                                                <h2 className="text-3xl font-bold text-gray-900">From Vision to Reality</h2>
                                            </div>
                                            <div className="space-y-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full" />
                                                    <div>
                                                        <h3 className="font-semibold text-lg mb-2">The Beginning</h3>
                                                        <p className="text-gray-700">
                                                            Founded by two passionate students, Ricardo and Ricardo, our
                                                            project was born out of a shared frustration with the
                                                            challenges of learning blockchain technology.
                                                        </p>
                                                    </div>
                                                </div>
                                                <Separator />
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                                                    <div>
                                                        <h3 className="font-semibold text-lg mb-2">The Breakthrough</h3>
                                                        <p className="text-gray-700">
                                                            Built during the Taipei Blockchain Week Hackathon, our platform
                                                            represents our commitment to making blockchain education
                                                            accessible to everyone.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </Container>
                </motion.section>

                {/* Call to Action */}
                <motion.section
                    className="py-16 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" 
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 2, 0],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/10 to-violet-500/20" />
                    <Container className="text-center relative">
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            whileInView={{ 
                                opacity: 1, 
                                y: 0,
                                scale: 1,
                                transition: {
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 10,
                                    duration: 0.5
                                }
                            }}
                            className="max-w-3xl mx-auto space-y-6"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.1,
                                    duration: 0.3,
                                    ease: "easeOut"
                                }}
                                className="relative inline-block"
                            >
                                <motion.div
                                    className="absolute -inset-1 bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 rounded-full blur opacity-30 group-hover:opacity-40 transition-all duration-300"
                                    animate={{
                                        scale: [1, 1.05, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                    }}
                                />
                                <Badge 
                                    variant="outline" 
                                    className="relative px-4 py-1.5 text-sm backdrop-blur-sm bg-white/10 hover:bg-white/20 border-white/40 hover:border-white/60 transition-all duration-300 shadow-lg shadow-violet-500/20 cursor-pointer group flex items-center gap-1.5 overflow-hidden"
                                >
                                    <Sparkles className="w-3.5 h-3.5 text-purple-200 group-hover:text-white transition-colors duration-300" />
                                    <span className="relative z-10 font-medium bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent group-hover:from-white group-hover:via-white group-hover:to-white transition-all duration-300">
                                        Join Community
                                    </span>
                                </Badge>
                            </motion.div>

                            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-white">
                                Shape the Future of Blockchain Education
                            </h2>
                            <p className="text-lg text-purple-100/90 leading-relaxed">
                                Whether you're a beginner or a blockchain pro, our platform is here to
                                empower your journey into Web3.
                            </p>

                            <motion.div 
                                className="flex justify-center gap-4 flex-wrap pt-2"
                                variants={staggerChildren}
                                initial="initial"
                                animate="animate"
                            >
                                <Button
                                    size="lg"
                                    className="bg-white/95 text-purple-900 hover:bg-white transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] px-6 py-2 font-medium rounded-xl hover:scale-105 transform"
                                >
                                    <motion.a
                                        href="/"
                                        className="flex items-center gap-2"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Globe className="w-4 h-4" />
                                        Explore Home
                                    </motion.a>
                                </Button>
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white transition-all duration-300 shadow-[0_0_15px_rgba(147,51,234,0.2)] hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] px-6 py-2 font-medium rounded-xl border border-white/20 hover:border-white/30 hover:scale-105 transform"
                                >
                                    <motion.a
                                        href="/courses"
                                        className="flex items-center gap-2"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Book className="w-4 h-4" />
                                        Browse Courses
                                    </motion.a>
                                </Button>
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] px-6 py-2 font-medium rounded-xl border border-white/20 hover:border-white/30 hover:scale-105 transform"
                                >
                                    <motion.a
                                        href="/content"
                                        className="flex items-center gap-2"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Users className="w-4 h-4" />
                                        View Content
                                    </motion.a>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </Container>
                </motion.section>
            </main>
            <Footer />
        </ScrollArea>
    );
}
