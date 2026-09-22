import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FunnelProvider } from './context/FunnelContext';
import { LandingPage } from './pages/LandingPage';
import { IntentPage } from './pages/IntentPage';
import { ResourceFormPage } from './pages/ResourceFormPage';
import { ResourceSuccessPage } from './pages/ResourceSuccessPage';
import { BuyerQualifyPage } from './pages/BuyerQualifyPage';
import { BuyerSuccessPage } from './pages/BuyerSuccessPage';
import { LeadStorageDrawer } from './components/LeadStorageDrawer';
import { InspectionModal } from './components/inspection/InspectionModal';

export const App: React.FC = () => {
  return (
    <FunnelProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/intent" element={<IntentPage />} />
          <Route path="/resource" element={<ResourceFormPage />} />
          <Route path="/resource/success" element={<ResourceSuccessPage />} />
          <Route path="/qualify" element={<BuyerQualifyPage />} />
          <Route path="/qualify/success" element={<BuyerSuccessPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <LeadStorageDrawer />
        <InspectionModal />
      </BrowserRouter>
    </FunnelProvider>
  );
};
