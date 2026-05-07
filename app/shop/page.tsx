'use client';
import type { Metadata } from 'next';
import PublicLayout from '@/components/layout/PublicLayout';
import ShopClient from './ShopClient';
import AIChatbot from '@/components/chatbot/AIChatbot';

// export const metadata: Metadata = {
//   title: 'Shop – Photo Prints & Albums',
//   description: 'Purchase premium photo prints, albums, and photography accessories from Wow Shotz Studio. Delivered across Tamil Nadu.',
// };

export default function ShopPage() {
  return (
    <PublicLayout>
      <ShopClient />
      <AIChatbot />
    </PublicLayout>
  );
}
