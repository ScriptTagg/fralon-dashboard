// modules/products/components/ImageDropzone.tsx
"use client";

import { useEffect, useRef } from "react";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/shared/components/dropzone";
import { useSupabaseUpload } from "@/shared/hooks/use-supabase-upload";

interface ImageDropzoneProps {
  productId: string;
  onSuccess: (storagePaths: string[]) => void;
}

export default function ImageDropzone({ productId, onSuccess }: ImageDropzoneProps) {
  const uploadProps = useSupabaseUpload({
    bucketName: "products",
    path: productId, // files land at products/{productId}/{filename}
    allowedMimeTypes: ["image/*"],
    maxFiles: 10,
    maxFileSize: 5 * 1000 * 1000, // 5MB
  });

  // track previously seen successes so we only fire onSuccess for new ones
  const prevCountRef = useRef(0);

  useEffect(() => {
    const successes: string[] = uploadProps.successes ?? [];
    if (successes.length > prevCountRef.current) {
      const newPaths = successes.slice(prevCountRef.current).map((filename) => `${productId}/${filename}`);
      onSuccess(newPaths);
      prevCountRef.current = successes.length;
    }
  }, [uploadProps.successes, productId, onSuccess]);

  return (
    <Dropzone {...uploadProps}>
      <DropzoneEmptyState />
      <DropzoneContent />
    </Dropzone>
  );
}
