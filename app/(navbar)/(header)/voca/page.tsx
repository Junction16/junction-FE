import Filter from "@/components/Filter";
import Image from "next/image";
import Link from "next/link";

export default async function VocaPage({
  searchParams,
}: {
  searchParams: Promise<{ filter: string }>;
}) {
  const activeFilter = (await searchParams).filter || "all";

  const content: {
    name: string;
    image: string;
    category: string;
    color: string;
  }[] = [
    {
      name: "토익 900 목표",
      image: "/sparkle.png",
      category: "exam",
      color: "#E3E4FF",
    },
    {
      name: "아이엘츠 5.5",
      image: "/sphere.png",
      category: "outing",
      color: "#D9D9D9",
    },
    {
      name: "오픽 필수 문장",
      image: "/line.png",
      category: "exam",
      color: "#D9D9D9",
    },
    {
      name: "아이엘츠 6.5",
      image: "/star.png",
      category: "study",
      color: "#E3E4FF",
    },
    {
      name: "비즈니스 영어 단어",
      image: "/line.png",
      category: "study",
      color: "#E3E4FF",
    },
    {
      name: "헬스장 필수 문장",
      image: "/circle.png",
      category: "exercise",
      color: "#D9D9D9",
    },
  ];
  return (
    <main className="w-full flex flex-col gap-6">
      <Filter />

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">와옹이 추천 단어장</h2>
        <span className="text-sm text-right text-gray-500">{"전체보기 >"}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {content
          .filter((item) => {
            if (activeFilter === "all") return true;
            return item.category === activeFilter;
          })
          .map((item) => (
            <Link href={`/voca/${item.category}`}>
              <div
                key={item.name}
                className="relative flex flex-col p-4 rounded-xl w-full h-full aspect-square items-center justify-center"
                style={{ backgroundColor: item.color }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                />
                <label className="absolute bottom-4 left-4 text-sm px-4 py-1 bg-white/70 rounded-xl">
                  {item.name}
                </label>
              </div>
            </Link>
          ))}
      </div>
    </main>
  );
}
