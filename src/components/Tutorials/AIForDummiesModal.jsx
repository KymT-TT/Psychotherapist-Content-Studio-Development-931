import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../UI/Button';
import Card from '../UI/Card';

const {FiX, FiLightbulb, FiCheck, FiChevronRight, FiZap, FiSmile, FiLock, FiInfo, FiThumbsUp} = FiIcons;

const AIForDummiesModal = ({isOpen, onClose}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "How AI Works in This App",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Think of it as your AI Content Assistant 🤖</h3>
            <p className="text-sm text-blue-800">
              This app uses a powerful AI, similar to ChatGPT, to help you create amazing content. It's fully integrated, so you don't need any technical setup.
            </p>
          </div>
          <h4 className="font-medium text-gray-900">What does the AI do?</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-2 mb-1">
                      <SafeIcon icon={FiZap} className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium text-gray-900">Personalizes Content</span>
                  </div>
                  <p className="text-xs text-gray-600">Uses your Brand Foundation to create unique content just for your practice.</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-2 mb-1">
                      <SafeIcon icon={FiLock} className="w-4 h-4 text-green-500" />
                      <span className="font-medium text-gray-900">Saves You Time</span>
                  </div>
                  <p className="text-xs text-gray-600">Generates post ideas, reel scripts, and captions in seconds.</p>
              </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h4 className="font-medium text-green-900 mb-1">The Good News! 🎉</h4>
            <p className="text-sm text-green-800">
              It's all included! You don't need your own AI account or API key. We handle all the technical parts so you can focus on creating.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Using AI Features",
      content: (
        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-4">
            <h3 className="font-semibold text-purple-900 mb-3">Using AI Features: Super Simple! 🧠</h3>
            <p className="text-sm text-purple-800 mb-4">
              Using the AI is as easy as clicking a button:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div className="bg-white p-3 rounded-lg border border-purple-200">
                <h5 className="font-medium text-purple-900 mb-2">Dashboard</h5>
                <p className="text-xs text-purple-800 mb-2">Click "Generate AI Content"</p>
                <div className="text-xs text-gray-600">
                  Creates personalized content ideas based on your brand.
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-purple-200">
                <h5 className="font-medium text-purple-900 mb-2">Post Generator</h5>
                <p className="text-xs text-purple-800 mb-2">Pick format, platform, topic → Generate</p>
                <div className="text-xs text-gray-600">
                  AI creates customized posts for your specific practice.
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-purple-200">
                <h5 className="font-medium text-purple-900 mb-2">Viral Reel Generator</h5>
                <p className="text-xs text-purple-800 mb-2">Choose template → Generate Viral Reel</p>
                <div className="text-xs text-gray-600">
                  Creates complete packages: hooks, actions, captions & hashtags.
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-purple-200">
                <h5 className="font-medium text-purple-900 mb-2">Content Vault</h5>
                <p className="text-xs text-purple-800 mb-2">Save AI-generated content</p>
                <div className="text-xs text-gray-600">
                  Store your favorite AI content for later use.
                </div>
              </div>
            </div>
             <div className="bg-white p-3 rounded-lg border border-purple-200">
                <div className="flex items-start space-x-2">
                    <SafeIcon icon={FiInfo} className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h5 className="font-medium text-purple-900">Pro Tip: Complete Your Brand Builder First!</h5>
                        <p className="text-xs text-gray-600">
                            The more information you add in the Brand Builder, the more personalized and effective your AI content will be!
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Frequently Asked Questions",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">Frequently Asked Questions 🤔</h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-900 mb-1">Is my data secure?</h5>
                <p className="text-xs text-gray-600">
                  Yes! All your brand and content data is stored locally on your device. We never see it or store it on our servers.
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-900 mb-1">How much does this cost?</h5>
                <p className="text-xs text-gray-600">
                  The app and all its AI features are completely FREE for you to use!
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-900 mb-1">Do I need a ChatGPT account?</h5>
                <p className="text-xs text-gray-600">
                  No! All the AI power is built right into this app. You don't need any other accounts.
                </p>
              </div>
               <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-900 mb-1">Can I use this on multiple devices?</h5>
                <p className="text-xs text-gray-600">
                  Yes! You can use the Export/Import feature in Data Management to move your data between devices.
                </p>
              </div>
               <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-900 mb-1">What if I'm not tech-savvy?</h5>
                <p className="text-xs text-gray-600">
                  This app is designed for you! It's super user-friendly. Just follow the step-by-step guides, and you'll be creating content in no time.
                </p>
              </div>
            </div>
          </div>
           <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                    <SafeIcon icon={FiThumbsUp} className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-green-900">Still Need Help?</h4>
                        <p className="text-sm text-green-800 mt-1">
                           Check out our complete tutorials in the app by clicking the help icon (?) in the top right corner!
                        </p>
                    </div>
                </div>
            </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
          <motion.div
            initial={{opacity: 0, scale: 0.95}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.95}}
            className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <SafeIcon icon={FiSmile} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      AI for Beginners Guide 🚀
                    </h2>
                    <p className="text-blue-100">
                      A simple explanation of how AI helps you create content.
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/20"
                >
                  <SafeIcon icon={FiX} className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Steps Progress */}
            <div className="px-6 pt-4 pb-2 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                  <span className="text-sm text-gray-500">
                    {steps[currentStep].title}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentStep ? 'bg-blue-600' : index < currentStep ? 'bg-green-500' : 'bg-gray-300'}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <motion.div
                key={currentStep}
                initial={{opacity: 0, x: 20}}
                animate={{opacity: 1, x: 0}}
                exit={{opacity: 0, x: -20}}
                transition={{duration: 0.3}}
              >
                {steps[currentStep].content}
              </motion.div>
            </div>
            
            {/* Footer */}
            <div className="border-t border-gray-200 p-4 flex justify-between">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                Back
              </Button>
              <Button onClick={nextStep}>
                {currentStep < steps.length - 1 ? 'Next' : 'Finish'}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AIForDummiesModal;