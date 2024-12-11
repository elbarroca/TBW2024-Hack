import { Content, Author, LearningObjective } from '@/types/content';

export const CONTENT: Content[] = [
{
    id: '1',
    title: 'DeFi Protocol Engineering: Building the Future of Finance on Solana',
    creator: { name: 'Elena Rodriguez', role: 'DeFi Protocol Engineer' } as Author,
    author: { name: 'Elena Rodriguez', role: 'DeFi Protocol Engineer' } as Author,
    price: 2.8,
    type: 'ebook',
    thumbnail: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Nu5zDQe4R6pXDEYKHJObMAHaEK%26pid%3DApi&f=1&ipt=c7d8c574d88fb16d2cc3989c2e1ae9ae27bf734e74a167fefc41655c0cefd67d&ipo=images',
    metrics: {
        views: 2156,
        rating: 4.8,
        completions: 856,
        totalDuration: '12 hours',
        language: 'English'
    },
    details: {
        mainCategory: 'Development',
        tags: ['DeFi', 'Solana', 'Advanced Protocols', 'Web3 Development'],
        description: 'Learn to develop scalable DeFi protocols and financial instruments.',
        lastUpdated: '2024-01-15'
    },
    learningObjectives: [
        { id: '1', title: 'Build DeFi protocols' },
        { id: '2', title: 'Understand financial instruments' }, 
        { id: '3', title: 'Deploy on Solana' }
    ] as LearningObjective[],
    prerequisites: ['Solana development basics', 'Smart contract knowledge'],
    duration: '12 hours',
    level: 'Advanced'
},
{
    id: '2',
    title: 'The Ultimate NFT Marketplace Blueprint: From Zero to Launch on Solana',
    creator: { name: 'James Wilson', role: 'NFT Developer' } as Author,
    author: { name: 'James Wilson', role: 'NFT Developer' } as Author,
    price: 2.5,
    type: 'video',
    thumbnail: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.oSCZCkkVgsQSnX4s5zMZoQHaEF%26pid%3DApi&f=1&ipt=da338b9aae861adf9594ecb7c83eb9ff49d918f082f4a5cf73bf98d6fba06077&ipo=images',
    metrics: {
        views: 1876,
        rating: 4.7,
        completions: 723,
        totalDuration: '10 hours',
        language: 'English'
    },
    details: {
        mainCategory: 'Development',
        tags: ['NFT', 'Marketplace', 'Web3 Applications', 'Solana'],
        description: 'Learn to build and deploy your own NFT marketplace on Solana.',
        lastUpdated: '2024-01-18'
    },
    learningObjectives: [
        { id: '1', title: 'Build NFT marketplace' },
        { id: '2', title: 'Implement NFT trading' },
        { id: '3', title: 'Deploy on Solana' }
    ] as LearningObjective[],
    prerequisites: ['JavaScript', 'React basics', 'Web3 fundamentals'],
    duration: '10 hours',
    level: 'Intermediate'
},
{
    id: '3',
    title: 'Bulletproof Smart Contracts: The Complete Security & Auditing Masterclass',
    creator: { name: 'Michael Brown', role: 'Security Expert' } as Author,
    author: { name: 'Michael Brown', role: 'Security Expert' } as Author,
    price: 3.2,
    type: 'file',
    thumbnail: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.KLCI12TEi6zj5JA2aN1XEAHaEK%26pid%3DApi&f=1&ipt=25c57b9e422bf3a37b87251ef8d9da857106c2134a2bf1f782d51350494fa1d2&ipo=images',
    metrics: {
        views: 1567,
        rating: 4.9,
        completions: 612,
        totalDuration: '15 hours',
        language: 'English'
    },
    details: {
        mainCategory: 'Security',
        tags: ['Security', 'Smart Contracts', 'Blockchain Auditing', 'DeFi Security'],
        description: 'Learn essential security practices for smart contract development.',
        lastUpdated: '2024-01-20'
    },
    learningObjectives: [
        { id: '1', title: 'Audit smart contracts' },
        { id: '2', title: 'Identify vulnerabilities' },
        { id: '3', title: 'Implement security best practices' }
    ] as LearningObjective[],
    prerequisites: ['Smart contract development', 'Blockchain fundamentals'],
    duration: '15 hours',
    level: 'Advanced'
},
{
    id: '4',
    title: 'Solana Essentials: Build and Deploy Your First dApp',
    creator: { name: 'Alex Rivera', role: 'Solana Developer' } as Author,
    author: { name: 'Alex Rivera', role: 'Solana Developer' } as Author,
    price: 2.5,
    type: 'ebook',
    thumbnail: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.x3_ZtKAWqVP2voWT56FJpgHaEK%26pid%3DApi&f=1&ipt=90f4be4cadf0c41e8b21bae9f1eb324231af29090aa3debc66b638a8e5b7b259&ipo=images',
    metrics: {
        views: 1234,
        rating: 4.8,
        completions: 534,
        totalDuration: '8 hours',
        language: 'English'
    },
    details: {
        mainCategory: 'Development',
        tags: ['Solana', 'dApps', 'Blockchain Basics', 'Decentralized Development'],
        description: 'Learn Solana from scratch and launch your first decentralized app.',
        lastUpdated: '2024-01-22'
    },
    learningObjectives: [
        { id: '1', title: 'Build Solana dApp' },
        { id: '2', title: 'Understand Solana architecture' },
        { id: '3', title: 'Deploy smart contracts' }
    ] as LearningObjective[],
    prerequisites: ['JavaScript basics', 'Web development fundamentals'],
    duration: '8 hours',
    level: 'Beginner'
}
];