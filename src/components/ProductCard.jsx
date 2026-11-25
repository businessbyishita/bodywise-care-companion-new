import React, { useState } from 'react';
import { Droplet, ChevronDown, ChevronUp, Check, MoreHorizontal } from 'lucide-react';
import { getSupplyStatus, formatDate } from '../utils';

export default function ProductCard({ product, onLogDose, onEdit, onRemove }) {
  const [details, setDetails] = useState(false);
  const [menu, setMenu] = useState(false);
  const supply = getSupplyStatus(product);
  const start = new Date(`${product.startDate || new Date().toISOString().slice(0,10)}T00:00:00`);
  const elapsed = Math.max(0, Math.floor((new Date().setHours(0,0,0,0)-start)/86400000));
  const duration = Math.max(1, product.durationDays || (product.cycleWeeksTotal || 8)*7);
  const pct = Math.min(100, Math.round((elapsed+1)/duration*100));
  const milestone = [...(product.timelineMilestones||[])].filter(m=>m.week<=Math.floor(elapsed/7)+1).sort((a,b)=>b.week-a.week)[0] || product.timelineMilestones?.[0];
  const days = (product.frequencyLabel?.match(/\(([^)]+)\)/)?.[1]) || product.frequencyLabel || 'Daily';
  const schedule = `${product.frequencyType === 'daily' ? 'Daily' : days}, ${product.timeOfDay || 'as scheduled'}`;
  return <article className={`product-card ${product.loggedToday?'is-done':''} ${supply.status==='low'?'is-low':''} ${['urgent','empty'].includes(supply.status)?'is-urgent':''}`}>
    <div className="product-top">
      <div className="bottle-mark" aria-hidden="true"><Droplet size={25}/></div>
      <div className="product-heading"><h3>{product.shortName || product.name}</h3><p>{schedule}</p></div>
      <span className="dose-chip">{product.visualDosageValue || product.doseDescription}</span>
    </div>
    {!product.loggedToday && <button className="primary-button log-button" onClick={()=>onLogDose(product.id)} disabled={supply.dosesLeft===0}><Droplet size={17}/>Log dose</button>}
    <div className="supply-line"><span>{supply.dosesLeft} doses left</span><span>Runs out ~{formatDate(supply.runOutDate)}</span></div>
    <div className="supply-track"><span style={{width:`${Math.min(100,(supply.dosesLeft/Math.max(1,product.totalApplications||supply.dosesLeft))*100)}%`}}/></div>
    <div className="product-footer"><span>Day {elapsed+1} of {duration} · {pct}%</span><button className="text-button" aria-expanded={details} onClick={()=>setDetails(v=>!v)}>Details {details?<ChevronUp size={15}/>:<ChevronDown size={15}/>}</button></div>
    {details && <div className="details-panel">
      {milestone && <section><h4>Journey milestone</h4><p><strong>{milestone.title}:</strong> {milestone.desc}</p></section>}
      <section><h4>Dosage guide</h4><p>{product.doseDescription || product.visualDosageValue}</p><p>{(product.boosters||[]).filter(h=>h.type==='withDose').map((h,i)=><span className="detail-step" key={h.id}>{i+1}. {h.title}</span>)}{(product.clinicalTips||[]).map((tip,i)=><span className="detail-step" key={`tip-${i}`}>{i+1}. {tip}</span>)}</p></section>
      <section><h4>The Science</h4><p>{product.whyRationingFails || product.tagline}</p></section>
      <div className="details-actions"><div className="menu-wrap"><button className="icon-button" aria-label="Product actions" aria-expanded={menu} onClick={()=>setMenu(v=>!v)}><MoreHorizontal size={19}/></button>{menu&&<div className="action-menu"><button onClick={()=>{setMenu(false);onEdit(product)}}>Edit</button><button className="danger-text" onClick={()=>{setMenu(false);onRemove(product)}}>Remove</button></div>}</div></div>
    </div>}
  </article>;
}
