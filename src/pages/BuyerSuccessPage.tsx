import React from 'react';
import { funnelConfig } from '../config/funnel.config';
import { useFunnel } from '../context/FunnelContext';
import { FocusHeader } from '../components/layout/FocusHeader';
import { Footer } from '../components/layout/Footer';
import { Card } from '../components/ui/Card';
import { CheckCircle2, ArrowRight, MessageSquare, ExternalLink } from 'lucide-react';

export const BuyerSuccessPage: React.FC = () => {
  const { latestLead } = useFunnel();
  const { buyerSuccess, company } = funnelConfig;

  const leadName = latestLead?.contact.firstName || '[FIRST NAME]';

  return (
    <div className="min-h-screen flex flex-col bg-surface-light text-ink-dark">
      <FocusHeader backTo="/" backLabel="Return to Home" />

      <main className="flex-grow max-w-3xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16 text-center">
        {/* Simple Top Confirmation */}
        <div className="mb-8 sm:mb-10">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-50 text-brand-800 flex items-center justify-center mx-auto mb-4 border border-brand-200 shrink-0">
            <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-[#133E2B]" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-dark tracking-tight break-words">
            {buyerSuccess.headingTemplate.replace('{name}', leadName)}
          </h1>

          <p className="mt-2 text-xs sm:text-base text-ink-muted">
            {buyerSuccess.body}
          </p>
        </div>

        {/* Normal Clean Grid: 2 Columns on Desktop, Stacked on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 text-left items-stretch">
          {/* Card 1: Primary Benefit-Oriented Website Bridge */}
          <Card className="p-5 sm:p-7 flex flex-col justify-between bg-surface-card border border-surface-border shadow-sm">
            <div>
              <span className="text-[11px] font-mono font-bold tracking-wider text-[#133E2B] uppercase block mb-2">
                {buyerSuccess.bridgeEyebrow}
              </span>

              <h2 className="text-base sm:text-xl font-bold text-ink-dark tracking-tight leading-snug break-words">
                {buyerSuccess.bridgeHeading}
              </h2>

              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
                {buyerSuccess.bridgeBody}
              </p>
            </div>

            <div className="mt-6 sm:mt-8 pt-4 border-t border-surface-border/60">
              <a
                href={company.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-4 sm:px-5 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#133E2B] hover:bg-brand-950 transition-all group text-center"
              >
                <span>{buyerSuccess.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </a>
            </div>
          </Card>

          {/* Card 2: Secondary Direct Advisor Contact */}
          <Card className="p-5 sm:p-7 flex flex-col justify-between bg-surface-card border border-surface-border shadow-sm">
            <div>
              <span className="text-[11px] font-mono font-bold tracking-wider text-ink-subtle uppercase block mb-2">
                Direct Contact
              </span>

              <h2 className="text-base sm:text-xl font-bold text-ink-dark tracking-tight leading-snug break-words">
                {buyerSuccess.secondaryCtaText}
              </h2>

              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
                Prefer direct assistance right away? Connect with our advisory team to discuss specific requirements.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 pt-4 border-t border-surface-border/60">
              <a
                href={company.advisorContactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-4 sm:px-5 py-3 rounded-full text-xs sm:text-sm font-semibold text-brand-950 bg-white border border-surface-border hover:bg-surface-light transition-all group text-center"
              >
                <span>{buyerSuccess.secondaryCtaText}</span>
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </a>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};
