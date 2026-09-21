import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/landing/HeroSection';
import { CompanyAuthoritySection } from '../components/landing/CompanyAuthoritySection';
import { ProblemSection } from '../components/landing/ProblemSection';
import { BenefitsSection } from '../components/landing/BenefitsSection';
import { GuideContentsSection } from '../components/landing/GuideContentsSection';
import { CompanySocialProofSection } from '../components/landing/CompanySocialProofSection';
import { FinalCtaSection } from '../components/landing/FinalCtaSection';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface-light text-ink-dark">
      <Navbar />
      <main className="flex-grow">
        {/* 1. Hero + Above-the-fold credibility */}
        <HeroSection />

        {/* 2. Company Behind the Guide */}
        <CompanyAuthoritySection />

        {/* 3. Buyer Problem Section + Contextual CTAs */}
        <ProblemSection />

        {/* 4. Benefits Section + Contextual CTA */}
        <BenefitsSection />

        {/* 5. What’s Inside the Guide + Contextual CTA */}
        <GuideContentsSection />

        {/* 6. Optional Company Social Proof + Contextual CTA */}
        <CompanySocialProofSection />

        {/* 7. Final CTA */}
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
};
