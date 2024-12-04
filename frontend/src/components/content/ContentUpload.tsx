import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useCreateContentMutation } from '@/api/endpoints/content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Select, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/Textarea';
import type { ContentType } from '@/types/content';
import { toast } from '../ui/use-toast';
import { Label } from '@/components/ui/Label';

export function ContentUpload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('0');
  const [type, setType] = useState<ContentType>('article');
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

      // Create the content request object
      const contentRequest = {
        title,
        description,
        type,
        price: parseFloat(price),
        currency: 'USDC',
        file,
        thumbnail: thumbnail || undefined,
      };

      // Append all fields to FormData
      Object.entries(contentRequest).forEach(([key, value]) => {
        if (value !== undefined) {
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      await createContent(formData).unwrap();
      
      toast({
        title: "Success",
        description: "Content uploaded successfully",
        variant: "default",
      });

      // Reset form
      setTitle('');
      setDescription('');
      setType('article');
      setPrice('0');
      setFile(null);
      setThumbnail(null);

    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to upload content",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Content Type</Label>
          <Select value={type} onValueChange={(value: string) => setType(value as ContentType)}>
            <SelectItem value="article">Article</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="file">File</SelectItem>
            <SelectItem value="course">Course</SelectItem>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (USDC)</Label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>

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
        className={isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      >
        {isLoading ? 'Uploading...' : 'Upload Content'}
      </Button>
    </form>
  );
} 