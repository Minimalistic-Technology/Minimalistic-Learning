"use client";

import { Camera } from "lucide-react";
import { ChangeEvent } from "react";

interface Props {
  imagePreview: string;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

export const ImageUpload = ({ imagePreview, onImageChange, onClear }: Props) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      <Camera className="inline mr-2 h-4 w-4" />
      Featured Image
    </label>
    <div className="mt-1 border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
      {imagePreview ? (
        <div className="relative">
          <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded" />
          <button
            type="button"
            onClick={onClear}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
          >
            ×
          </button>
        </div>
      ) : (
        <>
          <Camera className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-1 text-sm text-gray-500">
            Drag and drop an image or click to browse
          </p>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={onImageChange}
        className="mt-4 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
    </div>
  </div>
);