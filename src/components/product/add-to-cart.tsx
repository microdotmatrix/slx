"use client";

import { Icon } from "../ui/icon";
import { addItem } from "@/lib/shopify/actions";
import { ProductVariant } from "@shopify/hydrogen-react/storefront-api-types";
import { useSearchParams } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

const AddButton = ({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) => {
  const { pending } = useFormStatus();
  const classNames = "text-lg tracking-tight uppercase";

  if (!availableForSale) {
    return (
      <Button aria-disabled="true" variant="outline" className={classNames}>
        Out Of Stock
      </Button>
    );
  }

  if (!selectedVariantId) {
    return (
      <Button aria-disabled="true" variant="outline" className={classNames}>
        <Icon icon="carbon:chevron-up" className="mr-2" /> Select Options
      </Button>
    );
  }

  return (
    <Button
      variant="default"
      type="submit"
      className={classNames}
      aria-disabled={pending}
    >
      {pending ? (
        <Icon icon="svg-spinners:3-dots-fade" className="mr-2" />
      ) : (
        <Icon icon="carbon:add" className="mr-2" />
      )}{" "}
      Add to Cart
    </Button>
  );
};

export function AddToCart({
  variants,
  availableForSale,
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
}) {
  const [message, formAction] = useFormState(addItem, null);
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    ),
  );
  const selectedVariantId = variant?.id || (defaultVariantId as string);
  const actionWithVariant = formAction.bind(null, selectedVariantId);

  return (
    <>
      <form action={actionWithVariant}>
        <AddButton
          availableForSale={availableForSale}
          selectedVariantId={selectedVariantId}
        />
        <p aria-live="polite" className="sr-only" role="status">
          {message}
        </p>
      </form>
    </>
  );
}
