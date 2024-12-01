import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Upload, DollarSign, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Card } from '@/components/ui/Card';
import { FileUploader } from '@/components/shared/FileUploader';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import { useUser } from '@/hooks/useUser';
import { CategoryList, CategoryKey } from '@/components/courses/CategoryList';

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

const videoUploadSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .min(50, 'Description must be at least 50 characters long')
    .max(1000, 'Description must be less than 1000 characters'),
  tags: z.array(z.string())
    .min(1, 'At least one tag is required')
    .max(5, 'Maximum 5 tags allowed'),
  price: z.number()
    .min(0, 'Price cannot be negative')
    .optional(),
  currency: z.enum(['SOL', 'USDC', 'BONK']).default('SOL'),
  isPaid: z.boolean().default(false),
});

type VideoUploadFormData = z.infer<typeof videoUploadSchema>;

export default function CreateVideo() {
  const { toast } = useToast();
  const { user } = useUser();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedMainCategory, setSelectedMainCategory] = useState<CategoryKey | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<VideoUploadFormData>({
    resolver: zodResolver(videoUploadSchema),
    defaultValues: {
      isPaid: false,
      currency: 'SOL',
      tags: [],
    }
  });

  const isPaid = watch('isPaid');
  const price = watch('price');
  const currency = watch('currency') as Currency;
  const description = watch('description');
  const title = watch('title');

  const selectedCurrency = CURRENCY_OPTIONS.find(c => c.value === currency);
  const usdValue = price && selectedCurrency 
    ? (price * selectedCurrency.exchangeRate).toFixed(2)
    : '0.00';

  const handleVideoUpload = async (files: FileList) => {
    const file = files[0];
    if (!file) return;

    if (!ACCEPTED_VIDEO_TYPES.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a valid video file (MP4, AVI, or QuickTime)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Video file must be less than 500MB",
        variant: "destructive",
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
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
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
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = async (data: VideoUploadFormData) => {
    if (!videoFile) {
      toast({
        title: "Missing video",
        description: "Please upload a video file",
        variant: "destructive",
      });
      return;
    }

    if (!thumbnailFile) {
      toast({
        title: "Missing thumbnail",
        description: "Please upload a thumbnail image",
        variant: "destructive",
      });
      return;
    }

    setIsPublishModalOpen(true);
  };

  const handlePublish = async () => {
    setIsPublishModalOpen(false);
    toast({
      title: "Success!",
      description: "Your video has been successfully published!",
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
      <div className="relative bg-gradient-to-r from-purple-600 via-purple-500 to-teal-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="relative max-w-6xl mx-auto px-4 pt-32 pb-20">
          <h1 className="text-6xl font-bold mb-8 animate-fade-in">Create Your Video</h1>
          <p className="text-2xl opacity-95 max-w-2xl leading-relaxed">
            Share your knowledge and expertise with the Solana community. Create engaging content
            and monetize your skills through video tutorials, courses, and educational content.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload Form */}
          <div className="space-y-8">
            {/* Video Upload Section */}
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-6">Upload Video</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-purple-500 transition-colors duration-300">
                {!videoFile ? (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <FileUploader
                      accept="video/*"
                      onUpload={handleVideoUpload}
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full">
                        Choose Video or Drag & Drop
                      </Button>
                    </FileUploader>
                    <p className="mt-2 text-sm text-gray-500">
                      MP4, AVI, or QuickTime (max. 500MB)
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{videoFile.name}</span>
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
                    {videoPreview && (
                      <video
                        src={videoPreview}
                        controls
                        className="w-full rounded-lg"
                      />
                    )}
                  </div>
                )}
              </div>
            </Card>

            {/* Video Details Section */}
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-6">Video Details</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    {...register('title')}
                    placeholder="Enter video title"
                    className="mt-1"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="Describe your video content"
                    className="mt-1"
                    rows={4}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>

                {/* Category & Tags */}
                <div>
                  <Label>Category & Tags *</Label>
                  <div className="mt-2">
                    <CategoryList
                      selectedMainCategory={selectedMainCategory}
                      selectedTags={tags}
                      onMainCategorySelect={handleMainCategorySelect}
                      onTagSelect={handleTagAdd}
                      onTagRemove={handleTagRemove}
                      maxTags={5}
                    />
                    {errors.tags && (
                      <p className="mt-1 text-sm text-red-600">{errors.tags.message}</p>
                    )}
                  </div>
                </div>

                {/* Pricing Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register('isPaid')}
                      id="isPaid"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <Label htmlFor="isPaid">This is a paid video</Label>
                  </div>

                  {isPaid && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="price">Price *</Label>
                          <Input
                            id="price"
                            type="number"
                            step="0.01"
                            {...register('price', { valueAsNumber: true })}
                            placeholder="0.00"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="currency">Currency *</Label>
                          <select
                            {...register('currency')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          >
                            {CURRENCY_OPTIONS.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {price && (
                        <p className="text-sm text-gray-600 flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          Approximately ${usdValue} USD
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </form>
            </Card>

            {/* Video Upload Section */}
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-6">Upload Video</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-purple-500 transition-colors duration-300">
                <FileUploader
                  accept="video/*"
                  onUpload={handleVideoUpload}
                  className="w-full"
                />
                {isUploading && (
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}
                {videoFile && !isUploading && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>{videoFile.name}</span>
                      <span>{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                    </div>
                    <video
                      src={videoPreview}
                      controls
                      className="w-full rounded-lg"
                    />
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:sticky lg:top-8 space-y-8">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold p-6">Preview</h2>
              
              {/* Video/Thumbnail Preview */}
              <div className="relative aspect-video bg-gray-100">
                {videoFile ? (
                  <div className="relative w-full h-full">
                    <video
                      src={videoPreview}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-6">
                      {thumbnailPreview ? (
                        <div className="relative w-full h-full group">
                          <img
                            src={thumbnailPreview}
                            alt="Video thumbnail"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              variant="outline"
                              className="bg-white/90 hover:bg-white"
                              onClick={() => {
                                setThumbnailFile(null);
                                setThumbnailPreview('');
                              }}
                            >
                              Change Thumbnail
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <FileUploader
                          accept="image/*"
                          onUpload={handleThumbnailUpload}
                          className="w-full max-w-md text-center"
                        >
                          <div className="space-y-4">
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto">
                              <Upload className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">Upload Thumbnail</h3>
                              <p className="text-sm text-white/80 mb-4">
                                Choose an eye-catching thumbnail for your video
                              </p>
                              <Button variant="outline" className="bg-white/90 hover:bg-white">
                                Choose Image
                              </Button>
                            </div>
                          </div>
                        </FileUploader>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Upload a Video First
                    </h3>
                    <p className="text-sm text-gray-500">
                      Then you can add a thumbnail
                    </p>
                  </div>
                )}
              </div>

              {/* Content Preview */}
              <div className="p-6 space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {title || 'Video Title'}
                  </h1>
                  {isPaid && price && (
                    <p className="mt-2 text-lg font-semibold text-purple-600">
                      Price: {price} {currency}
                      <span className="text-sm text-gray-500 ml-2">
                        (≈ ${usdValue} USD)
                      </span>
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {description || 'Video description will appear here...'}
                  </p>
                </div>

                {/* Category & Tags */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Category
                    </h3>
                    <Badge 
                      variant="outline"
                      className="px-3 py-1 text-purple-600 border-purple-600"
                    >
                      {selectedMainCategory || 'Select a category'}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="px-3 py-1"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Creator Profile Card */}
            <Card className="overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-purple-600 to-teal-500" />
              <div className="p-6 -mt-16">
                <div className="flex items-center space-x-4">
                  <img
                    src={user?.avatar || '/default-avatar.png'}
                    alt={user?.name || 'Creator'}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {user?.name || 'Creator Name'}
                    </h3>
                    <p className="text-gray-600">
                      {user?.title || 'Content Creator'}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">
                  {user?.bio || 'Creator bio will appear here...'}
                </p>
                <div className="mt-6 flex justify-end">
                  <Button
                    type="submit"
                    disabled={!isValid || !videoFile || !thumbnailFile}
                    className="w-full bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Publish Video
                  </Button>
                </div>
              </div>
            </Card>
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
                <p>{price} {currency} (≈ ${usdValue} USD)</p>
              </div>
            )}

            <div>
              <h3 className="font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
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
