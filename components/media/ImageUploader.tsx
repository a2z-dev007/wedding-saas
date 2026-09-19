"use client";

import { useState, useRef } from "react";
import { UploadSimple, X, Image as ImageIcon, Spinner, CheckCircle } from "@phosphor-icons/react";

interface ImageUploaderProps {
  onImageUploaded?: (url: string) => void;
  onUploadSuccess?: (url: string) => void;
  currentImage?: string;
  initialUrl?: string;
  folder?: string;
  label?: string;
}

export function ImageUploader({
  onImageUploaded,
  onUploadSuccess,
  currentImage,
  initialUrl,
  folder = "wedding-saas/couple",
  label = "Upload Couple Photo",
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(initialUrl || currentImage || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      setError("Image must be smaller than 8MB");
      return;
    }

    setError(null);
    setUploading(true);

    // Show instant local preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to server API -> Cloudinary
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Upload failed");
      }

      setPreview(data.url);
      onImageUploaded?.(data.url);
      onUploadSuccess?.(data.url);
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError(err.message || "Failed to upload photo");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageUploaded?.("");
    onUploadSuccess?.("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
        {label}
      </label>

      {preview ? (
        <div className="relative w-full aspect-[16/9] max-w-sm rounded-xl overflow-hidden border border-amber-500/30 bg-stone-900 shadow-md">
          <img
            src={preview}
            alt="Uploaded Preview"
            className="w-full h-full object-cover"
          />
          {uploading && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-amber-300 gap-2">
              <Spinner className="animate-spin" size={24} />
              <span className="text-xs font-medium">Optimizing on Cloudinary...</span>
            </div>
          )}
          {!uploading && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-rose-600 transition"
              title="Remove photo"
            >
              <X size={14} weight="bold" />
            </button>
          )}
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full aspect-[16/9] max-w-sm rounded-xl border-2 border-dashed border-amber-500/30 hover:border-amber-400 bg-stone-900/60 hover:bg-stone-900 transition flex flex-col items-center justify-center cursor-pointer p-4 text-center group"
        >
          <div className="p-3 rounded-full bg-amber-500/10 text-amber-400 group-hover:scale-110 transition mb-2">
            <UploadSimple size={22} weight="bold" />
          </div>
          <span className="text-xs font-semibold text-stone-200">
            Click to upload or take photo
          </span>
          <span className="text-[10px] text-stone-400 mt-0.5">
            PNG, JPG, WebP · 1080 × 1920 px (9:16) · Max 8MB
          </span>
        </div>
      )}

      {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
