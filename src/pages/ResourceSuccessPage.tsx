import React from 'react';
import { funnelConfig } from '../config/funnel.config';
import { useFunnel } from '../context/FunnelContext';
import { FocusHeader } from '../components/layout/FocusHeader';
import { Footer } from '../components/layout/Footer';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CheckCircle2, Download, ExternalLink, FileText } from 'lucide-react';

export const ResourceSuccessPage: React.FC = () => {
  const { latestLead } = useFunnel();
  const { resourceSuccess, company } = funnelConfig;

  const leadName = latestLead?.contact.firstName || '[FIRST NAME]';

  const handleDownloadSample = () => {
    const sampleContent = `=========================================
[SAMPLE RESOURCE]
Company: ${company.name}
Generated For: ${leadName}
Date: ${new Date().toLocaleDateString()}
=========================================

[GUIDE TOPIC / TOOL / FRAMEWORK 01]
[ONE-LINE EXPLANATION]

[GUIDE TOPIC / TOOL / FRAMEWORK 02]
[ONE-LINE EXPLANATION]

[GUIDE TOPIC / TOOL / FRAMEWORK 03]
[ONE-LINE EXPLANATION]

[GUIDE TOPIC / TOOL / FRAMEWORK 04]
[ONE-LINE EXPLANATION]

=========================================
Official Company Website: ${company.websiteUrl}
=========================================`;

    const blob = new Blob([sampleContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = resourceSuccess.downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-light text-ink-dark">
      <FocusHeader backTo="/" backLabel="Return to Home" />

      <main className="flex-grow max-w-xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16 text-center">
        {/* Success Icon */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-50 text-[#0052FF] flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-blue-200 shrink-0">
          <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#0052FF]" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-dark tracking-tight break-words">
          Thanks, {leadName}
        </h1>

        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-ink-muted max-w-md mx-auto">
          {resourceSuccess.subheading}
        </p>

        {/* Resource Download Card */}
        <Card className="mt-6 sm:mt-8 p-5 sm:p-6 bg-surface-card border-surface-border text-left">
          <div className="flex items-center gap-3 sm:gap-3.5 mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-surface-border">
            <div className="w-10 h-10 rounded-xl bg-[#0B1B3D] text-white flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-blue-300" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-medium text-ink-subtle uppercase">Demo Resource</div>
              <div className="text-xs sm:text-sm font-bold text-ink-dark break-words">
                {funnelConfig.landingPage.headlinePrefix} {funnelConfig.landingPage.headlineHighlight} {funnelConfig.landingPage.headlineSuffix}
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={handleDownloadSample}
            className="group text-xs sm:text-sm"
          >
            <Download className="w-4 h-4 mr-2 shrink-0" />
            <span>{resourceSuccess.sampleDownloadLabel}</span>
          </Button>

          <p className="text-[11px] text-center text-ink-subtle mt-3">
            Demo placeholder download file ready.
          </p>
        </Card>

        {/* Company Website Exploration Bridge */}
        <Card className="mt-5 sm:mt-6 p-5 sm:p-6 bg-surface-muted/60 border-surface-border text-left">
          <a
            href={company.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-4 sm:px-5 py-3 rounded-full text-xs sm:text-sm font-semibold text-brand-950 bg-white border border-surface-border hover:bg-surface-light shadow-sm transition-all group text-center"
          >
            <span>{resourceSuccess.companyCtaButtonText}</span>
            <ExternalLink className="w-3.5 h-3.5 ml-2 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </a>
        </Card>
      </main>

      <Footer />
    </div>
  );
};
