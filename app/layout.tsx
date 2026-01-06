import type { Metadata } from 'next';
import {
  Geist_Mono,
  Plus_Jakarta_Sans,
  Playfair_Display,
} from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
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
  title: 'Trăm Năm',
  description:
    'Nền tảng tạo thiệp mời đám cưới trực tuyến, cá nhân hóa nội dung, thiết kế tinh tế và chia sẻ dễ dàng.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="theme-light">
      <body
        suppressHydrationWarning
        className={`${jakarta.variable} ${playfair.variable} ${geistMono.variable} text-foreground min-h-screen antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
