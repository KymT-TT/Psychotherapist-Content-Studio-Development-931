import React, { useState } from 'react'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import Button from '../UI/Button'
import SettingsModal from '../Settings/SettingsModal'
import TutorialModal from '../Tutorials/TutorialModal'
import AIForDummiesModal from '../Tutorials/AIForDummiesModal'
import toast from 'react-hot-toast'

const { FiUser, FiSettings, FiLogOut, FiHelpCircle, FiSmile } = FiIcons

const Header = () => {
  const [showSettings, setShowSettings] = useState(false)
  const [showTutorials, setShowTutorials] = useState(false)
  const [showAIForDummies, setShowAIForDummies] = useState(false)

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem('clarity_authenticated')
    localStorage.removeItem('clarity_auth_timestamp')
    
    // Show success message and reload to trigger password gate
    toast.success('🔐 Logged out successfully')
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="lg:block">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              Welcome back, Therapist!
            </h2>
            <p className="text-gray-600 text-sm lg:text-base hidden sm:block">
              Let's create some amazing content today
            </p>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowAIForDummies(true)}
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
              icon={FiSmile}
            >
              <span className="hidden sm:inline">AI for Beginners</span>
              <span className="sm:hidden">AI Help</span>
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiUser} className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-900">
                  Your Practice
                </p>
                <p className="text-xs text-gray-500">Content Creator</p>
              </div>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => setShowTutorials(true)}
                className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                title="Help & Tutorials"
              >
                <SafeIcon icon={FiHelpCircle} className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                title="Settings"
              >
                <SafeIcon icon={FiSettings} className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                icon={FiLogOut}
                className="text-gray-600 hover:text-red-600 hover:bg-red-50"
              >
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      {/* Tutorials Modal */}
      <TutorialModal
        isOpen={showTutorials}
        onClose={() => setShowTutorials(false)}
      />
      
      {/* AI For Dummies Modal */}
      <AIForDummiesModal
        isOpen={showAIForDummies}
        onClose={() => setShowAIForDummies(false)}
      />
    </>
  )
}

export default Header