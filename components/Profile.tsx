"use client";

import { getMyPage } from "@/app/api/endpoints/user/user";
import { GetMyPageResDTO } from "@/app/api/model";
import Location from "@/public/location.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState<GetMyPageResDTO | null>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getMyPage({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setUser(response.data);
      setLoad(true);
    };
    fetchUser();
  }, []);

  return (
    <div className="flex items-center justify-center gap-3">
      {/* Profile Image */}
      <div className="w-32 aspect-[12/10] overflow-hidden flex-shrink-0 rounded-3xl">
        {load && (
          <Image
            src={user?.profile ?? "/my.png"}
            alt="프로필 이미지"
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Profile Info */}
      <div className="flex-1 flex flex-col justify-center gap-[4px]">
        <h1 className="text-lg font-bold text-black">{user?.name}</h1>
        <p className="text-secondary">{user?.email}</p>
        <div className="flex items-center gap-2 text-secondary">
          <Location className="w-6 h-6" fill="currentColor" />
          <span>Seoul, Korea</span>
        </div>
      </div>
    </div>
  );
}
