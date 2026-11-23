import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export default function DailyReadinessRing({
  productsLogged = 0,
  productsTotal = 3,
  habitsChecked = 0,
  habitsTotal = 6,
  onResetToday = null
}) {
  const totalTasks = productsTotal + habitsTotal;
  const completedTasks = productsLogged + habitsChecked;
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // SVG circular ring calculations
  const size = 110;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="p-5 rounded-3xl bg-white border border-bodywise-200 shadow-warm flex flex-col sm:flex-row items-center gap-5">
      {/* Animated Circular SVG Ring in #005995 */}
      <div className="relative flex-shrink-0">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#DCEEF7"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Active progress stroke */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#005995"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-extrabold text-bodywise-950 tracking-tight leading-none">
            {percentage}%
          </span>
          <span className="text-[10px] font-semibold text-bodywise-600 uppercase tracking-wider mt-0.5">
            Readiness
          </span>
        </div>
      </div>

      {/* Metrics & Clinical Interpretation */}
      <div className="flex-1 space-y-2 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-bodywise-100 text-bodywise-800 border border-bodywise-200">
            {percentage === 100 ? 'Optimal Clinical Efficacy' : 'Active Treatment Window'}
          </span>
          <span className="text-xs text-bodywise-600">
            {completedTasks} of {totalTasks} Care Rituals Done
          </span>
        </div>

        <h3 className="text-sm sm:text-base font-bold text-bodywise-950">
          {percentage === 100
            ? 'All Product Doses & Daily Boosters Achieved!'
            : percentage >= 50
            ? 'Strong Cellular Exposure Underway Today'
            : 'Maintain Dosing Frequency to Sustain Active Gradient'}
        </h3>

        {/* Mini progress stats pills */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
          <div className="px-3 py-1 rounded-xl bg-bodywise-50 border border-bodywise-200 text-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-bodywise-600" />
            <span className="font-semibold text-bodywise-700">Product Doses:</span>
            <span className="font-bold text-bodywise-950">{productsLogged} / {productsTotal}</span>
          </div>

          <div className="px-3 py-1 rounded-xl bg-bodywise-50 border border-bodywise-200 text-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-bodywise-400" />
            <span className="font-semibold text-bodywise-700">Daily Boosters:</span>
            <span className="font-bold text-bodywise-950">{habitsChecked} / {habitsTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
