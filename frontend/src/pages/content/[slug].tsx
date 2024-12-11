import { useParams, Navigate } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  BookOpen,
  Video,
  FileText,
  Clock,
  CheckCircle2,
  Users,
  Globe,
  Award,
  Shield,
  ArrowRight,
  PlayCircle,
  Heart,
  Users2
} from "lucide-react";
import { CreatorCard } from "@/components/creator/CreatorCard";
import { motion } from "framer-motion";
import Footer from "@/components/layout/Footer";
import { ContentCard } from "@/components/content/ContentCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CONTENT } from "@/data/content-details";
import { creators } from "@/data/creators";
import { ContentType } from '@/types/content';
import { Creator } from '@/types/creator';

// Types for our content
type Author = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  totalViews: number;
  expertise: string;
  rating: string;
  courses: number;
  students: number;
  isTopCreator: boolean;
  twitterHandle?: string;
  tags: string[];
  slug: string;
  type: ContentType;
  content: string;
};

interface ContentMetrics {
  views: number;
  likes: number;
  rating: number;
  completions: number;
  totalDuration: string;
  lastUpdated: string;
  language: string;
  subtitles: string[];
}

interface LearningObjective {
  id: string;
  title: string;
  description: string;
}

interface Content {
  id: string;
  slug: string;
  title: string;
  type: ContentType;
  description: string;
  detailedDescription: string;
  author: Author;
  metrics: ContentMetrics;
  thumbnail: string;
  createdAt: string;
  details: {
    [key: string]: string | number;
  };
  learningObjectives: LearningObjective[];
  prerequisites: string[];
  targetAudience: string[];
  certification: boolean;
  price: number;
  originalPrice?: number;
}

export const ContentPage = () => {
  const { creatorSlug, contentType, contentSlug } = useParams();
  
  console.log("Route params:", { creatorSlug, contentType, contentSlug });

  if (!creatorSlug || !contentType || !contentSlug) {
    return <Navigate to="/404" replace />;
  }

  // Find the content based on the slug from CONTENT
  const content = CONTENT.find(item => 
    item.type === contentType && 
    item.author.slug === creatorSlug
  );

  // Find the creator data from CREATORS
  const creator = creators.find((c: Creator) => c.slug === creatorSlug);

  if (!content || !creator) {
    return <Navigate to="/404" replace />;
  }

  // Now we know contentType is defined, we can safely use it
  const normalizedType = contentType.replace(/s$/, '');
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "ebook":
        return <BookOpen className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "article":
        return <FileText className="h-4 w-4" />;
      case "file":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getActionButton = (type: ContentType, price: number) => {
    if (price === 0) {
      return "Access Now";
    }
    return "Buy Now";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const recommendedContent = [
    {
      id: "2",
      title: "Advanced DeFi Strategies",
      creator: content.author.name,
      price: 39.99,
      type: "ebook",
      thumbnail: "/images/defi-advanced.jpg",
      downloads: 1200,
      rating: 4.7
    },
    {
      id: "3",
      title: "Yield Farming Masterclass",
      creator: content.author.name,
      price: 44.99,
      type: "video",
      thumbnail: "/images/yield-farming.jpg",
      downloads: 850,
      rating: 4.9
    },
    {
      id: "4",
      title: "Smart Contract Security",
      creator: content.author.name,
      price: 34.99,
      type: "ebook",
      thumbnail: "/images/smart-contract.jpg",
      downloads: 2000,
      rating: 4.8
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Enhanced Hero Section */}
      <motion.section 
        className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white pt-28 pb-32"
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 backdrop-blur-sm" />
        <motion.div 
          className="container mx-auto px-4 relative z-10"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Enhanced Content Info */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm" variant="outline">
                    <span className="flex items-center gap-1.5">
                      {getContentTypeIcon(content.type)}
                      {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                    </span>
                  </Badge>
                  {content.certification && (
                    <Badge className="bg-gradient-to-r from-yellow-400/90 to-yellow-500/90 text-black border-none backdrop-blur-sm">
                      <Award className="w-3.5 h-3.5 mr-1.5" />
                      Certification Included
                    </Badge>
                  )}
                  <Badge className="bg-green-500/90 text-white border-none backdrop-blur-sm">
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                    {content.metrics.totalDuration}
                  </Badge>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100">
                  {content.title}
                </h1>
                
                <p className="text-lg text-purple-100 leading-relaxed">
                  {content.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{content.metrics.rating}</span>
                    <Separator orientation="vertical" className="h-4 mx-2 bg-white/20" />
                    <span>{content.metrics.completions} reviews</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                    <Users className="w-4 h-4" />
                    <span>{content.metrics.views.toLocaleString()} enrolled</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                    <Globe className="w-4 h-4" />
                    <span>{content.metrics.language}</span>
                  </div>
                </div>

                {/* Enhanced Price Display */}
                <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-white/10">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-white">{content.price} SOL</span>
                    {content.originalPrice && (
                      <span className="text-purple-200 line-through">{content.originalPrice} SOL</span>
                    )}
                  </div>
                  <p className="text-purple-200 text-sm mb-6">
                    One-time payment • Lifetime access
                  </p>
                  {/* Enhanced Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      size="lg" 
                      className="group bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-lg px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <span>{getActionButton(content.type, content.price)}</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    {content?.type === 'video' && (
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="group bg-white/10 hover:bg-white/20 border-white/30 backdrop-blur-sm"
                      >
                        <PlayCircle className="w-5 h-5 mr-2" />
                        Preview
                      </Button>
                    )}
                    <Button
                      size="lg"
                      variant="outline"
                      className="group bg-white/10 hover:bg-white/20 border-white/30 backdrop-blur-sm"
                    >
                      <Heart className="w-5 h-5 mr-2 group-hover:text-red-400 transition-colors" />
                      Wishlist
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Enhanced Hero Image/Video */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 group">
              {content.type === 'video' ? (
                <div className="w-full h-full">
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    poster={content.thumbnail}
                    controls={false}
                  >
                    <source src="/videos/preview.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <Button
                    size="lg"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md"
                  >
                    <PlayCircle className="w-8 h-8 mr-2" />
                    Watch Preview
                  </Button>
                </div>
              ) : (
                <>
                  <img
                    src={content.thumbnail}
                    alt={content.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
      </motion.section>

      {/* Main Content with Enhanced Layout */}
      <motion.main 
        className="container mx-auto px-4 -mt-16 relative z-20"
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Enhanced Main Content */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            variants={containerVariants}
          >
            {/* About This Course */}
            <Card className="bg-white/50 backdrop-blur-sm border-purple-100/50 overflow-hidden">
              <div className="border-l-4 border-purple-500 px-6 py-4 bg-purple-50/50">
                <h2 className="text-2xl font-bold text-purple-900">About This {normalizedType}</h2>
              </div>
              <CardContent className="p-6 space-y-4 text-gray-700 leading-relaxed">
                <p>{content.description}</p>
                {content.detailedDescription && (
                  <p>{content.detailedDescription}</p>
                )}
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card className="bg-white/50 backdrop-blur-sm border-purple-100/50 overflow-hidden">
              <div className="border-l-4 border-indigo-500 px-6 py-4 bg-indigo-50/50">
                <h2 className="text-2xl font-bold text-indigo-900">What You'll Learn</h2>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content.learningObjectives.map((objective: LearningObjective) => (
                    <motion.div 
                      key={objective.id}
                      className="flex gap-4 p-4 rounded-lg bg-white/70 border border-indigo-100/50 hover:shadow-md transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-indigo-900 mb-1">{objective.title}</h3>
                        <p className="text-sm text-gray-600">{objective.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prerequisites & Target Audience */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Prerequisites */}
              <Card className="bg-white/50 backdrop-blur-sm border-purple-100/50 overflow-hidden">
                <div className="border-l-4 border-blue-500 px-6 py-4 bg-blue-50/50">
                  <h2 className="text-2xl font-bold text-blue-900">Prerequisites</h2>
                </div>
                <CardContent className="p-6">
                  <ScrollArea className="h-[200px] pr-4">
                    <ul className="space-y-4">
                      {content.prerequisites.map((prerequisite: string, index: number) => (
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
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Target Audience */}
              <Card className="bg-white/50 backdrop-blur-sm border-purple-100/50 overflow-hidden">
                <div className="border-l-4 border-green-500 px-6 py-4 bg-green-50/50">
                  <h2 className="text-2xl font-bold text-green-900">Target Audience</h2>
                </div>
                <CardContent className="p-6">
                  <ScrollArea className="h-[200px] pr-4">
                    <ul className="space-y-4">
                      {content.targetAudience.map((audience: string, index: number) => (
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
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Buy Now Section with Price Logic */}
            <motion.div variants={itemVariants} className="mt-8">
              <Card className="relative overflow-hidden">
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
                        {content.price === 0 ? 'Add to Your Profile' : 'Start Your Learning Journey Today'}
                      </h2>
                      <p className="text-purple-100 text-lg max-w-2xl mx-auto leading-relaxed">
                        {content.price === 0 
                          ? 'Add this content to your profile and start learning immediately.'
                          : `Join thousands of students already mastering ${content.title}. Get lifetime access to all course materials and future updates.`
                        }
                      </p>
                    </motion.div>

                    {content.price > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center gap-6"
                      >
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                          <div className="flex items-baseline justify-center gap-3 mb-2">
                            <span className="text-5xl font-bold text-white">${content.price}</span>
                            {content.originalPrice && (
                              <span className="text-xl text-purple-200 line-through">${content.originalPrice}</span>
                            )}
                          </div>
                          <p className="text-purple-200 text-sm">
                            One-time payment • Lifetime access • Free updates
                          </p>
                        </div>
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-6"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <Button 
                          size="lg"
                          onClick={() => {
                            if (content.price > 0) {
                              // TODO: Implement purchase popup
                              console.log('Show purchase popup');
                            } else {
                              // TODO: Implement add to profile
                              console.log('Add to profile');
                            }
                          }}
                          className={`group font-semibold text-lg px-12 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                            content.price === 0 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                              : 'bg-gradient-to-r from-white to-purple-50 hover:from-purple-50 hover:to-white text-purple-700 hover:text-purple-800'
                          }`}
                        >
                          <span>{content.price === 0 ? 'Access Now' : 'Buy Now'}</span>
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
          >
            {/* Creator Card */}
            <motion.div variants={itemVariants} aria-label="Creator Information">
              <CreatorCard
                name={creator.name}
                avatar={creator.avatar}
                role={creator.role}
                rating={creator.rating}
                bio={creator.bio}
                courses={creator.courses}
                students={creator.students}
                slug={creator.slug}
                isTopCreator={creator.isTopCreator}
                socialLinks={creator.socialLinks}
                expertise={creator.expertise}
              />
            </motion.div>

            {/* Recommended Content */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/50 backdrop-blur-sm border-purple-100/50 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Recommended Content for You
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {CONTENT.filter(item => item.thumbnail).map((item) => (
                      <motion.div 
                        key={item.id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <ContentCard
                          id={item.id}
                          title={item.title}
                          creator={item.creator}
                          price={item.price}
                          type={item.type}
                          thumbnail={item.thumbnail}
                          downloads={item.downloads}
                          rating={item.rating}
                          onBuyClick={() => {}}
                        />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>

      {/* Enhanced Footer */}
      <motion.footer
        variants={itemVariants}
        className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white mt-20"
      >
        <Footer />
      </motion.footer>
    </motion.div>
  );
};

export default ContentPage;
