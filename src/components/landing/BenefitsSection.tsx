import React from 'react';
import { useNavigate } from 'react-router-dom';
import { funnelConfig } from '../../config/funnel.config';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const navigate = useNavigate();
  const {
    benefitsEyebrow,
    benefitsHeadingPrefix,
    benefitsHeadingHighlight,
    benefitsList,
    benefitsSupporting,
    benefitsCtaText,
  } = funnelConfig.landingPage;

  return (
    <section id="outcomes" className="w-full max-w-full overflow-hidden bg-[#133E2B] text-white py-14 sm:py-24 my-6 sm:my-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Headline & Supporting (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-200 uppercase">
              {benefitsEyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mt-2 sm:mt-3 leading-tight break-words">
              {benefitsHeadingPrefix}{' '}
              <span className="text-brand-200 block sm:inline">{benefitsHeadingHighlight}</span>
            </h2>
            <p className="mt-5 text-sm sm:text-base text-brand-100/80 leading-relaxed">
              {benefitsSupporting}
            </p>

            {/* Contextual CTA on desktop */}
            <div className="mt-8 hidden lg:block">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate('/intent')}
                className="bg-white hover:bg-brand-50 text-brand-950 font-semibold border-none group"
              >
                <span>{benefitsCtaText}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right Column: Editorial Vertical Benefit List with Dividers (7 cols) - NO CARDS */}
          <div className="lg:col-span-7 divide-y divide-brand-800/80 border-t border-b border-brand-800/80">
            {benefitsList.map((benefit, idx) => (
              <div
                key={benefit.id}
                className="py-6 flex items-start gap-4"
              >
                <span className="text-xs font-mono font-bold text-brand-300 shrink-0 mt-1">
                  0{idx + 1}
                </span>
                <div className="text-base sm:text-lg font-bold text-white leading-snug">
                  {benefit.text}
                </div>
              </div>
            ))}
          </div>

          {/* Contextual CTA on mobile */}
          <div className="lg:hidden col-span-1 mt-4">
            <Button
              size="lg"
              variant="secondary"
              fullWidth
              onClick={() => navigate('/intent')}
              className="bg-white hover:bg-brand-50 text-brand-950 font-semibold border-none group"
            >
              <span>{benefitsCtaText}</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
