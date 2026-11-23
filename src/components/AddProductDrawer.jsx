import React, { useState } from 'react';
import { X, Plus, Check, CalendarDays } from 'lucide-react';
import { PRESET_CATALOG_PRODUCTS } from '../data/products';

export default function AddProductDrawer({ isOpen, onClose, activeProductIds = [], onAddProduct }) {
  const [selectedDates, setSelectedDates] = useState({});
  if (!isOpen) return null;
  const today = new Date().toISOString().slice(0, 10);
  const handleAdd = (product) => {
    const startDate = selectedDates[product.id];
    if (!startDate) return;
    onAddProduct({ ...product, startDate, durationDays: (product.cycleWeeksTotal || 8) * 7, currentWeek: 1, loggedToday: false, streakDays: 0 });
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#002742]/50 backdrop-blur-sm" onClick={onClose}>
    <div className="w-full max-w-md h-full bg-[#F8FAFC] shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
      <div className="p-5 border-b border-[#DCEEF7] bg-white flex items-center justify-between">
        <div><p className="text-[10px] uppercase tracking-wider font-bold text-[#64748B]">Product catalogue</p><h3 className="text-lg font-black text-[#002742]">Add a product</h3></div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100"><X className="w-5 h-5"/></button>
      </div>
      <div className="p-4 text-xs text-[#475569] bg-[#EFF7FB] border-b border-[#DCEEF7]">Choose a product from the Be Bodywise catalogue and tell us when you started using it. Your journey progress will begin from that date.</div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {PRESET_CATALOG_PRODUCTS.map(product => {
          const exists = activeProductIds.includes(product.id);
          return <article key={product.id} className="p-4 rounded-2xl bg-white border border-[#DCEEF7] space-y-3">
            <div><p className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">{product.category} · {product.concern}</p><h4 className="font-bold text-sm text-[#002742] mt-1">{product.name}</h4><p className="text-xs text-slate-600 mt-1">{product.tagline}</p></div>
            <div className="flex flex-wrap gap-2 text-[10px] text-slate-600"><span className="rounded-full bg-slate-50 px-2 py-1">{product.frequencyLabel}</span><span className="rounded-full bg-slate-50 px-2 py-1">{product.visualDosageValue}</span></div>
            {!exists && <label className="block text-xs font-semibold text-[#334155]">Date you started using it<div className="mt-1 flex items-center gap-2 border border-[#CBD5E1] rounded-xl px-3 py-2"><CalendarDays className="w-4 h-4 text-[#005995]"/><input aria-label={`Start date for ${product.name}`} type="date" max={today} value={selectedDates[product.id] || ''} onChange={e => setSelectedDates(v => ({...v, [product.id]: e.target.value}))} className="w-full outline-none text-sm bg-transparent"/></div></label>}
            <button disabled={exists || !selectedDates[product.id]} onClick={() => handleAdd(product)} className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 ${exists ? 'bg-slate-100 text-slate-500' : 'bg-[#005995] text-white disabled:opacity-40'}`}>{exists ? <><Check className="w-4 h-4"/>Already in routine</> : <><Plus className="w-4 h-4"/>Add to routine</>}</button>
          </article>;
        })}
      </div>
      <div className="p-4 bg-white border-t border-[#DCEEF7]"><button onClick={onClose} className="w-full py-3 rounded-xl bg-[#EAF3F8] text-[#002742] font-bold text-sm">Done</button></div>
    </div>
  </div>;
}
