import { useRef, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  accept?: string;
  multiple?: boolean;
  onUpload: (files: FileList) => void;
  isLoading?: boolean;
  className?: string;
}

export function FileUploader({
  accept,
  multiple = false,
  onUpload,
  isLoading = false,
  className,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
    }
  };

  return (
    <div
      className={cn(
        'relative rounded-lg border-2 border-dashed p-6 transition-colors',
        isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-gray-400',
        isLoading && 'opacity-50 cursor-not-allowed',
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        disabled={isLoading}
      />
      
      <div className="flex flex-col items-center justify-center space-y-2 text-center">
        <div className="rounded-full bg-purple-100 p-3">
          <FiUpload className="h-6 w-6 text-purple-600" />
        </div>
        <div className="text-sm">
          <span className="font-medium text-purple-600">Click to upload</span>
          {' or drag and drop'}
        </div>
        {accept && (
          <p className="text-xs text-gray-500">
            {accept.split(',').join(', ')} files only
          </p>
        )}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
          </div>
        )}
      </div>
    </div>
  );
} 