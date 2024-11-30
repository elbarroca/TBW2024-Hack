import { useNavigate } from 'react-router-dom';
import { Clock, Users, Star } from 'lucide-react';
import { Course } from '../../types/course';
import React from 'react';

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

  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-red-500">Something went wrong loading this course.</div>;
    }

    return this.props.children;
  }
}

export function CourseCard({ course, className = '' }: CourseCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!course?.title || !course?.Creator?.name) {
      console.error('Course title or Creator name is missing');
      return;
    }
    
    // Convert title and name to URL-friendly slugs
    const courseSlug = course.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const creatorSlug = course.Creator.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const path = `/${creatorSlug}/${courseSlug}`;
    navigate(path);
  };

  if (!course) return null;

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
        <div className="relative">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {course.category && (
            <span className="absolute top-4 left-4 text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
              {course.category}
            </span>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {course.title}
          </h3>
          
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {course.description}
          </p>

          {course.Creator?.avatar && course.Creator?.name && (
            <div className="mt-3 flex items-center text-sm">
              <img
                src={course.Creator.avatar}
                alt={course.Creator.name}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="text-gray-700">{course.Creator.name}</span>
            </div>
          )}

          <div className="mt-2 flex items-center gap-4">
            {course.rating && (
              <div className="flex items-center">
                <Star className="h-4 w-4 text-purple-600 fill-current" />
                <span className="ml-1 font-medium">{course.rating}</span>
                <span className="ml-1 text-gray-500">({course.reviews})</span>
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

          <div className="mt-4 flex items-center justify-between">
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