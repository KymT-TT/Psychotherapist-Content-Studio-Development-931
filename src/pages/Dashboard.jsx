import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import {apiConnectionManager, getInstantContent} from '../lib/openai'
import {hybridContentGenerator} from '../lib/hybridContentGenerator'
import {getBrandFoundation, getBrandCompletionPercentage, isBrandComplete} from '../lib/brandIntegration'
import {dataManager} from '../lib/dataManager'
import TutorialModal from '../components/Tutorials/TutorialModal'
import AIForDummiesModal from '../components/Tutorials/AIForDummiesModal'
import toast from 'react-hot-toast'

const {FiUser, FiEdit3, FiVideo, FiBookOpen, FiTarget, FiCheck, FiLightbulb, FiRefreshCw, FiAlertCircle, FiZap, FiCheckCircle, FiXCircle, FiArrowRight, FiDatabase, FiShield, FiDownload, FiHelpCircle, FiExternalLink, FiInfo, FiKey, FiClock, FiDollarSign, FiWifiOff, FiWifi, FiSmile, FiMic, FiCamera, FiPlay} = FiIcons

const Dashboard = () => {
  const [contentIdeas, setContentIdeas] = useState([])
  const [loadingIdeas, setLoadingIdeas] = useState(false)
  const [connectionState, setConnectionState] = useState({isConnected: false, hasApiKey: false, error: null})
  const [brandData, setBrandData] = useState(null)
  const [brandCompletion, setBrandCompletion] = useState(0)
  const [dataSummary, setDataSummary] = useState({})
  const [showTutorials, setShowTutorials] = useState(false)
  const [showAIForDummies, setShowAIForDummies] = useState(false)
  const [instantContent, setInstantContent] = useState([])

  useEffect(() => {
    const handleConnectionChange = (state) => {
      console.log('🔄 Connection state changed:', state)
      setConnectionState(state)
    }
    apiConnectionManager.addListener(handleConnectionChange)
    apiConnectionManager.testConnection(); // Initial test on load
    return () => apiConnectionManager.removeListener(handleConnectionChange)
  }, [])

  useEffect(() => {
    const brand = getBrandFoundation();
    setBrandData(brand);
    setBrandCompletion(getBrandCompletionPercentage());
    setDataSummary(dataManager.getDataSummary());
    generateInstantContent();
    const hasSeenAIGuide = localStorage.getItem('has_seen_ai_guide');
    if (!hasSeenAIGuide) {
      setTimeout(() => {
        setShowAIForDummies(true);
        localStorage.setItem('has_seen_ai_guide', 'true');
      }, 1500);
    }
  }, []);

  const coreFeatures = [
    {
      title: 'Brand Builder',
      description: 'Define your ideal client and brand voice',
      icon: FiUser,
      color: 'from-primary-500 to-primary-600',
      link: '/brand-builder',
      completed: brandCompletion > 80
    },
    {
      title: 'Post Generator',
      description: 'Create engaging social media content',
      icon: FiEdit3,
      color: 'from-accent-500 to-accent-600',
      link: '/post-generator'
    },
    {
      title: 'Viral Reel Generator',
      description: 'Generate hooks, actions, & captions',
      icon: FiVideo,
      color: 'from-red-500 to-orange-500',
      link: '/template-gallery'
    },
    {
      title: 'Content Vault',
      description: 'Save and organize your content ideas',
      icon: FiBookOpen,
      color: 'from-green-500 to-green-600',
      link: '/content-vault'
    }
  ]

  const testConnection = async () => {
    console.log('🔍 Manual connection test triggered')
    const result = await apiConnectionManager.testConnection()
    if (result.success) {
      toast.success('✅ AI connection is active!')
    } else {
      toast.error(`❌ AI connection error: ${result.error}`)
    }
  }

  const generateInstantContent = () => {
    console.log('⚡ Generating instant local content...')
    const niches = ['anxiety', 'depression', 'trauma', 'adhd']
    const instant = niches.map((niche, index) => {
      const content = getInstantContent(niche, 'full_post')
      return {
        id: `instant_${niche}_${Date.now()}_${index}`,
        niche: niche.charAt(0).toUpperCase() + niche.slice(1),
        content: content,
        source: 'local'
      }
    })
    setInstantContent(instant)
    console.log('⚡ Instant content generated:', instant.length, 'items')
  }

  const generateIdeas = async () => {
    setLoadingIdeas(true)
    try {
      const brandFoundation = getBrandFoundation();
      const userProfile = brandFoundation || {};
      const contentPillars = brandFoundation?.contentPillars 
        ? brandFoundation.contentPillars.split(',').map(p => p.trim()) 
        : ['Mental Health Tips', 'Self-Care', 'Therapy Insights'];

      console.log('🎯 Generating ideas with hybrid approach...')
      const ideas = await hybridContentGenerator.generateContentIdeas(userProfile, contentPillars)
      
      const ideaLines = ideas.split('\n').filter(line => line.trim().length > 0)
      setContentIdeas(ideaLines)
      
      if (connectionState.isConnected) {
        toast.success('🎉 AI-powered personalized content ideas generated!')
      } else {
        toast.success('💡 Local content ideas generated! (Connect API for AI personalization)')
      }
    } catch (error) {
      console.error('❌ Error generating ideas:', error)
      const fallbackIdeas = instantContent.map((item, index) => 
        `**LOCAL IDEA #${index + 1}: ${item.niche} Support**\n${item.content.substring(0, 200)}...\n\n---`
      )
      setContentIdeas(fallbackIdeas)
      toast.error(`💡 AI generation failed. Using local content. Error: ${error.message}`)
    } finally {
      setLoadingIdeas(false)
    }
  }

  const handleQuickExport = () => {
    dataManager.exportAllData();
  };

  const openContentPlannerGPT = () => {
    window.open('https://chatgpt.com/g/g-68345ed1e50c81918d7869ac4c0244e4-therapist-social-media-content-planner', '_blank');
    toast.success('🚀 Opening Therapist Content Planner GPT...');
  };

  const totalDataSize = Object.values(dataSummary).reduce((total, item) => total + item.size, 0);
  const hasData = totalDataSize > 0;

  return (
    <>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 lg:p-8 text-white">
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
          >
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Welcome to Your Social Media Content Planner
            </h1>
            <p className="text-primary-100 mb-2">
              Create engaging, ethical content that resonates with your ideal clients
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAIForDummies(true)}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 mb-4"
              icon={FiSmile}
            >
              New to AI? Click for Beginner's Guide
            </Button>
            {brandData?.brandStatement && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="font-semibold mb-1">🎯 Your Brand Statement</h3>
                <p className="text-sm text-primary-100 italic">
                  "{brandData.brandStatement}"
                </p>
              </div>
            )}
          </motion.div>
        </div>

        <Card className={`p-6 ${
          connectionState.isConnected 
            ? 'bg-green-50 border-green-200' 
            : connectionState.error
              ? 'bg-red-50 border-red-200'
              : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              connectionState.isConnected ? 'bg-green-100' : connectionState.error ? 'bg-red-100' : 'bg-blue-100'
            }`}>
              <SafeIcon 
                icon={connectionState.isConnected ? FiWifi : connectionState.error ? FiWifiOff : FiZap} 
                className={`w-6 h-6 ${connectionState.isConnected ? 'text-green-600' : connectionState.error ? 'text-red-600' : 'text-blue-600'}`} 
              />
            </div>
            <div className="flex-1">
              <h2 className={`text-xl font-bold ${
                connectionState.isConnected ? 'text-green-900' : connectionState.error ? 'text-red-900' : 'text-blue-900'
              }`}>
                {connectionState.isConnected 
                  ? '✅ AI Features Active' 
                  : connectionState.error
                    ? '⚠️ AI Features Unavailable'
                    : '🔄 Checking AI Connection...'
                }
              </h2>
              <p className={`text-sm ${
                connectionState.isConnected ? 'text-green-700' : connectionState.error ? 'text-red-700' : 'text-blue-700'
              }`}>
                {connectionState.isConnected 
                  ? 'All AI-powered features are online and ready to use.'
                  : connectionState.error
                    ? "We're experiencing a temporary issue with our AI service. Please try again later."
                    : 'Please wait while we connect to the AI service.'
                }
              </p>
            </div>
          </div>
        </Card>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Content Creation Toolkit</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: index * 0.1}}
              >
                <Link to={feature.link}>
                  <Card hover className="p-6 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                        <SafeIcon icon={feature.icon} className="w-6 h-6 text-white" />
                      </div>
                      {feature.completed && (
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
              <SafeIcon icon={FiLightbulb} className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                ⚡ Instant Content Preview
              </h3>
              <p className="text-sm text-gray-600">
                {connectionState.isConnected 
                  ? 'Generate AI-powered or use instant local content' 
                  : 'Instant local content (AI available when connected)'
                }
              </p>
            </div>
          </div>

          <div className="flex space-x-3 mb-4">
            <Button
              onClick={generateIdeas}
              loading={loadingIdeas}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              icon={FiRefreshCw}
            >
              {connectionState.isConnected ? 'Generate AI Content' : 'Generate New Content'}
            </Button>
            <Button
              variant="outline"
              onClick={generateInstantContent}
              icon={FiZap}
            >
              Refresh Instant Content
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowAIForDummies(true)}
              icon={FiSmile}
              className="hidden sm:flex"
            >
              AI Help
            </Button>
          </div>

          {(contentIdeas.length > 0 || instantContent.length > 0) && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                <span>
                  {contentIdeas.length > 0 
                    ? (connectionState.isConnected ? 'AI-Generated Ideas:' : 'Generated Ideas:')
                    : 'Instant Content:'
                  }
                </span>
                {!connectionState.isConnected && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    Local Content
                  </span>
                )}
              </h4>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {contentIdeas.length > 0 ? (
                  contentIdeas.map((idea, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{idea}</p>
                    </div>
                  ))
                ) : (
                  instantContent.map((item, index) => (
                    <div key={item.id} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-purple-900">{item.niche} Content</h5>
                        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                          Instant
                        </span>
                      </div>
                      <p className="text-sm text-purple-800 line-clamp-3">{item.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <div className="flex items-start space-x-4">
            <SafeIcon icon={FiVideo} className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                🚀 New to Viral Reels? Here's How It Works!
              </h3>
              <p className="text-sm text-red-700 mb-4">
                Our Viral Reel Generator creates complete packages: hooks, actions, captions & hashtags.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white p-3 rounded border border-red-200">
                  <span className="font-semibold text-sm flex items-center"><SafeIcon icon={FiMic} className="w-4 h-4 mr-2"/>1. Generate Reel</span>
                  <p className="text-xs text-gray-600">Pick template → Get complete reel content</p>
                </div>
                <div className="bg-white p-3 rounded border border-red-200">
                  <span className="font-semibold text-sm flex items-center"><SafeIcon icon={FiCamera} className="w-4 h-4 mr-2"/>2. Film & Edit</span>
                  <p className="text-xs text-gray-600">Use our action guide to film your reel</p>
                </div>
                <div className="bg-white p-3 rounded border border-red-200">
                  <span className="font-semibold text-sm flex items-center"><SafeIcon icon={FiPlay} className="w-4 h-4 mr-2"/>3. Post & Engage</span>
                  <p className="text-xs text-gray-600">Use our caption & hashtags to go viral!</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={openContentPlannerGPT}
                  variant="outline"
                  size="sm"
                  icon={FiExternalLink}
                  className="border-red-300 text-red-700 hover:bg-red-100"
                >
                  Open Content Planner GPT
                </Button>
                <Link to="/template-gallery">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-300 text-red-700 hover:bg-red-100"
                  >
                    Try Reel Generator
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {brandData && (
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <div className="flex items-center space-x-4">
              <SafeIcon icon={FiTarget} className="w-6 h-6 text-blue-600" />
              <div className="flex-1">
                <h3 className="font-semibold text-blue-800">
                  Brand Foundation: {brandData.practiceName || 'Your Practice'} ({brandCompletion}% Complete)
                </h3>
                <p className="text-sm text-blue-700">
                  Target Client: {brandData.idealClientPersona || 'Not specified'} • 
                  Platforms: {brandData.primaryPlatforms?.join(', ') || 'Not specified'}
                </p>
              </div>
              <Link to="/brand-builder">
                <Button
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  icon={isBrandComplete() ? FiCheck : FiArrowRight}
                >
                  {isBrandComplete() ? 'View Brand' : 'Complete Brand'}
                </Button>
              </Link>
            </div>
            <div className="mt-3">
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{width: `${brandCompletion}%`}}
                ></div>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <div className="flex items-center space-x-4">
            <SafeIcon icon={FiShield} className="w-6 h-6 text-green-600" />
            <div className="flex-1">
              <h3 className="font-semibold text-green-800">
                Your Data: 100% Private & Secure
              </h3>
              <p className="text-sm text-green-700">
                {hasData 
                  ? `${Object.values(dataSummary).filter(item => item.exists).length} data categories stored locally on your device`
                  : 'All data stored on your device - no cloud costs, complete privacy'
                }
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {hasData && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleQuickExport}
                  icon={FiDownload}
                  className="border-green-300 text-green-700 hover:bg-green-100"
                >
                  Quick Export
                </Button>
              )}
              <div className="text-right">
                <div className="text-lg font-bold text-green-800">$0</div>
                <div className="text-xs text-green-600">Forever</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <TutorialModal isOpen={showTutorials} onClose={() => setShowTutorials(false)} />
      <AIForDummiesModal isOpen={showAIForDummies} onClose={() => setShowAIForDummies(false)} />
    </>
  )
}

export default Dashboard