import PageWrapper from "@/shared/components/layout/blocks/PageWrapper";
import SectionWrapper from "@/shared/components/layout/blocks/SectionWrapper";
import SectionHeading from "@/shared/components/layout/typography/SectionHeading";
import { P } from "@/shared/components/layout/typography/Typography";
import Link from "next/link";

export default function NotFound() {
  return (
    <PageWrapper>
      <SectionWrapper className="text-center">
        <SectionHeading className="text-destructive">404</SectionHeading>
        <P className="my-2">Page you are looking for does not exist</P>
        <Link href="/" className="font-medium hover:scale-105 active:scale-95 duration-300 ease-in-out underline p-1">
          Go to Homepage
        </Link>
      </SectionWrapper>
    </PageWrapper>
  );
}
