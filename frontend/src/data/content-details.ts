import { Content, ContentType } from '@/types/content-details';

export const CONTENT: Content[] = [
  {
    id: "1",
    title: "The Complete Guide to DeFi Trading",
    creator: "Alex Thompson",
    price: 2.0, // ~49.99 USD in SOL
    originalPrice: 4.0, // ~99.99 USD in SOL
    type: "ebook" as ContentType,
    thumbnail: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.vBH4HGlNh3jKq7RqFyysHAHaEO%26pid%3DApi&f=1&ipt=123a01ccea890ee9adf9531eb6a3a3503baed64e4244f9f751a3e99862967349&ipo=images",
    downloads: 2800,
    rating: 4.8,
    category: "DeFi",
    tags: ["DeFi", "Trading", "Blockchain", "Cryptocurrency"],
    description: "A comprehensive guide to decentralized finance trading. Learn everything from basic DeFi concepts to advanced trading strategies. This course covers DEXs, Yield Farming, and Liquidity Provision.",
    detailedDescription: "Dive deep into the world of decentralized finance with this comprehensive trading guide. Starting with foundational DeFi concepts, you'll progress through advanced trading strategies on decentralized exchanges (DEXs). Learn how to analyze liquidity pools, execute profitable trades, and optimize your yields through farming strategies. Master risk management techniques specific to DeFi, understand impermanent loss, and learn to navigate the complexities of protocol interactions. By the end, you'll have the knowledge to confidently participate in various DeFi protocols while minimizing risks and maximizing returns.",
    lastUpdated: "2024-02-15",
    author: {
      id: "alex-thompson",
      name: "Alex Thompson", 
      slug: "alex-thompson",
      avatar: "https://avatar.vercel.sh/alex-thompson",
      bio: "DeFi Expert & Blockchain Educator with 6+ years of experience. Previously at Aave and Uniswap.",
      followers: 15000,
      totalViews: 150000,
      expertise: "DeFi & Blockchain Development",
      rating: "4.8",
      courses: 8,
      students: 25000,
      isTopCreator: true,
      twitterHandle: "alexthompsondefi",
      tags: ["DeFi", "Trading", "Blockchain", "Cryptocurrency"]
    },
    metrics: {
      views: 12000,
      likes: 850,
      rating: 4.8,
      completions: 2800,
      totalDuration: "15 hours",
      lastUpdated: "2024-02-15",
      language: "English",
      subtitles: ["English", "Spanish", "Chinese"]
    },
    details: {
      chapters: 12,
      exercises: 35,
      quizzes: 10,
      resources: 25,
      level: "Intermediate to Advanced",
      format: "PDF/ePub"
    },
    learningObjectives: [
      {
        id: "1",
        title: "DeFi Fundamentals",
        description: "Master the core concepts of decentralized finance and trading"
      },
      {
        id: "2", 
        title: "DEX Trading Strategies",
        description: "Learn advanced trading strategies on decentralized exchanges"
      },
      {
        id: "3",
        title: "Yield Optimization",
        description: "Optimize your yields through farming and liquidity provision"
      },
      {
        id: "4",
        title: "Risk Management",
        description: "Implement effective risk management strategies in DeFi"
      }
    ],
    prerequisites: [
      "Basic understanding of cryptocurrency",
      "Familiarity with blockchain concepts", 
      "Experience with digital wallets"
    ],
    targetAudience: [
      "Crypto traders looking to enter DeFi",
      "DeFi enthusiasts",
      "Yield farmers",
      "Liquidity providers"
    ],
    certification: true
  },
  {
    id: "2",
    title: "DeFi Protocol Engineering: Building the Future of Finance on Solana",
    creator: "Elena Rodriguez",
    price: 2.8,
    originalPrice: 4.0, // ~99.99 USD in SOL
    type: "ebook" as ContentType,
    thumbnail: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Nu5zDQe4R6pXDEYKHJObMAHaEK%26pid%3DApi&f=1&ipt=c7d8c574d88fb16d2cc3989c2e1ae9ae27bf734e74a167fefc41655c0cefd67d&ipo=images",
    downloads: 2156,
    rating: 4.8,
    category: "Development",
    tags: ["DeFi", "Solana", "Advanced Protocols", "Web3 Development"],
    description: "Learn to develop scalable DeFi protocols and financial instruments on Solana. Master protocol architecture, token economics, and advanced smart contract patterns.",
    detailedDescription: "Embark on an extensive journey into DeFi protocol development on Solana. This comprehensive course covers everything from fundamental protocol architecture to advanced implementation patterns. You'll learn to design and build scalable financial instruments, implement robust tokenomics models, and create secure smart contracts. The course includes hands-on projects building real DeFi protocols, from AMMs to lending platforms. Special focus is given to Solana-specific optimizations, program composition, and cross-program invocation (CPI) patterns.",
    lastUpdated: "2024-01-15",
    author: {
      id: "elena-rodriguez",
      name: "Elena Rodriguez",
      slug: "elena-rodriguez", 
      avatar: "https://avatar.vercel.sh/elena-rodriguez",
      bio: "Protocol Engineer & DeFi Architect. Previously led development at major Solana DeFi protocols.",
      followers: 12000,
      totalViews: 120000,
      expertise: "Solana Development & DeFi Architecture",
      rating: "4.8",
      courses: 5,
      students: 18000,
      isTopCreator: true,
      twitterHandle: "elenasoldev",
      tags: ["Solana", "DeFi", "Protocol Engineering", "Smart Contracts"]
    },
    metrics: {
      views: 9500,
      likes: 720,
      rating: 4.8,
      completions: 1850,
      totalDuration: "18 hours",
      lastUpdated: "2024-01-15",
      language: "English",
      subtitles: ["English", "Spanish"]
    },
    details: {
      chapters: 15,
      exercises: 42,
      quizzes: 12,
      resources: 30,
      level: "Advanced",
      format: "PDF/ePub"
    },
    learningObjectives: [
      {
        id: "1",
        title: "Protocol Architecture",
        description: "Design scalable and secure DeFi protocol architectures"
      },
      {
        id: "2",
        title: "Smart Contract Development",
        description: "Build advanced smart contracts for DeFi applications"
      },
      {
        id: "3",
        title: "Token Economics",
        description: "Implement sustainable tokenomics models"
      },
      {
        id: "4",
        title: "Security & Testing",
        description: "Master security best practices and comprehensive testing"
      }
    ],
    prerequisites: [
      "Strong Rust programming experience",
      "Understanding of DeFi concepts",
      "Basic Solana development knowledge"
    ],
    targetAudience: [
      "Solana developers",
      "DeFi protocol engineers",
      "Smart contract developers",
      "Web3 architects"
    ],
    certification: true
  },
  {
    id: "3",
    title: "The Ultimate NFT Marketplace Blueprint: From Zero to Launch on Solana",
    creator: "James Wilson",
    price: 2.5,
    originalPrice: 4.0, // ~99.99 USD in SOL
    type: "video" as ContentType,
    thumbnail: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.oSCZCkkVgsQSnX4s5zMZoQHaEF%26pid%3DApi&f=1&ipt=da338b9aae861adf9594ecb7c83eb9ff49d918f082f4a5cf73bf98d6fba06077&ipo=images",
    downloads: 1876,
    rating: 4.7,
    category: "Development",
    tags: ["NFT", "Marketplace", "Web3 Applications", "Solana"],
    description: "Comprehensive guide to building and launching your own NFT marketplace on Solana. From smart contracts to frontend integration.",
    detailedDescription: "Master the complete process of building a production-ready NFT marketplace on Solana. This course walks you through every aspect of marketplace development, from smart contract architecture to user interface design. Learn to implement essential features like NFT minting, listing, bidding, and trading. Dive deep into wallet integration, metadata handling, and efficient storage solutions. The course covers advanced topics including royalty enforcement, collection verification, and marketplace analytics. You'll also learn best practices for testing, deployment, and maintenance of your marketplace.",
    lastUpdated: "2024-01-18",
    author: {
      id: "james-wilson",
      name: "James Wilson",
      slug: "james-wilson",
      avatar: "https://avatar.vercel.sh/james-wilson",
      bio: "NFT Platform Architect & Full-Stack Web3 Developer. Built multiple successful NFT marketplaces.",
      followers: 9500,
      totalViews: 95000,
      expertise: "NFT Development & Marketplace Architecture",
      rating: "4.7",
      courses: 6,
      students: 15000,
      isTopCreator: true,
      twitterHandle: "jameswilsondev",
      tags: ["NFT", "Solana", "Marketplace", "Web3"]
    },
    metrics: {
      views: 8200,
      likes: 650,
      rating: 4.7,
      completions: 1500,
      totalDuration: "16 hours",
      lastUpdated: "2024-01-18",
      language: "English",
      subtitles: ["English", "Korean"]
    },
    details: {
      chapters: 14,
      exercises: 38,
      quizzes: 10,
      resources: 28,
      level: "Intermediate",
      format: "Video/Code"
    },
    learningObjectives: [
      {
        id: "1",
        title: "NFT Smart Contracts",
        description: "Develop secure NFT smart contracts on Solana"
      },
      {
        id: "2",
        title: "Marketplace Architecture",
        description: "Design scalable marketplace infrastructure"
      },
      {
        id: "3",
        title: "Frontend Integration",
        description: "Build responsive UI with Web3 wallet integration"
      },
      {
        id: "4",
        title: "Launch & Operations",
        description: "Deploy and manage your NFT marketplace"
      }
    ],
    prerequisites: [
      "JavaScript/TypeScript experience",
      "Basic Solana development knowledge",
      "React.js familiarity"
    ],
    targetAudience: [
      "Web3 developers",
      "NFT platform builders",
      "Marketplace operators",
      "DApp developers"
    ],
    certification: true
  },
  {
    id: "4",
    title: "Bulletproof Smart Contracts: The Complete Security & Auditing Masterclass",
    creator: "Michael Brown",
    price: 3.2,
    originalPrice: 4.0, // ~99.99 USD in SOL
    type: "file" as ContentType,
    thumbnail: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.KLCI12TEi6zj5JA2aN1XEAHaEK%26pid%3DApi&f=1&ipt=25c57b9e422bf3a37b87251ef8d9da857106c2134a2bf1f782d51350494fa1d2&ipo=images",
    downloads: 1567,
    rating: 4.9,
    category: "Security",
    tags: ["Security", "Smart Contracts", "Blockchain Auditing", "DeFi Security"],
    description: "Master the art of smart contract security and auditing. Learn to identify vulnerabilities and implement robust security measures.",
    detailedDescription: "Become an expert in smart contract security with this comprehensive masterclass. Learn systematic approaches to identifying vulnerabilities, conducting thorough audits, and implementing robust security measures. The course covers common attack vectors, advanced exploitation techniques, and industry-standard security patterns. You'll gain hands-on experience analyzing real-world smart contract vulnerabilities, using professional auditing tools, and writing secure code. Special emphasis is placed on DeFi-specific security considerations, formal verification methods, and automated testing strategies.",
    lastUpdated: "2024-01-20",
    author: {
      id: "michael-brown",
      name: "Michael Brown",
      slug: "michael-brown",
      avatar: "https://avatar.vercel.sh/michael-brown",
      bio: "Smart Contract Security Expert & Auditor. Former Security Lead at major blockchain security firms.",
      followers: 11000,
      totalViews: 110000,
      expertise: "Smart Contract Security & Auditing",
      rating: "4.9",
      courses: 4,
      students: 12000,
      isTopCreator: true,
      twitterHandle: "mbrownsec",
      tags: ["Security", "Auditing", "Smart Contracts", "DeFi"]
    },
    metrics: {
      views: 7800,
      likes: 890,
      rating: 4.9,
      completions: 1200,
      totalDuration: "20 hours",
      lastUpdated: "2024-01-20",
      language: "English",
      subtitles: ["English", "Japanese", "German"]
    },
    details: {
      chapters: 16,
      exercises: 45,
      quizzes: 14,
      resources: 35,
      level: "Advanced",
      format: "PDF/Video"
    },
    learningObjectives: [
      {
        id: "1",
        title: "Security Fundamentals",
        description: "Master core smart contract security principles"
      },
      {
        id: "2",
        title: "Vulnerability Assessment",
        description: "Identify and analyze smart contract vulnerabilities"
      },
      {
        id: "3",
        title: "Auditing Techniques",
        description: "Learn professional smart contract auditing methods"
      },
      {
        id: "4",
        title: "Security Best Practices",
        description: "Implement robust security measures in smart contracts"
      }
    ],
    prerequisites: [
      "Strong smart contract development experience",
      "Understanding of blockchain security",
      "Familiarity with common attack vectors"
    ],
    targetAudience: [
      "Smart contract developers",
      "Security engineers",
      "Blockchain auditors",
      "DeFi protocol developers"
    ],
    certification: true
  }
];