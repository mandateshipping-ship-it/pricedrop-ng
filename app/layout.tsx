import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PriceDrop NG',
  description: "Nigeria's leading market intelligence platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}