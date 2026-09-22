export type LeadIntent = 'resource_only' | 'buyer_qualification' | 'direct_inspection';

export interface ContactData {
  firstName: string;
  whatsapp: string;
  email: string;
  marketingConsent: boolean;
}

export interface InspectionLeadData {
  firstName: string;
  whatsapp: string;
  propertyOfInterest: string;
}

export interface BuyerProfileData {
  propertyType: string;
  preferredLocation: string;
  budgetRange: string;
  purchaseTimeframe: string;
}

export interface CapturedLead {
  id: string;
  submittedAt: string;
  intent: LeadIntent;
  contact: ContactData;
  buyerProfile?: BuyerProfileData;
  propertyOfInterest?: string;
  source: string;
}

export interface HeroProofItem {
  metric: string;
  explanation: string;
}

export interface CompanyProofItem {
  value: string;
  label: string;
}

export interface ProblemItem {
  id: string;
  label: string;
  title: string;
  consequence: string;
  solution: string;
  ctaText: string;
}

export interface BenefitItem {
  id: string;
  text: string;
}

export interface GuideContentItem {
  id: string;
  number: string;
  title: string;
  explanation: string;
}

export interface SocialProofReview {
  id: string;
  review: string;
  author: string;
}
