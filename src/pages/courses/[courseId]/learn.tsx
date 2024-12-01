import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { VideoPlayer } from '../../../components/course-player/VideoPlayer';
import { LessonList } from '../../../components/course-player/LessonList';
import { MaterialsList } from '../../../components/course-player/MaterialsList';
import { ProgressBar } from '../../../components/course-player/ProgressBar';
import type { Lesson, CourseMaterial } from '../../../types/course';

// Sample data - replace with real data from your backend
const SAMPLE_LESSON: Lesson = {
    id: '1',
    title: 'Introduction to Web3',
    description: 'Learn the basics of Web3 development',
    duration: '10:00',
    type: 'video',
    content: {
        videoUrl: 'https://example.com/sample-video.mp4',
    },
    isPreview: false,
    order: 1,
    materials: [
        {
            id: '1',
            title: 'Lesson Slides',
            type: 'slides',
            url: '#',
        },
        {
            id: '2',
            title: 'Exercise Files',
            type: 'code',
            url: '#',
        },
        {
            id: '3',
            title: 'Additional Reading',
            type: 'pdf',
            url: '#',
        },
    ],
};

const SAMPLE_LESSONS = [
    SAMPLE_LESSON,
    {
        id: '2',
        title: 'Setting Up Your Development Environment',
        duration: '15:00',
        type: 'video',
        content: {
            videoUrl: 'https://example.com/sample-video-2.mp4',
        },
        isPreview: false,
        order: 2,
        materials: [],
    },
];

export default function CoursePlayerPage() {
    const { courseId } = useParams();
    const [currentLesson, setCurrentLesson] = useState<Lesson>(SAMPLE_LESSON);
    const [progress, setProgress] = useState(0);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);

    const handleLessonSelect = (lessonId: string) => {
        const lesson = SAMPLE_LESSONS.find((l) => l.id === lessonId);
        if (lesson) {
            setCurrentLesson(lesson);
        }
    };

    const handleProgress = (newProgress: number) => {
        setProgress(newProgress);
        if (newProgress >= 90 && !completedLessons.includes(currentLesson.id)) {
            setCompletedLessons([...completedLessons, currentLesson.id]);
        }
    };

    const handleMaterialReviewed = (materialId: string) => {
        // In a real app, this would update the backend
        console.log('Material reviewed:', materialId);
    };

    return (
        <div className="min-h-screen bg-gray-900 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <VideoPlayer
                            videoUrl={currentLesson.content.videoUrl || ''}
                            onProgress={handleProgress}
                        />

                        <div className="bg-gray-800 rounded-lg p-6">
                            <h1 className="text-2xl font-bold text-white mb-2">
                                {currentLesson.title}
                            </h1>
                            <p className="text-gray-300">{currentLesson.description}</p>
                            <ProgressBar
                                progress={completedLessons.length}
                                total={SAMPLE_LESSONS.length}
                            />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <LessonList
                            lessons={SAMPLE_LESSONS.map((lesson) => ({
                                ...lesson,
                                completed: completedLessons.includes(lesson.id),
                            }))}
                            currentLessonId={currentLesson.id}
                            onLessonSelect={handleLessonSelect}
                        />

                        <MaterialsList
                            materials={currentLesson.materials}
                            onMaterialReviewed={handleMaterialReviewed}
                        />

                        {/* Community Chat - Placeholder */}
                        <div className="bg-white rounded-lg p-4">
                            <h3 className="text-lg font-semibold mb-4">Community Chat</h3>
                            <div className="h-64 bg-gray-50 rounded-lg border border-gray-200 p-4">
                                <p className="text-gray-500 text-center">
                                    Chat functionality coming soon...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
