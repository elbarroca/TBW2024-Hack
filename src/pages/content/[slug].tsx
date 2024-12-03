import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { CreatorCard } from "@/components/creator/CreatorCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import {
  Star,
  BookOpen,
  ChevronRight,
  Clock,
  Users,
  BarChart2,
  Shield,
  Loader2,
  FileX,
  Download,
  Brain,
  Target,
  Play,
  FileText,
  Book,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import { useQuery } from "@tanstack/react-query";

const SUPPORTED_CURRENCIES = [
  { id: "sol", name: "SOL", icon: "₳" },
  { id: "usdc", name: "USDC", icon: "$" },
  { id: "usdt", name: "USDT", icon: "$" },
];

// Mock data for development
const MOCK_CONTENT = {
  title: "The Complete Guide to DeFi Trading",
  type: "ebook",
  description: "Master DeFi trading with comprehensive strategies and real-world examples. Learn advanced concepts like yield farming, liquidity provision, and arbitrage strategies.",
  price: "99",
  isFree: false,
  coverImage: "/images/defi-trading-guide.png",
  creatorSlug: "alex-thompson",
  metrics: {
    rating: 4.8,
    views: 1200,
    timeToComplete: "2-3 hours",
    chapters: 12,
    students: 1200
  },
  author: {
    id: "1",
    name: "Alex Thompson",
    avatar: "/images/alex-thompson.png",
    bio: "DeFi Expert & Trading Strategist with over 5 years of experience in cryptocurrency markets",
    followers: 1500,
    expertise: "Smart Contract Security Expert"
  }
};

// Fetch content data - using mock data for now
const fetchContent = async (creatorSlug: string, contentSlug: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data with the slugs
  return {
    ...MOCK_CONTENT,
    creatorSlug,
    contentSlug
  };
};

// Add type definitions at the top of the file
interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  expertise: string;
}

interface Metrics {
  rating: number;
  views: number;
  timeToComplete: string;
  chapters: number;
  students: number;
}

interface Content {
  title: string;
  type: string;
  description: string;
  price: string;
  isFree: boolean;
  coverImage: string;
  creatorSlug: string;
  metrics: Metrics;
  author: Author;
}

const ContentPage = () => {
  // Get the full URL path
  const { pathname } = window.location;
  
  // Extract slugs from URL path
  // Expected format: /:creatorSlug/ebooks/:contentSlug
  const pathParts = pathname.split('/').filter(Boolean);
  const creatorSlug = pathParts[0] || "";
  const contentType = pathParts[1] || ""; // This will be "ebooks"
  const contentSlug = pathParts[2] || "";

  // Validate URL format
  const isValidUrl = creatorSlug && contentType === "ebooks" && contentSlug;

  const navigate = useNavigate();
  const [isWalletConnected, setIsWalletConnected] = React.useState(false);
  const [selectedCurrency, setSelectedCurrency] = React.useState<string | null>(null);
  const [showCurrencySelector, setShowCurrencySelector] = React.useState(false);

  // Fetch content data with proper error handling
  const { data: content, isLoading, error } = useQuery<Content>({
    queryKey: ['content', creatorSlug, contentSlug],
    queryFn: () => fetchContent(creatorSlug, contentSlug),
    enabled: Boolean(isValidUrl),
    retry: 1,
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false,
  });

  // Handle navigation back
  const handleGoBack = () => {
    navigate('/');
  };

  // If URL is invalid, show error state
  if (!isValidUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center space-y-6 p-8">
          <div className="w-24 h-24 mx-auto mb-8">
            <FileX className="w-full h-full text-purple-600 opacity-50" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Invalid URL</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            The URL format should be /:creatorSlug/ebooks/:contentSlug
          </p>
          <Button 
            onClick={handleGoBack}
            className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            size="lg"
          >
            Go Back Home
          </Button>
        </div>
      </div>
    );
  }

  // Early return for loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center space-y-6 p-8">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto" />
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  // Early return for error state
  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center space-y-6 p-8">
          <div className="w-24 h-24 mx-auto mb-8">
            <FileX className="w-full h-full text-purple-600 opacity-50" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Content Not Found</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            The content you're looking for doesn't exist or has been removed.
            Please check the URL or try again later.
          </p>
          <Button 
            onClick={handleGoBack}
            className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            size="lg"
          >
            Go Back Home
          </Button>
        </div>
      </div>
    );
  }

  const handleConnectWallet = async () => {
    try {
      // TODO: Implement actual wallet connection
      setIsWalletConnected(true);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleCurrencySelect = (currencyId: string) => {
    setSelectedCurrency(currencyId);
    setShowCurrencySelector(false);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-white"
      >
        {/* Hero Section */}
        <motion.div 
          className="relative w-full bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 pt-32 pb-64 overflow-hidden"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Enhanced Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#6b46c1_25%,transparent_25%,transparent_75%,#6b46c1_75%,#6b46c1),linear-gradient(45deg,#6b46c1_25%,transparent_25%,transparent_75%,#6b46c1_75%,#6b46c1)] bg-[length:60px_60px] opacity-5 animate-[gradient_3s_linear_infinite]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent,rgba(76,29,149,0.4))]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/20 to-purple-900/90" />
          </div>

          {/* Content Container */}
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Column - Content */}
              <div className="space-y-12">
                {/* Title and Description */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-8"
                >
                  <Badge 
                    variant="secondary" 
                    className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm px-6 py-2.5 text-base font-medium"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    {isLoading ? <Skeleton className="h-4 w-20" /> : content?.type}
                  </Badge>

                  <div className="space-y-6">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/90 leading-[1.1] tracking-tight">
                      {isLoading ? (
                        <Skeleton className="h-20 w-3/4" />
                      ) : (
                        <motion.span
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          {content?.title}
                        </motion.span>
                      )}
                    </h1>

                    <p className="text-xl text-white/90 leading-relaxed max-w-2xl font-medium">
                      {isLoading ? <Skeleton className="h-24 w-full" /> : content?.description}
                    </p>
                  </div>
                </motion.div>

                {/* Stats Row */}
                <motion.div 
                  className="grid grid-cols-3 gap-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Star className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{content?.metrics.rating}</div>
                    <div className="text-sm text-white/80">Rating</div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="h-6 w-6 text-white/90" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {content?.metrics.students.toLocaleString()}
                    </div>
                    <div className="text-sm text-white/80">Students</div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="h-6 w-6 text-white/90" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {content?.metrics.timeToComplete}
                    </div>
                    <div className="text-sm text-white/80">Duration</div>
                  </div>
                </motion.div>
                {/* Price and CTA */}
                <motion.div 
                  className="space-y-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="space-y-4">
                    <div className="text-4xl font-bold text-white">
                      {content?.price} USDC
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-white hover:bg-white/90 text-purple-600 font-semibold px-8 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                          <>
                            Get Started Now
                            <ChevronRight className="ml-2 h-6 w-6" />
                          </>
                        )}
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto bg-white/5 hover:bg-purple-600 hover:text-white text-white border-2 border-white/30 hover:border-white/50 px-8 py-6 text-lg font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300 ease-in-out flex items-center justify-center gap-3 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20"
                        disabled={isLoading}
                        onClick={() => navigate(`${content?.creatorSlug}`)}
                      >
                        <Star className="h-5 w-5 text-yellow-400" />
                        View Creator Profile
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Preview */}
              <motion.div 
                className="relative hidden lg:block w-full max-w-4xl mx-auto translate-y-12"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20 transform hover:scale-105 transition-transform duration-300">
                  {isLoading ? (
                    <Skeleton className="w-full h-full" />
                  ) : (
                    <>
                      <img
                        src={content?.coverImage}
                        alt={content?.title}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                        style={{ objectPosition: 'center 40%' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </>
                  )}
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-8 -right-8 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Section with Enhanced Design */}
        <div className="relative -mt-32 pb-16">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-12">
                {/* Left Column - About & Reviews */}
                <div className="lg:col-span-2 space-y-8">
                  {/* About Section */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-8 border border-purple-100">
                    <div className="space-y-6">
                      <h2 className="text-3xl font-bold text-gray-900">
                        About this {content?.type.toLowerCase()}
                      </h2>
                      <p className="text-gray-600 text-lg">
                        Master the fundamentals and advanced concepts
                      </p>

                      {/* Enhanced Stats Grid */}
                      <div className="grid grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6">
                          <div className="flex items-center justify-center mb-2">
                            <Clock className="w-6 h-6 text-purple-600" />
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 mb-1">
                              {content?.metrics.timeToComplete}
                            </div>
                            <div className="text-sm text-gray-600">Duration</div>
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6">
                          <div className="flex items-center justify-center mb-2">
                            <BookOpen className="w-6 h-6 text-indigo-600" />
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 mb-1">
                              {content?.metrics.chapters}
                            </div>
                            <div className="text-sm text-gray-600">Chapters</div>
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6">
                          <div className="flex items-center justify-center mb-2">
                            <Users className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 mb-1">
                              {content?.metrics.students.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">Students</div>
                          </div>
                        </div>
                      </div>

                      {/* Content Description */}
                      <div className="prose prose-lg max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          {content?.description}
                        </p>
                      </div>

                      {/* What You'll Learn Section */}
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-gray-900">
                          What You'll Learn
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          {[
                            { icon: Brain, text: "Understand Meme Coin Analysis Frameworks", color: "text-purple-600" },
                            { icon: Target, text: "Assess Risks and Potential of Meme Coins", color: "text-indigo-600" },
                            { icon: BarChart2, text: "Perform Technical and Market Analysis", color: "text-blue-600" },
                            { icon: Shield, text: "Identify Red Flags and Warning Signs", color: "text-red-600" },
                            { icon: BookOpen, text: "Make Data-Driven Investment Decisions", color: "text-green-600" },
                          ].map((item, index) => (
                            <div 
                              key={index}
                              className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl flex items-start space-x-4 hover:shadow-md transition-all"
                            >
                              <div className="flex-shrink-0">
                                <div className={`p-2 bg-white rounded-lg ${item.color}`}>
                                  <item.icon className="w-6 h-6" />
                                </div>
                              </div>
                              <span className="text-gray-700 font-medium">{item.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Student Reviews Section */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6 border border-purple-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-gray-900">Student Reviews</h3>
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-lg font-bold text-gray-900">{content?.metrics.rating}</span>
                        <span className="text-gray-500">({content?.metrics.students.toLocaleString()} reviews)</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        {
                          name: "Sarah Chen",
                          role: "DeFi Trader",
                          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
                          comment: "This course completely transformed my understanding of meme coins. The technical analysis section was particularly enlightening.",
                          rating: 5
                        },
                        {
                          name: "Michael Rodriguez",
                          role: "Crypto Analyst",
                          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
                          comment: "Comprehensive and practical. The risk assessment framework has already helped me avoid several questionable investments.",
                          rating: 5
                        }
                      ].map((review, index) => (
                        <div key={index} className="bg-gradient-to-br from-purple-50/50 to-indigo-50/50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-purple-100/50">
                          <div className="flex items-start space-x-4">
                            <img 
                              src={review.avatar} 
                              alt={review.name}
                              className="w-12 h-12 rounded-full ring-2 ring-purple-100"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                                  <p className="text-sm text-gray-500">{review.role}</p>
                                </div>
                                <div className="flex items-center space-x-1">
                                  {Array.from({ length: review.rating }).map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                  ))}
                                </div>
                              </div>
                              <p className="mt-3 text-gray-600">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Buy Section Card */}
                  <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="flex flex-wrap items-center gap-3">
                          {content?.isFree ? (
                            <div className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium">
                              Free Content
                            </div>
                          ) : (
                            <>
                              <div className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium">
                                Limited Time
                              </div>
                              <div className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium">
                                Lifetime Access
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center text-white/90">
                            <Clock className="w-5 h-5 mr-2" />
                            <span>{content?.metrics.timeToComplete}</span>
                          </div>
                          <div className="flex items-center text-white/90">
                            <Users className="w-5 h-5 mr-2" />
                            <span>{content?.metrics.students.toLocaleString()} enrolled</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-8">
                        <div className="flex items-baseline gap-2 mb-2">
                          <h3 className="text-4xl font-bold text-white">{content?.price}</h3>
                          <span className="text-xl text-white/90">USDC</span>
                        </div>
                        <p className="text-white/90">One-time payment for lifetime access</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-8">
                        <div className="flex items-center space-x-3 text-white bg-white/10 rounded-xl p-4">
                          <div className="p-2 bg-white/20 rounded-lg">
                            <Shield className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">Money-Back Guarantee</h4>
                            <p className="text-sm text-white/80">30-day full refund</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 text-white bg-white/10 rounded-xl p-4">
                          <div className="p-2 bg-white/20 rounded-lg">
                            <Download className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">Lifetime Access</h4>
                            <p className="text-sm text-white/80">Including updates</p>
                          </div>
                        </div>
                      </div>

                      <Button 
                        size="lg"
                        className="w-full bg-white hover:bg-white/90 text-purple-600 font-bold py-6 text-lg shadow-xl hover:shadow-2xl transition-all"
                        onClick={() => {
                          if (!isWalletConnected) {
                            handleConnectWallet();
                          } else if (!selectedCurrency) {
                            setShowCurrencySelector(true);
                          } else {
                            console.log('Purchase with', selectedCurrency);
                          }
                        }}
                      >
                        {content?.isFree ? (
                          <>
                            Download Now
                            <Download className="ml-2 h-6 w-6" />
                          </>
                        ) : (
                          <>
                            Buy Now
                            <ChevronRight className="ml-2 h-6 w-6" />
                          </>
                        )}
                      </Button>
                      <p className="text-center text-white/80 text-sm mt-4">
                        30-day money-back guarantee • Instant access
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Creator Card & Recommendations */}
                <div className="space-y-8">
                  <div className="lg:sticky lg:top-8 space-y-8">
                    {/* Creator Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100">
                      {isLoading ? (
                        <Skeleton className="h-[400px] w-full rounded-xl" />
                      ) : content && content.author ? (
                        <CreatorCard
                          id={content.author.id || ''}
                          name={content.author.name || ''}
                          image={content.author.avatar || ''}
                          expertise={content.author.expertise || ''}
                          rating={(content.metrics.rating || 0).toString()}
                          bio={content.author.bio || ''}
                          courses={5}
                          students={content.author.followers || 0}
                          slug={content.creatorSlug || ''}
                          isTopCreator={true}
                          tags={["Security", "Smart Contracts", "DeFi"]}
                        />
                      ) : null}
                    </div>

                    {/* Recommended Content */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6 border border-purple-100">
                      <h3 className="text-xl font-semibold text-gray-900">Recommended Content</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          {
                            type: "Article",
                            title: "DeFi Trading Fundamentals",
                            icon: BookOpen,
                            color: "text-purple-600"
                          },
                          {
                            type: "File",
                            title: "Trading Strategy Template",
                            icon: FileText,
                            color: "text-indigo-600"
                          },
                          {
                            type: "Video",
                            title: "Introduction to DeFi Trading",
                            icon: Play,
                            color: "text-blue-600"
                          },
                          {
                            type: "Ebook",
                            title: "Complete DeFi Trading Guide",
                            icon: Book,
                            color: "text-green-600"
                          }
                        ].map((item, index) => (
                          <div 
                            key={index} 
                            className="group bg-gradient-to-br from-purple-50/50 to-indigo-50/50 rounded-xl p-4 hover:shadow-md transition-all border border-purple-100/50 flex flex-col"
                          >
                            <div className="aspect-video bg-white rounded-lg mb-3 flex items-center justify-center group-hover:bg-purple-50/50 transition-colors">
                              <item.icon className={`w-8 h-8 ${item.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                            </div>
                            <div className="flex-1 flex flex-col">
                              <span className="text-sm font-medium text-purple-600 mb-1">{item.type}</span>
                              <h4 className="font-semibold text-gray-900 line-clamp-2 flex-1">
                                {item.title}
                              </h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Sticky Buy Button for Mobile */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg lg:hidden">
          <Button 
            size="lg"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold"
            onClick={() => {
              if (!isWalletConnected) {
                handleConnectWallet();
              } else if (!selectedCurrency) {
                setShowCurrencySelector(true);
              } else {
                console.log('Purchase with', selectedCurrency);
              }
            }}
          >
            {content?.isFree ? (
              <>
                Download Now
                <Download className="ml-2 h-5 w-5" />
              </>
            ) : (
              <>
                Buy Now - {content?.price} USDC
                <ChevronRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>

        {/* Currency Selector Dialog */}
        <Dialog open={showCurrencySelector} onOpenChange={setShowCurrencySelector}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Select Payment Currency</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              {SUPPORTED_CURRENCIES.map((currency) => (
                <Button
                  key={currency.id}
                  variant={selectedCurrency === currency.id ? "default" : "outline"}
                  className="w-full justify-start space-x-2"
                  onClick={() => handleCurrencySelect(currency.id)}
                >
                  <span className="text-lg">{currency.icon}</span>
                  <span>{currency.name}</span>
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

export default ContentPage;

