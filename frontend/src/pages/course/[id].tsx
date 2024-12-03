import { useParams } from 'react-router-dom';

export default function CourseDetailPage() {
    const { courseId } = useParams();

    return (
        <main className="container mx-auto px-4 pt-24">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Details</h1>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <p className="text-gray-600">Course ID: {courseId}</p>
                    <p className="text-gray-600 mt-4">Course details coming soon!</p>
                </div>
            </div>
        </main>
    );
}
