import React, { useState } from 'react';
import { useFunnel } from '../context/FunnelContext';
import { Database, X, Copy, Check } from 'lucide-react';

export const LeadStorageDrawer: React.FC = () => {
  const { capturedLeads } = useFunnel();
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (lead: any) => {
    navigator.clipboard.writeText(JSON.stringify(lead, null, 2));
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Floating Pill Toggle (Bottom Left, Non-intrusive) */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-dark/90 text-white text-[11px] font-mono hover:bg-ink-dark shadow-lg backdrop-blur cursor-pointer border border-gray-700/80 transition-transform active:scale-95"
        >
          <Database className="w-3.5 h-3.5 text-brand-300" />
          <span>Demo Data ({capturedLeads.length})</span>
        </button>
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end bg-black/40 backdrop-blur-xs p-2 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-surface-border w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="px-5 py-4 border-b border-surface-border flex items-center justify-between bg-surface-muted/50">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-brand-900" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-ink-dark">
                  Captured Demo Leads ({capturedLeads.length})
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-ink-subtle hover:text-ink-dark p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 overflow-y-auto space-y-3 text-xs flex-grow">
              {capturedLeads.length === 0 ? (
                <div className="text-center py-8 text-ink-subtle">
                  <p>No leads captured yet.</p>
                  <p className="text-[11px] mt-1">Submit the Free Resource form, Buyer Qualification form, or Book an Inspection to see real-time structured data.</p>
                </div>
              ) : (
                capturedLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-3 rounded-xl border border-surface-border bg-surface-light font-mono text-[11px] relative"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-brand-900">
                        {lead.intent === 'direct_inspection'
                          ? '📅 Inspection Lead'
                          : lead.intent === 'buyer_qualification'
                          ? '🎯 Qualified Buyer Lead'
                          : '📘 Resource Lead'}
                      </span>
                      <button
                        onClick={() => handleCopy(lead)}
                        className="inline-flex items-center gap-1 text-[10px] text-ink-muted hover:text-ink-dark px-2 py-0.5 rounded bg-surface-card border border-surface-border"
                      >
                        {copiedId === lead.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy JSON</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="overflow-x-auto text-ink-dark text-[10px] bg-white p-2.5 rounded-lg border border-surface-border/60">
                      {JSON.stringify(lead, null, 2)}
                    </pre>
                  </div>
                ))
              )}
            </div>

            <div className="px-5 py-3 border-t border-surface-border bg-surface-muted/30 text-[11px] text-ink-subtle flex justify-between">
              <span>Ready for CRM Webhook / Database connection</span>
              <button
                onClick={() => {
                  localStorage.removeItem('real_estate_funnel_leads_v1');
                  window.location.reload();
                }}
                className="text-red-500 hover:underline"
              >
                Clear leads
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
