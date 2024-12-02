import { Link } from 'react-router-dom';
import { Star, Users, BookOpen, Award, ExternalLink, Twitter } from 'lucide-react';
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
            {twitterHandle && (
              <a 
                href={`https://twitter.com/${twitterHandle}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
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
        
        <div className="flex flex-col gap-3 p-4 rounded-lg bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="flex items-center text-sm font-medium text-gray-700">
              <BookOpen className="w-4 h-4 mr-2 text-gray-600" />
              {courses} Courses
            </span>
            <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="ml-1.5 text-sm font-bold text-gray-700">{rating}</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="flex items-center text-sm font-medium text-gray-700">
              <Users className="w-4 h-4 mr-2 text-gray-600" />
              {students.toLocaleString()} Students
            </span>
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

