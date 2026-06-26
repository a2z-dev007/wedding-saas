"use client";

import { CurtainLoader } from "@/components/ui/curtain-loader";
import { HeroSection } from "@/components/marketing/hero-section";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { ShowcaseSection } from "@/components/marketing/showcase-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { TemplatesPreviewSection } from "@/components/marketing/templates-preview-section";
import { ComparisonSection } from "@/components/marketing/comparison-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { PricingSection } from "@/components/marketing/pricing-section";
import { FaqSection, CtaSection } from "@/components/marketing/faq-section";

export default function Home() {
  return (
    <div className="bg-[#FCFBF7]">
      <CurtainLoader />
      <HeroSection />
      <HowItWorksSection />
      <ShowcaseSection />
      <FeaturesSection />
      <TemplatesPreviewSection />
      <ComparisonSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
