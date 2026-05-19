import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, TrendingDown, Users, FileText, 
  Wallet, BarChart3, Download, Calendar, 
  MoreVertical, CheckCircle2, AlertTriangle, MessageSquare, Star
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: "Total Uploads", value: "12,482", change: "+14.2%", up: true, icon: FileText },
    { label: "Successful Analyses", value: "11,940", change: "+8.1%", up: true, icon: CheckCircle2 },
    { label: "Total Payments", value: "₩ 84.2M", change: "+22.4%", up: true, icon: Wallet },
    { label: "Conversion Rate", value: "68.5%", change: "0.0%", up: null, icon: BarChart3 }
  ];

  const logs = [
    { user: "Jiwon Kim", initial: "JK", date: "Oct 24, 2024", type: "Jeonse Agreement", risk: "2 High", riskColor: "bg-error-container text-error" },
    { user: "Seoyeon Han", initial: "SH", date: "Oct 24, 2024", type: "Monthly Rent", risk: "0 Risks", riskColor: "bg-blue-50 text-primary-container" },
    { user: "Minjun Lee", initial: "ML", date: "Oct 23, 2024", type: "Commercial Lease", risk: "1 Med", riskColor: "bg-amber-100 text-amber-600" },
    { user: "Yujin Park", initial: "YP", date: "Oct 23, 2024", type: "Jeonse Agreement", risk: "0 Risks", riskColor: "bg-blue-50 text-primary-container" },
    { user: "Donghyun Kang", initial: "DK", date: "Oct 22, 2024", type: "Monthly Rent", risk: "3 High", riskColor: "bg-error-container text-error" }
  ];

  const feedback = [
    { user: "S. Cho", time: "2h ago", stars: 5, text: "The risk analysis caught a missing special clause that my realtor completely overlooked. Absolutely worth the fee for the peace of mind." },
    { user: "H. Lim", time: "1d ago", stars: 4, text: "Very fast processing. The PDF output is clean and easy to understand, even for someone not familiar with legal terms." },
    { user: "J. Bae", time: "2d ago", stars: 5, text: "ZipKim saved me from signing a highly risky Jeonse contract. The dashboard showed exactly why the landlord's trust status was a red flag." }
  ];

  return (
    <div className="flex bg-slate-50 min-h-[calc(100vh-128px)]">
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 mb-2">Admin Overview</h1>
            <p className="text-lg text-slate-500 font-medium">System performance and recent activity across ZipKim.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-sm shadow-sm hover:bg-slate-50 transition-all">
              <Calendar className="w-4 h-4" />
              Last 30 Days
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-primary-container text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-500/20 hover:bg-primary transition-all">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover-lift flex flex-col justify-between h-[200px]"
            >
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-black uppercase tracking-widest">{stat.label}</span>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary-container" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900 mb-2">{stat.value}</div>
                <div className="flex items-center gap-1.5">
                  {stat.up !== null && (
                    <>
                      {stat.up ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : <TrendingDown className="w-4 h-4 text-error" />}
                      <span className={`text-sm font-black ${stat.up ? 'text-emerald-500' : 'text-error'}`}>{stat.change}</span>
                    </>
                  )}
                  {stat.up === null && <span className="text-sm font-black text-slate-400">0.0%</span>}
                  <span className="text-xs font-bold text-slate-300 ml-1">vs last month</span>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Logs Table */}
          <section className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="text-xl font-black text-slate-900">Recent Analysis Logs</h2>
              <button className="text-primary-container font-bold text-sm hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="text-[10px] font-black text-slate-400 uppercase tracking-widest py-4 px-8">User</th>
                    <th className="text-[10px] font-black text-slate-400 uppercase tracking-widest py-4 px-8">Date</th>
                    <th className="text-[10px] font-black text-slate-400 uppercase tracking-widest py-4 px-8">Contract Type</th>
                    <th className="text-[10px] font-black text-slate-400 uppercase tracking-widest py-4 px-8 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-bold text-slate-900 divide-y divide-slate-50">
                  {logs.map((log, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-5 px-8">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary-container font-black text-xs">{log.initial}</div>
                          <span>{log.user}</span>
                        </div>
                      </td>
                      <td className="py-5 px-8 text-slate-400 font-semibold">{log.date}</td>
                      <td className="py-5 px-8">
                        <div className="flex flex-col gap-1.5">
                          <span>{log.type}</span>
                          <span className={`inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${log.riskColor}`}>
                            <AlertTriangle className="w-3 h-3" /> {log.risk}
                          </span>
                        </div>
                      </td>
                      <td className="py-5 px-8 text-right">
                        <button className="text-slate-300 hover:text-primary-container transition-colors p-2">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Feedback Section */}
          <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-slate-900">User Feedback</h2>
              <MessageSquare className="w-6 h-6 text-slate-400" />
            </div>
            <div className="flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
              {feedback.map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-blue-100 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{item.user}</span>
                      <span className="text-[10px] font-bold text-slate-300 uppercase">{item.time}</span>
                    </div>
                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className={`w-3.5 h-3.5 ${s < item.stars ? 'fill-amber-400' : 'text-slate-200'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">
                    "{item.text}"
                  </p>
                </div>
              ))}
            </div>
            <button className="mt-10 w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all active:scale-95">
              View All Feedback
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
