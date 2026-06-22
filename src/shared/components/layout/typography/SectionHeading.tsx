import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { H2 } from "./Typography";

export default function SectionHeading({ children, className }: { children: ReactNode; className?: string }) {
  return <H2 className={twMerge("capitalize", className)}>{children}</H2>;
}
