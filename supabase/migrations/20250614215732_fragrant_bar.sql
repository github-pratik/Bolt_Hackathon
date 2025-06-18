/*
  # Fix Videos and Profiles Relationship

  1. Database Schema Fix
    - Ensure proper foreign key relationship between videos and profiles tables
    - Add missing constraints and indexes
    - Update RLS policies if needed

  2. Data Integrity
    - Ensure all existing data maintains referential integrity
    - Add proper constraints for data validation
*/

-- First, let's ensure the profiles table exists with correct structure
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  role text DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  subscription_status text DEFAULT 'free',
  reddit_username text,
  revenuecat_user_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on profiles if not already enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create or replace RLS policies for profiles
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Now ensure the videos table has the correct structure
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  subject text NOT NULL,
  grade_level text NOT NULL,
  uploader_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  video_url text NOT NULL,
  thumbnail_url text,
  duration integer DEFAULT 0,
  view_count integer DEFAULT 0,
  is_premium boolean DEFAULT false,
  premium_price numeric(10,2),
  algorand_txn_id text,
  reddit_discussion_url text,
  voice_summary_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- If the foreign key constraint doesn't exist, add it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'videos_uploader_id_fkey' 
    AND table_name = 'videos'
  ) THEN
    -- First, ensure all existing videos have valid uploader_id values
    -- Set NULL uploader_id for any orphaned records
    UPDATE videos 
    SET uploader_id = NULL 
    WHERE uploader_id IS NOT NULL 
    AND uploader_id NOT IN (SELECT id FROM profiles);
    
    -- Add the foreign key constraint
    ALTER TABLE videos 
    ADD CONSTRAINT videos_uploader_id_fkey 
    FOREIGN KEY (uploader_id) REFERENCES profiles(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Enable RLS on videos if not already enabled
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Create or replace RLS policies for videos
DROP POLICY IF EXISTS "Anyone can read videos" ON videos;
DROP POLICY IF EXISTS "Authenticated users can insert videos" ON videos;
DROP POLICY IF EXISTS "Users can update own videos" ON videos;
DROP POLICY IF EXISTS "Users can delete own videos" ON videos;

CREATE POLICY "Anyone can read videos"
  ON videos
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert videos"
  ON videos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploader_id);

CREATE POLICY "Users can update own videos"
  ON videos
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = uploader_id);

CREATE POLICY "Users can delete own videos"
  ON videos
  FOR DELETE
  TO authenticated
  USING (auth.uid() = uploader_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_videos_uploader_id ON videos(uploader_id);
CREATE INDEX IF NOT EXISTS idx_videos_subject ON videos(subject);
CREATE INDEX IF NOT EXISTS idx_videos_grade_level ON videos(grade_level);
CREATE INDEX IF NOT EXISTS idx_videos_is_premium ON videos(is_premium);
CREATE INDEX IF NOT EXISTS idx_videos_created_at ON videos(created_at DESC);