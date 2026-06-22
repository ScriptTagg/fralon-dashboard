"use client";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/shared/components/dropzone";
import { useSupabaseUpload } from "@/shared/hooks/use-supabase-upload";

export default function ImageUpload() {
  const props = useSupabaseUpload({
    bucketName: "test",
    path: "test",
    allowedMimeTypes: ["image/*"],
    maxFiles: 5,
    maxFileSize: 1000 * 1000 * 5, // 10MB,
  });
  return (
    <div className="">
      <Dropzone {...props}>
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
    </div>
  );
}
