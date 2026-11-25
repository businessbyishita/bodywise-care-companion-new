import React, { useEffect, useState } from 'react';
import { X, Save, CalendarDays } from 'lucide-react';

export default function ProductEditModal({ product, onClose, onSave }) {
  const [startDate, setStartDate] = useState(product.startDate || new Date().toISOString().slice(0, 10));
  useEffect(() => setStartDate(product.startDate || new Date().toISOString().slice(0, 10)), [product]);
  const today = new Date(); today.setHours(0,0,0,0);
  const selected = startDate ? new Date(`${startDate}T00:00:00`) : null;
  const validDate = selected && selected <= today;
  return <div className="overlay modal-overlay" onClick={onClose}>
    <section className="edit-date-dialog" role="dialog" aria-modal="true" aria-labelledby="edit-date-title" onClick={e=>e.stopPropagation()}>
      <button type="button" className="dialog-close icon-button" onClick={onClose} aria-label="Close"><X/></button>
      <p className="eyebrow">UPDATE YOUR JOURNEY</p><h2 id="edit-date-title">Edit start date</h2>
      <p className="edit-product-name">{product.shortName || product.name}</p>
      <label className="date-edit-label"><CalendarDays size={16}/> When did you start using this product?</label>
      <input type="date" value={startDate} max={new Date().toISOString().slice(0,10)} onChange={e=>setStartDate(e.target.value)} className="date-input" />
      <p className="date-helper">Changing this date updates your journey day, week and progress timeline. Your dose history and bottle level stay intact.</p>
      <div className="edit-dialog-actions"><button type="button" onClick={onClose} className="secondary-button">Cancel</button><button type="button" disabled={!validDate} onClick={()=>onSave({...product,startDate})} className="primary-button"><Save size={15}/>Save date</button></div>
    </section>
  </div>;
}
