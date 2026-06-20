import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "A Special Question for My Love ❤️",
  description: "Will you go on a date with me? A question worth asking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased overflow-hidden`}
    >
      <body className="h-full bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white overflow-hidden">
        {children}
      </body>
    </html>
  );
}
