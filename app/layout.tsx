import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PriceDrop NG',
  description: "Nigeria's leading market intelligence and marketplace platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0F172A] text-white">{children}</body>
    </html>
  );
}