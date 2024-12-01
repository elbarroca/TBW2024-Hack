import { Star, Users, Award } from 'lucide-react';
import { Button } from '../../../components/ui/CustomButton';
import { useParams } from 'react-router-dom';

const CREATOR_DATA = {
    id: '1',
    name: 'Alex Rivera',
    role: 'Senior Blockchain Developer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    rating: 4.9,
    students: 12500,
    courses: 5,
    bio: 'Experienced blockchain developer with over 8 years in Web3 development. Specialized in Solana and Ethereum development.',
    expertise: ['Solana', 'Smart Contracts', 'DeFi', 'Web3'],
    socialLinks: {
        twitter: 'https://twitter.com',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
    },
};

export default function CreatorProfilePage() {
    const { creatorId } = useParams();

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Creator Header */}
                <div className="bg-white rounded-xl p-8 shadow-sm">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <img
                            src={CREATOR_DATA.avatar}
                            alt={CREATOR_DATA.name}
                            className="w-32 h-32 rounded-full object-cover"
                        />

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {CREATOR_DATA.name}
                            </h1>
                            <p className="mt-2 text-xl text-purple-600">{CREATOR_DATA.role}</p>

                            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                                <div className="flex items-center">
                                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                    <span className="ml-1 font-medium">{CREATOR_DATA.rating}</span>
                                </div>
                                <div className="flex items-center">
                                    <Users className="h-5 w-5 text-gray-500" />
                                    <span className="ml-1">
                                        {CREATOR_DATA.students.toLocaleString()} students
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Award className="h-5 w-5 text-gray-500" />
                                    <span className="ml-1">{CREATOR_DATA.courses} courses</span>
                                </div>
                            </div>

                            <p className="mt-4 text-gray-600 max-w-2xl">{CREATOR_DATA.bio}</p>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {CREATOR_DATA.expertise.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <Button>Follow</Button>
                            <Button variant="outline">Message</Button>
                        </div>
                    </div>
                </div>

                {/* Creator's Courses */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Courses by {CREATOR_DATA.name}
                    </h2>
                    {/* Add CourseGrid component here */}
                </div>
            </div>
        </div>
    );
}
