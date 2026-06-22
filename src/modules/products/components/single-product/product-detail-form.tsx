/* "use client";
import { useGetCategories } from "@/modules/categories/hooks/use-get-categories";
import { useGetSingleProduct } from "../../hooks/useGetSingleProduct";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/shared/components/ui/field";
import { Activity, useEffect, useState } from "react";
import FormError from "@/shared/components/shared/FormError";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Switch } from "@/shared/components/ui/switch";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { newProductSchema, type NewProductInput } from "../../schemas/new-product.schema";
import type { Product } from "../../products.types";
import type { ProductWithRelations } from "../../products.repository";
import { PencilIcon, Save } from "lucide-react";

export default function ProductDetailForm({ product }: { product: ProductWithRelations }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { data: categories, isFetching } = useGetCategories();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, dirtyFields, isDirty },
  } = useForm<NewProductInput>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      name: product.name,
      category_id: product.category_id ?? undefined,
      is_active: true,
      description: product.description ?? "",
    },
  });
  let isPending = false;

  useEffect(() => {
    if (product) {
      reset({
        category_id: product.category_id ?? undefined,
        is_active: product.is_active,
        name: product.name,
        description: product.description ?? "",
      });
    }
  }, [reset, product]);

  const handleUpdateProduct: SubmitHandler<NewProductInput> = async (data) => {
    const updates = Object.keys(dirtyFields).reduce((acc, key) => {
      acc[key as keyof NewProductInput] = data[key as keyof NewProductInput];
      return acc;
    }, {} as Partial<NewProductInput>);

    try {
      const newProfile = await mutateAsync(updates);
      reset({
        full_name: newProfile.full_name,
        email: newProfile.email,
        phone: newProfile.phone ?? "",
      });
      setIsEditing(false);
    } catch (err) {
      console.log("updating error :", err);
    } 
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateProduct)} className="max-w-135 mx-0 space-y-4">
      <FieldSet className="gap-4">
        <div className="flex items-center gap-2 ml-auto">
          <Button type="button" onClick={() => setIsEditing(true)} size="sm" variant="ghost">
            <PencilIcon />
            Edit
          </Button>
          <Button type="submit" disabled={!isDirty || !isEditing} size="sm">
            <Save />
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
        <div className="">
          <FieldLegend className="sr-only">Add new product</FieldLegend>
          <FieldDescription className="sr-only">Please fill the product info.</FieldDescription>
        </div>
        <Activity mode={errors.root ? "visible" : "hidden"}>
          <FormError>{errors.root?.message}</FormError>
        </Activity>
        <FieldGroup className="gap-4 grid grid-cols-1 sm:grid-cols-2">
          <Field className="sm:col-span-2">
            <FieldLabel htmlFor="name">Product name</FieldLabel>
            <Input disabled={isPending || !isEditing} id="name" type="text" {...register("name")} />
            {errors.name && <FieldError>{errors.name.message}</FieldError>}
          </Field>

          <Controller
            name="category_id"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <Field data-invalid={fieldState.invalid} className="sm:col-span-1">
                  <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                  <Select
                    disabled={isPending || !isEditing}
                    name={field.name}
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger id={field.name} aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder={isFetching ? "Loading..." : "Select category"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              );
            }}
          />

          <Controller
            name="is_active"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                orientation="horizontal"
                className="sm:col-span-1 flex-col items-start"
              >
                <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                <div className="flex items-center gap-4 border border-border rounded-md px-3 py-2 w-full">
                  <Switch
                    id={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isPending || !isEditing}
                  />
                  <span className="">{field.value === true ? "Active" : "In active"}</span>
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Field className="sm:col-span-2">
            <FieldLabel htmlFor="description">Description (optional)</FieldLabel>
            <Textarea
              disabled={isPending || !isEditing}
              id="description"
              placeholder="Add a short description"
              {...register("description")}
            />
            {errors.description && <FieldError>{errors.description.message}</FieldError>}
          </Field>
        </FieldGroup>

         <ImageUpload />
        <div className="w-full flex items-end justify-center">
          <Button type="submit" disabled={isPending} className="ml-auto mt-2">
            {isPending ? "Creating..." : "Create Product"}
          </Button>
        </div>
      </FieldSet>
    </form>
  );
}
 */
