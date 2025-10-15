import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../UI/Button';
import Card from '../UI/Card';

const { FiX, FiBookOpen, FiPlay, FiChevronRight, FiCheck, FiStar, FiHelpCircle, FiSearch, FiFilter, FiExternalLink, FiCopy, FiArrowRight } = FiIcons;

const TutorialModal = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const sections = [
    { id: 'overview', label: 'Getting Started', icon: FiIcons.FiPlay },
    { id: 'brand-builder', label: 'Brand Builder', icon: FiIcons.FiUser },
    { id: 'content-calendar', label: 'Content Calendar', icon: FiIcons.FiCalendar },
    { id: 'post-generator', label: 'Post Generator', icon: FiIcons.FiEdit3 },
    { id: 'template-gallery', label: 'Template Gallery', icon: FiIcons.FiImage },
    { id: 'content-vault', label: 'Content Vault', icon: FiIcons.FiBookOpen },
    { id: 'data-management', label: 'Data Management', icon: FiIcons.FiDatabase },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: FiIcons.FiTool },
    { id: 'faq', label: 'FAQ', icon: FiIcons.FiHelpCircle }
  ];

  const tutorials = {
    overview: {
      title: "Getting Started with Clarity Content Studio",
      description: "Learn the basics and get up to speed quickly",
      content: [
        {
          title: "Welcome to Your Content Studio! 🎉",
          steps: [
            "This platform helps therapists create professional, ethical social media content",
            "Everything is stored locally on your device - no cloud costs, complete privacy",
            "Your data never leaves your browser unless you choose to export it",
            "Start by completing your Brand Foundation for personalized content"
          ]
        },
        {
          title: "First Steps Checklist ✅",
          steps: [
            "1️⃣ Complete your Brand Foundation (Brand Builder page)",
            "2️⃣ Add your OpenAI API key in Settings for AI features",
            "3️⃣ Test your API connection on the Dashboard",
            "4️⃣ Generate your first content ideas",
            "5️⃣ Export your data as a backup"
          ]
        },
        {
          title: "Navigation Tips 🧭",
          steps: [
            "Use the sidebar to navigate between sections",
            "Dashboard shows your progress and quick actions",
            "Settings (gear icon) contains API keys and preferences",
            "Mobile users: tap the menu button (☰) to open sidebar"
          ]
        }
      ]
    },
    'brand-builder': {
      title: "Brand Foundation Builder",
      description: "Create your professional brand identity step-by-step",
      content: [
        {
          title: "Why Brand Foundation Matters 🎯",
          steps: [
            "Defines your ideal client persona and their pain points",
            "Creates your unique brand statement automatically",
            "Personalizes ALL content generation throughout the app",
            "Ensures consistent, targeted messaging across platforms"
          ]
        },
        {
          title: "Step-by-Step Guide 📝",
          steps: [
            "Step 1: Practice Info - Enter your practice name, type, and experience",
            "Step 2: Brand Identity - Define your ideal client and unique approach",
            "Step 3: Visual Identity - Choose colors and design style",
            "Step 4: Brand Voice - Set your tone and core values",
            "Step 5: Content Strategy - Select platforms and posting frequency",
            "Step 6: Review - Download your complete brand guide"
          ]
        },
        {
          title: "Pro Tips 💡",
          steps: [
            "Be specific about your ideal client - this improves AI content quality",
            "Your brand statement follows the formula: 'I help [who] go from [pain] to [outcome] by [how]'",
            "Choose 2-3 primary platforms rather than trying to be everywhere",
            "Save your progress frequently using the 'Save Progress' button",
            "Export your brand guide for reference and team sharing"
          ]
        }
      ]
    },
    'content-calendar': {
      title: "Content Calendar",
      description: "Plan and organize your social media posts",
      content: [
        {
          title: "Calendar Overview 📅",
          steps: [
            "View your content in a monthly calendar format",
            "Click any date to select it and view/add posts",
            "See post count indicators on dates with scheduled content",
            "Navigate between months using the arrow buttons"
          ]
        },
        {
          title: "Adding Posts ➕",
          steps: [
            "1. Click on a date to select it",
            "2. Click 'Add Post' button",
            "3. Choose platform (Instagram, LinkedIn, TikTok, Facebook)",
            "4. Enter post title (required) and caption",
            "5. Add hashtags, visual notes, and call-to-action",
            "6. Save your post"
          ]
        },
        {
          title: "Managing Content 🛠️",
          steps: [
            "View all posts for a selected date in the bottom panel",
            "Edit or delete posts using the action buttons",
            "Posts are color-coded by platform for easy identification",
            "Export your entire calendar to CSV for external tools"
          ]
        },
        {
          title: "Best Practices 🌟",
          steps: [
            "Plan content 1-2 weeks in advance",
            "Mix educational, inspirational, and promotional content",
            "Use visual notes to remember image/video requirements",
            "Include clear calls-to-action in your posts",
            "Regular export your calendar as backup"
          ]
        }
      ]
    },
    'post-generator': {
      title: "AI Post Generator",
      description: "Create engaging content with AI assistance",
      content: [
        {
          title: "AI Content Generation 🤖",
          steps: [
            "Leverages your Brand Foundation for personalized content",
            "Creates platform-specific content (Instagram vs LinkedIn style)",
            "Follows ethical guidelines for mental health professionals",
            "Includes appropriate disclaimers and professional boundaries"
          ]
        },
        {
          title: "Using the Generator 🎨",
          steps: [
            "1. Select content format (Carousel, Reel, Story, Text)",
            "2. Choose your platform",
            "3. Pick the tone that matches your brand",
            "4. Select or enter a topic",
            "5. Click 'Generate Content'",
            "6. Copy or save the generated content"
          ]
        },
        {
          title: "Content Types Explained 📋",
          steps: [
            "Carousel: Multi-slide educational content with numbered points",
            "Reel/Video: Short-form video scripts with engaging hooks",
            "Story: Temporary content for behind-the-scenes or quick tips",
            "Text Post: Professional articles or thought leadership pieces"
          ]
        },
        {
          title: "Maximizing Quality 🚀",
          steps: [
            "Complete your Brand Foundation first for better personalization",
            "Test your OpenAI API connection before generating content",
            "Try different tone options to find your voice",
            "Save great content to your Content Vault for future reference",
            "Always review and customize AI content before posting"
          ]
        }
      ]
    },
    'template-gallery': {
      title: "Template Gallery & AI Image Prompts",
      description: "Create viral-ready images using AI prompt generator",
      content: [
        {
          title: "🚀 NEW: How the AI Image Generator Works 🎨",
          steps: [
            "Step 1: Choose a template and click 'Generate Unique Prompt'",
            "Step 2: Copy the generated prompt to your clipboard",
            "Step 3: Click 'Open ChatGPT' to launch ChatGPT in a new tab",
            "Step 4: Paste the prompt in ChatGPT and ask it to create an image",
            "Step 5: Download your viral-ready image and post to social media!"
          ]
        },
        {
          title: "Understanding the Process 🔄",
          steps: [
            "This app generates PROMPTS (text instructions) for AI image creators",
            "You need to use ChatGPT, DALL-E, or similar tools to create actual images",
            "Each prompt is unique and creates completely fresh content every time",
            "The workflow is: Generate Prompt → Copy → Open ChatGPT → Paste → Create Image"
          ]
        },
        {
          title: "What You Need 🛠️",
          steps: [
            "Access to ChatGPT (free at chat.openai.com - no account required for basic use)",
            "Alternative: DALL-E, Midjourney, or any AI image generator",
            "Your generated prompt from our template gallery",
            "Just copy, paste, and create - it's that simple!"
          ]
        },
        {
          title: "Template Categories 📚",
          steps: [
            "🔥 VIRAL HOOKS: Scroll-stopping content for maximum engagement",
            "📅 WEEKLY THEMES: Consistent content for each day of the week",
            "💭 QUOTES: Inspirational and motivational quote designs",
            "💡 TIPS: Educational content with actionable advice",
            "🎯 INTERACTIVE: Engaging content that encourages participation"
          ]
        },
        {
          title: "Pro Tips for Viral Content 🌟",
          steps: [
            "Viral hooks use curiosity gaps and pattern interrupts to stop scrolling",
            "Weekly themes build audience expectations and consistency",
            "Each generation creates completely unique text - no repeated content",
            "Customize style, colors, and mood for your brand",
            "Test different templates to see what resonates with your audience"
          ]
        },
        {
          title: "Step-by-Step Example 📸",
          steps: [
            "1. Choose 'Viral Hook Generator' template",
            "2. Click 'Generate Unique Prompt' → Get custom anxiety tips prompt",
            "3. Click 'Copy Prompt' → Prompt is now in your clipboard",
            "4. Click 'Open ChatGPT' → ChatGPT opens in new tab",
            "5. In ChatGPT, type: 'Create an image using this prompt:' then paste",
            "6. ChatGPT generates your professional therapy-themed image",
            "7. Download and post to Instagram → Watch engagement soar! 🚀"
          ]
        }
      ]
    },
    'content-vault': {
      title: "Content Vault",
      description: "Store and organize your content library",
      content: [
        {
          title: "Your Content Library 📚",
          steps: [
            "Central repository for all your content ideas",
            "Search by keywords, content, or tags",
            "Filter by platform, category, or favorites",
            "Automatically saves AI-generated content when requested"
          ]
        },
        {
          title: "Adding Content 📝",
          steps: [
            "1. Click 'Add New Idea' button",
            "2. Enter a descriptive title",
            "3. Write detailed content description",
            "4. Select platform and category",
            "5. Add relevant tags (comma-separated)",
            "6. Save to your vault"
          ]
        },
        {
          title: "Organization System 🗂️",
          steps: [
            "Categories: Tips, Quotes, Educational, Personal, Promotional, Seasonal, Generated",
            "Tags: Use specific keywords like 'anxiety', 'self-care', 'boundaries'",
            "Favorites: Heart icon to mark your best content",
            "Platform tags: Instagram, LinkedIn, TikTok, Facebook"
          ]
        },
        {
          title: "Using Your Content 💡",
          steps: [
            "Click 'Copy' to copy content to clipboard",
            "Use search to quickly find specific topics",
            "Reference saved content when planning your calendar",
            "Build content series from related vault items",
            "Export vault data in Settings > Data Management"
          ]
        }
      ]
    },
    'data-management': {
      title: "Data Management & Backups",
      description: "Protect and manage your content data",
      content: [
        {
          title: "Local Storage System 🏠",
          steps: [
            "All data stored locally on your device (browser storage)",
            "No cloud servers = $0 ongoing costs forever",
            "Complete privacy - your data never leaves your device",
            "Works offline after initial load"
          ]
        },
        {
          title: "Export & Import 📦",
          steps: [
            "Export All: Downloads complete backup as JSON file",
            "Import: Restores data from backup file",
            "Category Export: Export specific sections (brand, calendar, etc.)",
            "Auto-backups: Created every 30 minutes and when closing app"
          ]
        },
        {
          title: "Backup Best Practices 🛡️",
          steps: [
            "Export your data weekly as backup",
            "Save backup files to cloud storage (Google Drive, Dropbox)",
            "Before major changes, create manual backup",
            "When switching devices, export from old and import to new",
            "Share backup files with team members for collaboration"
          ]
        },
        {
          title: "Data Categories 📊",
          steps: [
            "Brand Foundation: Your core brand identity and strategy",
            "Content Calendar: All scheduled posts and planning data",
            "Content Vault: Your library of content ideas and inspiration",
            "User Settings: API keys, preferences, and app configuration",
            "Template Favorites: Your saved template preferences",
            "App Preferences: Theme, platform defaults, and display options"
          ]
        }
      ]
    },
    troubleshooting: {
      title: "Troubleshooting Guide",
      description: "Solve common issues and optimize performance",
      content: [
        {
          title: "OpenAI API Issues 🔧",
          steps: [
            "Error: 'API key not found' → Add your OpenAI API key in Settings > API Keys",
            "Error: 'Invalid API key' → Ensure key starts with 'sk-' and is complete",
            "Error: 'Insufficient credits' → Check your OpenAI account billing",
            "Slow responses → OpenAI servers may be busy, try again in a few minutes",
            "Test connection using Dashboard > Test Connection button"
          ]
        },
        {
          title: "Template Gallery & ChatGPT Issues 🎨",
          steps: [
            "Not understanding workflow → Read the 'How It Works' tutorial above",
            "Prompt not copying → Try right-click and 'Copy' if button doesn't work",
            "ChatGPT not opening → Check if popups are blocked in your browser",
            "ChatGPT says 'I can't create images' → Use ChatGPT Plus or try DALL-E instead",
            "Generated images look wrong → Try regenerating the prompt for fresh content"
          ]
        },
        {
          title: "Data & Performance 💾",
          steps: [
            "Lost data → Check auto-backups in Data Management",
            "Slow loading → Clear browser cache and refresh",
            "Export not working → Check browser allows downloads",
            "Import failing → Ensure file is valid JSON from this app",
            "Storage full → Export data, clear all, then import essentials"
          ]
        },
        {
          title: "Content Generation Issues 🎯",
          steps: [
            "Generic content → Complete Brand Foundation for personalization",
            "Inappropriate content → Report to OpenAI, regenerate with different prompt",
            "Content not saving → Check if you clicked 'Save to Vault'",
            "Missing brand elements → Verify Brand Foundation is complete",
            "Repeated content → Use 'Generate New Content' for fresh ideas"
          ]
        },
        {
          title: "Browser Compatibility 🌐",
          steps: [
            "Recommended: Chrome, Firefox, Safari, Edge (latest versions)",
            "Enable JavaScript and localStorage",
            "Disable ad blockers if experiencing issues",
            "Clear browser cache if app behaves unexpectedly",
            "Use incognito mode to test if extensions cause problems"
          ]
        }
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      description: "Quick answers to common questions",
      content: [
        {
          title: "How the AI Image Generator Works ❓",
          steps: [
            "Q: Do you create images for me? A: No, we generate PROMPTS that you use in ChatGPT/DALL-E to create images.",
            "Q: Why can't I just get the image directly? A: This keeps costs $0 for you - you use your own ChatGPT account.",
            "Q: Do I need ChatGPT Plus? A: Basic ChatGPT works, but Plus gives better image quality.",
            "Q: Can I use other AI tools? A: Yes! DALL-E, Midjourney, Stable Diffusion all work with our prompts.",
            "Q: Why do I need to copy and paste? A: This workflow gives you full control and costs nothing extra."
          ]
        },
        {
          title: "General Questions 🤔",
          steps: [
            "Q: Is my data secure? A: Yes! Everything is stored locally on your device.",
            "Q: Do I need an internet connection? A: Only for AI features and initial load.",
            "Q: Can I use this on multiple devices? A: Yes, export from one device and import to another.",
            "Q: Is there a mobile app? A: The web app works great on mobile browsers.",
            "Q: What happens if I clear my browser data? A: Your content will be lost unless you have backups."
          ]
        },
        {
          title: "Pricing & Costs 💰",
          steps: [
            "Q: How much does this cost? A: The app is free! You only pay for OpenAI API usage.",
            "Q: What are OpenAI API costs? A: Typically $0.01-0.05 per content generation.",
            "Q: Can I use it without OpenAI? A: Yes, but you'll miss AI content generation features.",
            "Q: Are there any hidden fees? A: None! No subscription, no storage fees, completely free.",
            "Q: Will pricing change? A: The app will remain free forever."
          ]
        },
        {
          title: "Content & Ethics 📋",
          steps: [
            "Q: Is AI content ethical for therapists? A: Yes, when reviewed and customized by you.",
            "Q: Should I edit AI content? A: Always review and personalize before posting.",
            "Q: Can I share content with colleagues? A: Yes, export your vault or calendar to share.",
            "Q: What about HIPAA compliance? A: Never include client information in any content.",
            "Q: How do I maintain professional boundaries? A: AI includes appropriate disclaimers and guidelines."
          ]
        },
        {
          title: "Technical Support 🛠️",
          steps: [
            "Q: Who do I contact for help? A: Check this tutorial first, then contact support.",
            "Q: Can I request new features? A: Yes! We love feedback and suggestions.",
            "Q: Is my browser supported? A: Modern browsers (Chrome, Firefox, Safari, Edge) work best.",
            "Q: Can I backup my data? A: Yes! Use Settings > Data Management > Export All Data.",
            "Q: What if I accidentally delete something? A: Check auto-backups or restore from your exports."
          ]
        }
      ]
    }
  };

  const filteredSections = sections.filter(section => {
    const matchesSearch = section.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorials[section.id]?.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' ||
      (selectedCategory === 'getting-started' && ['overview', 'troubleshooting', 'faq'].includes(section.id)) ||
      (selectedCategory === 'features' && ['brand-builder', 'content-calendar', 'post-generator', 'template-gallery', 'content-vault'].includes(section.id)) ||
      (selectedCategory === 'technical' && ['data-management', 'troubleshooting'].includes(section.id));
    
    return matchesSearch && matchesCategory;
  });

  const openChatGPT = () => {
    window.open('https://chat.openai.com/', '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <SafeIcon icon={FiBookOpen} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Tutorials & FAQ</h2>
                  <p className="text-sm text-gray-600">Complete guide to using Clarity Content Studio</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <SafeIcon icon={FiX} className="w-6 h-6" />
              </button>
            </div>

            <div className="flex h-[calc(90vh-140px)]">
              {/* Sidebar */}
              <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto">
                {/* Search and Filter */}
                <div className="p-4 border-b border-gray-200 space-y-3">
                  <div className="relative">
                    <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search tutorials..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="getting-started">Getting Started</option>
                    <option value="features">Features</option>
                    <option value="technical">Technical</option>
                  </select>
                </div>

                {/* Navigation */}
                <nav className="p-4">
                  <div className="space-y-2">
                    {filteredSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors text-left ${
                          activeSection === section.id
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <SafeIcon icon={section.icon} className="w-4 h-4 mr-3 flex-shrink-0" />
                        <span className="flex-1">{section.label}</span>
                        {activeSection === section.id && (
                          <SafeIcon icon={FiChevronRight} className="w-4 h-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </nav>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {tutorials[activeSection] && (
                  <div className="p-6">
                    <motion.div
                      key={activeSection}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                          {tutorials[activeSection].title}
                        </h1>
                        <p className="text-gray-600">
                          {tutorials[activeSection].description}
                        </p>
                      </div>

                      {/* Special Template Gallery Instructions */}
                      {activeSection === 'template-gallery' && (
                        <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200 mb-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            🚀 Quick Start: Create Your First Viral Image
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-white p-3 rounded-lg border border-green-200">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                                <h4 className="font-semibold text-gray-900 text-sm">Generate</h4>
                              </div>
                              <p className="text-xs text-gray-600">Pick a template → Click "Generate Unique Prompt"</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-green-200">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                                <h4 className="font-semibold text-gray-900 text-sm">Copy & Open</h4>
                              </div>
                              <p className="text-xs text-gray-600">Copy prompt → Click "Open ChatGPT"</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-green-200">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                                <h4 className="font-semibold text-gray-900 text-sm">Create</h4>
                              </div>
                              <p className="text-xs text-gray-600">Paste in ChatGPT → Get your viral image!</p>
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <Button size="sm" icon={FiExternalLink} onClick={openChatGPT}>
                              Open ChatGPT Now
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setActiveSection('template-gallery')}>
                              View Full Tutorial
                            </Button>
                          </div>
                        </Card>
                      )}

                      <div className="space-y-6">
                        {tutorials[activeSection].content.map((section, index) => (
                          <Card key={index} className="p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                {index + 1}
                              </span>
                              {section.title}
                            </h2>
                            <div className="space-y-3">
                              {section.steps.map((step, stepIndex) => (
                                <div key={stepIndex} className="flex items-start space-x-3">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <p className="text-gray-700 leading-relaxed">{step}</p>
                                </div>
                              ))}
                            </div>
                          </Card>
                        ))}
                      </div>

                      {/* Quick Actions */}
                      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                        <h3 className="font-semibold text-gray-900 mb-3">🚀 Ready to get started?</h3>
                        <div className="flex flex-wrap gap-3">
                          <Button
                            onClick={() => {
                              onClose();
                              // Could navigate to specific page here
                            }}
                            variant="outline"
                            size="sm"
                          >
                            Try it now
                          </Button>
                          <Button
                            onClick={() => setActiveSection('faq')}
                            variant="outline"
                            size="sm"
                            icon={FiHelpCircle}
                          >
                            View FAQ
                          </Button>
                          {activeSection === 'template-gallery' && (
                            <Button
                              onClick={openChatGPT}
                              variant="outline"
                              size="sm"
                              icon={FiExternalLink}
                            >
                              Open ChatGPT
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TutorialModal;