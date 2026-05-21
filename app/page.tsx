import type { Metadata } from 'next';
import PublicLayout from '@/components/layout/PublicLayout';
import HeroSection from '@/components/sections/HeroSection';
import MarqueeSection from '@/components/sections/MarqueeSection';
import StatsSection from '@/components/sections/StatsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import FeaturedWork from '@/components/sections/FeaturedWork';
import AboutTeaser from '@/components/sections/AboutTeaser';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import AIChatbot from '@/components/chatbot/AIChatbot';

export const metadata: Metadata = {
  title: 'Wow Shotz Studio – Premium Photography in Tirunelveli',
  description: "Tirunelveli's most loved photography studio with 4.9★ rating. Maternity, newborn, birthday, pre-wedding, family and corporate photography.",
};

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      {/* <MarqueeSection /> */}
      <StatsSection />
      <ServicesSection />
      <FeaturedWork />
      <AboutTeaser />
      <TestimonialsSection />
      <AIChatbot />
    </PublicLayout>
  );
}
