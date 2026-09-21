import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { funnelConfig } from '../../config/funnel.config';
import { Button } from '../ui/Button';
import { ArrowRight, BookOpen } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-surface-light/90 border-b border-surface-border/60 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 text-ink-dark hover:opacity-90 transition-opacity min-w-0 shrink">
          <div className="w-8 h-8 rounded-lg bg-brand-900 text-white flex items-center justify-center font-bold text-sm shadow-subtle shrink-0">
            <BookOpen className="w-4 h-4 text-brand-200" />
          </div>
          <span className="font-bold tracking-tight text-sm sm:text-base md:text-lg text-ink-dark font-mono truncate">
            {funnelConfig.company.name}
          </span>
        </Link>

        {/* Desktop Anchor Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-ink-muted">
          <a href="#authority" className="hover:text-ink-dark transition-colors">
            Who’s Behind It
          </a>
          <a href="#problems" className="hover:text-ink-dark transition-colors">
            Why It Matters
          </a>
          <a href="#outcomes" className="hover:text-ink-dark transition-colors">
            What It Helps You Do
          </a>
          <a href="#guide-contents" className="hover:text-ink-dark transition-colors">
            What’s Inside
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center shrink-0">
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
