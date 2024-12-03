-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('student', 'instructor', 'admin');
CREATE TYPE content_type AS ENUM ('video', 'text', 'article', 'ebook', 'research_paper', 'file');
CREATE TYPE enrollment_status AS ENUM ('active', 'completed', 'cancelled');
CREATE TYPE lesson_status AS ENUM ('not_started', 'in_progress', 'completed');
CREATE TYPE payment_method AS ENUM ('crypto', 'card');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed');

-- Create login_attempts table
CREATE TABLE login_attempts (
    address TEXT PRIMARY KEY,
    nonce TEXT NOT NULL,
    ttl TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    auth_user_id UUID UNIQUE,
    address TEXT UNIQUE,
    avatar_url TEXT NULL,
    full_name TEXT NULL,
    email TEXT NULL UNIQUE,
    role user_role DEFAULT 'student',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_auth TIMESTAMP WITH TIME ZONE NULL,
    last_auth_status TEXT NULL,
    nonce TEXT NULL,
    billing_address JSONB NULL,
    payment_method JSONB NULL
);

-- Create courses table
CREATE TABLE courses (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    instructor_id TEXT NOT NULL REFERENCES users(id),
    price NUMERIC NOT NULL,
    currency TEXT NOT NULL,
    duration INTEGER NOT NULL, -- in minutes
    level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    categories TEXT[] NOT NULL,
    thumbnail_url TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create modules table
CREATE TABLE modules (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    order_number INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(course_id, order_number)
);

-- Create lessons table
CREATE TABLE lessons (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    module_id TEXT NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    content_type content_type NOT NULL,
    content_url TEXT NOT NULL,
    duration INTEGER NOT NULL,
    order_number INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(module_id, order_number)
);

-- Create payments table
CREATE TABLE payments (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id),
    course_id TEXT NOT NULL REFERENCES courses(id),
    amount NUMERIC NOT NULL,
    currency TEXT NOT NULL,
    payment_method payment_method NOT NULL,
    status payment_status DEFAULT 'pending',
    transaction_hash TEXT,
    signature TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create enrollments table
CREATE TABLE enrollments (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id),
    course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    status enrollment_status DEFAULT 'active',
    progress NUMERIC NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    payment_id TEXT REFERENCES payments(id),
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    last_accessed TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, course_id)
);

-- Create progress_tracking table
CREATE TABLE progress_tracking (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    enrollment_id TEXT NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    status lesson_status DEFAULT 'not_started',
    progress_percentage NUMERIC NOT NULL DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    last_position INTEGER,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(enrollment_id, lesson_id)
);

-- Create indexes
CREATE INDEX idx_users_address ON users(address);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_courses_instructor ON courses(instructor_id);
CREATE INDEX idx_courses_published ON courses(published);
CREATE INDEX idx_modules_course ON modules(course_id);
CREATE INDEX idx_lessons_module ON lessons(module_id);
CREATE INDEX idx_enrollments_user ON enrollments(user_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_progress_enrollment ON progress_tracking(enrollment_id);
CREATE INDEX idx_progress_lesson ON progress_tracking(lesson_id);
CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_course ON payments(course_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_enrollments_status ON enrollments(status);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON courses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_modules_updated_at
    BEFORE UPDATE ON modules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at
    BEFORE UPDATE ON lessons
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_progress_tracking_updated_at
    BEFORE UPDATE ON progress_tracking
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create content table
CREATE TABLE content (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    description TEXT,
    creator_id TEXT NOT NULL REFERENCES users(id),
    type content_type NOT NULL,
    file_url TEXT NOT NULL,
    thumbnail_url TEXT,
    price NUMERIC NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'USDC',
    metadata JSONB,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create content_categories table for tagging
CREATE TABLE content_categories (
    content_id TEXT REFERENCES content(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    PRIMARY KEY (content_id, category)
);

-- Create purchases table
CREATE TABLE content_purchases (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    content_id TEXT NOT NULL REFERENCES content(id),
    buyer_id TEXT NOT NULL REFERENCES users(id),
    transaction_signature TEXT NOT NULL,
    price_paid NUMERIC NOT NULL,
    currency TEXT NOT NULL,
    purchased_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_purchases ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public insert to users" ON users;
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;

-- Updated auth policies
CREATE POLICY "Allow public insert to users"
    ON users FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Enable read for users"
    ON users FOR SELECT
    USING (true);

CREATE POLICY "Enable update for own profile"
    ON users FOR UPDATE
    USING (auth.uid()::text = id)
    WITH CHECK (auth.uid()::text = id);

-- Login attempts policies
CREATE POLICY "Enable insert for anon"
    ON login_attempts FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Enable select for authenticated"
    ON login_attempts FOR SELECT
    USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Enable delete for service role"
    ON login_attempts FOR DELETE
    USING (auth.role() = 'service_role');

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON login_attempts TO anon, authenticated;
GRANT ALL ON users TO anon;
GRANT ALL ON users TO authenticated;
GRANT ALL ON users TO service_role;

-- Create new policies with TEXT comparison
CREATE POLICY "Public can view published courses"
    ON courses FOR SELECT
    USING (published = true);

CREATE POLICY "Instructors can manage their own courses"
    ON courses FOR ALL
    USING (instructor_id = auth.uid()::text);

CREATE POLICY "Enrolled users can view course content"
    ON modules FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM enrollments
        WHERE user_id = auth.uid()::text
        AND course_id = modules.course_id
    ));

CREATE POLICY "Users can view their own enrollments"
    ON enrollments FOR SELECT
    USING (user_id = auth.uid()::text);

CREATE POLICY "Instructors can view course enrollments"
    ON enrollments FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM courses
        WHERE courses.id = enrollments.course_id
        AND courses.instructor_id = auth.uid()::text
    ));

-- Add policies for content tables
CREATE POLICY "Public can view published content"
    ON content FOR SELECT
    USING (published = true);

CREATE POLICY "Creators can manage their own content"
    ON content FOR ALL
    USING (creator_id = auth.uid()::text);

CREATE POLICY "Users can view their purchased content"
    ON content FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM content_purchases
        WHERE content_id = id
        AND buyer_id = auth.uid()::text
    ));

CREATE POLICY "Users can view their own purchases"
    ON content_purchases FOR SELECT
    USING (buyer_id = auth.uid()::text);

CREATE POLICY "Users can create purchases"
    ON content_purchases FOR INSERT
    WITH CHECK (buyer_id = auth.uid()::text);

-- Add policies for content categories
CREATE POLICY "Anyone can view content categories"
    ON content_categories FOR SELECT
    USING (true);

CREATE POLICY "Creators can manage content categories"
    ON content_categories FOR ALL
    USING (EXISTS (
        SELECT 1 FROM content
        WHERE content.id = content_id
        AND content.creator_id = auth.uid()::text
    ));

-- Add policies for progress tracking
CREATE POLICY "Users can view their own progress"
    ON progress_tracking FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM enrollments
        WHERE enrollments.id = enrollment_id
        AND enrollments.user_id = auth.uid()::text
    ));

CREATE POLICY "Users can create progress"
    ON progress_tracking FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM enrollments
            WHERE enrollments.id = enrollment_id
            AND enrollments.user_id = auth.uid()::text
        )
    );

CREATE POLICY "Users can update their own progress"
    ON progress_tracking FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM enrollments
        WHERE enrollments.id = enrollment_id
        AND enrollments.user_id = auth.uid()::text
    ));

-- Add policies for payments
CREATE POLICY "Users can view their own payments"
    ON payments FOR SELECT
    USING (user_id = auth.uid()::text);

CREATE POLICY "Users can create payments"
    ON payments FOR INSERT
    WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users can update their own payments"
    ON payments FOR UPDATE
    USING (user_id = auth.uid()::text);

-- Add indexes for common queries
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_content_type ON content(type);
CREATE INDEX idx_content_published ON content(published);
CREATE INDEX idx_content_price ON content(price);

-- Add cascade deletes where appropriate
ALTER TABLE modules
  DROP CONSTRAINT IF EXISTS modules_course_id_fkey,
  ADD CONSTRAINT modules_course_id_fkey
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE;

ALTER TABLE lessons
  DROP CONSTRAINT IF EXISTS lessons_module_id_fkey,
  ADD CONSTRAINT lessons_module_id_fkey
  FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE;

-- Add constraints for user role
ALTER TABLE users 
  ADD CONSTRAINT users_role_check 
  CHECK (role IN ('student', 'instructor', 'admin'));

-- Update indexes
DROP INDEX IF EXISTS idx_users_id;
CREATE INDEX idx_users_id ON users(id);