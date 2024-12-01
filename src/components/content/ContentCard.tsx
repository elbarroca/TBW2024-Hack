import React from 'react';
import { Star, Download } from 'lucide-react';

interface ContentCardProps {
    id: string;
    title: string;
    creator: string;
    price: number;
    type: string;
    thumbnail: string;
    downloads: number;
    rating: number;
    onBuyClick: (id: string) => void;
}

export function ContentCard({
    id,
    title,
    creator,
    price,
    type,
    thumbnail,
    downloads,
    rating,
    onBuyClick,
}: ContentCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative pb-[60%] bg-gray-100 overflow-hidden">
                <img
                    src={thumbnail}
                    alt={`${title} thumbnail`}
                    className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                    {type}
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">{title}</h3>
                <p className="text-sm text-gray-600 mb-3">By {creator}</p>

                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center">
                            <Download className="w-4 h-4 text-gray-400" />
                            <span className="ml-1 text-sm text-gray-600">
                                {downloads >= 1000
                                    ? `${(downloads / 1000).toFixed(1)}k`
                                    : downloads}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-purple-600">
                        {price === 0 ? 'Free' : `$${price.toFixed(2)}`}
                    </span>
                    <button
                        onClick={() => onBuyClick(id)}
                        className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                        {price === 0 ? 'Download' : 'Buy Now'}
                    </button>
                </div>
            </div>
        </div>
    );
}
