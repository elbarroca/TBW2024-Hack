import { Link } from 'react-router-dom';
import { Star, Users, BookOpen, Award, ExternalLink, Twitter, Apple, Linkedin, Youtube } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";

interface CreatorCardProps {
  id: string;
  name: string;
  image: string;
  expertise: string;
  rating: string;
  bio: string;
  courses: number;
  students: number;
  slug: string;
  isTopCreator?: boolean;
  twitterHandle?: string;
  appleHandle?: string;
  linkedinHandle?: string;
  youtubeHandle?: string;
  tags?: string[];
}

export const CreatorCard = ({
  name,
  image,
  expertise,
  rating,
  bio,
  courses,
  students,
  slug,
  isTopCreator,
  twitterHandle,
  appleHandle,
  linkedinHandle,
  youtubeHandle,
  tags = []
}: CreatorCardProps) => {
  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-500 border-gray-200 hover:border-gray-300 bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
      
      <CardHeader className="space-y-4">
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-black/5 z-10 group-hover:opacity-40 transition-opacity duration-500" />
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
          {isTopCreator && (
            <Badge 
              className="absolute top-4 right-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-none shadow-md backdrop-blur-sm z-20" 
              variant="secondary"
            >
              <Award className="w-4 h-4 mr-1.5" />
              Top Creator
            </Badge>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-900">
              {name}
            </CardTitle>
            <div className="flex items-center space-x-3">
              {twitterHandle && (
                <a 
                  href={`https://twitter.com/${twitterHandle}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
                  aria-label={`Follow ${name} on Twitter`}
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {linkedinHandle && (
                <a 
                  href={`https://linkedin.com/in/${linkedinHandle}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-700 transition-colors duration-300"
                  aria-label={`Connect with ${name} on LinkedIn`}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {youtubeHandle && (
                <a 
                  href={`https://youtube.com/@${youtubeHandle}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-600 transition-colors duration-300"
                  aria-label={`Subscribe to ${name} on YouTube`}
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
              {appleHandle && (
                <a 
                  href={`https://music.apple.com/${appleHandle}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors duration-300"
                  aria-label={`Listen to ${name} on Apple Music`}
                >
                  <Apple className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
          <CardDescription className="text-gray-600 font-medium">
            {expertise}
          </CardDescription>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="bg-gray-50 text-gray-700 border-gray-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600 leading-relaxed">
          {bio}
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors duration-300">
            <BookOpen className="w-6 h-6 text-indigo-600 mb-2" />
            <span className="text-lg font-bold text-indigo-700">{courses}</span>
            <span className="text-xs text-indigo-600 font-medium">Courses</span>
          </div>
          
          <div className="flex flex-col items-center p-3 rounded-lg bg-violet-50 hover:bg-violet-100 transition-colors duration-300">
            <Users className="w-6 h-6 text-violet-600 mb-2" />
            <span className="text-lg font-bold text-violet-700">{students.toLocaleString()}</span>
            <span className="text-xs text-violet-600 font-medium">Students</span>
          </div>
          
          <div className="flex flex-col items-center p-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors duration-300">
            <Star className="w-6 h-6 text-amber-500 mb-2" />
            <span className="text-lg font-bold text-amber-700">{rating}</span>
            <span className="text-xs text-amber-600 font-medium">Rating</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6">
        <Button 
          asChild 
          className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-violet-600 hover:to-indigo-600 transition-all duration-500 text-white font-bold shadow-md group relative overflow-hidden"
        >
          <Link to={`/${slug}`} className="flex items-center justify-center">
            <span className="relative z-10 flex items-center">
              View Full Profile
              <ExternalLink className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
