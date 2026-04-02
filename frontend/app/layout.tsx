import type { Metadata } from 'next';
import {
  Share_Tech_Mono,
  Exo_2,
  Nunito,
  Pacifico,
  Caveat,
  Raleway,
  Lora,
  Quicksand,
} from 'next/font/google';
import { ThemeProvider } from '@/lib/ThemeContext';
import { AuthProvider } from '@/lib/AuthContext';
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

const nunito = Nunito({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-sour',
  display: 'swap',
});

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico',
  display: 'swap',
});

const caveat = Caveat({
  weight: ['400', '600', '700'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-caveat',
  display: 'swap',
});

const raleway = Raleway({
  weight: ['300', '400', '600', '700', '800'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-raleway',
  display: 'swap',
});

const lora = Lora({
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-lora',
  display: 'swap',
});

const quicksand = Quicksand({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JS DRILL — Interview Simulator',
  description: 'JavaScript live coding interview drill app powered by DeepSeek AI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVars = [
    shareTechMono.variable,
    exo2.variable,
    nunito.variable,
    pacifico.variable,
    caveat.variable,
    raleway.variable,
    lora.variable,
    quicksand.variable,
  ].join(' ');

  return (
    <html lang="ru" className={fontVars}>
      <body className="antialiased">
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
