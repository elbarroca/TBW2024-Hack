import { Course } from '../types/course';

export const COURSES: Course[] = [
    {
        id: 'solana-fundamentals',
        title: 'Solana Development Fundamentals',
        subtitle: 'Master the basics of Solana blockchain development',
        description: 'Learn to build decentralized applications on Solana',
        instructor: {
            id: 'alex-rivera',
            name: 'Alex Rivera',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
            bio: 'Senior Blockchain Developer with 5+ years experience',
        },
        image: '/images/courses/blockchain.jpg',
        category: 'Blockchain',
        duration: '8 weeks',
        enrolled: 1234,
        rating: 4.8,
        reviews: 234,
        price: 2.5,
        originalPrice: 3.0,
        level: 'Intermediate',
        language: 'English',
        lastUpdated: '2024-01',
        whatYouWillLearn: [
            'Build decentralized applications on Solana',
            'Write smart contracts in Rust',
            'Implement token economics',
            'Deploy and test smart contracts',
        ],
        modules: [
            /* ... */
        ],
    },
    {
        id: 'web3-design-patterns',
        title: 'Web3 Design Patterns',
        subtitle: 'Master the art of designing Web3 applications',
        description: 'Learn modern design patterns for decentralized applications',
        instructor: {
            id: 'sarah-chen',
            name: 'Sarah Chen',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
            bio: 'Lead UX Designer for Web3 Projects',
        },
        image: '/images/courses/design.jpg',
        category: 'Design',
        duration: '6 weeks',
        enrolled: 892,
        rating: 4.7,
        reviews: 156,
        price: 1.8,
        level: 'Intermediate',
        language: 'English',
        lastUpdated: '2024-02',
        whatYouWillLearn: [
            /* ... */
        ],
    },
    {
        id: 'smart-contract-security',
        title: 'Smart Contract Security',
        subtitle: 'Learn to secure blockchain applications',
        description: 'Master security best practices for smart contract development',
        instructor: {
            id: 'michael-brown',
            name: 'Michael Brown',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
            bio: 'Security Auditor & Blockchain Consultant',
        },
        image: '/images/courses/security.jpg',
        category: 'Security',
        duration: '10 weeks',
        enrolled: 1567,
        rating: 4.9,
        reviews: 312,
        price: 3.2,
        originalPrice: 4.0,
        level: 'Advanced',
        language: 'English',
        lastUpdated: '2024-01',
        whatYouWillLearn: [
            /* ... */
        ],
    },
    {
        id: 'defi-protocol-development',
        title: 'DeFi Protocol Development',
        subtitle: 'Build decentralized finance applications',
        description: 'Learn to develop DeFi protocols and financial instruments',
        instructor: {
            id: 'elena-rodriguez',
            name: 'Elena Rodriguez',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
            bio: 'DeFi Protocol Architect',
        },
        image: '/images/courses/defi.jpg',
        category: 'DeFi',
        duration: '12 weeks',
        enrolled: 2156,
        rating: 4.8,
        reviews: 423,
        price: 2.8,
        originalPrice: 3.5,
        level: 'Advanced',
        language: 'English',
        lastUpdated: '2024-03',
        whatYouWillLearn: [
            /* ... */
        ],
    },
    {
        id: 'nft-marketplace',
        title: 'NFT Marketplace Development',
        subtitle: 'Create your own NFT marketplace',
        description: 'Build a full-featured NFT marketplace from scratch',
        instructor: {
            id: 'james-wilson',
            name: 'James Wilson',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            bio: 'NFT Platform Developer',
        },
        image: '/images/courses/nft.jpg',
        category: 'NFT',
        duration: '8 weeks',
        enrolled: 1823,
        rating: 4.6,
        reviews: 289,
        price: 2.2,
        originalPrice: 2.8,
        level: 'Intermediate',
        language: 'English',
        lastUpdated: '2024-02',
        whatYouWillLearn: [
            /* ... */
        ],
    },
];

// Featured courses for the main page
export const FEATURED_COURSES = COURSES.slice(0, 3); // Show first 3 courses on main page
