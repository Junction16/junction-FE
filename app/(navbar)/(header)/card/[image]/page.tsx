"use client";

import Shadow from "@/public/shadow.svg";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function CardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const imageUrl = decodeURIComponent(params.image as string) || "";
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/${imageUrl}`);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = imageUrl; // 파일명으로 다운로드
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      const response = await fetch(`/${imageUrl}`);
      const blob = await response.blob();

      const file = new File([blob], imageUrl, { type: blob.type });

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          title: "404Found 이미지",
          text: "404Found에서 발견한 이미지를 공유합니다!",
          files: [file],
        });
      } else if (navigator.share) {
        const currentUrl = window.location.href;
        await navigator.share({
          title: "404Found 이미지",
          text: "404Found에서 발견한 이미지를 공유합니다!",
          url: currentUrl,
        });
      } else {
        const currentUrl = window.location.href;
        await navigator.clipboard.writeText(currentUrl);
        alert("이미지 페이지 링크가 클립보드에 복사되었습니다!");
      }
    } catch (error) {
      console.error("Share error:", error);
      // 오류 발생 시 폴백으로 클립보드 복사
      try {
        const currentUrl = window.location.href;
        await navigator.clipboard.writeText(currentUrl);
        alert("이미지 페이지 링크가 클립보드에 복사되었습니다!");
      } catch (clipboardError) {
        alert("공유 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="w-screen max-w-[430px] -m-4">
      <div className="w-full without-navbar-height bg-gradient-to-t from-[#D7DCFF] to-[#FAFAFA] flex flex-col">
        <div className="flex-grow flex items-center justify-center overflow-hidden p-4">
          <div className="relative w-full h-full">
            <Image
              src={`/${imageUrl}`}
              alt="Card detail"
              fill
              className="object-contain select-none pointer-events-none"
              priority
            />
            <Shadow className="absolute bottom-26 sm:bottom-50 left-1/2 transform -translate-x-1/2 w-1/2" />
          </div>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="flex flex-shrink-0 gap-4 px-4 pb-10 text-primary">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full py-4 bg-white font-semibold rounded-xl shadow-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "저장 중..." : "저장하기"}
          </button>

          <button
            onClick={handleShare}
            className="w-full py-4 text-white font-semibold rounded-xl shadow-lg bg-primary hover:bg-primary/80 transition-colors"
          >
            공유하기
          </button>
        </div>
      </div>
    </div>
  );
}
