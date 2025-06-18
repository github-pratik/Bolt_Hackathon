/*
  # Fix Videos and Profiles Relationship

  1. Tables
    - Ensure profiles table exists with correct structure
    - Ensure videos table exists with correct foreign key relationship
  
  2. Security
    - Enable RLS on both tables
    - Add appropriate policies for data access
  
  3. Performance
    - Add indexes for common queries
*/

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY,
  email text NOT NULL,
  full_name text,
  role text DEFAULT 'student',
  subscription_status text DEFAULT 'free',
  reddit_username text,
  revenuecat_user_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add foreign key to auth.users if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'profiles_id_fkey' 
    AND table_name = 'profiles'
  ) THEN
    ALTER TABLE profiles 
    ADD CONSTRAINT profiles_id_fkey 
    FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Add role check constraint if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'profiles_role_check' 
    AND table_name = 'profiles'
  ) THEN
    ALTER TABLE profiles 
    ADD CONSTRAINT profiles_role_check 
    CHECK (role = ANY (ARRAY['student'::text, 'teacher'::text, 'admin'::text]));
  END IF;
END $$;

-- Create videos table if it doesn't exist
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  subject text NOT NULL,
  grade_level text NOT NULL,
  uploader_id uuid,
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

-- Clean up any orphaned video records before adding foreign key
UPDATE videos 
SET uploader_id = NULL 
WHERE uploader_id IS NOT NULL 
AND NOT EXISTS (SELECT 1 FROM profiles WHERE profiles.id = videos.uploader_id);

-- Add foreign key constraint for videos.uploader_id
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'videos_uploader_id_fkey' 
    AND table_name = 'videos'
  ) THEN
    ALTER TABLE videos 
    ADD CONSTRAINT videos_uploader_id_fkey 
    FOREIGN KEY (uploader_id) REFERENCES profiles(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Enable RLS on videos  
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY IF NOT EXISTS "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create RLS policies for videos
CREATE POLICY IF NOT EXISTS "Anyone can read videos"
  ON videos
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY IF NOT EXISTS "Authenticated users can insert videos"
  ON videos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploader_id);

CREATE POLICY IF NOT EXISTS "Users can update own videos"
  ON videos
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = uploader_id);

CREATE POLICY IF NOT EXISTS "Users can delete own videos"
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

-- Create other required tables
CREATE TABLE IF NOT EXISTS video_timestamps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos(id) ON DELETE CASCADE,
  title text NOT NULL,
  time_seconds integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE video_timestamps ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Anyone can read video timestamps"
  ON video_timestamps
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY IF NOT EXISTS "Video owners can manage timestamps"
  ON video_timestamps
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM videos 
    WHERE videos.id = video_timestamps.video_id 
    AND videos.uploader_id = auth.uid()
  ));

CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Anyone can read comments"
  ON comments
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY IF NOT EXISTS "Authenticated users can insert comments"
  ON comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update own comments"
  ON comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can delete own comments"
  ON comments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS classrooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text UNIQUE NOT NULL,
  teacher_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE classrooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Anyone can read classrooms"
  ON classrooms
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY IF NOT EXISTS "Teachers can manage own classrooms"
  ON classrooms
  FOR ALL
  TO authenticated
  USING (auth.uid() = teacher_id);

CREATE TABLE IF NOT EXISTS classroom_students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  classroom_id uuid REFERENCES classrooms(id) ON DELETE CASCADE,
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at timestamptz DEFAULT now(),
  UNIQUE(classroom_id, student_id)
);

ALTER TABLE classroom_students ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Students can read own classroom memberships"
  ON classroom_students
  FOR SELECT
  TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY IF NOT EXISTS "Students can join classrooms"
  ON classroom_students
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY IF NOT EXISTS "Teachers can manage classroom students"
  ON classroom_students
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM classrooms 
    WHERE classrooms.id = classroom_students.classroom_id 
    AND classrooms.teacher_id = auth.uid()
  ));