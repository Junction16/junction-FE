import Image from "next/image";
import Link from "next/link";

interface AttendanceCardProps {
  image?: string;
}

export default function AttendanceCard({ image }: AttendanceCardProps) {
  if (!image) {
    return (
      <div className="relative aspect-[3/4] items-center justify-center">
        <div className="absolute inset-0 items-center justify-center flex">
          <Image
            src="/blank-card.png"
            alt="attendance"
            width={200}
            height={200}
            className="object-cover rounded-md"
          />
        </div>
      </div>
    );
  }

  return (
    <Link href={`/card/${encodeURIComponent(image)}`} className="block">
      <div className="relative aspect-[3/4] items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200">
        {/* 보라색 배경 */}
        {image && (
          <div className="absolute inset-0 bg-[#E3E4FF] rounded-md m-2 border-4 border-gray-200 shadow-lg" />
        )}

        {/* 이미지 (조금 줄여서 배경이 보이게) */}
        <div className="absolute inset-1 items-center justify-center flex aspect-[3/4]">
          <Image
            src={`/${image}`}
            alt="attendance"
            width={120}
            height={120}
            className="object-cover rounded-md"
          />
        </div>
      </div>
    </Link>
  );
}
