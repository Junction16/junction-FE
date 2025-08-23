import Filter from "@/components/Filter";
import RightArrow from "@/public/right-arrow.svg";
import Image from "next/image";
import Link from "next/link";

export default async function DialoguePage({
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

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Dialogue 학습</h2>
          <span className="text-sm text-right text-gray-500">
            {"전체보기 >"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link href={`/dialogue/synonym`}>
            <div className="relative flex flex-col p-4 rounded-3xl w-full h-full aspect-square items-center justify-center bg-[#D7DCFF] gap-2">
              <Image
                src={"/check.png"}
                alt={"동의어 고르기"}
                width={120}
                height={120}
                className="p-2"
              />
              <label className="text-sm px-4 py-1 bg-white/70 rounded-xl">
                동의어 고르기
              </label>
            </div>
          </Link>
          <Link href={`/dialogue/blank`}>
            <div className="relative flex flex-col p-4 rounded-3xl w-full h-full aspect-square items-center justify-center bg-[#D7DCFF] gap-2">
              <Image
                src={"/plus.png"}
                alt={"빈칸 채우기"}
                width={120}
                height={120}
              />
              <label className="text-sm px-4 py-1 bg-white/70 rounded-xl">
                빈칸 채우기
              </label>
            </div>
          </Link>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">와옹이 추천 단어장</h2>
        <span className="text-sm text-right text-gray-500">{"전체보기 >"}</span>
      </div>

      <div className="flex flex-col gap-4">
        {content
          .filter((item) => {
            if (activeFilter === "all") return true;
            return item.category === activeFilter;
          })
          .map((item) => (
            <Link
              key={item.name}
              href={`/voca/${item.category}`}
              className="flex w-full rounded-3xl px-4 py-3 bg-[#D9D9D9] gap-4 justify-between"
            >
              <div className="flex flex-row gap-4">
                <div className="flex rounded-full bg-white p-3 aspect-square items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="object-contain aspect-square"
                  />
                </div>
                <div className="flex items-center">
                  <p className="text-sm">{item.name}</p>
                </div>
              </div>
              <div className="flex items-center justify-center px-2">
                <RightArrow className="w-6 h-6" alt="right-arrow" />
              </div>
            </Link>
          ))}
      </div>
    </main>
  );
}
