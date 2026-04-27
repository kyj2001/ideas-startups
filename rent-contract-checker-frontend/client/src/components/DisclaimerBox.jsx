import { Scale, ShieldAlert } from 'lucide-react';

const defaultText =
  '이 AI 분석 결과는 계약서 텍스트를 바탕으로 만든 참고용 체크리스트입니다. 법률 자문이 아니며 계약 안전성을 보장하지 않습니다. 중요한 결정 전에는 공인중개사 또는 관련 전문가에게 다시 확인해 주세요.';

export default function DisclaimerBox({ variant = 'default', text = defaultText }) {
  return (
    <section className={`disclaimer ${variant === 'strong' ? 'disclaimer-strong' : ''}`}>
      <div className="disclaimer-icon">
        {variant === 'strong' ? <Scale size={22} /> : <ShieldAlert size={22} />}
      </div>
      <div>
        <h3>참고용 안내</h3>
        <p>{text || defaultText}</p>
      </div>
    </section>
  );
}
