import React from 'react';
import { funnelConfig } from '../../config/funnel.config';
import { useFunnel } from '../../context/FunnelContext';
import { ArrowRight, Calendar } from 'lucide-react';

export const CompanyAuthoritySection: React.FC = () => {
  const { openInspectionModal } = useFunnel();
  const {
    companyEyebrow,
    companyHeadingPrefix,
    companyHeadingHighlight,
    companyBody,
    companyProofItems,
  } = funnelConfig.landingPage;

  return (
    <section id="authority" className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-surface-border/60 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* Left Column: Editorial Heading & Introduction (7 cols) */}
        <div className="lg:col-span-7">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#133E2B]">
            {companyEyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-dark tracking-tight mt-2 break-words">
            {companyHeadingPrefix}{' '}
            <span className="text-[#133E2B]">{companyHeadingHighlight}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-ink-muted leading-relaxed">
            {companyBody}
          </p>

          <div className="mt-5">
            <button
              type="button"
              onClick={() => openInspectionModal()}
              className="inline-flex items-center text-xs font-bold text-[#133E2B] hover:text-brand-950 transition-colors cursor-pointer group"
            >
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              <span>{funnelConfig.inspection.advisorCtaText}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: 2–3 Compact Proof Points (5 cols) */}
        <div className="lg:col-span-5 space-y-5 lg:border-l lg:border-surface-border lg:pl-10">
          {companyProofItems.map((item, idx) => (
            <div
              key={idx}
              className="pb-4 border-b border-surface-border/70 last:border-b-0 last:pb-0"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-[#133E2B] tracking-tight font-sans">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-ink-dark mt-0.5">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
