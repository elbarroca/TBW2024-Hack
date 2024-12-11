import { useRef } from 'react';
import ReactPlayer from 'react-player/youtube';

interface VideoPlayerProps {
    url: string;
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
    return (
        <div className="relative w-full h-full">
            {url ? (
                <video
                    className="w-full h-full"
                    controls
                    controlsList="nodownload"
                    playsInline
                >
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <p className="text-gray-500">No video available</p>
                </div>
            )}
        </div>
    );
} 