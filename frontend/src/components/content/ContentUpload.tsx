import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useCreateContentMutation } from '@/api';
import { toast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import type { ContentType } from '@/types/content';

export function ContentUpload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('0');
  const [type, setType] = useState<ContentType>('article');
  const [categories, setCategories] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const [createContent, { isLoading }] = useCreateContentMutation();

  const { getRootProps: getFileProps, getInputProps: getFileInputProps } = useDropzone({
    onDrop: (files) => setFile(files[0]),
    maxFiles: 1
  });

  const { getRootProps: getThumbnailProps, getInputProps: getThumbnailInputProps } = useDropzone({
    onDrop: (files) => setThumbnail(files[0]),
    maxFiles: 1,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('type', type);
      formData.append('price', price);
      formData.append('currency', 'USDC');
      formData.append('file', file);
      if (thumbnail) formData.append('thumbnail', thumbnail);
      formData.append('categories', JSON.stringify(categories));

      const result = await createContent(formData).unwrap();
      
      toast({
        title: "Success",
        description: "Content uploaded successfully",
      });

      // Reset form
      setTitle('');
      setDescription('');
      setPrice('0');
      setType('article');
      setCategories([]);
      setFile(null);
      setThumbnail(null);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload content",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form fields */}
      <div className="space-y-4">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <Select
          label="Content Type"
          value={type}
          onChange={(value) => setType(value as ContentType)}
          options={[
            { label: 'Article', value: 'article' },
            { label: 'Video', value: 'video' },
            { label: 'E-Book', value: 'ebook' },
            { label: 'Research Paper', value: 'research_paper' },
            { label: 'File', value: 'file' }
          ]}
        />

        <Input
          type="number"
          label="Price (USDC)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          step="0.01"
        />

        {/* File Upload */}
        <div {...getFileProps()} className="border-2 border-dashed p-6 text-center rounded-lg">
          <input {...getFileInputProps()} />
          <p>Drag and drop your content file here, or click to select</p>
          {file && <p className="mt-2 text-sm text-gray-600">{file.name}</p>}
        </div>

        {/* Thumbnail Upload */}
        <div {...getThumbnailProps()} className="border-2 border-dashed p-6 text-center rounded-lg">
          <input {...getThumbnailInputProps()} />
          <p>Drag and drop a thumbnail image, or click to select</p>
          {thumbnail && <p className="mt-2 text-sm text-gray-600">{thumbnail.name}</p>}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading || !file}
        loading={isLoading}
      >
        {isLoading ? 'Uploading...' : 'Upload Content'}
      </Button>
    </form>
  );
} 