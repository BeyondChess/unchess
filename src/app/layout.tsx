import NavBar from '@/app/components/NavBar';
import { Toaster } from 'sonner';
import '../styles/globals.css';
// const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body>
        <NavBar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
