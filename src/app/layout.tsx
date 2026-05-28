import type { Metadata } from 'next';
import { AppProvider } from '@/context/AppContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'NihonPath — Learn Real Japanese',
  description: 'Master speaking, kanji, listening, grammar, and JLPT with premium structured immersion.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth dark">
      <body className="bg-neutral-50 text-neutral-900 dark:bg-[#09090b] dark:text-neutral-50 min-h-screen font-sans antialiased transition-colors duration-300">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
