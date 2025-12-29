import {
  HeroSection,
  CollectionsSection,
  ProcessSection,
  BenefitsSection,
  CtaSection,
  FeedbackSection,
} from '@/components/home';

export default function HomePage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <HeroSection />
      <CollectionsSection />
      <ProcessSection />
      <BenefitsSection />
      <CtaSection />
      <FeedbackSection />
    </div>
  );
}
