import React from 'react';
import { useNavigate } from 'react-router-dom';
import { funnelConfig } from '../../config/funnel.config';
import { useFunnel } from '../../context/FunnelContext';
import { Button } from '../ui/Button';
import { ArrowRight, Calendar } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const navigate = useNavigate();
  const { openInspectionModal } = useFunnel();
  const {
    finalCtaHeadingPrefix,
    finalCtaHeadingHighlight,
    finalCtaBody,
    finalCtaButtonText,
  } = funnelConfig.landingPage;

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center w-full">
      <div className="bg-[#0B1B3D] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-14 shadow-card-hover relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#0052FF]/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[#0052FF]/15 blur-2xl"
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight break-words leading-tight">
            {finalCtaHeadingPrefix}{' '}
            <span className="text-blue-300 block sm:inline">
              {finalCtaHeadingHighlight}
            </span>
          </h2>
          <p className="mt-4 text-xs sm:text-base text-blue-100 font-normal leading-relaxed">
            {finalCtaBody}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            {/* PRIMARY CTA */}
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/intent')}
              className="w-full sm:w-auto font-semibold text-[#0B1B3D] bg-white hover:bg-blue-50 shadow-md border-none text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5"
            >
              <span>{finalCtaButtonText}</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform shrink-0" />
            </Button>

            {/* SECONDARY CTA */}
            <Button
              size="lg"
              variant="outline"
              onClick={() => openInspectionModal()}
              className="w-full sm:w-auto border-white/50 text-white hover:bg-white/10 hover:border-white text-xs sm:text-sm px-5 sm:px-6 py-3 sm:py-3.5"
            >
              <Calendar className="w-4 h-4 mr-2 text-blue-300 shrink-0" />
              <span>{funnelConfig.inspection.secondaryCtaText}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
