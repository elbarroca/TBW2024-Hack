import React from 'react';
import { VideoPlayer } from './VideoPlayer';
import { MaterialsList } from './MaterialsList';
import { ChatMessage } from './ChatMessage';
import type { Lesson, CourseMaterial } from '../../types/course';

const SAMPLE_MATERIALS: CourseMaterial[] = [
    {
        id: '1',
        title: 'Lesson Slides',
        type: 'slides',
        url: '#',
        reviewed: false,
    },
    {
        id: '2',
        title: 'Exercise Files',
        type: 'code',
        url: '#',
        reviewed: false,
    },
    {
        id: '3',
        title: 'Additional Reading',
        type: 'pdf',
        url: '#',
        reviewed: true,
    },
];

const SAMPLE_MESSAGES = [
    {
        id: '1',
        author: 'John Doe',
        content: 'Great explanation of the concepts!',
        timestamp: '5m ago',
    },
    {
        id: '2',
        author: 'Sarah Chen',
        content: 'Could you explain more about the smart contract integration?',
        timestamp: '10m ago',
    },
    {
        id: '3',
        author: 'Alex Rivera',
        content: 'Sure! The smart contract uses Solana Program Library (SPL) tokens...',
        timestamp: '8m ago',
        isInstructor: true,
    },
];

interface CoursePlayerProps {
    lesson: Lesson;
}

export function CoursePlayer({ lesson }: CoursePlayerProps) {
    const [progress, setProgress] = React.useState(0);

    const handleProgress = (newProgress: number) => {
        setProgress(newProgress);
    };

    const handleMaterialReviewed = (materialId: string) => {
        // In a real app, this would update the backend
        console.log('Material reviewed:', materialId);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <VideoPlayer videoUrl={lesson.videoUrl} onProgress={handleProgress} />

                        <div className="mt-6">
                            <h2 className="text-2xl font-bold">{lesson.title}</h2>
                            <div className="mt-4 h-2 bg-gray-700 rounded-full">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-600 to-teal-400 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <MaterialsList
                            materials={SAMPLE_MATERIALS}
                            onMaterialReviewed={handleMaterialReviewed}
                        />

                        <div className="bg-white rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Discussion</h3>
                            <div className="space-y-4">
                                {SAMPLE_MESSAGES.map((message) => (
                                    <ChatMessage key={message.id} message={message} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
