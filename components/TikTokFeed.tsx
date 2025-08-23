"use client";

import { randomHome } from "@/app/api/endpoints/s-3-controller/s-3-controller";
import { RandomHomeResDTO } from "@/app/api/model";
import { useEffect, useRef, useState } from "react";
import VideoPlayer from "./VideoPlayer";

// 샘플 동영상 데이터
// const sampleVideos = [
//   {
//     id: 1,
//     videoUrl:
//       "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
//     user: {
//       username: "bigbuckbunny",
//       avatar: "https://picsum.photos/100/100?random=1",
//     },
//     description:
//       "Big Buck Bunny - 오픈 소스 단편 영화 🐰✨ #animation #opensource",
//     likes: 12500,
//     comments: 342,
//     shares: 89,
//     music: "Original Sound - bigbuckbunny",
//   },
//   {
//     id: 2,
//     videoUrl:
//       "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
//     user: {
//       username: "elephantsdream",
//       avatar: "https://picsum.photos/100/100?random=2",
//     },
//     description:
//       "Elephants Dream - 꿈속의 코끼리들 🐘💭 #surreal #art #animation",
//     likes: 8900,
//     comments: 156,
//     shares: 45,
//     music: "Dreamy Vibes - elephantsdream",
//   },
//   {
//     id: 3,
//     videoUrl:
//       "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
//     user: {
//       username: "blazemaker",
//       avatar: "https://picsum.photos/100/100?random=3",
//     },
//     description: "더 큰 불꽃을 위해 🔥🎆 #fire #spectacular #nature",
//     likes: 15600,
//     comments: 278,
//     shares: 112,
//     music: "Fire Beat - blazemaker",
//   },
//   {
//     id: 4,
//     videoUrl:
//       "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
//     user: {
//       username: "escapeartist",
//       avatar: "https://picsum.photos/100/100?random=4",
//     },
//     description: "더 큰 탈출을 꿈꾸며 🏃‍♂️💨 #escape #adventure #travel",
//     likes: 20100,
//     comments: 445,
//     shares: 203,
//     music: "Adventure Time - escapeartist",
//   },
//   {
//     id: 5,
//     videoUrl:
//       "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
//     user: {
//       username: "funlover",
//       avatar: "https://picsum.photos/100/100?random=5",
//     },
//     description: "더 큰 재미를 찾아서! 🎉🎊 #fun #party #goodvibes",
//     likes: 18700,
//     comments: 367,
//     shares: 156,
//     music: "Fun Times - funlover",
//   },
// ];

export default function TikTokFeed() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videos, setVideos] = useState<RandomHomeResDTO[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const windowHeight = container.clientHeight;

      // 현재 보이는 비디오 인덱스 계산
      const newIndex = Math.round(scrollTop / windowHeight);

      if (
        newIndex !== currentVideoIndex &&
        newIndex >= 0 &&
        newIndex < videos.length
      ) {
        setCurrentVideoIndex(newIndex);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [currentVideoIndex]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await randomHome();
      setVideos(response.data);
    };
    fetchVideos();
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* 상단 헤더 */}
      <div className="absolute top-0 left-0 right-0 z-50 flex justify-center items-center pt-12 pb-4">
        <div className="flex space-x-8">
          {/* <button className="text-white/70 text-lg font-medium"></button>
          <button className="text-white text-lg font-bold border-b-2 border-white pb-1">
            For You
          </button>
          <button className="text-white/70 text-lg font-medium">Liking</button> */}
        </div>
      </div>

      {/* 비디오 피드 */}
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {videos.map((video, index) => (
          <div
            key={index}
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
