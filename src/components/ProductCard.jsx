import React, { useState } from 'react';
import { 
  Check, 
  Flame, 
  Clock, 
  Calendar, 
  Droplet, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  Atom, 
  Lightbulb, 
  Coffee 
} from 'lucide-react';
import DepletingBottleSvg from './DepletingBottleSvg';
import VisualDosageGuide from './VisualDosageGuide';
import { SCIENCE_HABITS_BY_CONCERN } from '../data/habits';

export default function ProductCard({
  product,
  currentDayOfWeek = 3, // 0=Sun, 1=Mon, ..., 3=Wed, etc.
  checkedHabits = {},
  onToggleHabit = null,
  onLogDose,
  onOpenDetailModal,
  onRemoveProduct = null,
  onEditProduct = null
}) {
  const [expandedDosage, setExpandedDosage] = useState(false);
  const [boostersOpen, setBoostersOpen] = useState(true); // Dropdown for daily boosters inside line item
  const [expandedScienceHabitId, setExpandedScienceHabitId] = useState(null);
  const [animatingDrop, setAnimatingDrop] = useState(false);

  // Check if product is scheduled for today's simulated day of week
  const isScheduledToday = product.frequencyDays.includes(currentDayOfWeek);
  const isLoggedToday = product.loggedToday;

  // Retrieve paired science-backed habits for this product's concern
  const pairedConcernGroup = SCIENCE_HABITS_BY_CONCERN[product.concernId];
  const productHabits = pairedConcernGroup?.habits || [];

  const completedHabitsForProduct = productHabits.filter(h => !!checkedHabits[h.id]).length;

  const handleLogClick = () => {
    setAnimatingDrop(true);
    setTimeout(() => {
      setAnimatingDrop(false);
    }, 800);
    onLogDose(product.id);
  };

  const toggleScienceExplanation = (habitId) => {
    setExpandedScienceHabitId(prev => prev === habitId ? null : habitId);
  };

  // Status badge calculation for top strip (clean white background with blue accents)
  let statusBadge = {
    text: 'Due Today',
    bg: 'bg-[#DCEEF7] text-[#334155] border-[#DCEEF7]',
    dot: 'bg-[#005995] animate-pulse'
  };

  if (isLoggedToday) {
    statusBadge = {
      text: 'Completed Today ✓',
      bg: 'bg-[#005995] text-white border-[#DCEEF7] font-extrabold',
      dot: 'bg-white'
    };
  } else if (!isScheduledToday) {
    statusBadge = {
      text: 'Rest Day (Off Today)',
      bg: 'bg-[#F8FAFC] text-[#00487A] border-[#DCEEF7] font-bold',
      dot: 'bg-[#BDE0F1]'
    };
  }

  // Journey milestones follow the calculated week, never a static demo marker.
  const startDate = product.startDate ? new Date(`${product.startDate}T00:00:00`) : new Date();
  const todayDate = new Date(); todayDate.setHours(0,0,0,0);
  const elapsedDays = Math.max(0, Math.floor((todayDate - startDate) / 86400000));
  const journeyDays = Math.max(1, Number(product.durationDays || (product.cycleWeeksTotal || 8) * 7));
  const progressPercent = Math.min(100, Math.round((elapsedDays / journeyDays) * 100));
  const journeyDay = elapsedDays + 1;
  const journeyWeek = Math.floor(elapsedDays / 7) + 1;
  const activeMilestone = [...(product.timelineMilestones || [])].filter(m => Number(m.week) <= journeyWeek).sort((a,b) => b.week-a.week)[0] || (product.timelineMilestones || [])[0] || { title: 'Your routine is underway', desc: 'Keep following your product schedule consistently.' };

  return (
    <div className={`rounded-3xl border-2 transition-all duration-300 bg-white shadow-warm hover:shadow-warm-lg overflow-hidden ${
      isLoggedToday 
        ? 'border-[#DCEEF7] ring-2 ring-[#005995]/20' 
        : isScheduledToday 
        ? 'border-[#DCEEF7] hover:border-[#DCEEF7]' 
        : 'border-dashed border-[#DCEEF7] bg-white'
    }`}>
      {/* Top Banner Bar in Crisp White with Blue Typography & Badges */}
      <div className="px-5 py-3.5 bg-white border-b-2 border-[#DCEEF7] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Target Frequency Badge */}
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${statusBadge.bg}`}>
            <span className={`w-2 h-2 rounded-full ${statusBadge.dot}`} />
            {product.frequencyLabel} • {statusBadge.text}
          </span>

          <span className="text-[11px] font-semibold text-[#00487A] hidden sm:inline-block">
            {product.timeOfDay}
          </span>
        </div>

        {/* Streak Counter in White with Blue Text */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8FAFC] text-[#334155] text-xs font-bold border border-[#DCEEF7]">
          <Flame className="w-3.5 h-3.5 fill-[#005995] text-[#334155]" />
          <span>{product.streakDays} Day Streak</span>
        </div>
      </div>

      {/* Main Card Body */}
      <div className="p-5 sm:p-6 space-y-5 bg-white">
        {/* Upper Section: Product + Bottle + Dosage Action */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Interactive Bottle Level SVG */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <DepletingBottleSvg 
              type={product.bottleType}
              fillPercent={product.currentFillPercent}
              liquidColor="rgba(0, 89, 149, 0.55)"
              accentColor="#005995"
              remainingUses={product.remainingUses}
              totalApplications={product.totalApplications}
              dosePerUseMl={product.dosePerUseMl}
              isAnimating={animatingDrop}
              size="md"
            />
            
          </div>

          {/* Product Info & Action Area */}
          <div className="flex-1 space-y-3 w-full">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#DCEEF7] text-[#334155] border border-[#DCEEF7]">
                  {product.category} • {product.concern}
                </span>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => onEditProduct?.(product)} className="text-[10px] font-bold text-[#005995] hover:underline">Edit</button>
                  <button type="button" onClick={() => onRemoveProduct?.(product)} className="text-[10px] font-bold text-slate-500 hover:text-red-600">Remove</button>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-black text-[#002742] mt-1.5">
                {product.name}
              </h3>
              <p className="text-xs text-[#00487A] mt-0.5 leading-relaxed font-medium">
                {product.tagline}
              </p>
            </div>

            {/* If Today is a Rest Day: Prominently Highlight Rest Status! */}
            {!isScheduledToday && (
              <div className="p-3.5 rounded-2xl bg-white border-2 border-[#DCEEF7] flex items-start gap-3 shadow-sm animate-fade-in">
                <div className="w-7 h-7 rounded-full bg-[#DCEEF7] text-[#334155] flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#DCEEF7]">
                  <Coffee className="w-4 h-4 text-[#334155]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-[#002742]">
                      Rest & Barrier Recovery Day
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#DCEEF7] text-[#334155] border border-[#DCEEF7]">
                      Off Today
                    </span>
                  </div>
                  <p className="text-[11px] text-[#00487A] mt-0.5 leading-snug font-medium">
                    This clinical formula is prescribed <strong>{product.frequencyLabel}</strong>. Today is a scheduled rest day to prevent micro-irritation and let your active cellular renewal stabilize.
                  </p>
                </div>
              </div>
            )}

            {/* Expected Results Timeline Milestone in White with Blue Accents */}
            <div className="p-3.5 rounded-2xl bg-white border-2 border-[#DCEEF7] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#002742] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#334155]" />
                  <span>Day {journeyDay} · Week {journeyWeek} · Journey progress:</span>
                </span>
                <span className="font-extrabold text-[#334155]">
                  {progressPercent}% Journey
                </span>
              </div>

              {/* Progress Bar in #005995 */}
              <div className="w-full h-2 rounded-full bg-[#DCEEF7] overflow-hidden">
                <div 
                  className="h-full rounded-full bg-[#005995] transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <p className="text-[11px] text-[#00385F] leading-snug">
                <strong className="text-[#002742] font-bold">{activeMilestone.title}: </strong>
                {activeMilestone.desc}
              </p>
              <p className="text-[10px] text-slate-500">Started {product.startDate ? new Date(`${product.startDate}T00:00:00`).toLocaleDateString() : 'date not set'}</p>
            </div>

            {/* Dosage Action & Call to Action */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={handleLogClick}
                disabled={isLoggedToday}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-95 ${
                  isLoggedToday 
                    ? 'bg-white text-[#334155] border-2 border-[#DCEEF7] font-extrabold cursor-default'
                    : isScheduledToday
                    ? 'bg-[#005995] text-white hover:bg-[#00487A] shadow-md shadow-[#005995]/20'
                    : 'bg-white text-[#334155] border-2 border-[#DCEEF7] hover:bg-[#F8FAFC]'
                }`}
              >
                {isLoggedToday ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#334155]" />
                    <span>Dose Logged for Today ({product.doseDescription})</span>
                  </>
                ) : isScheduledToday ? (
                  <>
                    <Droplet className="w-4 h-4 fill-white" />
                    <span>Log Today's Dose ({product.doseDescription})</span>
                  </>
                ) : (
                  <>
                    <Coffee className="w-4 h-4 text-[#334155]" />
                    <span>Rest Day — No Dose Needed Today (Log Extra if Applied)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onOpenDetailModal(product)}
                className="py-3 px-4 rounded-xl text-xs font-bold text-[#334155] bg-white hover:bg-[#F8FAFC] border-2 border-[#DCEEF7] hover:border-[#DCEEF7] flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                title="View full clinical study & week-by-week timeline"
              >
                <span>Full Protocol</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#334155]" />
              </button>
            </div>
          </div>
        </div>

        {/* ================= EMBEDDED SCIENCE-BACKED DAILY BOOSTERS AS A WHITE DROPDOWN ================= */}
        {productHabits.length > 0 && (
          <div className="rounded-2xl border-2 border-[#DCEEF7] bg-white overflow-hidden transition-all shadow-sm">
            {/* Clickable Dropdown Trigger in White with Blue Text */}
            <div 
              className="p-3.5 bg-white text-[#334155] flex items-center justify-between cursor-pointer select-none hover:bg-[#F8FAFC] transition-colors border-b border-[#DCEEF7]"
              onClick={() => setBoostersOpen(!boostersOpen)}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#DCEEF7] flex items-center justify-center text-[#334155] border border-[#DCEEF7]">
                  <Atom className="w-4 h-4 text-[#334155]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#002742] uppercase tracking-wider flex items-center gap-1.5">
                    <span>Science-Backed Daily Boosters</span>
                    <span className="text-[10px] font-medium text-[#00487A] normal-case hidden sm:inline">
                      (Paired for {product.concern.split('&')[0].trim()})
                    </span>
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Progress counter badge in White with Blue Text */}
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#DCEEF7] text-[#334155] border border-[#DCEEF7]">
                  {completedHabitsForProduct} of {productHabits.length} Done
                </span>

                <button 
                  type="button" 
                  className="text-[#334155] p-0.5 rounded hover:bg-[#DCEEF7] transition-colors"
                  aria-label="Toggle boosters dropdown"
                >
                  {boostersOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Dropdown Collapsible Content */}
            {boostersOpen && (
              <div className="p-3.5 space-y-2.5 animate-fade-in bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {productHabits.map((habit) => {
                    const isChecked = !!checkedHabits[habit.id];
                    const isScienceOpen = expandedScienceHabitId === habit.id;

                    return (
                      <div
                        key={habit.id}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 flex flex-col justify-between ${
                          isChecked
                            ? 'bg-[#F8FAFC] border-[#DCEEF7] ring-1 ring-[#005995]/20 shadow-sm'
                            : 'bg-white border-[#DCEEF7] hover:border-[#DCEEF7] shadow-sm'
                        }`}
                      >
                        <div>
                          {/* Top Action Tag */}
                          <div className="flex items-center justify-between text-[9px] mb-1.5">
                            <span className="font-bold px-2 py-0.5 rounded bg-[#DCEEF7] text-[#334155]">
                              {habit.actionType}
                            </span>
                            <span className="font-semibold text-[#00487A]">{habit.duration}</span>
                          </div>

                          {/* Checkbox & Title */}
                          <label 
                            className="flex items-start gap-2.5 cursor-pointer select-none group"
                            onClick={(e) => {
                              e.preventDefault();
                              onToggleHabit && onToggleHabit(habit.id);
                            }}
                          >
                            <div
                              className={`w-4 h-4 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                                isChecked
                                  ? 'bg-[#005995] border-[#DCEEF7] text-white shadow-sm'
                                  : 'border-[#DCEEF7] bg-white group-hover:border-[#DCEEF7]'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>

                            <div className="flex-1">
                              <p className={`text-xs font-bold leading-tight transition-colors ${
                                isChecked ? 'text-[#334155] line-through' : 'text-[#002742]'
                              }`}>
                                {habit.title}
                              </p>
                              <p className="text-[11px] text-[#00487A] mt-0.5 leading-snug">
                                {habit.shortDesc}
                              </p>
                            </div>
                          </label>
                        </div>

                        {/* Expandable "The Science" dropdown */}
                        <div className="mt-2.5 pt-2 border-t border-[#DCEEF7]">
                          <button
                            type="button"
                            onClick={() => toggleScienceExplanation(habit.id)}
                            className="flex items-center justify-between w-full text-[10px] font-bold text-[#334155] hover:text-[#00385F] transition-colors"
                          >
                            <span className="flex items-center gap-1">
                              <Lightbulb className="w-3 h-3 text-[#334155]" />
                              <span>The Science</span>
                            </span>
                            {isScienceOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>

                          {isScienceOpen && (
                            <div className="mt-1.5 p-2.5 rounded-lg bg-[#F8FAFC] border border-[#DCEEF7] text-[10px] text-[#00385F] leading-relaxed animate-fade-in">
                              {habit.science}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Collapsible Dosage & Why Rationing Fails Guide */}
        <div className="pt-2 border-t border-[#DCEEF7]">
          <div 
            className="flex items-center justify-between cursor-pointer select-none py-1 text-[#334155] hover:text-[#00385F]"
            onClick={() => setExpandedDosage(!expandedDosage)}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#334155]" />
              <span className="text-xs font-bold tracking-tight">
                {expandedDosage ? 'Hide Clinical Dosage & Rationing Guide' : 'View Clinical Dosage Guide & Application Spec'}
              </span>
            </div>
            <button type="button" className="text-[#334155]">
              {expandedDosage ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {expandedDosage && (
            <div className="mt-3 animate-fade-in space-y-4">
              <VisualDosageGuide product={product} compact={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
