import React from 'react';
import { Wallet, BookOpen, Trophy } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-purple-50 to-white pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Learn and Earn with
            <span className="block bg-gradient-to-r from-purple-600 to-teal-400 bg-clip-text text-transparent">
              Web3 Education
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Master blockchain development, earn NFT certificates, and join a community of Web3 builders.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button className="flex items-center bg-gradient-to-r from-purple-600 to-teal-400 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
              <Wallet className="h-5 w-5 mr-2" />
              Connect Wallet
            </button>
            <button className="flex items-center bg-white text-gray-900 px-8 py-3 rounded-full border border-gray-200 hover:border-purple-400 transition-colors">
              <BookOpen className="h-5 w-5 mr-2" />
              Browse Courses
            </button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: "Expert-Led Courses",
              description: "Learn from industry leaders and Web3 experts"
            },
            {
              icon: Trophy,
              title: "NFT Certificates",
              description: "Earn verifiable credentials on the blockchain"
            },
            {
              icon: Wallet,
              title: "Learn-to-Earn",
              description: "Get rewarded for your learning achievements"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-purple-100">
                <feature.icon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}