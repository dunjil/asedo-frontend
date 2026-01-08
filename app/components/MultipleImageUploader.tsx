'use client';

import { useState, useRef, useEffect } from 'react';

interface MultipleImageUploaderProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxImages?: number;
}

export default function MultipleImageUploader({
  files,
  onChange,
  maxImages = 20,
}: MultipleImageUploaderProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate preview URLs when files change
  useEffect(() => {
    if (files.length === 0) {
      setPreviews([]);
      return;
    }

    // Create preview URLs using FileReader for better compatibility
    const previewPromises = files.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          console.log('Image data URL created for:', file.name, file.type, file.size);
          resolve(reader.result as string);
        };
        reader.onerror = () => {
          console.error('Failed to read file:', file.name);
          resolve(''); // Return empty string on error
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previewPromises).then(newPreviews => {
      console.log('All preview URLs created:', newPreviews.length);
      setPreviews(newPreviews);
    });
  }, [files]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    const remainingSlots = maxImages - files.length;
    if (selectedFiles.length > remainingSlots) {
      alert(`You can only add ${remainingSlots} more image(s). Maximum is ${maxImages} images.`);
      return;
    }

    onChange([...files, ...selectedFiles]);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newFiles = [...files];
    const draggedItem = newFiles[draggedIndex];
    newFiles.splice(draggedIndex, 1);
    newFiles.splice(index, 0, draggedItem);

    onChange(newFiles);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newFiles = [...files];
    [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]];
    onChange(newFiles);
  };

  const moveDown = (index: number) => {
    if (index === files.length - 1) return;
    const newFiles = [...files];
    [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
    onChange(newFiles);
  };

  // Handle drag-and-drop file upload
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    if (droppedFiles.length === 0) return;

    const remainingSlots = maxImages - files.length;
    if (droppedFiles.length > remainingSlots) {
      alert(`You can only add ${remainingSlots} more image(s). Maximum is ${maxImages} images.`);
      return;
    }

    onChange([...files, ...droppedFiles]);
  };

  const handleFileDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(true);
  };

  const handleFileDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Project Images ({files.length}/{maxImages})
        </label>
        {files.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
          >
            + Add Images
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {files.length === 0 ? (
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${isDraggingFile
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-white'
            }`}
          onDrop={handleFileDrop}
          onDragOver={handleFileDragOver}
          onDragLeave={handleFileDragLeave}
        >
          <svg
            className={`mx-auto h-12 w-12 ${isDraggingFile ? 'text-blue-500' : 'text-gray-400'}`}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className={`mt-2 text-sm ${isDraggingFile ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
            {isDraggingFile ? 'Drop images here' : 'No images selected yet'}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Drag and drop images here, or
          </p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 text-sm text-blue-500 hover:text-blue-600 font-medium"
          >
            click to browse
          </button>
        </div>
      ) : (
        <div
          className={`relative ${files.length < maxImages ? 'pb-20' : ''}`}
          onDrop={handleFileDrop}
          onDragOver={handleFileDragOver}
          onDragLeave={handleFileDragLeave}
        >
          {files.length < maxImages && isDraggingFile && (
            <div className="absolute inset-0 border-4 border-dashed border-blue-500 bg-blue-50 bg-opacity-90 rounded-lg flex items-center justify-center z-10 pointer-events-none">
              <p className="text-blue-600 font-medium text-lg">Drop images to add them</p>
            </div>
          )}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {previews.map((preview, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`relative group border-2 rounded-lg overflow-hidden cursor-move ${draggedIndex === index ? 'border-blue-500 opacity-50' : 'border-gray-300'
                  }`}
              >
                <div className="aspect-square relative" style={{ backgroundColor: '#f3f4f6' }}>
                  {preview ? (
                    <>
                      <img
                        src={preview}
                        alt={`Image ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          filter: 'none !important',
                          mixBlendMode: 'normal',
                          imageRendering: 'auto'
                        }}
                        onLoad={(e) => {
                          console.log('Image loaded successfully:', {
                            index,
                            width: e.currentTarget.naturalWidth,
                            height: e.currentTarget.naturalHeight,
                            previewLength: preview.length,
                            previewStart: preview.substring(0, 50)
                          });
                        }}
                        onError={(e) => {
                          console.error('Image failed to load:', {
                            index,
                            previewLength: preview.length,
                            previewStart: preview.substring(0, 100),
                            error: e
                          });
                        }}
                      />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-500 text-xs">Loading...</span>
                    </div>
                  )}
                </div>

                {/* Overlay controls */}
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/50 transition-all flex items-center justify-center gap-2 pointer-events-none" style={{ zIndex: 10 }}>
                  <button
                    type="button"
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="opacity-0 group-hover:opacity-100 bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 pointer-events-auto"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(index)}
                    disabled={index === files.length - 1}
                    className="opacity-0 group-hover:opacity-100 bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 pointer-events-auto"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 pointer-events-auto"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>

                {/* Position indicator */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="mt-2 text-xs text-gray-500">
        {files.length === 0
          ? 'Drag and drop images or click to browse. Maximum 20 images. Images will be uploaded when you create the project.'
          : `Drag images to reorder, or drag new images anywhere to add them. The first image will be the main image. Images will be uploaded when you create the project.`}
      </p>
    </div>
  );
}
