import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { getSampleAnalysisResult, type AnalysisResult } from '../lib/api.ts';

const defaultAnalysis = getSampleAnalysisResult();

export default function ResultPage() {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<AnalysisResult>(defaultAnalysis);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('analysisResult');
    if (!stored) {
      navigate('/upload');
      return;
    }

    try {
      setAnalysis(JSON.parse(stored));
    } catch {
      setAnalysis(defaultAnalysis);
    } finally {
      setLoaded(true);
    }
  }, [navigate]);

  const handleDownload = () => {
    const printId = document.getElementById('printable-result');
    if (!printId) return;

    const printWindow = window.open('', '_blank', 'width=1200,height=900');
    if (!printWindow) return;

    const html = `
      <html>
        <head>
          <title>계약서 분석 결과</title>
          <style>
            body { font-family: ui-sans-serif, system-ui, sans-serif; margin: 24px; color: #0f172a; }
            h1, h2, p, div, li { color: #0f172a; }
            .card { border: 1px solid #e2e8f0; border-radius: 24px; padding: 24px; margin-bottom: 24px; }
            .grid { display: grid; gap: 16px; }
            .grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .section-title { margin-bottom: 16px; font-size: 20px; font-weight: 800; }
            .tag { display: inline-flex; padding: 8px 12px; background: #e2e8f0; border-radius: 9999px; font-size: 12px; margin-right: 8px; margin-bottom: 8px; }
            .no-print { display: none !important; }
          </style>
        </head>
        <body>
          ${printId.outerHTML}
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  if (!loaded) {
    return (
      <div className="min-h-[calc(100vh-96px)] px-6 py-20 flex items-center justify-center">
        <p className="text-slate-600">분석 결과를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-96px)] px-6 py-20">
      <div id="printable-result" className="max-w-7xl mx-auto space-y-10 print-wide">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/40 print-avoid-pagebreak">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-container">AI 분석 결과</p>
              <h1 className="text-4xl font-extrabold text-slate-900">계약서 핵심 내용을 한눈에 정리했습니다.</h1>
              <p className="text-slate-600 max-w-2xl mt-2">
                수정한 텍스트를 바탕으로 AI가 계약서의 주요 정보를 정리했습니다.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row no-print">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-2 rounded-3xl bg-primary-container px-6 py-4 text-white font-semibold shadow-lg shadow-blue-500/15 hover:bg-blue-700 transition"
              >
                <Download className="h-5 w-5" /> PDF로 저장하기
              </button>
              <button
                type="button"
                onClick={() => navigate('/upload')}
                className="inline-flex items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-6 py-4 text-slate-700 font-semibold hover:border-primary-container hover:text-primary-container transition"
              >
                <RotateCcw className="h-5 w-5" /> 다시 업로드하기
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/40 print-avoid-pagebreak"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">핵심 정보</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {analysis.info.map((item) => (
                <div key={item.label} className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/40 print-avoid-pagebreak">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">주요 조항 요약</h2>
              <ul className="space-y-4 text-slate-600">
                {analysis.clauses.map((line) => (
                  <li key={line} className="rounded-3xl bg-slate-50 p-4">{line}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/40 print-avoid-pagebreak">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">계약 전 체크리스트</h2>
              <ul className="space-y-3 text-slate-600">
                {analysis.checks.map((check) => (
                  <li key={check} className="flex items-start gap-3 rounded-3xl bg-slate-50 p-4">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary-container" />
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/40 print-avoid-pagebreak"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-4">주의 포인트</h2>
            <ul className="space-y-4 text-slate-600">
              {analysis.cautions.map((item) => (
                <li key={item} className="rounded-3xl bg-amber-50 p-4 text-amber-900">{item}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/40 print-avoid-pagebreak"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-4">중개사/임대인에게 물어볼 질문 리스트</h2>
            <ul className="space-y-4 text-slate-600">
              {analysis.questions.map((question) => (
                <li key={question} className="rounded-3xl bg-slate-50 p-4">{question}</li>
              ))}
            </ul>
          </motion.div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/40 print-avoid-pagebreak">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">분석 요약</h2>
          <p className="text-slate-600 whitespace-pre-line">{analysis.contractText}</p>
        </section>
      </div>
    </div>
  );
}
