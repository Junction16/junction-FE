"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CustomLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // 초기 토큰 확인
    if (typeof localStorage !== "undefined") {
      setToken(localStorage.getItem("accessToken"));
    }

    // localStorage 변경사항 감지
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "accessToken") {
        setToken(e.newValue);
      }
    };

    // 같은 탭에서의 localStorage 변경사항 감지를 위한 커스텀 이벤트
    const handleCustomStorageChange = () => {
      if (typeof localStorage !== "undefined") {
        setToken(localStorage.getItem("accessToken"));
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageChange", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "localStorageChange",
        handleCustomStorageChange
      );
    };
  }, []);

  return (
    <Link href={token ? href : "/login"} className={className}>
      {children}
    </Link>
  );
}
