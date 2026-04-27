import { CalendarDays, Home, MapPin, WalletCards } from 'lucide-react';

export default function ContractSummary({ summary }) {
  const items = [
    { label: '주소', value: summary.address || '확인 필요', icon: MapPin },
    { label: '계약 종류', value: summary.contract_type || '확인 필요', icon: Home },
    { label: '보증금 / 월세', value: `${summary.deposit || '-'} / ${summary.monthly_rent || '-'}`, icon: WalletCards },
    { label: '관리비', value: summary.maintenance_fee || '확인 필요', icon: WalletCards }
  ];

  return (
    <section className="summary-section">
      <div className="section-title-row">
        <MapPin size={22} />
        <h2>계약 핵심 요약</h2>
      </div>
      <div className="summary-grid">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className="summary-item">
              <div className="summary-label"><Icon size={16} /> {item.label}</div>
              <strong>{item.value}</strong>
            </article>
          );
        })}
      </div>
      <div className="contract-period-card">
        <div>
          <span><CalendarDays size={18} /> 계약 기간</span>
          <strong>{summary.contract_period || '확인 필요'}</strong>
        </div>
        <div>
          <span>특약사항</span>
          <strong>{summary.special_terms_exists ? '있음' : '없음 또는 확인 필요'}</strong>
        </div>
      </div>
    </section>
  );
}
