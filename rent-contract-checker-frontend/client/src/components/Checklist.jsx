import { useState } from 'react';

export default function Checklist({ items = [] }) {
  const [checked, setChecked] = useState({});

  return (
    <section className="checklist-section">
      <h2>계약 전 필수 체크리스트</h2>
      <div className="checklist-box">
        {items.length === 0 && <p>체크리스트가 없습니다. 계약 전 등기부등본과 특약사항은 별도로 확인해 주세요.</p>}
        {items.map((item, index) => (
          <label className="check-item" key={`${item}-${index}`}>
            <input
              type="checkbox"
              checked={Boolean(checked[index])}
              onChange={() => setChecked((prev) => ({ ...prev, [index]: !prev[index] }))}
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
