"use client";

import { useRouter } from "next/navigation";

interface CustomButtonProps {
  active: string;
  name: string;
  className?: string;
}

export default function CustomButton({
  active,
  name,
  className,
}: CustomButtonProps) {
  const router = useRouter();

  const onClick = () => {
    switch (active) {
      case "logout":
        localStorage.removeItem("accessToken");
        window.dispatchEvent(new Event("localStorageChange"));
        router.push("/");
        router.refresh();
        return;
    }
  };

  return (
    <button className={className} onClick={onClick}>
      {name}
    </button>
  );
}
