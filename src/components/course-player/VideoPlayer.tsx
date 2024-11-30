import React from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface VideoPlayerProps {
    videoUrl: string;
    onProgress: (progress: number) => void;
}

export function VideoPlayer({ videoUrl, onProgress }: VideoPlayerProps) {
    const [playing, setPlaying] = React.useState(false);
    const [muted, setMuted] = React.useState(false);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (playing) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setPlaying(!playing);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !muted;
            setMuted(!muted);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            onProgress(progress);
        }
    };

    return (
        <div className="relative bg-black rounded-lg overflow-hidden">
            <video
                ref={videoRef}
                className="w-full aspect-video"
                src={videoUrl}
                onTimeUpdate={handleTimeUpdate}
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={togglePlay}
                            className="p-2 rounded-full hover:bg-white/20 transition-colors"
                        >
                            {playing ? (
                                <Pause className="h-6 w-6 text-white" />
                            ) : (
                                <Play className="h-6 w-6 text-white" />
                            )}
                        </button>

                        <button
                            onClick={toggleMute}
                            className="p-2 rounded-full hover:bg-white/20 transition-colors"
                        >
                            {muted ? (
                                <VolumeX className="h-6 w-6 text-white" />
                            ) : (
                                <Volume2 className="h-6 w-6 text-white" />
                            )}
                        </button>
                    </div>

                    <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
                        <Maximize className="h-6 w-6 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}
