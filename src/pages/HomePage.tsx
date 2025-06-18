import React, { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, Bot, Crown, Sparkles, Volume2, Star, Zap } from 'lucide-react';
import VideoCard from '../components/Video/VideoCard';
import AITutorChat from '../components/AI/AITutorChat';
import DemoFeatures from '../components/Demo/DemoFeatures';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { navigationInstructions, generateNavigationAudio } from '../lib/integrations/elevenlabs';

const HomePage: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [showAITutor, setShowAITutor] = useState(false);
  const [showDemoFeatures, setShowDemoFeatures] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState({
    name: 'Math Tutor Maya',
    subject: 'Mathematics',
  });
  
  const { user } = useAuth();

  const subjects = ['All', 'Mathematics', 'Science', 'History', 'English', 'Art', 'Technology', 'Languages', 'Music'];
  const gradeLevels = ['All', 'Elementary (K-5)', 'Middle School (6-8)', 'High School (9-12)', 'College', 'Adult Learning'];

  const defaultTutors = [
    {
      name: 'Math Tutor Maya',
      subject: 'Mathematics',
    },
    {
      name: 'Science Guide Sam',
      subject: 'Science',
    },
    {
      name: 'Platform Helper Pat',
      subject: 'General',
    },
  ];

  useEffect(() => {
    fetchVideos();
  }, [selectedSubject, selectedGrade, showPremiumOnly]);

  useEffect(() => {
    // Play welcome message on first visit
    playWelcomeMessage();
  }, []);

  const playWelcomeMessage = async () => {
    try {
      const audioUrl = await generateNavigationAudio(navigationInstructions.welcomeMessage);
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.volume = 0.7;
        audio.play().catch(() => {
          // Audio play failed, likely due to browser autoplay policy - this is expected
        });
      }
    } catch (error) {
      // Silently handle audio errors - voice features are optional
      console.debug('Voice feature unavailable:', error);
    }
  };

  const fetchVideos = async () => {
    try {
      let query = supabase
        .from('videos')
        .select(`
          *,
          uploader:profiles(full_name)
        `)
        .order('created_at', { ascending: false });

      if (selectedSubject !== 'All') {
        query = query.eq('subject', selectedSubject);
      }

      if (selectedGrade !== 'All') {
        query = query.eq('grade_level', selectedGrade);
      }

      if (showPremiumOnly) {
        query = query.eq('is_premium', true);
      }

      const { data, error } = await query.limit(20);

      if (error) {
        console.warn('Database query failed, using demo data:', error);
        throw error;
      }
      
      setVideos(data || []);
    } catch (error) {
      console.warn('Error fetching videos, loading demo content:', error);
      // Mock data for demonstration
      setVideos([
        {
          id: '1',
          title: 'Introduction to Algebra - Basic Concepts',
          description: 'Learn the fundamentals of algebra with clear explanations and examples.',
          subject: 'Mathematics',
          grade_level: 'High School (9-12)',
          duration: 1200,
          view_count: 15420,
          is_premium: false,
          premium_price: null,
          created_at: '2024-01-15T10:30:00Z',
          thumbnail_url: 'https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          uploader: { full_name: 'Prof. Sarah Johnson' }
        },
        {
          id: '2',
          title: 'Advanced Calculus Masterclass',
          description: 'Deep dive into advanced calculus concepts with practical applications.',
          subject: 'Mathematics',
          grade_level: 'College',
          duration: 2400,
          view_count: 8930,
          is_premium: true,
          premium_price: 19.99,
          created_at: '2024-01-14T14:20:00Z',
          thumbnail_url: 'https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          uploader: { full_name: 'Dr. Michael Chen' }
        },
        {
          id: '3',
          title: 'The Solar System Explained',
          description: 'A comprehensive guide to our solar system and the planets.',
          subject: 'Science',
          grade_level: 'Middle School (6-8)',
          duration: 980,
          view_count: 23100,
          is_premium: false,
          premium_price: null,
          created_at: '2024-01-13T09:15:00Z',
          thumbnail_url: 'https://images.pexels.com/photos/73873/star-clusters-rosette-nebula-star-galaxies-73873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          uploader: { full_name: 'Dr. Emily Rodriguez' }
        },
        {
          id: '4',
          title: 'Premium Python Programming Course',
          description: 'Complete Python programming course with advanced projects and certification.',
          subject: 'Technology',
          grade_level: 'College',
          duration: 18000,
          view_count: 31200,
          is_premium: true,
          premium_price: 49.99,
          created_at: '2024-01-12T13:20:00Z',
          thumbnail_url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          uploader: { full_name: 'Dev. Alex Thompson' }
        },
        {
          id: '5',
          title: 'World War II History Overview',
          description: 'Understanding the key events and impact of World War II.',
          subject: 'History',
          grade_level: 'High School (9-12)',
          duration: 1500,
          view_count: 12500,
          is_premium: false,
          premium_price: null,
          created_at: '2024-01-11T16:45:00Z',
          thumbnail_url: 'https://images.pexels.com/photos/159868/lost-places-old-decay-ruin-159868.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          uploader: { full_name: 'Prof. David Kim' }
        },
        {
          id: '6',
          title: 'Digital Art Masterclass - Premium Content',
          description: 'Professional digital art techniques with industry secrets and portfolio building.',
          subject: 'Art',
          grade_level: 'College',
          duration: 3600,
          view_count: 7800,
          is_premium: true,
          premium_price: 29.99,
          created_at: '2024-01-10T11:30:00Z',
          thumbnail_url: 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          uploader: { full_name: 'Artist Lisa Wong' }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const openAITutor = (tutor: any) => {
    setSelectedTutor(tutor);
    setShowAITutor(true);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="glass-card bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 border-primary-100 p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-secondary-500/5 to-accent-500/5"></div>
        <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full opacity-20 float-animation"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-accent-200 to-primary-200 rounded-full opacity-20 float-animation" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10">
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glass-lg">
            <Sparkles className="text-white" size={32} />
          </div>
          
          <h1 className="text-5xl font-bold text-gradient mb-4">
            Welcome to EduLearn
          </h1>
          <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Free education for everyone: A community-driven platform empowering educators and students with accessible learning resources, optional premium content, and AI-powered voice features.
          </p>
          
          <div className="flex items-center justify-center space-x-4 mb-8 flex-wrap gap-2">
            <div className="glass-button bg-gradient-to-r from-green-100 to-emerald-100 border-green-200 text-green-700 font-medium">
              <TrendingUp size={16} className="mr-2" />
              100% Free Core
            </div>
            <div className="glass-button bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200 text-blue-700 font-medium">
              <Volume2 size={16} className="mr-2" />
              Voice AI
            </div>
            <div className="glass-button bg-gradient-to-r from-purple-100 to-indigo-100 border-purple-200 text-purple-700 font-medium">
              <Zap size={16} className="mr-2" />
              Open Source
            </div>
            <div className="glass-button bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200 text-yellow-700 font-medium premium-glow">
              <Crown size={16} className="mr-2" />
              Optional Premium
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {defaultTutors.map((tutor, index) => (
              <button
                key={index}
                onClick={() => openAITutor(tutor)}
                className="glass-button btn-glass-primary font-medium micro-bounce"
              >
                <Bot size={16} className="mr-2" />
                Chat with {tutor.name}
              </button>
            ))}
            <button
              onClick={() => setShowDemoFeatures(true)}
              className="glass-button btn-glass-secondary font-medium micro-bounce"
            >
              <Sparkles size={16} className="mr-2" />
              View Demo Features
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-6">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glass">
              <Filter size={20} className="text-white" />
            </div>
            <span className="text-lg font-semibold text-neutral-800">Filter Content</span>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="glass-input px-4 py-2 text-sm font-medium min-w-[140px]"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="glass-input px-4 py-2 text-sm font-medium min-w-[160px]"
            >
              {gradeLevels.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>

            <label className="flex items-center space-x-3 cursor-pointer glass-button">
              <input
                type="checkbox"
                checked={showPremiumOnly}
                onChange={(e) => setShowPremiumOnly(e.target.checked)}
                className="w-4 h-4 text-primary-600 bg-white border-neutral-300 rounded focus:ring-primary-500 focus:ring-2"
              />
              <span className="text-sm font-medium flex items-center space-x-2">
                <Crown size={16} className="text-yellow-500" />
                <span>Premium Only</span>
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-neutral-700">
            Showing {videos.length} videos
            {selectedSubject !== 'All' && ` in ${selectedSubject}`}
            {selectedGrade !== 'All' && ` for ${selectedGrade}`}
            {showPremiumOnly && ' (Premium only)'}
          </span>
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"></div>
              <span className="font-medium text-neutral-600">{videos.filter(v => !v.is_premium).length} Free</span>
            </span>
            <span className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
              <span className="font-medium text-neutral-600">{videos.filter(v => v.is_premium).length} Premium</span>
            </span>
            <span className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500"></div>
              <span className="font-medium text-neutral-600">Voice Enhanced</span>
            </span>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 shimmer"></div>
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg shimmer"></div>
                <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg shimmer w-3/4"></div>
                <div className="h-3 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg shimmer w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}

      {!loading && videos.length === 0 && (
        <div className="glass-card p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
            <Search size={32} className="text-neutral-400" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-800 mb-2">No videos found</h3>
          <p className="text-neutral-600">
            Try adjusting your filters or check back later for new content.
          </p>
        </div>
      )}

      {/* AI Tutor Chat */}
      <AITutorChat
        isOpen={showAITutor}
        onClose={() => setShowAITutor(false)}
        tutorName={selectedTutor.name}
        subject={selectedTutor.subject}
        userId={user?.id || 'anonymous'}
      />

      {/* Demo Features Modal */}
      <DemoFeatures
        showModal={showDemoFeatures}
        onClose={() => setShowDemoFeatures(false)}
      />
    </div>
  );
};

export default HomePage;