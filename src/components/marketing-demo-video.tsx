"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type MarketingDemoVideoProps = {
  posterSrc: string;
  videoSrc: string;
};

export function MarketingDemoVideo({
  posterSrc,
  videoSrc,
}: MarketingDemoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  function togglePlayback() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      void video.play();
      setIsPaused(false);
      return;
    }

    video.pause();
    setIsPaused(true);
  }

  return (
    <>
      <video
        ref={videoRef}
        className="h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        poster={posterSrc}
        aria-label="Away We Go app creating a travel book"
      >
        <source src={videoSrc} type="video/mp4" />
        Away We Go app demo.
      </video>
      <Image
        src={posterSrc}
        alt="Away We Go app creating a travel book"
        fill
        sizes="(min-width: 1024px) 56vw, 100vw"
        className="hidden object-cover motion-reduce:block"
      />
      <button
        type="button"
        aria-label={isPaused ? "Play demo video" : "Pause demo video"}
        aria-pressed={isPaused}
        onClick={togglePlayback}
        className="absolute bottom-4 right-4 hidden h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-black/45 text-white shadow-lg backdrop-blur transition hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/40 motion-safe:flex"
      >
        {isPaused ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 translate-x-0.5 fill-current"
          >
            <path d="M8 5.75v12.5L18 12 8 5.75Z" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-current"
          >
            <path d="M7 5.5h3.5v13H7v-13Zm6.5 0H17v13h-3.5v-13Z" />
          </svg>
        )}
      </button>
    </>
  );
}
