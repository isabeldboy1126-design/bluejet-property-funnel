import React from 'react';
import { useNavigate } from 'react-router-dom';
import { funnelConfig } from '../../config/funnel.config';
import { PillBadge } from '../ui/PillBadge';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { landingPage } = funnelConfig;

  return (
    <section className="relative pt-8 pb-10 sm:pt-12 sm:pb-14 px-4 sm:px-6 max-w-5xl mx-auto text-center w-full overflow-hidden">
      {/* Subtle ambient warm glow constrained to container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div
          aria-hidden="true"
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-[600px] max-w-full h-[320px] bg-gradient-to-b from-amber-100/35 via-brand-50/20 to-transparent blur-3xl"
        />
      </div>

      {/* Pill Badge above Headline */}
      <div className="flex justify-center mb-4">
        <PillBadge dotColor="amber">
          {landingPage.announcementPill}
        </PillBadge>
      </div>

      {/* Headline: ~54px Desktop, ~34px Mobile with tight leading around 0.98 */}
      <h1 className="text-[28px] min-[360px]:text-[34px] sm:text-[44px] md:text-[54px] font-extrabold tracking-tight text-ink-dark max-w-4xl mx-auto leading-[1.05] sm:leading-[0.98] break-words">
        {landingPage.headlinePrefix}{' '}
        <span className="text-[#133E2B]">
          {landingPage.headlineHighlight}
        </span>
        <span className="block mt-1 sm:mt-1.5 text-ink-dark">
          {landingPage.headlineSuffix}
        </span>
      </h1>

      {/* Supporting Copy */}
      <p className="mt-4 sm:mt-5 text-sm sm:text-base text-ink-muted max-w-2xl mx-auto font-normal leading-relaxed">
        {landingPage.supportingText}
      </p>

      {/* Value / Checkmark Row */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-y-2 gap-x-4 sm:gap-x-6 text-xs sm:text-sm font-medium text-ink-dark">
        {landingPage.valuePoints.map((point, index) => (
          <div key={index} className="inline-flex items-center gap-1.5">
            <span className="text-[#133E2B] font-bold shrink-0">✓</span>
            <span>{point}</span>
            {index < landingPage.valuePoints.length - 1 && (
              <span className="hidden sm:inline text-surface-border ml-4">|</span>
            )}
          </div>
        ))}
      </div>

      {/* Centered Main CTA */}
      <div className="mt-6 sm:mt-7 flex flex-col items-center w-full px-2">
        <Button
          size="lg"
          onClick={() => navigate('/intent')}
          className="shadow-md hover:shadow-lg group text-sm sm:text-base px-6 sm:px-8 py-3.5 max-w-full"
        >
          <span>{landingPage.mainCtaText}</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform shrink-0" />
        </Button>

        {/* Small CTA Microcopy */}
        <p className="mt-2 text-xs text-ink-subtle">
          {landingPage.ctaMicrocopy}
        </p>
      </div>

      {/* Visually Lightweight Trust / Proof Row (Above the Fold) */}
      <div className="mt-8 pt-5 sm:mt-9 sm:pt-6 border-t border-surface-border/60 max-w-2xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-surface-border/60">
          {landingPage.heroProof.map((item, idx) => (
            <div key={idx} className="pt-2 sm:pt-0 sm:px-3">
              <div className="text-xs sm:text-sm font-extrabold text-[#133E2B] tracking-wider font-mono uppercase">
                {item.metric}
              </div>
              <div className="text-[11px] sm:text-xs text-ink-muted mt-0.5 leading-tight">
                {item.explanation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
