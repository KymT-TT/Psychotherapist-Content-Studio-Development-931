import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Button from './UI/Button'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import toast from 'react-hot-toast'

const { FiLock, FiEye, FiEyeOff, FiSparkles, FiCheck } = FiIcons

const PasswordGate = ({ onAccessGranted }) => {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)

  // Password can be configured here - in future this could come from env or API
  const CORRECT_PASSWORD = 'CLARITY2025'
  const MAX_ATTEMPTS = 5

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (password === CORRECT_PASSWORD) {
      toast.success('✅ Access granted! Welcome to Clarity Content Studio')
      onAccessGranted()
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      
      if (newAttempts >= MAX_ATTEMPTS) {
        toast.error('🚫 Too many failed attempts. Please contact support.')
      } else {
        toast.error(`❌ Invalid passcode. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`)
      }
      
      setPassword('')
    }

    setIsLoading(false)
  }

  const isBlocked = attempts >= MAX_ATTEMPTS

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
      <div className="w-full max-w-sm mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-3"
            >
              <SafeIcon icon={FiSparkles} className="w-6 h-6 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl font-bold text-gray-900 mb-2"
            >
              Clarity Content Studio
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm text-gray-600 leading-relaxed"
            >
              Access restricted. Please enter your client passcode to continue.
            </motion.p>
          </div>

          {/* Access Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Client Passcode
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value.toUpperCase())}
                  placeholder="Enter your passcode"
                  disabled={isBlocked}
                  className={`
                    w-full px-4 py-3 pl-11 pr-11 rounded-xl border text-sm transition-all duration-200
                    ${isBlocked 
                      ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed' 
                      : 'bg-white border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
                    }
                  `}
                  autoComplete="off"
                  spellCheck="false"
                />
                
                {/* Lock Icon */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <SafeIcon 
                    icon={FiLock} 
                    className={`w-4 h-4 ${isBlocked ? 'text-gray-400' : 'text-gray-400'}`} 
                  />
                </div>
                
                {/* Show/Hide Password Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isBlocked}
                  className={`
                    absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors
                    ${isBlocked 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-400 hover:text-gray-600'
                    }
                  `}
                >
                  <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Attempts Warning */}
            {attempts > 0 && attempts < MAX_ATTEMPTS && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-yellow-50 border border-yellow-200 rounded-lg p-3"
              >
                <p className="text-xs text-yellow-800">
                  ⚠️ {attempts} failed attempt{attempts > 1 ? 's' : ''}. 
                  {' '}{MAX_ATTEMPTS - attempts} remaining.
                </p>
              </motion.div>
            )}

            {/* Blocked Message */}
            {isBlocked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-200 rounded-lg p-3"
              >
                <div className="flex items-start space-x-2">
                  <SafeIcon icon={FiLock} className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-red-800">Access Blocked</p>
                    <p className="text-xs text-red-700 mt-1">
                      Too many failed attempts. Please contact support.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!password || isBlocked}
              loading={isLoading}
              className="w-full"
              size="md"
              icon={isLoading ? undefined : FiCheck}
            >
              {isLoading ? 'Verifying...' : 'Access Studio'}
            </Button>
          </motion.form>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6 text-center"
          >
            <p className="text-xs text-gray-500 mb-1">
              Secure access for authorized users only
            </p>
            <div className="flex items-center justify-center space-x-1">
              <SafeIcon icon={FiLock} className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">Protected by Clarity Security</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default PasswordGate