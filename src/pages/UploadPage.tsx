import { useState } from 'react';
import { Upload, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { uploadContractFile } from '../lib/api.ts';

export default function UploadPage() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    setSelectedFile(file);
    setPaymentError('');
  };

  const openPaymentModal = () => {
    if (!selectedFile) return;
    setShowPaymentModal(true);
  };

  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
  };

  const handlePaymentConfirm = async () => {
    if (!selectedFile) return;

    setPaymentProcessing(true);
    setPaymentError('');

    try {
      const uploadResult = await uploadContractFile(selectedFile);
      sessionStorage.setItem('contractText', uploadResult.contractText);
      sessionStorage.setItem('contractFileName', uploadResult.fileName);
      setShowPaymentModal(false);
      navigate('/review');
    } catch (error) {
      setPaymentError('파일 업로드 또는 추출 중 문제가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setPaymentProcessing(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-96px)] px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-container mb-3">계약서 업로드</p>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">계약서 PDF 또는 사진을 업로드해주세요.</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            업로드한 계약서는 AI 분석을 위한 용도로만 사용됩니다.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] border border-slate-200 p-10 shadow-xl shadow-slate-200/50"
        >
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              const file = event.dataTransfer.files?.[0] ?? null;
              handleFileChange(file);
            }}
            onClick={() => document.getElementById('contract-file')?.click()}
            className={`cursor-pointer rounded-3xl border-2 border-dashed p-16 text-center transition ${
              dragging ? 'border-primary-container bg-blue-50' : 'border-slate-200 bg-slate-50 hover:border-primary-container'
            }`}
          >
            <input
              id="contract-file"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(event) => handleFileChange(event.target.files?.[0] ?? null)}
            />
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-primary-container/10 text-primary-container">
              <Upload className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">파일을 클릭하거나 드래그해서 추가하세요</h2>
            <p className="text-sm text-slate-500">PDF, JPG, PNG 지원 (최대 50MB)</p>
            {selectedFile && <p className="mt-4 text-sm text-slate-600">선택된 파일: {selectedFile.name}</p>}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-[1fr_auto] items-center">
            <div className="rounded-3xl border border-amber-100 bg-amber-50/70 p-5 text-sm text-amber-800">
              계약서 업로드 후 다음 단계에서 추출된 텍스트를 확인하고 수정할 수 있습니다.
            </div>
            <button
              type="button"
              disabled={!selectedFile}
              onClick={openPaymentModal}
              className={`inline-flex items-center justify-center rounded-3xl px-8 py-4 text-base font-semibold transition ${
                selectedFile
                  ? 'bg-primary-container text-white shadow-lg shadow-blue-500/15 hover:bg-blue-700'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              다음 단계로 이동
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>

          {paymentError && <p className="mt-4 text-sm text-error">{paymentError}</p>}
        </motion.div>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-[2rem] bg-white p-8 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-900">결제하기</h2>
              <p className="text-slate-500 mt-2">계약서 분석 비용 2,900원을 결제하시면 다음 단계로 이동합니다.</p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 mb-8">
              <p className="text-sm text-slate-500">분석 대상 계약서</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{selectedFile?.name ?? '선택된 파일 없음'}</p>
              <p className="mt-4 text-sm font-semibold text-slate-700">분석 비용</p>
              <p className="text-3xl font-black text-primary-container">2,900원</p>
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePaymentCancel}
                disabled={paymentProcessing}
                className="inline-flex h-14 flex-1 items-center justify-center rounded-3xl border border-slate-200 bg-white text-slate-700 font-semibold transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handlePaymentConfirm}
                disabled={paymentProcessing}
                className="inline-flex h-14 flex-1 items-center justify-center rounded-3xl bg-primary-container text-white font-semibold shadow-lg shadow-blue-500/15 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {paymentProcessing ? '결제 중...' : '결제하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
