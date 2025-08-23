import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lingo Clips",
  description: "Lingo Clips",
  manifest: "/manifest.json",
  themeColor: "#ffffff",
  appleWebApp: {
    capable: true,
    title: "Lingo Clips",
    statusBarStyle: "black-translucent",
  },
  icons: {
    apple: "/apple-icon.png",
  },
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
