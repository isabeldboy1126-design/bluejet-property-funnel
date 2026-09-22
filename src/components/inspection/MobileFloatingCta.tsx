import React, { useState } from 'react';
import { useFunnel } from '../../context/FunnelContext';
import { funnelConfig } from '../../config/funnel.config';
import { Calendar, X } from 'lucide-react';

export const MobileFloatingCta: React.FC = () => {
  const { openInspectionModal } = useFunnel();
  const [isVisible, setIsVisible] = useState(true);

  // Subtle floating button at bottom-right on mobile devices (sm:hidden)
  // Non-intrusive, allows high-intent buyers to jump to direct sales/inspection anytime
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 sm:hidden flex items-center gap-1 animate-in fade-in slide-in-from-bottom-3 duration-300">
      <button
        type="button"
        onClick={() => openInspectionModal()}
        className="flex items-center gap-2 pl-3 pr-3.5 py-2 rounded-full bg-[#0B1B3D] text-white shadow-xl hover:bg-[#060D1E] border border-blue-900/60 active:scale-95 transition-all text-xs font-semibold cursor-pointer"
        aria-label="Ready to buy? Book an Inspection"
      >
        <div className="w-2 h-2 rounded-full bg-[#0052FF] animate-pulse shadow-xs" />
        <Calendar className="w-3.5 h-3.5 text-blue-300 shrink-0" />
        <span className="truncate">{funnelConfig.inspection.floatingMobileCtaText}</span>
      </button>

      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="w-6 h-6 rounded-full bg-ink-dark/80 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-xs text-[10px] cursor-pointer"
        aria-label="Dismiss inspection shortcut"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};
