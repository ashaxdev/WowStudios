'use client';
import type { Metadata } from 'next';
import PublicLayout from '@/components/layout/PublicLayout';
import BlogClient from './BlogClient';
import AIChatbot from '@/components/chatbot/AIChatbot';

// export const metadata: Metadata = {
//   title: 'Blog – Photography Tips & Stories',
//   description: 'Photography tips, behind-the-scenes stories, and inspiration from Wow Shotz Studio in Tirunelveli.',
// };

export default function BlogPage() {
  return (
    <PublicLayout>
      <BlogClient />
      <AIChatbot />
    </PublicLayout>
  );
}
