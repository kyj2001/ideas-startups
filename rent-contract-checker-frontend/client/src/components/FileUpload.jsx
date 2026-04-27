import { FileUp, UploadCloud } from 'lucide-react';

export default function FileUpload({ selectedFile, onFileChange, onExtractText }) {
  function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) onFileChange(file);
  }

  return (
    <section className="upload-panel">
      <div
        className="drop-zone"
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="drop-icon"><FileUp size={34} /></div>
        <h2>파일을 이곳으로 끌어오세요</h2>
        <p>PDF를 우선 지원하며 JPG, PNG는 안내 메시지를 보여줍니다.</p>
        <label className="secondary-button file-label">
          <UploadCloud size={18} />
          파일 선택
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(event) => onFileChange(event.target.files?.[0] || null)}
          />
        </label>
      </div>

      <div className="file-meta">
        <span>선택한 파일</span>
        <strong>{selectedFile ? selectedFile.name : '아직 선택한 파일이 없습니다.'}</strong>
      </div>

      <button className="primary-button full" onClick={onExtractText} disabled={!selectedFile}>
        텍스트 추출하기
      </button>
    </section>
  );
}
