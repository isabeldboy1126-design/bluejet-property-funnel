import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { funnelConfig } from '../../config/funnel.config';
import { ArrowLeft, BookOpen } from 'lucide-react';

interface FocusHeaderProps {
  backTo?: string;
  backLabel?: string;
}

export const FocusHeader: React.FC<FocusHeaderProps> = ({
  backTo = '/',
  backLabel = 'Back',
}) => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-surface-light border-b border-surface-border/60 py-3.5 sm:py-4 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        <button
          onClick={() => navigate(backTo)}
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-ink-muted hover:text-ink-dark transition-colors cursor-pointer py-1 px-1.5 sm:px-2 rounded-lg hover:bg-surface-muted shrink-0"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>{backLabel}</span>
        </button>

        <Link to="/" className="flex items-center gap-2 text-ink-dark min-w-0">
          <div className="w-7 h-7 rounded-lg bg-brand-900 text-white flex items-center justify-center font-bold text-xs shadow-subtle shrink-0">
            <BookOpen className="w-3.5 h-3.5 text-brand-200" />
          </div>
          <span className="font-semibold text-xs sm:text-sm tracking-tight text-ink-dark truncate max-w-[130px] min-[360px]:max-w-[180px] sm:max-w-none">
            {funnelConfig.company.name}
          </span>
        </Link>

        {/* Balance spacer for centered brand on tablet/desktop */}
        <div className="hidden sm:block sm:w-16" />
      </div>
    </header>
  );
};
