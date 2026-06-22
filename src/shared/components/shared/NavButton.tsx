"use client";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { Button, type buttonVariants } from "../ui/button";

type NavButtonProps = {
  children: ReactNode;
  path: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  className?: string;
};

export default function NavButton({ children, path, variant, className }: NavButtonProps) {
  const router = useRouter();
  return (
    <Button variant={variant} onClick={() => router.push(path)} className={twMerge("", className)}>
      {children}
    </Button>
  );
}
