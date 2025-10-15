import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import PasswordGate from './components/PasswordGate'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import BrandBuilder from './pages/BrandBuilder'
import PostGenerator from './pages/PostGenerator'
import TemplateGallery from './pages/TemplateGallery'
import ContentVault from './pages/ContentVault'
import CanvaCallback from './pages/CanvaCallback'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('clarity_authenticated')
      const authTimestamp = localStorage.getItem('clarity_auth_timestamp')
      if (authStatus === 'true' && authTimestamp) {
        const now = Date.now()
        const authTime = parseInt(authTimestamp)
        const twentyFourHours = 24 * 60 * 60 * 1000
        if (now - authTime < twentyFourHours) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem('clarity_authenticated')
          localStorage.removeItem('clarity_auth_timestamp')
        }
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const handleAccessGranted = () => {
    setIsAuthenticated(true)
    localStorage.setItem('clarity_authenticated', 'true')
    localStorage.setItem('clarity_auth_timestamp', Date.now().toString())
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Clarity Content Studio...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <>
        <Toaster
          position="top-center"
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
        <PasswordGate onAccessGranted={handleAccessGranted} />
      </>
    )
  }

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
          <Route path="/canva-callback" element={<CanvaCallback />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="brand-builder" element={<BrandBuilder />} />
            <Route path="post-generator" element={<PostGenerator />} />
            <Route path="template-gallery" element={<TemplateGallery />} />
            <Route path="content-vault" element={<ContentVault />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App