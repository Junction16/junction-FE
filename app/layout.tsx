import { Metadata, Viewport } from "next";
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
      <body className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full sm:w-[430px] bg-white h-screen shadow-lg">
          {children}
        </div>
      </body>
    </html>
  );
}
