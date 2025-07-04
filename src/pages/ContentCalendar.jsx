import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from 'date-fns';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const { 
  FiCalendar, FiPlus, FiChevronLeft, FiChevronRight, FiEdit, FiTrash2, 
  FiInstagram, FiLinkedin, FiYoutube, FiDownload 
} = FiIcons;

const ContentCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPost, setNewPost] = useState({
    date: '',
    platform: '',
    title: '',
    caption: '',
    hashtags: '',
    visualNotes: '',
    cta: '',
    status: 'draft'
  });

  const platforms = [
    { value: 'instagram', label: 'Instagram', icon: FiInstagram, color: 'text-pink-600' },
    { value: 'linkedin', label: 'LinkedIn', icon: FiLinkedin, color: 'text-blue-600' },
    { value: 'tiktok', label: 'TikTok', icon: FiYoutube, color: 'text-red-600' },
    { value: 'facebook', label: 'Facebook', icon: FiYoutube, color: 'text-blue-800' }
  ];

  // Load posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('contentPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem('contentPosts', JSON.stringify(posts));
  }, [posts]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const navigateMonth = (direction) => {
    setCurrentDate(direction === 'next' ? addMonths(currentDate, 1) : subMonths(currentDate, 1));
  };

  const getPostsForDate = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return posts.filter(post => post.date === dateStr);
  };

  const handleAddPost = () => {
    if (!selectedDate) {
      toast.error('Please select a date first');
      return;
    }
    setNewPost({
      ...newPost,
      date: format(selectedDate, 'yyyy-MM-dd')
    });
    setShowAddModal(true);
  };

  const savePost = () => {
    if (!newPost.platform || !newPost.title) {
      toast.error('Please fill in required fields');
      return;
    }

    const post = {
      ...newPost,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };

    setPosts(prev => [...prev, post]);
    setShowAddModal(false);
    setNewPost({
      date: '',
      platform: '',
      title: '',
      caption: '',
      hashtags: '',
      visualNotes: '',
      cta: '',
      status: 'draft'
    });
    toast.success('Post added to calendar!');
  };

  const exportCalendar = () => {
    const csvContent = [
      ['Date', 'Platform', 'Title', 'Caption', 'Hashtags', 'Visual Notes', 'CTA', 'Status'],
      ...posts.map(post => [
        post.date,
        post.platform,
        post.title,
        post.caption,
        post.hashtags,
        post.visualNotes,
        post.cta,
        post.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content-calendar.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Calendar exported to CSV!');
  };

  const getPlatformIcon = (platform) => {
    const platformData = platforms.find(p => p.value === platform);
    return platformData ? platformData.icon : FiCalendar;
  };

  const getPlatformColor = (platform) => {
    const platformData = platforms.find(p => p.value === platform);
    return platformData ? platformData.color : 'text-gray-600';
  };

  const deletePost = (postId) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
    toast.success('Post deleted!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Calendar</h1>
          <p className="text-gray-600">Plan and organize your social media content</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={exportCalendar}
            icon={FiDownload}
          >
            Export CSV
          </Button>
          <Button
            onClick={handleAddPost}
            icon={FiPlus}
            disabled={!selectedDate}
          >
            Add Post
          </Button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiChevronLeft} className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiChevronRight} className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map(day => {
            const dayPosts = getPostsForDate(day);
            const isSelected = selectedDate && format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
            
            return (
              <motion.div
                key={day.toISOString()}
                whileHover={{ scale: 1.02 }}
                className={`min-h-[120px] p-2 border border-gray-200 rounded-lg cursor-pointer transition-all ${
                  isSelected ? 'bg-primary-50 border-primary-300' : 'hover:bg-gray-50'
                } ${
                  !isSameMonth(day, currentDate) ? 'opacity-50' : ''
                } ${
                  isToday(day) ? 'bg-blue-50 border-blue-300' : ''
                }`}
                onClick={() => setSelectedDate(day)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${
                    isToday(day) ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {format(day, 'd')}
                  </span>
                  {dayPosts.length > 0 && (
                    <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded-full">
                      {dayPosts.length}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  {dayPosts.slice(0, 3).map(post => (
                    <div
                      key={post.id}
                      className="text-xs p-1 bg-white rounded border-l-2 border-primary-500"
                    >
                      <div className="flex items-center space-x-1">
                        <SafeIcon 
                          icon={getPlatformIcon(post.platform)} 
                          className={`w-3 h-3 ${getPlatformColor(post.platform)}`} 
                        />
                        <span className="truncate">{post.title}</span>
                      </div>
                    </div>
                  ))}
                  {dayPosts.length > 3 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{dayPosts.length - 3} more
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Selected Date Posts */}
      {selectedDate && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Posts for {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          <div className="space-y-4">
            {getPostsForDate(selectedDate).map(post => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <SafeIcon 
                      icon={getPlatformIcon(post.platform)} 
                      className={`w-5 h-5 ${getPlatformColor(post.platform)}`} 
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{post.title}</h4>
                      <p className="text-sm text-gray-500 capitalize">{post.platform}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" icon={FiEdit}>
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      icon={FiTrash2}
                      onClick={() => deletePost(post.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                {post.caption && (
                  <p className="text-sm text-gray-700 mb-2">{post.caption}</p>
                )}
                {post.hashtags && (
                  <p className="text-sm text-primary-600 mb-2">{post.hashtags}</p>
                )}
                {post.visualNotes && (
                  <p className="text-sm text-gray-500 italic">Visual: {post.visualNotes}</p>
                )}
              </div>
            ))}
            {getPostsForDate(selectedDate).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <SafeIcon icon={FiCalendar} className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No posts scheduled for this date</p>
                <Button onClick={handleAddPost} className="mt-3" icon={FiPlus}>
                  Add Post
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Add Post Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add New Post - {format(selectedDate, 'MMMM d, yyyy')}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {platforms.map(platform => (
                    <button
                      key={platform.value}
                      onClick={() => setNewPost({ ...newPost, platform: platform.value })}
                      className={`p-3 border rounded-lg flex items-center space-x-3 transition-all ${
                        newPost.platform === platform.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <SafeIcon icon={platform.icon} className={`w-5 h-5 ${platform.color}`} />
                      <span className="font-medium">{platform.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Post Title *
                </label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter post title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Caption
                </label>
                <textarea
                  value={newPost.caption}
                  onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Write your post caption..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hashtags
                </label>
                <input
                  type="text"
                  value={newPost.hashtags}
                  onChange={(e) => setNewPost({ ...newPost, hashtags: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="#mentalhealth #therapy #selfcare"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visual Notes
                </label>
                <input
                  type="text"
                  value={newPost.visualNotes}
                  onChange={(e) => setNewPost({ ...newPost, visualNotes: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Describe the visual elements needed"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Call to Action
                </label>
                <input
                  type="text"
                  value={newPost.cta}
                  onChange={(e) => setNewPost({ ...newPost, cta: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="What action do you want users to take?"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={savePost}>
                Add Post
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ContentCalendar;