import { Clock, Users, Star } from 'lucide-react';
import { Course } from '@/types/course';
import React from 'react';
import { useNavigate } from 'react-router-dom';

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
        // Log error to error reporting service
        console.error('CourseCard Error:', error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 rounded-lg bg-red-50 text-red-500">
                    <p className="font-medium">Failed to load course</p>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className="mt-2 text-sm text-red-600 hover:text-red-700"
                    >
                        Try again
                    </button>
                </div>
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

            // Convert title and name to URL-friendly slugs
            const courseSlug = course.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

            const creatorSlug = course.creator.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

            navigate(`/courses/${courseSlug}`);
        } catch (error) {
            console.error('Navigation error:', error);
        }
    };

    return (
        <ErrorBoundary>
            <div
                onClick={handleClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleClick()}
                className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${className}`}
                aria-label={`View ${course.title} course details`}
            >
                {/* Image Section */}
                <div className="relative">
                    {course.image ? (
                        <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-48 bg-gray-200 rounded-t-lg" />
                    )}
                    {course.category && (
                        <span className="absolute top-4 left-4 text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                            {course.category}
                        </span>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-4 space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {course.title}
                    </h3>

                    <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>

                    {/* Creator Info */}
                    {course.creator?.name && (
                        <div className="flex items-center text-sm">
                            {course.creator.avatar ? (
                                <img
                                    src={course.creator.avatar}
                                    alt={course.creator.name}
                                    className="w-6 h-6 rounded-full mr-2"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-6 h-6 rounded-full bg-gray-200 mr-2" />
                            )}
                            <span className="text-gray-700">{course.creator.name}</span>
                        </div>
                    )}

                    {/* Course Stats */}
                    <div className="flex items-center gap-4">
                        {course.rating !== undefined && (
                            <div className="flex items-center">
                                <Star className="h-4 w-4 text-purple-600 fill-current" />
                                <span className="ml-1 font-medium">{course.rating}</span>
                                {course.reviews !== undefined && (
                                    <span className="ml-1 text-gray-500">({course.reviews})</span>
                                )}
                            </div>
                        )}
                        {course.enrolled && (
                            <div className="flex items-center text-gray-500">
                                <Users className="h-4 w-4 mr-1" />
                                <span>{course.enrolled}</span>
                            </div>
                        )}
                        {course.duration && (
                            <div className="flex items-center text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{course.duration}</span>
                            </div>
                        )}
                    </div>

                    {/* Price and Level */}
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-baseline">
                            <span className="text-xl font-bold">{course.price} SOL</span>
                            {course.originalPrice && (
                                <span className="ml-2 text-sm line-through text-gray-500">
                                    {course.originalPrice} SOL
                                </span>
                            )}
                        </div>
                        {course.level && (
                            <span className="text-sm text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
                                {course.level}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
}
