import { H4 } from "../typography/Typography";
import SectionWrapper from "./SectionWrapper";

export default function FullScreenLoader() {
  return (
    <SectionWrapper className="flex items-center justify-center flex-col flex-1">
      <H4 className="">Loading...</H4>
    </SectionWrapper>
  );
}
