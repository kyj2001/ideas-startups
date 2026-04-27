export default function TextReviewBox({ value, onChange, onAnalyze, loading }) {
  return (
    <section className="text-review-card">
      <div className="section-heading">
        <span>2</span>
        <div>
          <h2>추출된 계약서 내용 확인</h2>
          <p>금액, 기간, 특약사항이 잘 들어왔는지 확인한 뒤 분석을 시작하세요.</p>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="PDF 텍스트 추출이 어렵다면 계약서 내용을 직접 붙여넣어 주세요."
      />
      <button className="primary-button full" onClick={onAnalyze} disabled={loading || !value.trim()}>
        {loading ? 'AI 분석 중...' : 'AI 분석 시작'}
      </button>
    </section>
  );
}
