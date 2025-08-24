import Logo from "@/public/logo.svg";
import { Metadata, Viewport } from "next";
import Image from "next/image";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#FAFAFA",

  initialScale: 1,
  viewportFit: "cover",
  width: "device-width",
  height: "device-height",
};

export const metadata: Metadata = {
  title: "Lingo Clips",
  description: "Lingo Clips",
  appleWebApp: {
    capable: true,
    title: "Lingo Clips",
    statusBarStyle: "default",
    startupImage: [
      {
        url: "https://junction-fe-one.vercel.app/splash-640x1136.png",
        media:
          "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "https://junction-fe-one.vercel.app/splash-750x1334.png",
        media:
          "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "https://junction-fe-one.vercel.app/splash-1125x2436.png",
        media:
          "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "https://junction-fe-one.vercel.app/splash-1170x2532.png",
        media:
          "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "https://junction-fe-one.vercel.app/splash.png",
      },
    ],
  },
  icons: {
    apple: "/apple-icon.png",
  },
  other: { "apple-mobile-web-app-capable": "yes" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      {/* {/* <body className="w-full min-h-screen bg-gray-100 flex items-center justify-center"> */}
      <body className="w-full min-h-screen bg-gray-100 flex items-center justify-center sm:justify-start">
        {/* Animated background */}
        <div
          className="hidden sm:block sm:absolute bg-gradient-animation z-0"
          style={{
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            backgroundImage: "url(/bg.png)",
            backgroundSize: "120% 120%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            animation: "slowRandomMove 10s ease-in-out forwards",
          }}
        />

        <div className="hidden sm:flex sm:w-1/2 flex-col justify-center items-center z-10 h-screen gap-[80px] ml-[200px]">
          <div className="w-[400px] flex items-center justify-center">
            <Logo width={300} height={100} className="w-full h-full" />
          </div>
          <div className="aspect-square flex flex-shrink-0 items-center justify-center">
            <Image
              src="/Character_Full_02.png"
              alt="image"
              width={400}
              height={400}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        {/* <div className="w-full sm:w-[430px] bg-white h-screen shadow-lg"> */}
        <div className="relative w-full sm:w-1/2 bg-white h-screen shadow-lg sm:z-10 sm:max-w-[430px]">
          {children}
        </div>
      </body>
    </html>
  );
}
