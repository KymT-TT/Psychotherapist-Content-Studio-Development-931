import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const { 
  FiImage, FiInstagram, FiLinkedin, FiYoutube, FiHeart, FiDownload, 
  FiFilter, FiGrid, FiList, FiExternalLink, FiSettings, FiCheck, FiX 
} = FiIcons;

const TemplateGallery = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [canvaConnected, setCanvaConnected] = useState(false);
  const [showCanvaModal, setShowCanvaModal] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Check Canva connection status on mount
  useEffect(() => {
    const canvaStatus = localStorage.getItem('canvaConnected');
    setCanvaConnected(canvaStatus === 'true');
    
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
    { value: 'quotes', label: 'Inspirational Quotes' },
    { value: 'tips', label: 'Tips & Advice' },
    { value: 'educational', label: 'Educational' },
    { value: 'personal', label: 'Personal Stories' },
    { value: 'promotional', label: 'Promotional' }
  ];

  const platforms = [
    { value: 'all', label: 'All Platforms' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'facebook', label: 'Facebook' }
  ];

  const templates = [
    {
      id: 1,
      title: 'Mental Health Awareness Quote',
      category: 'quotes',
      platform: 'instagram',
      format: 'Square Post',
      description: 'Calming design with inspirational quote about mental health',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      colors: ['#4F46E5', '#E0E7FF'],
      tags: ['mental health', 'quotes', 'inspiration'],
      canvaUrl: 'https://www.canva.com/design/DAFxxx/create?category=tACZCvjI6Hk&search=mental%20health%20quote',
      alternativeUrl: 'https://www.figma.com/community/file/mental-health-templates'
    },
    {
      id: 2,
      title: 'Self-Care Sunday Tips',
      category: 'tips',
      platform: 'instagram',
      format: 'Carousel',
      description: 'Multi-slide template for sharing self-care practices',
      image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=400&fit=crop',
      colors: ['#10B981', '#D1FAE5'],
      tags: ['self-care', 'tips', 'wellness'],
      canvaUrl: 'https://www.canva.com/design/DAFxxx/create?category=tACZCvjI6Hk&search=self%20care%20carousel',
      alternativeUrl: 'https://www.figma.com/community/file/self-care-templates'
    },
    {
      id: 3,
      title: 'Anxiety Management Infographic',
      category: 'educational',
      platform: 'linkedin',
      format: 'Infographic',
      description: 'Professional infographic about anxiety coping strategies',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
      colors: ['#F59E0B', '#FEF3C7'],
      tags: ['anxiety', 'education', 'coping'],
      canvaUrl: 'https://www.canva.com/design/DAFxxx/create?category=tACZCvjI6Hk&search=anxiety%20infographic',
      alternativeUrl: 'https://www.figma.com/community/file/anxiety-management-templates'
    },
    {
      id: 4,
      title: 'Therapy Session Reminder',
      category: 'promotional',
      platform: 'instagram',
      format: 'Story',
      description: 'Gentle reminder template for therapy appointments',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
      colors: ['#8B5CF6', '#F3E8FF'],
      tags: ['appointment', 'reminder', 'practice'],
      canvaUrl: 'https://www.canva.com/design/DAFxxx/create?category=tACZCvjI6Hk&search=therapy%20reminder',
      alternativeUrl: 'https://www.figma.com/community/file/therapy-reminder-templates'
    },
    {
      id: 5,
      title: 'Mindfulness Monday',
      category: 'tips',
      platform: 'linkedin',
      format: 'Text Post',
      description: 'Weekly mindfulness practice template',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      colors: ['#06B6D4', '#CFFAFE'],
      tags: ['mindfulness', 'weekly', 'practice'],
      canvaUrl: 'https://www.canva.com/design/DAFxxx/create?category=tACZCvjI6Hk&search=mindfulness%20monday',
      alternativeUrl: 'https://www.figma.com/community/file/mindfulness-templates'
    },
    {
      id: 6,
      title: 'Client Success Story',
      category: 'personal',
      platform: 'instagram',
      format: 'Square Post',
      description: 'Template for sharing anonymous client progress stories',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
      colors: ['#EF4444', '#FEE2E2'],
      tags: ['success', 'story', 'progress'],
      canvaUrl: 'https://www.canva.com/design/DAFxxx/create?category=tACZCvjI6Hk&search=success%20story',
      alternativeUrl: 'https://www.figma.com/community/file/success-story-templates'
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesFilter = selectedFilter === 'all' || template.category === selectedFilter;
    const matchesPlatform = selectedPlatform === 'all' || template.platform === selectedPlatform;
    return matchesFilter && matchesPlatform;
  });

  const connectCanva = () => {
    // Simulate Canva connection process
    setShowCanvaModal(true);
  };

  const handleCanvaConnection = (success) => {
    if (success) {
      setCanvaConnected(true);
      localStorage.setItem('canvaConnected', 'true');
      toast.success('Successfully connected to Canva!');
    } else {
      toast.error('Failed to connect to Canva. Please try again.');
    }
    setShowCanvaModal(false);
  };

  const disconnectCanva = () => {
    setCanvaConnected(false);
    localStorage.setItem('canvaConnected', 'false');
    toast.success('Disconnected from Canva');
  };

  const openTemplate = (template) => {
    if (canvaConnected) {
      // Open Canva with template
      window.open(template.canvaUrl, '_blank');
      toast.success(`Opening ${template.title} in Canva...`);
    } else {
      // Show connection modal
      toast.error('Please connect to Canva first');
      setShowCanvaModal(true);
    }
  };

  const openAlternative = (template) => {
    // Open alternative design tool
    window.open(template.alternativeUrl, '_blank');
    toast.success(`Opening ${template.title} in alternative design tool...`);
  };

  const downloadTemplate = (template) => {
    // Simulate template download
    toast.success(`Downloading ${template.title}...`);
    // In a real app, this would download the template file
  };

  const toggleFavorite = (templateId) => {
    const isFavorite = favorites.includes(templateId);
    if (isFavorite) {
      setFavorites(prev => prev.filter(id => id !== templateId));
      toast.success('Removed from favorites');
    } else {
      setFavorites(prev => [...prev, templateId]);
      toast.success('Added to favorites');
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram': return FiInstagram;
      case 'linkedin': return FiLinkedin;
      case 'tiktok': return FiYoutube;
      case 'facebook': return FiYoutube;
      default: return FiImage;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Template Gallery</h1>
        <p className="text-gray-600">
          Professional design templates tailored for mental health professionals
        </p>
      </div>

      {/* Canva Connection Status */}
      <Card className={`p-4 ${canvaConnected ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${canvaConnected ? 'bg-green-500' : 'bg-yellow-500'}`} />
            <div>
              <p className="font-medium text-gray-900">
                {canvaConnected ? 'Connected to Canva' : 'Canva Not Connected'}
              </p>
              <p className="text-sm text-gray-600">
                {canvaConnected 
                  ? 'You can now open templates directly in Canva' 
                  : 'Connect to Canva for seamless template editing'
                }
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            {canvaConnected ? (
              <Button variant="outline" size="sm" onClick={disconnectCanva}>
                Disconnect
              </Button>
            ) : (
              <Button size="sm" onClick={connectCanva}>
                Connect Canva
              </Button>
            )}
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
              className={`p-2 rounded-lg ${
                viewMode === 'grid' 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <SafeIcon icon={FiGrid} className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list' 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <SafeIcon icon={FiList} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Card>

      {/* Templates Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card hover className="overflow-hidden">
              <div className="relative">
                <img
                  src={template.image}
                  alt={template.title}
                  className="w-full h-48 object-cover"
                />
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
                  <span className="px-2 py-1 bg-black bg-opacity-50 text-white text-xs rounded-full">
                    {template.format}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{template.title}</h3>
                  <SafeIcon 
                    icon={getPlatformIcon(template.platform)} 
                    className="w-5 h-5 text-gray-400" 
                  />
                </div>
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                
                <div className="flex items-center space-x-2 mb-4">
                  {template.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={() => openTemplate(template)}
                    className="flex-1"
                    icon={FiExternalLink}
                    disabled={!canvaConnected}
                  >
                    {canvaConnected ? 'Open in Canva' : 'Connect Canva'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => openAlternative(template)}
                    icon={FiExternalLink}
                    size="sm"
                  >
                    Alt
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => downloadTemplate(template)}
                    icon={FiDownload}
                    size="sm"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiImage} className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more templates</p>
        </div>
      )}

      {/* Canva Connection Modal */}
      {showCanvaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiExternalLink} className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Connect to Canva
              </h3>
              <p className="text-gray-600">
                Connect your Canva account to open templates directly and customize them for your practice.
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-800">Direct template access</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-800">Customizable designs</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-800">Brand consistency tools</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowCanvaModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleCanvaConnection(true)}
                className="flex-1"
              >
                Connect Now
              </Button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Don't have Canva? You can still use alternative design tools or download templates directly.
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Design Tools Info */}
      <Card className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
            <SafeIcon icon={FiSettings} className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Multiple Design Options
            </h3>
            <p className="text-gray-600 mb-3">
              Choose from various design tools to customize your templates. Each template works with Canva, Figma, and other popular design platforms.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={connectCanva}>
                {canvaConnected ? 'Canva Connected' : 'Connect Canva'}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.open('https://figma.com', '_blank')}
              >
                Try Figma
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TemplateGallery;