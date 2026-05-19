import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, LayoutDashboard, Wallet, CreditCard, Settings, 
  Download, AlertTriangle, HelpCircle, CheckCircle2, Info, 
  BrainCircuit, ChevronRight, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('Core Info');

  const tabs = ['핵심 정보 (Core Info)', '리스크 포인트 (Risk Points)', '질문 리스트 (Questions)', '체크리스트 (Checklist)', '쉬운 설명 (Easy Explanation)'];

  const risks = [
    {
      level: 'High',
      title: '특약사항 (Special Conditions)',
      original: '"임차인은 계약 만료 전 퇴실 시, 다음 임차인을 구하고 중개수수료를 부담해야 한다."',
      reason: '법적으로 임차인이 다음 세입자를 구해야 할 의무는 없습니다. 묵시적 갱신 후 해지 통보 시 3개월 후 효력이 발생하며, 중개수수료 부담에 대한 부당한 강요일 수 있습니다.',
      suggestion: '"계약 기간 내 부득이하게 퇴실할 경우, 구체적인 위약금이나 수수료 부담 기준을 명확히 수정해 주실 수 있나요?"'
    },
    {
      level: 'Mid',
      title: '관리비 (Maintenance Fee)',
      original: '"월 관리비 10만원 (전기, 가스, 수도 요금 별도)"',
      reason: '관리비에 포함된 내역(인터넷, 청소비 등)이 구체적으로 명시되어 있지 않아 추후 분쟁의 소지가 있습니다.',
      suggestion: null
    }
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col p-6 gap-2 sticky top-16 h-[calc(100vh-64px)]">
        <div className="mb-8 pl-4">
          <h2 className="text-xl font-black text-primary-container">ZipKim Dashboard</h2>
          <p className="text-xs text-slate-400 font-medium">Contract Analysis Service</p>
        </div>
        
        <nav className="flex flex-col gap-1">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-sm font-semibold">Overview</span>
          </Link>
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-primary-container rounded-xl transition-all">
            <FileText className="w-5 h-5 fill-primary-container/10" />
            <span className="text-sm font-bold">Contracts</span>
          </Link>
          <Link to="/pricing" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
            <Wallet className="w-5 h-5" />
            <span className="text-sm font-semibold">Payments</span>
          </Link>
          <div className="mt-auto pt-8">
            <Link to="/mypage" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
              <Settings className="w-5 h-5" />
              <span className="text-sm font-semibold">Admin Settings</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-xs font-semibold">서울특별시 강남구 역삼동 123-45 원룸</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-1">원룸 월세 계약서 분석 결과</h1>
          <p className="text-xs text-slate-400 font-medium tracking-tight uppercase">Analyzed on Oct 24, 2023</p>
        </header>

        {/* Stepper */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-8 flex items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center text-xs font-bold">1</div>
            <span className="text-sm font-bold text-slate-900">Upload</span>
          </div>
          <div className="w-24 h-0.5 bg-primary-container rounded-full" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center text-xs font-bold">2</div>
            <span className="text-sm font-bold text-slate-900">Analysis</span>
          </div>
          <div className="w-24 h-0.5 bg-slate-100 rounded-full" />
          <div className="flex items-center gap-2 opacity-30">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold">3</div>
            <span className="text-sm font-bold text-slate-900">Confirm</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Deposit (보증금)", value: "1,000만원" },
            { label: "Rent (월세)", value: "60만원" },
            { label: "Maintenance (관리비)", value: "10만원" },
            { label: "Period (계약 기간)", value: "24개월" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover-lift">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
              <p className="text-xl font-black text-slate-900 mt-2">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Risk & Questions Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-error-container/50 border border-error/10 p-6 rounded-2xl flex justify-between items-center group">
            <div>
              <div className="flex items-center gap-2 text-error text-[10px] font-black uppercase tracking-widest mb-2">
                <AlertTriangle className="w-4 h-4" /> Risk Points (위험 요소)
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-error">3개</span>
                <span className="text-xs font-bold text-error/60">Require attention</span>
              </div>
            </div>
            <span className="bg-error text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">High Risk</span>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col justify-between hover-lift">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-primary-container text-[10px] font-black uppercase tracking-widest">
                <HelpCircle className="w-4 h-4" /> Questions (질문 리스트)
              </div>
              <span className="text-sm font-black text-slate-900">5개</span>
            </div>
            <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden border border-slate-100">
              <div className="bg-primary-container h-full w-[40%] rounded-full" />
            </div>
            <span className="text-[9px] font-bold text-slate-400 mt-2 text-right uppercase tracking-widest">Checklist Progress</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 mb-8 flex overflow-x-auto gap-8 no-scrollbar">
          {tabs.map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab ? 'text-primary-container border-b-2 border-primary-container' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl font-black text-slate-900">리스크 분석 상세 (Risk Details)</h2>
            <button className="flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors">
              <Download className="w-4 h-4" /> Download Report PDF
            </button>
          </div>

          {risks.map((risk, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white rounded-3xl border-l-[6px] shadow-sm hover-lift p-6 ${risk.level === 'High' ? 'border-l-error' : 'border-l-amber-400'}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${risk.level === 'High' ? 'bg-error-container text-error' : 'bg-amber-100 text-amber-600'}`}>
                  <AlertTriangle className="w-3 h-3" /> {risk.level} Risk
                </span>
                <span className="text-sm font-bold text-slate-400">{risk.title}</span>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Original Text (원문)</h4>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 italic text-sm text-slate-600 leading-relaxed font-medium">
                    {risk.original}
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Why it matters (위험 이유)</h4>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {risk.reason}
                  </p>
                </div>
              </div>

              {risk.suggestion && (
                <div className="mt-6 pt-6 border-t border-slate-100 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <BrainCircuit className="w-5 h-5 text-primary-container" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-primary-container uppercase tracking-widest">Recommended Question (추천 질문)</span>
                    <p className="text-sm font-bold text-slate-900 leading-relaxed">
                      {risk.suggestion}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
