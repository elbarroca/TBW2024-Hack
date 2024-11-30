import React from 'react';
import { Mail, Twitter, Linkedin, MessageCircle } from 'lucide-react';

const teamMembers = [
    {
        name: 'Sarah Chen',
        role: 'Founder & CEO',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        bio: 'Visionary behind decentralized education',
    },
    {
        name: 'Alex Rivera',
        role: 'CTO',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        bio: "Expert in Solana's Rust ecosystem",
    },
    {
        name: 'Michael Rodriguez',
        role: 'Lead Designer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        bio: 'Creating intuitive and vibrant user experiences',
    },
];

const features = [
    {
        title: 'For Students',
        items: [
            'Wide variety of courses across industries',
            'Immutable NFT certificates',
            'Real-time collaboration',
        ],
    },
    {
        title: 'For Instructors',
        items: [
            'Decentralized course creation',
            'Powerful analytics dashboard',
            'Community building tools',
        ],
    },
    {
        title: 'Blockchain Advantage',
        items: [
            'Seamless SOL transactions',
            'NFT-based achievements',
            'Decentralized content storage',
        ],
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-purple-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                            Learn. Earn. <span className="text-purple-600">Innovate.</span>
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
                            Discover the next evolution in online learning. Built on Solana, we're
                            redefining education by giving students ownership of their achievements
                            and instructors the tools to succeed in a decentralized world.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                    <p className="mt-6 text-lg text-gray-500 max-w-3xl mx-auto">
                        We aim to democratize access to high-quality education while fostering a
                        system where achievements and contributions are truly owned by the
                        participants. Our goal is to bridge the gap between traditional education
                        and the limitless potential of Web3.
                    </p>
                </div>
            </div>

            {/* Features Grid */}
            <div className="bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {feature.title}
                                </h3>
                                <ul className="space-y-3">
                                    {feature.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-start">
                                            <span className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                                                <span className="h-2 w-2 rounded-full bg-purple-600" />
                                            </span>
                                            <span className="text-gray-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900">Meet the Team</h2>
                    <p className="mt-4 text-lg text-gray-500">
                        A global team of educators, blockchain developers, and designers passionate
                        about creating impactful learning experiences.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamMembers.map((member) => (
                        <div
                            key={member.name}
                            className="bg-white rounded-2xl p-8 shadow-sm text-center"
                        >
                            <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                            />
                            <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                            <p className="text-purple-600 mb-4">{member.role}</p>
                            <p className="text-gray-500">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Let's Connect</h2>
                        <p className="mt-4 text-lg text-gray-500">
                            Got questions or ideas? We'd love to hear from you!
                        </p>
                    </div>

                    <div className="flex justify-center space-x-6">
                        <a
                            href="mailto:support@educhain.com"
                            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600"
                        >
                            <Mail className="h-5 w-5" />
                            <span>Email Us</span>
                        </a>
                        <a
                            href="https://twitter.com/educhain"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600"
                        >
                            <Twitter className="h-5 w-5" />
                            <span>Twitter</span>
                        </a>
                        <a
                            href="https://linkedin.com/company/educhain"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600"
                        >
                            <Linkedin className="h-5 w-5" />
                            <span>LinkedIn</span>
                        </a>
                        <a
                            href="https://discord.gg/educhain"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600"
                        >
                            <MessageCircle className="h-5 w-5" />
                            <span>Discord</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
