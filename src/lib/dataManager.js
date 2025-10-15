// Enhanced Data Management System with Export/Import
import toast from 'react-hot-toast';

// Data keys for localStorage - REMOVED CONTENT_POSTS
export const DATA_KEYS = {
  BRAND_FOUNDATION: 'brandFoundation',
  CONTENT_IDEAS: 'contentIdeas',
  USER_SETTINGS: 'userSettings',
  TEMPLATE_FAVORITES: 'templateFavorites',
  APP_PREFERENCES: 'appPreferences'
};

// Data validation schemas
const SCHEMAS = {
  brandFoundation: {
    required: ['practiceName'],
    optional: ['practiceType', 'idealClientPersona', 'brandStatement', 'primaryColor']
  },
  contentIdeas: {
    required: ['id', 'title', 'content'],
    optional: ['platform', 'category', 'tags', 'isFavorite']
  }
};

export class DataManager {
  constructor() {
    this.version = '1.0.0';
    this.appName = 'Clarity Content Studio';
  }

  // Get all data from localStorage
  getAllData() {
    const data = {
      version: this.version,
      appName: this.appName,
      exportedAt: new Date().toISOString(),
      data: {}
    };

    Object.values(DATA_KEYS).forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          data.data[key] = JSON.parse(value);
        } catch (error) {
          console.warn(`Failed to parse ${key}:`, error);
          data.data[key] = null;
        }
      }
    });

    return data;
  }

  // Export all data to downloadable file
  exportAllData() {
    try {
      const data = this.getAllData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      const timestamp = new Date().toISOString().split('T')[0];
      const practiceName = this.getPracticeName() || 'Practice';
      a.download = `${practiceName.replace(/[^a-zA-Z0-9]/g, '-')}-Backup-${timestamp}.json`;
      
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('📄 Complete backup downloaded successfully!');
      return true;
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('❌ Failed to export data');
      return false;
    }
  }

  // Import data from file
  async importDataFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          const result = this.importData(importedData);
          resolve(result);
        } catch (error) {
          reject(new Error('Invalid file format'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsText(file);
    });
  }

  // Import and validate data
  importData(importedData, options = { merge: false, validate: true }) {
    try {
      // Basic validation
      if (!importedData || typeof importedData !== 'object') {
        throw new Error('Invalid data format');
      }

      if (!importedData.data) {
        throw new Error('No data found in import file');
      }

      // Version check
      if (importedData.appName !== this.appName) {
        console.warn('Data from different app:', importedData.appName);
      }

      let importCount = 0;
      const results = {
        success: [],
        failed: [],
        skipped: []
      };

      // Import each data type
      Object.entries(importedData.data).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          results.skipped.push(key);
          return;
        }

        try {
          // Validate data if requested
          if (options.validate) {
            this.validateData(key, value);
          }

          // Handle merging vs overwriting
          if (options.merge && this.shouldMergeData(key)) {
            this.mergeData(key, value);
          } else {
            localStorage.setItem(key, JSON.stringify(value));
          }

          results.success.push(key);
          importCount++;
        } catch (error) {
          console.error(`Failed to import ${key}:`, error);
          results.failed.push({ key, error: error.message });
        }
      });

      // Show results
      if (importCount > 0) {
        toast.success(`✅ Successfully imported ${importCount} data categories!`);
        // Trigger page reload to reflect changes
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error('❌ No data was imported');
      }

      return {
        success: true,
        importCount,
        results
      };
    } catch (error) {
      console.error('Import failed:', error);
      toast.error(`❌ Import failed: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Validate data structure
  validateData(key, data) {
    const schema = SCHEMAS[key];
    if (!schema) return true; // No schema = no validation

    if (Array.isArray(data)) {
      data.forEach(item => this.validateItem(schema, item));
    } else {
      this.validateItem(schema, data);
    }

    return true;
  }

  // Validate individual data item
  validateItem(schema, item) {
    if (!item || typeof item !== 'object') {
      throw new Error('Invalid item format');
    }

    // Check required fields
    schema.required.forEach(field => {
      if (!(field in item)) {
        throw new Error(`Missing required field: ${field}`);
      }
    });

    return true;
  }

  // Determine if data should be merged or overwritten
  shouldMergeData(key) {
    return ['contentIdeas'].includes(key); // Removed contentPosts
  }

  // Merge data with existing data
  mergeData(key, newData) {
    const existingData = JSON.parse(localStorage.getItem(key) || '[]');
    
    if (Array.isArray(existingData) && Array.isArray(newData)) {
      // Merge arrays, avoiding duplicates by ID
      const existingIds = new Set(existingData.map(item => item.id));
      const uniqueNewData = newData.filter(item => !existingIds.has(item.id));
      const mergedData = [...existingData, ...uniqueNewData];
      localStorage.setItem(key, JSON.stringify(mergedData));
    } else {
      // For objects, merge properties
      const merged = { ...existingData, ...newData };
      localStorage.setItem(key, JSON.stringify(merged));
    }
  }

  // Get practice name for file naming
  getPracticeName() {
    try {
      const brandData = JSON.parse(localStorage.getItem(DATA_KEYS.BRAND_FOUNDATION) || '{}');
      return brandData.practiceName || null;
    } catch {
      return null;
    }
  }

  // Export specific data category
  exportCategory(category) {
    try {
      const data = localStorage.getItem(category);
      if (!data) {
        toast.error(`No ${category} data found`);
        return false;
      }

      const exportData = {
        version: this.version,
        category,
        exportedAt: new Date().toISOString(),
        data: JSON.parse(data)
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${category}-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success(`📄 ${category} exported successfully!`);
      return true;
    } catch (error) {
      console.error(`Export ${category} failed:`, error);
      toast.error(`❌ Failed to export ${category}`);
      return false;
    }
  }

  // Clear all data (with confirmation)
  clearAllData() {
    const confirmed = window.confirm(
      '⚠️ This will permanently delete ALL your data including:\n\n' +
      '• Brand foundation\n' +
      '• Content vault\n' +
      '• Settings & preferences\n\n' +
      'Make sure you have exported your data first!\n\n' +
      'Are you absolutely sure?'
    );

    if (confirmed) {
      Object.values(DATA_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });

      toast.success('🗑️ All data cleared successfully');
      
      // Reload page
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
      return true;
    }

    return false;
  }

  // Get data summary for display
  getDataSummary() {
    const summary = {};

    Object.values(DATA_KEYS).forEach(key => {
      const data = localStorage.getItem(key);
      if (data) {
        try {
          const parsed = JSON.parse(data);
          summary[key] = {
            exists: true,
            size: new Blob([data]).size,
            itemCount: Array.isArray(parsed) ? parsed.length : 1,
            lastModified: parsed.lastUpdated || parsed.completedAt || 'Unknown'
          };
        } catch {
          summary[key] = {
            exists: true,
            size: new Blob([data]).size,
            itemCount: 0,
            lastModified: 'Unknown'
          };
        }
      } else {
        summary[key] = {
          exists: false,
          size: 0,
          itemCount: 0,
          lastModified: null
        };
      }
    });

    return summary;
  }

  // Auto-backup functionality
  createAutoBackup() {
    try {
      const data = this.getAllData();
      const backupKey = `autoBackup_${Date.now()}`;

      // Keep only last 3 auto-backups
      const existingBackups = Object.keys(localStorage)
        .filter(key => key.startsWith('autoBackup_'))
        .sort()
        .reverse();

      // Remove old backups (keep only 2, add 1 new = 3 total)
      existingBackups.slice(2).forEach(key => {
        localStorage.removeItem(key);
      });

      // Create new backup
      localStorage.setItem(backupKey, JSON.stringify(data));
      return true;
    } catch (error) {
      console.warn('Auto-backup failed:', error);
      return false;
    }
  }

  // Restore from auto-backup
  restoreAutoBackup() {
    try {
      const backups = Object.keys(localStorage)
        .filter(key => key.startsWith('autoBackup_'))
        .sort()
        .reverse();

      if (backups.length === 0) {
        toast.error('No auto-backups found');
        return false;
      }

      const latestBackup = localStorage.getItem(backups[0]);
      if (!latestBackup) {
        toast.error('Backup data corrupted');
        return false;
      }

      const backupData = JSON.parse(latestBackup);
      const result = this.importData(backupData, { merge: false, validate: false });

      if (result.success) {
        toast.success('✅ Restored from auto-backup!');
      }

      return result.success;
    } catch (error) {
      console.error('Auto-backup restore failed:', error);
      toast.error('❌ Failed to restore backup');
      return false;
    }
  }
}

// Create singleton instance
export const dataManager = new DataManager();

// Auto-backup on page unload (when user closes/refreshes)
window.addEventListener('beforeunload', () => {
  dataManager.createAutoBackup();
});

// Auto-backup every 30 minutes
setInterval(() => {
  dataManager.createAutoBackup();
}, 30 * 60 * 1000);