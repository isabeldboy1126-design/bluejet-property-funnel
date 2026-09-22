import React, { createContext, useContext, useState, useEffect } from 'react';
import { CapturedLead, ContactData, BuyerProfileData, LeadIntent, InspectionLeadData } from '../types/funnel';

interface FunnelContextType {
  intent: LeadIntent | null;
  setIntent: (intent: LeadIntent) => void;
  contact: ContactData;
  setContact: React.Dispatch<React.SetStateAction<ContactData>>;
  buyerProfile: BuyerProfileData;
  setBuyerProfile: React.Dispatch<React.SetStateAction<BuyerProfileData>>;
  latestLead: CapturedLead | null;
  capturedLeads: CapturedLead[];
  isInspectionModalOpen: boolean;
  inspectionInitialProperty: string;
  openInspectionModal: (initialProperty?: string) => void;
  closeInspectionModal: () => void;
  submitResourceLead: (contactData: ContactData) => CapturedLead;
  submitBuyerLead: (contactData: ContactData, profileData: BuyerProfileData) => CapturedLead;
  submitInspectionLead: (leadData: InspectionLeadData) => CapturedLead;
  resetFunnel: () => void;
}

const initialContact: ContactData = {
  firstName: '',
  whatsapp: '',
  email: '',
  marketingConsent: false, // Explicitly unchecked by default
};

const initialBuyerProfile: BuyerProfileData = {
  propertyType: '',
  preferredLocation: '',
  budgetRange: '',
  purchaseTimeframe: '',
};

const FunnelContext = createContext<FunnelContextType | undefined>(undefined);

const STORAGE_KEY = 'real_estate_funnel_leads_v1';

export const FunnelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [intent, setIntent] = useState<LeadIntent | null>(null);
  const [contact, setContact] = useState<ContactData>(initialContact);
  const [buyerProfile, setBuyerProfile] = useState<BuyerProfileData>(initialBuyerProfile);
  const [latestLead, setLatestLead] = useState<CapturedLead | null>(null);
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState<boolean>(false);
  const [inspectionInitialProperty, setInspectionInitialProperty] = useState<string>('');
  const [capturedLeads, setCapturedLeads] = useState<CapturedLead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(capturedLeads));
    } catch (e) {
      console.warn('Could not persist leads to localStorage', e);
    }
  }, [capturedLeads]);

  const openInspectionModal = (initialProperty = '') => {
    setInspectionInitialProperty(initialProperty);
    setIsInspectionModalOpen(true);
  };

  const closeInspectionModal = () => {
    setIsInspectionModalOpen(false);
  };

  const submitResourceLead = (contactData: ContactData): CapturedLead => {
    const newLead: CapturedLead = {
      id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      submittedAt: new Date().toISOString(),
      intent: 'resource_only',
      contact: contactData,
      source: 'organic_funnel_demo',
    };

    setLatestLead(newLead);
    setCapturedLeads((prev) => [newLead, ...prev]);
    return newLead;
  };

  const submitBuyerLead = (
    contactData: ContactData,
    profileData: BuyerProfileData
  ): CapturedLead => {
    const newLead: CapturedLead = {
      id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      submittedAt: new Date().toISOString(),
      intent: 'buyer_qualification',
      contact: contactData,
      buyerProfile: profileData,
      source: 'organic_funnel_demo',
    };

    setLatestLead(newLead);
    setCapturedLeads((prev) => [newLead, ...prev]);
    return newLead;
  };

  const submitInspectionLead = (leadData: InspectionLeadData): CapturedLead => {
    const newLead: CapturedLead = {
      id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      submittedAt: new Date().toISOString(),
      intent: 'direct_inspection',
      contact: {
        firstName: leadData.firstName,
        whatsapp: leadData.whatsapp,
        email: '',
        marketingConsent: true,
      },
      propertyOfInterest: leadData.propertyOfInterest,
      metadata: leadData.metadata,
      source: leadData.metadata?.utmSource && leadData.metadata.utmSource !== 'direct' 
        ? `campaign_${leadData.metadata.utmSource}` 
        : 'direct_inspection_cta',
    };

    setLatestLead(newLead);
    setCapturedLeads((prev) => [newLead, ...prev]);
    return newLead;
  };

  const resetFunnel = () => {
    setIntent(null);
    setContact(initialContact);
    setBuyerProfile(initialBuyerProfile);
  };

  return (
    <FunnelContext.Provider
      value={{
        intent,
        setIntent,
        contact,
        setContact,
        buyerProfile,
        setBuyerProfile,
        latestLead,
        capturedLeads,
        isInspectionModalOpen,
        inspectionInitialProperty,
        openInspectionModal,
        closeInspectionModal,
        submitResourceLead,
        submitBuyerLead,
        submitInspectionLead,
        resetFunnel,
      }}
    >
      {children}
    </FunnelContext.Provider>
  );
};

export const useFunnel = () => {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error('useFunnel must be used within a FunnelProvider');
  }
  return context;
};
