import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Select from '../components/UI/Select';
import TextArea from '../components/UI/TextArea';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const { FiUser, FiTarget, FiHeart, FiVoicemail, FiDownload, FiSave } = FiIcons;

const BrandBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Practice Info
    practiceName: '',
    practiceType: '',
    yearsExperience: '',
    // Ideal Client
    clientAge: '',
    clientGender: '',
    clientChallenges: '',
    clientGoals: '',
    // Brand Voice
    brandTone: '',
    brandValues: '',
    contentGoals: '',
    contentPillars: '',
    // Platform Focus
    primaryPlatforms: [],
    postingFrequency: '',
  });

  const steps = [
    {
      title: 'Practice Information',
      icon: FiUser,
      description: 'Tell us about your practice'
    },
    {
      title: 'Ideal Client Avatar',
      icon: FiTarget,
      description: 'Define your target audience'
    },
    {
      title: 'Brand Voice & Values',
      icon: FiHeart,
      description: 'Establish your brand personality'
    },
    {
      title: 'Content Strategy',
      icon: FiVoicemail,
      description: 'Plan your content approach'
    }
  ];

  const toneOptions = [
    { value: 'professional', label: 'Professional & Authoritative' },
    { value: 'warm', label: 'Warm & Nurturing' },
    { value: 'casual', label: 'Casual & Approachable' },
    { value: 'inspiring', label: 'Inspiring & Motivational' },
    { value: 'educational', label: 'Educational & Informative' }
  ];

  const platformOptions = [
    { value: 'instagram', label: 'Instagram' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'youtube', label: 'YouTube' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
      // Simulate saving to local storage
      localStorage.setItem('brandFoundation', JSON.stringify(formData));
      toast.success('Brand foundation saved successfully!');
    } catch (error) {
      toast.error('Failed to save brand foundation');
    } finally {
      setLoading(false);
    }
  };

  const downloadBrandGuide = () => {
    const brandGuide = `
BRAND FOUNDATION GUIDE
====================

PRACTICE INFORMATION
- Practice Name: ${formData.practiceName}
- Practice Type: ${formData.practiceType}
- Years of Experience: ${formData.yearsExperience}

IDEAL CLIENT AVATAR
- Age Range: ${formData.clientAge}
- Gender: ${formData.clientGender}
- Key Challenges: ${formData.clientChallenges}
- Goals: ${formData.clientGoals}

BRAND VOICE & VALUES
- Brand Tone: ${formData.brandTone}
- Core Values: ${formData.brandValues}
- Content Goals: ${formData.contentGoals}

CONTENT STRATEGY
- Content Pillars: ${formData.contentPillars}
- Primary Platforms: ${formData.primaryPlatforms.join(', ')}
- Posting Frequency: ${formData.postingFrequency}

Generated on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([brandGuide], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'brand-foundation-guide.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Brand guide downloaded!');
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
                { value: 'hospital', label: 'Hospital Setting' }
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
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <Input
              label="Client Age Range"
              value={formData.clientAge}
              onChange={(e) => handleInputChange('clientAge', e.target.value)}
              placeholder="e.g., 25-40, Teens, Adults"
            />
            <Select
              label="Primary Client Gender"
              value={formData.clientGender}
              onChange={(e) => handleInputChange('clientGender', e.target.value)}
              options={[
                { value: 'all', label: 'All Genders' },
                { value: 'women', label: 'Primarily Women' },
                { value: 'men', label: 'Primarily Men' },
                { value: 'nonbinary', label: 'Non-binary/Gender Diverse' }
              ]}
            />
            <TextArea
              label="Key Client Challenges"
              value={formData.clientChallenges}
              onChange={(e) => handleInputChange('clientChallenges', e.target.value)}
              placeholder="What are the main struggles your ideal clients face?"
              rows={4}
            />
            <TextArea
              label="Client Goals"
              value={formData.clientGoals}
              onChange={(e) => handleInputChange('clientGoals', e.target.value)}
              placeholder="What do your clients want to achieve?"
              rows={4}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <Select
              label="Brand Tone"
              value={formData.brandTone}
              onChange={(e) => handleInputChange('brandTone', e.target.value)}
              options={toneOptions}
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
      case 3:
        return (
          <div className="space-y-6">
            <Input
              label="Content Pillars"
              value={formData.contentPillars}
              onChange={(e) => handleInputChange('contentPillars', e.target.value)}
              placeholder="e.g., Mental Health Tips, Self-Care, Therapy Insights (comma-separated)"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Primary Platforms
              </label>
              <div className="grid grid-cols-2 gap-3">
                {platformOptions.map(platform => (
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
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Brand Foundation Builder</h1>
        <p className="text-gray-600">
          Create a comprehensive brand foundation that will guide all your content creation
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                index <= currentStep
                  ? 'bg-primary-600 border-primary-600 text-white'
                  : 'border-gray-300 text-gray-400'
              }`}
            >
              <SafeIcon icon={step.icon} className="w-5 h-5" />
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-2 transition-all duration-200 ${
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
              <Button
                onClick={downloadBrandGuide}
                icon={FiDownload}
              >
                Download Brand Guide
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BrandBuilder;