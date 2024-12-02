import { useParams, Navigate } from 'react-router-dom';
import { creators } from '@/data/creators';
import { Creator } from '@/types/creator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/Progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import {
  Twitter,
  Mail,
  Star,
  Users,
  BookOpen,
  ChevronRight,
  FileText,
  FileVideo,
  Book,
  Quote,
  Pencil,
  GraduationCap,
  ChevronLeft,
  Trophy,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';

// Define types for content items
interface BaseContentItem {
  title: string;
  description: string;
  image: string;
}

interface ArticleItem extends BaseContentItem {
  date: string;
  readTime: string;
}

interface EbookItem extends BaseContentItem {
  pages: number;
  price: string;
}

interface VideoItem extends BaseContentItem {
  duration: string;
  level: string;
}

interface FileItem extends BaseContentItem {
  format: string;
  size: string;
}

type ContentItem = ArticleItem | EbookItem | VideoItem | FileItem;

interface ContentType {
  type: 'articles' | 'ebooks' | 'videos' | 'files';
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; color?: string; className?: string }>;
  count: number;
  color: string;
  items: ContentItem[];
}

// Add this helper function at the top level
const getImageWithFallback = (path: string) => {
  try {
    // Try to import the image
    return path;
  } catch {
    // Return a placeholder if image doesn't exist
    return 'https://via.placeholder.com/400x300';
  }
};

export default function CreatorProfile() {
  const { slug } = useParams();
  const creator = creators.find((c: Creator) => c.slug === slug);
  const [selectedContentType, setSelectedContentType] = useState<ContentType['type'] | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 3;

  // Check if this is a reserved route
  const reservedRoutes = ['courses', 'content', 'creators', 'about', 'profile', 'create'];
  if (reservedRoutes.includes(slug || '')) {
    return <Navigate to="/" replace />;
  }

  const contentTypes: ContentType[] = [
    {
      type: 'articles',
      title: 'Articles', 
      description: 'In-depth technical articles and tutorials',
      icon: (props) => <Pencil {...props} />,
      count: 8,
      color: 'purple',
      items: [
        {
          title: 'Understanding Smart Contracts',
          description: 'A comprehensive guide to smart contract development',
          date: '2024-02-15',
          readTime: '15 min read',
          image: '/content/articles/smart-contracts.jpg'
        },
        {
          title: 'Web3 Security Best Practices',
          description: 'Essential security practices for blockchain development',
          date: '2024-02-10',
          readTime: '12 min read',
          image: '/content/articles/web3-security.jpg'
        },
        {
          title: 'DeFi Protocol Architecture',
          description: 'Deep dive into DeFi protocol design patterns',
          date: '2024-02-05',
          readTime: '20 min read',
          image: '/content/articles/defi-architecture.jpg'
        }
      ] as ArticleItem[]
    },
    {
      type: 'ebooks',
      title: 'eBooks', 
      description: 'Comprehensive digital books',
      icon: (props) => <Book {...props} />,
      count: 5,
      color: 'blue',
      items: [
        {
          title: 'Mastering Ethereum Development',
          description: 'Complete guide to building on Ethereum',
          pages: 250,
          price: '$29.99',
          image: '/content/ebooks/ethereum-dev.jpg'
        },
        {
          title: 'Smart Contract Security',
          description: 'Security patterns and best practices',
          pages: 180,
          price: '$24.99',
          image: '/content/ebooks/security.jpg'
        },
        {
          title: 'Web3 Architecture Patterns',
          description: 'Building scalable decentralized applications',
          pages: 200,
          price: '$27.99',
          image: '/content/ebooks/web3-patterns.jpg'
        }
      ] as EbookItem[]
    },
    {
      type: 'videos',
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      icon: (props) => <FileVideo {...props} />,
      count: 12,
      color: 'green',
      items: [
        {
          title: 'Smart Contract Development',
          description: 'Build your first smart contract',
          duration: '45 mins',
          level: 'Beginner',
          image: '/content/videos/smart-contract.jpg'
        },
        {
          title: 'DeFi Protocol Implementation',
          description: 'Create a decentralized exchange',
          duration: '60 mins',
          level: 'Advanced',
          image: '/content/videos/defi-protocol.jpg'
        },
        {
          title: 'Web3 Security Auditing',
          description: 'Learn security auditing techniques',
          duration: '50 mins',
          level: 'Intermediate',
          image: '/content/videos/security-audit.jpg'
        }
      ] as VideoItem[]
    },
    {
      type: 'files',
      title: 'Files',
      description: 'Templates and resources',
      icon: (props) => <FileText {...props} />,
      count: 15,
      color: 'orange',
      items: [
        {
          title: 'Smart Contract Template',
          description: 'Boilerplate for ERC20 tokens',
          format: 'Solidity',
          size: '156 KB',
          image: '/content/files/template.jpg'
        },
        {
          title: 'Security Checklist',
          description: 'Comprehensive security verification list',
          format: 'PDF',
          size: '2.3 MB',
          image: '/content/files/checklist.jpg'
        },
        {
          title: 'Architecture Diagram',
          description: 'DeFi protocol architecture template',
          format: 'Draw.io',
          size: '1.8 MB',
          image: '/content/files/diagram.jpg'
        }
      ] as FileItem[]
    }
  ];

  const renderPaginationDots = (totalItems: number) => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentPage === index 
                ? 'w-6 bg-purple-600' 
                : 'w-2 bg-purple-200 hover:bg-purple-300'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  const renderNavigationArrows = (totalItems: number) => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    if (totalPages <= 1) return null;

    return (
      <>
        <button
          onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-30 
            h-8 w-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center
            hover:bg-white transition-all duration-300 ${
              currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
            }`}
          disabled={currentPage === 0}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-30
            h-8 w-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center
            hover:bg-white transition-all duration-300 ${
              currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
            }`}
          disabled={currentPage === totalPages - 1}
          aria-label="Next page"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>
      </>
    );
  };

  const renderContentGrid = () => {
    if (!selectedContentType) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contentTypes.map((content, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => {
                setSelectedContentType(content.type);
                setCurrentPage(0); // Reset page when switching content type
              }}
            >
              <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-40">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-black/40 group-hover:from-gray-900/60 group-hover:to-black/30 transition-all duration-300 z-10" />
                  <div className="absolute inset-0 flex flex-col justify-between p-4 z-20">
                    <Badge 
                      variant="secondary" 
                      className={`w-fit bg-${content.color}-100 text-${content.color}-700 group-hover:bg-${content.color}-200 transition-colors`}
                    >
                      {content.count} items
                    </Badge>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-white/90 transition-colors">
                        {content.title}
                      </h3>
                      <p className="text-sm text-white/80 group-hover:text-white/70 transition-colors">
                        {content.description}
                      </p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <Button 
                    variant="ghost" 
                    className="w-full group/btn hover:bg-gray-100/50"
                  >
                    <span className="flex items-center justify-center">
                      Browse {content.title}
                      <ChevronRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      );
    }

    const selectedContent = contentTypes.find(c => c.type === selectedContentType);
    if (!selectedContent) return null;

    const startIndex = currentPage * ITEMS_PER_PAGE;
    const visibleItems = selectedContent.items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
      <>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{selectedContent.title}</h2>
            <p className="text-gray-500">{selectedContent.description}</p>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => {
              setSelectedContentType(null);
              setCurrentPage(0); // Reset page when going back
            }}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to All Content
          </Button>
        </div>

        <div className="relative">
          {renderNavigationArrows(selectedContent.items.length)}
          
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visibleItems.map((item, index) => (
              <motion.div
                key={startIndex + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-black/40 group-hover:from-gray-900/60 group-hover:to-black/30 transition-all duration-300 z-10" />
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                      style={{ 
                        backgroundImage: `url(${getImageWithFallback(item.image)})`,
                        backgroundColor: '#f3f4f6' // Fallback background color
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
                      <h3 className="text-lg font-semibold text-white group-hover:text-white/90 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/80 group-hover:text-white/70 transition-colors line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      {renderItemMetadata(item, selectedContent.type)}
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300 group">
                      <span className="flex items-center justify-center">
                        View {selectedContent.type === 'files' ? 'File' : selectedContent.type.slice(0, -1)}
                        <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {renderPaginationDots(selectedContent.items.length)}
        </div>
      </>
    );
  };

  // Update the item rendering to use proper type checking
  const renderItemMetadata = (item: ContentItem, type: ContentType['type']) => {
    switch (type) {
      case 'articles': {
        const articleItem = item as ArticleItem;
        return (
          <>
            <span>{articleItem.date}</span>
            <span>{articleItem.readTime}</span>
          </>
        );
      }
      case 'ebooks': {
        const ebookItem = item as EbookItem;
        return (
          <>
            <span>{ebookItem.pages} pages</span>
            <span>{ebookItem.price}</span>
          </>
        );
      }
      case 'videos': {
        const videoItem = item as VideoItem;
        return (
          <>
            <span>{videoItem.duration}</span>
            <span>{videoItem.level}</span>
          </>
        );
      }
      case 'files': {
        const fileItem = item as FileItem;
        return (
          <>
            <span>{fileItem.format}</span>
            <span>{fileItem.size}</span>
          </>
        );
      }
    }
  };

  // Add error boundary for the entire component
  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle>Creator Not Found</CardTitle>
            <CardDescription>
              The creator profile you're looking for doesn't exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => window.history.back()} variant="outline" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Avatar className="mx-auto w-32 h-32 border-4 border-white shadow-xl">
              <AvatarImage 
                src={getImageWithFallback(creator.image)} 
                alt={creator.name}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/128';
                }}
              />
              <AvatarFallback>{creator.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <h1 className="mt-6 text-4xl font-bold text-gray-900">{creator.name}</h1>
            <p className="mt-2 text-xl text-gray-600">{creator.bio}</p>
            <div className="mt-6 flex justify-center space-x-4">
              {creator.twitterHandle && (
                <Button variant="outline" className="gap-2">
                  <Twitter className="h-4 w-4" />
                  Follow
                </Button>
              )}
              <Button variant="outline" className="gap-2">
                <Mail className="h-4 w-4" />
                Contact
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="space-y-8">
            {/* Creator Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border border-purple-100">
                <CardHeader>
                  <CardTitle>Creator Stats</CardTitle>
                  <CardDescription>Performance and impact metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <BookOpen className="h-5 w-5 text-purple-500 mx-auto mb-2" />
                      <div className="font-bold text-2xl text-purple-700">{creator.courses}</div>
                      <div className="text-sm text-purple-600">Courses</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Users className="h-5 w-5 text-blue-500 mx-auto mb-2" />
                      <div className="font-bold text-2xl text-blue-700">{creator.students}</div>
                      <div className="text-sm text-blue-600">Students</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Rating</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-bold">{creator.rating}</span>
                      </div>
                    </div>
                    <Progress value={creator.rating * 20} className="bg-yellow-100" />
                  </div>
                  <div>
                    <span className="text-sm font-medium">Category</span>
                    <div className="mt-2">
                      <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700">
                        {creator.category}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Expertise Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border border-purple-100">
                <CardHeader>
                  <CardTitle>Expertise</CardTitle>
                  <CardDescription>Areas of specialization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {creator.expertise.map((skill: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border border-purple-100">
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Milestones and recognition</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Top Creator Status</span>
                      <Trophy className="h-4 w-4 text-yellow-400" />
                    </div>
                    <Progress value={100} className="bg-yellow-100" />
                    <p className="mt-2 text-sm text-gray-600">
                      Recognized as one of our top performing creators
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Student Impact</span>
                      <Users className="h-4 w-4 text-blue-400" />
                    </div>
                    <Progress value={90} className="bg-blue-100" />
                    <p className="mt-2 text-sm text-gray-600">
                      Helped {creator.students} students master blockchain
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Course Portfolio</span>
                      <BookOpen className="h-4 w-4 text-purple-400" />
                    </div>
                    <Progress value={85} className="bg-purple-100" />
                    <p className="mt-2 text-sm text-gray-600">
                      Created {creator.courses} high-quality courses in blockchain
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Tabs defaultValue="courses" className="w-full">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Educational Content</h2>
                    <p className="text-gray-500">Browse all educational materials</p>
                  </div>
                  <TabsList className="bg-white/50 backdrop-blur-sm border border-purple-100">
                    <TabsTrigger value="courses" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
                      Courses
                    </TabsTrigger>
                    <TabsTrigger value="content" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
                      Content
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="courses" className="mt-0">
                  <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border border-purple-100">
                    <CardContent className="p-6">
                      <ScrollArea className="h-[600px] pr-4">
                        <div className="space-y-6">
                          {Array.from({ length: 3 }).map((_, index) => (
                            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-purple-100">
                              <div className="relative h-48">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:scale-105 transition-transform duration-300" />
                                <div className="absolute inset-0 flex items-center justify-center text-white">
                                  <GraduationCap className="h-12 w-12 group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                                  <Badge variant="secondary" className="bg-white/90 text-purple-700">
                                    Featured
                                  </Badge>
                                </div>
                              </div>
                              <CardHeader>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <CardTitle className="group-hover:text-purple-600 transition-colors">
                                      Advanced Blockchain Development
                                    </CardTitle>
                                    <CardDescription className="mt-2 line-clamp-2">
                                      Master blockchain development with practical projects and real-world examples.
                                    </CardDescription>
                                  </div>
                                  <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700">
                                    $99
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                    4.9
                                  </div>
                                  <div className="flex items-center">
                                    <Users className="h-4 w-4 text-blue-400 mr-1" />
                                    1.2k students
                                  </div>
                                  <div className="flex items-center">
                                    <BookOpen className="h-4 w-4 text-green-400 mr-1" />
                                    12 lessons
                                  </div>
                                </div>
                                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300 group">
                                  <span className="flex items-center">
                                    View Course
                                    <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                  </span>
                                </Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="content" className="mt-0">
                  <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border border-purple-100">
                    <CardContent className="p-6">
                      {renderContentGrid()}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Testimonials Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border border-purple-100">
                <CardHeader>
                  <CardTitle>Student Testimonials</CardTitle>
                  <CardDescription>What our students say</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-6">
                      {[
                        {
                          text: "An exceptional instructor who makes complex blockchain concepts easy to understand. The practical examples and hands-on projects were invaluable.",
                          author: "Sarah Johnson",
                          role: "Blockchain Developer",
                          company: "TechCorp",
                          rating: 5,
                          avatar: "/testimonials/sarah.jpg"
                        },
                        {
                          text: "The course content is cutting-edge and extremely relevant to today's Web3 landscape. I've already started applying what I learned in my projects.",
                          author: "Michael Chen",
                          role: "Smart Contract Engineer",
                          company: "DeFi Protocol",
                          rating: 5,
                          avatar: "/testimonials/michael.jpg"
                        },
                        {
                          text: "Best investment in my blockchain journey. The instructor's expertise and teaching style made complex topics accessible and engaging.",
                          author: "Emma Williams",
                          role: "Software Engineer",
                          company: "Crypto Startup",
                          rating: 5,
                          avatar: "/testimonials/emma.jpg"
                        }
                      ].map((testimonial, index) => (
                        <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-6">
                            <Quote className="h-8 w-8 text-purple-200 absolute top-4 right-4 group-hover:text-purple-300 transition-colors" />
                            <div className="flex items-start gap-4">
                              <Avatar className="h-12 w-12 border-2 border-purple-100">
                                <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                                <AvatarFallback>{testimonial.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                                <div>
                                  <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                                  <p className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</p>
                                  <div className="flex items-center mt-2">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
