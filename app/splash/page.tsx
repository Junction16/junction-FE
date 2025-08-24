"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Splash() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  // 2초 뒤 페이드아웃 시작, 0.5초 후 페이지 이동
  useEffect(() => {
    setTimeout(() => {
      setFadeOut(false);
      setTimeout(() => {
        router.push("/");
      }, 500);
    }, 1000);
  }, [router]);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src="/splash.png"
          priority
          alt="splash"
          width={1242}
          height={2688}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
