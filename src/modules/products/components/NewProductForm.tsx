"use client";
import FormError from "@/shared/components/shared/FormError";
import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Activity } from "react";
import { newProductSchema, type NewProductInput } from "../schemas/new-product.schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useCreateProduct } from "../hooks/products/use-create-product";
import { useGetCategories } from "@/modules/categories/hooks/use-get-categories";
import { Switch } from "@/shared/components/ui/switch";

export default function NewProductForm() {
  const { mutateAsync, isPending } = useCreateProduct();
  const { data: categories, isFetching } = useGetCategories();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewProductInput>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      name: "",
      category_id: "",
      is_active: true,
      description: undefined,
    },
  });

  const handleCreateNewProduct: SubmitHandler<NewProductInput> = async (data) => {
    console.log("Product data:", data);
    try {
      const res = await mutateAsync(data);
      console.log("product response:", res);
    } catch (error) {
      console.log("create product error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCreateNewProduct)} className="max-w-135 mx-0 space-y-4">
      <FieldSet className="gap-6">
        <div className="">
          <FieldLegend className="">Add new product</FieldLegend>
          <FieldDescription>Please fill the product info.</FieldDescription>
        </div>
        <Activity mode={errors.root ? "visible" : "hidden"}>
          <FormError>{errors.root?.message}</FormError>
        </Activity>
        <FieldGroup className="gap-4 grid grid-cols-1 sm:grid-cols-2">
          <Field className="sm:col-span-2">
            <FieldLabel htmlFor="name">Product name</FieldLabel>
            <Input disabled={isPending} id="name" type="text" {...register("name")} />
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
                    disabled={isPending}
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
                  <Switch id={field.name} checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
                  <span className="">{field.value === true ? "Active" : "In active"}</span>
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Field className="sm:col-span-2">
            <FieldLabel htmlFor="description">Description (optional)</FieldLabel>
            <Textarea
              disabled={isPending}
              id="description"
              placeholder="Add a short description"
              {...register("description")}
            />
            {errors.description && <FieldError>{errors.description.message}</FieldError>}
          </Field>
        </FieldGroup>

        {/*  <ImageUpload /> */}
        <div className="w-full flex items-end justify-center">
          <Button type="submit" disabled={isPending} className="ml-auto mt-2">
            {isPending ? "Creating..." : "Create Product"}
          </Button>
        </div>
      </FieldSet>
    </form>
  );
}
