import React from 'react';
import { MessageSquare, MoreVertical } from 'lucide-react';

interface ChatMessageProps {
    message: {
        id: string;
        author: string;
        content: string;
        timestamp: string;
        isInstructor?: boolean;
    };
}

export function ChatMessage({ message }: ChatMessageProps) {
    return (
        <div className="group flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex-shrink-0">
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.isInstructor
                            ? 'bg-purple-100 text-purple-600'
                            : 'bg-gray-100 text-gray-600'
                    }`}
                >
                    {message.author[0].toUpperCase()}
                </div>
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span
                            className={`font-medium ${message.isInstructor ? 'text-purple-600' : 'text-gray-900'}`}
                        >
                            {message.author}
                        </span>
                        {message.isInstructor && (
                            <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-600 rounded-full">
                                Instructor
                            </span>
                        )}
                    </div>
                    <span className="text-sm text-gray-500">{message.timestamp}</span>
                </div>

                <p className="mt-1 text-gray-700">{message.content}</p>

                <div className="mt-2 flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-sm text-gray-500 hover:text-purple-600">
                        <MessageSquare className="h-4 w-4" />
                    </button>
                    <button className="text-sm text-gray-500 hover:text-purple-600">
                        <MoreVertical className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
