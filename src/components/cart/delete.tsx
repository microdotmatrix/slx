"use client";

import { useFormState, useFormStatus } from "react-dom";

import clsx from "clsx";
import { removeItem } from "@/lib/shopify/actions";
import { Icon } from "../ui/icon";

import type { CartItem } from "@/lib/shopify/types";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="Remove cart item"
      aria-disabled={pending}
      className={clsx(
        "ease flex size-4 items-center justify-center rounded-full bg-neutral-500 transition-all duration-200",
        {
          "cursor-not-allowed px-0": pending,
        }
      )}
    >
      {pending ? (
        <Icon icon="svg-spinners:pulse-multiple" className="m-0" />
      ) : (
        <Icon
          icon="carbon:close"
          className="hover:text-accent-3 mx-[1px] size-full text-white dark:text-black"
        />
      )}
    </button>
  );
}

export function DeleteItemButton({ item }: { item: CartItem }) {
  const [message, formAction] = useFormState(removeItem, null);
  const itemId = item.id;
  const actionWithVariant = formAction.bind(null, itemId);

  return (
    <form action={actionWithVariant}>
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
