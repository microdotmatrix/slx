"use client";

import { memo, useCallback, useEffect, useTransition } from "react";
import clsx from "clsx";
import { createUrl } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Skeleton as LoadingSkeleton } from "@/components/ui/skeleton";

const OptionSelector = ({ options, variants }) => {
  const pathname = usePathname();
  const currentParams = useSearchParams();
  const router = useRouter();
  const [isSelecting, startTransition] = useTransition();
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }
  // Discard any unexpected options or values from url and create params map.
  const paramsMap = Object.fromEntries(
    Array.from(currentParams.entries()).filter(([key, value]) =>
      options.find(
        (option) =>
          option.name.toLowerCase() === key && option.values.includes(value),
      ),
    ),
  );
  const optimizedVariants = variants.map((variant) => {
    const optimized = {
      id: variant.id,
      availableForSale: variant.availableForSale,
      params: new URLSearchParams(),
    };

    variant.selectedOptions.forEach((selectedOption) => {
      const name = selectedOption.name.toLowerCase();
      const value = selectedOption.value;

      optimized[name] = value;
      optimized.params.set(name, value);
    });

    return optimized;
  });

  const selectedVariant =
    optimizedVariants.find(
      (variant) =>
        variant.availableForSale &&
        Object.entries(paramsMap).every(
          ([key, value]) => variant[key] === value,
        ),
    ) || optimizedVariants.find((variant) => variant.availableForSale);

  const selectedVariantParams = new URLSearchParams(selectedVariant?.params);
  const currentUrl = createUrl(pathname, currentParams);
  const selectedVariantUrl = createUrl(pathname, selectedVariantParams);

  useEffect(() => {
    if (currentUrl !== selectedVariantUrl) {
      router.replace(selectedVariantUrl);
    }
  }, [currentUrl, selectedVariantUrl]);

  return options.map((option) => (
    <dl className="mb-8" key={option.id}>
      <dt className="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>
      <dd className="flex flex-wrap gap-2">
        {option.values.map((value) => {
          // Base option params on selected variant params.
          const optionParams = new URLSearchParams(selectedVariantParams);
          // Update the params using the current option to reflect how the url would change.
          optionParams.set(option.name.toLowerCase(), value);

          const optionUrl = createUrl(pathname, optionParams);

          // The option is active if it in the url params.

          const handleNavigate = useCallback(() => {
            isSelecting === true;
            startTransition(() => {
              router.replace(optionUrl);
              isSelecting === false;
            });
          }, [optionUrl]);

          const isActive =
            selectedVariantParams.get(option.name.toLowerCase()) === value;

          // The option is available for sale if it fully matches the variant in the option's url params.
          // It's super important to note that this is the options params, *not* the selected variant's params.
          // This is the "magic" that will cross check possible future variant combinations and preemptively
          // disable combinations that are not possible.
          const isAvailableForSale = optimizedVariants.find((a) =>
            Array.from(optionParams.entries()).every(
              ([key, value]) => a[key] === value,
            ),
          )?.availableForSale;

          const DynamicTag = isAvailableForSale ? "button" : "span";

          return (
            <DynamicTag
              key={value}
              onClick={handleNavigate}
              disabled={!isAvailableForSale || isSelecting || isActive}
              title={`${option.name} ${value}${!isAvailableForSale ? " (Out of Stock)" : ""}`}
              className={clsx(
                "leading-2 whitespace-wrap animation-fadeIn m-auto flex h-12 w-min min-w-[69px] flex-1 items-center justify-center break-words rounded-sm px-2 text-center tracking-tighter transition-all duration-150 md:leading-3",
                {
                  "cursor-default bg-slate-300 ring-2 ring-black dark:ring-white":
                    isActive,
                  "opacity-50 blur-sm": isSelecting,
                  "ring-1 ring-gray-300 transition transition-all duration-100 duration-300 ease-in-out hover:scale-110 hover:bg-gray-100 hover:ring-black dark:ring-gray-700 dark:hover:bg-transparent dark:hover:ring-white":
                    !isActive && isAvailableForSale,
                  "relative z-10 cursor-not-allowed overflow-hidden bg-gray-100 ring-1 ring-gray-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-gray-300 before:transition-transform dark:bg-gray-900 dark:ring-gray-700 before:dark:bg-gray-700":
                    !isAvailableForSale,
                },
              )}
              data-testid={isActive ? "selected-variant" : "variant"}
              style={{
                fontSize: "clamp(0.6rem, 1.5vw, 0.65rem)",
                lineBreak: "loose",
              }}
            >
              {value.slice(0, 20)}
            </DynamicTag>
          );
        })}
      </dd>
    </dl>
  ));
};

export const OptionSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-row gap-2">
      <LoadingSkeleton className="h-[40px] flex-1" />
      <LoadingSkeleton className="h-[40px] flex-1" />
      <LoadingSkeleton className="h-[40px] flex-1" />
      <LoadingSkeleton className="h-[40px] flex-1" />
      <LoadingSkeleton className="h-[40px] flex-1" />
    </div>
  );
};

export default memo(OptionSelector);
