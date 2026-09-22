import React from 'react';
import { useNavigate } from 'react-router-dom';
import { funnelConfig } from '../config/funnel.config';
import { useFunnel } from '../context/FunnelContext';
import { FocusHeader } from '../components/layout/FocusHeader';
import { Footer } from '../components/layout/Footer';
import { Card } from '../components/ui/Card';
import { Compass, BookOpen, ArrowRight, Sparkles, Calendar } from 'lucide-react';

export const IntentPage: React.FC = () => {
  const navigate = useNavigate();
  const { setIntent, openInspectionModal } = useFunnel();
  const { intentPage, inspection } = funnelConfig;

  // Primary Option -> Buyer qualification flow
  const handleSelectPrimary = () => {
    setIntent('buyer_qualification');
    navigate('/qualify');
  };

  // Secondary Option -> Resource only flow
  const handleSelectSecondary = () => {
    setIntent('resource_only');
    navigate('/resource');
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-light text-ink-dark">
      <FocusHeader backTo="/" backLabel="Back to Overview" />

      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-20">
        {/* Header Question */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-800 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
            {intentPage.eyebrow}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-ink-dark tracking-tight mt-3 sm:mt-4 break-words">
            {intentPage.headline}
          </h1>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-ink-muted max-w-lg mx-auto">
            {intentPage.subheadline}
          </p>
        </div>

        {/* SIDE BY SIDE on Desktop (md:grid-cols-2), Stacked on Mobile (grid-cols-1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          {/* PRIMARY OPTION (FIRST on Mobile & Desktop) */}
          <Card
            hoverable
            onClick={handleSelectPrimary}
            className="p-5 sm:p-8 flex flex-col justify-between cursor-pointer border-2 border-brand-800 bg-gradient-to-b from-white to-brand-50/25 group shadow-card-hover relative"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4 sm:mb-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-900 text-white flex items-center justify-center shadow-subtle shrink-0">
                  <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-brand-200" />
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-brand-900 bg-brand-100 px-2.5 sm:px-3 py-1 rounded-full border border-brand-200 shrink-0">
                  <Sparkles className="w-3 h-3 text-brand-800" />
                  <span>{intentPage.primaryOption.badge}</span>
                </span>
              </div>

              <h2 className="text-base sm:text-xl font-extrabold text-ink-dark group-hover:text-brand-950 transition-colors leading-snug break-words">
                Get the Free Guide +{' '}
                <span className="text-[#133E2B]">[DESIRED PROPERTY OUTCOME]</span>
              </h2>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
                {intentPage.primaryOption.support}
              </p>
            </div>

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-brand-100 flex items-center justify-between text-xs sm:text-sm font-bold text-brand-900 gap-2">
              <span className="truncate">Continue with personalized search</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-900 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform shrink-0">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
          </Card>

          {/* SECONDARY OPTION (SECOND on Mobile & Desktop) */}
          <Card
            hoverable
            onClick={handleSelectSecondary}
            className="p-5 sm:p-8 flex flex-col justify-between cursor-pointer border border-surface-border hover:border-gray-400 bg-surface-card group transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4 sm:mb-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-surface-muted text-ink-muted group-hover:text-ink-dark flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-ink-subtle bg-surface-muted px-2.5 sm:px-3 py-1 rounded-full shrink-0">
                  {intentPage.secondaryOption.badge}
                </span>
              </div>

              <h2 className="text-base sm:text-xl font-bold text-ink-dark group-hover:text-brand-950 transition-colors leading-snug break-words">
                {intentPage.secondaryOption.title}
              </h2>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
                {intentPage.secondaryOption.support}
              </p>
            </div>

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-surface-border/60 flex items-center justify-between text-xs sm:text-sm font-semibold text-ink-muted group-hover:text-ink-dark gap-2">
              <span className="truncate">Receive free resource only</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-surface-muted group-hover:bg-brand-50 text-ink-muted group-hover:text-brand-900 flex items-center justify-center group-hover:translate-x-0.5 transition-transform shrink-0">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
          </Card>
        </div>

        {/* High-Intent Direct Sales Shortcut */}
        <div className="mt-8 text-center bg-surface-muted/40 border border-surface-border/80 rounded-2xl p-4 sm:p-5 max-w-lg mx-auto">
          <p className="text-xs text-ink-muted leading-relaxed">
            Already decided on purchasing or want to inspect a property right away?{' '}
            <button
              type="button"
              onClick={() => openInspectionModal()}
              className="font-bold text-[#133E2B] hover:text-brand-950 underline underline-offset-2 inline-flex items-center gap-1 cursor-pointer mt-1 sm:mt-0"
            >
              <Calendar className="w-3.5 h-3.5 inline" />
              <span>{inspection.secondaryCtaText}</span>
              <ArrowRight className="w-3 h-3 inline" />
            </button>
          </p>
        </div>

        {/* Reassurance */}
        <p className="text-center text-xs text-ink-subtle mt-8">
          🔒 No obligations. Choose the route that best matches your situation.
        </p>
      </main>

      <Footer />
    </div>
  );
};
