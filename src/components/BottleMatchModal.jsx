import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, HelpCircle, ArrowRight, Sparkles, Scale, RefreshCw } from 'lucide-react';
import DepletingBottleSvg from './DepletingBottleSvg';

export default function BottleMatchModal({
  product,
  onClose,
  onUpdateFillPercent = null
}) {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [customPercent, setCustomPercent] = useState(product.currentFillPercent);
  const [showCalibrate, setShowCalibrate] = useState(false);

  if (!product) return null;

  const handleMatchSelect = (matchType) => {
    setSelectedMatch(matchType);
  };

  const handleSaveCalibration = () => {
    if (onUpdateFillPercent) {
      onUpdateFillPercent(product.id, customPercent);
    }
    setShowCalibrate(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002742]/70 backdrop-blur-md animate-fade-in">
      {/* Modal Card with Solid White Background */}
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border-2 border-[#DCEEF7] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header in Brand #005995 */}
        <div className="px-6 py-4 bg-[#F0F7FB] text-[#002742] border-b border-[#DCEEF7] flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-white flex items-center justify-center text-[#334155] shadow-sm">
              <Scale className="w-5 h-5 text-[#334155]" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-white/80">Clinical Verification</span>
              <h3 className="text-base font-black text-white">Physical Bottle Match Check</h3>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body on Solid White */}
        <div className="p-6 overflow-y-auto space-y-6 bg-white">
          {/* Main Visual Comparison Box on Solid White with #005995 Border */}
          <div className="p-5 rounded-2xl bg-white border-2 border-[#DCEEF7] shadow-md flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-shrink-0 p-3 rounded-2xl bg-[#F8FAFC] border border-[#DCEEF7] shadow-sm flex items-center justify-center">
              <DepletingBottleSvg 
                type={product.bottleType}
                fillPercent={showCalibrate ? customPercent : product.currentFillPercent}
                liquidColor="rgba(0, 89, 149, 0.55)"
                accentColor="#005995"
                remainingUses={product.remainingUses}
                totalApplications={product.totalApplications}
                dosePerUseMl={product.dosePerUseMl}
                size="md"
              />
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-left">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-black bg-[#F0F7FB] text-[#334155] border border-[#DCEEF7] shadow-sm">
                Current App Tracker: {product.currentFillPercent}% Full
              </div>
              <h4 className="text-sm font-black text-[#002742]">
                Does your physical bathroom bottle look roughly this full?
              </h4>
              <p className="text-xs text-[#00487A] leading-relaxed font-medium">
                Be Bodywise clinical formulas are measured to deliver maximum biological turnover within a <strong>{product.cycleWeeksTotal}-week cycle</strong>. Checking your physical fluid level ensures you aren't under-applying or rationing doses.
              </p>
            </div>
          </div>

          {/* Interactive User Choices on Solid White */}
          {!selectedMatch ? (
            <div className="space-y-3">
              <p className="text-xs font-black text-[#002742] uppercase tracking-wider">
                Select what best describes your bottle right now:
              </p>

              {/* Option 1: Matches */}
              <button
                type="button"
                onClick={() => handleMatchSelect('matched')}
                className="w-full text-left p-4 rounded-xl border-2 border-[#DCEEF7] bg-white hover:border-[#DCEEF7] hover:bg-[#F8FAFC] transition-all flex items-start gap-3.5 group shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-[#F0F7FB] text-[#334155] border border-[#DCEEF7] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-black text-[#002742] group-hover:text-[#334155]">
                    Yes, it matches roughly! (~{product.currentFillPercent}% full)
                  </p>
                  <p className="text-[11px] text-[#00487A] mt-0.5 font-medium">
                    You are applying the exact clinical amount ({product.doseDescription}). On track for expected results!
                  </p>
                </div>
              </button>

              {/* Option 2: Bottle is Fuller (Rationing warning!) */}
              <button
                type="button"
                onClick={() => handleMatchSelect('fuller')}
                className="w-full text-left p-4 rounded-xl border-2 border-[#DCEEF7] bg-white hover:border-[#DCEEF7] hover:bg-[#F8FAFC] transition-all flex items-start gap-3.5 group shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-[#DCEEF7] text-[#334155] border border-[#DCEEF7] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm group-hover:scale-110 transition-transform">
                  <AlertTriangle className="w-5 h-5 text-[#334155]" />
                </div>
                <div>
                  <p className="text-xs font-black text-[#002742] group-hover:text-[#334155]">
                    No, my physical bottle is noticeably fuller! (I might be rationing)
                  </p>
                  <p className="text-[11px] text-[#00487A] mt-0.5 font-medium">
                    You may be hesitant or applying tiny micro-drops that fall below the active threshold.
                  </p>
                </div>
              </button>

              {/* Option 3: Bottle is Emptier */}
              <button
                type="button"
                onClick={() => handleMatchSelect('emptier')}
                className="w-full text-left p-4 rounded-xl border-2 border-[#DCEEF7] bg-white hover:border-[#DCEEF7] hover:bg-[#F8FAFC] transition-all flex items-start gap-3.5 group shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-[#F8FAFC] text-[#334155] border border-[#DCEEF7] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-5 h-5 text-[#334155]" />
                </div>
                <div>
                  <p className="text-xs font-black text-[#002742] group-hover:text-[#334155]">
                    No, my bottle is noticeably emptier than this!
                  </p>
                  <p className="text-[11px] text-[#00487A] mt-0.5 font-medium">
                    You may be applying extra or sharing with a sibling or partner.
                  </p>
                </div>
              </button>
            </div>
          ) : (
            /* Selected Feedback Card on Solid White */
            <div className="space-y-4 animate-fade-in bg-white">
              {selectedMatch === 'matched' && (
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border-2 border-[#DCEEF7] space-y-2">
                  <div className="flex items-center gap-2 text-[#334155] font-extrabold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#334155]" />
                    <span>Clinical Dosage Calibration: Optimal!</span>
                  </div>
                  <p className="text-xs text-[#002742] leading-relaxed font-medium">
                    Great job! Your current depletion rate reflects consistent therapeutic dosing ({product.doseDescription}). At this rate, your skin is absorbing the target concentration required for Week {product.currentWeek} cellular milestones.
                  </p>
                </div>
              )}

              {selectedMatch === 'fuller' && (
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border-2 border-[#DCEEF7] space-y-3">
                  <div className="flex items-center gap-2 text-[#334155] font-extrabold text-sm">
                    <AlertTriangle className="w-5 h-5 text-[#334155] flex-shrink-0" />
                    <span>Clinical Alert: You May Be Rationing Your Active Ingredients</span>
                  </div>
                  <p className="text-xs text-[#002742] leading-relaxed font-semibold">
                    Because active molecules like <strong>{product.name}</strong> operate on a concentration gradient, under-applying causes the formulation to dry or wash off before penetrating into the dermis.
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-[#DCEEF7] text-xs text-[#00385F]">
                    <strong className="text-[#334155]">Recommended Action for Tomorrow: </strong>
                    Ensure you apply the full recommended dose: <span className="font-extrabold text-[#002742]">{product.doseDescription}</span>. Don't worry about "running out quickly" — each bottle is specifically filled to last the full <strong>{product.cycleWeeksTotal}-week treatment cycle</strong>.
                  </div>
                </div>
              )}

              {selectedMatch === 'emptier' && (
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border-2 border-[#DCEEF7] space-y-2">
                  <div className="flex items-center gap-2 text-[#334155] font-extrabold text-sm">
                    <HelpCircle className="w-5 h-5 text-[#334155]" />
                    <span>High Depletion Rate Noted</span>
                  </div>
                  <p className="text-xs text-[#002742] leading-relaxed font-medium">
                    Applying more than <strong>{product.dosePerUseMl} ml</strong> per dose won't speed up cellular results and might cause unnecessary skin sensitivity. Stick to the prescribed {product.doseDescription} so your supply lasts through the expected clinical milestone at Week {product.cycleWeeksTotal}.
                  </p>
                </div>
              )}

              {/* Option to re-select or calibrate slider */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedMatch(null)}
                  className="text-xs text-[#334155] hover:text-[#00385F] underline font-bold"
                >
                  ← Pick another observation
                </button>

                <button
                  type="button"
                  onClick={() => setShowCalibrate(!showCalibrate)}
                  className="text-xs text-[#334155] hover:text-[#00385F] font-extrabold flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#334155]" />
                  {showCalibrate ? 'Hide Calibration' : 'Calibrate Virtual Level'}
                </button>
              </div>

              {/* Calibration Slider on Solid White */}
              {showCalibrate && (
                <div className="p-4 rounded-xl bg-white border-2 border-[#DCEEF7] space-y-3 animate-fade-in shadow-sm">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#002742]">Set Exact Physical Level:</span>
                    <span className="font-black text-[#334155] text-sm">{customPercent}% Full</span>
                  </div>
                  <input 
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={customPercent}
                    onChange={(e) => setCustomPercent(Number(e.target.value))}
                    className="w-full accent-[#005995] cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={handleSaveCalibration}
                    className="w-full py-2.5 bg-[#005995] text-white rounded-lg text-xs font-bold hover:bg-[#00487A] transition-colors shadow-sm"
                  >
                    Sync Virtual Bottle to {customPercent}%
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer in Solid White */}
        <div className="px-6 py-4 bg-white border-t-2 border-[#DCEEF7] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#005995] text-white text-xs font-bold hover:bg-[#00487A] transition-colors shadow-md"
          >
            Done & Return to Routine
          </button>
        </div>
      </div>
    </div>
  );
}
