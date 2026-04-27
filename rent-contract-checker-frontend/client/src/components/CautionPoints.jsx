import { AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';

function getBadgeClass(level = '') {
  if (level.includes('꼭')) return 'badge-danger';
  if (level.includes('확인')) return 'badge-info';
  return 'badge-safe';
}

function getIcon(level = '') {
  if (level.includes('꼭')) return AlertTriangle;
  if (level.includes('확인')) return HelpCircle;
  return CheckCircle2;
}

export default function CautionPoints({ points = [] }) {
  return (
    <section className="caution-section">
      <h2>주의 깊게 확인할 내용</h2>
      <div className="caution-list">
        {points.length === 0 && (
          <article className="caution-card">
            <h3>추가 확인 항목이 없습니다.</h3>
            <p>그래도 계약 전에는 중개사 또는 전문가에게 주요 조건을 다시 확인해 주세요.</p>
          </article>
        )}

        {points.map((point, index) => {
          const Icon = getIcon(point.level);
          return (
            <article className="caution-card" key={`${point.category}-${index}`}>
              <div className="caution-header">
                <span className="category-pill">{point.category || '확인 항목'}</span>
                <span className={`level-badge ${getBadgeClass(point.level)}`}>
                  <Icon size={15} />
                  {point.level || '확인 필요'}
                </span>
              </div>
              <h3>{point.summary || '내용 확인 필요'}</h3>
              <p>{point.reason || '계약서 내용을 다시 확인해 주세요.'}</p>
              {point.evidence && (
                <div className="evidence-box">
                  <span>근거 문구</span>
                  <strong>{point.evidence}</strong>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
