import React, { useEffect, useState } from 'react';
import { X, Save } from 'lucide-react';

export default function ProductEditModal({ product, onClose, onSave }) {
  const [name, setName] = useState(product.name || '');
  const [category, setCategory] = useState(product.category || '');
  const [startDate, setStartDate] = useState(product.startDate || new Date().toISOString().slice(0, 10));
  const [duration, setDuration] = useState(String(product.durationDays || (product.cycleWeeksTotal || 8) * 7));
  const [frequencyLabel, setFrequencyLabel] = useState(product.frequencyLabel || '');
  const [frequencyDays, setFrequencyDays] = useState(product.frequencyDays || [0,1,2,3,4,5,6]);

  useEffect(() => {
    setName(product.name || '');
    setCategory(product.category || '');
    setStartDate(product.startDate || new Date().toISOString().slice(0, 10));
    setDuration(String(product.durationDays || (product.cycleWeeksTotal || 8) * 7));
    setFrequencyLabel(product.frequencyLabel || '');
    setFrequencyDays(product.frequencyDays || [0,1,2,3,4,5,6]);
  }, [product]);

  const toggleDay = day => setFrequencyDays(old => old.includes(day) ? old.filter(x => x !== day) : [...old, day].sort());
  const today = new Date(); today.setHours(0,0,0,0);
  const selected = startDate ? new Date(`${startDate}T00:00:00`) : null;
  const validDate = selected && selected <= today;

  return (
    <div className="fixed inset-0 z-[60] bg-[#002742]/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl w-full max-w-md p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center"><div><p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Manage routine item</p><h3 className="text-lg font-black text-[#002742]">Edit product</h3></div><button type="button" onClick={onClose} aria-label="Close"><X /></button></div>
        <label className="block text-xs font-semibold">Product name<input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full border rounded-xl p-3 text-sm" /></label>
        <label className="block text-xs font-semibold">Category<input value={category} onChange={e=>setCategory(e.target.value)} className="mt-1 w-full border rounded-xl p-3 text-sm" /></label>
        <label className="block text-xs font-semibold">Start date<input type="date" value={startDate} max={new Date().toISOString().slice(0,10)} onChange={e=>setStartDate(e.target.value)} className="mt-1 w-full border rounded-xl p-3 text-sm" /></label>
        <label className="block text-xs font-semibold">Expected journey duration<select value={duration} onChange={e=>setDuration(e.target.value)} className="mt-1 w-full border rounded-xl p-3 text-sm">{[14,21,28,30,42,45,56,60,84,90,120].map(d=><option key={d} value={d}>{d} days</option>)}</select></label>
        <label className="block text-xs font-semibold">Routine frequency label<input value={frequencyLabel} onChange={e=>setFrequencyLabel(e.target.value)} className="mt-1 w-full border rounded-xl p-3 text-sm" /></label>
        <div><p className="text-xs font-semibold mb-2">Days used</p><div className="grid grid-cols-7 gap-1">{['S','M','T','W','T','F','S'].map((d,i)=><button type="button" key={i} onClick={()=>toggleDay(i)} className={`rounded-lg py-2 text-xs font-bold ${frequencyDays.includes(i)?'bg-[#005995] text-white':'bg-slate-100 text-slate-600'}`}>{d}</button>)}</div></div>
        <div className="flex gap-2"><button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border text-sm font-bold">Cancel</button><button type="button" disabled={!name.trim() || !category.trim() || !validDate || !duration || frequencyDays.length===0} onClick={()=>onSave({...product,name,shortName:name,category,startDate,durationDays:Number(duration),cycleWeeksTotal:Number(duration)/7,frequencyLabel,frequencyDays})} className="flex-1 py-3 rounded-xl bg-[#005995] text-white text-sm font-bold disabled:opacity-40 flex items-center justify-center gap-2"><Save className="w-4 h-4"/>Save changes</button></div>
      </div>
    </div>
  );
}
