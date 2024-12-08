import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploaderProps {
    accept: string;
    onUpload: (files: FileList) => void;
    children?: React.ReactNode;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ accept, onUpload, children }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const dataTransfer = new DataTransfer();
        acceptedFiles.forEach(file => dataTransfer.items.add(file));
        onUpload(dataTransfer.files);
    }, [onUpload]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: accept ? { [accept]: [] } : undefined,
        multiple: false
    });

    return (
        <div {...getRootProps()} className="cursor-pointer">
            <input {...getInputProps()} />
            {children}
        </div>
    );
};
