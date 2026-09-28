import type { Metadata, Viewport } from 'next';
import './globals.css';
import PwaInstallButton from '../components/PwaInstallButton';

export const viewport: Viewport = {
  themeColor: '#4B2D35',
};

export const metadata: Metadata = {
  title: 'TruGhar - Find Your True Home in Mumbai',
  description:
    'TruGhar matches Mumbai homebuyers to the right under-construction property based on commute, school proximity, and real affordability. MahaRERA verified. No cold calls.',
  keywords: 'Mumbai real estate, under construction, MahaRERA, property recommendation, home buying',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TruGhar',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,200;0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,200;1,9..144,300;1,9..144,400&family=Epilogue:wght@200;300;400;500&family=DM+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body>
        {children}
        <PwaInstallButton />
      </body>
    </html>
  );
}
