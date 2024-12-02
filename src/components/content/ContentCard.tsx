import React from 'react';
import { Star, Download, User } from 'lucide-react';
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
        <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-gray-200 hover:border-purple-200">
            <div className="relative pb-[60%] bg-gradient-to-br from-purple-50 to-gray-50 overflow-hidden">
                <img
                    src={thumbnail}
                    alt={`${title} thumbnail`}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <Badge 
                    variant="secondary" 
                    className="absolute top-3 right-3 bg-white/95 shadow-sm backdrop-blur-sm font-medium"
                >
                    {type}
                </Badge>
            </div>

            <CardHeader className="p-4 pb-2">
                <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-purple-700 transition-colors">
                    {title}
                </h3>
            </CardHeader>

            <CardContent className="p-4 pt-2">
                <div className="flex items-center space-x-2 mb-4">
                    <Avatar className="h-7 w-7 ring-2 ring-purple-100">
                        <AvatarImage src={`https://avatar.vercel.sh/${creator}`} />
                        <AvatarFallback className="bg-purple-100">
                            <User className="h-4 w-4 text-purple-600" />
                        </AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium text-gray-700">By {creator}</p>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <TooltipProvider>
                        <div className="flex items-center space-x-3">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100">
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <span className="ml-1.5 text-sm text-yellow-700 font-semibold">{rating.toFixed(1)}</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Rating</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                                        <Download className="w-4 h-4 text-gray-600" />
                                        <span className="ml-1.5 text-sm text-gray-700 font-semibold">
                                            {downloads >= 1000 ? `${(downloads / 1000).toFixed(1)}k` : downloads}
                                        </span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Downloads</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </TooltipProvider>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500 font-medium">Price</span>
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                {price === 0 ? 'Free' : `$${price.toFixed(2)}`}
                            </span>
                            <span className="text-sm text-gray-500">
                                ({(price * 0.08).toFixed(2)} SOL)
                            </span>
                        </div>
                    </div>
                    <Button
                        onClick={() => onBuyClick(id)}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        {price === 0 ? 'Download' : 'Buy Now'}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
