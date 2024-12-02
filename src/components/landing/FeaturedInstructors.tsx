import { Star, Users, BookOpen, ChevronRight, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/Badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';

const instructors = [
    {
        id: '1',
        name: 'Alex Rivera',
        slug: 'alex-rivera',
        role: 'Senior Blockchain Developer',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        rating: 4.8,
        students: 1234,
        courses: 5,
        duration: '8 weeks',
        level: 'Intermediate',
    },
    {
        id: '2',
        name: 'Sarah Chen',
        slug: 'sarah-chen',
        role: 'DeFi Protocol Engineer',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        rating: 4.7,
        students: 892,
        courses: 4,
        duration: '6 weeks',
        level: 'Beginner',
    },
    {
        id: '3',
        name: 'Michael Brown',
        slug: 'michael-brown',
        role: 'Smart Contract Auditor',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        rating: 4.9,
        students: 1567,
        courses: 6,
        duration: '10 weeks',
        level: 'Advanced',
    },
];

export function FeaturedInstructors() {
    const navigate = useNavigate();

    const handleInstructorClick = (instructor: (typeof instructors)[0]) => {
        navigate(`/${instructor.slug}`);
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-bold tracking-tight">Featured Instructors</h2>
                        <p className="text-muted-foreground">Learn from industry-leading experts in blockchain and Web3</p>
                    </div>
                    <Button variant="ghost" className="gap-2" onClick={() => navigate('/instructors')}>
                        View all <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {instructors.map((instructor) => (
                        <Card
                            key={instructor.id}
                            className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                            onClick={() => handleInstructorClick(instructor)}
                        >
                            <CardHeader className="relative p-6 pb-0">
                                <div className="absolute top-4 right-4">
                                    <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">
                                        <Trophy className="w-3 h-3 mr-1" />
                                        Top Instructor
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-16 h-16 border-2 border-purple-100">
                                        <AvatarImage src={instructor.avatar} alt={instructor.name} />
                                        <AvatarFallback>{instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-semibold tracking-tight group-hover:text-purple-600 transition-colors">
                                            {instructor.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">{instructor.role}</p>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="p-6">
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                                        <span className="block font-semibold">{instructor.rating}</span>
                                        <span className="text-xs text-muted-foreground">Rating</span>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <Users className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                                        <span className="block font-semibold">{instructor.students}</span>
                                        <span className="text-xs text-muted-foreground">Students</span>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <BookOpen className="w-5 h-5 text-green-400 mx-auto mb-1" />
                                        <span className="block font-semibold">{instructor.courses}</span>
                                        <span className="text-xs text-muted-foreground">Courses</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="outline" className="bg-purple-50 border-purple-100">
                                        {instructor.duration}
                                    </Badge>
                                    <Badge variant="outline" className="bg-blue-50 border-blue-100">
                                        {instructor.level}
                                    </Badge>
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full mt-6 border-2 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleInstructorClick(instructor);
                                    }}
                                >
                                    View Profile
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
