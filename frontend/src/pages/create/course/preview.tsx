import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LearnPage from '@/pages/courses/learn';

export default function CoursePreview() {
    const navigate = useNavigate();
    const [previewData, setPreviewData] = useState(null);

    useEffect(() => {
        // Get preview data from localStorage
        const savedData = localStorage.getItem('coursePreviewData');
        if (!savedData) {
            navigate('/create/course');
            return;
        }

        try {
            const parsedData = JSON.parse(savedData);
            setPreviewData(parsedData);
        } catch (error) {
            console.error('Failed to parse preview data:', error);
            navigate('/create/course');
        }
    }, [navigate]);

    if (!previewData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    // Return the LearnPage component with preview data
    return <LearnPage previewMode={true} previewData={previewData} />;
} 