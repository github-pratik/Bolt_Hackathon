# EduLearn - Educational Video Platform

[![Built with Bolt.new](https://img.shields.io/badge/Built%20with-Bolt.new-blue?style=for-the-badge)](https://bolt.new)
[![Open Source](https://img.shields.io/badge/Open%20Source-100%25-green?style=for-the-badge)](https://github.com)
[![Free Forever](https://img.shields.io/badge/Free-Core_Platform-brightgreen?style=for-the-badge)](https://github.com)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Live Demo](https://img.shields.io/badge/Live-Demo-purple?style=for-the-badge)](https://edulearn.app)

**Free education for everyone: A community-driven, open-source platform empowering educators and students with accessible learning resources, optional premium content, and blockchain-verified authenticity.**

## 🎯 Live Demo

🌐 **[Try EduLearn Live](https://edulearn.app)** - Experience the full platform with demo content

## 🏆 Bolt.new Hackathon 2025 - Multi-Challenge Entry

This project participates in **8 different challenges** of the Bolt.new Hackathon:

- 🎯 **Make More Money Challenge** (RevenueCat) - Optional creator subscriptions
- 🎪 **Silly Sh!t Challenge** (Reddit) - Community integration & discussions  
- 🌐 **Custom Domain Challenge** (Entri/IONOS) - Professional domain setup
- ⛓️ **Blockchain Challenge** (Algorand) - Content verification & authenticity
- 🤖 **Conversational AI Video Challenge** (Tavus) - AI tutor integration
- 🗣️ **Voice AI Challenge** (ElevenLabs) - Voice summaries & navigation
- 🚀 **Startup Challenge** (Supabase) - Scalable backend infrastructure
- 🚀 **Deploy Challenge** (Netlify) - Professional deployment

## 📸 Screenshots

### Homepage with AI-Powered Features
![Homepage](https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=1)

### Video Player with Voice Summaries
![Video Player](https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=1)

### AI Tutor Chat Interface
![AI Tutor](https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=1)

## 🌟 Features

### 🎥 YouTube-Like Interface
- **Responsive Video Grid**: Clean, modern interface with video thumbnails, titles, and metadata
- **Advanced Video Player**: Full-featured player with play/pause, seek, volume controls, and fullscreen
- **Interactive Timestamps**: Clickable chapter markers for easy lesson navigation
- **Embed Functionality**: Generate iframe embed codes for sharing videos
- **Download Support**: Offline access for free content (premium content requires subscription)

### 📚 Educational Enhancements
- **Subject Categorization**: Filter by Math, Science, History, English, Art, Technology, Languages, Music
- **Grade Level Filtering**: K-12, College, Adult Learning with targeted content
- **Classroom Codes**: Teachers create unique codes for students to join private classrooms
- **Interactive Learning**: AI tutors, voice summaries, and chapter-based navigation

### 💰 RevenueCat Integration (Make More Money Challenge)
- **Optional Premium Content**: Creators can monetize specific videos/courses
- **Free Core Platform**: All basic features remain 100% free forever
- **Flexible Pricing**: Teachers set their own prices for premium content
- **Subscription Management**: Seamless integration with RevenueCat's payment system
- **No Forced Ads**: Revenue comes from optional premium subscriptions, not ads

### 🔗 Reddit Integration (Silly Sh!t Challenge)
- **Creator Communities**: Each teacher can create/link their own subreddit
- **Discussion Integration**: Direct links to Reddit discussions for each video
- **Community Building**: Students and teachers collaborate in dedicated forums
- **Social Learning**: Peer-to-peer learning through Reddit's proven platform

### ⛓️ Algorand Blockchain (Blockchain Challenge)
- **Content Verification**: Video metadata stored on blockchain for authenticity
- **Tamper-Proof Records**: Uploader, upload date, and content details verified
- **Premium Status Verification**: Blockchain confirms premium content legitimacy
- **Transparent History**: Public ledger ensures content integrity

### 🤖 Tavus AI Integration (Conversational AI Video Challenge)
- **AI Tutors**: Subject-specific virtual tutors (Math Maya, Science Sam, Platform Pat)
- **Real-time Conversations**: Interactive chat with AI assistants
- **Platform Guidance**: Help with navigation, subscriptions, and features
- **Educational Support**: AI tutors assist with lesson content and homework

### 🗣️ ElevenLabs Voice AI (Voice AI Challenge)
- **Voice Summaries**: AI-generated audio summaries for each video
- **Navigation Audio**: Voice-guided platform instructions
- **Accessibility**: Audio support for visually impaired users
- **Multi-language Support**: Voice generation in multiple languages

### 🚀 Supabase Backend (Startup Challenge)
- **Scalable Database**: PostgreSQL with real-time capabilities
- **Authentication**: Email/password and OAuth support
- **File Storage**: Unlimited video uploads with CDN distribution
- **Real-time Features**: Live comments, collaboration, and updates
- **Role-based Access**: Students, teachers, and admin user types

### 🌐 Custom Domain & Netlify (Custom Domain + Deploy Challenges)
- **Professional Domain**: Custom domain through Entri/IONOS integration
- **CDN Distribution**: Global content delivery via Netlify
- **SSL Security**: Automatic HTTPS with custom domain
- **Performance Optimization**: Static site generation for speed

## 🛠️ Technical Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for utility-first styling
- **DaisyUI** for pre-built components
- **Lucide React** for consistent iconography
- **Vite** for fast development and building

### Backend & Integrations
- **Supabase**: Database, authentication, file storage, real-time
- **RevenueCat**: Subscription management and payments
- **Reddit API**: Community creation and integration
- **Algorand**: Blockchain storage and verification
- **Tavus**: AI video agents and conversations
- **ElevenLabs**: Text-to-speech and voice generation

### Deployment & Domain
- **Netlify**: Static site hosting and CDN
- **Entri/IONOS**: Custom domain registration and DNS
- **GitHub**: Source code hosting and version control

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project
- API keys for all integrations (see `.env.example`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/edulearn-platform.git
   cd edulearn-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Fill in your API keys and configuration
   ```

4. **Database setup**
   - Create a new Supabase project
   - Run the migrations in `/supabase/migrations/`
   - Update your `.env` with Supabase credentials

5. **Start development server**
   ```bash
   npm run dev
   ```

### Required API Keys

```env
# Supabase (Startup Challenge)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# RevenueCat (Make More Money Challenge)
VITE_REVENUECAT_API_KEY=your_revenuecat_key

# ElevenLabs (Voice AI Challenge)
VITE_ELEVENLABS_API_KEY=your_elevenlabs_key

# Custom Domain (Custom Domain Challenge)
VITE_APP_DOMAIN=your_custom_domain.com
```

## 📊 Database Schema

The application uses Supabase PostgreSQL with the following key tables:

### Profiles
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('student', 'teacher', 'admin')),
  subscription_status TEXT DEFAULT 'free',
  reddit_username TEXT,
  revenuecat_user_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Videos
```sql
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL,
  grade_level TEXT NOT NULL,
  uploader_id UUID REFERENCES profiles(id),
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration INTEGER,
  view_count INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT FALSE,
  premium_price DECIMAL(10,2),
  algorand_txn_id TEXT,
  reddit_discussion_url TEXT,
  voice_summary_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Additional Tables
- `video_timestamps` - Chapter markers and timestamps
- `classrooms` - Teacher-created classroom groups
- `classroom_students` - Student enrollment in classrooms
- `comments` - Video comments and discussions

## 🔐 Security & Privacy

- **Row Level Security (RLS)** enabled on all Supabase tables
- **API Key Security** - All sensitive keys stored as environment variables
- **Content Verification** - Blockchain verification prevents content tampering
- **User Privacy** - Minimal data collection, GDPR compliant
- **Secure Payments** - RevenueCat handles all payment processing

## 🌍 Deployment

### Netlify Deployment (Deploy Challenge)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect GitHub repository to Netlify
   - Configure environment variables in Netlify dashboard
   - Set build command: `npm run build`
   - Set publish directory: `dist`

3. **Custom Domain Setup (Custom Domain Challenge)**
   - Register domain through Entri/IONOS
   - Configure DNS settings in IONOS dashboard
   - Add custom domain in Netlify
   - Enable SSL certificate

### Self-Hosting with Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

We welcome contributions! This is an open-source project built for the community.

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   npm run build
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Add comments for complex logic
- Ensure responsive design
- Test on multiple browsers

### Reporting Issues

- Use GitHub Issues for bug reports
- Include steps to reproduce
- Provide browser and OS information
- Add screenshots if applicable

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Core video platform
- ✅ AI voice summaries
- ✅ Premium content system
- ✅ Blockchain verification
- ✅ Custom domain deployment

### Phase 2 (Q2 2025)
- 🔄 Mobile app (React Native)
- 🔄 Advanced analytics dashboard
- 🔄 Live streaming capabilities
- 🔄 Offline video downloads
- 🔄 Multi-language support

### Phase 3 (Q3 2025)
- 📋 VR/AR learning experiences
- 📋 Advanced AI tutoring
- 📋 Certification system
- 📋 Enterprise features
- 📋 API marketplace

## 🏅 Awards & Recognition

- 🏆 **Bolt.new Hackathon 2025** - Multi-challenge participant
- 🌟 **Open Source Excellence** - MIT licensed
- 🎯 **Educational Impact** - Free core platform
- 🚀 **Technical Innovation** - AI-powered learning

## 📞 Support & Community

- **GitHub Issues**: [Report bugs or request features](https://github.com/github-pratik/Bolt_Hackathon/issues)
- **Discussions**: [Community discussions](https://github.com/github-pratik/Bolt_Hackathon/discussions)
- **Documentation**: [Wiki](https://github.com/yourusername/edulearn-platform/wiki)
- **Discord**: [Join our community](https://discord.gg/edulearn)
- **Email**: support@edulearn.app

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Bolt.new** - For the amazing development platform and hackathon
- **Supabase** - For the scalable backend infrastructure
- **RevenueCat** - For seamless subscription management
- **Reddit** - For community platform integration
- **Algorand** - For blockchain verification capabilities
- **Tavus** - For AI video agent technology
- **ElevenLabs** - For voice AI capabilities
- **Netlify** - For reliable hosting and deployment
- **Entri/IONOS** - For domain registration services

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/edulearn-platform&type=Date)](https://star-history.com/#yourusername/edulearn-platform&Date)

---

**Built with ❤️ and [Bolt.new](https://bolt.new) for the Bolt.new Hackathon 2025**

*Participating in 8 challenges: Make More Money, Silly Sh!t, Custom Domain, Blockchain, Conversational AI Video, Voice AI, Startup, and Deploy*

---

### 🚀 Ready to contribute? 

1. ⭐ Star this repository
2. 🍴 Fork the project
3. 🔧 Make your improvements
4. 📤 Submit a pull request

**Let's build the future of education together!** 🎓✨
