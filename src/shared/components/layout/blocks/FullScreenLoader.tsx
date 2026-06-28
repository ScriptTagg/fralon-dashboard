import FullPageLoader from "@/shared/icons/full-page-loader";
import SectionWrapper from "./SectionWrapper";

export default function FullScreenLoader() {
  return (
    <SectionWrapper className="flex items-center justify-center flex-col min-h-[75vh] flex-1 h-full">
      <FullPageLoader />
    </SectionWrapper>
  );
}
