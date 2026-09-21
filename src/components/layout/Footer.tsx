import React from 'react';
import { funnelConfig } from '../../config/funnel.config';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-full bg-surface-light border-t border-surface-border/80 py-8 sm:py-10 px-4 sm:px-6 mt-12 sm:mt-16">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-subtle text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 sm:gap-2">
          <span>© {new Date().getFullYear()} {funnelConfig.company.name}.</span>
          <span>All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href={funnelConfig.company.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-muted hover:text-ink-dark underline underline-offset-4 transition-colors"
          >
            Visit Official Company Website
          </a>
        </div>
      </div>
    </footer>
  );
};
