import { ArrowRight, CheckCircle2, FileSearch, FileUp, HelpCircle, MessageSquare, ShieldCheck } from 'lucide-react';

export default function Home({ onStart }) {
  return (
    <main className="page home-page">
      <section className="hero-card">
        <div className="hero-badge">
          <ShieldCheck size={16} />
          쉬운 계약서 체크
        </div>
        <h1>전월세 계약서, 놓치기 쉬운 내용을 AI가 정리해 드립니다</h1>
        <p>
          PDF를 업로드하거나 계약서 텍스트를 붙여넣으면 보증금, 월세, 관리비,
          특약사항과 꼭 물어볼 질문을 한 번에 확인할 수 있습니다.
        </p>
        <button className="primary-button" onClick={onStart}>
          <FileUp size={20} />
          계약서 업로드하기
        </button>
        <small>법률 자문이 아닌 계약 전 확인을 돕는 참고용 AI 체크 서비스입니다.</small>
      </section>

      <section className="feature-grid">
        <article className="feature-card">
          <div className="feature-icon blue"><FileSearch size={24} /></div>
          <h2>핵심 정보 요약</h2>
          <p>보증금, 월세, 관리비, 계약 기간처럼 먼저 봐야 할 항목을 정리합니다.</p>
          <button>자세히 보기 <ArrowRight size={15} /></button>
        </article>
        <article className="feature-card">
          <div className="feature-icon yellow"><HelpCircle size={24} /></div>
          <h2>확인 필요 사항</h2>
          <p>관리비, 수리 책임, 원상복구, 보증금 반환처럼 꼭 질문할 부분을 표시합니다.</p>
          <button>확인 항목 보기 <ArrowRight size={15} /></button>
        </article>
        <article className="feature-card">
          <div className="feature-icon gray"><MessageSquare size={24} /></div>
          <h2>질문 리스트 생성</h2>
          <p>중개사와 임대인에게 바로 물어볼 수 있는 질문을 만들어 줍니다.</p>
          <button>질문 가이드 <ArrowRight size={15} /></button>
        </article>
      </section>

      <section className="how-section">
        <h2>이렇게 사용합니다</h2>
        <div className="how-grid">
          {[
            ['1', '계약서 업로드', 'PDF 파일을 선택하거나 계약서 텍스트를 직접 붙여넣습니다.'],
            ['2', 'AI 분석', 'Gemini API가 계약서 내용을 쉬운 말로 정리합니다.'],
            ['3', '질문과 체크리스트 확인', '계약 전 확인할 질문과 체크리스트를 확인합니다.']
          ].map(([num, title, desc]) => (
            <article className="how-card" key={num}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sample-card">
        <div className="sample-document">
          <strong>부동산 임대차 계약서</strong>
          <span>분석 중...</span>
          <div className="doc-line wide" />
          <div className="doc-line" />
          <div className="doc-line short" />
          <div className="doc-alert"><CheckCircle2 size={14} /> 특약: 원상복구 조항 확인</div>
        </div>
        <div>
          <h2>눈으로 보는 것보다 더 차분하게</h2>
          <p>
            계약서의 긴 문장을 처음 자취하는 사람도 이해하기 쉽게 요약하고,
            최종 서명 전에 다시 확인할 내용을 정리합니다.
          </p>
          <div className="tag-row">
            <span>#전월세체크</span>
            <span>#특약확인</span>
            <span>#관리비질문</span>
          </div>
        </div>
      </section>
    </main>
  );
}
