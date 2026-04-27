import { FileText, Menu, Share2, UserCircle } from 'lucide-react';

export default function Header({ currentView, onNavigate }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="icon-button" aria-label="메뉴">
          <Menu size={22} />
        </button>
        <button className="brand" onClick={() => onNavigate('home')}>
          <FileText size={20} />
          <span>전월세 계약서 AI 체크</span>
        </button>
      </div>
      <div className="topbar-actions">
        {currentView === 'result' && (
          <button className="icon-button" aria-label="공유">
            <Share2 size={20} />
          </button>
        )}
        <button className="icon-button" aria-label="사용자">
          <UserCircle size={22} />
        </button>
      </div>
    </header>
  );
}
