import React from 'react';
import { motion } from 'motion/react';
import { 
  FolderOpen, User, Edit3, Globe, Trash2, 
  ChevronRight, FileText, CheckCircle2, Clock
} from 'lucide-react';

export default function MyPage() {
  const history = [
    { name: "신림동 원룸 임대차계약서", date: "Oct 24, 2024", status: "Paid", icon: FileText, color: "bg-blue-100 text-primary-container" },
    { name: "강남역 오피스텔 (디오빌)", date: "Sep 15, 2024", status: "Paid", icon: FileText, color: "bg-blue-100 text-primary-container" },
    { name: "마포구 연남동 상가", date: "Draft saved on Aug 02, 2024", status: "Pending Payment", icon: Clock, color: "bg-slate-100 text-slate-400" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-2">My Page</h1>
        <p className="text-lg text-slate-500 font-medium">Manage your account and view your contract analysis history.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* History List */}
        <div className="lg:col-span-8 space-y-6">
          <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-6">
              <FolderOpen className="w-6 h-6 text-primary-container fill-primary-container/10" />
              <h2 className="text-xl font-black text-slate-900">Saved Analyses</h2>
            </div>

            <div className="space-y-2">
              {history.map((item, i) => (
                <div key={i} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center shrink-0`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 group-hover:text-primary-container transition-colors">{item.name}</p>
                      <p className="text-xs font-semibold text-slate-400 mt-1">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${item.status === 'Paid' ? 'bg-blue-50 text-primary-container' : 'bg-slate-100 text-slate-400'}`}>
                      {item.status === 'Paid' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {item.status}
                    </span>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary-container group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Profile and Settings */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-blue-50 mb-6 flex items-center justify-center border-4 border-white shadow-inner">
              <User className="w-10 h-10 text-primary-container" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-1">Kim Min-su</h3>
            <p className="text-sm font-bold text-slate-400 mb-8">minsu.kim@example.com</p>
            <button className="w-full bg-primary-container text-white font-bold py-4 px-6 rounded-2xl hover:bg-primary transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          </section>

          <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 mb-6 uppercase tracking-widest border-b border-slate-100 pb-4">Preferences</h3>
            <div className="flex justify-between items-center group">
              <div>
                <p className="font-bold text-slate-900 group-hover:text-primary-container transition-colors">Language</p>
                <p className="text-xs font-semibold text-slate-400">Interface language</p>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button className="px-4 py-2 rounded-lg text-[10px] font-black bg-white text-primary-container shadow-sm">EN</button>
                <button className="px-4 py-2 rounded-lg text-[10px] font-black text-slate-400 hover:text-slate-600 transition-colors">KO</button>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 mb-6 uppercase tracking-widest border-b border-slate-100 pb-4">Account</h3>
            <button className="w-full text-left font-bold text-sm text-error hover:opacity-80 transition-opacity flex items-center justify-between group">
              <span>Delete Account</span>
              <Trash2 className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
