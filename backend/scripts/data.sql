-- Insert users first
INSERT INTO users (
    full_name,
    role,
    email,
    address,
    bio,
    title,
    expertise,
    twitter_handle
) VALUES 
(
    'Alex Rivera',
    'instructor',
    'alex@example.com',
    '4PdmVL24jQbupXWj4XZXuARDKpY4HWtKFXEeC3qZ9Bhx',
    'Solana Expert & Educator',
    'Senior Blockchain Developer',
    ARRAY['Solana', 'Rust', 'Web3'],
    '@alexrivera'
),
(
    'John Smith',  
    'student',
    'john@example.com',
    '0x456',
    'Learning Solana Development',
    'Junior Developer',
    ARRAY['JavaScript', 'React'],
    '@johnsmith'
),
(
    'Sarah Chen',
    'student', 
    'sarah@example.com',
    '0x789',
    'Blockchain Engineer',
    'Software Developer',
    ARRAY['Ethereum', 'Solidity'],
    '@sarahchen'
);

-- Get instructor ID and create course
WITH instructor_id AS (
    SELECT id FROM users WHERE email = 'alex@example.com'
),
new_course AS (
    INSERT INTO courses (
        title, subtitle, description, instructor_id, price,
        image_url, category, duration, level, language,
        enrolled, rating, reviews, original_price,
        last_updated, certificate, what_you_will_learn, currency
    ) 
    SELECT
        'Solana Development Fundamentals',
        'Master the basics of Solana blockchain development',
        'Learn to build decentralized applications on Solana',
        id,
        2.5,
        'https://example.com/image.jpg',
        'Development',
        480,
        'Intermediate',
        'English',
        1234,
        4.8,
        234,
        3.0,
        '2024-01-01',
        true,
        ARRAY[
            'Build decentralized applications on Solana',
            'Write smart contracts in Rust',
            'Implement token economics',
            'Deploy and test smart contracts'
        ],
        'USDC'
    FROM instructor_id
    RETURNING id
)
INSERT INTO course_tags (course_id, tag)
SELECT id, tag FROM new_course, unnest(ARRAY[
    'Smart Contracts',
    'Solana Development',
    'Blockchain Architecture',
    'dApp Building'
]) AS tag;