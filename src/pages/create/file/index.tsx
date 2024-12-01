import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Card } from '@/components/ui/Card';
import { FileUploader } from '@/components/shared/FileUploader';
import { useToast } from '@/components/ui/use-toast';

// File types available for upload
const FILE_TYPES = [
    { value: 'template', label: 'Template' },
    { value: 'guide', label: 'Guide' },
    { value: 'resource', label: 'Resource' },
    { value: 'document', label: 'Document' },
    { value: 'other', label: 'Other' },
] as const;

type FileType = (typeof FILE_TYPES)[number]['value'];

// Validation schema for the file upload form
const fileUploadSchema = z.object({
    title: z
        .string()
        .min(3, 'Title must be at least 3 characters long')
        .max(100, 'Title must be less than 100 characters'),
    description: z
        .string()
        .min(50, 'Description must be at least 50 characters long')
        .max(1000, 'Description must be less than 1000 characters'),
    fileType: z
        .enum(['template', 'guide', 'resource', 'document', 'other'] as const)
        .refine((val) => val !== '', 'Please select a file type'),
    tags: z
        .array(z.string())
        .min(1, 'At least one tag is required')
        .max(5, 'Maximum 5 tags allowed'),
    price: z.number().min(0, 'Price cannot be negative').optional(),
    isPaid: z.boolean().default(false),
});

type FileUploadFormData = z.infer<typeof fileUploadSchema>;

export default function CreateFile() {
    const { toast } = useToast();
    const [file, setFile] = useState<File | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [previewMode, setPreviewMode] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FileUploadFormData>({
        resolver: zodResolver(fileUploadSchema),
        defaultValues: {
            isPaid: false,
            tags: [],
            fileType: '' as FileType,
        },
    });

    const isPaid = watch('isPaid');

    const handleFileUpload = async (files: FileList) => {
        const uploadedFile = files[0];
        if (uploadedFile) {
            // Check file size (50MB limit)
            if (uploadedFile.size > 50 * 1024 * 1024) {
                toast({
                    title: 'File too large',
                    description: 'Maximum file size is 50MB',
                    variant: 'destructive',
                });
                return;
            }
            setFile(uploadedFile);
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

    const onSubmit = async (data: FileUploadFormData) => {
        if (!file) {
            toast({
                title: 'Missing file',
                description: 'Please upload a file',
                variant: 'destructive',
            });
            return;
        }

        // TODO: Implement blockchain upload logic
        console.log('Form data:', { ...data, file });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload a File</h1>
                    <p className="text-gray-600">
                        Share templates, guides, or other downloadable content with your audience.
                    </p>
                </div>

                <Card className="p-6 mb-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* File Upload Section */}
                        <div>
                            <Label>Upload File</Label>
                            <FileUploader onUpload={handleFileUpload} className="mt-1" />
                            {file && (
                                <p className="mt-2 text-sm text-gray-600">
                                    Selected file: {file.name}
                                </p>
                            )}
                        </div>

                        {/* Title Field */}
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                {...register('title')}
                                placeholder="Enter your file title"
                                className="mt-1"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                            )}
                        </div>

                        {/* File Type Selection */}
                        <div>
                            <Label htmlFor="fileType">File Type</Label>
                            <select
                                id="fileType"
                                {...register('fileType')}
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option value="">Select a file type</option>
                                {FILE_TYPES.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                            {errors.fileType && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.fileType.message}
                                </p>
                            )}
                        </div>

                        {/* Description Field */}
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                {...register('description')}
                                placeholder="Describe your file and its contents"
                                className="mt-1"
                                rows={4}
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Tags Input */}
                        <div>
                            <Label>Tags</Label>
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
                                    This is a paid file
                                </label>
                            </div>

                            {isPaid && (
                                <div>
                                    <Label htmlFor="price">Price (SOL)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        {...register('price', { valueAsNumber: true })}
                                        placeholder="0.00"
                                        className="mt-1"
                                    />
                                    {errors.price && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.price.message}
                                        </p>
                                    )}
                                </div>
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
                            <Button type="submit">Publish File</Button>
                        </div>

                        {/* Preview Section */}
                        {previewMode && (
                            <div className="border rounded-lg p-6 bg-gray-50">
                                <h3 className="text-lg font-semibold mb-4">Preview</h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-gray-700">Title</h4>
                                        <p>{watch('title')}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-700">File Type</h4>
                                        <p>
                                            {FILE_TYPES.find(
                                                (type) => type.value === watch('fileType')
                                            )?.label || 'Not selected'}
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-700">Description</h4>
                                        <p>{watch('description')}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-700">Tags</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-700">Price</h4>
                                        <p>{isPaid ? `${watch('price')} SOL` : 'Free'}</p>
                                    </div>
                                    {file && (
                                        <div>
                                            <h4 className="font-medium text-gray-700">File</h4>
                                            <p>{file.name}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </form>
                </Card>
            </div>
        </div>
    );
}
