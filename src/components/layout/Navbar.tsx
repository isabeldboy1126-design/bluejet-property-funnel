import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { funnelConfig } from '../../config/funnel.config';
import { Button } from '../ui/Button';
import { ArrowRight, Calendar } from 'lucide-react';
import { useFunnel } from '../../context/FunnelContext';
import { BluejetLogo } from '../ui/BluejetLogo';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { openInspectionModal } = useFunnel();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 border-b border-surface-border/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo with Bluejet Visual Emblem */}
        <Link to="/" className="flex items-center gap-2.5 text-ink-dark hover:opacity-95 transition-opacity min-w-0 shrink">
          <BluejetLogo size="sm" />
          <span className="font-bold tracking-tight text-sm sm:text-base text-[#0B1B3D] font-mono truncate">
            {funnelConfig.company.name}
          </span>
        </Link>

        {/* Desktop Anchor Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-ink-muted">
          <a href="#authority" className="hover:text-[#0052FF] transition-colors">
            Who’s Behind It
          </a>
          <a href="#problems" className="hover:text-[#0052FF] transition-colors">
            Why It Matters
          </a>
          <a href="#outcomes" className="hover:text-[#0052FF] transition-colors">
            What It Helps You Do
          </a>
          <a href="#guide-contents" className="hover:text-[#0052FF] transition-colors">
            What’s Inside
          </a>
        </nav>

        {/* Action Buttons: Primary Free Guide + Secondary Inspection */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => openInspectionModal()}
            className="hidden sm:inline-flex items-center text-xs font-medium text-ink-muted hover:text-[#0052FF] transition-colors py-1.5 px-3 rounded-lg hover:bg-blue-50/70 mr-1.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#0052FF]" />
            <span>Book Inspection</span>
          </button>

          {/* Primary CTA */}
          <Button
            size="sm"
            onClick={() => navigate('/intent')}
            className="group text-xs px-3 sm:px-4 py-1.5 sm:py-2"
          >
            <span>{funnelConfig.landingPage.mainCtaText}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </div>
    </header>
  );
};
