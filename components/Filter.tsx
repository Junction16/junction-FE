"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface FilterOption {
  id: string;
  label: string;
}

const filterOptions: FilterOption[] = [
  { id: "all", label: "All" },
  { id: "exercise", label: "운동" },
  { id: "outing", label: "소풍" },
  { id: "exam", label: "시험" },
  { id: "study", label: "공부" },
  { id: "running", label: "달리기" },
];

export default function Filter() {
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("filter") || "all";
  const router = useRouter();

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("filter", filter);
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <div className="flex items-start justify-start gap-3 overflow-x-auto scrollbar-hide pb-8">
        {filterOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleFilter(option.id)}
            className={`
              px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0
              ${
                activeFilter === option.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
