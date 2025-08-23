import Image from "next/image";
import Link from "next/link";

export default function VocaCard() {
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
  ];

  return (
    <>
      {content.map((item) => (
        <Link
          href={`/my/voca/${item.category}`}
          key={item.name}
          className="relative flex flex-col p-4 rounded-xl w-full h-full aspect-square items-center justify-center"
          style={{ backgroundColor: item.color }}
        >
          <Image src={item.image} alt={item.name} width={100} height={100} />
          <label className="absolute bottom-4 left-4 text-sm px-4 py-1 bg-white/70 rounded-xl">
            {item.name}
          </label>
        </Link>
      ))}
    </>
  );
}
