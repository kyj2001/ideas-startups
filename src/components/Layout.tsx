import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const TopNavBar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm h-16">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <Link to="/" className="text-xl font-black tracking-tight text-slate-900">
          ZipKim
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className={`${isActive('/') ? 'text-primary-container' : 'text-slate-600 hover:text-primary-container'} transition-colors`}
          >
            홈
          </Link>
          <Link
            to="/upload"
            className={`${isActive('/upload') ? 'text-primary-container' : 'text-slate-600 hover:text-primary-container'} transition-colors`}
          >
            계약서 업로드
          </Link>
          <Link
            to="/review"
            className={`${isActive('/review') ? 'text-primary-container' : 'text-slate-600 hover:text-primary-container'} transition-colors hidden md:inline-flex`}
          >
            텍스트 확인
          </Link>
        </nav>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => (
  <footer className="bg-slate-50 border-t border-slate-200 py-8 px-6 mt-auto">
    <div className="max-w-7xl mx-auto text-center text-sm text-slate-500">
      © 2026 ZipKim. 계약서 AI 체크를 위한 서비스이며, 법적 자문을 대신하지 않습니다.
    </div>
  </footer>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-slate-50">
    <TopNavBar />
    <main className="flex-grow pt-16">
      {children}
    </main>
    <Footer />
  </div>
);
