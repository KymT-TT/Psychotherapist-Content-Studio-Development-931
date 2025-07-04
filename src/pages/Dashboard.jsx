import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const { 
  FiUser, FiCalendar, FiEdit3, FiImage, FiBookOpen, FiTrendingUp, 
  FiTarget, FiPlus, FiCheck, FiClock, FiLightbulb, FiRefreshCw 
} = FiIcons;

const Dashboard = () => {
  const [contentIdeas, setContentIdeas] = useState([]);
  const [loadingIdeas, setLoadingIdeas] = useState(false);

  const quickActions = [
    {
      title: 'Build Your Brand',
      description: 'Define your ideal client and brand voice',
      icon: FiUser,
      color: 'from-primary-500 to-primary-600',
      link: '/brand-builder',
      completed: false
    },
    {
      title: 'Plan Content',
      description: 'Organize your content calendar',
      icon: FiCalendar,
      color: 'from-secondary-500 to-secondary-600',
      link: '/content-calendar'
    },
    {
      title: 'Generate Posts',
      description: 'Create engaging social media content',
      icon: FiEdit3,
      color: 'from-accent-500 to-accent-600',
      link: '/post-generator'
    },
    {
      title: 'Browse Templates',
      description: 'Find visual design inspiration',
      icon: FiImage,
      color: 'from-purple-500 to-purple-600',
      link: '/template-gallery'
    }
  ];

  const stats = [
    { label: 'Posts Created', value: '12', icon: FiEdit3, color: 'text-primary-600' },
    { label: 'This Month', value: '8', icon: FiCalendar, color: 'text-secondary-600' },
    { label: 'Saved Ideas', value: '24', icon: FiBookOpen, color: 'text-accent-600' },
    { label: 'Engagement Rate', value: '4.2%', icon: FiTrendingUp, color: 'text-purple-600' }
  ];

  const generateIdeas = async () => {
    setLoadingIdeas(true);
    try {
      // Simulate API call with sample ideas
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const sampleIdeas = [
        "5 Simple Breathing Techniques for Anxiety Relief - Share practical exercises your clients can use anywhere",
        "Mental Health Monday: The Power of Self-Compassion - Discuss how being kind to yourself improves wellbeing",
        "Therapy Myth Buster: 'Only Weak People Need Therapy' - Educational post addressing common misconceptions"
      ];
      
      setContentIdeas(sampleIdeas);
      toast.success('Fresh content ideas generated!');
    } catch (error) {
      toast.error('Failed to generate ideas. Please try again.');
    } finally {
      setLoadingIdeas(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome to Your Content Studio
          </h1>
          <p className="text-primary-100 mb-6">
            Create engaging, ethical content that resonates with your ideal clients
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiTarget} className="w-6 h-6 text-yellow-300" />
              <div>
                <h3 className="font-semibold">Get Started</h3>
                <p className="text-sm text-primary-100">
                  Begin by defining your brand foundation to create personalized content
                </p>
              </div>
              <Link to="/brand-builder">
                <Button variant="outline" className="bg-white text-primary-600 border-white hover:bg-primary-50">
                  Start Now
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                  <SafeIcon icon={stat.icon} className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={action.link}>
                <Card hover className="p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                      <SafeIcon icon={action.icon} className="w-6 h-6 text-white" />
                    </div>
                    {action.completed && (
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content Ideas Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <SafeIcon icon={FiLightbulb} className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Need Ideas?</h3>
              <p className="text-sm text-gray-600">Generate fresh content inspiration</p>
            </div>
          </div>
          <Button
            onClick={generateIdeas}
            loading={loadingIdeas}
            className="w-full"
            icon={FiRefreshCw}
          >
            Generate Content Ideas
          </Button>
          {contentIdeas.length > 0 && (
            <div className="mt-4 space-y-3">
              {contentIdeas.slice(0, 3).map((idea, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{idea}</p>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <SafeIcon icon={FiClock} className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <p className="text-sm text-gray-600">Your latest content work</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiEdit3} className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium">Created Instagram post</span>
              </div>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiCalendar} className="w-4 h-4 text-secondary-600" />
                <span className="text-sm font-medium">Updated content calendar</span>
              </div>
              <span className="text-xs text-gray-500">Yesterday</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiBookOpen} className="w-4 h-4 text-accent-600" />
                <span className="text-sm font-medium">Saved 3 new ideas</span>
              </div>
              <span className="text-xs text-gray-500">2 days ago</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;