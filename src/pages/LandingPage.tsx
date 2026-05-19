import { Link } from 'react-router-dom';
import { ArrowRight, FileText, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function LandingPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.3fr_0.7fr] items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-container mb-4">
              전월세 계약서 AI 체크
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              전월세 계약서, 계약 전에 AI로 빠르게 체크하세요.
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mb-8">
              보증금, 월세, 관리비, 특약, 수리 책임 등 놓치기 쉬운 내용을 정리해드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/upload"
                className="inline-flex items-center justify-center rounded-2xl bg-primary-container px-8 py-4 text-white font-semibold shadow-lg shadow-blue-500/15 hover:bg-blue-700 transition"
              >
                계약서 업로드하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/review"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-4 text-slate-700 font-semibold hover:border-primary-container hover:text-primary-container transition"
              >
                텍스트 확인으로 이동
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] bg-white p-10 shadow-2xl shadow-slate-200/70 border border-slate-100"
          >
            <div className="mb-6 rounded-3xl border border-slate-200 bg-blue-50 p-6">
              <FileText className="w-10 h-10 text-primary-container mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">한 번에 끝내는 3단계</h2>
              <p className="text-slate-600">계약서 업로드부터 AI 체크 결과까지 한 번에 진행하세요.</p>
            </div>
            <div className="space-y-4">
              {[
                '계약서 업로드',
                '추출된 텍스트 확인 및 수정',
                'AI 체크 결과 확인',
              ].map((step, index) => (
                <div key={step} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-container/10 text-primary-container font-bold">
                      {index + 1}
                    </div>
                    <p className="font-semibold">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto rounded-[2rem] bg-white p-10 shadow-xl shadow-slate-200/60 border border-slate-100">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">AI 분석으로 놓치기 쉬운 조항을 빠르게 확인</h2>
              <p className="text-slate-600">계약서 핵심 정보와 위험 포인트를 쉽고 깔끔하게 정리합니다.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: '보증금', value: '확인', color: 'bg-blue-50 text-blue-700' },
                { label: '계약 기간', value: '확인', color: 'bg-slate-50 text-slate-800' },
                { label: '관리비', value: '확인', color: 'bg-amber-50 text-amber-700' },
                { label: '질문 리스트', value: '생성', color: 'bg-slate-50 text-slate-800' },
              ].map((item) => (
                <div key={item.label} className={`rounded-3xl border border-slate-200 p-5 ${item.color}`}>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="mt-1 text-lg font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
