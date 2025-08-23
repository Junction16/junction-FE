"use client";

import { getClip } from "@/app/api/endpoints/s-3-controller/s-3-controller";
import { ClipVideoResDTO } from "@/app/api/model";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ClipCard() {
  const [list, setList] = useState<ClipVideoResDTO[]>([]);

  useEffect(() => {
    const fetchList = async () => {
      const response = await getClip({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response.data.clipVideoResList) {
        setList(response.data.clipVideoResList);
      }
    };
    fetchList();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {list.map((item) => (
        <div className="relative h-48 rounded-2xl overflow-hidden">
          <Image src="/archive-mock.png" alt="archive" fill />
          <div className="relative h-full flex items-center justify-center">
            <div className="text-white text-lg font-medium"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
