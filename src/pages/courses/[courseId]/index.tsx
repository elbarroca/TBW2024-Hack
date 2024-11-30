import { useParams } from 'react-router-dom';
import { 
  Play, Star, Users, Clock, Check, ChevronDown, ChevronUp,
  BookOpen, GraduationCap, MessageCircle, Globe,
  Award
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { FEATURED_COURSES } from '../../../data/courses';
import { cn } from '../../../lib/utils';
import { useState } from 'react';
import { Course } from '../../../types/course';

export default function CourseDetailsPage() {
  const { courseId } = useParams();
  const course = FEATURED_COURSES.find(c => c.id === courseId) as Course | undefined;
  const [openModule, setOpenModule] = useState<string | null>(null);

  if (!course) return <div>Course not found</div>;

  const features = [
    { icon: Clock, label: `${course.estimatedCompletionTime} total hours` },
    { icon: BookOpen, label: `${course.modules?.length || 0} modules` },
    { icon: GraduationCap, label: course.level },
    { icon: Globe, label: course.language },
    { icon: Award, label: "Certificate of completion" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 text-white">
              {/* Breadcrumb */}
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <a href="/courses" className="hover:text-white">Courses</a>
                <span className="mx-2">›</span>
                <span>{course.category}</span>
              </div>

              {/* Course Title and Subtitle */}
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{course.subtitle}</p>

              {/* Course Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{course.rating}</span>
                  <span className="ml-1 text-gray-400">({course.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span className="ml-1">{course.enrolled} students enrolled</span>
                </div>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <feature.icon className="h-5 w-5 text-gray-400" />
                    <span className="ml-1">{feature.label}</span>
                  </div>
                ))}
              </div>

              {/* Instructor Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={course.instructor.avatar || "https://ui-avatars.com/api/?name=" + course.instructor.name}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-sm">Created by</p>
                  <a 
                    href={`/creators/${course.instructor.id}`} 
                    className="text-purple-400 hover:text-purple-300 font-medium"
                  >
                    {course.instructor.name}
                  </a>
                </div>
              </div>

              {/* Last Updated */}
              <div className="mt-4 text-sm text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Last updated {course.lastUpdated}
                  </div>
                </div>
              </div>
            </div>

            {/* Course Purchase Card */}
            <div className="relative">
              <div className="sticky top-24 bg-white rounded-lg shadow-xl p-6">
                {/* Video Preview */}
                <div className="relative mb-4">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg group hover:bg-opacity-50 transition-all">
                    <Play className="h-12 w-12 text-white opacity-90 group-hover:opacity-100 transition-all" fill="white" />
                  </button>
                </div>

                {/* Pricing */}
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold">{course.price} SOL</span>
                  {course.originalPrice && (
                    <span className="ml-2 text-lg line-through text-gray-500">
                      {course.originalPrice} SOL
                    </span>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-4">
                  <Button size="lg" className="w-full text-lg">
                    Enroll Now
                  </Button>
                  <Button variant="outline" size="lg" className="w-full text-lg">
                    Try for Free
                  </Button>
                </div>

                {/* Course Features */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-4">This course includes:</h4>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <feature.icon className="h-5 w-5 mr-2 text-gray-500" />
                        {feature.label}
                      </li>
                    ))}
                    <li className="flex items-center text-sm">
                      <MessageCircle className="h-5 w-5 mr-2 text-gray-500" />
                      Full lifetime access
                    </li>
                  </ul>
                </div>

                {/* Money Back Guarantee */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                  <p className="font-medium">30-Day Money-Back Guarantee</p>
                  <p className="mt-1">Full refund if you're not satisfied</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* What you'll learn */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Description */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">About this course</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {course.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h3 className="font-semibold mb-3">Requirements</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      {course.requirements?.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Who this course is for</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      {course.targetAudience?.map((audience, index) => (
                        <li key={index}>{audience}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Course content</h2>
                <div className="text-sm text-gray-600">
                  {course.modules?.length} modules • {course.lessons?.length} lessons • {course.estimatedCompletionTime} total
                </div>
              </div>

              <div className="space-y-4">
                {course.modules?.map((module) => (
                  <div key={module.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setOpenModule(
                        openModule === module.id ? null : module.id
                      )}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        {openModule === module.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 mr-3" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 mr-3" />
                        )}
                        <div className="text-left">
                          <h3 className="font-medium text-gray-900">{module.title}</h3>
                          <p className="text-sm text-gray-500">
                            {module.lessons.length} lessons • {module.duration}
                          </p>
                        </div>
                      </div>
                    </button>
                    
                    {openModule === module.id && (
                      <div className="border-t border-gray-200 divide-y divide-gray-200">
                        {module.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center">
                              <Play className="h-4 w-4 text-gray-400 mr-3" />
                              <span className="text-gray-700">{lesson.title}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                              {lesson.isPreview && (
                                <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                                  Preview
                                </span>
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

            {/* Instructor */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Your instructor</h2>
              <div className="flex items-start space-x-4">
                <img
                  src={course.instructor.avatar || `https://ui-avatars.com/api/?name=${course.instructor.name}`}
                  alt={course.instructor.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-lg">{course.instructor.name}</h3>
                  <p className="text-gray-600 text-sm">{course.instructor.title}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{course.instructor.rating} Instructor Rating</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-1" />
                      <span>{course.instructor.students} Students</span>
                    </div>
                    <div className="flex items-center">
                      <Play className="h-4 w-4 text-gray-400 mr-1" />
                      <span>{course.instructor.courses} Courses</span>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700 leading-relaxed">
                    {course.instructor.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Student Reviews */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Student feedback</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900 mb-2">{course.rating}</div>
                  <div className="flex items-center justify-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "h-5 w-5",
                          star <= Math.floor(course.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Course Rating</p>
                </div>
                <div className="col-span-2">
                  {/* Rating bars would go here */}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - FAQ */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {course.faq?.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                      <h3 className="font-medium text-gray-900 mb-2">{item.question}</h3>
                      <p className="text-gray-700 text-sm">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 