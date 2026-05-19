/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout.tsx';
import LandingPage from './pages/LandingPage.tsx';
import UploadPage from './pages/UploadPage.tsx';
import TextReviewPage from './pages/TextReviewPage.tsx';
import ResultPage from './pages/ResultPage.tsx';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/review" element={<TextReviewPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

