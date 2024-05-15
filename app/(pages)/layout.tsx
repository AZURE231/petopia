import { Inter } from 'next/font/google';
import '../globals.css';
import { Navbar } from '@/src/components/nav';
import { Footer } from '@/src/components/general/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="mt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
