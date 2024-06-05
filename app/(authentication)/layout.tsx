import { Inter } from 'next/font/google';
import '../globals.css';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Authentication - Petopia',
  description: 'Nền tảng nhận nuôi thú cưng trực tuyến',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body test-id="authentication-layout" className={inter.className}>
        {children}
      </body>
    </html>
  );
}
