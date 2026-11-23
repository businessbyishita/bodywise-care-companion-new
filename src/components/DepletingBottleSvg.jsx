import React, { useState } from 'react';
import { Droplet, Info, Sparkles } from 'lucide-react';

/**
 * Animated SVG Depleting Bottle / Tube Tracker
 * Uses brand color #005995 and solid crisp pure white (no transparency).
 */
export default function DepletingBottleSvg({
  type = 'rollon',
  fillPercent = 74,
  liquidColor = 'rgba(0, 89, 149, 0.55)',
  accentColor = '#005995',
  remainingUses = 74,
  totalApplications = 100,
  dosePerUseMl = 0.5,
  isAnimating = false,
  onOpenMatchCheck = null,
  size = 'md' // 'sm' | 'md' | 'lg'
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Clamped percentage
  const clampedPercent = Math.max(2, Math.min(100, fillPercent));
  
  // Calculate SVG fluid height inside the bottle cavity
  const cavityTop = 40;
  const cavityBottom = 170;
  const cavityHeight = cavityBottom - cavityTop;
  const liquidHeight = (clampedPercent / 100) * cavityHeight;
  const liquidY = cavityBottom - liquidHeight;

  // Sizing styles
  const sizeClasses = {
    sm: 'w-16 h-28',
    md: 'w-24 h-40',
    lg: 'w-32 h-52'
  }[size] || 'w-24 h-40';

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`relative ${sizeClasses} cursor-pointer group transition-transform duration-300 hover:scale-105`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onOpenMatchCheck && onOpenMatchCheck()}
        title="Click to check your physical bottle fill level match"
      >
        {/* Glow when animating drop */}
        {isAnimating && (
          <div 
            className="absolute -inset-2 rounded-2xl blur-md opacity-75 animate-ping bg-[#005995]"
          />
        )}

        {/* SVG Bottle Rendering by Type */}
        <svg 
          viewBox="0 0 100 200" 
          className={`w-full h-full drop-shadow-md select-none transition-all duration-500 ${isAnimating ? 'bottle-drop-animate' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Linear gradient for fluid depth in brand blue */}
            <linearGradient id={`liquidGrad-${type}-${clampedPercent}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00487A" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#005995" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#00385F" stopOpacity="0.9" />
            </linearGradient>

            {/* Glass reflection gradient */}
            <linearGradient id="glassReflect" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="25%" stopColor="#ffffff" stopOpacity="0.2" />
              <stop offset="85%" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
            </linearGradient>

            {/* Bottle Clip Path for Inner Fluid */}
            {type === 'rollon' && (
              <clipPath id="rollonClip">
                <rect x="22" y="42" width="56" height="128" rx="14" ry="14" />
              </clipPath>
            )}

            {type === 'pump' && (
              <clipPath id="pumpClip">
                <rect x="20" y="46" width="60" height="124" rx="10" ry="10" />
              </clipPath>
            )}

            {type === 'dropper' && (
              <clipPath id="dropperClip">
                <rect x="24" y="52" width="52" height="118" rx="12" ry="12" />
              </clipPath>
            )}

            {type === 'tube' && (
              <clipPath id="tubeClip">
                <path d="M 22,46 L 78,46 L 72,168 L 28,168 Z" />
              </clipPath>
            )}

            {type === 'jar' && (
              <clipPath id="jarClip">
                <rect x="18" y="60" width="64" height="105" rx="8" ry="8" />
              </clipPath>
            )}
          </defs>

          {/* ================= ROLL-ON BOTTLE ================= */}
          {type === 'rollon' && (
            <g>
              {/* Solid White Background Backing so bottle is never transparent */}
              <rect x="22" y="42" width="56" height="128" rx="14" ry="14" fill="#FFFFFF" />

              {/* Outer Roller Cap / Ball Head */}
              <circle cx="50" cy="34" r="14" fill="#F8FAFC" stroke="#005995" strokeWidth="1.5" />
              <path d="M 38,40 Q 50,44 62,40 L 64,44 Q 50,47 36,44 Z" fill="#005995" />

              {/* Bottle Body Outline with solid white fill */}
              <rect x="22" y="42" width="56" height="128" rx="14" ry="14" fill="#FFFFFF" stroke="#005995" strokeWidth="2" />

              {/* Fluid clipped inside */}
              <g clipPath="url(#rollonClip)">
                {/* Solid white cavity */}
                <rect x="22" y="42" width="56" height="128" fill="#FFFFFF" />

                {/* Animated Rising/Lowering Fluid in #005995 */}
                <rect 
                  x="20" 
                  y={liquidY} 
                  width="60" 
                  height={liquidHeight + 10} 
                  fill={`url(#liquidGrad-${type}-${clampedPercent})`} 
                  className="transition-all duration-700 ease-out"
                />

                {/* Fluid Surface Meniscus Wave */}
                <path 
                  d={`M 20,${liquidY} Q 35,${liquidY - 3} 50,${liquidY} T 80,${liquidY} L 80,${liquidY + 4} L 20,${liquidY + 4} Z`} 
                  fill="#005995" 
                  fillOpacity="0.95" 
                  className="transition-all duration-700 ease-out liquid-wave"
                />

                {/* Micro Bubbles */}
                <circle cx="36" cy={liquidY + 25} r="2" fill="#FFFFFF" fillOpacity="0.8" />
                <circle cx="62" cy={liquidY + 45} r="2.5" fill="#FFFFFF" fillOpacity="0.7" />
                <circle cx="44" cy={liquidY + 70} r="1.5" fill="#FFFFFF" fillOpacity="0.9" />
              </g>

              {/* Measurement graduation lines on bottle side */}
              <line x1="24" y1="55" x2="32" y2="55" stroke="#005995" strokeWidth="1" strokeDasharray="1,1" />
              <line x1="24" y1="87" x2="35" y2="87" stroke="#005995" strokeWidth="1.2" />
              <text x="38" y="89" fontSize="6" fill="#005995" fontFamily="sans-serif" fontWeight="700">75%</text>
              
              <line x1="24" y1="119" x2="35" y2="119" stroke="#005995" strokeWidth="1.2" />
              <text x="38" y="121" fontSize="6" fill="#005995" fontFamily="sans-serif" fontWeight="700">50%</text>

              <line x1="24" y1="151" x2="35" y2="151" stroke="#005995" strokeWidth="1.2" />
              <text x="38" y="153" fontSize="6" fill="#005995" fontFamily="sans-serif" fontWeight="700">25%</text>

              {/* Minimal Brand Label Strip */}
              <rect x="36" y="96" width="28" height="34" rx="2" fill="#FFFFFF" stroke="#005995" strokeWidth="1" />
              <text x="50" y="107" textAnchor="middle" fontSize="5.5" fontWeight="800" fill="#002742">BODYWISE</text>
              <text x="50" y="115" textAnchor="middle" fontSize="4.5" fill="#005995" fontWeight="700">AHA•BHA</text>
              <text x="50" y="122" textAnchor="middle" fontSize="4" fill="#00487A">6% ROLL-ON</text>

              {/* Glass surface reflection shine */}
              <rect x="23" y="43" width="10" height="126" rx="4" fill="url(#glassReflect)" />
              <path d="M 72,46 L 75,48 L 74,166 L 71,164 Z" fill="#FFFFFF" fillOpacity="0.4" />
            </g>
          )}

          {/* ================= PUMP BOTTLE ================= */}
          {type === 'pump' && (
            <g>
              {/* Solid White Background */}
              <rect x="20" y="46" width="60" height="124" rx="10" ry="10" fill="#FFFFFF" />

              {/* Pump Dispenser Head */}
              <rect x="44" y="24" width="12" height="16" fill="#F8FAFC" stroke="#005995" strokeWidth="1" />
              <path d="M 40,24 L 60,24 L 62,18 L 30,18 Q 28,18 28,21 L 28,24 Z" fill="#005995" />
              <rect x="36" y="38" width="28" height="8" rx="2" fill="#005995" />

              {/* Bottle Body */}
              <rect x="20" y="46" width="60" height="124" rx="10" ry="10" fill="#FFFFFF" stroke="#005995" strokeWidth="2" />

              {/* Fluid */}
              <g clipPath="url(#pumpClip)">
                <rect x="20" y="46" width="60" height="124" fill="#FFFFFF" />
                <rect 
                  x="18" 
                  y={liquidY} 
                  width="64" 
                  height={liquidHeight + 10} 
                  fill={`url(#liquidGrad-${type}-${clampedPercent})`} 
                  className="transition-all duration-700 ease-out"
                />
                <path 
                  d={`M 18,${liquidY} Q 35,${liquidY - 3} 50,${liquidY} T 82,${liquidY} L 82,${liquidY + 4} L 18,${liquidY + 4} Z`} 
                  fill="#005995" 
                  fillOpacity="0.95" 
                  className="transition-all duration-700 ease-out liquid-wave"
                />

                {/* Central Dip Tube (Straw) inside bottle */}
                <rect x="48.5" y="46" width="3" height="118" fill="#FFFFFF" stroke="#005995" strokeWidth="0.8" />
                
                {/* Salicylic Bubbles */}
                <circle cx="34" cy={liquidY + 30} r="2" fill="#FFFFFF" fillOpacity="0.8" />
                <circle cx="66" cy={liquidY + 50} r="2.5" fill="#FFFFFF" fillOpacity="0.7" />
                <circle cx="40" cy={liquidY + 75} r="1.5" fill="#FFFFFF" fillOpacity="0.9" />
              </g>

              {/* Measurement ticks */}
              <line x1="22" y1="65" x2="30" y2="65" stroke="#005995" strokeWidth="1" />
              <line x1="22" y1="95" x2="32" y2="95" stroke="#005995" strokeWidth="1.2" />
              <text x="35" y="97" fontSize="6" fill="#005995" fontWeight="700">150ml</text>

              <line x1="22" y1="125" x2="32" y2="125" stroke="#005995" strokeWidth="1.2" />
              <text x="35" y="127" fontSize="6" fill="#005995" fontWeight="700">100ml</text>

              <line x1="22" y1="155" x2="30" y2="155" stroke="#005995" strokeWidth="1" />

              {/* Minimal Brand Label Strip */}
              <rect x="34" y="94" width="32" height="40" rx="3" fill="#FFFFFF" stroke="#005995" strokeWidth="1" />
              <text x="50" y="106" textAnchor="middle" fontSize="5.5" fontWeight="800" fill="#002742">BODYWISE</text>
              <text x="50" y="115" textAnchor="middle" fontSize="4.5" fill="#005995" fontWeight="700">SALICYLIC</text>
              <text x="50" y="123" textAnchor="middle" fontSize="3.8" fill="#00487A">1% BODY WASH</text>
              <text x="50" y="129" textAnchor="middle" fontSize="3.5" fill="#005995">200 ML</text>

              {/* Glass reflection */}
              <rect x="22" y="47" width="10" height="122" rx="3" fill="url(#glassReflect)" />
            </g>
          )}

          {/* ================= DROPPER BOTTLE ================= */}
          {type === 'dropper' && (
            <g>
              {/* Solid White Background */}
              <rect x="24" y="52" width="52" height="118" rx="12" ry="12" fill="#FFFFFF" />

              {/* Rubber Bulb Pipette Squeezer in #00385F */}
              <path d="M 42,12 C 42,8 58,8 58,12 L 58,22 L 42,22 Z" fill="#00385F" />
              {/* Pipette Collar */}
              <rect x="36" y="22" width="28" height="14" rx="2" fill="#F8FAFC" stroke="#005995" strokeWidth="1" />
              {/* Bottle Neck */}
              <rect x="42" y="36" width="16" height="16" fill="#FFFFFF" stroke="#005995" strokeWidth="1" />

              {/* Solid Body */}
              <rect x="24" y="52" width="52" height="118" rx="12" ry="12" fill="#FFFFFF" stroke="#005995" strokeWidth="2" />

              {/* Fluid */}
              <g clipPath="url(#dropperClip)">
                <rect x="24" y="52" width="52" height="118" fill="#FFFFFF" />
                <rect 
                  x="20" 
                  y={liquidY} 
                  width="60" 
                  height={liquidHeight + 10} 
                  fill={`url(#liquidGrad-${type}-${clampedPercent})`} 
                  className="transition-all duration-700 ease-out"
                />
                <path 
                  d={`M 20,${liquidY} Q 35,${liquidY - 3} 50,${liquidY} T 80,${liquidY} L 80,${liquidY + 4} L 20,${liquidY + 4} Z`} 
                  fill="#005995" 
                  fillOpacity="0.95" 
                  className="transition-all duration-700 ease-out liquid-wave"
                />

                {/* Glass Pipette Tube inside Serum */}
                <rect x="47" y="36" width="6" height="112" rx="2" fill="#FFFFFF" stroke="#005995" strokeWidth="0.8" />
                <path d="M 48,148 L 50,154 L 52,148 Z" fill="#005995" />

                {/* Serum droplet ready to fall */}
                <circle cx="50" cy="158" r="2.2" fill="#005995" fillOpacity="0.95" />

                {/* Droplets inside */}
                <circle cx="36" cy={liquidY + 25} r="1.8" fill="#FFFFFF" fillOpacity="0.8" />
                <circle cx="64" cy={liquidY + 45} r="2.2" fill="#FFFFFF" fillOpacity="0.7" />
              </g>

              {/* Graduation markings */}
              <line x1="26" y1="75" x2="33" y2="75" stroke="#005995" strokeWidth="1" />
              <text x="35" y="77" fontSize="5.5" fill="#005995" fontWeight="700">25ml</text>

              <line x1="26" y1="105" x2="33" y2="105" stroke="#005995" strokeWidth="1" />
              <text x="35" y="107" fontSize="5.5" fill="#005995" fontWeight="700">15ml</text>

              <line x1="26" y1="135" x2="33" y2="135" stroke="#005995" strokeWidth="1" />
              <text x="35" y="137" fontSize="5.5" fill="#005995" fontWeight="700">5ml</text>

              {/* Minimal Brand Label Strip */}
              <rect x="36" y="96" width="28" height="36" rx="2" fill="#FFFFFF" stroke="#005995" strokeWidth="1" />
              <text x="50" y="107" textAnchor="middle" fontSize="5" fontWeight="800" fill="#002742">BODYWISE</text>
              <text x="50" y="115" textAnchor="middle" fontSize="4.2" fill="#005995" fontWeight="700">REDENSYL</text>
              <text x="50" y="122" textAnchor="middle" fontSize="3.6" fill="#00487A">HAIR SERUM</text>

              {/* Glass reflection */}
              <rect x="26" y="53" width="8" height="116" rx="3" fill="url(#glassReflect)" />
            </g>
          )}

          {/* ================= TUBE / JAR (FOR ADDITIONAL ITEMS) ================= */}
          {(type === 'tube' || type === 'jar') && (
            <g>
              {type === 'tube' ? (
                <>
                  <rect x="34" y="168" width="32" height="16" rx="2" fill="#005995" />
                  <path d="M 22,46 L 78,46 L 72,168 L 28,168 Z" fill="#FFFFFF" stroke="#005995" strokeWidth="2" />
                  <rect x="20" y="40" width="60" height="8" rx="1" fill="#F8FAFC" stroke="#005995" strokeWidth="1" />
                  <g clipPath="url(#tubeClip)">
                    <rect x="20" y="46" width="60" height="124" fill="#FFFFFF" />
                    <rect 
                      x="15" 
                      y={liquidY} 
                      width="70" 
                      height={liquidHeight + 10} 
                      fill={`url(#liquidGrad-${type}-${clampedPercent})`} 
                      className="transition-all duration-700 ease-out"
                    />
                  </g>
                  <text x="50" y="105" textAnchor="middle" fontSize="5.5" fontWeight="800" fill="#002742">BODYWISE</text>
                  <text x="50" y="115" textAnchor="middle" fontSize="4.5" fill="#005995">CREAM</text>
                </>
              ) : (
                <>
                  <rect x="16" y="44" width="68" height="16" rx="4" fill="#00385F" />
                  <rect x="18" y="60" width="64" height="105" rx="8" ry="8" fill="#FFFFFF" stroke="#005995" strokeWidth="2" />
                  <g clipPath="url(#jarClip)">
                    <rect x="18" y="60" width="64" height="105" fill="#FFFFFF" />
                    <rect 
                      x="16" 
                      y={liquidY} 
                      width="68" 
                      height={liquidHeight + 10} 
                      fill={`url(#liquidGrad-${type}-${clampedPercent})`} 
                      className="transition-all duration-700 ease-out"
                    />
                  </g>
                  <text x="50" y="105" textAnchor="middle" fontSize="5.5" fontWeight="800" fill="#002742">BODYWISE</text>
                  <text x="50" y="115" textAnchor="middle" fontSize="4.5" fill="#005995">GUMMIES</text>
                </>
              )}
            </g>
          )}
        </svg>

        {/* Fill level badge bubble */}
        <div 
          className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-tight shadow-md border-2 border-[#DCEEF7] flex items-center gap-1 whitespace-nowrap bg-white text-[#334155] transition-all duration-300 group-hover:scale-105"
        >
          <span className="w-2 h-2 rounded-full bg-[#005995]" />
          <span>{clampedPercent}% Full</span>
        </div>

        {/* Match Check hint on hover */}
        {isHovered && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#002742] text-white text-[10px] font-bold rounded-lg shadow-lg whitespace-nowrap pointer-events-none z-20 flex items-center gap-1 animate-fade-in border border-[#DCEEF7]">
            <Sparkles className="w-2.5 h-2.5 text-[#BDE0F1]" />
            <span>Check Bottle Match</span>
          </div>
        )}
      </div>

      {/* Uses countdown and volume metric */}
      <div className="mt-4 text-center">
        <p className="text-xs font-bold text-[#002742]">
          {remainingUses} of {totalApplications} doses left
        </p>
        <p className="text-[11px] text-[#334155] font-semibold">
          ~{(remainingUses * dosePerUseMl).toFixed(1)} ml remaining
        </p>
      </div>
    </div>
  );
}
