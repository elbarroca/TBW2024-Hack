import React from 'react';
import { Star, Download, User, ExternalLink, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ContentType } from '@/types/content-details';

interface ContentCardProps {
    id: string;
    title: string;
    creator: string;
    price: number;
    type: ContentType;
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
    const navigate = useNavigate();
    const creatorSlug = creator.toLowerCase().replace(/\s+/g, '-');
    const typeSlug = type.toLowerCase().replace(/\s+/g, '-');
    const titleSlug = title.toLowerCase().replace(/\s+/g, '-');
    
    const handleCardClick = () => {
        navigate(`/${creatorSlug}/${typeSlug}/${titleSlug}`);
    };

    const handleBuyClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onBuyClick(id);
    };

    // Format the thumbnail URL
    const formattedThumbnail = thumbnail.startsWith('http') 
        ? thumbnail 
        : `${import.meta.env.VITE_APP_BASE_URL || ''}${thumbnail}`;

    // Format price display
    const formatPrice = (price: number) => {
        if (price === 0) return 'Free';
        return price < 1 ? `$${price.toFixed(2)}` : `$${Math.floor(price)}.${(price % 1).toFixed(2).slice(2)}`;
    };

    // Calculate SOL price with proper formatting for small numbers
    const solPrice = price * 0.08;
    const formatSolPrice = (price: number) => {
        if (price === 0) return '0 SOL';
        return price < 0.01 ? '<0.01 SOL' : `${price.toFixed(2)} SOL`;
    };

    return (
        <Card 
            onClick={handleCardClick}
            className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border border-gray-100/50 bg-white/50 backdrop-blur-sm cursor-pointer rounded-xl"
        >
            <div className="relative pb-[56.25%] bg-gradient-to-br from-purple-50/80 to-gray-50/80 overflow-hidden">
                <img
                    src={formattedThumbnail}
                    alt={`${title} thumbnail`}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/fallback-image.jpg'; // Add a fallback image
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-3 right-3 flex gap-2">
                    <Badge 
                        variant="secondary" 
                        className="bg-white/95 shadow-lg backdrop-blur-md font-medium border-0 px-2.5 py-0.5 text-xs uppercase tracking-wide"
                    >
                        {type}
                    </Badge>
                    {downloads > 100 && (
                        <Badge 
                            variant="secondary" 
                            className="bg-purple-500/90 text-white shadow-lg backdrop-blur-md font-medium border-0 px-2.5 py-0.5 text-xs uppercase tracking-wide"
                        >
                            Popular
                        </Badge>
                    )}
                </div>
            </div>

            <CardHeader className="p-4 pb-2">
                <h3 className="font-semibold text-base leading-tight line-clamp-2 group-hover:text-purple-700 transition-colors duration-300">
                    {title}
                </h3>
            </CardHeader>

            <CardContent className="p-4 pt-1 space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Avatar className="h-7 w-7 ring-2 ring-purple-100 transition-shadow group-hover:ring-purple-200">
                            <AvatarImage src={`https://avatar.vercel.sh/${creator}`} />
                            <AvatarFallback className="bg-purple-50">
                                <User className="h-3.5 w-3.5 text-purple-600" />
                            </AvatarFallback>
                        </Avatar>
                        <p className="text-xs font-medium text-gray-600 hover:text-purple-700 transition-colors">
                            By {creator}
                        </p>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs text-gray-500">2h</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <TooltipProvider delayDuration={200}>
                        <div className="flex items-center space-x-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center bg-yellow-50/80 px-2 py-1 rounded-full border border-yellow-100/50 backdrop-blur-sm transition-colors hover:bg-yellow-50">
                                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                        <span className="ml-1 text-xs text-yellow-700 font-semibold">{rating.toFixed(1)}</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="font-medium text-xs">Rating</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center bg-gray-50/80 px-2 py-1 rounded-full border border-gray-100/50 backdrop-blur-sm transition-colors hover:bg-gray-50">
                                        <Download className="w-3.5 h-3.5 text-gray-600" />
                                        <span className="ml-1 text-xs text-gray-700 font-semibold">
                                            {downloads >= 1000 ? `${(downloads / 1000).toFixed(1)}k` : downloads}
                                        </span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="font-medium text-xs">Downloads</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </TooltipProvider>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium">Price</span>
                        <div className="flex items-center space-x-1.5">
                            <span className="font-bold text-base bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                {price} SOL
                            </span>
                            <span className="text-xs text-gray-500 font-medium">
                                (${(price * 40).toFixed(2)})
                            </span>
                        </div>
                    </div>
                    <Button
                        onClick={handleBuyClick}
                        size="sm"
                        className={cn(
                            "w-full sm:w-auto",
                            "bg-gradient-to-r from-purple-600 to-indigo-600",
                            "hover:from-purple-700 hover:to-indigo-700",
                            "shadow-md hover:shadow-xl",
                            "transition-all duration-300",
                            "flex items-center justify-center space-x-1.5",
                            "text-sm px-4 py-2 h-auto",
                            "rounded-lg font-medium"
                        )}
                    >
                        <span>{price === 0 ? 'Download' : 'Buy Now'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
