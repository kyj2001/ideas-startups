import ContractSummary from '../components/ContractSummary.jsx';
import CautionPoints from '../components/CautionPoints.jsx';
import QuestionList from '../components/QuestionList.jsx';
import Checklist from '../components/Checklist.jsx';
import DisclaimerBox from '../components/DisclaimerBox.jsx';

export default function ResultPage({ result, onRestart }) {
  if (!result) {
    return (
      <main className="page result-page">
        <section className="empty-result">
          <h1>아직 분석 결과가 없습니다.</h1>
          <p>계약서를 업로드하고 AI 분석을 시작해 주세요.</p>
          <button className="primary-button" onClick={onRestart}>계약서 업로드하기</button>
        </section>
      </main>
    );
  }

  return (
    <main className="page result-page">
      <section className="result-title">
        <div>
          <h1>계약서 AI 체크 결과</h1>
          <p>참고용 리포트입니다. 최종 결정 전 한 번 더 확인해 주세요.</p>
        </div>
        <span>분석 완료</span>
      </section>

      <ContractSummary summary={result.contract_summary || {}} />
      <CautionPoints points={result.caution_points || []} />
      <QuestionList questions={result.questions || {}} />
      <Checklist items={result.checklist || []} />
      <DisclaimerBox variant="strong" text={result.disclaimer} />

      <button className="secondary-button full" onClick={onRestart}>다른 계약서 분석하기</button>
    </main>
  );
}
