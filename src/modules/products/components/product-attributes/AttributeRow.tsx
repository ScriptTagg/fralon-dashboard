// modules/products/components/AttributeRow.tsx
import { Trash2 } from "lucide-react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { Field, FieldError } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import type { AttributesFormValues } from "../../schemas/product-attributes.schema";

interface AttributeRowProps {
  index: number;
  register: UseFormRegister<AttributesFormValues>;
  errors: FieldErrors<AttributesFormValues>;
  onRemove: () => void;
  isPending: boolean;
}

export default function AttributeRow({ index, register, errors, onRemove, isPending }: AttributeRowProps) {
  const keyError = errors.attributes?.[index]?.key;
  const valueError = errors.attributes?.[index]?.value;

  return (
    <div className="grid grid-cols-[1fr_1.5fr_32px] gap-2 items-start">
      <Field>
        <Input placeholder="e.g. Allergens" disabled={isPending} {...register(`attributes.${index}.key`)} />
        {keyError && <FieldError>{keyError.message}</FieldError>}
      </Field>

      <Field>
        <Input placeholder="e.g. Peanuts, tree nuts" disabled={isPending} {...register(`attributes.${index}.value`)} />
        {valueError && <FieldError>{valueError.message}</FieldError>}
      </Field>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-8 mt-0.5 text-muted-foreground hover:text-destructive"
        onClick={onRemove}
        disabled={isPending}
      >
        <Trash2 className="h-3.5 w-3.5" />
        <span className="sr-only">Remove attribute</span>
      </Button>
    </div>
  );
}
