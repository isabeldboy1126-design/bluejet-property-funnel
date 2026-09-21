import React from 'react';
import { useNavigate } from 'react-router-dom';
import { funnelConfig } from '../../config/funnel.config';
import { Button } from '../ui/Button';
import { ArrowRight, Quote } from 'lucide-react';

export const CompanySocialProofSection: React.FC = () => {
  const navigate = useNavigate();
  const {
    showSocialProof,
    socialProofEyebrow,
    socialProofHeadingPrefix,
    socialProofHeadingHighlight,
    socialProofSupporting,
    socialProofReviews,
    socialProofCtaText,
  } = funnelConfig.landingPage;

  if (!showSocialProof || !socialProofReviews || socialProofReviews.length === 0) {
    return null;
  }

  const featured = socialProofReviews[0];
  const remaining = socialProofReviews.slice(1);

  return (
    <section id="social-proof" className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 border-t border-surface-border/60 w-full">
      {/* Editorial Header with Green Emphasis */}
      <div className="max-w-2xl mb-10 sm:mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#133E2B]">
          {socialProofEyebrow}
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink-dark tracking-tight mt-2 leading-tight break-words">
          {socialProofHeadingPrefix}{' '}
          <span className="text-[#133E2B]">{socialProofHeadingHighlight}</span>
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
          {socialProofSupporting}
        </p>
      </div>

      {/* Editorial Asymmetric Layout: 1 Featured Quote + 2 Side Quotes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        {/* Featured Quote (7 cols) */}
        {featured && (
          <div className="lg:col-span-7 p-5 sm:p-8 rounded-2xl bg-surface-card border border-surface-border shadow-subtle flex flex-col justify-between">
            <div>
              <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-[#133E2B]/30 mb-3 sm:mb-4" />
              <blockquote className="text-sm sm:text-lg text-ink-dark font-medium leading-relaxed italic break-words">
                {featured.review}
              </blockquote>
            </div>
            <div className="mt-5 sm:mt-6 pt-4 border-t border-surface-border text-xs font-mono font-bold text-[#133E2B] uppercase tracking-wider">
              {featured.author}
            </div>
          </div>
        )}

        {/* Supporting Quotes (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6 justify-between">
          {remaining.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-6 rounded-2xl bg-surface-light border border-surface-border flex flex-col justify-between"
            >
              <blockquote className="text-xs sm:text-sm text-ink-dark leading-relaxed italic break-words">
                {item.review}
              </blockquote>
              <div className="mt-3 sm:mt-4 pt-3 border-t border-surface-border/60 text-[11px] font-mono font-bold text-[#133E2B] uppercase tracking-wider">
                {item.author}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contextual CTA */}
      <div className="mt-10 flex justify-center">
        <Button
          size="md"
          variant="outline"
          onClick={() => navigate('/intent')}
          className="group text-xs sm:text-sm font-semibold"
        >
          <span>{socialProofCtaText}</span>
          <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};
