import { useRef } from 'react';
import ReactPlayer from 'react-player/youtube';

interface VideoPlayerProps {
    url: string;
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
    const playerRef = useRef<ReactPlayer>(null);

    return (
        <div className="relative aspect-video w-full">
            <ReactPlayer
                ref={playerRef}
                url={url}
                width="100%"
                height="100%"
                controls={true}
                config={{
                    playerVars: {
                        modestbranding: 1,
                        origin: window.location.origin,
                        rel: 0 // Prevents showing related videos
                    }
                }}
                style={{ position: 'absolute', top: 0, left: 0 }}
            />
        </div>
    );
} 