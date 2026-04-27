import { FileText, Home, Settings } from 'lucide-react';

export default function BottomNav({ currentView, onNavigate }) {
  return (
    <nav className="bottom-nav">
      <button className={currentView === 'home' ? 'active' : ''} onClick={() => onNavigate('home')}>
        <Home size={22} />
        <span>홈</span>
      </button>
      <button className={currentView === 'result' ? 'active' : ''} onClick={() => onNavigate('result')}>
        <FileText size={22} />
        <span>분석 결과</span>
      </button>
      <button>
        <Settings size={22} />
        <span>설정</span>
      </button>
    </nav>
  );
}
