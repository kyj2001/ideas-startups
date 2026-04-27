import { Copy, MessageSquare } from 'lucide-react';

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    alert('질문을 복사했습니다.');
  } catch {
    alert('복사에 실패했습니다. 질문을 직접 선택해서 복사해 주세요.');
  }
}

function QuestionGroup({ title, questions = [], eyebrow }) {
  return (
    <article className="question-group">
      <div className="question-title">
        <MessageSquare size={20} />
        <div>
          <span>{eyebrow}</span>
          <h3>{title}</h3>
        </div>
      </div>
      <div className="question-list">
        {questions.length === 0 && <p>추천 질문이 없습니다.</p>}
        {questions.map((question, index) => (
          <div className="question-row" key={`${question}-${index}`}>
            <p>{question}</p>
            <button onClick={() => copyText(question)} aria-label="질문 복사">
              <Copy size={18} />
            </button>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function QuestionList({ questions = {} }) {
  return (
    <section className="questions-section">
      <h2>중개사와 임대인에게 확인하기</h2>
      <QuestionGroup
        eyebrow="중개사 확인"
        title="중개사에게 물어볼 질문"
        questions={questions.for_realtor || []}
      />
      <QuestionGroup
        eyebrow="임대인 확인"
        title="임대인에게 물어볼 질문"
        questions={questions.for_landlord || []}
      />
    </section>
  );
}
