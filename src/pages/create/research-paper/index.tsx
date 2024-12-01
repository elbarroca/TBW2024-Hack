import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, X, Eye } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

// Validation schema for the research paper form
const researchPaperSchema = z.object({
    title: z
        .string()
        .min(3, 'Title must be at least 3 characters long')
        .max(200, 'Title must be less than 200 characters'),
    abstract: z
        .string()
        .min(100, 'Abstract must be at least 100 characters long')
        .max(2000, 'Abstract must be less than 2000 characters'),
    description: z
        .string()
        .min(50, 'Description must be at least 50 characters long')
        .max(1000, 'Description must be less than 1000 characters'),
    tags: z
        .array(z.string())
        .min(1, 'At least one tag is required')
        .max(5, 'Maximum 5 tags allowed'),
    price: z.number().min(0, 'Price cannot be negative').optional(),
    isPaid: z.boolean().default(false),
    authors: z.string().min(3, 'Authors field is required'),
    institution: z.string().optional(),
});

type ResearchPaperFormData = z.infer<typeof researchPaperSchema>;

export default function CreateResearchPaper() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [previewMode, setPreviewMode] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ResearchPaperFormData>({
        resolver: zodResolver(researchPaperSchema),
        defaultValues: {
            isPaid: false,
            tags: [],
        },
    });

    const isPaid = watch('isPaid');

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
        } else {
            alert('Please upload a PDF file');
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
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const onSubmit = async (data: ResearchPaperFormData) => {
        if (!selectedFile) {
            alert('Please upload a PDF file');
            return;
        }

        // TODO: Implement blockchain upload logic
        console.log('Form data:', { ...data, file: selectedFile });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Upload a Research Paper
                    </h1>
                    <p className="text-gray-600">
                        Share your academic or technical research with the community. Add metadata,
                        set a price, and upload your document.
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
                                placeholder="Enter your research paper title"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Authors Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Authors
                            </label>
                            <input
                                type="text"
                                {...register('authors')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Enter authors (separated by commas)"
                            />
                            {errors.authors && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.authors.message}
                                </p>
                            )}
                        </div>

                        {/* Institution Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Institution (Optional)
                            </label>
                            <input
                                type="text"
                                {...register('institution')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Enter affiliated institution"
                            />
                            {errors.institution && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.institution.message}
                                </p>
                            )}
                        </div>

                        {/* Abstract Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Abstract
                            </label>
                            <textarea
                                {...register('abstract')}
                                rows={6}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Enter the research paper abstract"
                            />
                            {errors.abstract && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.abstract.message}
                                </p>
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
                                placeholder="Add a brief description of your research paper"
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Tags Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tags
                            </label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {tags.map((tag) => (
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
                                <label
                                    htmlFor="isPaid"
                                    className="ml-2 block text-sm text-gray-700"
                                >
                                    This is a paid research paper
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
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.price.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* File Upload Section */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Upload Research Paper (PDF)
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                                <div className="space-y-1 text-center">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                type="file"
                                                className="sr-only"
                                                accept=".pdf"
                                                onChange={handleFileSelect}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PDF up to 50MB</p>
                                </div>
                            </div>
                            {selectedFile && (
                                <p className="mt-2 text-sm text-gray-600">
                                    Selected file: {selectedFile.name}
                                </p>
                            )}
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
                            <Button type="submit" className="w-full sm:w-auto">
                                Publish Research Paper
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
