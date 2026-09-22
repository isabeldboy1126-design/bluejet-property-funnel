import React from 'react';
import { useNavigate } from 'react-router-dom';
import { funnelConfig } from '../../config/funnel.config';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

export const GuideContentsSection: React.FC = () => {
  const navigate = useNavigate();
  const {
    insideEyebrow,
    insideHeadingPrefix,
    insideHeadingHighlight,
    insideItems,
    insideCtaText,
  } = funnelConfig.landingPage;

  return (
    <section id="guide-contents" className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 border-t border-surface-border/60 w-full">
      {/* Editorial Section Header with Royal Blue Emphasis */}
      <div className="max-w-2xl mb-10 sm:mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#0052FF]">
          {insideEyebrow}
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink-dark tracking-tight mt-2 leading-tight break-words">
          {insideHeadingPrefix}{' '}
          <span className="text-[#0052FF]">{insideHeadingHighlight}</span>
        </h2>
      </div>

      {/* Numbered Editorial Content Rows (NO card grid) */}
      <div className="divide-y divide-surface-border border-t border-b border-surface-border">
        {insideItems.map((item) => (
          <div
            key={item.id}
            className="py-8 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-8 items-baseline"
          >
            {/* Number Column (2 cols) */}
            <div className="sm:col-span-2 text-sm font-mono font-bold text-[#0052FF]">
              {item.number}
            </div>

            {/* Title Column (5 cols) */}
            <div className="sm:col-span-5 text-base sm:text-lg font-bold text-ink-dark">
              {item.title}
            </div>

            {/* Explanation Column (5 cols) */}
            <div className="sm:col-span-5 text-xs sm:text-sm text-ink-muted leading-relaxed">
              {item.explanation}
            </div>
          </div>
        ))}
      </div>

      {/* Contextual CTA */}
      <div className="mt-10 flex justify-center">
        <Button
          size="md"
          variant="outline"
          onClick={() => navigate('/intent')}
          className="group text-xs sm:text-sm font-semibold"
        >
          <span>{insideCtaText}</span>
          <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};
