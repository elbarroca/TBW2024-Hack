import { CourseDetails } from '@/types/course-details';
import { COURSES } from './courses';

export const COURSE_DETAILS: Record<string, CourseDetails> = {
    '1': {
        ...COURSES[0],
        modules: [
            {
                id: 'm1',
                title: 'Introduction to DeFi Architecture',
                duration: '3 weeks',
                order: 1,
                lessons: [
                    {
                        id: 'l1',
                        title: 'DeFi Protocol Fundamentals',
                        description: 'Deep dive into DeFi protocol architecture and design patterns',
                        duration: '60 min',
                        type: 'video',
                        content: {
                            videoUrl: 'https://example.com/defi-fundamentals.mp4',
                            ipfsHash: 'QmX...',
                        },
                        isPreview: true,
                        order: 1,
                        materials: [
                            {
                                id: 'm1',
                                title: 'Advanced DeFi Concepts',
                                type: 'pdf',
                                url: 'https://example.com/advanced-defi.pdf',
                                description: 'Comprehensive guide to DeFi protocols'
                            }
                        ]
                    }
                ]
            }
        ],
        faqs: [
            {
                question: 'What experience level is required?',
                answer: 'Advanced knowledge of Solana development and DeFi concepts is required.'
            },
            {
                question: 'What will I be able to build after this course?',
                answer: 'You will be able to develop complex DeFi protocols including AMMs, lending platforms, and yield farming protocols.'
            }
        ],
        prerequisites: [
            'Advanced Solana development experience',
            'Strong understanding of DeFi concepts',
            'Proficiency in Rust and TypeScript'
        ],
        certificate: true,
        objectives: [
            'Design and implement complex DeFi protocols',
            'Build secure and scalable financial instruments',
            'Deploy production-ready DeFi applications',
            'Implement advanced tokenomics systems'
        ],
        targetAudience: [
            'Senior Blockchain Developers',
            'DeFi Protocol Architects',
            'Smart Contract Engineers'
        ],
        syllabus: {
            weeks: 12,
            hoursPerWeek: 15,
            topics: [
                'Advanced Protocol Architecture',
                'Complex Financial Instruments',
                'Security and Auditing',
                'Performance Optimization'
            ]
        },
        tools: [
            {
                name: 'Anchor Framework',
                description: 'Advanced Solana development framework',
                link: 'https://project-serum.github.io/anchor/'
            },
            {
                name: 'Serum DEX',
                description: 'Decentralized exchange protocol',
                link: 'https://projectserum.com/'
            }
        ],
        projects: [
            {
                title: 'Advanced AMM Protocol',
                description: 'Build a sophisticated automated market maker with multiple pools',
                skills: ['Solana', 'DeFi', 'Smart Contracts']
            }
        ],
        testimonials: [
            {
                id: 't1',
                name: 'Sarah Johnson',
                avatar: 'https://example.com/sarah.jpg',
                role: 'Lead DeFi Engineer',
                comment: 'This course provided invaluable insights into building production-ready DeFi protocols.',
                rating: 5
            }
        ]
    },
    '2': {
        ...COURSES[1],
        modules: [
            {
                id: 'm1',
                title: 'NFT Marketplace Architecture',
                duration: '2 weeks',
                order: 1,
                lessons: [
                    {
                        id: 'l1',
                        title: 'NFT Standards and Implementation',
                        description: 'Understanding NFT standards and marketplace architecture',
                        duration: '45 min',
                        type: 'video',
                        content: {
                            videoUrl: 'https://example.com/nft-standards.mp4',
                        },
                        isPreview: true,
                        order: 1,
                        materials: [
                            {
                                id: 'm1',
                                title: 'NFT Standards Guide',
                                type: 'pdf',
                                url: 'https://example.com/nft-guide.pdf',
                                description: 'Comprehensive guide to NFT standards'
                            }
                        ]
                    }
                ]
            }
        ],
        faqs: [
            {
                question: 'What will I learn in this course?',
                answer: 'You will learn to build a full-featured NFT marketplace including minting, trading, and auction mechanisms.'
            }
        ],
        prerequisites: [
            'Solana development experience',
            'Understanding of NFT standards',
            'Frontend development skills'
        ],
        certificate: true,
        objectives: [
            'Build a complete NFT marketplace',
            'Implement NFT minting and trading',
            'Create auction mechanisms',
            'Design user-friendly interfaces'
        ],
        targetAudience: [
            'Blockchain Developers',
            'NFT Platform Developers',
            'Frontend Engineers'
        ],
        syllabus: {
            weeks: 10,
            hoursPerWeek: 12,
            topics: [
                'NFT Standards',
                'Marketplace Architecture',
                'Trading Mechanisms',
                'Frontend Integration'
            ]
        },
        tools: [
            {
                name: 'Metaplex',
                description: 'NFT standard for Solana',
                link: 'https://www.metaplex.com/'
            }
        ],
        projects: [
            {
                title: 'NFT Marketplace',
                description: 'Build a full-featured NFT marketplace',
                skills: ['Solana', 'NFT', 'Frontend']
            }
        ],
        testimonials: [
            {
                id: 't1',
                name: 'Michael Chen',
                avatar: 'https://example.com/michael.jpg',
                role: 'NFT Platform Developer',
                comment: 'Excellent course for learning NFT marketplace development.',
                rating: 5
            }
        ]
    },
    '3': {
        ...COURSES[2],
        modules: [
            {
                id: 'm1',
                title: 'Smart Contract Security Fundamentals',
                duration: '2 weeks',
                order: 1,
                lessons: [
                    {
                        id: 'l1',
                        title: 'Common Security Vulnerabilities',
                        description: 'Understanding and preventing common security issues',
                        duration: '50 min',
                        type: 'video',
                        content: {
                            videoUrl: 'https://example.com/security-basics.mp4',
                        },
                        isPreview: true,
                        order: 1,
                        materials: [
                            {
                                id: 'm1',
                                title: 'Security Best Practices',
                                type: 'pdf',
                                url: 'https://example.com/security-guide.pdf',
                                description: 'Comprehensive security guide'
                            }
                        ]
                    }
                ]
            }
        ],
        faqs: [
            {
                question: 'Is this course suitable for beginners?',
                answer: 'This course is designed for developers with existing smart contract development experience.'
            }
        ],
        prerequisites: [
            'Smart contract development experience',
            'Understanding of security principles',
            'Knowledge of common vulnerabilities'
        ],
        certificate: true,
        objectives: [
            'Identify security vulnerabilities',
            'Implement secure smart contracts',
            'Conduct security audits',
            'Apply best security practices'
        ],
        targetAudience: [
            'Smart Contract Developers',
            'Security Researchers',
            'Blockchain Auditors'
        ],
        syllabus: {
            weeks: 10,
            hoursPerWeek: 12,
            topics: [
                'Security Fundamentals',
                'Vulnerability Analysis',
                'Audit Techniques',
                'Security Best Practices'
            ]
        },
        tools: [
            {
                name: 'Anchor',
                description: 'Secure smart contract framework',
                link: 'https://project-serum.github.io/anchor/'
            }
        ],
        projects: [
            {
                title: 'Security Audit',
                description: 'Conduct a comprehensive security audit',
                skills: ['Security', 'Auditing', 'Smart Contracts']
            }
        ],
        testimonials: [
            {
                id: 't1',
                name: 'David Kim',
                avatar: 'https://example.com/david.jpg',
                role: 'Security Researcher',
                comment: 'Essential course for anyone serious about smart contract security.',
                rating: 5
            }
        ]
    },
    '4': {
        ...COURSES[3],
        modules: [
            {
                id: 'm1',
                title: 'Solana Development Basics',
                duration: '2 weeks',
                order: 1,
                lessons: [
                    {
                        id: 'l1',
                        title: 'Introduction to Solana',
                        description: 'Understanding Solana architecture and development concepts',
                        duration: '45 min',
                        type: 'video',
                        content: {
                            videoUrl: 'https://example.com/solana-intro.mp4',
                        },
                        isPreview: true,
                        order: 1,
                        materials: [
                            {
                                id: 'm1',
                                title: 'Solana Basics',
                                type: 'pdf',
                                url: 'https://example.com/solana-basics.pdf',
                                description: 'Introduction to Solana development'
                            }
                        ]
                    }
                ]
            }
        ],
        faqs: [
            {
                question: 'Do I need prior blockchain experience?',
                answer: 'Basic programming experience is required, but no blockchain experience is necessary.'
            }
        ],
        prerequisites: [
            'Basic programming knowledge',
            'Understanding of web development',
            'Familiarity with JavaScript'
        ],
        certificate: true,
        objectives: [
            'Build Solana dApps',
            'Understand Solana architecture',
            'Deploy smart contracts',
            'Create user interfaces'
        ],
        targetAudience: [
            'Web Developers',
            'Blockchain Enthusiasts',
            'Software Engineers'
        ],
        syllabus: {
            weeks: 8,
            hoursPerWeek: 10,
            topics: [
                'Solana Basics',
                'Smart Contracts',
                'dApp Development',
                'Frontend Integration'
            ]
        },
        tools: [
            {
                name: 'Solana CLI',
                description: 'Command line interface for Solana',
                link: 'https://docs.solana.com/cli'
            }
        ],
        projects: [
            {
                title: 'Simple dApp',
                description: 'Build a basic decentralized application',
                skills: ['Solana', 'Web3', 'Frontend']
            }
        ],
        testimonials: [
            {
                id: 't1',
                name: 'Lisa Park',
                avatar: 'https://example.com/lisa.jpg',
                role: 'Web Developer',
                comment: 'Perfect introduction to Solana development.',
                rating: 5
            }
        ]
    },
    '5': {
        ...COURSES[4],
        modules: [
            {
                id: 'm1',
                title: 'Web3 Design Principles',
                duration: '2 weeks',
                order: 1,
                lessons: [
                    {
                        id: 'l1',
                        title: 'Web3 UX Fundamentals',
                        description: 'Understanding user experience in Web3 applications',
                        duration: '40 min',
                        type: 'video',
                        content: {
                            videoUrl: 'https://example.com/web3-ux.mp4',
                        },
                        isPreview: true,
                        order: 1,
                        materials: [
                            {
                                id: 'm1',
                                title: 'Web3 Design Guide',
                                type: 'pdf',
                                url: 'https://example.com/web3-design.pdf',
                                description: 'Comprehensive Web3 design guide'
                            }
                        ]
                    }
                ]
            }
        ],
        faqs: [
            {
                question: 'Is this course for designers or developers?',
                answer: 'This course is suitable for both designers and developers interested in Web3 UX.'
            }
        ],
        prerequisites: [
            'Basic design knowledge',
            'Understanding of UX principles',
            'Familiarity with Web3 concepts'
        ],
        certificate: true,
        objectives: [
            'Design Web3 interfaces',
            'Implement user-centric features',
            'Create seamless experiences',
            'Build accessible dApps'
        ],
        targetAudience: [
            'UI/UX Designers',
            'Frontend Developers',
            'Product Managers'
        ],
        syllabus: {
            weeks: 6,
            hoursPerWeek: 8,
            topics: [
                'Web3 UX Principles',
                'Interface Design',
                'User Research',
                'Accessibility'
            ]
        },
        tools: [
            {
                name: 'Figma',
                description: 'Design and prototyping tool',
                link: 'https://www.figma.com/'
            }
        ],
        projects: [
            {
                title: 'Web3 Wallet UI',
                description: 'Design a user-friendly Web3 wallet interface',
                skills: ['Design', 'UX', 'Web3']
            }
        ],
        testimonials: [
            {
                id: 't1',
                name: 'Tom Wilson',
                avatar: 'https://example.com/tom.jpg',
                role: 'UX Designer',
                comment: 'Excellent insights into Web3 design patterns.',
                rating: 5
            }
        ]
    },
    '6': {
        ...COURSES[5],
        modules: [
            {
                id: 'm1',
                title: 'AI Integration Basics',
                duration: '2 weeks',
                order: 1,
                lessons: [
                    {
                        id: 'l1',
                        title: 'AI Agents Overview',
                        description: 'Understanding AI agents and their integration with Solana',
                        duration: '55 min',
                        type: 'video',
                        content: {
                            videoUrl: 'https://example.com/ai-agents.mp4',
                        },
                        isPreview: true,
                        order: 1,
                        materials: [
                            {
                                id: 'm1',
                                title: 'AI Integration Guide',
                                type: 'pdf',
                                url: 'https://example.com/ai-integration.pdf',
                                description: 'Guide to AI agent integration'
                            }
                        ]
                    }
                ]
            }
        ],
        faqs: [
            {
                question: 'What AI experience is required?',
                answer: 'Basic understanding of AI concepts and Solana development is recommended.'
            }
        ],
        prerequisites: [
            'Solana development experience',
            'Basic AI knowledge',
            'Programming proficiency'
        ],
        certificate: true,
        objectives: [
            'Deploy AI agents on Solana',
            'Integrate AI with smart contracts',
            'Build autonomous systems',
            'Implement AI-powered features'
        ],
        targetAudience: [
            'Blockchain Developers',
            'AI Engineers',
            'Full-stack Developers'
        ],
        syllabus: {
            weeks: 10,
            hoursPerWeek: 12,
            topics: [
                'AI Agent Basics',
                'Solana Integration',
                'Smart Contract AI',
                'Deployment Strategies'
            ]
        },
        tools: [
            {
                name: 'TensorFlow',
                description: 'Machine learning framework',
                link: 'https://www.tensorflow.org/'
            }
        ],
        projects: [
            {
                title: 'AI Trading Bot',
                description: 'Build an AI-powered trading bot on Solana',
                skills: ['AI', 'Solana', 'Trading']
            }
        ],
        testimonials: [
            {
                id: 't1',
                name: 'Emma Zhang',
                avatar: 'https://example.com/emma.jpg',
                role: 'AI Engineer',
                comment: 'Innovative approach to combining AI with blockchain.',
                rating: 5
            }
        ]
    }
};

// Helper function to find course details by URL
export const findCourseDetailsByUrl = (url: string): CourseDetails | undefined => {
    const course = COURSES.find(course => course.url === url);
    if (!course) return undefined;
    return COURSE_DETAILS[course.id];
};

// Helper function to find course details by creator and course slug
export const findCourseDetailsBySlug = (creatorSlug: string, courseSlug: string): CourseDetails | undefined => {
    const course = COURSES.find(course => {
        const courseUrl = `/${creatorSlug}/${courseSlug}`;
        return course.url === courseUrl;
    });
    if (!course) return undefined;
    return COURSE_DETAILS[course.id];
}; 