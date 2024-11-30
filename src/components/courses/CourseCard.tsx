import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Star } from 'lucide-react';
import { Course } from '../../types/course';

interface CourseCardProps {
    course: Course;
    className?: string;
}

export function CourseCard({ course, className = '' }: CourseCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!course.title || !course.instructor.name) {
            console.error('Course title or instructor name is missing');
            return;
        }

        // Convert title and name to URL-friendly slugs
        const courseSlug = course.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        const creatorSlug = course.instructor.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        const path = `/${creatorSlug}/${courseSlug}`;
        navigate(path);
    };

    if (!course) return null;

    return (
        <div
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
            className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${className}`}
            aria-label={`View ${course.title} course details`}
        >
            <div className="relative">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
                <span className="absolute top-4 left-4 text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                    {course.category}
                </span>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{course.title}</h3>

                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{course.description}</p>

                <div className="mt-3 flex items-center text-sm">
                    <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-gray-700">{course.instructor.name}</span>
                </div>

                <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium">{course.rating}</span>
                        <span className="ml-1 text-gray-500">({course.reviews})</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{course.enrolled}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-baseline">
                        <span className="text-xl font-bold">{course.price} SOL</span>
                        {course.originalPrice && (
                            <span className="ml-2 text-sm line-through text-gray-500">
                                {course.originalPrice} SOL
                            </span>
                        )}
                    </div>
                    <span className="text-sm text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
                        {course.level}
                    </span>
                </div>
            </div>
        </div>
    );
}
