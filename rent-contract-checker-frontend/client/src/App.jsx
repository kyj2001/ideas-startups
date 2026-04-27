import { useState } from 'react';
import Header from './components/Header.jsx';
import BottomNav from './components/BottomNav.jsx';
import Home from './pages/Home.jsx';
import UploadPage from './pages/UploadPage.jsx';
import ResultPage from './pages/ResultPage.jsx';
import LoadingBox from './components/LoadingBox.jsx';
import { analyzeContract } from './services/api.js';

export default function App() {
  const [view, setView] = useState('home');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function startAnalysis(contractText) {
    if (!contractText.trim()) {
      alert('계약서 텍스트를 입력하거나 PDF에서 추출해 주세요.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setView('loading');

    try {
      const response = await analyzeContract(contractText);
      setResult(response.data);
      setView('result');
    } catch (error) {
      setErrorMessage(error.message || 'AI 분석 중 오류가 발생했습니다.');
      setView('upload');
    } finally {
      setLoading(false);
    }
  }

  function navigate(nextView) {
    if (nextView === 'result' && !result) {
      setView('upload');
      return;
    }

    setView(nextView);
  }

  return (
    <div className="app-shell">
      <Header currentView={view} onNavigate={navigate} />
      {view === 'home' && <Home onStart={() => setView('upload')} />}
      {view === 'upload' && (
        <UploadPage
          onStartAnalysis={startAnalysis}
          loading={loading}
          errorMessage={errorMessage}
        />
      )}
      {view === 'loading' && <LoadingBox />}
      {view === 'result' && <ResultPage result={result} onRestart={() => setView('upload')} />}
      <BottomNav currentView={view} onNavigate={navigate} />
    </div>
  );
}
