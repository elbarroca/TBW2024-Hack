import { ChevronRight } from 'lucide-react';
import { CourseCard } from '../courses/CourseCard';
import { Level } from '@/types/course';

interface FeaturedCourse {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    Creator: {
        id: string;
        name: string;
        avatar: string;
    };
    price: number;
    originalPrice: number;
    image: string;
    category: string;
    duration: string;
    enrolled: number;
    rating: number;
    reviews: number;
    level: Level;
    language: string;
    lastUpdated: string;
}

const FEATURED_COURSES: FeaturedCourse[] = [
    {
        id: '1',
        title: 'Solana Development Fundamentals',
        subtitle: 'Build Production-Ready dApps on Solana',
        description: 'Learn to build decentralized applications on Solana',
        Creator: {
            id: '1',
            name: 'Alex Rivera',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        price: 2.5,
        originalPrice: 3.0,
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
        category: 'Blockchain',
        duration: '8 weeks',
        enrolled: 1234,
        rating: 4.8,
        reviews: 234,
        level: 'Intermediate',
        language: 'English',
        lastUpdated: '2023-12-01',
    },
    {
        id: '2',
        title: 'Web3 Design Patterns',
        subtitle: 'Modern Design for Web3 Applications',
        description: 'Master the art of designing Web3 applications',
        Creator: {
            id: '2',
            name: 'Sarah Chen',
            avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        },
        price: 1.8,
        originalPrice: 2.2,
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766',
        category: 'Design',
        duration: '6 weeks',
        enrolled: 892,
        rating: 4.7,
        reviews: 156,
        level: 'Beginner',
        language: 'English',
        lastUpdated: '2023-11-15',
    },
    {
        id: '3',
        title: 'Smart Contract Security',
        subtitle: 'Advanced Security for Blockchain Apps',
        description: 'Learn to secure blockchain applications',
        Creator: {
            id: '3',
            name: 'Michael Brown',
            avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        },
        price: 2.0,
        originalPrice: 2.5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        category: 'Security',
        duration: '4 weeks',
        enrolled: 1023,
        rating: 4.7,
        reviews: 321,
        level: 'Advanced',
        language: 'English',
        lastUpdated: '2024-04',
    },
];
export default function FeaturedCourses() {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
                    <button className="flex items-center text-purple-600 hover:text-purple-700">
                        View all <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURED_COURSES.map((course) => {
                        // Add missing Course properties
                        const fullCourse = {
                            ...course,
                            estimatedCompletionTime: course.duration,
                            whatYouWillLearn: [],
                            prerequisites: [],
                            modules: [],
                            faqs: [],
                        };

                        return (
                            <CourseCard
                                key={course.id}
                                course={{
                                    ...fullCourse,
                                    creator: {
                                        ...fullCourse.Creator,
                                        bio: 'Expert instructor',
                                        title: 'Course Instructor',
                                        expertise: ['Blockchain', 'Security'],
                                    },
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
