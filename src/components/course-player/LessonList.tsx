import React from 'react';
import { Play, CheckCircle, Lock } from 'lucide-react';
import type { Lesson } from '../../types/course';

interface LessonListProps {
  lessons: Lesson[];
  currentLessonId: string;
  onLessonSelect: (lessonId: string) => void;
}

export function LessonList({ lessons, currentLessonId, onLessonSelect }: LessonListProps) {
  return (
    <div className="bg-white rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Course Content</h3>
      <div className="space-y-2">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => onLessonSelect(lesson.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
              lesson.id === currentLessonId
                ? 'bg-purple-50 border-purple-200'
                : 'hover:bg-gray-50 border-gray-100'
            } border`}
          >
            <div className="flex items-center space-x-3">
              {lesson.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : lesson.id === currentLessonId ? (
                <Play className="h-5 w-5 text-purple-600" />
              ) : (
                <Lock className="h-5 w-5 text-gray-400" />
              )}
              <span className={`${
                lesson.id === currentLessonId ? 'text-purple-600' : 'text-gray-700'
              }`}>
                {lesson.title}
              </span>
            </div>
            <span className="text-sm text-gray-500">{lesson.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
}