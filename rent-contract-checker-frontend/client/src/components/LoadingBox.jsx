import { Check, FileSearch, MessageSquare, Search, ShieldAlert } from 'lucide-react';

const steps = [
  { icon: Check, title: '텍스트 읽기', status: '완료' },
  { icon: Search, title: '핵심 정보 추출', status: '진행 중' },
  { icon: ShieldAlert, title: '확인 필요 사항 정리', status: '대기' },
  { icon: MessageSquare, title: '질문 리스트 생성', status: '대기' }
];

export default function LoadingBox() {
  return (
    <main className="page loading-page">
      <section className="loading-card">
        <div className="progress-ring">
          <FileSearch size={56} />
        </div>
        <h1>계약서 내용을 분석하고 있습니다</h1>
        <p>보증금, 월세, 관리비, 특약사항과 질문 리스트를 정리하는 중입니다.</p>
        <div className="step-list">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className={`step-row ${index === 1 ? 'step-active' : ''} ${index === 0 ? 'step-done' : ''}`}>
                <div className="step-icon"><Icon size={22} /></div>
                <strong>{step.title}</strong>
                <span>{step.status}</span>
              </div>
            );
          })}
        </div>
        <div className="skeleton-card" />
      </section>
      <p className="secure-note">분석 결과는 참고용이며 최종 확인은 전문가와 함께 진행해 주세요.</p>
    </main>
  );
}
