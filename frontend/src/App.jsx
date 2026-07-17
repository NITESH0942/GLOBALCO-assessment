import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';
import JobListingPage from './pages/JobListingPage';
import JobDetailPage from './pages/JobDetailPage';
import PostJobPage from './pages/PostJobPage';
import ApplyPage from './pages/ApplyPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyApplicationsPage from './pages/MyApplicationsPage';
import { useState } from 'react';

function App() {
  const [toast, setToast] = useState({ message: '', type: '' });
  
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };
  
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<JobListingPage showToast={showToast} />} />
            <Route path="/login" element={<LoginPage showToast={showToast} />} />
            <Route path="/register" element={<RegisterPage showToast={showToast} />} />
            <Route path="/my-applications" element={<MyApplicationsPage showToast={showToast} />} />
            <Route path="/jobs/new" element={<PostJobPage showToast={showToast} />} />
            <Route path="/jobs/:id" element={<JobDetailPage showToast={showToast} />} />
            <Route path="/jobs/:id/apply" element={<ApplyPage showToast={showToast} />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
      {toast.message && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default App;
