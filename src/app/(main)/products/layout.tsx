import PageWrapper from "@/shared/components/layout/blocks/PageWrapper";
import type { ReactNode } from "react";

export default function ProductLayout({ children }: { children: ReactNode }) {
  return <PageWrapper className="">{children}</PageWrapper>;
}
