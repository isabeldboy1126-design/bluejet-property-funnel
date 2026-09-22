import React, { useState, useEffect } from 'react';
import { useFunnel } from '../../context/FunnelContext';
import { funnelConfig } from '../../config/funnel.config';
import { Button } from '../ui/Button';
import { X, Calendar, MessageSquare, ArrowRight, ShieldCheck, CheckCircle2, ChevronDown } from 'lucide-react';

export const InspectionModal: React.FC = () => {
  const {
    isInspectionModalOpen,
    closeInspectionModal,
    inspectionInitialProperty,
    submitInspectionLead,
  } = useFunnel();
  const { inspection } = funnelConfig;

  const [firstName, setFirstName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [propertyOfInterest, setPropertyOfInterest] = useState('');
  const [isCustomProperty, setIsCustomProperty] = useState(false);
  const [customPropertyText, setCustomPropertyText] = useState('');
  const [errors, setErrors] = useState<{ firstName?: string; whatsapp?: string; property?: string }>({});
  const [submittedWhatsappUrl, setSubmittedWhatsappUrl] = useState<string | null>(null);

  // Sync initial property when opened
  useEffect(() => {
    if (isInspectionModalOpen) {
      setFirstName('');
      setWhatsapp('');
      setSubmittedWhatsappUrl(null);
      setErrors({});
      if (inspectionInitialProperty) {
        setPropertyOfInterest(inspectionInitialProperty);
        setIsCustomProperty(false);
      } else {
        setPropertyOfInterest(inspection.propertyOptions[0] || '');
        setIsCustomProperty(false);
      }
    }
  }, [isInspectionModalOpen, inspectionInitialProperty, inspection.propertyOptions]);

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
    const errs: { firstName?: string; whatsapp?: string; property?: string } = {};

    if (!firstName.trim()) {
      errs.firstName = 'Please enter your first name.';
    }

    if (!whatsapp.trim()) {
      errs.whatsapp = 'Please enter your WhatsApp phone number.';
    } else if (whatsapp.replace(/\D/g, '').length < 8) {
      errs.whatsapp = 'Please enter a valid phone number.';
    }

    const finalProp = isCustomProperty ? customPropertyText.trim() : propertyOfInterest.trim();
    if (!finalProp) {
      errs.property = 'Please specify or select the property of interest.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const chosenProperty = isCustomProperty ? customPropertyText.trim() : propertyOfInterest.trim();

    // 1. Capture essential information first
    submitInspectionLead({
      firstName: firstName.trim(),
      whatsapp: whatsapp.trim(),
      propertyOfInterest: chosenProperty,
    });

    // 2. Format WhatsApp direct sales message
    const advisorNumber = inspection.whatsappAdvisorNumber.replace(/\D/g, '') || '2340000000000';
    const message = inspection.whatsappMessageTemplate
      .replace('{name}', firstName.trim())
      .replace('{property}', chosenProperty);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink-dark/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-surface-border overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="bg-[#133E2B] text-white px-5 sm:px-7 py-5 sm:py-6 relative">
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-brand-200 uppercase mb-1">
            <Calendar className="w-4 h-4" />
            <span>Direct Sales Route</span>
          </div>
          <h2 id="modal-title" className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {inspection.modalTitle}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-brand-100/90 leading-relaxed max-w-md">
            {inspection.modalSubtitle}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7">
          {submittedWhatsappUrl ? (
            /* Direct WhatsApp Confirmation State */
            <div className="text-center py-4 sm:py-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-[#133E2B] flex items-center justify-center mx-auto border border-brand-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-ink-dark">
                Connecting to Property Advisor
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted max-w-md mx-auto leading-relaxed">
                We’ve received your inspection request for{' '}
                <span className="font-semibold text-ink-dark">
                  {isCustomProperty ? customPropertyText : propertyOfInterest}
                </span>
                . Click the button below to continue directly to WhatsApp to complete your booking.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={submittedWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all group"
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
            /* Essential 3-Field Capture Form */
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
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-ink-dark placeholder-ink-subtle/70 bg-surface-light/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-800 transition-all ${
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
                <div className="relative flex rounded-xl border border-surface-border bg-surface-light/60 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-800 transition-all overflow-hidden">
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
                    Direct route for instant schedule confirmation and inspection location details.
                  </p>
                )}
              </div>

              {/* Field 3: Property of Interest */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="inspect-property" className="block text-xs font-semibold text-ink-dark">
                    {inspection.propertyLabel} <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomProperty(!isCustomProperty);
                      setErrors((prev) => ({ ...prev, property: undefined }));
                    }}
                    className="text-[11px] font-semibold text-[#133E2B] hover:underline cursor-pointer"
                  >
                    {isCustomProperty ? 'Choose from list' : 'Type custom property / location'}
                  </button>
                </div>

                {isCustomProperty ? (
                  <input
                    id="inspect-property-custom"
                    type="text"
                    value={customPropertyText}
                    onChange={(e) => {
                      setCustomPropertyText(e.target.value);
                      if (errors.property) setErrors((prev) => ({ ...prev, property: undefined }));
                    }}
                    placeholder={inspection.propertyPlaceholder}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-ink-dark placeholder-ink-subtle/70 bg-surface-light/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-800 transition-all ${
                      errors.property ? 'border-red-400 focus:ring-red-500' : 'border-surface-border'
                    }`}
                  />
                ) : (
                  <div className="relative">
                    <select
                      id="inspect-property"
                      value={propertyOfInterest}
                      onChange={(e) => {
                        setPropertyOfInterest(e.target.value);
                        if (errors.property) setErrors((prev) => ({ ...prev, property: undefined }));
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-ink-dark bg-surface-light/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-800 appearance-none pr-10 cursor-pointer transition-all ${
                        errors.property ? 'border-red-400 focus:ring-red-500' : 'border-surface-border'
                      }`}
                    >
                      {inspection.propertyOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-ink-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                )}
                {errors.property && (
                  <p className="text-xs text-red-500 mt-1">{errors.property}</p>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Button type="submit" size="lg" fullWidth className="group shadow-md">
                  <span>{inspection.submitButtonText}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Reassurance note */}
              <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-ink-subtle">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-700" />
                <span>Direct route for ready buyers — no full lead-magnet questionnaires required.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};