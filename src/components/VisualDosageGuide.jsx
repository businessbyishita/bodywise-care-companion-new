import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, Droplets, HelpCircle, ShieldAlert, Sparkles, X } from 'lucide-react';

/**
 * Visual Dosage Reference & Clinical Rationing Prevention Guide
 * Renders custom SVG illustrations in brand color #005995 and white.
 */
export default function VisualDosageGuide({ product, compact = false }) {
  const [showRationingWhy, setShowRationingWhy] = useState(!compact);

  // Render dosage illustration by product visualDosageType
  const renderVisualDosageSvg = () => {
    switch (product.visualDosageType) {
      case 'swipes':
        return (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
            {/* Clinical Recommended Dosage */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-bodywise-50 border border-bodywise-300 w-full sm:w-1/2">
              <svg viewBox="0 0 80 80" className="w-16 h-16 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="36" fill="#DCEEF7" stroke="#BDE0F1" strokeWidth="1.5" strokeDasharray="3,3" />
                {/* Armpit curvature silhouette */}
                <path d="M 20,20 C 35,45 45,55 60,60" stroke="#E2F0F8" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* 2 overlapping firm swipes in #005995 */}
                <path d="M 28,26 C 38,42 46,50 56,54" stroke="#005995" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.85" fill="none" />
                <path d="M 24,32 C 34,46 42,54 52,58" stroke="#00487A" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.95" fill="none" />
                {/* Check badge */}
                <circle cx="64" cy="20" r="10" fill="#005995" />
                <path d="M 60,20 L 63,23 L 68,17" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-bodywise-800 uppercase tracking-wide">Target Clinical Dose</span>
                  <span className="px-1.5 py-0.2 bg-bodywise-200 text-bodywise-900 text-[9px] rounded font-semibold">Active pH 3.8</span>
                </div>
                <p className="text-xs font-bold text-bodywise-950 mt-0.5">2 Full Firm Swipes</p>
                <p className="text-[11px] text-bodywise-700">~0.5 ml per arm • Full axillary skin coverage</p>
              </div>
            </div>

            {/* Under-dosing / Rationing Warning */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-bodywise-200 w-full sm:w-1/2">
              <svg viewBox="0 0 80 80" className="w-16 h-16 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="36" fill="#F8FAFC" stroke="#E2F0F8" strokeWidth="1.5" strokeDasharray="3,3" />
                <path d="M 20,20 C 35,45 45,55 60,60" stroke="#E2F0F8" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* 1 weak patchy swipe */}
                <path d="M 32,36 C 36,40 40,44 44,46" stroke="#BDE0F1" strokeWidth="2.5" strokeDasharray="2,2" strokeLinecap="round" fill="none" />
                {/* Cross badge */}
                <circle cx="64" cy="20" r="10" fill="#00385F" />
                <path d="M 61,17 L 67,23 M 67,17 L 61,23" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-bodywise-800 uppercase tracking-wide">Under-Dosing / Rationing</span>
                  <span className="px-1.5 py-0.2 bg-bodywise-100 text-bodywise-800 text-[9px] rounded font-semibold">Ineffective</span>
                </div>
                <p className="text-xs font-bold text-bodywise-900 mt-0.5">1 Hesitant Tap / Light Drag</p>
                <p className="text-[11px] text-bodywise-600">&lt;0.15 ml • Fails to lower skin pH threshold</p>
              </div>
            </div>
          </div>
        );

      case 'coin_pump':
        return (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
            {/* 1 Full Coin Pump (5ml) */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-bodywise-50 border border-bodywise-300 w-full sm:w-1/2">
              <svg viewBox="0 0 80 80" className="w-16 h-16 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="36" fill="#DCEEF7" stroke="#BDE0F1" strokeWidth="1.5" strokeDasharray="3,3" />
                {/* Coin pool */}
                <ellipse cx="40" cy="44" rx="24" ry="18" fill="rgba(0, 89, 149, 0.3)" stroke="#005995" strokeWidth="2" />
                <ellipse cx="38" cy="42" rx="18" ry="13" fill="rgba(0, 89, 149, 0.6)" />
                <text x="40" y="46" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FFFFFF">5 ml</text>
                {/* Check badge */}
                <circle cx="64" cy="20" r="10" fill="#005995" />
                <path d="M 60,20 L 63,23 L 68,17" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-bodywise-800 uppercase tracking-wide">Target Clinical Dose</span>
                  <span className="px-1.5 py-0.2 bg-bodywise-200 text-bodywise-900 text-[9px] rounded font-semibold">1% Active BHA</span>
                </div>
                <p className="text-xs font-bold text-bodywise-950 mt-0.5">1 Coin-Sized Pump (5 ml)</p>
                <p className="text-[11px] text-bodywise-700">Sufficient volume to coat back, chest & thighs</p>
              </div>
            </div>

            {/* Rationed Pea Drop */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-bodywise-200 w-full sm:w-1/2">
              <svg viewBox="0 0 80 80" className="w-16 h-16 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="36" fill="#F8FAFC" stroke="#E2F0F8" strokeWidth="1.5" strokeDasharray="3,3" />
                <circle cx="40" cy="44" r="7" fill="rgba(0, 89, 149, 0.25)" stroke="#005995" strokeWidth="1.5" />
                <text x="40" y="47" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#00487A">1ml</text>
                <circle cx="64" cy="20" r="10" fill="#00385F" />
                <path d="M 61,17 L 67,23 M 67,17 L 61,23" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-bodywise-800 uppercase tracking-wide">Under-Dosing / Rationing</span>
                  <span className="px-1.5 py-0.2 bg-bodywise-100 text-bodywise-800 text-[9px] rounded font-semibold">Washes Off</span>
                </div>
                <p className="text-xs font-bold text-bodywise-900 mt-0.5">Pea-sized Drizzle (&lt;2 ml)</p>
                <p className="text-[11px] text-bodywise-600">Dilutes in shower water before lipid contact</p>
              </div>
            </div>
          </div>
        );

      case 'dropper_sections':
        return (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
            {/* 1 Full Dropper (1ml) across 4 Scalp Quadrants */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-bodywise-50 border border-bodywise-300 w-full sm:w-1/2">
              <svg viewBox="0 0 80 80" className="w-16 h-16 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="36" fill="#DCEEF7" stroke="#BDE0F1" strokeWidth="1.5" strokeDasharray="3,3" />
                <circle cx="40" cy="42" r="22" fill="#FFFFFF" stroke="#BDE0F1" strokeWidth="1.5" />
                <line x1="40" y1="20" x2="40" y2="64" stroke="#E2F0F8" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="18" y1="42" x2="62" y2="42" stroke="#E2F0F8" strokeWidth="1" strokeDasharray="2,2" />
                
                {/* 4 potent targeted dropper dots in #005995 */}
                <circle cx="31" cy="33" r="4.5" fill="#005995" />
                <circle cx="49" cy="33" r="4.5" fill="#005995" />
                <circle cx="31" cy="51" r="4.5" fill="#005995" />
                <circle cx="49" cy="51" r="4.5" fill="#005995" />

                {/* Check badge */}
                <circle cx="64" cy="20" r="10" fill="#005995" />
                <path d="M 60,20 L 63,23 L 68,17" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-bodywise-800 uppercase tracking-wide">Target Clinical Dose</span>
                  <span className="px-1.5 py-0.2 bg-bodywise-200 text-bodywise-900 text-[9px] rounded font-semibold">3% Redensyl</span>
                </div>
                <p className="text-xs font-bold text-bodywise-950 mt-0.5">1 Full Pipette (1.0 ml)</p>
                <p className="text-[11px] text-bodywise-700">4 scalp sections (Crown, Temples, Midline)</p>
              </div>
            </div>

            {/* Droplets on Hair Strands */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-bodywise-200 w-full sm:w-1/2">
              <svg viewBox="0 0 80 80" className="w-16 h-16 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="36" fill="#F8FAFC" stroke="#E2F0F8" strokeWidth="1.5" strokeDasharray="3,3" />
                <circle cx="40" cy="42" r="22" fill="#FFFFFF" stroke="#E2F0F8" strokeWidth="1.5" />
                <circle cx="40" cy="35" r="2.5" fill="#BDE0F1" />
                <circle cx="64" cy="20" r="10" fill="#00385F" />
                <path d="M 61,17 L 67,23 M 67,17 L 61,23" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-bodywise-800 uppercase tracking-wide">Under-Dosing / Rationing</span>
                  <span className="px-1.5 py-0.2 bg-bodywise-100 text-bodywise-800 text-[9px] rounded font-semibold">Sub-therapeutic</span>
                </div>
                <p className="text-xs font-bold text-bodywise-900 mt-0.5">2-3 Drops on Surface Hair</p>
                <p className="text-[11px] text-bodywise-600">Evaporates on hair shaft; never hits dermal roots</p>
              </div>
            </div>
          </div>
        );

      case 'gummy':
      default:
        return (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-bodywise-50 border border-bodywise-300">
            <div className="w-12 h-12 rounded-xl bg-bodywise-100 flex items-center justify-center flex-shrink-0 text-bodywise-600">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-bodywise-800 uppercase tracking-wide">Daily Clinical Serving</span>
              <p className="text-xs font-bold text-bodywise-950">{product.doseDescription}</p>
              <p className="text-[11px] text-bodywise-700">Chew thoroughly after morning breakfast for sustained bioavailability</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-2 border-b border-bodywise-100">
        <div className="flex items-center gap-1.5">
          <Droplets className="w-4 h-4 text-bodywise-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-bodywise-900">
            Clinical Dosage Reference
          </h4>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-bodywise-100 text-bodywise-800 border border-bodywise-200">
          Exact Amount: {product.visualDosageValue}
        </span>
      </div>

      {/* Visual Dosage Comparison SVG */}
      <div className="mt-2.5">
        {renderVisualDosageSvg()}
      </div>

      {/* Why Rationing Slows Results Callout */}
      <div className="mt-3 rounded-xl border border-bodywise-300 bg-bodywise-50/80 p-3.5 shadow-warm-sm transition-all">
        <div 
          className="flex items-start justify-between cursor-pointer select-none"
          onClick={() => setShowRationingWhy(!showRationingWhy)}
        >
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-full bg-bodywise-200 text-bodywise-800">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
            <h5 className="text-xs font-bold text-bodywise-950 tracking-tight">
              Why Rationing or Under-Dosing Halts Results
            </h5>
          </div>
          <button 
            type="button" 
            className="text-bodywise-600 hover:text-bodywise-900 transition-colors p-0.5"
            aria-label="Toggle clinical rationale"
          >
            {showRationingWhy ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showRationingWhy && (
          <div className="mt-2.5 pt-2.5 border-t border-bodywise-200 text-xs text-bodywise-800 leading-relaxed space-y-2 animate-fade-in">
            <p>
              <strong className="text-bodywise-900 font-semibold">Active Ingredient Threshold: </strong>
              {product.whyRationingFails}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-bodywise-700 font-medium bg-white px-2.5 py-1.5 rounded-lg border border-bodywise-200">
              <HelpCircle className="w-3.5 h-3.5 text-bodywise-600 flex-shrink-0" />
              <span>
                Using the prescribed <strong>{product.dosePerUseMl} ml</strong> ensures your bottle empties on schedule (Week {product.cycleWeeksTotal}) right when optimal biological results mature.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
