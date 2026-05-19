import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Scan, BrainCircuit, CheckCircle2, ListFilter, Cpu } from 'lucide-react';

export default function AnalysisPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Scan, text: "계약서를 읽고 있습니다..." },
    { icon: BrainCircuit, text: "독소 조항을 분석 중입니다..." },
    { icon: ListFilter, text: "나만의 체크리스트를 만들고 있습니다." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => navigate('/dashboard'), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [navigate]);

  useEffect(() => {
    if (progress > 30 && progress < 70) setCurrentStep(1);
    else if (progress >= 70) setCurrentStep(2);
  }, [progress]);

  return (
    <div className="min-h-[calc(100vh-128px)] flex flex-col items-center justify-center relative overflow-hidden bg-surface">
      {/* Background Simulation */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none p-12 overflow-hidden flex flex-col gap-4 font-mono text-xs select-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} className="whitespace-nowrap transform -rotate-1">
            제 {i + 1} 조 (목적) 본 계약은 임대인과 임차인 쌍방 간에 다음 기재 부동산에 관하여 임대차 계약을 체결함에 있어 각자의 권리와 의무를 명확히 규정함을 목적으로 한다...
          </p>
        ))}
      </div>

      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white rounded-3xl p-12 shadow-2xl shadow-blue-900/10 border border-slate-100 flex flex-col items-center relative z-10"
      >
        <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="64" cy="64" r="60" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-slate-100" />
            <circle 
              cx="64" cy="64" r="60" fill="transparent" stroke="currentColor" strokeWidth="8" 
              className="text-primary-container transition-all duration-300 ease-out" 
              strokeDasharray={377}
              strokeDashoffset={377 - (377 * progress) / 100}
              strokeLinecap="round"
            />
          </svg>
          <div className="w-20 h-20 bg-primary-container/10 rounded-3xl flex items-center justify-center">
            <Cpu className="w-10 h-10 text-primary-container" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-slate-900 mb-2">AI 분석 진행 중</h1>
        <p className="text-slate-500 text-center mb-12">
          전문가 수준의 안전한 계약 검토를 위해<br />꼼꼼하게 확인하고 있습니다.
        </p>

        <div className="w-full space-y-6">
          {steps.map((step, i) => (
            <div key={i} className={`flex items-center gap-5 transition-opacity duration-500 ${i > currentStep ? 'opacity-30' : 'opacity-100'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${i < currentStep ? 'bg-primary-container text-white' : i === currentStep ? 'bg-primary-container/10 text-primary-container animate-pulse' : 'bg-slate-50 text-slate-300 border border-slate-100'}`}>
                {i < currentStep ? <CheckCircle2 className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
              </div>
              <span className={`text-sm font-bold ${i === currentStep ? 'text-primary' : 'text-slate-500'}`}>{step.text}</span>
            </div>
          ))}
        </div>

        <div className="w-full mt-12">
          <div className="flex justify-between items-end mb-3">
            <span className="text-[10px] font-black text-primary-container tracking-widest uppercase">Analyzing...</span>
            <span className="text-lg font-black text-slate-900">{progress}%</span>
          </div>
          <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
            <motion.div 
              className="h-full bg-primary-container rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
