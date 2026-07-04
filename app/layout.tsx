import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Wow Shotz Studio – Premium Photography in Tirunelveli', template: '%s | Wow Shotz Studio' },
  description: "Tirunelveli's most loved photography studio with 4.9★ rating. Specialising in maternity, newborn, birthday, pre-wedding, family and corporate photography.",
  keywords: ['photography studio tirunelveli','maternity photography','newborn photography','birthday photography tirunelveli','pre-wedding shoot','family photography','wow shotz studio'],
  authors: [{ name: 'Wow Shotz Studio' }],
  openGraph: {
    type: 'website', locale: 'en_IN', url: 'https://wowshotzstudio.com',
    siteName: 'Wow Shotz Studio',
    title: 'Wow Shotz Studio – Premium Photography in Tirunelveli',
    description: "Capturing precious memories with artistry and passion.",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Wow Shotz Studio' }],
  },
  twitter: { card: 'summary_large_image', title: 'Wow Shotz Studio', description: 'Premium Photography in Tirunelveli' },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://wowshotzstudio.com'),
   icons: { icon: '/favicon.ico' },
 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
