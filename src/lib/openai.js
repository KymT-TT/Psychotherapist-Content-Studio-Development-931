// Enhanced OpenAI integration with viral reel generation
import { generateBrandedPrompt, getBrandFoundation, getBrandVoice, getContentStrategy } from './brandIntegration.js';
import { VIRAL_CONTENT_DATABASE } from './viralContentDatabase.js';
import ClientAttractionGenerator from './contentGenerator.js';
import apiConnectionManager from './apiConnectionManager.js';
import { hybridContentGenerator } from './hybridContentGenerator.js';

console.log('OpenAI lib loading...')

const clientGenerator = new ClientAttractionGenerator();

// Use the API connection manager for all API calls
export const generateContent = async (prompt, type = 'post') => {
  console.log('🚀 generateContent called:', {
    prompt: prompt.substring(0, 100) + '...',
    type,
    timestamp: new Date().toISOString()
  })

  const messages = [
    {
      role: 'system',
      content: `You are a viral content creation expert for licensed therapists who want to ATTRACT IDEAL THERAPY CLIENTS through social media.

CRITICAL MISSION: Create content that makes potential clients feel seen, understood, and ready to reach out for therapy support.

YOUR CONTENT MUST:
✅ Speak directly to people struggling with mental health challenges
✅ Normalize symptoms and reduce shame
✅ Use "you" language - speak to ONE person
✅ Feel like a friend talking, not a clinical textbook
✅ Make people think "this person gets it"
✅ Create connection and reduce isolation
✅ Be scroll-stopping but gentle

CLIENT-ATTRACTION FRAMEWORK DATABASE:
🎯 NICHE-SPECIFIC HOOKS:
ANXIETY: "You're not lazy. Your brain is just in survival mode."
ADHD: "If you've ever said 'I'll start in 5 minutes' and lost 3 hours, this is for you."
TRAUMA: "If you always need a backup plan for the backup plan, you're not 'dramatic.' You're traumatized."
DEPRESSION: "You're not lazy. You're exhausted from fighting an invisible battle."

💬 TRUTH-TELLING FRAMEWORKS:
- "Therapist here: [gentle truth that challenges harmful beliefs]"
- "If you [specific relatable behavior], this is for you..."
- "You're not [negative self-judgment]. You're [compassionate reframe]."
- "The thing about [struggle] that no one tells you..."

🤝 VALIDATION PATTERNS:
- "Your feelings are valid, even the uncomfortable ones"
- "You deserve support even if others 'had it worse'"
- "It's not your fault that [struggle/symptom]"
- "You're not too much. You're responding to too much"

⚡ GENTLE CALL-TO-ACTIONS:
- "Save this if your nervous system needed this today"
- "Send this to a friend who overthinks everything"
- "Comment a 💙 if this resonated"
- "DM me 'support' if this hit home"

CONTENT STRUCTURE FOR CLIENT ATTRACTION:
1. **RELATABLE HOOK**: Address a specific struggle they face
2. **VALIDATION**: Normalize their experience, reduce shame
3. **GENTLE EDUCATION**: Explain why they feel this way (without being clinical)
4. **HOPE**: Remind them healing is possible
5. **SOFT CTA**: Invite connection without pressure

TONE: Warm, understanding, validating, like talking to a close friend who truly gets it.

AVOID: Clinical jargon, toxic positivity, "just" statements, should/must language, anything that feels preachy or judgmental.

CREATE: Content that makes people feel less alone and more understood.

Remember: The goal is to attract people who need therapy by showing them you understand their world and can help them heal.`
    },
    {
      role: 'user',
      content: prompt
    }
  ];

  return await apiConnectionManager.makeApiCall(messages, {
    max_tokens: 1500,
    temperature: 0.8,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0.2
  });
}

// NEW: Generate complete viral reel content
export const generateViralReelContent = async (template) => {
  console.log('🎬 generateViralReelContent called:', {
    template: template.title,
    category: template.category,
    timestamp: new Date().toISOString()
  })

  const brand = getBrandFoundation();
  const brandedPrompt = generateBrandedPrompt(`
    Create a complete VIRAL REEL PACKAGE for therapists based on this template:

    TEMPLATE: ${template.title}
    CATEGORY: ${template.category}
    PLATFORM: ${template.platform}
    DESCRIPTION: ${template.description}
    VIRAL POTENTIAL: ${template.viralPotential}

    EXAMPLE HOOKS FROM TEMPLATE:
    ${template.hookExamples?.join('\n') || 'Generate original hook'}

    EXAMPLE ACTIONS FROM TEMPLATE:
    ${template.actionSuggestions?.join('\n') || 'Generate original actions'}

    Create a complete reel package with these 4 components:

    1. **VIRAL HOOK** (1-2 sentences):
    - Must stop the scroll in first 3 seconds
    - Use proven viral patterns like "Unpopular opinion:", "POV:", "What no one tells you about..."
    - Challenge common beliefs or reveal secrets
    - Create curiosity gap that makes people want to watch
    - Speak directly to therapists who want to build profitable practices

    2. **ACTION/FILMING DIRECTIONS** (detailed):
    - Specific facial expressions and body language
    - Hand gestures and movements
    - Camera angles and transitions
    - Text overlay suggestions
    - Timing and pacing notes
    - Make it engaging and authentic

    3. **VIRAL CAPTION** (100-150 words):
    - Start with the hook
    - Expand with personal story or insight
    - Include specific details or numbers when possible
    - End with engaging question to drive comments
    - Feel conversational and authentic
    - Include call-to-action for engagement

    4. **STRATEGIC HASHTAGS** (15-20 hashtags):
    - Mix of popular and niche hashtags
    - Include therapy/mental health hashtags
    - Add business/entrepreneur hashtags
    - Include trending hashtags when relevant
    - Optimize for discoverability

    VIRAL SUCCESS FACTORS TO INCLUDE:
    - Contrarian takes that spark debate
    - Specific numbers and results
    - Personal vulnerability and authenticity
    - Relatable struggles and wins
    - Clear value proposition
    - Strong hook that creates pattern interrupt

    BRAND CONTEXT: ${brand?.brandStatement || 'Therapist helping people build successful practices'}
    TARGET: ${brand?.idealClientPersona || 'Therapists who want to build profitable, impactful practices'}

    Format your response exactly like this:

    HOOK:
    [Your viral hook here]

    ACTION:
    [Your detailed filming directions here]

    CAPTION:
    [Your viral caption here]

    HASHTAGS:
    [Your strategic hashtags here]
  `, 'viral-reel');

  const messages = [
    {
      role: 'system',
      content: `You are a viral content strategist who creates scroll-stopping reel content for therapists. You understand what makes content go viral on Instagram, TikTok, and YouTube Shorts.

Your specialty is creating COMPLETE reel packages that include:
1. Hooks that stop the scroll in 3 seconds
2. Detailed filming directions for maximum engagement
3. Captions that drive comments and saves
4. Strategic hashtag combinations for viral reach

You create content for therapists who want to:
- Build profitable practices
- Attract ideal clients
- Challenge industry myths
- Share authentic stories
- Provide value while building authority

VIRAL FORMULAS YOU USE:
- "Unpopular opinion: [contrarian take]"
- "POV: You're explaining [relatable scenario]"
- "What [industry] doesn't want you to know..."
- "[Time period] ago: [struggle]. Today: [success]"
- "The real reason [common problem]..."

Your content is bold, authentic, and designed to spark engagement through debate, relatability, and value.`
    },
    {
      role: 'user',
      content: brandedPrompt
    }
  ];

  try {
    console.log('📡 Sending viral reel generation request...')
    const result = await apiConnectionManager.makeApiCall(messages, {
      max_tokens: 2000,
      temperature: 0.9,
      top_p: 1,
      frequency_penalty: 0.3,
      presence_penalty: 0.3
    });
    
    console.log('✅ Viral reel content generated successfully')
    
    // Parse the structured response
    const sections = result.split(/(?:HOOK:|ACTION:|CAPTION:|HASHTAGS:)/);
    
    const reelContent = {
      hook: sections[1]?.trim() || template.hookExamples?.[0] || "Unpopular opinion: Most therapists are broke because they're afraid to charge their worth",
      action: sections[2]?.trim() || template.actionSuggestions?.[0] || "Start with serious expression, then confident smile. Use hand gestures to emphasize points.",
      caption: sections[3]?.trim() || `${template.hookExamples?.[0] || "Bold statement"}\n\nThis mindset shift changed everything for my practice.\n\nWhat's your biggest challenge as a therapist? 👇`,
      hashtags: sections[4]?.trim() || "#therapist #mentalhealth #therapy #therapistlife #privatepractice #therapistbusiness #mentalwellness #therapisttips #selfcare #healing #mentalhealthmatters #therapyworks #mindfulness #wellness #growth"
    };
    
    return reelContent;
  } catch (error) {
    console.error('❌ Error generating viral reel content:', error)
    
    // Fallback to template-based content
    console.log('🔄 Falling back to template-based content...')
    return {
      hook: template.hookExamples?.[0] || "Unpopular opinion: Most therapists undervalue their expertise",
      action: template.actionSuggestions?.[0] || "Look directly at camera with confidence. Use hand gestures to emphasize key points. End with encouraging smile.",
      caption: `${template.hookExamples?.[0] || "Bold statement about therapy"}\n\nThis is exactly what I wish someone told me when I started my practice.\n\nThe therapy world needs more therapists who understand their worth and aren't afraid to charge accordingly.\n\nWhat's been your biggest mindset shift in practice? Let me know below! 👇\n\n#therapistlife #therapy #mentalhealth`,
      hashtags: "#therapist #mentalhealth #therapy #therapistlife #privatepractice #therapistbusiness #mentalwellness #therapisttips #selfcare #healing #mentalhealthmatters #therapyworks #mindfulness #wellness #growth"
    };
  }
}

// Use hybrid approach for content ideas
export const generateContentIdeas = async (userProfile = {}, contentPillars = []) => {
  console.log('💡 generateContentIdeas called:', { userProfile, contentPillars })
  return await hybridContentGenerator.generateContentIdeas(userProfile, contentPillars);
}

// Use hybrid approach for post content
export const generatePostContent = async (format, platform, tone, topic) => {
  console.log('📝 generatePostContent called:', { format, platform, tone, topic })
  return await hybridContentGenerator.generatePostContent(format, platform, tone, topic);
}

// Legacy template prompt generation (keeping for backwards compatibility)
export const generateTemplatePrompt = async (template, customizations) => {
  console.log('🎨 generateTemplatePrompt called:', {
    template: template.title,
    customizations,
    timestamp: new Date().toISOString()
  })

  const brand = getBrandFoundation();
  const brandColors = brand ? {
    primary: brand.primaryColor,
    secondary: brand.secondaryColor,
    accent: brand.accentColor
  } : null;

  // Get client-attraction content based on template category
  let clientContent = '';
  if (template.category === 'viral-hooks') {
    clientContent = clientGenerator.generateNicheHook('anxiety');
  } else if (template.category === 'quotes') {
    clientContent = clientGenerator.generateContentFramework('emotional_truths');
  } else if (template.category === 'tips') {
    clientContent = clientGenerator.generateContentFramework('symptom_normalization');
  } else {
    clientContent = clientGenerator.generateRelatableContent();
  }

  const brandedPrompt = generateBrandedPrompt(`
    Create a comprehensive AI image generation prompt for ${template.platform} that will generate CLIENT-ATTRACTING, emotionally connecting content.

    TEMPLATE: ${template.title}
    PLATFORM: ${template.platform}
    FORMAT: ${template.format}
    CATEGORY: ${template.category}

    CLIENT-ATTRACTION CONTENT TO FEATURE:
    "${clientContent}"

    VISUAL SPECIFICATIONS:
    - Style: ${customizations.style}
    - Colors: ${customizations.colors} ${brandColors ? `(Brand: ${brandColors.primary}, ${brandColors.secondary})` : ''}
    - Mood: ${customizations.mood}
    - Elements: ${customizations.elements}

    CLIENT-CONNECTION DESIGN REQUIREMENTS:
    1. **EMOTIONALLY SAFE VISUALS**:
    - Feature this validating message prominently: "${clientContent}"
    - Use warm, approachable typography that feels safe
    - Make text large enough to read easily on mobile
    - Create visual hierarchy that guides to the supportive message

    2. **THERAPEUTIC VISUAL ELEMENTS**:
    - Design should feel calming and non-threatening
    - Use colors that create emotional safety and warmth
    - Include visual elements that suggest healing and hope
    - Avoid clinical or sterile imagery - think cozy and welcoming

    3. **CONNECTION OPTIMIZATION**:
    - Design should look "saveable" for hard days
    - Include visual cues that suggest understanding and empathy
    - Create gentle contrast that's easy on the eyes
    - Use relatability over perfection in design language

    4. **PLATFORM OPTIMIZATION**:
    - Optimized for ${template.platform} (${template.format})
    - Mobile-first design for accessibility
    - High readability for people with anxiety/depression
    - Soothing but attention-getting aesthetic

    FORMAT YOUR RESPONSE AS A COMPLETE AI PROMPT:
    "Create a ${customizations.style} ${template.format} design for ${template.platform} featuring warm, emotionally safe text that says: '${clientContent}'. The design should use ${customizations.colors} colors with a ${customizations.mood} mood and ${customizations.elements} visual elements. Make the text clear, comforting, and easy to read. Use gentle typography that feels like a supportive friend talking. The overall aesthetic should suggest safety, understanding, and hope - perfect for people struggling with mental health challenges who need to feel seen and supported. Include visual elements that make this content feel like a warm hug.

    Style: Warm, approachable, emotionally safe
    Text treatment: Clear, comforting, easy-to-read
    Background: ${customizations.colors} palette with ${customizations.elements}
    Mood: ${customizations.mood} but gentle and supportive
    Platform: Optimized for ${template.platform} feed display

    The final design should make viewers think 'this person understands me' and feel less alone in their struggles."

    REMEMBER: This content should make potential therapy clients feel SEEN, UNDERSTOOD, and HOPEFUL about getting support!
  `, 'client-template');

  const messages = [
    {
      role: 'system',
      content: 'You create AI image prompts that generate emotionally safe, client-attracting content for therapists.'
    },
    {
      role: 'user',
      content: brandedPrompt
    }
  ];

  try {
    console.log('📡 Sending client-attraction template prompt request...')
    const result = await apiConnectionManager.makeApiCall(messages);
    console.log('✅ Client-attraction template prompt generated successfully')
    return result;
  } catch (error) {
    console.error('❌ Error generating template prompt:', error)
    // Fallback to local content
    console.log('🔄 Falling back to local template prompt...')
    return `Create a ${customizations.style} ${template.format} design for ${template.platform} featuring this supportive message: "${clientContent}". Use ${customizations.colors} colors with a ${customizations.mood} mood. Make it feel warm, safe, and emotionally connecting for people who need mental health support.`;
  }
}

// Enhanced test function that updates global connection state
export const testOpenAIConnection = async () => {
  console.log('🔍 Testing OpenAI connection...')
  return await apiConnectionManager.testConnection();
}

// Get instant content without API calls
export const getInstantContent = (niche = 'anxiety', type = 'full_post') => {
  return hybridContentGenerator.getInstantContent(niche, type);
}

// Export connection manager for components to listen to
export { apiConnectionManager };

// Export client generator for direct use
export { ClientAttractionGenerator, clientGenerator };

// Export for debugging
export const debugInfo = {
  hasApiKey: apiConnectionManager.hasValidApiKey(),
  environment: import.meta.env.NODE_ENV || 'development',
  clientDatabaseLoaded: !!VIRAL_CONTENT_DATABASE,
  hybridGeneratorReady: !!hybridContentGenerator
}

console.log('🔧 OpenAI lib initialized with viral reel generation and persistent connection:', debugInfo)