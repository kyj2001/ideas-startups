import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Lock, XCircle, CreditCard, Wallet, Apple } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      title: "맛보기 분석",
      subtitle: "Essential risk overview",
      price: "Free",
      features: [
        { text: "Basic contract scanning", included: true },
        { text: "High-level risk score", included: true },
        { text: "Detailed clause breakdown", included: false }
      ],
      button: "Start Free",
      color: "bg-slate-100 text-slate-600"
    },
    {
      title: "1회 분석권",
      subtitle: "Deep dive for a single contract",
      price: "₩2,900",
      unit: "/ report",
      features: [
        { text: "Comprehensive AI analysis", included: true },
        { text: "Detailed risk clause breakdown", included: true },
        { text: "Downloadable PDF report", included: true }
      ],
      button: "Buy 1-Time Pass",
      color: "bg-primary-container text-white",
      highlight: true
    },
    {
      title: "7일 무제한 패스",
      subtitle: "Perfect for active house hunters",
      price: "₩5,900",
      unit: "/ 7 days",
      features: [
        { text: "Unlimited contract scans", included: true },
        { text: "All features from 1-Time Pass", included: true },
        { text: "Priority analysis queue", included: true }
      ],
      button: "Get Unlimited Access",
      color: "bg-primary-container text-white shadow-xl shadow-blue-500/20",
      bestValue: true
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Choose Your Protection</h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Select the plan that fits your needs. Transparent pricing, no hidden fees. All plans include our core AI analysis engine to secure your real estate contracts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {plans.map((plan, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex flex-col bg-white rounded-3xl p-8 border ${plan.bestValue ? 'border-primary-container ring-1 ring-primary-container/20 shadow-2xl relative scale-105 z-10' : 'border-slate-100 shadow-sm'} hover-lift`}
          >
            {plan.bestValue && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-error text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">BEST VALUE</span>
            )}
            
            <div className="mb-10 flex-grow">
              <h3 className="text-2xl font-black text-slate-900 mb-1">{plan.title}</h3>
              <p className="text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">{plan.subtitle}</p>
              
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                {plan.unit && <span className="text-sm font-bold text-slate-400">{plan.unit}</span>}
              </div>

              <ul className="space-y-4">
                {plan.features.map((f, j) => (
                  <li key={j} className={`flex items-start gap-3 text-sm font-medium ${f.included ? 'text-slate-600' : 'text-slate-300'}`}>
                    {f.included ? (
                      <CheckCircle2 className="w-5 h-5 text-primary-container shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-slate-200 shrink-0" />
                    )}
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>

            <button className={`w-full py-4 rounded-xl font-bold transition-all active:scale-95 ${plan.color}`}>
              {plan.button}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="pt-16 border-t border-slate-100 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-10 text-slate-400 group">
          <Lock className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Secure Checkout</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-10 items-center opacity-40 hover:opacity-100 transition-opacity">
          {[
            { icon: Wallet, label: "Toss", color: "text-blue-500" },
            { icon: Apple, label: "KakaoPay", color: "text-amber-400" },
            { icon: CreditCard, label: "Credit Card", color: "text-slate-800" }
          ].map((method) => (
            <div key={method.label} className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-pointer">
              <method.icon className={`w-8 h-8 ${method.color}`} />
              <span className="text-xl font-black text-slate-900">{method.label}</span>
            </div>
          ))}
        </div>
        
        <p className="mt-12 text-sm text-slate-400 font-medium text-center max-w-xl leading-relaxed">
          Transactions are encrypted and secured. By proceeding, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
