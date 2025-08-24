"use client";

import Chat from "@/public/chat.svg";
import Home from "@/public/home.svg";
import My from "@/public/my.svg";
import Voca from "@/public/voca.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CustomLink from "./CustomLink";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="absolute bottom-0 w-full sm:max-w-[430px] flex justify-between items-center p-8 sm:p-4 rounded-t-3xl bg-white h-[74px] shadow-lg">
      <Link
        href="/"
        className={`flex-1 flex flex-col items-center justify-center w-11 h-11 transition-all duration-300 ${
          pathname === "/" ? "text-primary" : "text-[#3B3940]"
        }`}
      >
        <Home stroke={pathname === "/" ? "var(--color-primary)" : "#3B3940"} />
        <p className="text-xs">Home</p>
      </Link>
      <CustomLink
        href="/voca"
        className={`flex-1 flex flex-col items-center justify-center w-11 h-11 transition-all duration-300 ${
          pathname === "/voca" ? "text-primary" : "text-secondary"
        }`}
      >
        <Voca
          stroke={pathname === "/voca" ? "var(--color-primary)" : "#3B3940"}
        />
        <p className="text-xs">Voca</p>
      </CustomLink>
      <CustomLink
        href="/dialogue"
        className={`flex-1 flex flex-col items-center justify-center w-11 h-11 transition-all duration-300 ${
          pathname === "/dialogue" ? "text-primary" : "text-secondary"
        }`}
      >
        <Chat
          stroke={pathname === "/dialogue" ? "var(--color-primary)" : "#3B3940"}
        />
        <p className="text-xs">Dialogue</p>
      </CustomLink>
      <CustomLink
        href="/my"
        className={`flex-1 flex flex-col items-center justify-center w-11 h-11 transition-all duration-300 ${
          pathname === "/my" ? "text-primary" : "text-secondary"
        }`}
      >
        <My stroke={pathname === "/my" ? "var(--color-primary)" : "#3B3940"} />
        <p className="text-xs">My page</p>
      </CustomLink>
    </nav>
  );
}
