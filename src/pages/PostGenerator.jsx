import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Select from '../components/UI/Select';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { generatePostContent } from '../lib/openai';
import toast from 'react-hot-toast';

const { FiEdit3, FiInstagram, FiLinkedin, FiYoutube, FiCopy, FiRefreshCw, FiImage, FiVideo, FiFileText, FiMessageSquare, FiBookOpen } = FiIcons;

const PostGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedTone, setSelectedTone] = useState('');
  const [topic, setTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState(null);

  const formats = [
    {
      id: 'carousel',
      name: 'Carousel Post',
      icon: FiImage,
      description: 'Multi-slide educational content',
      platforms: ['instagram', 'linkedin']
    },
    {
      id: 'reel',
      name: 'Reel/Video',
      icon: FiVideo,
      description: 'Short-form video content',
      platforms: ['instagram', 'tiktok']
    },
    {
      id: 'story',
      name: 'Story',
      icon: FiMessageSquare,
      description: 'Temporary story content',
      platforms: ['instagram', 'linkedin']
    },
    {
      id: 'text',
      name: 'Text Post',
      icon: FiFileText,
      description: 'Text-based content',
      platforms: ['linkedin', 'facebook']
    }
  ];

  const platforms = [
    { value: 'instagram', label: 'Instagram', icon: FiInstagram },
    { value: 'linkedin', label: 'LinkedIn', icon: FiLinkedin },
    { value: 'tiktok', label: 'TikTok', icon: FiYoutube },
    { value: 'facebook', label: 'Facebook', icon: FiYoutube }
  ];

  const tones = [
    { value: 'professional', label: 'Professional & Authoritative' },
    { value: 'warm', label: 'Warm & Nurturing' },
    { value: 'casual', label: 'Casual & Approachable' },
    { value: 'inspiring', label: 'Inspiring & Motivational' },
    { value: 'educational', label: 'Educational & Informative' }
  ];

  const contentTopics = [
    'Anxiety management techniques',
    'Self-care practices',
    'Relationship communication',
    'Stress reduction strategies',
    'Mindfulness and meditation',
    'Setting healthy boundaries',
    'Dealing with depression',
    'Building self-esteem',
    'Coping with trauma',
    'Work-life balance',
    'Emotional regulation',
    'Sleep hygiene',
    'Grief and loss',
    'Parenting challenges',
    'Social anxiety tips'
  ];

  const generatePost = async () => {
    if (!selectedFormat || !selectedPlatform || !selectedTone || !topic) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const format = formats.find(f => f.id === selectedFormat);
      const content = await generatePostContent(format.name, selectedPlatform, selectedTone, topic);
      
      setGeneratedContent({
        format: format.name,
        platform: selectedPlatform,
        content: content,
        topic: topic
      });

      toast.success('Content generated successfully!');
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Failed to generate content. Please check your API key.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Content copied to clipboard!');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Post Generator</h1>
        <p className="text-gray-600">
          Create engaging, ethical content tailored to your practice and audience
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Content Settings</h2>
          <div className="space-y-6">
            {/* Format Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Content Format
              </label>
              <div className="grid grid-cols-1 gap-3">
                {formats.map(format => (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className={`p-4 border rounded-xl text-left transition-all ${
                      selectedFormat === format.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={format.icon} className="w-5 h-5 text-primary-600" />
                      <div>
                        <h3 className="font-medium text-gray-900">{format.name}</h3>
                        <p className="text-sm text-gray-600">{format.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Selection */}
            <Select
              label="Platform"
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              options={platforms}
              placeholder="Select platform"
            />

            {/* Tone Selection */}
            <Select
              label="Tone"
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
              options={tones}
              placeholder="Select tone"
            />

            {/* Topic Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topic
              </label>
              <div className="space-y-2">
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select a topic</option>
                  {contentTopics.map(topicOption => (
                    <option key={topicOption} value={topicOption}>
                      {topicOption}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500">Or enter a custom topic below:</p>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter custom topic"
                />
              </div>
            </div>

            <Button
              onClick={generatePost}
              loading={loading}
              className="w-full"
              icon={FiEdit3}
              disabled={!selectedFormat || !selectedPlatform || !selectedTone || !topic}
            >
              Generate Content
            </Button>
          </div>
        </Card>

        {/* Output Panel */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Generated Content</h2>
            {generatedContent && (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(generatedContent.content)}
                  icon={FiCopy}
                >
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generatePost}
                  icon={FiRefreshCw}
                  loading={loading}
                >
                  Regenerate
                </Button>
              </div>
            )}
          </div>

          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
                <p className="text-gray-600">Generating your content...</p>
              </div>
            </div>
          )}

          {generatedContent && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <SafeIcon
                  icon={formats.find(f => f.id === selectedFormat)?.icon}
                  className="w-5 h-5 text-primary-600"
                />
                <div>
                  <p className="font-medium text-gray-900">{generatedContent.format}</p>
                  <p className="text-sm text-gray-600">
                    {generatedContent.platform} • {generatedContent.topic}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                  {generatedContent.content}
                </pre>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(generatedContent.content)}
                  icon={FiCopy}
                >
                  Copy All
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    // Save to content vault functionality
                    const savedIdeas = JSON.parse(localStorage.getItem('contentIdeas') || '[]');
                    const newIdea = {
                      id: Date.now(),
                      title: `${generatedContent.format} - ${generatedContent.topic}`,
                      content: generatedContent.content,
                      platform: generatedContent.platform,
                      category: 'generated',
                      tags: [generatedContent.topic.toLowerCase().replace(/\s+/g, '-')],
                      dateAdded: new Date().toISOString().split('T')[0],
                      isFavorite: false
                    };
                    savedIdeas.unshift(newIdea);
                    localStorage.setItem('contentIdeas', JSON.stringify(savedIdeas));
                    toast.success('Content saved to vault!');
                  }}
                  icon={FiBookOpen}
                >
                  Save to Vault
                </Button>
              </div>
            </motion.div>
          )}

          {!generatedContent && !loading && (
            <div className="text-center py-12 text-gray-500">
              <SafeIcon icon={FiEdit3} className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">Ready to Create</p>
              <p>Select your preferences and generate engaging content for your practice</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PostGenerator;