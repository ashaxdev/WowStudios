'use client';
import type { Metadata } from 'next';
import PublicLayout from '@/components/layout/PublicLayout';
import ContactClient from './ContactClient';
import AIChatbot from '@/components/chatbot/AIChatbot';

// export const metadata: Metadata = {
//   title: 'Contact Us – Book Your Session',
//   description: 'Get in touch with Wow Shotz Studio. Book your photography session, ask about packages, or visit us at Tirunelveli. Call 096558 37868.',
// };

export default function ContactPage() {
  return (
    <PublicLayout>
      <ContactClient />
      <AIChatbot />
    </PublicLayout>
  );
}
