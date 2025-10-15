// Brand Integration Utilities
export const getBrandFoundation = () => {
  const brandData = localStorage.getItem('brandFoundation');
  return brandData ? JSON.parse(brandData) : null;
};

export const getBrandColors = () => {
  const brand = getBrandFoundation();
  return brand ? {
    primary: brand.primaryColor,
    secondary: brand.secondaryColor,
    accent: brand.accentColor,
    mood: brand.colorMood
  } : null;
};

export const getBrandStatement = () => {
  const brand = getBrandFoundation();
  return brand?.brandStatement || '';
};

export const getBrandPersona = () => {
  const brand = getBrandFoundation();
  return {
    persona: brand?.idealClientPersona || '',
    painPoints: brand?.clientPainPoints || '',
    outcome: brand?.desiredOutcome || '',
    approach: brand?.uniqueApproach || ''
  };
};

export const getBrandVoice = () => {
  const brand = getBrandFoundation();
  return {
    tone: brand?.brandTone || '',
    values: brand?.brandValues || '',
    style: brand?.visualStyle || ''
  };
};

export const getContentStrategy = () => {
  const brand = getBrandFoundation();
  return {
    pillars: brand?.contentPillars?.split(',').map(p => p.trim()) || [],
    platforms: brand?.primaryPlatforms || [],
    frequency: brand?.postingFrequency || '',
    audience: brand?.targetAudience || ''
  };
};

export const generateBrandedPrompt = (basePrompt, contentType = 'general') => {
  const brand = getBrandFoundation();
  if (!brand) return basePrompt;

  const brandContext = `
BRAND CONTEXT:
Practice: ${brand.practiceName || 'Mental Health Practice'}
Brand Statement: ${brand.brandStatement || 'Supporting mental health and wellness'}
Target Client: ${brand.idealClientPersona || 'individuals seeking mental health support'}
Brand Tone: ${brand.brandTone || 'professional and warm'}
Core Values: ${brand.brandValues || 'empathy, authenticity, growth'}
Visual Style: ${brand.visualStyle || 'professional'}
Brand Colors: Primary ${brand.primaryColor || '#4A90E2'}, Secondary ${brand.secondaryColor || '#7BB3F0'}
Content Pillars: ${brand.contentPillars || 'Mental Health Tips, Self-Care, Therapy Insights'}

PERSONALIZED REQUEST:
${basePrompt}

Please ensure the content aligns with the brand identity above and speaks directly to the target client persona.
`;

  return brandContext;
};

export const isBrandComplete = () => {
  const brand = getBrandFoundation();
  if (!brand) return false;
  
  const requiredFields = [
    'practiceName',
    'brandStatement', 
    'primaryColor',
    'brandTone',
    'contentPillars'
  ];
  
  return requiredFields.every(field => brand[field] && brand[field].trim() !== '');
};

export const getBrandCompletionPercentage = () => {
  const brand = getBrandFoundation();
  if (!brand) return 0;
  
  const allFields = [
    'practiceName',
    'practiceType', 
    'idealClientPersona',
    'clientPainPoints',
    'desiredOutcome',
    'uniqueApproach',
    'brandStatement',
    'primaryColor',
    'secondaryColor',
    'brandTone',
    'brandValues',
    'contentPillars',
    'primaryPlatforms'
  ];
  
  const completedFields = allFields.filter(field => {
    const value = brand[field];
    return value && (Array.isArray(value) ? value.length > 0 : value.trim() !== '');
  }).length;
  
  return Math.round((completedFields / allFields.length) * 100);
};