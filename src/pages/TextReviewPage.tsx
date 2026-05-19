import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FileText, ArrowRight, ChevronLeft } from 'lucide-react';
import { analyzeContractText } from '../lib/api.ts';

export default function TextReviewPage() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [fileName, setFileName] = useState('계약서');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedText = sessionStorage.getItem('contractText');
    const storedName = sessionStorage.getItem('contractFileName');
    if (!storedText) {
      navigate('/upload');
      return;
    }
    setText(storedText);
    if (storedName) setFileName(storedName);
  }, [navigate]);

  const handleAnalyze = async () => {
    if (!agreed) return;
    setErrorMessage('');
    setLoading(true);

    try {
      sessionStorage.setItem('contractText', text);
      const analysisResult = await analyzeContractText(text);
      sessionStorage.setItem('analysisResult', JSON.stringify(analysisResult));
      navigate('/result');
    } catch (error) {
      setErrorMessage('AI 분석 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-96px)] px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 flex flex-col gap-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-container">텍스트 확인</p>
          <h1 className="text-4xl font-extrabold text-slate-900">추출된 계약서 텍스트를 확인하고 수정하세요.</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            OCR로 추출된 계약서 내용을 확인한 후, 필요한 부분을 직접 수정한 뒤 AI 분석을 시작하세요.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/40"
        >
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">파일</p>
              <p className="text-sm text-slate-500">{fileName}</p>
            </div>
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 hover:border-primary-container hover:text-primary-container transition"
            >
              <ChevronLeft className="h-4 w-4" /> 다시 업로드
            </Link>
          </div>

          <div className="mb-8 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            <p>추출된 텍스트를 검토하고 필요한 변경 사항을 반영한 뒤, 분석을 시작하세요.</p>
          </div>

          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={14}
            className="w-full resize-none rounded-3xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-800 shadow-sm focus:border-primary-container focus:outline-none"
          />

          {errorMessage && <p className="mt-4 text-sm text-error">{errorMessage}</p>}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-3 text-slate-700">
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed((prev) => !prev)}
                className="h-5 w-5 rounded border-slate-300 text-primary-container focus:ring-primary-container"
              />
              <span>위 텍스트를 바탕으로 AI 분석을 진행하는 것에 동의합니다.</span>
            </label>
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!agreed || loading}
              className={`inline-flex items-center justify-center gap-2 rounded-3xl px-8 py-4 text-base font-semibold transition ${
                agreed
                  ? 'bg-primary-container text-white shadow-lg shadow-blue-500/15 hover:bg-blue-700'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              } ${loading ? 'cursor-wait opacity-80' : ''}`}
            >
              {loading ? '분석 중...' : 'AI 분석 시작하기'}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
