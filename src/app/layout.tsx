import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["thai", "latin"],
  variable: "--font-kanit",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Link Shortener - ระบบย่อลิงก์ฟรี รวดเร็ว ทันสมัย",
  description: "บริการย่อลิงก์ออนไลน์ฟรี เปลี่ยนลิงก์ยาวๆ ให้สั้นกระชับ ใช้งานง่าย รวดเร็ว ปลอดภัย พร้อมระบบคัดลอกลิงก์อัตโนมัติ",
  keywords: ["link shortener", "ย่อลิงก์", "url shortener", "short link", "ลิงก์สั้น", "free link shortener"],
  authors: [{ name: "Link Shortener" }],
  creator: "Link Shortener",
  publisher: "Link Shortener",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Link Shortener - ระบบย่อลิงก์ฟรี",
    description: "บริการย่อลิงก์ออนไลน์ฟรี เปลี่ยนลิงก์ยาวๆ ให้สั้นกระชับ ใช้งานง่าย รวดเร็ว",
    url: 'http://localhost:3000',
    siteName: 'Link Shortener',
    locale: 'th_TH',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Link Shortener - ระบบย่อลิงก์ฟรี',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Link Shortener - ระบบย่อลิงก์ฟรี',
    description: 'บริการย่อลิงก์ออนไลน์ฟรี เปลี่ยนลิงก์ยาวๆ ให้สั้นกระชับ',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // เพิ่ม verification codes ของคุณที่นี่
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#a78bfa" />
      </head>
      <body className={kanit.className}>
        {children}
      </body>
    </html>
  );
}
