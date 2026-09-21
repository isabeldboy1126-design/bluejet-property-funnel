import {
  HeroProofItem,
  CompanyProofItem,
  ProblemItem,
  BenefitItem,
  GuideContentItem,
  SocialProofReview,
} from '../types/funnel';

export interface FunnelConfig {
  company: {
    name: string;
    logoText: string;
    websiteUrl: string;
    advisorContactUrl: string;
    supportEmail: string;
    bio: string;
  };
  landingPage: {
    announcementPill: string;
    headlinePrefix: string;
    headlineHighlight: string;
    headlineSuffix: string;
    supportingText: string;
    valuePoints: string[];
    mainCtaText: string;
    ctaMicrocopy: string;
    heroProof: HeroProofItem[];
    companyEyebrow: string;
    companyHeadingPrefix: string;
    companyHeadingHighlight: string;
    companyBody: string;
    companyProofItems: CompanyProofItem[];
    problemEyebrow: string;
    problemHeadingPrefix: string;
    problemHeadingHighlight: string;
    problems: ProblemItem[];
    benefitsEyebrow: string;
    benefitsHeadingPrefix: string;
    benefitsHeadingHighlight: string;
    benefitsList: BenefitItem[];
    benefitsSupporting: string;
    benefitsCtaText: string;
    insideEyebrow: string;
    insideHeadingPrefix: string;
    insideHeadingHighlight: string;
    insideItems: GuideContentItem[];
    insideCtaText: string;
    showSocialProof: boolean;
    socialProofEyebrow: string;
    socialProofHeadingPrefix: string;
    socialProofHeadingHighlight: string;
    socialProofSupporting: string;
    socialProofReviews: SocialProofReview[];
    socialProofCtaText: string;
    finalCtaHeadingPrefix: string;
    finalCtaHeadingHighlight: string;
    finalCtaBody: string;
    finalCtaButtonText: string;
  };
  intentPage: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryOption: {
      title: string;
      support: string;
      badge: string;
    };
    secondaryOption: {
      title: string;
      support: string;
      badge: string;
    };
  };
  qualification: {
    step1Heading: string;
    propertyTypeLabel: string;
    locationLabel: string;
    locationHelper: string;
    propertyTypes: string[];
    locations: string[];
    step2Heading: string;
    budgetLabel: string;
    timeframeLabel: string;
    budgetRanges: string[];
    timeframes: string[];
    step3Heading: string;
    nameLabel: string;
    whatsappLabel: string;
    emailLabel: string;
    consentLabel: string;
  };
  resourceForm: {
    eyebrow: string;
    heading: string;
    subheading: string;
    submitButtonText: string;
    consentLabel: string;
    trustNote: string;
  };
  resourceSuccess: {
    eyebrow: string;
    heading: string;
    subheading: string;
    sampleDownloadLabel: string;
    downloadFilename: string;
    companyCtaTitle: string;
    companyCtaDescription: string;
    companyCtaButtonText: string;
  };
  buyerSuccess: {
    headingTemplate: string;
    body: string;
    bridgeEyebrow: string;
    bridgeHeading: string;
    bridgeBody: string;
    primaryCtaText: string;
    secondaryCtaText: string;
  };
}

export const funnelConfig: FunnelConfig = {
  company: {
    name: '[COMPANY NAME]',
    logoText: '[COMPANY NAME]',
    websiteUrl: 'https://mockup-01-land-sales.vercel.app/',
    advisorContactUrl: 'https://wa.me/2340000000000?text=Hello%2C%20I%20would%20like%20to%20speak%20with%20an%20advisor',
    supportEmail: 'contact@example.com',
    bio: 'Two to three sentences explaining who the company is, what relevant experience they have, and why that experience makes this resource worth paying attention to.',
  },
  landingPage: {
    announcementPill: 'FREE BUYER RESOURCE',
    headlinePrefix: 'Achieve',
    headlineHighlight: '[DESIRED PROPERTY OUTCOME]',
    headlineSuffix: 'With More Confidence',
    supportingText:
      'One short sentence explaining how the free resource helps the buyer achieve the desired outcome.',
    valuePoints: [
      'Important thing the buyer will understand',
      'Important risk the resource helps reduce',
      'Important decision the resource helps improve',
    ],
    mainCtaText: 'Get the Free Guide',
    ctaMicrocopy: 'Free access. Instant download without obligation.',
    heroProof: [
      {
        metric: 'XX+ YEARS',
        explanation: 'Relevant Experience',
      },
      {
        metric: 'XXX+',
        explanation: 'Relevant Result Metric',
      },
      {
        metric: 'PROOF SIGNAL',
        explanation: 'Why This Makes the Resource Credible',
      },
    ],
    companyEyebrow: "WHO’S BEHIND THIS GUIDE",
    companyHeadingPrefix: 'Created by',
    companyHeadingHighlight: '[COMPANY NAME]',
    companyBody:
      'Two to three sentences explaining who the company is, what relevant experience they have, and why that experience makes this resource worth paying attention to.',
    companyProofItems: [
      {
        value: 'XX+',
        label: 'Years of relevant experience',
      },
      {
        value: 'XXX+',
        label: 'Relevant company metric',
      },
      {
        value: 'Verified',
        label: 'Professional credential or proof',
      },
    ],
    problemEyebrow: 'WHY THIS GUIDE MATTERS',
    problemHeadingPrefix: 'Avoid the Problems That Make',
    problemHeadingHighlight: 'Property Decisions Harder',
    problems: [
      {
        id: 'p1',
        label: '01 / BUYER CONCERN',
        title: 'Primary buyer fear or obstacle',
        consequence:
          'What could happen if the buyer makes the wrong decision without verifying critical facts.',
        solution:
          'How the guide helps reduce this uncertainty before any financial commitment.',
        ctaText: 'Get help with this concern',
      },
      {
        id: 'p2',
        label: '02 / BUYER CONCERN',
        title: 'Second important fear or obstacle',
        consequence:
          'What could happen if the buyer proceeds without proper due diligence.',
        solution:
          'How the guide helps identify warning signs and avoid costly delays.',
        ctaText: 'Get help with this concern',
      },
      {
        id: 'p3',
        label: '03 / BUYER CONCERN',
        title: 'Third important fear or obstacle',
        consequence:
          'What could happen if the buyer underestimates hidden costs or paperwork.',
        solution:
          'How the guide helps clarify the exact costs and procedural steps.',
        ctaText: 'Get help with this concern',
      },
    ],
    benefitsEyebrow: 'WHAT THIS HELPS YOU DO',
    benefitsHeadingPrefix: 'Get the Clarity You Need to',
    benefitsHeadingHighlight: 'Make a Better Decision',
    benefitsList: [
      { id: 'b1', text: 'Important buyer outcome and decision clarity' },
      { id: 'b2', text: 'Important check completed before committing funds' },
      { id: 'b3', text: 'Important warning sign recognised early' },
      { id: 'b4', text: 'Better questions to ask before moving forward' },
    ],
    benefitsSupporting:
      'One sentence connecting these benefits to a better property-buying decision.',
    benefitsCtaText: 'Get the Resource to Achieve [DESIRED PROPERTY OUTCOME]',
    insideEyebrow: 'WHAT’S INSIDE',
    insideHeadingPrefix: 'What You’ll Learn Before',
    insideHeadingHighlight: 'Taking Your Next Step',
    insideItems: [
      {
        id: 'i1',
        number: '01',
        title: 'Guide topic or framework 01',
        explanation: 'One-line explanation of what this section covers.',
      },
      {
        id: 'i2',
        number: '02',
        title: 'Guide topic or framework 02',
        explanation: 'One-line explanation of what this section covers.',
      },
      {
        id: 'i3',
        number: '03',
        title: 'Buyer checklist or framework 03',
        explanation: 'One-line explanation of what this section covers.',
      },
      {
        id: 'i4',
        number: '04',
        title: 'Questions to ask before buying',
        explanation: 'One-line explanation of what this section covers.',
      },
    ],
    insideCtaText: 'Get Access to These Insights',
    showSocialProof: true,
    socialProofEyebrow: 'RESULTS FROM THE COMPANY BEHIND THE GUIDE',
    socialProofHeadingPrefix: 'Proven Experience Helping Buyers',
    socialProofHeadingHighlight: 'Achieve [DESIRED PROPERTY OUTCOME]',
    socialProofSupporting:
      'Short explanation that the resource was created by a company with relevant experience helping people with similar property decisions.',
    socialProofReviews: [
      {
        id: 'r1',
        review:
          '“Clear guidance and practical verification steps helped us make our property purchase with complete confidence.”',
        author: 'Verified Property Buyer',
      },
      {
        id: 'r2',
        review:
          '“The structured checklist made it easy to spot red flags before committing any funds.”',
        author: 'Private Investor',
      },
      {
        id: 'r3',
        review:
          '“A professional team that prioritizes transparency and thorough due diligence at every stage.”',
        author: 'First-Time Buyer',
      },
    ],
    socialProofCtaText: 'Get the Resource and Take the Next Step',
    finalCtaHeadingPrefix: 'Get the Information You Need to',
    finalCtaHeadingHighlight: 'Move Forward With Confidence',
    finalCtaBody:
      'One short sentence reminding the buyer what they gain from the resource.',
    finalCtaButtonText: 'Get the Free Guide',
  },
  intentPage: {
    eyebrow: 'Step 1 of 2',
    headline: 'What would you like help with?',
    subheadline: 'Select the option that best matches your situation.',
    primaryOption: {
      title: 'Get the Free Guide + [DESIRED PROPERTY OUTCOME]',
      support:
        'Get the resource and tell us what you’re looking for so we can help you [ACHIEVE DESIRED OUTCOME].',
      badge: 'Recommended',
    },
    secondaryOption: {
      title: 'I Just Want the Free Guide',
      support: 'I’m researching for now.',
      badge: 'Resource Only',
    },
  },
  qualification: {
    step1Heading: 'Tell Us What You’re Looking For',
    propertyTypeLabel: 'Property Type',
    locationLabel: 'Preferred Location',
    locationHelper: 'Open to recommendations',
    propertyTypes: [
      'Land',
      'House',
      'Apartment',
      'Commercial Property',
      'Investment Property',
      'Other',
    ],
    locations: [
      'Location 1',
      'Location 2',
      'Location 3',
      'Location 4',
      'Location 5',
      'Not sure yet',
    ],
    step2Heading: 'Tell Us About Your Buying Plans',
    budgetLabel: 'Budget Range',
    timeframeLabel: 'When Are You Looking to Buy?',
    budgetRanges: [
      'Under ₦1M',
      '₦1M – ₦5M',
      '₦5M – ₦10M',
      '₦10M – ₦25M',
      '₦25M – ₦50M',
      '₦50M – ₦100M',
      '₦100M+',
      'Not sure yet',
    ],
    timeframes: [
      'Within 1 month',
      'Within 2–3 months',
      'Within 4–6 months',
      'Within 7–12 months',
      'Within 1–2 years',
      'Just researching / no definite timeline',
    ],
    step3Heading: 'Where Can We Reach You?',
    nameLabel: 'Name',
    whatsappLabel: 'WhatsApp Number',
    emailLabel: 'Email Address',
    consentLabel: 'Keep me updated with relevant future property information or updates.',
  },
  resourceForm: {
    eyebrow: 'Free Resource Access',
    heading: 'Where should we send your free guide?',
    subheading: 'Please provide your details below to access the property buyer guide.',
    submitButtonText: 'Get the Free Guide',
    consentLabel: 'Keep me updated with relevant future property information or updates.',
    trustNote: 'Your information is kept secure and handled in accordance with our privacy policy.',
  },
  resourceSuccess: {
    eyebrow: 'Request Confirmed',
    heading: 'Thanks, [FIRST NAME]',
    subheading: 'We’ve received your details.',
    sampleDownloadLabel: 'Download Sample Guide (Demo PDF)',
    downloadFilename: 'Property-Buyer-Guide-Sample.txt',
    companyCtaTitle: 'Explore [COMPANY NAME]',
    companyCtaDescription: 'Visit our company website to learn more about our work and available developments.',
    companyCtaButtonText: 'Explore [COMPANY NAME]',
  },
  buyerSuccess: {
    headingTemplate: 'Thanks, {name}',
    body: 'We’ve received your details.',
    bridgeEyebrow: 'WHILE YOU WAIT',
    bridgeHeading: 'Benefit-oriented reason to continue to the website',
    bridgeBody:
      'What the prospect can see, understand or compare on the website that helps them make a better property decision.',
    primaryCtaText: 'Outcome-oriented CTA',
    secondaryCtaText: 'Talk to an Advisor',
  },
};
