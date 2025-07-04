import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import BrandBuilder from './pages/BrandBuilder';
import ContentCalendar from './pages/ContentCalendar';
import PostGenerator from './pages/PostGenerator';
import TemplateGallery from './pages/TemplateGallery';
import ContentVault from './pages/ContentVault';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#ffffff',
              color: '#374151',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="brand-builder" element={<BrandBuilder />} />
            <Route path="content-calendar" element={<ContentCalendar />} />
            <Route path="post-generator" element={<PostGenerator />} />
            <Route path="template-gallery" element={<TemplateGallery />} />
            <Route path="content-vault" element={<ContentVault />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;