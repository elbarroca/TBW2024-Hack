import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/Progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star, Share2, BookOpen, Video, FileText, Heart } from "lucide-react";

// Types for our content
type ContentType = "ebook" | "video" | "article";

interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  totalViews: number;
}

interface ContentMetrics {
  views: number;
  likes: number;
  rating: number;
  completions: number;
}

interface Content {
  id: string;
  slug: string;
  title: string;
  type: ContentType;
  description: string;
  author: Author;
  metrics: ContentMetrics;
  coverImage: string;
  createdAt: string;
  details: {
    [key: string]: string | number;
  };
}

// Mock data - Replace with actual data fetching
const mockContent: Content = {
  id: "1",
  slug: "example-content",
  title: "Understanding Web3 Development",
  type: "ebook",
  description: "A comprehensive guide to building decentralized applications...",
  author: {
    id: "author1",
    name: "John Doe",
    avatar: "/avatars/john-doe.jpg",
    bio: "Web3 Developer and Educator",
    followers: 1500,
    totalViews: 50000,
  },
  metrics: {
    views: 1200,
    likes: 350,
    rating: 4.8,
    completions: 280,
  },
  coverImage: "/covers/web3-guide.jpg",
  createdAt: "2024-01-20",
  details: {
    pages: 250,
    format: "PDF/ePub",
    size: "15MB",
  },
};

const ContentPage = () => {
  const { slug } = useParams();

  // In a real app, fetch content based on slug
  const content = mockContent;

  const getContentTypeIcon = (type: ContentType) => {
    switch (type) {
      case "ebook":
        return <BookOpen className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "article":
        return <FileText className="h-4 w-4" />;
    }
  };

  const getActionButton = (type: ContentType) => {
    switch (type) {
      case "ebook":
        return "Read Now";
      case "video":
        return "Watch Now";
      case "article":
        return "Read Article";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 py-8 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <Badge className="mb-4" variant="outline">
              <span className="flex items-center gap-1">
                {getContentTypeIcon(content.type)}
                {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
              </span>
            </Badge>
            
            <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <Avatar>
                <AvatarImage src={content.author.avatar} alt={content.author.name} />
                <AvatarFallback>{content.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{content.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {content.metrics.views.toLocaleString()} views
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button size="lg">
                {getActionButton(content.type)}
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content Preview and Description */}
          <div className="lg:col-span-2">
            <Card className="p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">About this {content.type}</h2>
              <p className="text-muted-foreground mb-6">{content.description}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 font-medium">{content.metrics.rating}</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="ml-1">{content.metrics.likes}</span>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Detail</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(content.details).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell className="font-medium">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>

          {/* Author Profile and Progress */}
          <div>
            <Card className="p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">About the Author</h3>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={content.author.avatar} alt={content.author.name} />
                  <AvatarFallback>{content.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{content.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {content.author.followers.toLocaleString()} followers
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{content.author.bio}</p>
              <Button className="w-full" variant="outline">
                Follow Author
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Your Progress</h3>
              <Progress value={33} className="mb-2" />
              <p className="text-sm text-muted-foreground">33% completed</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentPage;
