import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, X, Eye } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

// Validation schema for the eBook form
const eBookSchema = z.object({
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
  isPaid: z.boolean().default(false),
});

type EBookFormData = z.infer<typeof eBookSchema>;

export default function CreateEBook() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<EBookFormData>({
    resolver: zodResolver(eBookSchema),
    defaultValues: {
      isPaid: false,
      tags: [],
    }
  });

  const isPaid = watch('isPaid');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/epub+zip')) {
      setSelectedFile(file);
    } else {
      alert('Please upload a PDF or ePub file');
    }
  };

  const handleCoverImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setCoverImage(file);
    } else {
      alert('Please upload an image file');
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

  const onSubmit = async (data: EBookFormData) => {
    if (!selectedFile) {
      alert('Please upload an eBook file');
      return;
    }
    if (!coverImage) {
      alert('Please upload a cover image');
      return;
    }

    // TODO: Implement blockchain upload logic
    console.log('Form data:', { ...data, file: selectedFile, coverImage });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload an eBook</h1>
          <p className="text-gray-600">
            Share your knowledge by uploading an eBook. Add details, set a price, and monetize your content.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                {...register('title')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your eBook title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="Describe your eBook"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Tags Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
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
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagAdd}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="Add tags (press Enter)"
              />
              {errors.tags && (
                <p className="mt-1 text-sm text-red-600">{errors.tags.message}</p>
              )}
            </div>

            {/* Pricing Options */}
            <div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  {...register('isPaid')}
                  id="isPaid"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="isPaid" className="ml-2 block text-sm text-gray-700">
                  This is a paid eBook
                </label>
              </div>

              {isPaid && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (SOL)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('price', { valueAsNumber: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>
              )}
            </div>

            {/* File Upload Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload eBook (PDF or ePub)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500">
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          type="file"
                          className="sr-only"
                          accept=".pdf,.epub"
                          onChange={handleFileSelect}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF or ePub up to 50MB</p>
                  </div>
                </div>
                {selectedFile && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected file: {selectedFile.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="cover-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500">
                        <span>Upload a cover image</span>
                        <input
                          id="cover-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleCoverImageSelect}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </div>
                </div>
                {coverImage && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected cover: {coverImage.name}
                  </p>
                )}
              </div>
            </div>

            {/* Preview Toggle */}
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                icon={Eye}
                onClick={() => setPreviewMode(!previewMode)}
              >
                {previewMode ? 'Edit Mode' : 'Preview'}
              </Button>
            </div>

            {/* Preview Section */}
            {previewMode && (
              <div className="border rounded-lg p-6 bg-gray-50">
                <h3 className="text-lg font-semibold mb-4">Preview</h3>
                {/* Add preview content here */}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-full sm:w-auto"
              >
                Publish eBook
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 