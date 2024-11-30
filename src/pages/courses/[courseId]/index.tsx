import { useParams } from 'react-router-dom';
import { 
  Play, Star, Users, Clock, Check, ChevronDown, ChevronUp,
  BookOpen, GraduationCap, MessageCircle, Globe, Shield,
  Award, Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FEATURED_COURSES } from '@/data/courses';
import { useState } from 'react';
import { Course } from '@/types/course';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
    { icon: Calendar, label: `Updated ${course.lastUpdated}` },
    { icon: Shield, label: "30-Day Money Back" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold truncate">{course.title}</h1>
              <Badge variant="secondary">{course.level}</Badge>
            </div>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Enroll Now for {course.price} SOL
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Overview */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h2 className="text-3xl font-bold mb-2">{course.title}</h2>
                  <p className="text-xl text-gray-600 mb-4">{course.subtitle}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Created by <a href={`/creators/${course.instructor.id}`} className="text-purple-600 hover:underline">{course.instructor.name}</a></span>
                    <span>•</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{course.rating} ({course.reviews} reviews)</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-1" />
                      <span>{course.enrolled} students</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Preview Video */}
              <div className="relative rounded-xl overflow-hidden mb-6">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full aspect-video object-cover"
                />
                <button className="absolute inset-0 flex items-center justify-center bg-black/40 group hover:bg-black/50 transition-all">
                  <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                </button>
              </div>

              {/* Course Features */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <feature.icon className="h-5 w-5 text-purple-600" />
                    <span>{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-6">What you'll learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Course Content</h3>
              <Accordion type="single" collapsible className="w-full">
                {course.modules?.map((module) => (
                  <AccordionItem key={module.id} value={module.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex flex-col items-start">
                        <div className="text-lg font-medium">{module.title}</div>
                        <div className="text-sm text-gray-500">
                          {module.lessons.length} lessons • {module.duration}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-2">
                        {module.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center">
                              <Play className="h-4 w-4 text-gray-400 mr-3" />
                              <span className="text-gray-700">{lesson.title}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                              {lesson.isPreview && (
                                <Badge variant="secondary">Preview</Badge>
                              )}
                              <span className="text-sm text-gray-500">{lesson.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Prerequisites */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Prerequisites</h3>
              <ul className="space-y-3">
                {course.prerequisites.map((prerequisite, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{prerequisite}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-6">About this course</h3>
              <div className="prose prose-gray max-w-none">
                {course.description}
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Your Instructor</h3>
              <div className="flex items-start space-x-4">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-24 h-24 rounded-full"
                />
                <div>
                  <h4 className="text-lg font-medium">{course.instructor.name}</h4>
                  <p className="text-gray-600">{course.instructor.title}</p>
                  <p className="mt-4 text-gray-700">{course.instructor.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {course.instructor.expertise.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="w-full">
                {course.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Right Column - Sticky Purchase Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold mb-2">{course.price} SOL</div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 mb-4">
                    Enroll Now
                  </Button>
                  <p className="text-sm text-gray-600">30-day money-back guarantee</p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">This course includes:</h4>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <feature.icon className="h-5 w-5 text-purple-600 mr-3" />
                        {feature.label}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <p className="font-medium text-purple-900">Share this course</p>
                  <div className="flex space-x-4 mt-3">
                    {/* Add social share buttons here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}