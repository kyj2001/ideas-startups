import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('Missing GEMINI_API_KEY or GOOGLE_API_KEY in .env');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const app = express();
app.use(express.json({ limit: '25mb' }));

const sampleText = `보증금 1,000만원, 월세 80만원, 관리비 10만원
계약 기간: 2026년 6월 1일부터 2027년 5월 31일까지
임대인: 홍길동 / 임차인: 김영희
주소: 서울 강남구 역삼동 123-45
특약: 수리 책임은 임대인이 부담하며, 원상복구 시 과도한 비용은 청구하지 않는다.`;

const sampleAnalysisResult = {
  contract_type: '월세',
  contract_date: '2026-01-01',
  property: {
    address: '서울 강남구 역삼동 123-45',
    land: {
      category: '대지',
      area_m2: null,
    },
    land_right: {
      type: '',
      ratio: '',
    },
    building: {
      structure: '',
      usage: '주거',
      area_m2: null,
    },
    leased_part: {
      description: '',
      area_m2: null,
    },
  },
  payment: {
    deposit: 10000000,
    contract_deposit: null,
    intermediate_payment: null,
    intermediate_payment_date: '',
    balance: null,
    balance_date: '',
    monthly_rent: 800000,
    rent_payment_type: '월납',
    rent_payment_day: null,
    maintenance_fee: 100000,
    maintenance_fee_includes: [],
    separate_fees: [],
  },
  term: {
    delivery_date: '2026-06-01',
    start_date: '2026-06-01',
    end_date: '2027-05-31',
    duration_months_estimated: 12,
  },
  documents: {
    attached_or_checked: [],
  },
  special_terms: [
    {
      text: '수리 책임은 임대인이 부담하며, 원상복구 시 과도한 비용은 청구하지 않는다.',
      needs_review: false,
      review_reason: '',
    },
  ],
  parties: {
    lessor: {
      name: '홍길동',
      address: '',
      phone: '',
      resident_registration_no: '',
      status: '',
    },
    lessee: {
      name: '김영희',
      address: '',
      phone: '',
      resident_registration_no: '',
      status: '',
    },
    broker: {
      office_address: '',
      office_name: '',
      representative_name: '',
      registration_no: '',
      phone: '',
      status: '',
    },
  },
  ocr_review_flags: [],
};

const normalizeMimeType = (mimeType: string) => {
  if (mimeType === 'image/jpg') return 'image/jpeg';
  return mimeType;
};

async function extractContractTextFromDocument(fileBase64: string, fileType: string) {
  console.log('\n🔵 [OCR] extractContractTextFromDocument called');
  console.log('  fileType:', fileType);
  
  const mimeType = normalizeMimeType(fileType);
  // PDF와 이미지 모두 vision 모델로 처리
  const model = 'gemini-2.5-flash-image';
  console.log('  model selected:', model);

  try {
    const prompt = `아래 문서는 한국 전월세 계약서입니다. 문서에서 다음 정보를 추출해주세요:

1. 보증금/전세금 (금액)
2. 월세 (금액, 있는 경우)
3. 관리비 (금액, 있는 경우)
4. 계약 기간 (시작일 ~ 종료일)
5. 임대인 이름
6. 임차인 이름
7. 임차 대상 주소
8. 특약사항 (있으면 나열)

추출한 정보를 다음과 같이 정리해서 출력해주세요:

보증금: [금액]
월세: [금액 또는 없음]
관리비: [금액 또는 없음]
계약기간: [시작일] ~ [종료일]
임대인: [이름]
임차인: [이름]
주소: [주소]
특약: [특약사항들]

다른 설명이나 추가 문장은 출력하지 마세요.`;

    console.log('  📤 Sending to Gemini...');
    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          parts: [
            { text: prompt },
            { inlineData: { data: fileBase64, mimeType } },
          ],
        },
      ],
      config: {
        maxOutputTokens: 1000,
        temperature: 0,
      },
    });

    const text = response.text?.trim();
    console.log('  📥 Gemini response length:', text?.length);
    console.log('  📥 Gemini response preview:', text?.substring(0, 200));
    
    if (!text || text.length === 0) {
      console.error('  ❌ OCR response was empty');
      return sampleText;
    }

    console.log('  ✅ OCR extracted successfully, text length:', text.length);
    return text;
  } catch (error) {
    console.error('  ❌ OCR extract failed:', error);
    return sampleText;
  }
}

async function analyzeContractText(contractText: string) {
  console.log('\n🔵 [ANALYZE] analyzeContractText called');
  console.log('  contractText length:', contractText.length);
  console.log('  contractText preview:', contractText.substring(0, 150));
  
  try {
    const systemPrompt = `너는 전월세 계약서 OCR 결과를 구조화하는 정보 추출 AI다.

입력으로 부동산 임대차 계약서의 OCR 텍스트가 주어진다.
너의 역할은 OCR 텍스트에서 계약서 핵심 정보를 추출해 JSON으로 정리하는 것이다.

주의사항:
- 법률 판단을 하지 말고, 정보 추출만 한다.
- OCR 오류가 의심되는 항목은 needs_review: true로 표시한다.
- 값이 없거나 읽을 수 없으면 빈 문자열("") 또는 null로 둔다.
- 금액은 숫자와 글자로 같이 추출한다. 예: 50,000,000(오천만원)
- 날짜는 YYYY-MM-DD 형식으로 변환한다.
- 특약사항은 문장 단위로 나누어 배열로 정리한다.
- 사용자 수정 화면에 쓰일 수 있도록 필드명을 명확하게 작성한다.
- 반드시 아래 JSON 형식만 출력한다. 설명 문장은 출력하지 않는다.

추가 규칙:
- 계약 종료일, 중개보수율, 특약 문장, 임대인/임차인 정보 누락, 금액 불일치가 의심되면 ocr_review_flags에 추가한다.
- 보증금, 계약금, 중도금, 잔금의 합계가 보증금과 맞지 않으면 확인 필요로 표시한다.
- 월세 계약인데 월세 금액이 없으면 확인 필요로 표시한다.
- 관리비 항목이 있으면 maintenance_fee, maintenance_fee_includes, separate_fees에 최대한 분리해서 넣는다.
- 특약사항은 원문 의미를 유지하되 OCR로 깨진 문장은 자연스럽게 복원하고, 복원한 경우 needs_review를 true로 표시한다.`;

    const prompt = `${systemPrompt}\n\nOCR 텍스트:\n${contractText}`;

    console.log('  📤 Sending to Gemini...');
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          parts: [
            { text: prompt },
          ],
        },
      ],
      config: {
        maxOutputTokens: 2000,
        temperature: 0.1,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text?.trim() ?? '';
    console.log('  📥 Raw Gemini response (first 300 chars):', text.substring(0, 300));

    let parsed: any = null;

    const tryParseJson = (raw: string) => {
      try {
        return JSON.parse(raw);
      } catch {
        const start = raw.indexOf('{');
        const end = raw.lastIndexOf('}');
        if (start >= 0 && end > start) {
          try {
            return JSON.parse(raw.slice(start, end + 1));
          } catch {
            return null;
          }
        }
        return null;
      }
    };

    parsed = tryParseJson(text);
    console.log('  📋 Parsed successfully:', !!parsed);
    if (parsed) {
      console.log('  Fields found:', Object.keys(parsed).join(', '));
    }

    if (!parsed) {
      console.error('  ❌ Analysis response text could not be parsed as JSON');
      console.error('  Raw text was:', text);
      throw new Error('Invalid JSON response from Gemini analysis');
    }

    if (
      parsed &&
      parsed.contract_type &&
      parsed.property &&
      parsed.payment &&
      parsed.term &&
      parsed.parties
    ) {
      console.log('  ✅ All required fields present, returning parsed result');
      return parsed;
    }

    console.error('  ❌ Analysis response parsed but missing expected fields');
    console.error('  Fields present:', {
      contract_type: !!parsed.contract_type,
      property: !!parsed.property,
      payment: !!parsed.payment,
      term: !!parsed.term,
      parties: !!parsed.parties,
    });
  } catch (error) {
    console.error('  ❌ Analysis failed:', error);
  }

  console.log('  ⚠️  Returning sample data');
  return sampleAnalysisResult;
}

app.post('/api/contracts/upload', async (req, res) => {
  console.log('\n📨 [API] POST /api/contracts/upload');
  const { fileName, fileType, fileBase64 } = req.body;
  console.log('  fileName:', fileName);
  console.log('  fileType:', fileType);
  console.log('  fileBase64 length:', fileBase64?.length);
  
  let contractText = sampleText;

  if (fileBase64 && (fileType?.startsWith('image/') || fileType === 'application/pdf')) {
    contractText = await extractContractTextFromDocument(fileBase64, fileType);
  }

  console.log('  Responding with contractText length:', contractText.length);
  res.json({ contractText, fileName: fileName || '계약서' });
});

app.post('/api/contracts/analyze', async (req, res) => {
  console.log('\n📨 [API] POST /api/contracts/analyze');
  const { contractText } = req.body;
  console.log('  contractText length:', contractText?.length);
  
  const analysis = await analyzeContractText(contractText || sampleText);
  console.log('  Responding with analysis result');
  res.json(analysis);
});

const port = 4000;
app.listen(port, () => {
  console.log('\n✅ Backend server started!');
  console.log(`🌐 Listening on http://localhost:${port}`);
  console.log(`📝 GEMINI_API_KEY loaded: ${GEMINI_API_KEY ? '✓' : '✗'}\n`);
});
