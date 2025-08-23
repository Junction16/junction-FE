"use client";

import { RandomHomeResDTO } from "@/app/api/model";
import Chat from "@/public/chat.svg";
import NullHeart from "@/public/null-heart.svg";
import Send from "@/public/send.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  video: RandomHomeResDTO & { likes: number; comments: number; shares: number };
  isActive: boolean;
}

export default function VideoPlayer({ video, isActive }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);

  const isPlaying = isActive && !userPaused;

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isPlaying) {
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.error("Autoplay failed:", err);
          setUserPaused(true);
        });
      }
    } else {
      videoElement.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isActive) {
      setUserPaused(false);
    }
  }, [isActive]);

  const togglePlayPause = () => {
    setUserPaused(!userPaused);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleLikeClick = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      setShowLikeAnimation(true);
      setTimeout(() => setShowLikeAnimation(false), 1000);
    } else {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    }
  };

  return (
    <div className="relative w-full h-full bg-black">
      {/* 비디오 */}
      <video
        ref={videoRef}
        className={`w-full without-navbar-height self-start object-cover transition-all duration-300 ${userPaused ? "filter brightness-50 blur-sm" : ""}`}
        src={video.videoUrl}
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        onClick={togglePlayPause}
      />

      {/* 재생/일시정지 오버레이 */}
      {userPaused && (
        <div
          className="absolute inset-0 flex items-center justify-center bottom-[74px] animate-fade-in"
          onClick={togglePlayPause}
        >
          <span className="text-white text-2xl font-bold tracking-wider px-4 text-shadow-lg flex flex-col gap-3">
            {video.chat?.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </span>
        </div>
      )}

      {/* 하단 왼쪽 정보 */}
      <div className="absolute bottom-24 left-4 right-20 z-40">
        {/* 사용자 정보 */}
        <div className="flex items-center space-x-2 mb-3">
          <Image
            src={video.profile || "/profile.png"}
            alt="profile"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-white text-base">
            {video.name || "Anonymous"}
          </span>
        </div>
      </div>

      {/* 오른쪽 사이드바 - 네비게이션 */}
      <div className="absolute right-4 bottom-38 z-50 flex flex-col space-y-6">
        {/* 액션 버튼들 */}
        <div className="flex flex-col items-center space-y-6">
          {/* 좋아요 */}
          <div className="flex flex-col items-center relative">
            <button
              className="w-8 h-8 flex items-center justify-center relative"
              onClick={handleLikeClick}
            >
              {isLiked ? (
                <svg
                  className="w-8 h-8 text-red-500 animate-bounce"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <NullHeart stroke="white" />
              )}
              {showLikeAnimation && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-red-500 animate-ping"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              )}
            </button>
            <span className="text-white text-xs font-semibold">
              {likeCount.toLocaleString()}
            </span>
          </div>

          {/* 댓글 */}
          <div className="flex flex-col items-center">
            <button className="w-8 h-8 flex items-center justify-center">
              <Chat stroke="white" />
            </button>
            <span className="text-white text-xs font-semibold">
              {(video.comments || 0).toLocaleString()}
            </span>
          </div>

          {/* 공유 */}
          <div className="flex flex-col items-center">
            <button className="w-8 h-8 flex items-center justify-center">
              <Send stroke="white" />
            </button>
            <span className="text-white text-xs font-semibold">
              {(video.shares || 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* 음소거 버튼 */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 z-40 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
      >
        {isMuted ? (
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴ
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </button>
    </div>
  );
}
