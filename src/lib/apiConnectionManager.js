// API Connection Manager - Now using Supabase Edge Function as a secure proxy
import toast from 'react-hot-toast';
import { supabase } from './supabase';

class ApiConnectionManager {
  constructor() {
    this.isConnected = false;
    this.lastTestTime = null;
    this.connectionError = null;
    this.listeners = new Set();
  }

  addListener(callback) {
    this.listeners.add(callback);
    callback(this.getConnectionState());
  }

  removeListener(callback) {
    this.listeners.delete(callback);
  }

  notifyListeners() {
    const state = this.getConnectionState();
    this.listeners.forEach(callback => callback(state));
  }

  getConnectionState() {
    return {
      isConnected: this.isConnected,
      lastTestTime: this.lastTestTime,
      error: this.connectionError,
      hasApiKey: this.hasValidApiKey(),
    };
  }

  hasValidApiKey() {
    // With the proxy, the key is server-side.
    // This now just confirms the app is ready to attempt a proxied connection.
    return true;
  }

  async testConnection() {
    console.log('🔍 Testing API connection via Supabase function...');
    try {
      const { data, error } = await supabase.functions.invoke('openai-proxy', {
        body: {
          messages: [{ role: 'user', content: 'Say "Connection test successful" in exactly those words.' }],
          max_tokens: 10,
          temperature: 0,
        },
      });

      if (error) throw new Error(error.message);
      if (data.error) throw new Error(data.error.message);

      const content = data.choices?.[0]?.message?.content;
      if (content) {
        this.isConnected = true;
        this.lastTestTime = Date.now();
        this.connectionError = null;
        console.log('✅ API connection successful via Supabase function');
        this.notifyListeners();
        return { success: true, message: content };
      } else {
        throw new Error('Invalid response format from proxy function');
      }
    } catch (error) {
      console.error('❌ API connection failed:', error);
      this.isConnected = false;
      let friendlyError = error.message;
      if (error.message.includes('Not Found')) {
        friendlyError = 'The AI proxy function was not found. Please ensure it has been deployed correctly in your Supabase project.';
      } else if (error.message.toLowerCase().includes('failed to fetch')) {
        friendlyError = 'A network error occurred. Please check your internet connection and ensure the Supabase service is available.';
      }
      this.connectionError = friendlyError;
      this.notifyListeners();
      return { success: false, error: this.connectionError };
    }
  }

  async makeApiCall(messages, options = {}) {
    const timeSinceTest = Date.now() - (this.lastTestTime || 0);
    if (!this.isConnected || timeSinceTest > 300000) { // 5 minutes
      console.log('🔄 Testing connection before API call...');
      const testResult = await this.testConnection();
      if (!testResult.success) {
        throw new Error(`Connection failed: ${testResult.error}`);
      }
    }

    try {
      console.log('📡 Making API call via Supabase function...');
      const { data, error } = await supabase.functions.invoke('openai-proxy', {
        body: { messages, ...options },
      });

      if (error) throw new Error(error.message);
      if (data.error) throw new Error(data.error.message);

      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from proxy function');
      }

      this.isConnected = true;
      this.lastTestTime = Date.now();
      this.connectionError = null;
      this.notifyListeners();
      console.log('✅ API call successful via Supabase function');
      return data.choices[0].message.content;

    } catch (error) {
      console.error('❌ API call failed:', error);
      this.connectionError = error.message;
      this.isConnected = false;
      this.notifyListeners();
      throw error;
    }
  }

  async initialize() {
    console.log('🚀 Initializing API connection manager with Supabase proxy...');
    // We can perform an initial background test if needed
    // this.testConnection().catch(err => console.warn("Initial background connection test failed."));
  }
}

export const apiConnectionManager = new ApiConnectionManager();
apiConnectionManager.initialize();

export default apiConnectionManager;