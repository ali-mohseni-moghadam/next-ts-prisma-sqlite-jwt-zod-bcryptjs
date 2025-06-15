import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "@/styles/globals.css";

const vazir = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "مدیریت وظایف",
  description: "مدیریت وظایف با Next.js و Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${vazir.variable} antialiased bg-gray-100 text-gray-900 font-vazir`}
      >
        {children}
      </body>
    </html>
  );
}
