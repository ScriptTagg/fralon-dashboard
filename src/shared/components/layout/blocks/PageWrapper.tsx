import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export default function PageWrapper({ children, className }: SectionProps) {
  return <section className={twMerge("flex flex-col flex-1 gap-10 px-4 md:px-6", className)}>{children}</section>;
}
