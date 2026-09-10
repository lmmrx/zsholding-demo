'use client';

import { useState } from 'react';
import { PlayIcon } from './icons';
import type { VideoItem } from '@/lib/types';

function getYouTubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    // https://www.youtube.com/watch?v=VIDEO_ID
    if (
      parsedUrl.hostname === 'www.youtube.com' ||
      parsedUrl.hostname === 'youtube.com'
    ) {
      return parsedUrl.searchParams.get('v');
    }

    // https://youtu.be/VIDEO_ID
    if (parsedUrl.hostname === 'youtu.be') {
      return parsedUrl.pathname.substring(1);
    }

    // https://www.youtube.com/embed/VIDEO_ID
    if (parsedUrl.pathname.startsWith('/embed/')) {
      return parsedUrl.pathname.split('/embed/')[1];
    }

    return null;
  } catch {
    return null;
  }
}

export default function VideoCard({ video }: { video: VideoItem }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = getYouTubeVideoId(video.url);

  return (
    <div className="bg-paper border border-line rounded-xl overflow-hidden shadow-sm">
      <div className="aspect-video rounded-t-[10px] bg-gradient-to-br from-navy to-slate relative overflow-hidden">
        {isPlaying && videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={video.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
            {videoId && (
              <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            <div className="absolute inset-0 bg-black/25" />

            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label={`Play ${video.title}`}
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
            >
              <span className="w-[46px] h-[46px] rounded-full bg-white/15 border-[1.5px] border-white/50 flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110">
                <PlayIcon className="w-4 h-4 fill-white ml-0.5" />
              </span>
            </button>
          </>
        )}

        <div className="absolute bottom-2 right-2 bg-black/55 text-white font-mono text-[10px] px-1.5 py-0.5 rounded z-10">
          {video.duration}
        </div>
      </div>

      <div className="px-4 pt-3.5 pb-4">
        <h3 className="font-serif text-[15px] mb-1 text-ink">
          {video.title}
        </h3>

        <p className="text-xs text-ink-soft">
          {video.description}
        </p>
      </div>
    </div>
  );
}
