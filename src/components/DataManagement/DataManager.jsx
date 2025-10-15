import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../UI/Button';
import Card from '../UI/Card';
import {dataManager} from '../../lib/dataManager';
import toast from 'react-hot-toast';

const {FiDownload, FiUpload, FiTrash2, FiDatabase, FiShield, FiClock, FiFile, FiX, FiCheck, FiAlertTriangle} = FiIcons;

const DataManager = ({isOpen, onClose}) => {
  const [dataSummary, setDataSummary] = useState({});
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDataSummary(dataManager.getDataSummary());
    }
  }, [isOpen]);

  const handleExportAll = async () => {
    setExporting(true);
    try {
      await dataManager.exportAllData();
    } finally {
      setExporting(false);
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImporting(true);
    try {
      const result = await dataManager.importDataFromFile(file);
      if (result.success) {
        setDataSummary(dataManager.getDataSummary());
      }
    } catch (error) {
      toast.error(`❌ Import failed: ${error.message}`);
    } finally {
      setImporting(false);
      event.target.value = ''; // Reset input
    }
  };

  const handleClearAll = () => {
    const success = dataManager.clearAllData();
    if (success) {
      onClose();
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getCategoryLabel = (key) => {
    const labels = {
      brandFoundation: 'Brand Foundation',
      contentIdeas: 'Content Vault',
      userSettings: 'User Settings',
      templateFavorites: 'Template Favorites',
      appPreferences: 'App Preferences'
    };
    return labels[key] || key;
  };

  const getCategoryIcon = (key) => {
    const icons = {
      brandFoundation: FiIcons.FiUser,
      contentIdeas: FiIcons.FiBookOpen,
      userSettings: FiIcons.FiSettings,
      templateFavorites: FiIcons.FiHeart,
      appPreferences: FiIcons.FiSliders
    };
    return icons[key] || FiIcons.FiFile;
  };

  const totalSize = Object.values(dataSummary).reduce((total, item) => total + item.size, 0);
  const totalItems = Object.values(dataSummary).reduce((total, item) => total + item.itemCount, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{opacity: 0, scale: 0.95}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.95}}
            className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <SafeIcon icon={FiDatabase} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Data Management</h2>
                  <p className="text-sm text-gray-600">Export, import, and manage your data</p>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <SafeIcon icon={FiX} className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
              {/* Data Overview */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary-600">{totalItems}</div>
                        <div className="text-sm text-gray-600">Total Items</div>
                    </Card>
                     <Card className="p-4 text-center">
                        <div className="text-2xl font-bold text-secondary-600">{formatBytes(totalSize)}</div>
                        <div className="text-sm text-gray-600">Storage Used</div>
                    </Card>
                     <Card className="p-4 text-center">
                        <div className="text-2xl font-bold text-accent-600">
                            {Object.values(dataSummary).filter(item => item.exists).length}
                        </div>
                        <div className="text-sm text-gray-600">Data Categories</div>
                    </Card>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button onClick={handleExportAll} loading={exporting} icon={FiDownload} className="w-full">
                    Export All Data
                  </Button>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImport}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={importing}
                    />
                    <Button loading={importing} icon={FiUpload} variant="outline" className="w-full" disabled={importing}>
                      Import Data
                    </Button>
                  </div>
                </div>
              </div>

              {/* Data Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Categories</h3>
                <div className="space-y-3">
                  {Object.entries(dataSummary).map(([key, info]) => (
                    <Card key={key} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <SafeIcon
                            icon={getCategoryIcon(key)}
                            className={`w-5 h-5 ${info.exists ? 'text-green-600' : 'text-gray-400'}`}
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{getCategoryLabel(key)}</h4>
                            <p className="text-sm text-gray-600">
                              {info.exists ? (
                                <>
                                  {info.itemCount} items • {formatBytes(info.size)}
                                  {info.lastModified && info.lastModified !== 'Unknown' && (
                                    <> • Last updated: {new Date(info.lastModified).toLocaleDateString()}</>
                                  )}
                                </>
                              ) : (
                                'No data'
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {info.exists ? (
                             <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600" />
                          ) : (
                             <SafeIcon icon={FiX} className="w-5 h-5 text-gray-400" />
                          )}
                          {info.exists && (
                            <Button size="sm" variant="outline" onClick={() => dataManager.exportCategory(key)} icon={FiDownload}>
                              Export
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Privacy & Security */}
              <div className="mb-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <SafeIcon icon={FiShield} className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-green-800">Privacy & Security</h4>
                      <div className="text-xs text-green-700 mt-1 space-y-1">
                        <p>✅ All data stored locally on your device</p>
                        <p>✅ No data sent to external servers</p>
                        <p>✅ You have complete control over your information</p>
                        <p>✅ Export creates portable backup files</p>
                        <p>✅ Auto-backups created every 30 minutes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="border border-red-200 rounded-xl p-4 bg-red-50">
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiAlertTriangle} className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-red-800">Danger Zone</h4>
                    <p className="text-xs text-red-700 mt-1 mb-3">
                      This will permanently delete ALL your data. Make sure to export first!
                    </p>
                    <Button size="sm" variant="danger" onClick={handleClearAll} icon={FiTrash2}>
                      Clear All Data
                    </Button>
                  </div>
                </div>
              </div>

              {/* Instructions */}
               <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">💡 How It Works:</h4>
                  <div className="text-xs text-blue-700 space-y-1">
                    <p><strong>Export:</strong> Downloads a complete backup file (.json) with all your data</p>
                    <p><strong>Import:</strong> Restores data from a backup file (merges with existing data)</p>
                    <p><strong>Auto-Backup:</strong> Automatic backups created every 30 minutes and when you close the app</p>
                    <p><strong>Sharing:</strong> Send backup files to team members or transfer between devices</p>
                  </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DataManager;