import { ReactNode } from "react";
import "./globals.css";
import { Inter, Roboto_Mono } from "next/font/google";

export const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const robotoMonoFont = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Typing Race",
  description: "Simple typing game",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${interFont.variable} ${robotoMonoFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
