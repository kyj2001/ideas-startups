export type AnalysisResult = {
  contractText: string;
  info: { label: string; value: string }[];
  clauses: string[];
  cautions: string[];
  checks: string[];
  questions: string[];
};

const sampleText = `보증금 1,000만원, 월세 80만원, 관리비 10만원
계약 기간: 2026년 6월 1일부터 2027년 5월 31일까지
임대인: 홍길동 / 임차인: 김영희
주소: 서울 강남구 역삼동 123-45
특약: 수리 책임은 임대인이 부담하며, 원상복구 시 과도한 비용은 청구하지 않는다.`;

const sampleAnalysisResult: AnalysisResult = {
  contractText: sampleText,
  info: [
    { label: '보증금', value: '1,000만 원' },
    { label: '월세', value: '80만 원' },
    { label: '관리비', value: '10만 원' },
    { label: '계약 기간', value: '2026.06.01 ~ 2027.05.31' },
    { label: '임대인/임차인', value: '홍길동 / 김영희' },
    { label: '주소', value: '서울 강남구 역삼동 123-45' },
  ],
  clauses: [
    '수리 책임은 임대인이 부담하도록 명확히 언급되어 있습니다.',
    '계약 기간 종료 후 원상복구 요구가 있으나, 과도한 비용 청구는 제한되어야 합니다.',
    '중도해지 시 위약금 조건이 구체적으로 기술되어 있지 않습니다.',
  ],
  cautions: [
    '관리비 항목이 구체적으로 적혀 있는지 확인 필요',
    '원상복구 범위가 과도하지 않은지 확인 필요',
    '수리 책임 주체가 명확한지 확인 필요',
    '보증금 반환 조건 확인 필요',
    '중도해지 관련 조항 확인 필요',
  ],
  checks: [
    '관리비 포함 항목을 정확히 확인했나요?',
    '원상복구 범위가 과도한지 검토했나요?',
    '수리 책임 주체가 명확히 작성되었나요?',
    '보증금 반환 조건을 다시 확인했나요?',
    '중도해지 시 위약금이나 조건이 있나요?',
  ],
  questions: [
    '관리비에 포함되는 항목은 정확히 무엇인가요?',
    '계약 종료 시 원상복구 범위는 어디까지인가요?',
    '고장 발생 시 임대인과 임차인 중 누가 수리비를 부담하나요?',
    '보증금 반환 시점은 언제인가요?',
    '중도해지 시 위약금이나 조건이 있나요?',
  ],
};

async function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve(result.split(',')[1] ?? '');
      } else {
        reject(new Error('파일 변환에 실패했습니다.'));
      }
    };
    reader.onerror = () => reject(new Error('파일을 읽는 중 오류가 발생했습니다.'));
    reader.readAsDataURL(file);
  });
}

export async function uploadContractFile(file: File) {
  const fileBase64 = await fileToBase64(file);
  const body = {
    fileName: file.name,
    fileType: file.type,
    fileBase64,
  };

  try {
    const response = await fetch('/api/contracts/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('서버 업로드 요청이 실패했습니다.');
    }

    const data = await response.json();
    return {
      contractText: data.contractText ?? sampleText,
      fileName: data.fileName ?? file.name,
    };
  } catch (error) {
    return {
      contractText: sampleText,
      fileName: file.name,
    };
  }
}

export async function analyzeContractText(text: string) {
  try {
    const response = await fetch('/api/contracts/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contractText: text }),
    });

    if (!response.ok) {
      throw new Error('서버 분석 요청이 실패했습니다.');
    }

    const data = await response.json();
    return data as AnalysisResult;
  } catch (error) {
    return {
      ...sampleAnalysisResult,
      contractText: text,
    };
  }
}

export function getSampleAnalysisResult() {
  return sampleAnalysisResult;
}
