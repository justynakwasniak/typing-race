import { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Typing Race',
  description: 'Simple typing game',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style ={{ fontFamily: "var(--font-sans)" }}>
        {children}
      </body>
    </html>
  );
}