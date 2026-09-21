import React from 'react';
import { useNavigate } from 'react-router-dom';
import { funnelConfig } from '../../config/funnel.config';
import { ArrowRight } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const navigate = useNavigate();
  const {
    problemEyebrow,
    problemHeadingPrefix,
    problemHeadingHighlight,
    problems,
  } = funnelConfig.landingPage;

  return (
    <section id="problems" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 border-t border-surface-border/60 w-full">
      {/* Section Header with Green Emphasis */}
      <div className="max-w-3xl mb-10 sm:mb-14">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#133E2B]">
          {problemEyebrow}
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink-dark tracking-tight mt-2 leading-tight break-words">
          {problemHeadingPrefix}{' '}
          <span className="text-[#133E2B]">{problemHeadingHighlight}</span>
        </h2>
      </div>

      {/* 3 Problem Columns: SIDE BY SIDE on Desktop, Stacked on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 divide-y md:divide-y-0 md:divide-x divide-surface-border">
        {problems.map((item, idx) => (
          <div
            key={item.id}
            className={`flex flex-col justify-between pt-6 md:pt-0 ${
              idx > 0 ? 'md:pl-8 lg:pl-10' : ''
            }`}
          >
            <div>
              {/* Number / Category Label */}
              <div className="text-xs font-mono font-bold tracking-wider text-[#133E2B] pb-3 mb-4 border-b border-surface-border">
                {item.label}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-ink-dark leading-snug mb-4">
                {item.title}
              </h3>

              {/* Consequence Block */}
              <div className="mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-800/80 block mb-1">
                  The Risk:
                </span>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {item.consequence}
                </p>
              </div>

              {/* Solution Block */}
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#133E2B] block mb-1">
                  How This Guide Helps:
                </span>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {item.solution}
                </p>
              </div>
            </div>

            {/* Contextual CTA for this column */}
            <div className="pt-4 border-t border-surface-border/60 mt-auto">
              <button
                type="button"
                onClick={() => navigate('/intent')}
                className="inline-flex items-center text-xs font-bold text-[#133E2B] hover:text-brand-950 group cursor-pointer"
              >
                <span>{item.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
