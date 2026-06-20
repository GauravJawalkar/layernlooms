"use client";

import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, X, Loader2, FolderOpen } from "lucide-react";
import { uploadToCloudinary } from "../../lib/admin/cloudinary";

interface Props {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

export default function CloudinaryUpload({ value, onChange, folder = "layernlooms/services" }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed");
      return;
    }

    setUploading(true);
    setError("");
    try {
      const url = await uploadToCloudinary(file, folder);
      onChange(url);
    } catch (err: any) {
      setError(err?.message || "Upload failed");
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-textMuted mb-1">
        <FolderOpen className="w-3 h-3" />
        {folder}/
      </div>
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste image URL or upload..."
            className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <div className="shrink-0">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
            id="cloudinary-upload"
          />
          <label
            htmlFor="cloudinary-upload"
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all ${
              uploading
                ? "bg-secondary text-textMuted pointer-events-none"
                : "bg-primary text-background hover:opacity-90"
            }`}
          >
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            {uploading ? "Uploading..." : "Upload"}
          </label>
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}

      {value && (
        <div className="relative inline-block group">
          <img
            src={value}
            alt="Preview"
            className="h-24 w-auto rounded-xl border border-border object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
