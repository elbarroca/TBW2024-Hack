import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Star, Users, Clock, Award, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { FEATURED_COURSES } from '../../../data/courses';

export default function CourseDetailsPage() {
  const { courseId } = useParams();
  const course = FEATURED_COURSES.find(c => c.id === courseId);
  const [openModule, setOpenModule] = useState<string | null>(null);

  if (!course) return <div>Course not found</div>;

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
              <p className="text-xl text-gray-300 mb-6">{course.subtitle}</p>

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

              <div className="mt-4 text-sm">
                <p>Created by <a href={`/creators/${course.instructor.id}`} className="text-purple-400 hover:text-purple-300">{course.instructor.name}</a></p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Last updated {course.lastUpdated}
                  </div>
                  <div>{course.language}</div>
                </div>
              </div>
            </div>

            {/* Course Purchase Card */}
            <div className="relative">
              <div className="sticky top-24 bg-white rounded-lg shadow-lg p-6">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold">{course.price} SOL</span>
                  {course.originalPrice && (
                    <span className="ml-2 text-lg line-through text-gray-500">
                      {course.originalPrice} SOL
                    </span>
                  )}
                </div>
                <div className="space-y-4">
                  <Button className="w-full">Add to cart</Button>
                  <Button variant="outline" className="w-full">Buy now</Button>
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold mb-4">This course includes:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center text-sm">
                      <Play className="h-5 w-5 mr-2 text-gray-500" />
                      {course.estimatedCompletionTime} of video content
                    </li>
                    <li className="flex items-center text-sm">
                      <Award className="h-5 w-5 mr-2 text-gray-500" />
                      Certificate of completion
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* What you'll learn */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course content */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Course content</h2>
              <div className="space-y-4">
                {course.modules.map((module) => (
                  <div key={module.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setOpenModule(
                        openModule === module.id ? null : module.id
                      )}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        {openModule === module.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 mr-2" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 mr-2" />
                        )}
                        <div className="text-left">
                          <h3 className="font-medium">{module.title}</h3>
                          <p className="text-sm text-gray-500">
                            {module.lessons.length} lessons • {module.duration}
                          </p>
                        </div>
                      </div>
                    </button>
                    
                    {openModule === module.id && (
                      <div className="border-t border-gray-200">
                        {module.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="px-6 py-3 flex items-center justify-between hover:bg-gray-50"
                          >
                            <div className="flex items-center">
                              <Play className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm">{lesson.title}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              {lesson.isPreview && (
                                <span className="text-sm text-purple-600">Preview</span>
                              )}
                              <span className="text-sm text-gray-500">{lesson.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 