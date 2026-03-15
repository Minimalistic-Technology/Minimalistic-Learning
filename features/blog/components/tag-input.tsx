"use client";

import { Tag } from "lucide-react";
import { ChangeEvent, KeyboardEvent } from "react";

interface Props {
  tags: string[];
  currentTag: string;
  onCurrentTagChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTagAdd: () => void;
  onTagRemove: (tag: string) => void;
}

export const TagInput = ({ tags, currentTag, onCurrentTagChange, onTagAdd, onTagRemove }: Props) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      <Tag className="inline mr-2 h-4 w-4" />
      Tags
    </label>
    <div className="flex items-center">
      <input
        type="text"
        value={currentTag}
        onChange={onCurrentTagChange}
        placeholder="Add a tag"
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onTagAdd();
          }
        }}
        className="flex-grow px-4 py-2 rounded-l-xl bg-white text-black border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
      <button
        type="button"
        onClick={onTagAdd}
        className="px-4 py-2 bg-blue-600 text-white rounded-r-xl hover:bg-blue-700 transition"
      >
        Add
      </button>
    </div>
    {tags.length > 0 && (
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag, index) => (
          <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
            {tag}
            <button
              type="button"
              onClick={() => onTagRemove(tag)}
              className="ml-1 text-blue-600 hover:text-blue-800"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    )}
  </div>
);