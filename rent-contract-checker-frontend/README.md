# 전월세 계약서 AI 체크 - React/Vite 프론트 MVP

이 프로젝트는 Google Stitch에서 받은 HTML/스크린샷 결과물을 바탕으로 다시 구성한 **실행 가능한 React/Vite 프론트엔드**입니다.

## 구성

```txt
rent-contract-checker-frontend/
├── client/                  # 실제 실행할 React/Vite 프론트
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/api.js  # 백엔드 API 연결 지점
│   │   └── data/mockResult.js
│   ├── package.json
│   └── .env.example
├── stitch_reference/         # 사용자가 준 Stitch 원본 참고 파일
└── README.md
```

## 실행 방법

```bash
cd client
npm install
npm run dev
```

브라우저에서 아래 주소로 접속합니다.

```txt
http://localhost:5173
```

## 백엔드 연결 위치

`client/src/services/api.js`에서 백엔드 주소를 바꿀 수 있습니다.

기본값:

```txt
http://localhost:3001
```

`.env`를 만들고 아래처럼 설정할 수도 있습니다.

```env
VITE_API_BASE_URL=http://localhost:3001
```

## 현재 동작 방식

백엔드가 아직 없어도 화면 확인이 가능하도록 되어 있습니다.

- 파일 업로드 후 텍스트 추출 시도
- 백엔드 연결 실패 시 샘플 계약서 텍스트 자동 입력
- AI 분석 요청 실패 시 mock 분석 결과 표시

즉, 백엔드 없이도 프론트 시연 화면은 돌아갑니다.

## 백엔드가 나중에 제공해야 할 API

### POST /api/upload

요청:

```txt
multipart/form-data
field name: file
```

응답 예시:

```json
{
  "success": true,
  "text": "추출된 계약서 텍스트",
  "message": "텍스트 추출이 완료되었습니다."
}
```

### POST /api/analyze

요청:

```json
{
  "contractText": "계약서 텍스트"
}
```

응답 예시:

```json
{
  "success": true,
  "data": {
    "contract_summary": {
      "contract_type": "월세",
      "deposit": "5000만원",
      "monthly_rent": "120만원",
      "maintenance_fee": "15만원",
      "contract_period": "2024.06.01 ~ 2026.05.31",
      "address": "서울시 ...",
      "lessor": "",
      "lessee": "",
      "special_terms_exists": true
    },
    "caution_points": [],
    "questions": {
      "for_realtor": [],
      "for_landlord": []
    },
    "checklist": [],
    "disclaimer": "본 결과는 법률 자문이 아닌 참고용 AI 분석입니다."
  }
}
```

## 보안 주의

프론트에는 Gemini/OpenAI API 키를 넣지 마세요.

API 키는 백엔드 `.env`에만 넣어야 합니다.

잘못된 예:

```js
const apiKey = "AIza...";
```

이런 코드는 절대 프론트에 두면 안 됩니다.

## MVP에서 의도적으로 제외한 기능

- 로그인
- 회원가입
- 결제
- 계약서 저장 이력
- 법률 판단
- 변호사 연결
- 중개사 연결
- 등기부등본 자동 조회
- 보증보험 연동
