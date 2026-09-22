import React, { useState, useEffect } from 'react';
import { useFunnel } from '../../context/FunnelContext';
import { funnelConfig } from '../../config/funnel.config';
import { Button } from '../ui/Button';
import { X, Calendar, MessageSquare, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const InspectionModal: React.FC = () => {
  const {
    isInspectionModalOpen,
    closeInspectionModal,
    submitInspectionLead,
  } = useFunnel();
  const { inspection } = funnelConfig;

  const [firstName, setFirstName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [errors, setErrors] = useState<{ firstName?: string; whatsapp?: string }>({});
  const [submittedWhatsappUrl, setSubmittedWhatsappUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isInspectionModalOpen) {
      setFirstName('');
      setWhatsapp('');
      setSubmittedWhatsappUrl(null);
      setErrors({});
    }
  }, [isInspectionModalOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isInspectionModalOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInspectionModalOpen]);

  if (!isInspectionModalOpen) return null;

  const handleClose = () => {
    setSubmittedWhatsappUrl(null);
    closeInspectionModal();
  };

  const validate = () => {
    const errs: { firstName?: string; whatsapp?: string } = {};

    if (!firstName.trim()) {
      errs.firstName = 'Please enter your first name.';
    }

    if (!whatsapp.trim()) {
      errs.whatsapp = 'Please enter your WhatsApp phone number.';
    } else if (whatsapp.replace(/\D/g, '').length < 8) {
      errs.whatsapp = 'Please enter a valid phone number.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Automatically preserve source information through hidden/internal metadata
    const searchParams = new URLSearchParams(window.location.search);
    const metadata = {
      pageUrl: window.location.href,
      pathname: window.location.pathname,
      referrer: document.referrer || 'Direct / Internal',
      utmSource: searchParams.get('utm_source') || undefined,
      utmMedium: searchParams.get('utm_medium') || undefined,
      utmCampaign: searchParams.get('utm_campaign') || undefined,
      utmContent: searchParams.get('utm_content') || undefined,
      utmTerm: searchParams.get('utm_term') || undefined,
      adId: searchParams.get('gclid') || searchParams.get('fbclid') || searchParams.get('ad_id') || undefined,
      timestamp: new Date().toISOString(),
    };

    // 1. Capture essential lead information + internal tracking metadata automatically
    submitInspectionLead({
      firstName: firstName.trim(),
      whatsapp: whatsapp.trim(),
      metadata,
    });

    // 2. Format WhatsApp direct sales message
    const advisorNumber = inspection.whatsappAdvisorNumber.replace(/\D/g, '') || '2340000000000';
    const message = `Hello, my name is ${firstName.trim()}. I would like to speak with a Bluejet property advisor to book an inspection.`;

    const whatsappUrl = `https://wa.me/${advisorNumber}?text=${encodeURIComponent(message)}`;
    setSubmittedWhatsappUrl(whatsappUrl);

    // 3. Attempt direct handoff to WhatsApp
    try {
      window.open(whatsappUrl, '_blank');
    } catch {
      // Handled gracefully via button in confirmation view
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#060D1E]/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-surface-border overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header: Bluejet Deep Navy Base with Royal Blue Highlights */}
        <div className="bg-[#0B1B3D] text-white px-5 sm:px-7 py-5 sm:py-6 relative">
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-blue-200 uppercase mb-1">
            <Calendar className="w-4 h-4 text-blue-300" />
            <span>Direct Sales Route</span>
          </div>
          <h2 id="modal-title" className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            {inspection.modalTitle}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-blue-100/90 leading-relaxed max-w-md">
            Direct line to our property advisory team. Provide your details below to immediately connect on WhatsApp.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7">
          {submittedWhatsappUrl ? (
            /* Direct WhatsApp Confirmation State */
            <div className="text-center py-4 sm:py-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0052FF] flex items-center justify-center mx-auto border border-blue-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-ink-dark">
                Connecting to Property Advisor
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-ink-dark">{firstName}</span>. Click the button below to continue directly to WhatsApp and chat with an advisor immediately.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={submittedWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-bold text-white bg-[#0052FF] hover:bg-[#0042D0] shadow-md transition-all group"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span>Open WhatsApp Chat</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <Button variant="ghost" size="md" onClick={handleClose}>
                  <span>Done</span>
                </Button>
              </div>
            </div>
          ) : (
            /* Ultra-lean 2-Field Capture Form (No visible property field; tracked automatically) */
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Field 1: First Name */}
              <div>
                <label htmlFor="inspect-first-name" className="block text-xs font-semibold text-ink-dark mb-1.5">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="inspect-first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: undefined }));
                  }}
                  placeholder="Your first name"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-ink-dark placeholder-ink-subtle/70 bg-surface-light/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0052FF] transition-all ${
                    errors.firstName ? 'border-red-400 focus:ring-red-500' : 'border-surface-border'
                  }`}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                )}
              </div>

              {/* Field 2: WhatsApp Number */}
              <div>
                <label htmlFor="inspect-whatsapp" className="block text-xs font-semibold text-ink-dark mb-1.5">
                  WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <div className="relative flex rounded-xl border border-surface-border bg-surface-light/60 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0052FF] transition-all overflow-hidden">
                  <span className="inline-flex items-center px-3 sm:px-3.5 border-r border-surface-border text-xs font-medium text-ink-muted select-none shrink-0 bg-surface-muted/40">
                    🇳🇬 +234
                  </span>
                  <input
                    id="inspect-whatsapp"
                    type="tel"
                    inputMode="tel"
                    value={whatsapp}
                    onChange={(e) => {
                      setWhatsapp(e.target.value);
                      if (errors.whatsapp) setErrors((prev) => ({ ...prev, whatsapp: undefined }));
                    }}
                    placeholder="0801 234 5678"
                    className="w-full min-w-0 px-3 sm:px-3.5 py-2.5 bg-transparent text-sm text-ink-dark placeholder-ink-subtle/70 focus:outline-none"
                  />
                </div>
                {errors.whatsapp ? (
                  <p className="text-xs text-red-500 mt-1">{errors.whatsapp}</p>
                ) : (
                  <p className="text-[11px] text-ink-subtle mt-1">
                    Direct line for quick schedule confirmation and inspection details.
                  </p>
                )}
              </div>

              {/* Action Button: Bright Royal Blue */}
              <div className="pt-2">
                <Button type="submit" size="lg" fullWidth className="group shadow-md bg-[#0052FF] hover:bg-[#0042D0] border-[#0052FF]">
                  <span>{inspection.submitButtonText}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Frictionless reassurance note */}
              <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-ink-subtle">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0052FF]" />
                <span>Fast direct route — source and page context tracked automatically.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};