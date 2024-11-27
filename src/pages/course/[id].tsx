import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Star, Users, Clock, Award, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { COURSES } from '../../data/courses';

export default function CourseDetailPage() {
  const { creatorName, courseName } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openModule, setOpenModule] = useState<string | null>(null);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        // For now, using static data. In production, this would be an API call
        const foundCourse = COURSES.find(c => {
          const courseSlug = c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          const creatorSlug = c.instructor.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          return courseSlug === courseName && creatorSlug === creatorName;
        });
        
        setCourse(foundCourse || null);
      } catch (error) {
        console.error('Error loading course:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [creatorName, courseName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-8">The course you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-gray-900 pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 text-white">
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <a href="/courses" className="hover:text-white">Courses</a>
                <span className="mx-2">›</span>
                <span>{course.category}</span>
              </div>

              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{course.description}</p>

              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1">{course.rating}</span>
                  <span className="ml-1 text-gray-400">({course.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span className="ml-1">{course.enrolled} students</span>
                </div>
              </div>
            </div>

            {/* Course Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="aspect-video w-full mb-4 rounded-lg overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="mb-6">
                <div className="text-3xl font-bold mb-2">{course.price} SOL</div>
                {course.originalPrice && (
                  <div className="text-gray-500 line-through">{course.originalPrice} SOL</div>
                )}
              </div>

              <Button className="w-full mb-4">Enroll Now</Button>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-gray-400" />
                  <span>{course.duration} total hours</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-gray-400" />
                  <span>{course.level}</span>
                </div>
                {/* Add more course features */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Course Modules */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Course Content</h2>
              </div>
              
              <div className="divide-y">
                {course.modules?.map((module: any, index: number) => (
                  <div key={module.id} className="p-6">
                    <button
                      onClick={() => setOpenModule(openModule === module.id ? null : module.id)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <div className="flex items-center">
                        <span className="text-lg font-medium">
                          {index + 1}. {module.title}
                        </span>
                      </div>
                      {openModule === module.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    
                    {openModule === module.id && (
                      <div className="mt-4 space-y-2">
                        {module.lessons.map((lesson: any) => (
                          <div key={lesson.id} className="flex items-center text-sm pl-6">
                            <Play className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{lesson.title}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructor Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Instructor</h2>
              <div className="flex items-center mb-4">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-medium">{course.instructor.name}</div>
                  <div className="text-sm text-gray-500">{course.instructor.title}</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">{course.instructor.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 