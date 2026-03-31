import type { Metadata } from 'next';
import { Share_Tech_Mono, Exo_2 } from 'next/font/google';
import './globals.css';

const shareTechMono = Share_Tech_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const exo2 = Exo_2({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JS DRILL — Interview Simulator',
  description:
    'JavaScript live coding interview drill app powered by DeepSeek AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${shareTechMono.variable} ${exo2.variable}`}
    >
      <body className="font-mono antialiased">{children}</body>
    </html>
  );
}
