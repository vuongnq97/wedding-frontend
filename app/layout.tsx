import type { Metadata } from 'next';
import {
  Geist_Mono,
  Plus_Jakarta_Sans,
  Playfair_Display,
} from 'next/font/google';
import './globals.css';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Blog App',
  description: 'Multi-language blog experience',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="theme-light">
      <body
        className={`${jakarta.variable} ${playfair.variable} ${geistMono.variable} text-foreground min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
