// AI Image Prompt Generator utilities
export const generateImagePrompt = (template, customizations) => {
  const { style, colors, mood, elements } = customizations;
  
  const styleMap = {
    professional: 'professional and clean',
    warm: 'warm and friendly',
    modern: 'modern and trendy',
    minimalist: 'minimalist and simple',
    artistic: 'artistic and creative'
  };

  const colorMap = {
    calming: 'calming blues and greens',
    warm: 'warm oranges and yellows',
    neutral: 'neutral grays and beiges',
    pastel: 'soft pastel colors',
    earth: 'earth tones and natural colors'
  };

  const moodMap = {
    inspiring: 'inspiring and uplifting',
    calming: 'calming and peaceful',
    professional: 'professional and trustworthy',
    gentle: 'gentle and nurturing',
    hopeful: 'hopeful and optimistic'
  };

  const elementMap = {
    minimal: 'minimal design elements',
    nature: 'nature-inspired elements',
    abstract: 'abstract shapes and forms',
    geometric: 'geometric patterns',
    organic: 'organic textures and forms'
  };

  const prompt = `Create a ${styleMap[style]} ${template.format.toLowerCase()} design for ${template.platform} with the following specifications:

CONTENT: "${template.sampleText}"

DESIGN SPECIFICATIONS:
- Style: ${styleMap[style]}
- Color Palette: ${colorMap[colors]}
- Mood: ${moodMap[mood]}
- Visual Elements: ${elementMap[elements]}
- Format: ${template.format}
- Platform: ${template.platform}

THERAPY-FOCUSED REQUIREMENTS:
- Professional yet approachable aesthetic
- HIPAA-compliant and ethical design
- Trauma-informed visual approach
- Accessible design with good contrast
- Inclusive and welcoming feel
- Mental health appropriate imagery

DESIGN ELEMENTS TO INCLUDE:
${template.designElements.map(element => `- ${element}`).join('\n')}

TECHNICAL SPECIFICATIONS:
- High resolution (300 DPI minimum)
- ${template.format} optimized dimensions
- Social media ready format
- Mobile-friendly design
- Clear, readable typography
- Professional color scheme

BRAND GUIDELINES:
- Conveys safety and trust
- Appropriate for mental health context
- Maintains professional boundaries
- Supports therapeutic messaging
- Avoids triggering imagery

Please create a design that feels therapeutic, professional, and visually engaging while being appropriate for mental health content sharing.`;

  return prompt;
};

export const promptTemplates = {
  quotes: {
    basePrompt: "Create an inspirational quote design for mental health awareness",
    elements: ["Typography focus", "Calming background", "Inspirational imagery", "Readable text"]
  },
  tips: {
    basePrompt: "Design a clean, educational layout for sharing mental health tips",
    elements: ["Clear sections", "Easy to read", "Helpful icons", "Structured layout"]
  },
  educational: {
    basePrompt: "Create a professional infographic for mental health education",
    elements: ["Data visualization", "Clear hierarchy", "Educational icons", "Professional layout"]
  },
  promotional: {
    basePrompt: "Design a gentle, welcoming promotional post for therapy services",
    elements: ["Welcoming tone", "Professional branding", "Contact information", "Trustworthy design"]
  },
  personal: {
    basePrompt: "Create an uplifting design for sharing therapy success stories",
    elements: ["Positive imagery", "Celebration elements", "Progress indicators", "Hopeful messaging"]
  }
};

export const aiPlatforms = [
  {
    name: 'ChatGPT',
    url: 'https://chat.openai.com/',
    description: 'Best for detailed prompts and conversational refinement',
    icon: '🤖'
  },
  {
    name: 'DALL-E',
    url: 'https://openai.com/dall-e-2/',
    description: 'OpenAI\'s image generation tool',
    icon: '🎨'
  },
  {
    name: 'Midjourney',
    url: 'https://midjourney.com/',
    description: 'High-quality artistic image generation',
    icon: '✨'
  },
  {
    name: 'Stable Diffusion',
    url: 'https://stability.ai/',
    description: 'Open-source image generation',
    icon: '🔧'
  }
];