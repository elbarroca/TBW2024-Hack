import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Upload, DollarSign, Award, Clock, Globe, Star, ArrowRight, Heart, Video, Users2, Play, CheckCircle2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Card, CardContent } from '@/components/ui/card';
import { FileUploader } from '@/components/shared/FileUploader';
import { useToast } from '@/components/ui/use-toast';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/Dialog';
import { Progress } from '@/components/ui/Progress';
import { Badge } from '@/components/ui/Badge';
import { useUser } from '@/hooks/useUser';
import { CategoryList, CategoryKey } from '@/components/courses/CategoryList';
import { Switch } from '@/components/ui/Switch';
import { targetAudience as targetAudienceList } from '@/components/shared/TargetAudience';
import { Input as SearchInput } from '@/components/ui/Input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/avi', 'video/quicktime'];

type Currency = 'SOL' | 'USDC' | 'BONK';

interface CurrencyOption {
    value: Currency;
    label: string;
    icon: string;
    exchangeRate: number;
}

const CURRENCY_OPTIONS: CurrencyOption[] = [
    {
        value: 'SOL',
        label: 'Solana (SOL)',
        icon: '/icons/solana.svg',
        exchangeRate: 60.45,
    },
    {
        value: 'USDC',
        label: 'USD Coin (USDC)',
        icon: '/icons/usdc.svg',
        exchangeRate: 1,
    },
    {
        value: 'BONK',
        label: 'BONK',
        icon: '/icons/bonk.svg',
        exchangeRate: 0.000002,
    },
];

const LANGUAGE_OPTIONS = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ru', label: 'Russian' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'ar', label: 'Arabic' },
    { value: 'hi', label: 'Hindi' },
];

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    detailedDescription: z.string().min(1, "Detailed description is required"),
    tags: z.array(z.string()),
    price: z.number().optional(),
    currency: z.enum(["SOL", "USDC", "BONK"]),
    isPaid: z.boolean(),
    learningObjectives: z.array(z.object({
        title: z.string(),
        description: z.string()
    })),
    prerequisites: z.array(z.string()),
    targetAudience: z.array(z.string()),
    duration: z.string(),
    language: z.string(),
    level: z.string(),
    certification: z.boolean()
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<FormValues> = {
    title: "",
    description: "",
    detailedDescription: "",
    tags: [],
    price: 0,
    currency: "USDC",
    isPaid: false,
    learningObjectives: [],
    prerequisites: [],
    targetAudience: [],
    duration: "",
    language: "",
    level: "All Levels",
    certification: false
};

type TargetAudience = string;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

export default function CreateVideo() {
    const { toast } = useToast();
    const { user } = useUser();
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [selectedMainCategory, setSelectedMainCategory] = useState<CategoryKey | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showThumbnail, setShowThumbnail] = useState(true);
    const [learningObjectives, setLearningObjectives] = useState<Array<{ title: string; description: string }>>([]);
    const [prerequisites, setPrerequisites] = useState<string[]>([]);
    const [targetAudiences, setTargetAudiences] = useState<string[]>([]);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [audienceSearch, setAudienceSearch] = useState('');
    const filteredAudiences = targetAudienceList.filter((audience: TargetAudience) => 
        audience.toLowerCase().includes(audienceSearch.toLowerCase())
    );

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            isPaid: false,
            currency: 'SOL',
            tags: [],
            price: 0,
            language: '',
            level: 'All Levels',
            certification: false,
        }
    });

    const isPaid = watch('isPaid');
    const watchedPrice = watch('price');
    const price = typeof watchedPrice === 'number' ? watchedPrice : 0;
    const currency = watch('currency') as Currency;
    const description = watch('description') || '';
    const title = watch('title');

    const selectedCurrency = CURRENCY_OPTIONS.find((c) => c.value === currency);
    const usdValue =
        price && selectedCurrency ? (price * selectedCurrency.exchangeRate).toFixed(2) : '0.00';

    const handleVideoUpload = async (files: FileList) => {
        const file = files[0];
        if (!file) return;

        if (!ACCEPTED_VIDEO_TYPES.includes(file.type)) {
            toast({
                title: 'Invalid file type',
                description: 'Please upload a valid video file (MP4, AVI, or QuickTime)',
                variant: 'destructive',
            });
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            toast({
                title: 'File too large',
                description: 'Video file must be less than 500MB',
                variant: 'destructive',
            });
            return;
        }

        setIsUploading(true);
        setVideoFile(file);

        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            setUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setIsUploading(false);
                setVideoPreview(URL.createObjectURL(file));
            }
        }, 100);
    };

    const handleThumbnailUpload = async (files: FileList) => {
        const file = files[0];
        if (file && file.type.startsWith('image/')) {
            setThumbnailFile(file);
            setThumbnailPreview(URL.createObjectURL(file));
        } else {
            toast({
                title: 'Invalid file type',
                description: 'Please upload an image file',
                variant: 'destructive',
            });
        }
    };

    const handleMainCategorySelect = (category: CategoryKey | null) => {
        setSelectedMainCategory(category);
        setTags([]);
    };

    const handleTagAdd = (tag: string) => {
        if (tags.length < 5 && !tags.includes(tag)) {
            setTags([...tags, tag]);
        }
    };

    const handleTagRemove = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const onSubmit = async (data: FormValues) => {
        if (!videoFile) {
            toast({
                title: 'Missing video',
                description: 'Please upload a video file',
                variant: 'destructive',
            });
            return;
        }

        if (!thumbnailFile) {
            toast({
                title: 'Missing thumbnail',
                description: 'Please upload a thumbnail image',
                variant: 'destructive',
            });
            return;
        }

        if (learningObjectives.length === 0) {
            toast({
                title: 'Missing learning objectives',
                description: 'Please add at least one learning objective',
                variant: 'destructive',
            });
            return;
        }

        if (prerequisites.length === 0) {
            toast({
                title: 'Missing prerequisites',
                description: 'Please add at least one prerequisite',
                variant: 'destructive',
            });
            return;
        }

        if (targetAudiences.length === 0) {
            toast({
                title: 'Missing target audience',
                description: 'Please add at least one target audience',
                variant: 'destructive',
            });
            return;
        }

        // Combine all form data
        const formData = {
            ...data,
            learningObjectives,
            prerequisites,
            targetAudience: targetAudiences,
            videoFile,
            thumbnailFile,
            creatorId: user?.id,
            categories: selectedMainCategory ? [selectedMainCategory] : [],
            tags,
        };

        setIsPublishModalOpen(true);
        
        try {
            // TODO: Implement API call to save the content
            console.log('Form data to be submitted:', formData);
            
            // Mock successful submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            toast({
                title: 'Success!',
                description: 'Your video has been successfully published!',
            });
            
            setIsPublishModalOpen(false);
            // TODO: Redirect to the content page or dashboard
        } catch (error) {
            console.error('Error publishing video:', error);
            toast({
                title: 'Error',
                description: 'Failed to publish the video. Please try again.',
                variant: 'destructive',
            });
            setIsPublishModalOpen(false);
        }
    };

    const handlePublish = async () => {
        setIsPublishModalOpen(false);
        toast({
            title: 'Success!',
            description: 'Your video has been successfully published!',
        });
    };

    const handleVideoPlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                setShowThumbnail(false);
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVideoEnd = () => {
        setIsPlaying(false);
        setShowThumbnail(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-600/95 via-fuchsia-600/95 to-purple-800/95 py-32">
                {/* Animated background elements */}
                <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/20 animate-gradient" />
                <div className="absolute -inset-[10px] bg-[url('/patterns/noise.png')] mix-blend-overlay opacity-30" />
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                        animation: 'pulse 8s infinite'
                    }}
                />

                <div className="relative max-w-7xl mx-auto px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.8,
                            ease: "easeOut"
                        }}
                        className="space-y-8"
                    >
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-white drop-shadow-2xl">
                            Create Your Article 
                        </h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-purple-50 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-light"
                        >
                            Share your knowledge with the world. Create engaging video content that helps others learn and grow in the Solana ecosystem.
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="flex flex-wrap justify-center gap-6 pt-8"
                        >
                            <Badge className="px-8 py-3 text-lg bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                <Video className="w-6 h-6 mr-3" />
                                Video 
                            </Badge>
                            <Badge className="px-8 py-3 text-lg bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                <Users2 className="w-6 h-6 mr-3" />
                                Share Knowledge
                            </Badge>
                            <Badge className="px-8 py-3 text-lg bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                <Globe className="w-6 h-6 mr-3" />
                                Global Reach
                            </Badge>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Column - Form */}
                    <div className="space-y-12 p-8 bg-white/40 backdrop-blur-sm rounded-2xl border border-purple-100/20 shadow-xl">
                        {/* Section Title */}
                        <div className="border-b border-purple-200/30 pb-6">
                            <h2 className="text-2xl font-semibold text-purple-900">Create Your Video</h2>
                            <p className="text-purple-600 mt-2">Fill in the details below to create your video</p>
                        </div>

                        {/* Upload Section - 2x2 Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Video Upload */}
                            <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-none">
                                <h2 className="text-xl font-semibold mb-4">Upload Video</h2>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-purple-500 transition-colors duration-300">
                                    {!videoFile ? (
                                        <div className="text-center">
                                            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                            <div className="w-full">
                                                <FileUploader
                                                    accept="video/*"
                                                    onUpload={handleVideoUpload}
                                                >
                                                    <Button variant="outline" className="w-full">
                                                        Choose Video
                                                    </Button>
                                                </FileUploader>
                                            </div>
                                            <p className="mt-2 text-sm text-gray-500">
                                                MP4, AVI, or QuickTime (max. 500MB)
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between text-sm text-gray-600">
                                                <span className="truncate">{videoFile.name}</span>
                                                <span>{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                                            </div>
                                            {isUploading && (
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm text-gray-600">
                                                        <span>Uploading...</span>
                                                        <span>{uploadProgress}%</span>
                                                    </div>
                                                    <Progress value={uploadProgress} className="w-full" />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Card>

                            {/* Thumbnail Upload */}
                            <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-none">
                                <h2 className="text-xl font-semibold mb-4">Upload Thumbnail</h2>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-purple-500 transition-colors duration-300">
                                    {!thumbnailFile ? (
                                        <div className="text-center">
                                            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                            <div className="w-full">
                                                <FileUploader
                                                    accept="image/*"
                                                    onUpload={handleThumbnailUpload}
                                                >
                                                    <Button variant="outline" className="w-full">
                                                        Choose Thumbnail
                                                    </Button>
                                                </FileUploader>
                                            </div>
                                            <p className="mt-2 text-sm text-gray-500">
                                                JPG, PNG, or GIF (max. 5MB)
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <img
                                                src={thumbnailPreview}
                                                alt="Thumbnail preview"
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                            <div className="flex items-center justify-between text-sm text-gray-600">
                                                <span className="truncate">{thumbnailFile.name}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        setThumbnailFile(null);
                                                        setThumbnailPreview('');
                                                    }}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>

                        {/* Form Sections */}
                        <div className="space-y-12">
                            {/* About This Video */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-purple-200/30"></div>
                                </div>
                                <div className="relative flex justify-start">
                                    <span className="bg-white/40 pr-3 text-lg font-semibold text-purple-900">About Your Video</span>
                                </div>
                            </div>

                            <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-none">
                                <h2 className="text-xl font-semibold mb-4">About This Video</h2>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            {...register('title')}
                                            placeholder="Enter a descriptive title"
                                            className="mt-1"
                                        />
                                        {errors.title && (
                                            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="language">Language</Label>
                                        <select
                                            id="language"
                                            {...register('language')}
                                            className="w-full mt-1 rounded-md border border-gray-300 bg-white px-3 py-2"
                                        >
                                            <option value="">Select a language</option>
                                            {LANGUAGE_OPTIONS.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.language && (
                                            <p className="text-red-500 text-sm mt-1">{errors.language.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="shortDescription">Short Description</Label>
                                        <Textarea
                                            id="shortDescription"
                                            {...register('description')}
                                            placeholder="Brief overview of your video (will appear in search results)"
                                            className="mt-1 h-24"
                                        />
                                        {errors.description && (
                                            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="detailedDescription">Detailed Description</Label>
                                        <Textarea
                                            id="detailedDescription"
                                            {...register('detailedDescription')}
                                            placeholder="Provide a comprehensive description of your video content"
                                            className="mt-1 h-32"
                                        />
                                    </div>
                                </div>
                            </Card>

                            {/* What You'll Learn Section */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-purple-200/30"></div>
                                </div>
                                <div className="relative flex justify-start">
                                    <span className="bg-white/40 pr-3 text-lg font-semibold text-purple-900">Learning Objectives</span>
                                </div>
                            </div>

                            <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-none">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold">What You'll Learn</h2>
                                    {learningObjectives.length < 5 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                if (learningObjectives.length < 5) {
                                                    setLearningObjectives([
                                                        ...learningObjectives,
                                                        { title: '', description: '' }
                                                    ]);
                                                }
                                            }}
                                        >
                                            Add Learning Objective
                                        </Button>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    {learningObjectives.map((objective, index) => (
                                        <div key={index} className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg">
                                            <div className="flex-1 space-y-2">
                                                <Input
                                                    placeholder="Objective title"
                                                    value={objective.title}
                                                    onChange={(e) => {
                                                        const newObjectives = [...learningObjectives];
                                                        newObjectives[index].title = e.target.value;
                                                        setLearningObjectives(newObjectives);
                                                    }}
                                                />
                                                <Textarea
                                                    placeholder="Objective description"
                                                    value={objective.description}
                                                    onChange={(e) => {
                                                        const newObjectives = [...learningObjectives];
                                                        newObjectives[index].description = e.target.value;
                                                        setLearningObjectives(newObjectives);
                                                    }}
                                                    className="h-20"
                                                />
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    setLearningObjectives(learningObjectives.filter((_, i) => i !== index));
                                                }}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Prerequisites Section */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-purple-200/30"></div>
                                </div>
                                <div className="relative flex justify-start">
                                    <span className="bg-white/40 pr-3 text-lg font-semibold text-purple-900">Video Requirements</span>
                                </div>
                            </div>

                            <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-none">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold">Prerequisites</h2>
                                    {prerequisites.length < 5 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setPrerequisites([...prerequisites, ''])}
                                        >
                                            Add Prerequisite
                                        </Button>
                                    )}
                                </div>
                                <div className="space-y-3">
                                    {prerequisites.map((prerequisite, index) => (
                                        <div key={index} className="flex gap-2 items-center">
                                            <Input
                                                value={prerequisite}
                                                onChange={(e) => {
                                                    const newPrerequisites = [...prerequisites];
                                                    newPrerequisites[index] = e.target.value;
                                                    setPrerequisites(newPrerequisites);
                                                }}
                                                placeholder="Enter a prerequisite"
                                                className="flex-1"
                                            />
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    setPrerequisites(prerequisites.filter((_, i) => i !== index));
                                                }}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Target Audience Section */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-purple-200/30"></div>
                                </div>
                                <div className="relative flex justify-start">
                                    <span className="bg-white/40 pr-3 text-lg font-semibold text-purple-900">Target Audience</span>
                                </div>
                            </div>

                            <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-none">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold">Target Audience</h2>
                                    <span className="text-sm text-gray-500">{targetAudiences.length}/3 selected</span>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <SearchInput
                                            placeholder="Search target audience..."
                                            value={audienceSearch}
                                            onChange={(e) => setAudienceSearch(e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                    <ScrollArea className="h-[200px]">
                                        <div className="space-y-2">
                                            {filteredAudiences.map((audience: TargetAudience) => (
                                                <div
                                                    key={audience}
                                                    className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer ${
                                                        targetAudiences.includes(audience) ? 'bg-purple-50 border border-purple-200' : ''
                                                    }`}
                                                    onClick={() => {
                                                        if (targetAudiences.includes(audience)) {
                                                            setTargetAudiences(targetAudiences.filter(a => a !== audience));
                                                        } else if (targetAudiences.length < 3) {
                                                            setTargetAudiences([...targetAudiences, audience]);
                                                        }
                                                    }}
                                                >
                                                    <span className="text-sm">{audience}</span>
                                                    {targetAudiences.includes(audience) && (
                                                        <Badge variant="secondary" className="bg-purple-100">Selected</Badge>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                    {targetAudiences.length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-4 border-t">
                                            {targetAudiences.map((audience) => (
                                                <Badge
                                                    key={audience}
                                                    variant="secondary"
                                                    className="px-3 py-1 flex items-center gap-1"
                                                >
                                                    {audience}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setTargetAudiences(targetAudiences.filter(a => a !== audience));
                                                        }}
                                                        className="ml-1 hover:text-red-500"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Card>

                            {/* Category & Tags Section */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-purple-200/30"></div>
                                </div>
                                <div className="relative flex justify-start">
                                    <span className="bg-white/40 pr-3 text-lg font-semibold text-purple-900">Categories & Tags</span>
                                </div>
                            </div>

                            <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-none">
                                <h2 className="text-xl font-semibold mb-4">Category & Tags</h2>
                                <div className="space-y-6">
                                    <div>
                                        <Label>Select Category & Tags</Label>
                                        <div className="mt-2">
                                            <CategoryList
                                                selectedMainCategory={selectedMainCategory}
                                                selectedTags={tags}
                                                onMainCategorySelect={handleMainCategorySelect}
                                                onTagSelect={handleTagAdd}
                                                onTagRemove={handleTagRemove}
                                                maxTags={5}
                                            />
                                        </div>
                                        {tags.length > 0 && (
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {tags.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="secondary"
                                                        className="px-3 py-1 flex items-center gap-1"
                                                    >
                                                        {tag}
                                                        <button
                                                            onClick={() => handleTagRemove(tag)}
                                                            className="ml-1 hover:text-red-500"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>

                            {/* Pricing Section */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-purple-200/30"></div>
                                </div>
                                <div className="relative flex justify-start">
                                    <span className="bg-white/40 pr-3 text-lg font-semibold text-purple-900">Pricing Details</span>
                                </div>
                            </div>

                            <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-none">
                                <h2 className="text-xl font-semibold mb-4">Pricing</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Switch
                                            id="isPaid"
                                            checked={isPaid}
                                            onCheckedChange={(checked) => {
                                                setValue('isPaid', checked);
                                                if (!checked) {
                                                    setValue('price', 0);
                                                }
                                            }}
                                        />
                                        <Label htmlFor="isPaid">This is a paid video</Label>
                                    </div>

                                    {isPaid && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="space-y-4"
                                        >
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="price">Price</Label>
                                                    <Input
                                                        id="price"
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        {...register('price', {
                                                            valueAsNumber: true,
                                                            required: isPaid ? 'Price is required for paid content' : false,
                                                            min: {
                                                                value: 0,
                                                                message: 'Price cannot be negative'
                                                            }
                                                        })}
                                                        placeholder="0.00"
                                                        className="mt-1"
                                                    />
                                                    {errors.price && (
                                                        <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <Label htmlFor="currency">Currency</Label>
                                                    <select
                                                        id="currency"
                                                        {...register('currency')}
                                                        className="w-full mt-1 rounded-md border border-gray-300 bg-white px-3 py-2"
                                                    >
                                                        {CURRENCY_OPTIONS.map((option) => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            {price > 0 && (
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="text-sm text-gray-600 flex items-center"
                                                >
                                                    <DollarSign className="h-4 w-4 mr-1" />
                                                    Approximately ${usdValue} USD
                                                </motion.p>
                                            )}
                                        </motion.div>
                                    )}
                                </div>
                            </Card>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end mt-12 pt-6 border-t border-purple-200/30">
                            <Button
                                type="submit"
                                size="lg"
                                className="px-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                disabled={!isValid || !videoFile || !thumbnailFile}
                                onClick={handleSubmit(onSubmit)}
                            >
                                Publish Video
                            </Button>
                        </div>
                    </div>

                    {/* Right Column - Live Preview */}
                    <div className="lg:sticky lg:top-8 space-y-12 p-8 bg-white/40 backdrop-blur-sm rounded-2xl border border-purple-100/20 shadow-xl">
                        {/* Enhanced Hero Section */}
                        <motion.section 
                            className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white rounded-xl overflow-hidden p-8"
                            variants={containerVariants}
                        >
                            <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 backdrop-blur-sm" />
                            <motion.div 
                                className="relative z-10"
                                variants={itemVariants}
                            >
                                <div className="grid grid-cols-1 gap-8">
                                    {/* Video/Thumbnail Preview */}
                                    <div className="relative aspect-video w-full overflow-hidden">
                                        {videoFile && videoPreview ? (
                                            <>
                                                {showThumbnail && thumbnailPreview ? (
                                                    <img
                                                        src={thumbnailPreview}
                                                        alt="Video thumbnail"
                                                        className="absolute inset-0 w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <video
                                                        ref={videoRef}
                                                        src={videoPreview}
                                                        className="absolute inset-0 w-full h-full object-cover"
                                                        onClick={handleVideoPlay}
                                                        onEnded={handleVideoEnd}
                                                    />
                                                )}
                                            </>
                                        ) : thumbnailPreview ? (
                                            <img
                                                src={thumbnailPreview}
                                                alt="Video thumbnail"
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                                                <ImageIcon className="w-16 h-16 text-gray-600" />
                                            </div>
                                        )}
                                        {videoFile && !isPlaying && (
                                            <Button
                                                size="lg"
                                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md"
                                                onClick={handleVideoPlay}
                                            >
                                                <Play className="w-8 h-8" />
                                                Watch Preview
                                            </Button>
                                        )}
                                    </div>

                                    {/* Enhanced Content Info */}
                                    <div className="p-8 space-y-6">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm">
                                                <Video className="w-3.5 h-3.5 mr-1.5" />
                                                Video
                                            </Badge>
                                            {watch('certification') && (
                                                <Badge className="bg-gradient-to-r from-yellow-400/90 to-yellow-500/90 text-black border-none backdrop-blur-sm">
                                                    <Award className="w-3.5 h-3.5 mr-1.5" />
                                                    Certification Included
                                                </Badge>
                                            )}
                                            <Badge className="bg-green-500/90 text-white border-none backdrop-blur-sm">
                                                <Clock className="w-3.5 h-3.5 mr-1.5" />
                                                {watch('duration') || '0 hours'}
                                            </Badge>
                                        </div>
                                        
                                        <h1 className="text-4xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100">
                                            {watch('title') || 'Video Title'}
                                        </h1>
                                        
                                        <p className="text-lg text-purple-100 leading-relaxed">
                                            {watch('description') || 'Add a description to your video...'}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-4 text-sm">
                                            <div className="flex items-center gap-1 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                <span className="font-medium">New</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                                                <Globe className="w-4 h-4" />
                                                <span>
                                                    {watch('language') ? 
                                                        LANGUAGE_OPTIONS.find(lang => lang.value === watch('language'))?.label 
                                                        : 'Select Language'
                                                    }
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                                                <Users2 className="w-4 h-4" />
                                                <span>{watch('level') || 'All Levels'}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                                                <Video className="w-4 h-4" />
                                                <span>Video</span>
                                            </div>
                                        </div>

                                        {/* Price Display */}
                                        <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-white/10">
                                            <div className="flex items-baseline gap-2 mb-2">
                                                <span className="text-4xl font-bold text-white">
                                                    {isPaid ? `$${price}` : 'Free'}
                                                </span>
                                            </div>
                                            <p className="text-purple-200 text-sm mb-6">
                                                One-time payment • Lifetime access
                                            </p>
                                            
                                            <div className="flex flex-wrap gap-4">
                                                <Button 
                                                    size="lg" 
                                                    className="group bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-lg px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                                                >
                                                    <span>{isPaid ? 'Buy Now' : 'Access Now'}</span>
                                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                                <Button 
                                                    size="lg" 
                                                    variant="outline" 
                                                    className="group bg-white/10 hover:bg-white/20 border-white/30 backdrop-blur-sm"
                                                >
                                                    <Heart className="w-5 h-5 mr-2 group-hover:text-red-400 transition-colors" />
                                                    Wishlist
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.section>

                        {/* About This Video */}
                        <Card className="bg-white/50 backdrop-blur-sm border-purple-100/50 overflow-hidden mt-12 p-8">
                            <div className="border-l-4 border-purple-500 px-6 py-4 bg-purple-50/50">
                                <h2 className="text-2xl font-bold text-purple-900">About This Video</h2>
                            </div>
                            <CardContent className="p-6 space-y-4 text-gray-700 leading-relaxed">
                                <p>{watch('detailedDescription') || 'Add a detailed description to help students understand what they will learn in this video...'}</p>
                            </CardContent>
                        </Card>

                        {/* What You'll Learn */}
                        <Card className="bg-white/50 backdrop-blur-sm border-purple-100/50 overflow-hidden mt-12 p-8">
                            <div className="border-l-4 border-indigo-500 px-6 py-4 bg-indigo-50/50">
                                <h2 className="text-2xl font-bold text-indigo-900">What You'll Learn</h2>
                            </div>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 gap-4">
                                    {learningObjectives.length > 0 ? (
                                        learningObjectives.map((objective, index) => (
                                            <motion.div 
                                                key={index}
                                                className="flex gap-4 p-4 rounded-lg bg-white/70 border border-indigo-100/50 hover:shadow-md transition-all duration-300"
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-semibold text-indigo-900 mb-1">{objective.title}</h3>
                                                    <p className="text-sm text-gray-600">{objective.description}</p>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-center py-4">Add learning objectives to show students what they will learn.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Prerequisites & Target Audience */}
                        <div className="grid grid-cols-1 gap-8 mt-12">
                            {/* Prerequisites */}
                            <Card className="bg-white/50 backdrop-blur-sm border-purple-100/50 overflow-hidden p-8">
                                <div className="border-l-4 border-blue-500 px-6 py-4 bg-blue-50/50">
                                    <h2 className="text-2xl font-bold text-blue-900">Prerequisites</h2>
                                </div>
                                <CardContent className="p-6">
                                    <ScrollArea className="h-[200px] pr-4">
                                        {prerequisites.length > 0 ? (
                                            <ul className="space-y-4">
                                                {prerequisites.map((prerequisite, index) => (
                                                    <motion.li 
                                                        key={index}
                                                        className="flex items-start gap-3 p-3 rounded-lg bg-white/70 border border-blue-100/50"
                                                        whileHover={{ x: 4 }}
                                                    >
                                                        <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                                        <span className="text-gray-700">{prerequisite}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-500 text-center py-4">Add prerequisites to help students understand what they need to know before starting.</p>
                                        )}
                                    </ScrollArea>
                                </CardContent>
                            </Card>

                            {/* Target Audience */}
                            <Card className="bg-white/50 backdrop-blur-sm border-purple-100/50 overflow-hidden p-8">
                                <div className="border-l-4 border-green-500 px-6 py-4 bg-green-50/50">
                                    <h2 className="text-2xl font-bold text-green-900">Target Audience</h2>
                                </div>
                                <CardContent className="p-6">
                                    <ScrollArea className="h-[200px] pr-4">
                                        {targetAudiences.length > 0 ? (
                                            <ul className="space-y-4">
                                                {targetAudiences.map((audience, index) => (
                                                    <motion.li 
                                                        key={index}
                                                        className="flex items-start gap-3 p-3 rounded-lg bg-white/70 border border-green-100/50"
                                                        whileHover={{ x: 4 }}
                                                    >
                                                        <Users2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                        <span className="text-gray-700">{audience}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-500 text-center py-4">Add target audiences to show who this video is designed for.</p>
                                        )}
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Buy Now Section with Price Logic */}
                        <motion.div variants={itemVariants} className="mt-12">
                            <Card className="relative overflow-hidden p-8">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/95 via-indigo-600/95 to-purple-800/95" />
                                <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
                                <CardContent className="relative z-10 p-10">
                                    <div className="text-center space-y-8">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-4"
                                        >
                                            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-white">
                                                Start Your Learning Journey Today
                                            </h2>
                                            <p className="text-purple-100 text-lg max-w-2xl mx-auto leading-relaxed">
                                                Join thousands of students already mastering {title || 'this video'}.
                                                Get lifetime access to all video materials and future updates.
                                            </p>
                                        </motion.div>

                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="flex flex-col items-center gap-6"
                                        >
                                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                                <div className="flex items-baseline justify-center gap-3 mb-2">
                                                    <span className="text-5xl font-bold text-white">
                                                        ${price}
                                                    </span>
                                                </div>
                                                <p className="text-purple-200 text-sm">
                                                    One-time payment   Lifetime access   Free updates
                                                </p>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="space-y-6"
                                        >
                                            <div className="flex flex-col items-center gap-4">
                                                <Button 
                                                    size="lg"
                                                    className="group font-semibold text-lg px-12 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-white to-purple-50 hover:from-purple-50 hover:to-white text-purple-700 hover:text-purple-800"
                                                >
                                                    <span>Buy Now</span>
                                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Publish Confirmation Modal */}
            <Dialog open={isPublishModalOpen} onOpenChange={setIsPublishModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Publication</DialogTitle>
                        <DialogDescription>
                            Please review your video details before publishing
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold">Title</h3>
                            <p>{title}</p>
                        </div>

                        {isPaid && (
                            <div>
                                <h3 className="font-semibold">Price</h3>
                                <p>
                                    {price} {currency} (≈ ${usdValue} USD)
                                </p>
                            </div>
                        )}

                        <div>
                            <h3 className="font-semibold">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold">Creator</h3>
                            <p>{user?.name}</p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPublishModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handlePublish}
                            className="bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600"
                        >
                            Confirm & Publish
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
