import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, Pencil, Trash2 } from 'lucide-react';
import { getSupplyStatus, formatDate } from '../utils';
import DepletingBottleSvg from './DepletingBottleSvg';

export default function ProductCard({ product, selectedDate, onLogDose, onEdit, onRemove }) {
  const [details, setDetails] = useState(false);
  const [journeyOpen, setJourneyOpen] = useState(false);
  const supply = getSupplyStatus(product);
  const start = new Date(`${product.startDate || new Date().toISOString().slice(0,10)}T00:00:00`);
  const selected = new Date(`${selectedDate}T00:00:00`);
  const elapsed = Math.max(0, Math.floor((selected-start)/86400000));
  const duration = Math.max(1, product.durationDays || (product.cycleWeeksTotal || 8)*7);
  const dayNumber = elapsed+1;
  const weekNumber = Math.floor(elapsed/7)+1;
  const pct = Math.min(100, Math.round((dayNumber/duration)*100));
  const fill = Math.max(0, Math.min(100, Math.round((supply.dosesLeft/Math.max(1,product.totalApplications||supply.dosesLeft))*100)));
  const milestone = [...(product.timelineMilestones||[])].filter(m=>m.week<=weekNumber).sort((a,b)=>b.week-a.week)[0] || product.timelineMilestones?.[0];
  const logged = (product.doseLogs||[]).some(log=>log.date===selectedDate);
  const future = selectedDate > new Date().toISOString().slice(0,10);
  const schedule = `${product.frequencyLabel || 'As scheduled'}${product.timeOfDay ? ` · ${product.timeOfDay}` : ''}`;
  return <article className={`product-card ${logged?'is-done':''} ${supply.status==='low'?'is-low':''} ${['urgent','empty'].includes(supply.status)?'is-urgent':''}`}>
    <div className="product-card-main">
      <div className="bottle-visual"><DepletingBottleSvg type={product.bottleType||'rollon'} fillPercent={fill} remainingUses={supply.dosesLeft} totalApplications={product.totalApplications||supply.dosesLeft} size="md" /></div>
      <div className="product-card-content">
        <div className="product-top"><div className="product-heading"><h3>{product.shortName || product.name}</h3><p>{schedule}</p></div><span className="dose-chip">{product.visualDosageValue || product.doseDescription}</span></div>
        <div className="product-progress-label"><span><b>Day {dayNumber}</b> of {duration}</span><span><b>Week {weekNumber}</b> · {pct}% complete</span></div>
        <div className="journey-track"><span style={{width:`${pct}%`}}/></div>
        <div className="bottle-caption"><span>{supply.dosesLeft} doses left</span><span>Liquid level · {fill}%</span><span>Est. run-out {formatDate(supply.runOutDate)}</span></div>
        {logged ? <div className="logged-state"><Check size={16}/> Logged for {formatDate(selectedDate)}</div> : <button className="primary-button log-button" onClick={()=>onLogDose(product.id)} disabled={supply.dosesLeft===0||future}><span className="log-drop"><Check size={15}/></span>{future?'Scheduled for this day':'Log dose'}</button>}
      </div>
    </div>
    <div className="product-actions"><button className="text-button" aria-expanded={details} onClick={()=>setDetails(v=>!v)}>Product details {details?<ChevronUp size={15}/>:<ChevronDown size={15}/>}</button><div className="action-buttons"><button className="action-button" onClick={()=>onEdit(product)}><Pencil size={14}/>Edit start date</button><button className="action-button remove-action" onClick={()=>onRemove(product)}><Trash2 size={14}/>Remove</button></div></div>
    {details && <div className="details-panel">
      <section className="journey-panel"><button className="journey-panel-toggle" onClick={()=>setJourneyOpen(v=>!v)} aria-expanded={journeyOpen}><span>Your journey · 1% better, every day</span>{journeyOpen?<ChevronUp size={15}/>:<ChevronDown size={15}/>}</button><p>Started {formatDate(product.startDate)} · Day {dayNumber} · Week {weekNumber} of {Math.ceil(duration/7)}</p>{journeyOpen&&<div className="journey-milestone"><strong>{milestone?.title || 'Consistency is progress'}</strong><span>{milestone?.desc || 'Keep following your routine and give your skin time to respond.'}</span></div>}</section>
      <section><h4>Dosage guide</h4><p>{product.doseDescription || product.visualDosageValue}</p>{(product.boosters||[]).filter(h=>h.type==='withDose').map((h,i)=><span className="detail-step" key={h.id}>{i+1}. {h.title}</span>)}</section>
      <section><h4>The science behind your routine</h4><p>{product.whyRationingFails || product.tagline || 'Consistency helps you follow a routine long enough to understand how your skin responds.'}</p>{(product.clinicalTips||[]).map((tip,i)=><span className="detail-step application-tip" key={`tip-${i}`}>{tip}</span>)}</section>
    </div>}
  </article>;
}
