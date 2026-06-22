import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { H1 } from "./Typography";

export default function PageHeading({ children, className }: { children: ReactNode; className?: string }) {
  return <H1 className={twMerge("", className)}>{children}</H1>;
}
