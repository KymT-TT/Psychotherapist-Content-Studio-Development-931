// CLIENT-ATTRACTION CONTENT GENERATOR
import { VIRAL_CONTENT_DATABASE, CLIENT_ATTRACTION_TESTS } from './viralContentDatabase.js';

export class ClientAttractionGenerator {
  constructor() {
    this.database = VIRAL_CONTENT_DATABASE;
    this.qualityTests = CLIENT_ATTRACTION_TESTS;
  }

  // 🎯 Generate niche-specific hooks
  generateNicheHook(niche = 'anxiety') {
    const nicheHooks = this.database.NICHE_HOOKS[niche];
    if (!nicheHooks) {
      console.warn(`Unknown niche: ${niche}, using anxiety hooks`);
      return this.database.NICHE_HOOKS.anxiety[0];
    }
    return nicheHooks[Math.floor(Math.random() * nicheHooks.length)];
  }

  // 💬 Generate content framework
  generateContentFramework(type = 'truth_bomb_gentle') {
    const frameworks = this.database.CONTENT_FRAMEWORKS[type];
    if (!frameworks) return "Therapist here: Your feelings are valid.";
    return frameworks[Math.floor(Math.random() * frameworks.length)];
  }

  // 🛠️ Generate hook template
  generateHookTemplate(niche = 'anxiety', struggle = 'overwhelmed') {
    const templates = this.database.HOOK_TEMPLATES;
    let template = templates[Math.floor(Math.random() * templates.length)];
    
    // Replace placeholders
    template = template.replace('[niche clients]', `people with ${niche}`);
    template = template.replace('[symptom]', this.getSymptomForNiche(niche));
    template = template.replace('[condition/struggle]', niche);
    template = template.replace('[specific struggle]', struggle);
    template = template.replace('[specific behavior]', this.getBehaviorForNiche(niche));
    template = template.replace('[explanation]', this.getExplanationForNiche(niche));
    
    return template;
  }

  // ⚡ Generate gentle CTA
  generateGentleCTA() {
    const ctas = this.database.GENTLE_CTAS;
    return ctas[Math.floor(Math.random() * ctas.length)];
  }

  // 📱 Generate carousel content
  generateCarouselContent(niche = 'anxiety') {
    const carousels = this.database.CAROUSEL_TEMPLATES;
    const nicheCarousels = carousels.filter(c => 
      c.title.toLowerCase().includes(niche) || 
      c.slides.some(slide => slide.toLowerCase().includes(niche))
    );
    
    if (nicheCarousels.length > 0) {
      return nicheCarousels[Math.floor(Math.random() * nicheCarousels.length)];
    }
    
    return carousels[Math.floor(Math.random() * carousels.length)];
  }

  // 🎭 Generate relatable content
  generateRelatableContent() {
    const relatable = this.database.RELATABLE_CONTENT;
    return relatable[Math.floor(Math.random() * relatable.length)];
  }

  // 🔥 Generate engagement booster
  generateEngagementBooster(niche = 'anxiety') {
    const patterns = this.database.ENGAGEMENT_PATTERNS;
    let pattern = patterns[Math.floor(Math.random() * patterns.length)];
    
    // Customize for niche
    pattern = pattern.replace('___', this.getEngagementFillForNiche(niche));
    
    return pattern;
  }

  // Helper methods
  getSymptomForNiche(niche) {
    const symptoms = {
      anxiety: 'racing thoughts',
      adhd: 'executive dysfunction', 
      trauma: 'hypervigilance',
      depression: 'emotional numbness',
      perfectionism: 'analysis paralysis',
      boundaries: 'people-pleasing'
    };
    return symptoms[niche] || 'overwhelm';
  }

  getBehaviorForNiche(niche) {
    const behaviors = {
      anxiety: 'overthink every conversation',
      adhd: 'start 10 projects and finish none',
      trauma: 'scan every room for exits',
      depression: 'feel exhausted after doing nothing',
      perfectionism: 'rewrite emails 15 times',
      boundaries: 'say yes when you mean no'
    };
    return behaviors[niche] || 'feel overwhelmed';
  }

  getExplanationForNiche(niche) {
    const explanations = {
      anxiety: 'nervous system response',
      adhd: 'neurodivergent brain pattern',
      trauma: 'survival mechanism', 
      depression: 'brain chemistry imbalance',
      perfectionism: 'fear-based protection',
      boundaries: 'learned survival strategy'
    };
    return explanations[niche] || 'normal response';
  }

  getEngagementFillForNiche(niche) {
    const fills = {
      anxiety: "I'm in danger when I'm actually safe",
      adhd: "I'll start in 5 minutes (3 hours later)",
      trauma: "everyone is a potential threat",
      depression: "I'm burden to everyone",
      perfectionism: "if it's not perfect, it's worthless",
      boundaries: "everyone else's needs come first"
    };
    return fills[niche] || "I'm not enough";
  }

  // ✅ Test content for client attraction
  testClientAttraction(content) {
    const checklist = this.qualityTests.VIRAL_CHECKLIST;
    const drivers = this.qualityTests.ENGAGEMENT_DRIVERS;
    
    return {
      attractionScore: this.calculateAttractionScore(content),
      checklist,
      drivers,
      recommendations: this.getAttractionRecommendations(content)
    };
  }

  calculateAttractionScore(content) {
    let score = 0;
    const contentLower = content.toLowerCase();
    
    // Check for client-attraction elements
    const attractionIndicators = [
      'you\'re not',
      'this is for you',
      'if you',
      'your brain',
      'it\'s not your fault',
      'you deserve',
      'you\'re not alone',
      'this is normal'
    ];
    
    attractionIndicators.forEach(indicator => {
      if (contentLower.includes(indicator)) score += 10;
    });
    
    // Check for validation language
    const validationWords = ['valid', 'normal', 'okay', 'enough', 'worthy', 'deserving'];
    validationWords.forEach(word => {
      if (contentLower.includes(word)) score += 5;
    });
    
    // Check for relatability
    const relatableWords = ['feel like', 'ever said', 'brain feels', 'when you'];
    relatableWords.forEach(phrase => {
      if (contentLower.includes(phrase)) score += 8;
    });
    
    return Math.min(score, 100);
  }

  getAttractionRecommendations(content) {
    const recommendations = [];
    const contentLower = content.toLowerCase();
    
    if (!contentLower.includes('you')) {
      recommendations.push("Use 'you' language to speak directly to one person");
    }
    
    if (!contentLower.includes('not your fault') && !contentLower.includes('normal')) {
      recommendations.push("Add normalization or validation language");
    }
    
    if (contentLower.includes('should') || contentLower.includes('just')) {
      recommendations.push("Remove 'should' or 'just' - they can feel judgmental");
    }
    
    if (!contentLower.includes('?')) {
      recommendations.push("Consider adding a relatable question");
    }
    
    return recommendations;
  }
}

export default ClientAttractionGenerator;