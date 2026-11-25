import React, { useMemo, useState, useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import { PRESET_CATALOG_PRODUCTS } from '../data/products';
export default function AddProductDrawer({ isOpen, onClose, activeProductIds=[], onSelectProduct }) {
 const [query,setQuery]=useState(''); const [category,setCategory]=useState('All'); const panel=useRef(null);
 useEffect(()=>{if(!isOpen)return; const key=e=>{if(e.key==='Escape'){onClose();return}if(e.key==='Tab'){const els=[...(panel.current?.querySelectorAll('button,input')||[])].filter(x=>!x.disabled);if(!els.length)return;const first=els[0],last=els[els.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}};document.addEventListener('keydown',key);panel.current?.querySelector('button')?.focus();return()=>document.removeEventListener('keydown',key)},[isOpen,onClose]);
 const categories=['All',...new Set(PRESET_CATALOG_PRODUCTS.map(p=>p.category))];
 const products=useMemo(()=>PRESET_CATALOG_PRODUCTS.filter(p=>(category==='All'||p.category===category)&&`${p.name} ${p.tagline}`.toLowerCase().includes(query.toLowerCase())),[category,query]);
 if(!isOpen)return null;
 return <div className="overlay drawer-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="catalogue-title" tabIndex={-1} ref={panel}>
  <header className="drawer-head"><div><p className="eyebrow">Product catalogue</p><h2 id="catalogue-title">Add a product</h2></div><button className="icon-button" aria-label="Close" onClick={onClose}><X/></button></header>
  <div className="catalogue-tools"><label className="search-field"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products" aria-label="Search products"/></label><div className="filter-chips">{categories.map(c=><button key={c} className={`filter-chip ${category===c?'selected':''}`} onClick={()=>setCategory(c)}>{c}</button>)}</div></div>
  <div className="catalogue-list">{products.map(p=>{const exists=activeProductIds.includes(p.id);return <article className="catalogue-item" key={p.id}><p className="eyebrow">{p.category}</p><h3>{p.name}</h3><p>{p.tagline}</p><div className="dose-chips"><span>{p.frequencyLabel}</span><span>{p.visualDosageValue}</span></div><button className="secondary-button" disabled={exists} onClick={()=>onSelectProduct(p)}>{exists?'Already added':'Add'}</button></article>})}</div>
 </aside></div>
}
