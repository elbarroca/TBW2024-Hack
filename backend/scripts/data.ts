import { createClient } from '@supabase/supabase-js';
import { supabase } from '../src/db/client';
import { UserRole } from '../src/types/user';

async function seedData() {
  try {
    // Create users
    const users = [
      {
        fullName: 'Alex Rivera',
        role: 'instructor',
        email: 'alex@example.com',
        address: '4PdmVL24jQbupXWj4XZXuARDKpY4HWtKFXEeC3qZ9Bhx',
        bio: 'Solana Expert & Educator',
        title: 'Senior Blockchain Developer',
        expertise: ['Solana', 'Rust', 'Web3'],
        twitterHandle: '@alexrivera'
      },
      {
        fullName: 'John Smith',
        role: 'student',
        email: 'john@example.com',
        address: '0x456',
        bio: 'Learning Solana Development',
        title: 'Junior Developer',
        expertise: ['JavaScript', 'React'],
        twitterHandle: '@johnsmith'
      },
      {
        fullName: 'Sarah Chen',
        role: 'student',
        email: 'sarah@example.com',
        address: '0x789',
        bio: 'Blockchain Engineer',
        title: 'Software Developer',
        expertise: ['Ethereum', 'Solidity'],
        twitterHandle: '@sarahchen'
      }
    ];

    for (const userData of users) {
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: userData.email,
        user_metadata: { 
          address: userData.address,
          full_name: userData.fullName
        },
        email_confirm: true
      });

      if (authError) throw authError;

      await supabase.rpc('set_claim', {
        uid: authUser.user.id,
        claim: 'userrole',
        value: userData.role
      });

      const { error: updateError } = await supabase
        .from('users')
        .update({
          full_name: userData.fullName,
          role: userData.role as UserRole,
          bio: userData.bio,
          title: userData.title,
          expertise: userData.expertise,
          twitter_handle: userData.twitterHandle
        })
        .eq('id', authUser.user.id);

      if (updateError) throw updateError;

      // Store instructor ID if it's Alex Rivera
      if (userData.email === 'alex@example.com') {
        // Create course
        const { data: course, error: courseError } = await supabase
          .from('courses')
          .insert({
            title: 'Solana Development Fundamentals',
            subtitle: 'Master the basics of Solana blockchain development',
            description: 'Learn to build decentralized applications on Solana',
            instructor_id: authUser.user.id,
            price: 2.5,
            image_url: 'https://example.com/image.jpg',
            category: 'Development',
            duration: 480,
            level: 'Intermediate',
            language: 'English',
            enrolled: 1234,
            rating: 4.8,
            reviews: 234,
            original_price: 3.0,
            last_updated: '2024-01-01',
            certificate: true,
            what_you_will_learn: [
              'Build decentralized applications on Solana',
              'Write smart contracts in Rust',
              'Implement token economics',
              'Deploy and test smart contracts'
            ],
            currency: 'USDC'
          })
          .select('id')
          .single();

        if (courseError) throw courseError;

        // Add course tags
        const tags = [
          'Smart Contracts',
          'Solana Development',
          'Blockchain Architecture',
          'dApp Building'
        ];

        const { error: tagError } = await supabase
          .from('course_tags')
          .insert(
            tags.map(tag => ({
              course_id: course.id,
              tag
            }))
          );

        if (tagError) throw tagError;
      }
    }

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  }
}

seedData().catch(console.error);