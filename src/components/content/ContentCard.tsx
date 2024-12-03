import React from 'react';
import { Star, Download, User, ExternalLink } from 'lucide-react';
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
import { useNavigate } from 'react-router-dom';

interface ContentCardProps {
    title: string;
    creator: string;
    creatorSlug: string;
    contentSlug: string;
    price: number;
    type: string;
    thumbnail: string;
    downloads: number;
    rating: number;
}

export function ContentCard({
    title,
    creator,
    creatorSlug,
    contentSlug,
    price,
    type,
    thumbnail,
    downloads,
    rating,
}: ContentCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/${creatorSlug}/${type.toLowerCase()}/${contentSlug}`);
    };

    return (
        <Card 
            className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border border-gray-100/50 bg-white/50 backdrop-blur-sm cursor-pointer"
            onClick={handleClick}
        >
            <div className="relative pb-[56.25%] bg-gradient-to-br from-purple-50/80 to-gray-50/80 overflow-hidden">
                <img
                    src={thumbnail}
                    alt={`${title} thumbnail`}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Badge 
                    variant="secondary" 
                    className="absolute top-3 right-3 bg-white/95 shadow-lg backdrop-blur-md font-medium border-0"
                >
                    {type}
                </Badge>
            </div>

            <CardHeader className="p-5 pb-3">
                <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-purple-700 transition-colors duration-300">
                    {title}
                </h3>
            </CardHeader>

            <CardContent className="p-5 pt-2 space-y-4">
                <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8 ring-2 ring-purple-100 transition-shadow group-hover:ring-purple-200">
                        <AvatarImage src={`https://avatar.vercel.sh/${creator}`} />
                        <AvatarFallback className="bg-purple-50">
                            <User className="h-4 w-4 text-purple-600" />
                        </AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium text-gray-700">By {creator}</p>
                </div>

                <div className="flex items-center justify-between">
                    <TooltipProvider delayDuration={200}>
                        <div className="flex items-center space-x-3">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center bg-yellow-50/80 px-3 py-1.5 rounded-full border border-yellow-100/50 backdrop-blur-sm transition-colors hover:bg-yellow-50">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        <span className="ml-1.5 text-sm text-yellow-700 font-semibold">{rating.toFixed(1)}</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="font-medium">Rating</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center bg-gray-50/80 px-3 py-1.5 rounded-full border border-gray-100/50 backdrop-blur-sm transition-colors hover:bg-gray-50">
                                        <Download className="w-4 h-4 text-gray-600" />
                                        <span className="ml-1.5 text-sm text-gray-700 font-semibold">
                                            {downloads >= 1000 ? `${(downloads / 1000).toFixed(1)}k` : downloads}
                                        </span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="font-medium">Downloads</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </TooltipProvider>
                </div>
            </CardContent>

            <CardFooter className="p-5 pt-0">
                <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500 font-medium">Price</span>
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                {price === 0 ? 'Free' : `$${price.toFixed(2)}`}
                            </span>
                            <span className="text-sm text-gray-500 font-medium">
                                ({(price * 0.08).toFixed(2)} SOL)
                            </span>
                        </div>
                    </div>
                    <Button
                        onClick={handleClick}
                        className={cn(
                            "bg-gradient-to-r from-purple-600 to-indigo-600",
                            "hover:from-purple-700 hover:to-indigo-700",
                            "shadow-md hover:shadow-xl",
                            "transition-all duration-300",
                            "flex items-center space-x-2"
                        )}
                    >
                        <span>{price === 0 ? 'Download' : 'Buy Now'}</span>
                        <ExternalLink className="w-4 h-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
