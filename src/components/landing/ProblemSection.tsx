import React from 'react';
import { useNavigate } from 'react-router-dom';
import { funnelConfig } from '../../config/funnel.config';
import { useFunnel } from '../../context/FunnelContext';
import { ArrowRight, Calendar } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const navigate = useNavigate();
  const { openInspectionModal } = useFunnel();
  const {
    problemEyebrow,
    problemHeadingPrefix,
    problemHeadingHighlight,
    problems,
  } = funnelConfig.landingPage;

  return (
    <section id="problems" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 border-t border-surface-border/60 w-full">
      {/* Section Header with Bluejet Emphasis */}
      <div className="max-w-3xl mb-10 sm:mb-14">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#0052FF]">
          {problemEyebrow}
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink-dark tracking-tight mt-2 leading-tight break-words">
          {problemHeadingPrefix}{' '}
          <span className="text-[#0052FF]">{problemHeadingHighlight}</span>
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
              <div className="text-xs font-mono font-bold tracking-wider text-[#0052FF] pb-3 mb-4 border-b border-surface-border">
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
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0052FF] block mb-1">
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
                className="inline-flex items-center text-xs font-bold text-[#0052FF] hover:text-[#0B1B3D] group cursor-pointer"
              >
                <span>{item.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Advisor Route */}
      <div className="mt-10 sm:mt-14 pt-6 border-t border-surface-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left bg-blue-50/30 border-blue-100/60 rounded-2xl p-4 sm:p-5">
        <p className="text-xs sm:text-sm text-ink-muted">
          Already evaluating a specific property or have urgent verification questions?
        </p>
        <button
          type="button"
          onClick={() => openInspectionModal()}
          className="inline-flex items-center text-xs font-bold text-[#0052FF] hover:text-[#0B1B3D] group cursor-pointer bg-white px-4 py-2 rounded-full border border-surface-border shadow-xs hover:border-[#0052FF] transition-all shrink-0"
        >
          <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#0052FF]" />
          <span>{funnelConfig.inspection.advisorCtaText}</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
