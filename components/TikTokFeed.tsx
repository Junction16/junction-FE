"use client";

import { randomHome } from "@/app/api/endpoints/s-3-controller/s-3-controller";
import { RandomHomeResDTO } from "@/app/api/model";
import { useEffect, useRef, useState } from "react";
import VideoPlayer from "./VideoPlayer";

export default function TikTokFeed() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videos, setVideos] = useState<RandomHomeResDTO[]>([]);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await randomHome();
        setVideos(response.data);
        videoRefs.current = Array(response.data.length).fill(null);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    if (videos.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = videoRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setCurrentVideoIndex(index);
            }
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // Trigger when 50% of the video is visible
      }
    );

    const currentRefs = videoRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [videos]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* 비디오 피드 */}
      <div
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {videos.map((video, index) => (
          <div
            key={index} // Using index as key, consider a more stable key if available e.g., video.id
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            className="relative w-full h-screen snap-start flex-shrink-0"
          >
            <VideoPlayer
              video={{
                ...video,
                likes: Math.floor(Math.random() * 50000) + 1000, // 1K ~ 51K
                comments: Math.floor(Math.random() * 5000) + 100, // 100 ~ 5.1K
                shares: Math.floor(Math.random() * 1000) + 50, // 50 ~ 1.05K
              }}
              isActive={index === currentVideoIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
