export const DELIVERY_BUFFER_DAYS = 7;
export const STORE_URL_PLACEHOLDER = 'https://www.bodywise.com/';
export const localISODate = (date = new Date()) => { const d = new Date(date); d.setHours(0,0,0,0); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
export const formatDate = (value) => new Date(`${value}T00:00:00`).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
export function getSupplyStatus(product, today = new Date()) {
  const dosesLeft = Math.max(0, Number(product.remainingUses ?? product.dosesLeft ?? 0));
  let dosesPerWeek = product.frequencyType === 'daily' ? 7 : (product.frequencyCount || product.frequencyDays?.length || 1);
  if (/3x a week/i.test(product.frequencyLabel || '')) dosesPerWeek = 3;
  const plannedRate = dosesPerWeek / 7;
  const logs = (product.doseLogs || []).filter(x => (today - new Date(`${x.date}T00:00:00`)) / 86400000 <= 14 && (today - new Date(`${x.date}T00:00:00`)) / 86400000 >= 0);
  const logDates = (product.doseLogs || []).map(x => new Date(`${x.date}T00:00:00`).getTime());
  const historyDays = logDates.length > 1 ? (Math.max(...logDates) - Math.min(...logDates)) / 86400000 : 0;
  const adaptiveRate = logs.length / 14;
  const rate = historyDays >= 7 && adaptiveRate > 0 ? adaptiveRate : plannedRate;
  const daysLeft = dosesLeft === 0 ? 0 : (rate > 0 ? dosesLeft / rate : 0);
  const runOut = new Date(today); runOut.setHours(0,0,0,0); runOut.setDate(runOut.getDate() + Math.ceil(daysLeft));
  const reorder = new Date(runOut); reorder.setDate(reorder.getDate() - DELIVERY_BUFFER_DAYS);
  const status = dosesLeft === 0 ? 'empty' : daysLeft <= 7 ? 'urgent' : daysLeft <= 14 ? 'low' : 'ok';
  return { dosesLeft, dosesPerWeek, daysLeft, runOutDate: localISODate(runOut), reorderByDate: localISODate(reorder), status, rate };
}
export const SUPPLY_TEST_CASES = [
  { input: { remainingUses: 12, frequencyType: 'daily' }, expectedDaysLeft: 12, expectedStatus: 'low' },
  { input: { remainingUses: 73, frequencyType: 'days_per_week', frequencyCount: 3, frequencyLabel: '3x a week' }, expectedDaysLeft: 170.33, expectedStatus: 'ok' },
  { input: { remainingUses: 0, frequencyType: 'daily' }, expectedDaysLeft: 0, expectedStatus: 'empty' }
];
