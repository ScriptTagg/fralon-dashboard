import FullScreenLoader from "@/shared/components/layout/blocks/FullScreenLoader";
import { useGetProducts } from "../hooks/products/useGetProducts";
import { columns } from "../components/products-table/columns";
import { DataTable } from "../components/products-table/data-table";
import NavButton from "@/shared/components/shared/NavButton";
import { PlusIcon } from "lucide-react";
import PageWrapper from "@/shared/components/layout/blocks/PageWrapper";
import PageHeading from "@/shared/components/layout/typography/PageHeading";

export default function ProductsPage() {
  const { data, isFetching } = useGetProducts();
  if (isFetching || !data) return <FullScreenLoader />;
  return (
    <PageWrapper>
      <PageHeading>Products</PageHeading>
      <div className="space-y-4">
        <div className="w-full">
          <NavButton variant="secondary" path="/products/new" className=" py-2 px-3">
            <PlusIcon /> Add Product
          </NavButton>
        </div>
        <DataTable data={data} columns={columns} />
      </div>
    </PageWrapper>
  );
}
