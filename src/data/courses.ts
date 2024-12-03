import { Course } from '../types/course';

export const COURSES: Course[] = [
    {
        id: 'solana-fundamentals',
        title: 'Solana Development Fundamentals',
        subtitle: 'Master the basics of Solana blockchain development',
        description: 'Learn to build decentralized applications on Solana',
        creator: {
            id: 'alex-rivera',
            name: 'Alex Rivera',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
            bio: 'Senior Blockchain Developer with 5+ years experience',
            title: 'Senior Blockchain Developer',
            expertise: ['Blockchain Development'],
        },
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.UeXBhm81HgmFKnkZECcM4AHaEK%26pid%3DApi%26h%3D160&f=1&ipt=c83b045b78a44520382e1b82a43fd227eba51940485a3b4d7c41cc15a4ce873b&ipo=images',
        category: 'Development',
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
        lessons: [
            {
                id: 'introduction',
                title: 'Introduction to Solana',
                description: 'Learn the fundamentals of Solana blockchain',
                duration: '2 hours',
                order: 1,
                parts: [
                    {
                        id: 'what-is-solana',
                        title: 'What is Solana?',
                        duration: '30 min',
                        type: 'video',
                        content: {
                            videoUrl: 'https://example.com/video1'
                        },
                        isPreview: true
                    },
                    {
                        id: 'architecture',
                        title: 'Solana Architecture',
                        duration: '45 min',
                        type: 'video',
                        content: {
                            videoUrl: 'https://example.com/video2'
                        },
                        isPreview: false
                    },
                    {
                        id: 'quiz-1',
                        title: 'Introduction Quiz',
                        duration: '45 min',
                        type: 'quiz',
                        isPreview: false
                    }
                ]
            },
            {
                id: 'smart-contracts',
                title: 'Smart Contracts in Rust',
                description: 'Write your first smart contract',
                duration: '3 hours',
                order: 2,
                parts: [
                    {
                        id: 'rust-basics',
                        title: 'Rust Programming Basics',
                        duration: '1 hour',
                        type: 'video',
                        content: {
                            videoUrl: 'https://example.com/video3'
                        },
                        isPreview: false
                    },
                    {
                        id: 'first-contract',
                        title: 'Your First Smart Contract',
                        duration: '1 hour',
                        type: 'video',
                        content: {
                            videoUrl: 'https://example.com/video4'
                        },
                        isPreview: false
                    },
                    {
                        id: 'assignment-1',
                        title: 'Build a Token Contract',
                        duration: '1 hour',
                        type: 'assignment',
                        isPreview: false
                    }
                ]
            }
        ],
        certificate: true,
        tags: ['Smart Contracts', 'Solana Development', 'Blockchain Architecture', 'dApp Building'],
    },
    {
        id: 'web3-design-patterns',
        title: 'Web3 Design Patterns',
        subtitle: 'Master the art of designing Web3 applications',
        description: 'Learn modern design patterns for decentralized applications',
        creator: {
            id: 'sarah-chen',
            name: 'Sarah Chen',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
            bio: 'Lead UX Designer for Web3 Projects',
            title: 'Lead UX Designer',
            expertise: ['UX Design', 'Web3'],
        },
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.8bP5oHwyakDwv-Xo2JYC8wHaEc%26pid%3DApi%26h%3D160&f=1&ipt=5b5fa1fd42e9e0304e8a653822d7e27d706eea9f93a6abca94daea36987548a5&ipo=images',
        category: 'Development',
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
        certificate: true,
        tags: ['Web3 Integration', 'Frontend Development', 'Backend Systems', 'dApp Building'],
    },
    {
        id: 'smart-contract-security',
        title: 'Smart Contract Security',
        subtitle: 'Learn to secure blockchain applications',
        description: 'Master security best practices for smart contract development',
        creator: {
            id: 'michael-brown',
            name: 'Michael Brown',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
            bio: 'Security Auditor & Blockchain Consultant',
            title: 'Senior Security Engineer',
            expertise: ['Blockchain Security'],
        },
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.DwcMbd5xKc9QkfJdjUjsOQHaEF%26pid%3DApi%26h%3D160&f=1&ipt=9f5fc0886b2b8aa41e555f734dc69ddcd05b6adf30490292a12d16e2985a81cf&ipo=images',
        category: 'Development',
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
        certificate: true,
        tags: ['Smart Contracts', 'Security Best Practices', 'Testing & Auditing'],
    },
    {
        id: 'defi-protocol-development',
        title: 'DeFi Protocol Development',
        subtitle: 'Build decentralized finance applications',
        description: 'Learn to develop DeFi protocols and financial instruments',
        creator: {
            id: 'elena-rodriguez',
            name: 'Elena Rodriguez',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
            bio: 'DeFi Protocol Architect',
            title: 'DeFi Protocol Architect',
            expertise: ['DeFi', 'Blockchain'],
        },
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.8bP5oHwyakDwv-Xo2JYC8wHaEc%26pid%3DApi%26h%3D160&f=1&ipt=5b5fa1fd42e9e0304e8a653822d7e27d706eea9f93a6abca94daea36987548a5&ipo=images',
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
        certificate: false,
        tags: ['Yield Farming', 'Liquidity Pools', 'DEX Trading', 'AMM'],
    },
    {
        id: 'nft-marketplace',
        title: 'NFT Marketplace Development',
        subtitle: 'Create your own NFT marketplace',
        description: 'Build a full-featured NFT marketplace from scratch',
        creator: {
            id: 'james-wilson',
            name: 'James Wilson',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            bio: 'NFT Platform Developer',
            title: 'NFT Platform Developer',
            expertise: ['NFT', 'Blockchain'],
        },
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.UeXBhm81HgmFKnkZECcM4AHaEK%26pid%3DApi%26h%3D160&f=1&ipt=c83b045b78a44520382e1b82a43fd227eba51940485a3b4d7c41cc15a4ce873b&ipo=images',
        category: 'NFTs & Gaming',
        duration: '10 weeks',
        enrolled: 1876,
        rating: 4.7,
        reviews: 321,
        price: 2.5,
        originalPrice: 3.0,
        level: 'Advanced',
        language: 'English',
        lastUpdated: '2024-04',
        whatYouWillLearn: [
            /* ... */
        ],
        certificate: true,
        tags: ['NFT Trading', 'NFT Projects', 'Digital Collectibles', 'GameFi'],
    },
];

// Featured courses for the main page
export const FEATURED_COURSES = COURSES.slice(0, 3); // Show first 3 courses on main page
