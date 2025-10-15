// HYBRID CONTENT GENERATOR - Uses API when available, local database as fallback
import apiConnectionManager from './apiConnectionManager.js';
import { localContentGenerator } from './localViralDatabase.js';
import { generateBrandedPrompt, getBrandFoundation } from './brandIntegration.js';

export class HybridContentGenerator {
  constructor() {
    this.apiManager = apiConnectionManager;
    this.localGenerator = localContentGenerator;
    this.preferAI = true; // Prefer AI when available
  }

  // Generate content ideas with hybrid approach
  async generateContentIdeas(userProfile = {}, contentPillars = []) {
    console.log('🔄 Generating content ideas (hybrid approach)...');

    // Try AI first if connected
    if (this.apiManager.isConnected && this.preferAI) {
      try {
        return await this.generateAIContentIdeas(userProfile, contentPillars);
      } catch (error) {
        console.warn('🔄 AI generation failed, falling back to local content:', error);
        return this.generateLocalContentIdeas(userProfile, contentPillars);
      }
    } else {
      // Use local content with personalization
      return this.generateLocalContentIdeas(userProfile, contentPillars);
    }
  }

  // Generate post content with hybrid approach
  async generatePostContent(format, platform, tone, topic) {
    console.log('🔄 Generating post content (hybrid approach)...');

    // Try AI first if connected
    if (this.apiManager.isConnected && this.preferAI) {
      try {
        return await this.generateAIPostContent(format, platform, tone, topic);
      } catch (error) {
        console.warn('🔄 AI generation failed, falling back to local content:', error);
        return this.generateLocalPostContent(format, platform, tone, topic);
      }
    } else {
      // Use local content
      return this.generateLocalPostContent(format, platform, tone, topic);
    }
  }

  // AI-powered content generation
  async generateAIContentIdeas(userProfile, contentPillars) {
    const brand = getBrandFoundation();
    const enhancedProfile = { ...userProfile, ...brand };

    const prompt = generateBrandedPrompt(`
Generate 5 CLIENT-ATTRACTING content ideas that will make potential therapy clients feel seen and understood.

THERAPIST PROFILE: 
${JSON.stringify(enhancedProfile, null, 2)}

TARGET CLIENTS: 
${enhancedProfile.idealClientPersona || 'Adults struggling with anxiety, depression, and life transitions'}

CONTENT PILLARS: 
${contentPillars.join(', ') || 'Mental Health Education, Symptom Normalization, Self-Compassion'}

Create content that makes people think "this person gets it" and feel less alone in their struggles.
`, 'ai-ideas');

    const messages = [
      {
        role: 'system',
        content: `You create viral content that attracts therapy clients by making them feel seen and understood. Focus on validation, normalization, and gentle hope.`
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    const content = await this.apiManager.makeApiCall(messages);
    return content;
  }

  // Local content generation with personalization
  generateLocalContentIdeas(userProfile, contentPillars) {
    const brand = getBrandFoundation();
    const niche = this.detectPrimaryNiche(userProfile, brand, contentPillars);
    
    console.log(`🎯 Generating local content for niche: ${niche}`);

    const ideas = [];
    const niches = [niche, 'anxiety', 'depression', 'trauma', 'adhd'].slice(0, 5);

    niches.forEach((currentNiche, index) => {
      const content = this.localGenerator.generateUniqueContent(currentNiche, 'full_post');
      
      ideas.push(`**CLIENT-ATTRACTION IDEA #${index + 1}: ${this.getNicheTitle(currentNiche)}**

🎯 Platform: Instagram/LinkedIn
💙 Content: 
${content}

🎪 Why It Connects: This speaks directly to people struggling with ${currentNiche}, making them feel understood and less alone.

---`);
    });

    return ideas.join('\n\n');
  }

  // AI-powered post generation
  async generateAIPostContent(format, platform, tone, topic) {
    const brand = getBrandFoundation();
    
    const prompt = `Create a ${format} post for ${platform} about "${topic}" with a ${tone} tone.

REQUIREMENTS:
- Make potential therapy clients feel seen and understood
- Use validation and normalization language
- Include gentle call-to-action
- Avoid clinical jargon
- Feel like talking to a supportive friend

BRAND CONTEXT: ${brand?.brandStatement || 'Compassionate therapy practice'}
TARGET CLIENTS: ${brand?.idealClientPersona || 'People struggling with mental health challenges'}`;

    const messages = [
      {
        role: 'system',
        content: 'You create content that attracts therapy clients by making them feel understood and supported.'
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    return await this.apiManager.makeApiCall(messages);
  }

  // Local post generation
  generateLocalPostContent(format, platform, tone, topic) {
    const niche = this.topicToNiche(topic);
    const contentType = this.formatToContentType(format);
    
    const generated = this.localGenerator.generateUniqueContent(niche, contentType);
    
    // Add platform-specific formatting
    if (format.toLowerCase().includes('carousel') && typeof generated === 'object') {
      return this.formatCarousel(generated, platform);
    }
    
    if (format.toLowerCase().includes('reel') && typeof generated === 'object') {
      return this.formatReel(generated, platform);
    }
    
    return this.formatPost(generated, platform, tone);
  }

  // Helper methods
  detectPrimaryNiche(userProfile, brand, contentPillars) {
    const text = [
      userProfile?.specialization,
      brand?.idealClientPersona,
      brand?.brandStatement,
      contentPillars.join(' ')
    ].filter(Boolean).join(' ').toLowerCase();

    if (text.includes('anxiety') || text.includes('worry')) return 'anxiety';
    if (text.includes('trauma') || text.includes('ptsd')) return 'trauma';
    if (text.includes('depression') || text.includes('mood')) return 'depression';
    if (text.includes('adhd') || text.includes('attention')) return 'adhd';
    
    return 'anxiety'; // Default
  }

  topicToNiche(topic) {
    const topicLower = topic.toLowerCase();
    if (topicLower.includes('anxiety') || topicLower.includes('worry')) return 'anxiety';
    if (topicLower.includes('trauma') || topicLower.includes('ptsd')) return 'trauma';
    if (topicLower.includes('depression') || topicLower.includes('mood')) return 'depression';
    if (topicLower.includes('adhd') || topicLower.includes('attention')) return 'adhd';
    return 'anxiety';
  }

  formatToContentType(format) {
    const formatLower = format.toLowerCase();
    if (formatLower.includes('carousel')) return 'carousel';
    if (formatLower.includes('reel') || formatLower.includes('video')) return 'reel_script';
    return 'full_post';
  }

  getNicheTitle(niche) {
    const titles = {
      anxiety: 'Your Anxiety Makes Perfect Sense',
      depression: "You're Not Lazy, You're Depressed",
      trauma: 'Your Trauma Responses Are Normal',
      adhd: 'Your ADHD Brain Is Not Broken'
    };
    return titles[niche] || 'You Deserve Understanding';
  }

  formatCarousel(carousel, platform) {
    return `📱 CAROUSEL POST FOR ${platform.toUpperCase()}

Title: ${carousel.title}

${carousel.slides.join('\n')}

Perfect for sharing step-by-step insights that help people feel understood and supported.`;
  }

  formatReel(reel, platform) {
    return `🎥 REEL SCRIPT FOR ${platform.toUpperCase()}

Hook: ${reel.hook}

Script:
${reel.script.map((line, i) => `${i + 1}. ${line}`).join('\n')}

Perfect for creating relatable, scroll-stopping video content that makes people feel seen.`;
  }

  formatPost(content, platform, tone) {
    return `📱 ${platform.toUpperCase()} POST (${tone} tone)

${content}

This post speaks directly to people who need to feel understood and supported in their mental health journey.`;
  }

  // Get instant content without waiting
  getInstantContent(niche = 'anxiety', type = 'full_post') {
    return this.localGenerator.generateUniqueContent(niche, type);
  }

  // Test if AI is available
  async testAIAvailability() {
    if (!this.apiManager.hasValidApiKey()) {
      return { available: false, reason: 'No API key configured' };
    }

    try {
      const result = await this.apiManager.testConnection();
      return { available: result.success, reason: result.error || 'Connected' };
    } catch (error) {
      return { available: false, reason: error.message };
    }
  }
}

// Create singleton instance
export const hybridContentGenerator = new HybridContentGenerator();

export default hybridContentGenerator;