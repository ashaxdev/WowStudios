'use client';
import type { Metadata } from 'next';
import PublicLayout from '@/components/layout/PublicLayout';
import AIChatbot from '@/components/chatbot/AIChatbot';
import PortfolioClient from './PortfolioClient';

// export const metadata: Metadata = {
//   title: 'Portfolio – Our Photography Work',
//   description: 'Browse our photography portfolio — maternity, newborn, birthday, pre-wedding, family and corporate shoots. See why we are rated 4.9★ in Tirunelveli.',
// };

export default function PortfolioPage() {
  return (
    <PublicLayout>
      <PortfolioClient />
      <AIChatbot />
    </PublicLayout>
  );
}
