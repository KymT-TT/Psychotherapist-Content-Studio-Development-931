const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const generateContent = async (prompt, type = 'post') => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a content creation assistant for licensed therapists. Create ethical, professional, and engaging social media content that follows mental health best practices. Always include appropriate disclaimers and avoid giving direct therapeutic advice.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate content');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};

export const generateContentIdeas = async (userProfile, contentPillars) => {
  const prompt = `Based on this therapist's profile and content pillars, generate 3 engaging social media post ideas:
  
  Profile: ${JSON.stringify(userProfile)}
  Content Pillars: ${contentPillars.join(', ')}
  
  Please provide 3 post ideas with:
  - Hook/title
  - Main message
  - Call to action
  - Suggested platform
  
  Keep content ethical, professional, and engaging for mental health audiences.`;

  return await generateContent(prompt, 'ideas');
};