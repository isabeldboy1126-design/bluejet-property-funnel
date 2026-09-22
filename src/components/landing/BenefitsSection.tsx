import React from 'react';
import { useNavigate } from 'react-router-dom';
import { funnelConfig } from '../../config/funnel.config';
import { useFunnel } from '../../context/FunnelContext';
import { Button } from '../ui/Button';
import { ArrowRight, Calendar } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const navigate = useNavigate();
  const { openInspectionModal } = useFunnel();
  const {
    benefitsEyebrow,
    benefitsHeadingPrefix,
    benefitsHeadingHighlight,
    benefitsList,
    benefitsSupporting,
    benefitsCtaText,
  } = funnelConfig.landingPage;

  return (
    <section id="outcomes" className="w-full max-w-full overflow-hidden bg-[#0B1B3D] text-white py-14 sm:py-24 my-6 sm:my-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Headline & Supporting (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-300 uppercase">
              {benefitsEyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mt-2 sm:mt-3 leading-tight break-words">
              {benefitsHeadingPrefix}{' '}
              <span className="text-blue-300 block sm:inline">{benefitsHeadingHighlight}</span>
            </h2>
            <p className="mt-5 text-sm sm:text-base text-blue-100/80 leading-relaxed">
              {benefitsSupporting}
            </p>

            {/* Contextual CTA on desktop */}
            <div className="mt-8 hidden lg:block space-y-3">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate('/intent')}
                className="bg-white hover:bg-blue-50 text-[#0B1B3D] font-semibold border-none group"
              >
                <span>{benefitsCtaText}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <button
                type="button"
                onClick={() => openInspectionModal()}
                className="flex items-center text-xs font-semibold text-blue-200 hover:text-white transition-colors cursor-pointer pt-0.5"
              >
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-blue-300" />
                <span>{funnelConfig.inspection.secondaryCtaText}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Vertical Benefit List with Dividers (7 cols) - NO CARDS */}
          <div className="lg:col-span-7 divide-y divide-blue-900/60 border-t border-b border-blue-900/60">
            {benefitsList.map((benefit, idx) => (
              <div
                key={benefit.id}
                className="py-6 flex items-start gap-4"
              >
                <span className="text-xs font-mono font-bold text-blue-300 shrink-0 mt-1">
                  0{idx + 1}
                </span>
                <div className="text-base sm:text-lg font-bold text-white leading-snug">
                  {benefit.text}
                </div>
              </div>
            ))}
          </div>

          {/* Contextual CTA on mobile */}
          <div className="lg:hidden col-span-1 mt-4 space-y-2.5">
            <Button
              size="lg"
              variant="secondary"
              fullWidth
              onClick={() => navigate('/intent')}
              className="bg-white hover:bg-blue-50 text-[#0B1B3D] font-semibold border-none group"
            >
              <span>{benefitsCtaText}</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <button
              type="button"
              onClick={() => openInspectionModal()}
              className="w-full flex items-center justify-center text-xs font-semibold text-blue-200 hover:text-white py-1.5 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-blue-300" />
              <span>{funnelConfig.inspection.secondaryCtaText}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
