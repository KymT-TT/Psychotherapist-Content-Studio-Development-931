import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Select from '../UI/Select';
import DataManager from '../DataManagement/DataManager';
import TutorialModal from '../Tutorials/TutorialModal';
import toast from 'react-hot-toast';

const {FiX, FiUser, FiKey, FiPalette, FiBell, FiShield, FiSave, FiZap, FiCheck, FiAlertTriangle, FiDatabase, FiBookOpen, FiCopy} = FiIcons;

const SettingsModal = ({isOpen, onClose}) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [showDataManager, setShowDataManager] = useState(false);
  const [showTutorials, setShowTutorials] = useState(false);
  const [settings, setSettings] = useState({
    practiceName: '',
    practiceType: '',
    userName: '',
    email: '',
    theme: 'light',
    defaultPlatform: 'instagram',
    autoSave: true,
    notifications: true,
    dataRetention: '12months',
    analytics: true,
  });

  const tabs = [
    {id: 'profile', label: 'Profile', icon: FiUser},
    {id: 'data', label: 'Data Management', icon: FiDatabase},
    {id: 'tutorials', label: 'Tutorials & FAQ', icon: FiBookOpen},
    {id: 'preferences', label: 'Preferences', icon: FiPalette},
    {id: 'privacy', label: 'Privacy', icon: FiShield},
  ];

  useEffect(() => {
    if (isOpen) {
      const savedSettings = localStorage.getItem('userSettings');
      const brandFoundation = localStorage.getItem('brandFoundation');
      if (savedSettings) {
        setSettings(prev => ({...prev, ...JSON.parse(savedSettings)}));
      }
      if (brandFoundation) {
        const brand = JSON.parse(brandFoundation);
        setSettings(prev => ({
          ...prev,
          practiceName: brand.practiceName || '',
          practiceType: brand.practiceType || '',
        }));
      }
    }
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setSettings(prev => ({...prev, [field]: value}));
  };
  
  const handleSave = async () => {
    setLoading(true);
    try {
      localStorage.setItem('userSettings', JSON.stringify(settings));
      if (settings.practiceName || settings.practiceType) {
        const existingBrand = JSON.parse(localStorage.getItem('brandFoundation') || '{}');
        const updatedBrand = {
          ...existingBrand,
          practiceName: settings.practiceName,
          practiceType: settings.practiceType,
        };
        localStorage.setItem('brandFoundation', JSON.stringify(updatedBrand));
      }
      toast.success('✅ Settings saved successfully!');
      onClose();
    } catch (error) {
      toast.error('❌ Failed to save settings');
      console.error('Settings save error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Practice Information</h3>
              <div className="space-y-4">
                <Input label="Practice Name" value={settings.practiceName} onChange={(e) => handleInputChange('practiceName', e.target.value)} placeholder="Your Practice Name" />
                <Select label="Practice Type" value={settings.practiceType} onChange={(e) => handleInputChange('practiceType', e.target.value)} options={[
                  {value: 'solo', label: 'Solo Practice'},
                  {value: 'group', label: 'Group Practice'},
                  {value: 'clinic', label: 'Clinic/Center'},
                  {value: 'hospital', label: 'Hospital Setting'},
                ]} />
                <Input label="Your Name" value={settings.userName} onChange={(e) => handleInputChange('userName', e.target.value)} placeholder="Your Name" />
                <Input label="Email" type="email" value={settings.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="your.email@example.com" />
              </div>
            </div>
          </div>
        );
      case 'data':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <SafeIcon icon={FiDatabase} className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">Local Data Storage</h4>
                      <p className="text-xs text-blue-700 mt-1">
                        All your data is stored locally on your device. Export your data to create backups or transfer to another device.
                      </p>
                    </div>
                  </div>
                </div>
                <Button onClick={() => setShowDataManager(true)} icon={FiDatabase} className="w-full">
                  Open Data Manager
                </Button>
              </div>
            </div>
          </div>
        );
      case 'tutorials':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Help & Tutorials</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <SafeIcon icon={FiBookOpen} className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">Complete User Guide</h4>
                      <p className="text-xs text-blue-700 mt-1">
                        Step-by-step tutorials for every feature, troubleshooting guides, and frequently asked questions.
                      </p>
                    </div>
                  </div>
                </div>
                <Button onClick={() => setShowTutorials(true)} icon={FiBookOpen} className="w-full">
                  Open Tutorials & FAQ
                </Button>
              </div>
            </div>
          </div>
        );
      case 'preferences':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">App Preferences</h3>
              <div className="space-y-4">
                <Select label="Theme" value={settings.theme} onChange={(e) => handleInputChange('theme', e.target.value)} options={[
                  {value: 'light', label: 'Light'},
                  {value: 'dark', label: 'Dark'},
                  {value: 'system', label: 'System'},
                ]} />
                <Select label="Default Platform" value={settings.defaultPlatform} onChange={(e) => handleInputChange('defaultPlatform', e.target.value)} options={[
                  {value: 'instagram', label: 'Instagram'},
                  {value: 'linkedin', label: 'LinkedIn'},
                  {value: 'tiktok', label: 'TikTok'},
                  {value: 'facebook', label: 'Facebook'},
                ]} />
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Auto-save</label>
                    <p className="text-xs text-gray-500">Automatically save your work</p>
                  </div>
                  <button onClick={() => handleInputChange('autoSave', !settings.autoSave)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.autoSave ? 'bg-primary-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.autoSave ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Data</h3>
              <div className="space-y-4">
                <Select label="Data Retention" value={settings.dataRetention} onChange={(e) => handleInputChange('dataRetention', e.target.value)} options={[
                  {value: '3months', label: '3 Months'},
                  {value: '6months', label: '6 Months'},
                  {value: '12months', label: '12 Months'},
                  {value: 'indefinite', label: 'Indefinite'},
                ]} />
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Usage Analytics</label>
                    <p className="text-xs text-gray-500">Help improve the app with anonymous usage data</p>
                  </div>
                  <button onClick={() => handleInputChange('analytics', !settings.analytics)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.analytics ? 'bg-primary-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.analytics ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
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
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{opacity: 0, scale: 0.95}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.95}}
              className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <SafeIcon icon={FiX} className="w-6 h-6" />
                </button>
              </div>
              <div className="flex">
                <div className="w-64 bg-gray-50 p-4 border-r border-gray-200">
                  <nav className="space-y-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <SafeIcon icon={tab.icon} className="w-4 h-4 mr-3" />
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>
                <div className="flex-1 p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                  {renderTabContent()}
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleSave} loading={loading} icon={FiSave}>
                  Save Settings
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <DataManager isOpen={showDataManager} onClose={() => setShowDataManager(false)} />
      <TutorialModal isOpen={showTutorials} onClose={() => setShowTutorials(false)} />
    </>
  );
};

export default SettingsModal;