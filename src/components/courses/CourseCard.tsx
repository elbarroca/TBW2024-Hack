import { Clock, Users, Star } from 'lucide-react';
import { Course } from '@/types/course';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/Badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface CourseCardProps {
    course: Course;
    className?: string;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error) {
        console.error('CourseCard Error:', error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Card className="p-4 bg-red-50">
                    <p className="font-medium text-red-500">Failed to load course</p>
                    <Button 
                        variant="ghost"
                        onClick={() => this.setState({ hasError: false })}
                        className="mt-2 text-red-600 hover:text-red-700"
                    >
                        Try again
                    </Button>
                </Card>
            );
        }

        return this.props.children;
    }
}

export function CourseCard({ course, className = '' }: CourseCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        try {
            if (!course?.title || !course?.creator?.name) {
                throw new Error('Course title or Creator name is missing');
            }
            
            const creatorSlug = course.creator.name.toLowerCase().replace(/\s+/g, '-');
            const courseSlug = course.title.toLowerCase().replace(/\s+/g, '-');
            navigate(`/${creatorSlug}/${courseSlug}`);
        } catch (error) {
            console.error('Navigation error:', error);
        }
    };

    return (
        <ErrorBoundary>
            <Card 
                onClick={handleClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleClick()}
                className={`group overflow-hidden hover:shadow-xl transition-all duration-300 ${className}`}
            >
                <div className="relative">
                    {course.image ? (
                        <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-52 bg-gradient-to-r from-purple-100 to-purple-200" />
                    )}
                    {course.category && (
                        <Badge className="absolute top-4 left-4 bg-white/90 text-purple-700 backdrop-blur-sm">
                            {course.category}
                        </Badge>
                    )}
                </div>

                <CardHeader className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={course.creator?.avatar} alt={course.creator?.name} />
                            <AvatarFallback>{course.creator?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">{course.creator?.name}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 leading-tight">
                        {course.title}
                    </h3>
                </CardHeader>

                <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>

                    <div className="flex items-center gap-4 text-sm">
                        {course.rating !== undefined && (
                            <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="ml-1 font-medium">{course.rating}</span>
                                {course.reviews !== undefined && (
                                    <span className="ml-1 text-gray-500">({course.reviews})</span>
                                )}
                            </div>
                        )}
                        {course.enrolled && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {course.enrolled}
                            </Badge>
                        )}
                        {course.duration && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {course.duration}
                            </Badge>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-purple-600">{course.price} SOL</span>
                        {course.originalPrice && (
                            <span className="text-sm line-through text-gray-400">
                                {course.originalPrice} SOL
                            </span>
                        )}
                    </div>
                    {course.level && (
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            {course.level}
                        </Badge>
                    )}
                </CardFooter>
            </Card>
        </ErrorBoundary>
    );
}
