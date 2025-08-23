"use client";

import { getClip } from "@/app/api/endpoints/s-3-controller/s-3-controller";
import { vocaSelect } from "@/app/api/endpoints/voca-controller/voca-controller";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface StatsSelectorProps {
  selectedStat: string;
}

export default function StatsSelector({ selectedStat }: StatsSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stat = searchParams.get("stat") || "vocabulary";

  const [stats, setStats] = useState<
    { key: string; label: string; count: number }[]
  >([
    { key: "vocabulary", label: "단어장", count: 0 },
    { key: "collection", label: "클립", count: 0 },
    { key: "attendance", label: "와움도감", count: 0 },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      const [r1, r2] = await Promise.all([
        getClip({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }),
        vocaSelect(
          {
            vocaType: "exam",
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        ),
      ]);
      setStats([
        { key: "vocabulary", label: "단어장", count: r2.data.vocaSize ?? 0 },
        { key: "collection", label: "클립", count: r1.data.videoCnt ?? 0 },
        { key: "attendance", label: "와움도감", count: 5 },
      ]);
    };
    fetchStats();
  }, []);

  const handleStatClick = (statKey: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("stat", statKey);
    router.push(`/my?${params.toString()}`);
  };

  return (
    <div className="flex justify-between py-4">
      {stats.map((stat) => {
        const isSelected = selectedStat === stat.key;
        return (
          <button
            key={stat.key}
            onClick={() => handleStatClick(stat.key)}
            className={`flex-1 text-center cursor-pointer hover:bg-gray-100 transition-all duration-300 pb-2 border-b-2 ${
              isSelected ? "border-b-[#455cfb]" : "border-b-transparent"
            }`}
          >
            <div className="flex flex-col">
              <div
                className={`text-lg font-semibold ${
                  isSelected ? "text-[#455cfb]" : "text-black"
                }`}
              >
                {stat.count}
              </div>
              <div
                className={`relative ${
                  isSelected ? "text-[#455cfb]" : "text-[#646464]"
                }`}
              >
                {stat.label}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
