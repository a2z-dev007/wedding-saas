"use client";

import { useState, useRef } from "react";
import { UploadSimple, X, Image as ImageIcon, Spinner, Plus, CheckCircle } from "@phosphor-icons/react";

interface MultiImageUploaderProps {
  images: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
  label?: string;
  folder?: string;
}

export function MultiImageUploader({
  images = [],
  onChange,
  maxImages = 6,
  label = "Gallery & Memories Photos",
  folder = "wedding-saas/gallery",
}: MultiImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (images.length + files.length > maxImages) {
      setError(`You can upload a maximum of ${maxImages} gallery photos.`);
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const newUploadedUrls: string[] = [];

      for (const file of files) {
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`File ${file.name} is larger than 10MB.`);
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok || !data.url) {
          throw new Error(data.error || "Image upload failed");
        }

        newUploadedUrls.push(data.url);
      }

      const updated = [...images, ...newUploadedUrls];
      onChange(updated);
    } catch (err: any) {
      console.error("Multi upload error:", err);
      setError(err.message || "Failed to upload one or more images.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
          {label} ({images.length}/{maxImages})
        </label>
        {images.length > 0 && (
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle size={13} weight="fill" />
            {images.length} photo{images.length > 1 ? "s" : ""} added
          </span>
        )}
      </div>

      {error && (
        <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
          {error}
        </div>
      )}

      {/* Grid of uploaded thumbnails + Add button */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((url, idx) => (
          <div
            key={idx}
            className="relative aspect-square rounded-xl overflow-hidden border-2 border-stone-200 bg-stone-100 group shadow-xs"
          >
            <img
              src={url}
              alt={`Gallery photo ${idx + 1}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(idx)}
              className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-stone-900/80 hover:bg-red-600 text-white flex items-center justify-center transition-all shadow-md"
              title="Remove photo"
            >
              <X size={12} weight="bold" />
            </button>
            <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-bold">
              #{idx + 1}
            </div>
          </div>
        ))}

        {/* Add photo trigger tile (if under max) */}
        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="aspect-square rounded-xl border-2 border-dashed border-stone-300 hover:border-amber-500 bg-stone-50 hover:bg-amber-50/50 text-stone-500 hover:text-amber-700 flex flex-col items-center justify-center p-3 transition-all cursor-pointer group"
          >
            {uploading ? (
              <>
                <Spinner size={24} className="animate-spin text-amber-600 mb-1" />
                <span className="text-[10px] font-bold uppercase">Uploading...</span>
              </>
            ) : (
              <>
                <div className="h-8 w-8 rounded-full bg-white group-hover:bg-amber-100 flex items-center justify-center text-stone-600 group-hover:text-amber-700 mb-1 shadow-xs border border-stone-200">
                  <Plus size={16} weight="bold" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider">Add Photo</span>
                <span className="text-[9px] text-stone-400">PNG, JPG, WebP</span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesSelected}
        className="hidden"
      />
    </div>
  );
}
