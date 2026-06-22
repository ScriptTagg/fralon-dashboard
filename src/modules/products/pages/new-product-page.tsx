import PageWrapper from "@/shared/components/layout/blocks/PageWrapper";
import PageHeading from "@/shared/components/layout/typography/PageHeading";
import NewProductForm from "../components/NewProductForm";

export default function NewProductPage() {
  return (
    <PageWrapper>
      <PageHeading>Add New Product</PageHeading>
      <NewProductForm />
    </PageWrapper>
  );
}
