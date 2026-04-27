import { useState } from 'react';
import { LockKeyhole, PencilLine } from 'lucide-react';
import FileUpload from '../components/FileUpload.jsx';
import TextReviewBox from '../components/TextReviewBox.jsx';
import { uploadContractFile } from '../services/api.js';

export default function UploadPage({ onStartAnalysis, loading, errorMessage }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [contractText, setContractText] = useState('');
  const [message, setMessage] = useState('');
  const [extracting, setExtracting] = useState(false);

  async function handleExtractText() {
    if (!selectedFile) return;

    setExtracting(true);
    setMessage('');

    try {
      const result = await uploadContractFile(selectedFile);
      setContractText(result.text || '');
      setMessage(result.message || '텍스트 추출이 완료되었습니다.');
    } catch (error) {
      setMessage(error.message || '텍스트 추출 중 오류가 발생했습니다.');
    } finally {
      setExtracting(false);
    }
  }

  return (
    <main className="page upload-page">
      <section className="upload-title">
        <h1>계약서를 업로드하세요</h1>
        <p>PDF에서 텍스트를 추출한 뒤, 내용을 확인하고 AI 분석을 시작할 수 있습니다.</p>
      </section>

      <FileUpload
        selectedFile={selectedFile}
        onFileChange={setSelectedFile}
        onExtractText={handleExtractText}
      />

      <section className="notice-card">
        <LockKeyhole size={20} />
        <p>
          계약서에는 개인정보가 포함될 수 있습니다. MVP 테스트에서는 실제 계약서보다
          개인정보를 가린 샘플 사용을 권장합니다.
        </p>
      </section>

      {extracting && <div className="inline-loading">텍스트를 추출하는 중입니다...</div>}
      {message && <div className="message-box"><PencilLine size={18} /> {message}</div>}
      {errorMessage && <div className="message-box"><PencilLine size={18} /> {errorMessage}</div>}

      <TextReviewBox
        value={contractText}
        onChange={setContractText}
        onAnalyze={() => onStartAnalysis(contractText)}
        loading={loading}
      />
    </main>
  );
}
