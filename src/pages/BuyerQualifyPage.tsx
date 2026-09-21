import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { funnelConfig } from '../config/funnel.config';
import { useFunnel } from '../context/FunnelContext';
import { FocusHeader } from '../components/layout/FocusHeader';
import { Footer } from '../components/layout/Footer';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react';

export const BuyerQualifyPage: React.FC = () => {
  const navigate = useNavigate();
  const { buyerProfile, setBuyerProfile, contact, setContact, submitBuyerLead } =
    useFunnel();
  const { qualification } = funnelConfig;

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1 State
  const [propertyType, setPropertyType] = useState(buyerProfile.propertyType || '');
  const [preferredLocation, setPreferredLocation] = useState(
    buyerProfile.preferredLocation || ''
  );

  // Step 2 State
  const [budgetRange, setBudgetRange] = useState(buyerProfile.budgetRange || '');
  const [purchaseTimeframe, setPurchaseTimeframe] = useState(
    buyerProfile.purchaseTimeframe || ''
  );

  // Step 3 State
  const [firstName, setFirstName] = useState(contact.firstName || '');
  const [whatsapp, setWhatsapp] = useState(contact.whatsapp || '');
  const [email, setEmail] = useState(contact.email || '');
  const [marketingConsent, setMarketingConsent] = useState(false); // Explicitly unchecked by default

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep1 = () => {
    const errs: { [key: string]: string } = {};
    if (!propertyType) errs.propertyType = 'Please select an option.';
    if (!preferredLocation) errs.preferredLocation = 'Please select an option.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: { [key: string]: string } = {};
    if (!budgetRange) errs.budgetRange = 'Please select an option.';
    if (!purchaseTimeframe) errs.purchaseTimeframe = 'Please select an option.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: { [key: string]: string } = {};
    if (!firstName.trim()) errs.firstName = 'Please enter your name.';
    if (!whatsapp.trim()) {
      errs.whatsapp = 'Please enter your WhatsApp number.';
    } else if (whatsapp.replace(/\D/g, '').length < 8) {
      errs.whatsapp = 'Please enter a valid phone number.';
    }
    if (!email.trim()) {
      errs.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
      setBuyerProfile((prev) => ({ ...prev, propertyType, preferredLocation }));
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 2) {
      if (!validateStep2()) return;
      setBuyerProfile((prev) => ({ ...prev, budgetRange, purchaseTimeframe }));
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep === 2) setCurrentStep(1);
    if (currentStep === 3) setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    const contactPayload = {
      firstName: firstName.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      marketingConsent,
    };

    const profilePayload = {
      propertyType,
      preferredLocation,
      budgetRange,
      purchaseTimeframe,
    };

    setContact(contactPayload);
    setBuyerProfile(profilePayload);
    submitBuyerLead(contactPayload, profilePayload);

    navigate('/qualify/success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-light text-ink-dark">
      <FocusHeader backTo="/intent" backLabel="Change Selection" />

      <main className="flex-grow max-w-xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-14">
        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-ink-muted mb-2 font-mono">
            <span>
              STEP {currentStep} OF 3
            </span>
            <span>
              {Math.round((currentStep / 3) * 100)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-surface-border rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-800 transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        <Card className="p-5 sm:p-8 bg-surface-card border-surface-border shadow-card">
          {/* STEP 1: Tell Us What You’re Looking For */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h1 className="text-xl sm:text-2xl font-bold text-ink-dark tracking-tight">
                {qualification.step1Heading}
              </h1>

              {/* Property Type Dropdown */}
              <div>
                <label
                  htmlFor="propertyType"
                  className="block text-xs font-semibold text-ink-dark mb-1.5"
                >
                  {qualification.propertyTypeLabel} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="propertyType"
                    value={propertyType}
                    onChange={(e) => {
                      setPropertyType(e.target.value);
                      if (errors.propertyType) {
                        setErrors((prev) => ({ ...prev, propertyType: '' }));
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-ink-dark bg-surface-light/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-800 appearance-none pr-10 cursor-pointer transition-all ${
                      errors.propertyType
                        ? 'border-red-400 focus:ring-red-500'
                        : 'border-surface-border'
                    }`}
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    {qualification.propertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-ink-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.propertyType && (
                  <p className="text-xs text-red-500 mt-1.5">{errors.propertyType}</p>
                )}
              </div>

              {/* Preferred Location Dropdown */}
              <div>
                <label
                  htmlFor="preferredLocation"
                  className="block text-xs font-semibold text-ink-dark mb-1.5"
                >
                  {qualification.locationLabel} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="preferredLocation"
                    value={preferredLocation}
                    onChange={(e) => {
                      setPreferredLocation(e.target.value);
                      if (errors.preferredLocation) {
                        setErrors((prev) => ({ ...prev, preferredLocation: '' }));
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-ink-dark bg-surface-light/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-800 appearance-none pr-10 cursor-pointer transition-all ${
                      errors.preferredLocation
                        ? 'border-red-400 focus:ring-red-500'
                        : 'border-surface-border'
                    }`}
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    {qualification.locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc === 'Not sure yet'
                          ? `Not sure yet (${qualification.locationHelper})`
                          : loc}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-ink-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.preferredLocation && (
                  <p className="text-xs text-red-500 mt-1.5">
                    {errors.preferredLocation}
                  </p>
                )}
              </div>

              {/* Next Button */}
              <div className="pt-4 flex justify-end">
                <Button size="lg" onClick={handleNext} className="group">
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Tell Us About Your Buying Plans */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h1 className="text-xl sm:text-2xl font-bold text-ink-dark tracking-tight">
                {qualification.step2Heading}
              </h1>

              {/* Budget Range Dropdown */}
              <div>
                <label
                  htmlFor="budgetRange"
                  className="block text-xs font-semibold text-ink-dark mb-1.5"
                >
                  {qualification.budgetLabel} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="budgetRange"
                    value={budgetRange}
                    onChange={(e) => {
                      setBudgetRange(e.target.value);
                      if (errors.budgetRange) {
                        setErrors((prev) => ({ ...prev, budgetRange: '' }));
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-ink-dark bg-surface-light/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-800 appearance-none pr-10 cursor-pointer transition-all ${
                      errors.budgetRange
                        ? 'border-red-400 focus:ring-red-500'
                        : 'border-surface-border'
                    }`}
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    {qualification.budgetRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-ink-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.budgetRange && (
                  <p className="text-xs text-red-500 mt-1.5">{errors.budgetRange}</p>
                )}
              </div>

              {/* Timeframe Dropdown */}
              <div>
                <label
                  htmlFor="purchaseTimeframe"
                  className="block text-xs font-semibold text-ink-dark mb-1.5"
                >
                  {qualification.timeframeLabel} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="purchaseTimeframe"
                    value={purchaseTimeframe}
                    onChange={(e) => {
                      setPurchaseTimeframe(e.target.value);
                      if (errors.purchaseTimeframe) {
                        setErrors((prev) => ({ ...prev, purchaseTimeframe: '' }));
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-ink-dark bg-surface-light/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-800 appearance-none pr-10 cursor-pointer transition-all ${
                      errors.purchaseTimeframe
                        ? 'border-red-400 focus:ring-red-500'
                        : 'border-surface-border'
                    }`}
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    {qualification.timeframes.map((tf) => (
                      <option key={tf} value={tf}>
                        {tf}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-ink-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.purchaseTimeframe && (
                  <p className="text-xs text-red-500 mt-1.5">
                    {errors.purchaseTimeframe}
                  </p>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between">
                <Button variant="ghost" size="md" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  <span>Back</span>
                </Button>
                <Button size="lg" onClick={handleNext} className="group">
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Where Can We Reach You? */}
          {currentStep === 3 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h1 className="text-xl sm:text-2xl font-bold text-ink-dark tracking-tight">
                {qualification.step3Heading}
              </h1>

              {/* Name */}
              <div>
                <label
                  htmlFor="buyerName"
                  className="block text-xs font-semibold text-ink-dark mb-1.5"
                >
                  {qualification.nameLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  id="buyerName"
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: '' }));
                  }}
                  placeholder="Your full name"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-ink-dark placeholder-ink-subtle/70 bg-surface-light/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-800 transition-all ${
                    errors.firstName ? 'border-red-400 focus:ring-red-500' : 'border-surface-border'
                  }`}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                )}
              </div>

              {/* WhatsApp Number */}
              <div>
                <label
                  htmlFor="buyerPhone"
                  className="block text-xs font-semibold text-ink-dark mb-1.5"
                >
                  {qualification.whatsappLabel} <span className="text-red-500">*</span>
                </label>
                <div className="relative flex rounded-xl border border-surface-border bg-surface-light/60 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-800 transition-all overflow-hidden">
                  <span className="inline-flex items-center px-3 sm:px-3.5 border-r border-surface-border text-xs font-medium text-ink-muted select-none shrink-0 bg-surface-muted/40">
                    🇳🇬 +234
                  </span>
                  <input
                    id="buyerPhone"
                    type="tel"
                    inputMode="tel"
                    value={whatsapp}
                    onChange={(e) => {
                      setWhatsapp(e.target.value);
                      if (errors.whatsapp) setErrors((prev) => ({ ...prev, whatsapp: '' }));
                    }}
                    placeholder="0801 234 5678"
                    className="w-full min-w-0 px-3 sm:px-3.5 py-2.5 bg-transparent text-sm text-ink-dark placeholder-ink-subtle/70 focus:outline-none"
                  />
                </div>
                {errors.whatsapp && (
                  <p className="text-xs text-red-500 mt-1">{errors.whatsapp}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="buyerEmail"
                  className="block text-xs font-semibold text-ink-dark mb-1.5"
                >
                  {qualification.emailLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  id="buyerEmail"
                  type="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
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

              {/* Optional Consent (Explicitly Unchecked) */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-surface-border text-brand-900 focus:ring-brand-800 cursor-pointer"
                  />
                  <span className="text-xs text-ink-muted leading-relaxed">
                    {qualification.consentLabel}
                  </span>
                </label>
              </div>

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between">
                <Button variant="ghost" size="md" type="button" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  <span>Back</span>
                </Button>
                <Button type="submit" size="lg" className="group">
                  <span>Submit</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </form>
          )}
        </Card>
      </main>

      <Footer />
    </div>
  );
};
