import NavBar from '@/app/components/NavBar';
import { Toaster } from 'sonner';
import { VT323 } from 'next/font/google';

import '../styles/globals.css';
import { ThemeProvider } from './components/theme-provider';
import ToggleButton from './components/Theme/ToggleButton';

// const inter = Inter({ subsets: ["latin"] });
const vt = VT323({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const metadata = {
  title: 'unchess',
  description: 'Play Chess online.',
  openGraph: {
    title: 'unchess',
    description: 'Play Chess online.',
    url: 'unchess.vercel.app',
    siteName: 'unchess',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: false,
    nocache: true,
    noarchive: true,
  },
  icons: {
    icon: [
      { type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
      { type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL(
    process.env.VERCEL ? 'unchess.vercel.app' : 'http://localhost:3000'
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={vt.className}>
      <body className="container-white dark:container ">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <div className="">{children}</div>
          <ToggleButton /> {/* Place the ToggleButton component here */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
