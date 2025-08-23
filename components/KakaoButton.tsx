"use client";

import axios from "axios";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function KakaoButton() {
  const handleClick = async () => {
    const response = await axios.get("/api/oauth2/login");
    redirect(response.data);
  };

  return (
    <button className="w-full h-12 rounded-lg" onClick={handleClick}>
      <Image
        src="/kakao_login_large_wide.png"
        alt="Kakao"
        width={400}
        height={100}
        className="w-full h-full"
      />
    </button>
  );
}
