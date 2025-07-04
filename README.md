# Clarity Content Studio

An AI-powered content creation platform specifically designed for licensed psychotherapists to plan, generate, and organize their social media content ethically and efficiently.

## Features

### 🎯 Core Modules

- **Brand Foundation Builder**: Step-by-step guided form to capture ideal client demographics, brand voice, values, and content goals
- **Content Calendar**: Monthly/weekly/daily view with drag-and-drop planning and CSV export
- **Post Generator**: AI-powered content creation for various formats (carousel, reel, story, text post)
- **Template Gallery**: Professional design templates optimized for mental health professionals
- **Content Vault**: Searchable library of content ideas with filtering and favorites

### 🤖 Smart Features

- **"I'm Stuck" Button**: Quick content idea generation based on user profile
- **Weekly Prompt Generator**: Dashboard widget for inspiration
- **Editable Content Pillars**: Customizable content themes per user
- **Platform-Specific Content**: Tailored for Instagram, TikTok, LinkedIn, and Facebook

### 🔐 Backend & Authentication

- User account system with email/Google auth
- Private data storage for content calendars and brand profiles
- Supabase backend integration
- OpenAI API integration for content generation

## Tech Stack

- **Frontend**: React 18, Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **AI Integration**: OpenAI GPT-4 API
- **Routing**: React Router DOM
- **UI Components**: Custom component library
- **Icons**: React Icons (Feather Icons)
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd clarity-content-studio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Fill in your environment variables:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_OPENAI_API_KEY`: Your OpenAI API key

4. Start the development server:
```bash
npm run dev
```

### Supabase Setup

Create the following tables in your Supabase database:

```sql
-- User profiles table
CREATE TABLE user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  practice_name TEXT,
  brand_foundation JSONB,
  content_pillars TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content calendar table
CREATE TABLE content_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  platform TEXT NOT NULL,
  title TEXT NOT NULL,
  caption TEXT,
  hashtags TEXT,
  visual_notes TEXT,
  cta TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content vault table
CREATE TABLE content_ideas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  platform TEXT,
  category TEXT,
  tags TEXT[],
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │   └── Header.jsx
│   └── UI/
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Input.jsx
│       ├── Select.jsx
│       └── TextArea.jsx
├── contexts/
│   ├── AuthContext.jsx
│   └── UserDataContext.jsx
├── lib/
│   ├── supabase.js
│   └── openai.js
├── pages/
│   ├── Dashboard.jsx
│   ├── BrandBuilder.jsx
│   ├── ContentCalendar.jsx
│   ├── PostGenerator.jsx
│   ├── TemplateGallery.jsx
│   ├── ContentVault.jsx
│   └── Login.jsx
├── common/
│   └── SafeIcon.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Design Philosophy

### 🎨 Visual Design
- **Clean, calming UI** with soft blues, greens, and warm neutrals
- **Rounded cards** and friendly sans-serif fonts
- **Easy on the eyes** for long-term use
- **Responsive design** that works on all devices

### 👩‍⚕️ User Experience
- **Non-tech-savvy friendly** with intuitive navigation
- **Step-by-step guidance** for complex processes
- **Clear visual hierarchy** and consistent patterns
- **Accessible design** following WCAG guidelines

### 🔒 Ethical Considerations
- **HIPAA-compliant** design patterns
- **Professional disclaimers** in AI-generated content
- **Ethical content guidelines** built into generators
- **Privacy-first** approach to user data

## Usage

### Brand Foundation Builder
1. Complete the 4-step guided process
2. Define your ideal client avatar
3. Set your brand voice and values
4. Download your brand guide

### Content Calendar
1. Select dates on the calendar
2. Add posts with platform-specific details
3. Export your calendar to CSV
4. Integrate with scheduling tools

### Post Generator
1. Choose content format and platform
2. Select tone and topic
3. Generate AI-powered content
4. Copy and customize as needed

### Template Gallery
1. Browse professional templates
2. Filter by platform and category
3. Open in Canva for customization
4. Save favorites for later use

### Content Vault
1. Save and organize content ideas
2. Search by keywords or tags
3. Filter by platform and category
4. Mark favorites and copy content

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@claritycontent.studio or join our Discord community.

## Roadmap

- [ ] Integration with scheduling tools (Later, Planoly)
- [ ] Advanced analytics and insights
- [ ] Team collaboration features
- [ ] Mobile app development
- [ ] Additional AI models integration
- [ ] Template marketplace
- [ ] Compliance tracking tools
- [ ] Client feedback integration