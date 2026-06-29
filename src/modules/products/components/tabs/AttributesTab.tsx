// modules/products/components/tabs/AttributesTab.tsx
"use client";

import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import {
  attributesFormSchema,
  toFormAttributes,
  toRecordAttributes,
  type AttributesFormValues,
} from "../../schemas/product-attributes.schema";
import { Button } from "@/shared/components/ui/button";
import FormError from "@/shared/components/shared/FormError";
import type { ProductWithRelations } from "../../repository/products.repository";
import { useUpdateAttributes } from "../../hooks/products/use-update-attributes";
import AttributeRow from "../product-attributes/AttributeRow";

interface AttributesTabProps {
  product: ProductWithRelations;
}

export default function AttributesTab({ product }: AttributesTabProps) {
  const { mutateAsync, isPending } = useUpdateAttributes(product.id);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isDirty },
  } = useForm<AttributesFormValues>({
    resolver: zodResolver(attributesFormSchema),
    defaultValues: {
      attributes: toFormAttributes(product.metadata),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  const onSubmit: SubmitHandler<AttributesFormValues> = async ({ attributes }) => {
    try {
      await mutateAsync(toRecordAttributes(attributes));
    } catch {
      setError("root", {
        message: "Failed to save attributes. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4 max-w-full">
      {/* ── Header ── */}
      <div>
        <h3 className="text-sm font-medium">Attributes</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Custom details for this product — allergens, certifications, materials, shelf life. These appear on the
          storefront product page.
        </p>
      </div>

      {errors.root && <FormError>{errors.root.message}</FormError>}

      {/* ── Column headers ── */}
      {fields.length > 0 && (
        <div className="grid grid-cols-[1fr_1.5fr_32px] gap-2 px-0.5">
          <span className="text-xs text-muted-foreground">Key</span>
          <span className="text-xs text-muted-foreground">Value</span>
          <span />
        </div>
      )}

      {/* ── Attribute rows ── */}
      <div className="space-y-2">
        {fields.map((field, index) => (
          <AttributeRow
            key={field.id}
            index={index}
            register={register}
            errors={errors}
            onRemove={() => remove(index)}
            isPending={isPending}
          />
        ))}
      </div>

      {/* ── Empty state ── */}
      {fields.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-10 text-center">
          <p className="text-sm font-medium">No attributes yet</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">
            Add custom key-value details specific to this product — allergens, certifications, materials, and so on.
          </p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mt-4"
            onClick={() => append({ key: "", value: "" })}
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add first attribute
          </Button>
        </div>
      )}

      {/* ── Footer actions ── */}
      {fields.length > 0 && (
        <div className="flex items-center justify-between pt-2 border-t">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ key: "", value: "" })}
            disabled={isPending}
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add attribute
          </Button>

          <Button type="submit" size="sm" disabled={isPending || !isDirty}>
            {isPending ? "Saving..." : "Save attributes"}
          </Button>
        </div>
      )}
    </form>
  );
}
