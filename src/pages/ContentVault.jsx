import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const { FiBookOpen, FiSearch, FiFilter, FiHeart, FiCopy, FiEdit3, FiInstagram, FiLinkedin, FiYoutube, FiPlus, FiTag, FiClock } = FiIcons;

const ContentVault = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newIdea, setNewIdea] = useState({
    title: '',
    content: '',
    platform: '',
    category: '',
    tags: ''
  });
  const [savedIdeas, setSavedIdeas] = useState([]);

  const categories = [
    { value: 'all', label: 'All Content' },
    { value: 'tips', label: 'Tips & Advice' },
    { value: 'quotes', label: 'Inspirational Quotes' },
    { value: 'educational', label: 'Educational' },
    { value: 'personal', label: 'Personal Stories' },
    { value: 'promotional', label: 'Promotional' },
    { value: 'seasonal', label: 'Seasonal' },
    { value: 'generated', label: 'AI Generated' }
  ];

  const platforms = [
    { value: 'all', label: 'All Platforms' },
    { value: 'instagram', label: 'Instagram', icon: FiInstagram },
    { value: 'linkedin', label: 'LinkedIn', icon: FiLinkedin },
    { value: 'tiktok', label: 'TikTok', icon: FiYoutube },
    { value: 'facebook', label: 'Facebook', icon: FiYoutube }
  ];

  // Load ideas from localStorage on component mount
  useEffect(() => {
    const savedIdeasFromStorage = localStorage.getItem('contentIdeas');
    if (savedIdeasFromStorage) {
      setSavedIdeas(JSON.parse(savedIdeasFromStorage));
    } else {
      // Initialize with sample data
      const initialIdeas = [
        {
          id: 1,
          title: '5 Quick Anxiety Relief Techniques',
          content: 'Share 5 simple breathing exercises and grounding techniques that can help manage anxiety in the moment. Include visual demonstrations and encourage followers to save for later use.',
          platform: 'instagram',
          category: 'tips',
          tags: ['anxiety', 'breathing', 'grounding', 'quick-relief'],
          dateAdded: '2024-01-15',
          isFavorite: true
        },
        {
          id: 2,
          title: 'Mental Health Monday Motivation',
          content: 'Create an inspiring quote about resilience and recovery. Use calming colors and share a personal reflection about the importance of seeking help when needed.',
          platform: 'linkedin',
          category: 'quotes',
          tags: ['motivation', 'monday', 'resilience', 'recovery'],
          dateAdded: '2024-01-14',
          isFavorite: false
        },
        {
          id: 3,
          title: 'Understanding Therapy Myths',
          content: 'Educational carousel debunking common misconceptions about therapy. Address stigma and provide factual information about what therapy actually involves.',
          platform: 'instagram',
          category: 'educational',
          tags: ['therapy', 'myths', 'education', 'stigma'],
          dateAdded: '2024-01-13',
          isFavorite: true
        }
      ];
      setSavedIdeas(initialIdeas);
      localStorage.setItem('contentIdeas', JSON.stringify(initialIdeas));
    }
  }, []);

  // Save ideas to localStorage whenever savedIdeas changes
  useEffect(() => {
    localStorage.setItem('contentIdeas', JSON.stringify(savedIdeas));
  }, [savedIdeas]);

  const filteredIdeas = savedIdeas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || idea.category === selectedFilter;
    const matchesPlatform = selectedPlatform === 'all' || idea.platform === selectedPlatform;
    return matchesSearch && matchesFilter && matchesPlatform;
  });

  const toggleFavorite = (id) => {
    setSavedIdeas(prev => prev.map(idea => 
      idea.id === id ? { ...idea, isFavorite: !idea.isFavorite } : idea
    ));
    toast.success('Favorite updated!');
  };

  const copyContent = (content) => {
    navigator.clipboard.writeText(content);
    toast.success('Content copied to clipboard!');
  };

  const addNewIdea = () => {
    if (!newIdea.title || !newIdea.content) {
      toast.error('Please fill in title and content');
      return;
    }

    const idea = {
      id: Date.now(),
      ...newIdea,
      tags: newIdea.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      dateAdded: new Date().toISOString().split('T')[0],
      isFavorite: false
    };

    setSavedIdeas(prev => [idea, ...prev]);
    setShowAddModal(false);
    setNewIdea({ title: '', content: '', platform: '', category: '', tags: '' });
    toast.success('Idea added to vault!');
  };

  const deleteIdea = (id) => {
    const deletedIdea = savedIdeas.find(idea => idea.id === id);
    setSavedIdeas(prev => prev.filter(idea => idea.id !== id));
    toast.success('Idea deleted!');
  };

  const getPlatformIcon = (platform) => {
    const platformData = platforms.find(p => p.value === platform);
    return platformData?.icon || FiBookOpen;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Vault</h1>
          <p className="text-gray-600">Your library of saved content ideas and inspiration</p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          icon={FiPlus}
        >
          Add New Idea
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64">
            <Input
              placeholder="Search ideas, content, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={FiSearch}
            />
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
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
      </Card>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.map((idea, index) => (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card hover className="h-full">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <SafeIcon
                      icon={getPlatformIcon(idea.platform)}
                      className="w-5 h-5 text-primary-600"
                    />
                    <span className="text-sm font-medium text-gray-600 capitalize">
                      {idea.platform}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleFavorite(idea.id)}
                    className={`p-1 rounded-full transition-colors ${
                      idea.isFavorite
                        ? 'text-red-500 hover:text-red-600'
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <SafeIcon icon={FiHeart} className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {idea.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {idea.content}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {idea.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {idea.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{idea.tags.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiClock} className="w-4 h-4" />
                    <span>{idea.dateAdded}</span>
                  </div>
                  <span className="capitalize px-2 py-1 bg-gray-100 rounded-full text-xs">
                    {idea.category}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyContent(idea.content)}
                    icon={FiCopy}
                    className="flex-1"
                  >
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteIdea(idea.id)}
                    icon={FiEdit3}
                    className="flex-1"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredIdeas.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiBookOpen} className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No ideas found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Start building your content vault'}
          </p>
          <Button
            onClick={() => setShowAddModal(true)}
            icon={FiPlus}
          >
            Add Your First Idea
          </Button>
        </div>
      )}

      {/* Add New Idea Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add New Content Idea
            </h3>
            <div className="space-y-4">
              <Input
                label="Title"
                value={newIdea.title}
                onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                placeholder="Enter a catchy title for your idea"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content Description
                </label>
                <textarea
                  value={newIdea.content}
                  onChange={(e) => setNewIdea({ ...newIdea, content: e.target.value })}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Describe your content idea in detail..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Platform
                  </label>
                  <select
                    value={newIdea.platform}
                    onChange={(e) => setNewIdea({ ...newIdea, platform: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select platform</option>
                    {platforms.slice(1).map(platform => (
                      <option key={platform.value} value={platform.value}>
                        {platform.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newIdea.category}
                    onChange={(e) => setNewIdea({ ...newIdea, category: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select category</option>
                    {categories.slice(1).map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Input
                label="Tags (comma-separated)"
                value={newIdea.tags}
                onChange={(e) => setNewIdea({ ...newIdea, tags: e.target.value })}
                placeholder="anxiety, tips, breathing, wellness"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={addNewIdea}>
                Add Idea
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ContentVault;