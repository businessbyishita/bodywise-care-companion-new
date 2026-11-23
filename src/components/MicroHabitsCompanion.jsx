import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Atom, 
  Layers, 
  Lightbulb, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { SCIENCE_HABITS_BY_CONCERN } from '../data/habits';

export default function MicroHabitsCompanion({
  activeProductConcerns = ['underarms', 'body-acne', 'hair-fall'],
  checkedHabits = {}, // { [habitId]: true/false }
  onToggleHabit
}) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedScienceId, setExpandedScienceId] = useState(null);

  // Filter concern groups present in user's active shelf
  const availableConcernKeys = Object.keys(SCIENCE_HABITS_BY_CONCERN).filter(key => 
    activeProductConcerns.includes(key)
  );

  // If filtered by specific concern
  const displayedConcernKeys = selectedFilter === 'all' 
    ? availableConcernKeys 
    : availableConcernKeys.filter(k => k === selectedFilter);

  // Total habits and completed habits count
  let totalHabitsCount = 0;
  let completedHabitsCount = 0;

  availableConcernKeys.forEach(concernKey => {
    const group = SCIENCE_HABITS_BY_CONCERN[concernKey];
    if (group) {
      group.habits.forEach(h => {
        totalHabitsCount++;
        if (checkedHabits[h.id]) completedHabitsCount++;
      });
    }
  });

  const toggleScienceTooltip = (habitId) => {
    setExpandedScienceId(prev => prev === habitId ? null : habitId);
  };

  return (
    <div className="rounded-3xl bg-white border border-cream-300 shadow-warm p-5 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-cream-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-sage-100 flex items-center justify-center text-sage-600">
              <Atom className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-sage-700">
              Synergistic Care
            </span>
          </div>
          <h3 className="text-lg font-bold text-charcoal-900 mt-1">
            Science-Backed Daily Boosters
          </h3>
          <p className="text-xs text-charcoal-600 mt-0.5">
            Micro-habits tailored to your active products that multiply active ingredient absorption & prevent rebound irritation.
          </p>
        </div>

        {/* Completion Pill */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-cream-100 border border-cream-200 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-sage-500" />
          <span className="text-xs font-bold text-charcoal-800">
            {completedHabitsCount} of {totalHabitsCount} Habits Completed
          </span>
        </div>
      </div>

      {/* Concern Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            selectedFilter === 'all'
              ? 'bg-charcoal-800 text-white shadow-sm'
              : 'bg-cream-100 text-charcoal-600 hover:bg-cream-200'
          }`}
        >
          All Active Concerns ({availableConcernKeys.length})
        </button>

        {availableConcernKeys.map((key) => {
          const concernData = SCIENCE_HABITS_BY_CONCERN[key];
          if (!concernData) return null;
          const isSelected = selectedFilter === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedFilter(key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-terracotta-500 text-white shadow-sm'
                  : 'bg-cream-100 text-charcoal-600 hover:bg-cream-200'
              }`}
            >
              {concernData.concernName.split('&')[0].trim()}
            </button>
          );
        })}
      </div>

      {/* Habit Lists Grouped by Concern */}
      <div className="space-y-6">
        {displayedConcernKeys.map((concernKey) => {
          const concernGroup = SCIENCE_HABITS_BY_CONCERN[concernKey];
          if (!concernGroup) return null;

          return (
            <div key={concernKey} className="space-y-3">
              <div className="flex items-center gap-2">
                <span 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: concernGroup.color }} 
                />
                <h4 className="text-xs font-bold text-charcoal-800 uppercase tracking-wider">
                  {concernGroup.concernName}
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cream-200 text-charcoal-600 font-semibold">
                  {concernGroup.badge}
                </span>
              </div>

              {/* Habit Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {concernGroup.habits.map((habit) => {
                  const isChecked = !!checkedHabits[habit.id];
                  const isScienceOpen = expandedScienceId === habit.id;

                  return (
                    <div 
                      key={habit.id}
                      className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                        isChecked 
                          ? 'bg-sage-50/70 border-sage-300 ring-1 ring-sage-200' 
                          : 'bg-white border-cream-200 hover:border-cream-300 shadow-warm-sm'
                      }`}
                    >
                      <div>
                        {/* Top action type & duration tag */}
                        <div className="flex items-center justify-between text-[10px] text-charcoal-500 mb-2">
                          <span className="font-semibold px-2 py-0.5 rounded bg-cream-100 text-charcoal-600">
                            {habit.actionType}
                          </span>
                          <span className="font-medium">{habit.duration}</span>
                        </div>

                        {/* Interactive Checkbox & Title */}
                        <label className="flex items-start gap-3 cursor-pointer select-none group">
                          <div 
                            className={`w-5 h-5 rounded-lg border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                              isChecked 
                                ? 'bg-sage-500 border-sage-600 text-white shadow-sm' 
                                : 'border-cream-400 bg-cream-50 group-hover:border-sage-400'
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              onToggleHabit(habit.id);
                            }}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>

                          <div className="flex-1">
                            <p className={`text-xs font-bold transition-colors ${
                              isChecked ? 'text-sage-900 line-through decoration-sage-400' : 'text-charcoal-800'
                            }`}>
                              {habit.title}
                            </p>
                            <p className="text-[11px] text-charcoal-500 mt-0.5 leading-snug">
                              {habit.shortDesc}
                            </p>
                          </div>
                        </label>
                      </div>

                      {/* Expandable "The Science" Section */}
                      <div className="mt-3 pt-2.5 border-t border-cream-200">
                        <button
                          type="button"
                          onClick={() => toggleScienceTooltip(habit.id)}
                          className="flex items-center justify-between w-full text-[11px] font-semibold text-terracotta-600 hover:text-terracotta-700 transition-colors"
                        >
                          <span className="flex items-center gap-1">
                            <Lightbulb className="w-3.5 h-3.5 text-terracotta-500" />
                            <span>The Science Behind This</span>
                          </span>
                          {isScienceOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        {isScienceOpen && (
                          <div className="mt-2 p-2.5 rounded-xl bg-white/90 border border-cream-300 text-[11px] text-charcoal-700 leading-relaxed space-y-1 animate-fade-in shadow-sm">
                            <p className="font-medium">
                              {habit.science}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
