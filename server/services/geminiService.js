const emptyAnalysis = {
  contract_summary: {
    contract_type: "",
    deposit: "",
    monthly_rent: "",
    maintenance_fee: "",
    contract_period: "",
    address: "",
    lessor: "",
    lessee: "",
    special_terms_exists: false,
  },
  caution_points: [],
  questions: {
    for_realtor: [],
    for_landlord: [],
  },
  checklist: [],
  disclaimer:
    "이 결과는 계약서 이해를 돕기 위한 참고용 정보이며 법률 자문이 아닙니다. 계약 안전성을 보장하지 않으며, 중요한 내용은 공인중개사 또는 관련 전문가에게 다시 확인해 주세요.",
};

const analysisSchema = {
  type: "OBJECT",
  properties: {
    contract_summary: {
      type: "OBJECT",
      properties: {
        contract_type: { type: "STRING" },
        deposit: { type: "STRING" },
        monthly_rent: { type: "STRING" },
        maintenance_fee: { type: "STRING" },
        contract_period: { type: "STRING" },
        address: { type: "STRING" },
        lessor: { type: "STRING" },
        lessee: { type: "STRING" },
        special_terms_exists: { type: "BOOLEAN" },
      },
    },
    caution_points: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          category: { type: "STRING" },
          level: { type: "STRING" },
          summary: { type: "STRING" },
          reason: { type: "STRING" },
          evidence: { type: "STRING" },
        },
      },
    },
    questions: {
      type: "OBJECT",
      properties: {
        for_realtor: {
          type: "ARRAY",
          items: { type: "STRING" },
        },
        for_landlord: {
          type: "ARRAY",
          items: { type: "STRING" },
        },
      },
    },
    checklist: {
      type: "ARRAY",
      items: { type: "STRING" },
    },
    disclaimer: { type: "STRING" },
  },
};

const safeJsonParse = (content) => {
  try {
    return JSON.parse(content);
  } catch (error) {
    const jsonMatch = content.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw error;
    }

    return JSON.parse(jsonMatch[0]);
  }
};

const buildPrompt = (contractText) => `
너는 전월세 계약서를 처음 보는 사회초년생, 대학생, 첫 자취생이 이해하기 쉽게 도와주는 계약서 체크 도우미다.

반드시 지켜야 할 원칙:
- 법률 자문처럼 말하지 않는다.
- 계약의 안전성을 보장하지 않는다.
- "위험"이라는 표현은 사용하지 않는다.
- 대신 "확인 필요", "꼭 질문 필요", "추가 확인 권장" 같은 표현을 사용한다.
- 어려운 법률 용어는 쉬운 말로 풀어서 설명한다.
- 계약서에 없는 내용은 추측하지 말고 "계약서에서 확인되지 않음"이라고 쓴다.
- 응답은 JSON만 반환한다. 설명 문장, 마크다운, 코드블록은 절대 넣지 않는다.

분석해야 할 항목:
1. 계약 유형
2. 보증금
3. 월세
4. 관리비
5. 계약 기간
6. 주소
7. 임대인
8. 임차인
9. 특약사항 유무
10. 관리비 확인 필요 사항
11. 수리 책임 확인 필요 사항
12. 원상복구 확인 필요 사항
13. 중도해지 확인 필요 사항
14. 보증금 반환 확인 필요 사항
15. 중개사에게 물어볼 질문
16. 임대인에게 물어볼 질문
17. 계약 전 체크리스트

caution_points 작성 규칙:
- category 예시: "관리비", "수리 책임", "원상복구", "중도해지", "보증금 반환", "특약사항", "계약 기간", "주소/당사자"
- level은 "확인 필요", "꼭 질문 필요", "추가 확인 권장" 중 하나만 사용한다.
- evidence에는 계약서에서 근거가 되는 짧은 문구를 넣고, 없으면 "계약서에서 확인되지 않음"이라고 쓴다.

disclaimer에는 다음 취지를 쉬운 말로 포함한다:
- 이 분석은 참고용이다.
- 법률 자문이 아니다.
- 계약 안전성을 보장하지 않는다.
- 최종 결정 전 공인중개사 또는 전문가에게 확인해야 한다.

계약서 텍스트:
${contractText}
`;

const normalizeAnalysis = (analysis) => ({
  ...emptyAnalysis,
  ...analysis,
  contract_summary: {
    ...emptyAnalysis.contract_summary,
    ...(analysis.contract_summary || {}),
  },
  questions: {
    ...emptyAnalysis.questions,
    ...(analysis.questions || {}),
  },
  caution_points: Array.isArray(analysis.caution_points) ? analysis.caution_points : [],
  checklist: Array.isArray(analysis.checklist) ? analysis.checklist : [],
  disclaimer: analysis.disclaimer || emptyAnalysis.disclaimer,
});

const getGeminiText = (responseBody) => {
  const parts = responseBody?.candidates?.[0]?.content?.parts || [];
  return parts.map((part) => part.text || "").join("").trim();
};

const analyzeContractText = async (contractText) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    const error = new Error("GEMINI_API_KEY가 설정되어 있지 않습니다.");
    error.status = 500;
    throw error;
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: buildPrompt(contractText) }],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    }),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    const errorMessage = responseBody?.error?.message || "Gemini API 분석 요청에 실패했습니다.";
    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  const content = getGeminiText(responseBody);

  if (!content) {
    const error = new Error("AI 분석 결과가 비어 있습니다.");
    error.status = 502;
    throw error;
  }

  return normalizeAnalysis(safeJsonParse(content));
};

module.exports = {
  analyzeContractText,
};
