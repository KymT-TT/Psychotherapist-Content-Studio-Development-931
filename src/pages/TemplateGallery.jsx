import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { generateViralReelContent } from '../lib/openai';
import toast from 'react-hot-toast';

const { FiVideo, FiInstagram, FiYoutube, FiHeart, FiFilter, FiGrid, FiList, FiCopy, FiZap, FiRefreshCw, FiStar, FiEye, FiX, FiLoader, FiShuffle, FiArrowRight, FiExternalLink, FiInfo, FiCheckCircle, FiPlay, FiCamera, FiMic, FiEdit3 } = FiIcons;

const TemplateGallery = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [showReelModal, setShowReelModal] = useState(false);
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [generatedReel, setGeneratedReel] = useState(null);
  const [generatingReel, setGeneratingReel] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);
  const [reelCopied, setReelCopied] = useState({ hook: false, action: false, caption: false, hashtags: false });

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('templateFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('templateFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const filters = [
    { value: 'all', label: 'All Templates' },
    { value: 'viral-hooks', label: '🔥 Viral Hooks' },
    { value: 'trending', label: '📈 Trending Content' },
    { value: 'educational', label: '📚 Educational' },
    { value: 'personal-story', label: '👤 Personal Stories' },
    { value: 'myth-busting', label: '💥 Myth Busting' },
    { value: 'behind-scenes', label: '🎬 Behind the Scenes' },
    { value: 'quick-tips', label: '⚡ Quick Tips' },
    { value: 'day-in-life', label: '📅 Day in the Life' }
  ];

  const platforms = [
    { value: 'all', label: 'All Platforms' },
    { value: 'instagram', label: 'Instagram Reels' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'youtube', label: 'YouTube Shorts' }
  ];

  const viralReelTemplates = [
    // VIRAL HOOKS SECTION
    {
      id: 1,
      title: 'Controversial Therapy Take',
      category: 'viral-hooks',
      platform: 'instagram',
      description: 'Challenge common therapy beliefs with bold, contrarian takes that spark debate and massive engagement',
      viralPotential: 'High',
      avgViews: '500K+',
      tags: ['controversial', 'debate', 'therapy-myths', 'bold'],
      hookExamples: [
        "Unpopular opinion: Most therapists are broke because they think helping people and making money are opposites",
        "Therapists won't like this but... your low prices aren't helping anyone",
        "The therapy industry doesn't want you to know this..."
      ],
      actionSuggestions: [
        "Start with serious face, then smile confidently",
        "Use hand gestures to emphasize key points", 
        "Point directly at camera when making bold claims",
        "Show before/after transformation visually"
      ],
      priority: 1
    },
    {
      id: 2,
      title: 'Therapist Success Story',
      category: 'viral-hooks',
      platform: 'tiktok',
      description: 'Share dramatic transformation from struggling to successful therapist with specific numbers',
      viralPotential: 'Very High',
      avgViews: '1M+',
      tags: ['success', 'transformation', 'numbers', 'inspiring'],
      hookExamples: [
        "6 months ago: 40 clients/week, $60K/year, burned out. Today: 15 clients/week, $180K/year",
        "From broke therapist to 6-figure coach in 18 months. Here's how...",
        "I went from $30/session to $300/session. The secret?"
      ],
      actionSuggestions: [
        "Show 'before' state with tired expression",
        "Transition to confident, successful pose",
        "Use props to show financial growth",
        "Point to text overlays with numbers"
      ],
      priority: 2
    },
    {
      id: 3,
      title: 'Industry Secret Reveal',
      category: 'viral-hooks', 
      platform: 'instagram',
      description: 'Expose uncomfortable truths about therapy business that most won\'t talk about',
      viralPotential: 'High',
      avgViews: '750K+',
      tags: ['secrets', 'industry', 'truth', 'expose'],
      hookExamples: [
        "What no one tells you about therapy school...",
        "The real reason most therapists struggle financially",
        "Here's what happens behind closed doors in therapy practice"
      ],
      actionSuggestions: [
        "Lean in conspiratorially at start",
        "Use 'shh' gesture for secrets",
        "Look around as if checking no one's listening",
        "Build suspense with pauses"
      ],
      priority: 3
    },

    // TRENDING CONTENT
    {
      id: 4,
      title: 'Therapy Business Trends',
      category: 'trending',
      platform: 'tiktok',
      description: 'Jump on trending sounds with therapy business insights',
      viralPotential: 'High',
      avgViews: '400K+',
      tags: ['trends', 'business', 'trending-audio', 'relatable'],
      hookExamples: [
        "POV: You're explaining why you raised your therapy rates",
        "When someone asks if you take insurance...",
        "Me trying to explain that therapy is a business"
      ],
      actionSuggestions: [
        "Use trending dance moves or gestures",
        "React to off-screen 'person' asking questions",
        "Use facial expressions to match trending audio",
        "Point to text that appears on beat"
      ]
    },

    // EDUCATIONAL CONTENT
    {
      id: 5,
      title: 'Therapy Myth Buster',
      category: 'myth-busting',
      platform: 'instagram',
      description: 'Debunk common therapy myths with engaging visual explanations',
      viralPotential: 'Medium-High',
      avgViews: '300K+',
      tags: ['education', 'myths', 'facts', 'professional'],
      hookExamples: [
        "Therapy myths that need to die:",
        "What people think therapy is vs. what it actually is",
        "Biggest misconceptions about therapists"
      ],
      actionSuggestions: [
        "Use 'X' gesture for myths, checkmark for truth",
        "Split screen effect with myth vs reality",
        "Hold up fingers counting each myth",
        "Shake head 'no' for myths, nod for truth"
      ]
    },

    // PERSONAL STORIES
    {
      id: 6,
      title: 'Therapist Vulnerability',
      category: 'personal-story',
      platform: 'tiktok',
      description: 'Share authentic, vulnerable moments that humanize you as a therapist',
      viralPotential: 'Very High',
      avgViews: '800K+',
      tags: ['vulnerability', 'authentic', 'personal', 'relatable'],
      hookExamples: [
        "The day I realized I needed therapy too...",
        "What my therapist said that changed everything",
        "The mistake that made me a better therapist"
      ],
      actionSuggestions: [
        "Start with vulnerable, thoughtful expression",
        "Use hand on heart for emotional moments",
        "Look directly into camera for connection",
        "Show genuine emotions throughout"
      ]
    },

    // BEHIND THE SCENES
    {
      id: 7,
      title: 'Day in Therapist Life',
      category: 'day-in-life',
      platform: 'youtube',
      description: 'Show realistic day-in-the-life content that breaks therapist stereotypes',
      viralPotential: 'Medium',
      avgViews: '250K+',
      tags: ['day-in-life', 'realistic', 'behind-scenes', 'relatable'],
      hookExamples: [
        "Day in my life as a 6-figure therapist",
        "What people think I do vs what I actually do",
        "Behind the scenes of running a therapy practice"
      ],
      actionSuggestions: [
        "Film throughout actual day",
        "Show both professional and personal moments", 
        "Use quick cuts between activities",
        "Include morning routine and work setup"
      ]
    },

    // QUICK TIPS
    {
      id: 8,
      title: 'Business Tips for Therapists',
      category: 'quick-tips',
      platform: 'instagram',
      description: 'Share actionable business tips that therapists can implement immediately',
      viralPotential: 'Medium-High',
      avgViews: '350K+',
      tags: ['tips', 'business', 'actionable', 'practical'],
      hookExamples: [
        "3 things that doubled my therapy income:",
        "Pricing mistakes costing you thousands:",
        "How to fill your practice in 30 days:"
      ],
      actionSuggestions: [
        "Hold up fingers for each tip",
        "Use props to demonstrate points",
        "Point to text overlays",
        "Use checkmark gestures for completed tips"
      ]
    }
  ];

  // Sort templates by priority
  const sortedTemplates = [...viralReelTemplates].sort((a, b) => {
    if (a.priority && b.priority) return a.priority - b.priority;
    if (a.priority && !b.priority) return -1;
    if (!a.priority && b.priority) return 1;
    return a.id - b.id;
  });

  const filteredTemplates = sortedTemplates.filter(template => {
    const matchesFilter = selectedFilter === 'all' || template.category === selectedFilter;
    const matchesPlatform = selectedPlatform === 'all' || template.platform === selectedPlatform;
    return matchesFilter && matchesPlatform;
  });

  const generateViralReel = async (template, forceNew = false) => {
    console.log('🎥 Starting viral reel generation for:', template.title);
    setGeneratingReel(true);
    setGeneratedReel(null);
    setReelCopied({ hook: false, action: false, caption: false, hashtags: false });

    try {
      const uniqueId = Date.now() + Math.random();
      const currentCount = forceNew ? generationCount + 1 : generationCount;

      console.log('📝 Calling generateViralReelContent:', {
        template: template.title,
        uniqueId,
        generationNumber: currentCount
      });

      const reelContent = await generateViralReelContent(template);
      
      console.log('✅ Generated viral reel:', reelContent);
      setGeneratedReel(reelContent);
      setGenerationCount(currentCount);
      
      toast.success('🔥 Viral reel content generated! Ready to go viral!');
    } catch (error) {
      console.error('❌ Error generating viral reel:', error);
      toast.error(`❌ Failed to generate reel: ${error.message}`);
      
      // Fallback to template examples
      const fallbackReel = {
        hook: template.hookExamples[0],
        action: template.actionSuggestions[0],
        caption: `${template.hookExamples[0]}\n\nThis is exactly what I wish someone told me when I started my practice.\n\nWhat's your biggest challenge as a therapist? Let me know in the comments! 👇`,
        hashtags: `#therapist #mentalhealth #therapy #therapistlife #privatepractice #therapistbusiness #mentalwellness #therapisttips #selfcare #healing #mentalhealthmatters #therapyworks #mindfulness #wellness #growth`
      };
      setGeneratedReel(fallbackReel);
    } finally {
      setGeneratingReel(false);
    }
  };

  const handleGenerateReel = async (template) => {
    console.log('🚀 Generate viral reel clicked for:', template.title);
    setSelectedTemplate(template);
    setShowReelModal(true);
    setGenerationCount(0);
    await generateViralReel(template);
  };

  const copySection = (section, content) => {
    if (!content) {
      toast.error('No content to copy');
      return;
    }

    navigator.clipboard.writeText(content);
    setReelCopied(prev => ({ ...prev, [section]: true }));
    
    toast.success(`📋 ${section.charAt(0).toUpperCase() + section.slice(1)} copied!`, {
      duration: 3000,
      icon: '🔥'
    });

    // Reset copied state after 3 seconds
    setTimeout(() => setReelCopied(prev => ({ ...prev, [section]: false })), 3000);
  };

  const copyFullReel = () => {
    if (!generatedReel) {
      toast.error('No reel content to copy');
      return;
    }

    const fullContent = `🎬 VIRAL REEL CONTENT:

🪝 HOOK:
${generatedReel.hook}

🎬 ACTION/FILMING:
${generatedReel.action}

📝 CAPTION:
${generatedReel.caption}

#️⃣ HASHTAGS:
${generatedReel.hashtags}`;

    navigator.clipboard.writeText(fullContent);
    toast.success('🔥 Complete reel content copied! Ready to film!', {
      duration: 5000,
      icon: '🎬'
    });
  };

  const regenerateReel = async () => {
    if (selectedTemplate) {
      console.log('🔄 Regenerating viral reel for:', selectedTemplate.title);
      toast.loading('🎲 Generating completely new viral reel...', { duration: 1000 });
      await generateViralReel(selectedTemplate, true);
    }
  };

  const toggleFavorite = (templateId) => {
    const isFavorite = favorites.includes(templateId);
    if (isFavorite) {
      setFavorites(prev => prev.filter(id => id !== templateId));
      toast.success('💔 Removed from favorites');
    } else {
      setFavorites(prev => [...prev, templateId]);
      toast.success('❤️ Added to favorites');
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram': return FiInstagram;
      case 'tiktok': return FiYoutube;
      case 'youtube': return FiYoutube;
      default: return FiVideo;
    }
  };

  const getCategoryEmoji = (category) => {
    switch (category) {
      case 'viral-hooks': return '🔥';
      case 'trending': return '📈';
      case 'educational': return '📚';
      case 'personal-story': return '👤';
      case 'myth-busting': return '💥';
      case 'behind-scenes': return '🎬';
      case 'quick-tips': return '⚡';
      case 'day-in-life': return '📅';
      default: return '🎬';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'viral-hooks': return 'from-red-400 to-pink-500';
      case 'trending': return 'from-purple-400 to-indigo-500';
      case 'educational': return 'from-blue-400 to-cyan-500';
      case 'personal-story': return 'from-green-400 to-teal-500';
      case 'myth-busting': return 'from-orange-400 to-red-500';
      case 'behind-scenes': return 'from-yellow-400 to-orange-500';
      case 'quick-tips': return 'from-indigo-400 to-purple-500';
      case 'day-in-life': return 'from-pink-400 to-rose-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getViralColor = (potential) => {
    switch (potential) {
      case 'Very High': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium-High': return 'text-yellow-600 bg-yellow-100';
      case 'Medium': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔥 Viral Reel Generator</h1>
        <p className="text-gray-600">
          Generate scroll-stopping reel content with hooks, actions, captions, and hashtags that actually go viral
        </p>
      </div>

      {/* How It Works Section */}
      <Card className="p-6 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🎬</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🚀 Create VIRAL Reels That Stop The Scroll
            </h3>
            <p className="text-gray-700 mb-4">
              Get complete reel packages: viral hooks, filming directions, engaging captions, and proven hashtags. 
              Perfect for therapists ready to build massive audiences and profitable practices.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon icon={FiMic} className="w-5 h-5 text-red-600" />
                  <h4 className="font-semibold text-gray-900">Viral Hook</h4>
                </div>
                <p className="text-sm text-gray-600">Scroll-stopping opening lines that create curiosity gaps</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon icon={FiCamera} className="w-5 h-5 text-red-600" />
                  <h4 className="font-semibold text-gray-900">Action Guide</h4>
                </div>
                <p className="text-sm text-gray-600">Exact movements and expressions to film</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon icon={FiEdit3} className="w-5 h-5 text-red-600" />
                  <h4 className="font-semibold text-gray-900">Viral Caption</h4>
                </div>
                <p className="text-sm text-gray-600">Engaging captions that drive comments and saves</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">#️⃣</span>
                  <h4 className="font-semibold text-gray-900">Hashtags</h4>
                </div>
                <p className="text-sm text-gray-600">Proven hashtag sets for maximum reach</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowWorkflowModal(true)} 
                icon={FiEye}
              >
                See Example Reel
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {filters.map(filter => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {platforms.map(platform => (
                <option key={platform.value} value={platform.value}>
                  {platform.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <SafeIcon icon={FiGrid} className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <SafeIcon icon={FiList} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Card>

      {/* Templates Grid */}
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card hover className="overflow-hidden">
              <div className={`relative bg-gradient-to-br ${getCategoryColor(template.category)} h-48 flex items-center justify-center`}>
                <div className="text-center p-4">
                  <div className="text-4xl mb-2">{getCategoryEmoji(template.category)}</div>
                  <p className="text-white font-semibold text-sm">{template.platform}</p>
                  {template.priority && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      🔥 VIRAL
                    </div>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => toggleFavorite(template.id)}
                    className={`p-2 rounded-full shadow-md transition-colors ${
                      favorites.includes(template.id) 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <SafeIcon icon={FiHeart} className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <SafeIcon icon={getPlatformIcon(template.platform)} className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{template.title}</h3>
                  <div className={`text-xs px-2 py-1 rounded-full ${getViralColor(template.viralPotential)}`}>
                    {template.viralPotential}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span>Avg Views: {template.avgViews}</span>
                    <span>🔥 {template.viralPotential} Viral</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={() => handleGenerateReel(template)}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                    icon={FiVideo}
                  >
                    Generate Viral Reel 🔥
                  </Button>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedTemplate(template);
                        setShowReelModal(true);
                      }}
                      icon={FiEye}
                      size="sm"
                      className="flex-1"
                    >
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiVideo} className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more templates</p>
        </div>
      )}

      {/* Workflow Tutorial Modal */}
      {showWorkflowModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                🔥 Example: How to Create a Viral Reel
              </h3>
              <button
                onClick={() => setShowWorkflowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={FiX} className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Example Reel Content */}
              <Card className="p-6 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">🎬 Complete Viral Reel Package:</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <SafeIcon icon={FiMic} className="w-4 h-4 mr-2 text-red-600" />
                      🪝 Viral Hook:
                    </h5>
                    <div className="bg-white p-3 rounded border border-red-200 mb-4">
                      <p className="text-sm font-medium">"Unpopular opinion: Most therapists are broke because they think helping people and making money are opposites"</p>
                    </div>

                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <SafeIcon icon={FiCamera} className="w-4 h-4 mr-2 text-red-600" />
                      🎬 Action/Filming:
                    </h5>
                    <div className="bg-white p-3 rounded border border-red-200">
                      <ul className="text-sm space-y-1">
                        <li>• Start with serious face, direct eye contact</li>
                        <li>• Lean forward slightly when saying "unpopular opinion"</li>
                        <li>• Use hand gestures to emphasize "helping" vs "money"</li>
                        <li>• End with confident smile and shrug</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <SafeIcon icon={FiEdit3} className="w-4 h-4 mr-2 text-red-600" />
                      📝 Viral Caption:
                    </h5>
                    <div className="bg-white p-3 rounded border border-red-200 mb-4 text-sm">
                      <p className="mb-2">"Unpopular opinion: Most therapists are broke because they think helping people and making money are opposites.</p>
                      <p className="mb-2">I made $15K last month helping MORE people than ever. Here's the mindset shift that changed everything...</p>
                      <p>What's your biggest money block as a therapist? 👇"</p>
                    </div>

                    <h5 className="font-semibold text-gray-900 mb-2">#️⃣ Hashtags:</h5>
                    <div className="bg-white p-3 rounded border border-red-200 text-xs">
                      <p>#therapist #privatepractice #therapistbusiness #mentalhealth #therapy #therapistlife #6figuretherapist #businessmindset #therapyworks #mentalhealthbusiness</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Why This Works */}
              <Card className="p-6 bg-green-50 border-green-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">🚀 Why This Goes Viral:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-green-900 mb-2">🔥 Viral Elements:</h5>
                    <ul className="space-y-1 text-green-800">
                      <li>• "Unpopular opinion" = pattern interrupt</li>
                      <li>• Challenges common belief</li>
                      <li>• Specific number ($15K)</li>
                      <li>• Creates curiosity gap</li>
                      <li>• Asks engaging question</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-900 mb-2">📈 Engagement Drivers:</h5>
                    <ul className="space-y-1 text-green-800">
                      <li>• Sparks debate in comments</li>
                      <li>• Relatable to target audience</li>
                      <li>• Saves for future reference</li>
                      <li>• Shares to stories</li>
                      <li>• DMs for more info</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <div className="flex justify-center">
                <Button
                  onClick={() => setShowWorkflowModal(false)}
                  className="px-8 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                >
                  Got It! Let's Create Viral Reels 🔥
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Reel Generation Modal */}
      {showReelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                🔥 Viral Reel Generator
              </h3>
              <button
                onClick={() => setShowReelModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={FiX} className="w-6 h-6" />
              </button>
            </div>

            {selectedTemplate && (
              <div className="space-y-6">
                {/* Template Info */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{getCategoryEmoji(selectedTemplate.category)}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">{selectedTemplate.title}</h4>
                      <p className="text-sm text-gray-600">{selectedTemplate.description}</p>
                    </div>
                    {selectedTemplate.priority && (
                      <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        🔥 VIRAL
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Platform: {selectedTemplate.platform}</span>
                    <span>Avg Views: {selectedTemplate.avgViews}</span>
                    <span className="text-red-600">🔥 {selectedTemplate.viralPotential} Viral Potential</span>
                  </div>
                </div>

                {/* Generated Reel Content */}
                {generatingReel ? (
                  <div className="flex items-center justify-center p-8 bg-red-50 rounded-lg">
                    <div className="text-center">
                      <SafeIcon icon={FiLoader} className="w-8 h-8 text-red-600 animate-spin mx-auto mb-2" />
                      <p className="text-gray-600">Generating viral reel content...</p>
                      <p className="text-sm text-gray-500 mt-1">Creating hooks, actions, captions & hashtags</p>
                    </div>
                  </div>
                ) : generatedReel ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Hook */}
                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold text-gray-900 flex items-center">
                          <SafeIcon icon={FiMic} className="w-4 h-4 mr-2 text-red-600" />
                          🪝 Viral Hook
                        </h5>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copySection('hook', generatedReel.hook)}
                          icon={reelCopied.hook ? FiCheckCircle : FiCopy}
                          className={reelCopied.hook ? 'border-green-300 text-green-600' : ''}
                        >
                          {reelCopied.hook ? 'Copied!' : 'Copy'}
                        </Button>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium">{generatedReel.hook}</p>
                      </div>
                    </Card>

                    {/* Action */}
                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold text-gray-900 flex items-center">
                          <SafeIcon icon={FiCamera} className="w-4 h-4 mr-2 text-red-600" />
                          🎬 Action/Filming
                        </h5>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copySection('action', generatedReel.action)}
                          icon={reelCopied.action ? FiCheckCircle : FiCopy}
                          className={reelCopied.action ? 'border-green-300 text-green-600' : ''}
                        >
                          {reelCopied.action ? 'Copied!' : 'Copy'}
                        </Button>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm whitespace-pre-line">{generatedReel.action}</p>
                      </div>
                    </Card>

                    {/* Caption */}
                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold text-gray-900 flex items-center">
                          <SafeIcon icon={FiEdit3} className="w-4 h-4 mr-2 text-red-600" />
                          📝 Viral Caption
                        </h5>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copySection('caption', generatedReel.caption)}
                          icon={reelCopied.caption ? FiCheckCircle : FiCopy}
                          className={reelCopied.caption ? 'border-green-300 text-green-600' : ''}
                        >
                          {reelCopied.caption ? 'Copied!' : 'Copy'}
                        </Button>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto">
                        <p className="text-sm whitespace-pre-line">{generatedReel.caption}</p>
                      </div>
                    </Card>

                    {/* Hashtags */}
                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold text-gray-900 flex items-center">
                          <span className="text-red-600 mr-2">#️⃣</span>
                          Hashtags
                        </h5>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copySection('hashtags', generatedReel.hashtags)}
                          icon={reelCopied.hashtags ? FiCheckCircle : FiCopy}
                          className={reelCopied.hashtags ? 'border-green-300 text-green-600' : ''}
                        >
                          {reelCopied.hashtags ? 'Copied!' : 'Copy'}
                        </Button>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs">{generatedReel.hashtags}</p>
                      </div>
                    </Card>
                  </div>
                ) : null}

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={regenerateReel}
                    icon={FiShuffle}
                    variant="outline"
                    loading={generatingReel}
                    disabled={!selectedTemplate}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    Generate New Reel 🔥
                  </Button>
                  <Button
                    onClick={copyFullReel}
                    icon={FiCopy}
                    className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                    disabled={!generatedReel || generatingReel}
                  >
                    Copy Complete Reel Package 🎬
                  </Button>
                </div>

                {/* Instructions */}
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-900 mb-2">🔥 How to Use This Reel:</h4>
                  <ol className="text-sm text-red-800 space-y-1">
                    <li>1. <strong>Film the hook:</strong> Use the exact words and follow the action guide</li>
                    <li>2. <strong>Add text overlay:</strong> Put key points as text on screen</li>
                    <li>3. <strong>Post with caption:</strong> Use the generated caption and hashtags</li>
                    <li>4. <strong>Engage quickly:</strong> Reply to comments in first hour for algorithm boost</li>
                    <li>5. <strong>Share to stories:</strong> Drive more views from your story audience</li>
                  </ol>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TemplateGallery;