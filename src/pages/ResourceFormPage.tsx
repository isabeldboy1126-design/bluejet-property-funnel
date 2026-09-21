import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { funnelConfig } from '../config/funnel.config';
import { useFunnel } from '../context/FunnelContext';
import { FocusHeader } from '../components/layout/FocusHeader';
import { Footer } from '../components/layout/Footer';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export const ResourceFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { contact, setContact, submitResourceLead } = useFunnel();
  const { resourceForm } = funnelConfig;

  const [firstName, setFirstName] = useState(contact.firstName || '');
  const [whatsapp, setWhatsapp] = useState(contact.whatsapp || '');
  const [email, setEmail] = useState(contact.email || '');
  const [marketingConsent, setMarketingConsent] = useState(false); // Explicitly unchecked
  const [errors, setErrors] = useState<{ firstName?: string; whatsapp?: string; email?: string }>({});

  const validate = () => {
    const errs: { firstName?: string; whatsapp?: string; email?: string } = {};

    if (!firstName.trim()) {
      errs.firstName = 'Please enter your first name.';
    }

    if (!whatsapp.trim()) {
      errs.whatsapp = 'Please enter your WhatsApp phone number.';
    } else if (whatsapp.replace(/\D/g, '').length < 8) {
      errs.whatsapp = 'Please enter a valid phone number.';
    }

    if (!email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const contactPayload = {
      firstName: firstName.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      marketingConsent,
    };

    setContact(contactPayload);
    submitResourceLead(contactPayload);

    navigate('/resource/success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-light text-ink-dark">
      <FocusHeader backTo="/intent" backLabel="Change Selection" />

      <main className="flex-grow max-w-xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-800 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
            {resourceForm.eyebrow}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-dark tracking-tight mt-3 break-words">
            {resourceForm.heading}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-ink-muted">
            {resourceForm.subheading}
          </p>
        </div>

        <Card className="p-5 sm:p-8 bg-surface-card border-surface-border">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-xs font-semibold text-ink-dark mb-1.5">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
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

            {/* WhatsApp Phone */}
            <div>
              <label htmlFor="whatsapp" className="block text-xs font-semibold text-ink-dark mb-1.5">
                WhatsApp Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative flex rounded-xl border border-surface-border bg-surface-light/60 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-800 transition-all overflow-hidden">
                <span className="inline-flex items-center px-3 sm:px-3.5 border-r border-surface-border text-xs font-medium text-ink-muted select-none shrink-0 bg-surface-muted/40">
                  🇳🇬 +234
                </span>
                <input
                  id="whatsapp"
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
                  Format for WhatsApp notification or verification.
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-ink-dark mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                inputMode="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="name@example.com"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-ink-dark placeholder-ink-subtle/70 bg-surface-light/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-800 transition-all ${
                  errors.email ? 'border-red-400 focus:ring-red-500' : 'border-surface-border'
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Optional Marketing Consent (Explicitly Unchecked) */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-surface-border text-brand-900 focus:ring-brand-800 cursor-pointer"
                />
                <span className="text-xs text-ink-muted leading-relaxed">
                  {resourceForm.consentLabel}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <Button type="submit" size="lg" fullWidth className="group">
                <span>{resourceForm.submitButtonText}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Security note */}
            <div className="flex items-center justify-center gap-1.5 pt-2 text-[11px] text-ink-subtle">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-700" />
              <span>{resourceForm.trustNote}</span>
            </div>
          </form>
        </Card>
      </main>

      <Footer />
    </div>
  );
};
