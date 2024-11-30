import { useState, Suspense, lazy } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card } from '@/components/ui/Card';
import { FileUploader } from '@/components/shared/FileUploader';
import { useToast } from '@/components/ui/use-toast';

// Import TipTap editor using React.lazy
const TipTapEditor = lazy(() => import('@/components/editor/TipTapEditor'));

// Validation schema for the article form
const articleSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must be less than 100 characters'),
  content: z.string()
    .min(100, 'Content must be at least 100 characters long')
    .max(50000, 'Content must be less than 50,000 characters'),
  tags: z.array(z.string())
    .min(1, 'At least one tag is required')
    .max(5, 'Maximum 5 tags allowed'),
});

type ArticleFormData = z.infer<typeof articleSchema>;

export default function CreateArticle() {
  const { toast } = useToast();
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      tags: [],
    }
  });

  const handleCoverImageUpload = async (files: FileList) => {
    const file = files[0];
    if (file && file.type.startsWith('image/')) {
      setCoverImage(file);
      setCoverImagePreview(URL.createObjectURL(file));
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
    }
  };

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (tags.length < 5) {
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
      }
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = async (data: ArticleFormData) => {
    if (!coverImage) {
      toast({
        title: "Missing cover image",
        description: "Please upload a cover image",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement blockchain upload logic
    console.log('Form data:', { ...data, coverImage, content });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Write an Article</h1>
          <p className="text-gray-600">
            Share your insights and expertise through written content. Add text, images, and metadata to publish.
          </p>
        </div>

        <Card className="p-6 mb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Cover Image Upload */}
            <div>
              <Label>Cover Image</Label>
              <FileUploader
                accept="image/*"
                onUpload={handleCoverImageUpload}
                className="mt-1"
              />
              {coverImagePreview && (
                <img
                  src={coverImagePreview}
                  alt="Article cover"
                  className="mt-2 rounded-lg h-48 w-full object-cover"
                />
              )}
            </div>

            {/* Title Field */}
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="Enter your article title"
                className="mt-1"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Rich Text Editor */}
            <div>
              <Label>Content</Label>
              <div className="mt-1 prose prose-purple max-w-none">
                <Suspense fallback={<div className="h-64 w-full animate-pulse bg-gray-100 rounded-lg" />}>
                  <TipTapEditor
                    content={content}
                    onChange={setContent}
                    editable={!previewMode}
                  />
                </Suspense>
              </div>
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>

            {/* Tags Input */}
            <div>
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-50 text-purple-700"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagRemove(tag)}
                      className="ml-2 focus:outline-none"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
              <Input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagAdd}
                placeholder="Add tags (press Enter)"
                className="mt-1"
              />
              {errors.tags && (
                <p className="mt-1 text-sm text-red-600">{errors.tags.message}</p>
              )}
            </div>

            {/* Preview Toggle */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPreviewMode(!previewMode)}
              >
                {previewMode ? 'Edit Mode' : 'Preview'}
              </Button>
              <Button type="submit">
                Publish Article
              </Button>
            </div>

            {/* Preview Section */}
            {previewMode && (
              <div className="border rounded-lg p-6 bg-gray-50">
                <h3 className="text-lg font-semibold mb-4">Preview</h3>
                <div className="space-y-4">
                  {coverImagePreview && (
                    <div>
                      <h4 className="font-medium text-gray-700">Cover Image</h4>
                      <img
                        src={coverImagePreview}
                        alt="Article cover"
                        className="mt-2 rounded-lg h-48 w-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium text-gray-700">Title</h4>
                    <p>{watch('title')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Content</h4>
                    <div className="prose prose-purple max-w-none">
                      <Suspense fallback={<div className="h-64 w-full animate-pulse bg-gray-100 rounded-lg" />}>
                        <TipTapEditor
                          content={content}
                          onChange={() => {}}
                          editable={false}
                        />
                      </Suspense>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}
