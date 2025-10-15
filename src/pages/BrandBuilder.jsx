import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Select from '../components/UI/Select';
import TextArea from '../components/UI/TextArea';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const { FiUser, FiTarget, FiHeart, FiVoicemail, FiDownload, FiSave, FiUpload, FiPlus, FiX, FiCopy, FiEye, FiRefreshCw, FiPalette, FiTrash2, FiAlertTriangle, FiRotateCcw } = FiIcons;

const BrandBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showBrandStatement, setShowBrandStatement] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [formData, setFormData] = useState({
    // Practice Info
    practiceName: '',
    practiceType: '',
    yearsExperience: '',
    location: '',
    // Brand Identity Core
    idealClientPersona: '',
    clientPainPoints: '',
    desiredOutcome: '',
    uniqueApproach: '',
    brandStatement: '',
    // Brand Voice & Values
    brandTone: '',
    brandValues: '',
    contentGoals: '',
    contentPillars: '',
    // Visual Identity
    primaryColor: '',
    secondaryColor: '',
    accentColor: '',
    colorMood: '',
    visualStyle: '',
    // Platform Strategy
    primaryPlatforms: [],
    postingFrequency: '',
    targetAudience: '',
  });

  const steps = [
    { title: 'Practice Information', icon: FiUser, description: 'Tell us about your practice' },
    { title: 'Brand Identity Core', icon: FiTarget, description: 'Define your unique positioning' },
    { title: 'Visual Identity', icon: FiPalette, description: 'Choose your brand colors & style' },
    { title: 'Brand Voice & Values', icon: FiHeart, description: 'Establish your brand personality' },
    { title: 'Content Strategy', icon: FiVoicemail, description: 'Plan your content approach' },
    { title: 'Brand Summary', icon: FiEye, description: 'Review and finalize your brand' }
  ];

  const colorPresets = [
    { name: 'Calming Blue', primary: '#4A90E2', secondary: '#7BB3F0', accent: '#2E5B8A', mood: 'Professional and trustworthy' },
    { name: 'Healing Green', primary: '#6AB04C', secondary: '#95C96B', accent: '#4A7C35', mood: 'Growth and healing' },
    { name: 'Warm Coral', primary: '#F8B195', secondary: '#F67280', accent: '#C44569', mood: 'Warm and nurturing' },
    { name: 'Gentle Purple', primary: '#A8A3E8', secondary: '#C7C2F0', accent: '#7B6ED6', mood: 'Mindful and spiritual' },
    { name: 'Earthy Sage', primary: '#87A96B', secondary: '#A8C68F', accent: '#6B8E4E', mood: 'Grounded and natural' },
    { name: 'Soft Teal', primary: '#4ECDC4', secondary: '#7ED6CC', accent: '#3BA99C', mood: 'Calm and refreshing' }
  ];

  const visualStyles = [
    { value: 'minimalist', label: 'Minimalist & Clean', description: 'Simple, uncluttered designs with lots of white space' },
    { value: 'warm', label: 'Warm & Approachable', description: 'Friendly, welcoming designs with soft elements' },
    { value: 'professional', label: 'Professional & Authoritative', description: 'Clean, structured layouts that build trust' },
    { value: 'organic', label: 'Organic & Natural', description: 'Nature-inspired with flowing, organic shapes' },
    { value: 'modern', label: 'Modern & Trendy', description: 'Contemporary designs with bold typography' }
  ];

  // Load existing brand data on component mount
  useEffect(() => {
    const savedBrand = localStorage.getItem('brandFoundation');
    if (savedBrand) {
      const brandData = JSON.parse(savedBrand);
      setFormData(prev => ({ ...prev, ...brandData }));
      // If complete brand exists, show summary step
      if (brandData.brandStatement && brandData.primaryColor) {
        setCurrentStep(5);
      }
    }
  }, []);

  // Generate brand statement automatically
  useEffect(() => {
    if (formData.idealClientPersona && formData.clientPainPoints && formData.desiredOutcome && formData.uniqueApproach) {
      const statement = `I help ${formData.idealClientPersona} go from ${formData.clientPainPoints} to ${formData.desiredOutcome} by ${formData.uniqueApproach}.`;
      setFormData(prev => ({ ...prev, brandStatement: statement }));
    }
  }, [formData.idealClientPersona, formData.clientPainPoints, formData.desiredOutcome, formData.uniqueApproach]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleColorPreset = (preset) => {
    setFormData(prev => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
      colorMood: preset.mood
    }));
    toast.success(`Applied ${preset.name} color palette!`);
  };

  const handlePlatformChange = (platform) => {
    setFormData(prev => ({
      ...prev,
      primaryPlatforms: prev.primaryPlatforms.includes(platform)
        ? prev.primaryPlatforms.filter(p => p !== platform)
        : [...prev.primaryPlatforms, platform]
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Add completion timestamp
      const brandData = {
        ...formData,
        completedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };

      localStorage.setItem('brandFoundation', JSON.stringify(brandData));

      // Also save to user settings for integration
      const userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
      const updatedSettings = {
        ...userSettings,
        practiceName: formData.practiceName,
        practiceType: formData.practiceType,
        brandColors: {
          primary: formData.primaryColor,
          secondary: formData.secondaryColor,
          accent: formData.accentColor
        },
        brandStatement: formData.brandStatement,
        contentPillars: formData.contentPillars,
        targetAudience: formData.targetAudience
      };
      localStorage.setItem('userSettings', JSON.stringify(updatedSettings));

      toast.success('🎉 Brand foundation saved successfully!');
    } catch (error) {
      toast.error('❌ Failed to save brand foundation');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setShowResetModal(true);
  };

  const confirmReset = () => {
    // Clear all form data
    setFormData({
      practiceName: '',
      practiceType: '',
      yearsExperience: '',
      location: '',
      idealClientPersona: '',
      clientPainPoints: '',
      desiredOutcome: '',
      uniqueApproach: '',
      brandStatement: '',
      brandTone: '',
      brandValues: '',
      contentGoals: '',
      contentPillars: '',
      primaryColor: '',
      secondaryColor: '',
      accentColor: '',
      colorMood: '',
      visualStyle: '',
      primaryPlatforms: [],
      postingFrequency: '',
      targetAudience: '',
    });

    // Remove from localStorage
    localStorage.removeItem('brandFoundation');
    
    // Reset to first step
    setCurrentStep(0);
    setShowResetModal(false);
    
    toast.success('🔄 Brand foundation reset! Starting fresh...');
  };

  const downloadBrandGuide = () => {
    const brandGuide = `
# BRAND FOUNDATION GUIDE
Generated on: ${new Date().toLocaleDateString()}

## PRACTICE INFORMATION
Practice Name: ${formData.practiceName}
Practice Type: ${formData.practiceType}
Years of Experience: ${formData.yearsExperience}
Location: ${formData.location}

## BRAND IDENTITY CORE
Brand Statement: ${formData.brandStatement}
Target Persona: ${formData.idealClientPersona}
Pain Points: ${formData.clientPainPoints}
Desired Outcome: ${formData.desiredOutcome}
Unique Approach: ${formData.uniqueApproach}

## VISUAL IDENTITY
Primary Color: ${formData.primaryColor}
Secondary Color: ${formData.secondaryColor}
Accent Color: ${formData.accentColor}
Color Mood: ${formData.colorMood}
Visual Style: ${formData.visualStyle}

## BRAND VOICE & VALUES
Brand Tone: ${formData.brandTone}
Core Values: ${formData.brandValues}
Content Goals: ${formData.contentGoals}

## CONTENT STRATEGY
Content Pillars: ${formData.contentPillars}
Primary Platforms: ${formData.primaryPlatforms.join(', ')}
Posting Frequency: ${formData.postingFrequency}
Target Audience: ${formData.targetAudience}

---
This brand foundation will be automatically integrated into all content generation throughout the app.
    `;

    const blob = new Blob([brandGuide], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.practiceName || 'Brand'}-Foundation-Guide.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('📄 Brand guide downloaded!');
  };

  const handleUploadBrand = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        // Try to parse as JSON first
        let brandData;
        if (file.name.endsWith('.json')) {
          brandData = JSON.parse(content);
        } else {
          // Parse text file format
          toast.info('📝 Text file upload - please manually review and update fields');
          return;
        }

        setFormData(prev => ({ ...prev, ...brandData }));
        setShowUploadModal(false);
        toast.success('✅ Brand foundation uploaded successfully!');
      } catch (error) {
        toast.error('❌ Failed to parse brand file. Please check format.');
      }
    };
    reader.readAsText(file);
  };

  const exportBrandJSON = () => {
    const brandData = {
      ...formData,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(brandData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.practiceName || 'Brand'}-Foundation.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('💾 Brand foundation exported as JSON!');
  };

  const copyBrandStatement = () => {
    navigator.clipboard.writeText(formData.brandStatement);
    toast.success('📋 Brand statement copied to clipboard!');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <Input
              label="Practice Name"
              value={formData.practiceName}
              onChange={(e) => handleInputChange('practiceName', e.target.value)}
              placeholder="Your Practice Name"
            />
            <Select
              label="Practice Type"
              value={formData.practiceType}
              onChange={(e) => handleInputChange('practiceType', e.target.value)}
              options={[
                { value: 'solo', label: 'Solo Practice' },
                { value: 'group', label: 'Group Practice' },
                { value: 'clinic', label: 'Clinic/Center' },
                { value: 'hospital', label: 'Hospital Setting' },
                { value: 'telehealth', label: 'Telehealth Only' }
              ]}
            />
            <Select
              label="Years of Experience"
              value={formData.yearsExperience}
              onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
              options={[
                { value: '0-2', label: '0-2 years' },
                { value: '3-5', label: '3-5 years' },
                { value: '6-10', label: '6-10 years' },
                { value: '10+', label: '10+ years' }
              ]}
            />
            <Input
              label="Location/Service Area"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="City, State or 'Online Only'"
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-blue-900 mb-2">✨ Creating Your Brand Statement</h4>
              <p className="text-sm text-blue-800">
                We'll help you create the powerful statement: "I help [persona] go from [pain] to [outcome] by [how you do it]."
              </p>
            </div>

            <Input
              label="Ideal Client Persona"
              value={formData.idealClientPersona}
              onChange={(e) => handleInputChange('idealClientPersona', e.target.value)}
              placeholder="e.g., overwhelmed working mothers, anxious young professionals"
            />

            <TextArea
              label="Client Pain Points (What they're struggling with)"
              value={formData.clientPainPoints}
              onChange={(e) => handleInputChange('clientPainPoints', e.target.value)}
              placeholder="e.g., feeling burnt out and disconnected from their families"
              rows={3}
            />

            <TextArea
              label="Desired Outcome (What they want to achieve)"
              value={formData.desiredOutcome}
              onChange={(e) => handleInputChange('desiredOutcome', e.target.value)}
              placeholder="e.g., feeling balanced, present, and confident in their relationships"
              rows={3}
            />

            <TextArea
              label="Your Unique Approach (How you help them get there)"
              value={formData.uniqueApproach}
              onChange={(e) => handleInputChange('uniqueApproach', e.target.value)}
              placeholder="e.g., evidence-based mindfulness techniques and personalized stress management strategies"
              rows={3}
            />

            {formData.brandStatement && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-green-900">🎯 Your Brand Statement</h4>
                  <Button variant="outline" size="sm" onClick={copyBrandStatement} icon={FiCopy}>
                    Copy
                  </Button>
                </div>
                <p className="text-green-800 font-medium">{formData.brandStatement}</p>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Choose Your Brand Colors</h4>
              
              {/* Color Presets */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Quick Color Palettes
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => handleColorPreset(preset)}
                      className="p-4 border border-gray-300 rounded-lg hover:border-primary-500 transition-colors text-left"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex space-x-1">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.primary }}></div>
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.secondary }}></div>
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.accent }}></div>
                        </div>
                        <span className="font-medium text-sm">{preset.name}</span>
                      </div>
                      <p className="text-xs text-gray-600">{preset.mood}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Colors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="w-12 h-10 rounded border border-gray-300"
                    />
                    <Input
                      value={formData.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      placeholder="#4A90E2"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      className="w-12 h-10 rounded border border-gray-300"
                    />
                    <Input
                      value={formData.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      placeholder="#7BB3F0"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Accent Color
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="color"
                      value={formData.accentColor}
                      onChange={(e) => handleInputChange('accentColor', e.target.value)}
                      className="w-12 h-10 rounded border border-gray-300"
                    />
                    <Input
                      value={formData.accentColor}
                      onChange={(e) => handleInputChange('accentColor', e.target.value)}
                      placeholder="#2E5B8A"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <Input
                label="Color Mood/Feeling"
                value={formData.colorMood}
                onChange={(e) => handleInputChange('colorMood', e.target.value)}
                placeholder="e.g., Professional and trustworthy"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Visual Style
              </label>
              <div className="space-y-3">
                {visualStyles.map((style) => (
                  <label
                    key={style.value}
                    className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name="visualStyle"
                      value={style.value}
                      checked={formData.visualStyle === style.value}
                      onChange={(e) => handleInputChange('visualStyle', e.target.value)}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{style.label}</div>
                      <div className="text-sm text-gray-600">{style.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Select
              label="Brand Tone"
              value={formData.brandTone}
              onChange={(e) => handleInputChange('brandTone', e.target.value)}
              options={[
                { value: 'professional', label: 'Professional & Authoritative' },
                { value: 'warm', label: 'Warm & Nurturing' },
                { value: 'casual', label: 'Casual & Approachable' },
                { value: 'inspiring', label: 'Inspiring & Motivational' },
                { value: 'educational', label: 'Educational & Informative' }
              ]}
            />

            <TextArea
              label="Core Values"
              value={formData.brandValues}
              onChange={(e) => handleInputChange('brandValues', e.target.value)}
              placeholder="What values guide your practice? (e.g., empathy, authenticity, growth)"
              rows={4}
            />

            <TextArea
              label="Content Goals"
              value={formData.contentGoals}
              onChange={(e) => handleInputChange('contentGoals', e.target.value)}
              placeholder="What do you want to achieve with your content?"
              rows={4}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Input
              label="Content Pillars"
              value={formData.contentPillars}
              onChange={(e) => handleInputChange('contentPillars', e.target.value)}
              placeholder="e.g., Mental Health Tips, Self-Care, Therapy Insights (comma-separated)"
            />

            <Input
              label="Target Audience Description"
              value={formData.targetAudience}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
              placeholder="Describe your social media audience"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Primary Platforms
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'instagram', label: 'Instagram' },
                  { value: 'linkedin', label: 'LinkedIn' },
                  { value: 'tiktok', label: 'TikTok' },
                  { value: 'facebook', label: 'Facebook' },
                  { value: 'youtube', label: 'YouTube' },
                  { value: 'twitter', label: 'Twitter/X' }
                ].map(platform => (
                  <label
                    key={platform.value}
                    className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={formData.primaryPlatforms.includes(platform.value)}
                      onChange={() => handlePlatformChange(platform.value)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium">{platform.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <Select
              label="Posting Frequency"
              value={formData.postingFrequency}
              onChange={(e) => handleInputChange('postingFrequency', e.target.value)}
              options={[
                { value: 'daily', label: 'Daily' },
                { value: '3-4-week', label: '3-4 times per week' },
                { value: '2-3-week', label: '2-3 times per week' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'bi-weekly', label: 'Bi-weekly' }
              ]}
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">🎉 Your Brand Foundation</h3>
              <p className="text-gray-600">Review your complete brand identity below</p>
            </div>

            {/* Brand Statement Highlight */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-primary-900">🎯 Your Brand Statement</h4>
                <Button variant="outline" size="sm" onClick={copyBrandStatement} icon={FiCopy}>
                  Copy
                </Button>
              </div>
              <p className="text-primary-800 font-medium text-lg leading-relaxed">
                {formData.brandStatement}
              </p>
            </div>

            {/* Brand Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Practice Info */}
              <Card className="p-4">
                <h5 className="font-semibold text-gray-900 mb-3">Practice Information</h5>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Name:</span> {formData.practiceName}</div>
                  <div><span className="font-medium">Type:</span> {formData.practiceType}</div>
                  <div><span className="font-medium">Experience:</span> {formData.yearsExperience}</div>
                  <div><span className="font-medium">Location:</span> {formData.location}</div>
                </div>
              </Card>

              {/* Visual Identity */}
              <Card className="p-4">
                <h5 className="font-semibold text-gray-900 mb-3">Visual Identity</h5>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: formData.primaryColor }}></div>
                    <span className="text-sm">{formData.primaryColor} (Primary)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: formData.secondaryColor }}></div>
                    <span className="text-sm">{formData.secondaryColor} (Secondary)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: formData.accentColor }}></div>
                    <span className="text-sm">{formData.accentColor} (Accent)</span>
                  </div>
                  <div className="text-sm"><span className="font-medium">Style:</span> {formData.visualStyle}</div>
                </div>
              </Card>

              {/* Brand Voice */}
              <Card className="p-4">
                <h5 className="font-semibold text-gray-900 mb-3">Brand Voice</h5>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Tone:</span> {formData.brandTone}</div>
                  <div><span className="font-medium">Values:</span> {formData.brandValues}</div>
                </div>
              </Card>

              {/* Content Strategy */}
              <Card className="p-4">
                <h5 className="font-semibold text-gray-900 mb-3">Content Strategy</h5>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Pillars:</span> {formData.contentPillars}</div>
                  <div><span className="font-medium">Platforms:</span> {formData.primaryPlatforms.join(', ')}</div>
                  <div><span className="font-medium">Frequency:</span> {formData.postingFrequency}</div>
                </div>
              </Card>
            </div>

            {/* Integration Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <SafeIcon icon={FiRefreshCw} className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-green-800">Automatic Integration</h4>
                  <p className="text-xs text-green-700 mt-1">
                    Your brand foundation will automatically be used throughout the app to personalize all content generation, 
                    including posts, templates, and AI suggestions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Brand Foundation Builder</h1>
          <p className="text-gray-600">
            Create a comprehensive brand foundation that will personalize all your content
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setShowUploadModal(true)}
            icon={FiUpload}
          >
            Upload Brand
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            icon={FiRotateCcw}
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            Reset & Start Over
          </Button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-2 mb-8 overflow-x-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-shrink-0">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                index <= currentStep
                  ? 'bg-primary-600 border-primary-600 text-white'
                  : 'border-gray-300 text-gray-400'
              }`}
            >
              <SafeIcon icon={step.icon} className="w-4 h-4" />
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-8 h-0.5 mx-1 transition-all duration-200 ${
                  index < currentStep ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-600">{steps[currentStep].description}</p>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderStepContent()}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleSave}
              loading={loading}
              icon={FiSave}
            >
              Save Progress
            </Button>

            {currentStep === steps.length - 1 ? (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={exportBrandJSON}
                  icon={FiDownload}
                >
                  Export JSON
                </Button>
                <Button
                  onClick={downloadBrandGuide}
                  icon={FiDownload}
                >
                  Download Guide
                </Button>
              </div>
            ) : (
              <Button onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <SafeIcon icon={FiAlertTriangle} className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Reset Brand Foundation</h3>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                Are you sure you want to reset your brand foundation? This will:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Clear all current brand information</li>
                <li>• Remove saved brand foundation from storage</li>
                <li>• Return you to the first step</li>
                <li>• Cannot be undone unless you have an export</li>
              </ul>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  💡 <strong>Tip:</strong> Consider exporting your current brand foundation first as a backup!
                </p>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowResetModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={exportBrandJSON}
                variant="outline"
                icon={FiDownload}
                className="flex-1"
              >
                Export First
              </Button>
              <Button
                onClick={confirmReset}
                className="flex-1 bg-red-600 hover:bg-red-700"
                icon={FiTrash2}
              >
                Reset Now
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upload Brand Foundation</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={FiX} className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Upload a previously exported brand foundation JSON file to restore your settings.
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept=".json,.txt"
                  onChange={handleUploadBrand}
                  className="hidden"
                  id="brand-upload"
                />
                <label htmlFor="brand-upload" className="cursor-pointer">
                  <SafeIcon icon={FiUpload} className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Click to upload</p>
                  <p className="text-xs text-gray-500">JSON or TXT files</p>
                </label>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowUploadModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BrandBuilder;