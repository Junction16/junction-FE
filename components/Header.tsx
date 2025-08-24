"use client";

import Mic from "@/public/mic.svg";
import OutlineArrow from "@/public/out.svg";
import RightArrow from "@/public/right-arrow.svg";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
}

export default function Header({ title, showSearch }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="w-full h-12 flex items-center relative gap-4">
      <RightArrow
        width={30}
        height={58}
        className="rotate-180"
        onClick={() => router.back()}
      />

      {title && (
        <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-center">
          {title}
        </div>
      )}

      {showSearch && (
        <div className="w-full h-10 px-2 rounded-full bg-[#F0F0F0] text-secondary flex justify-between items-center">
          <input
            type="text"
            placeholder="단어를 검색해보세요"
            className="px-4 flex-1"
          />
          <Mic width={24} height={24} className="mr-1" />
        </div>
      )}

      {pathname.startsWith("/card/") && (
        <OutlineArrow className="w-6 h-10 ml-auto" />
      )}
    </nav>
  );
}
