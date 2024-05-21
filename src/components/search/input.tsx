"use client";

import { useDebouncedCallback } from "@react-hookz/web";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";

export function SearchInput({ defaultValue = "" }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();
  const handleOnChange = useCallback(
    (normalizedSearchValue: string) => {
      const url = new URL("/", window.location.origin);

      if (normalizedSearchValue === "") {
        url.searchParams.delete("q");
      } else {
        url.searchParams.append("q", normalizedSearchValue);
      }

      if (normalizedSearchValue === defaultValue) {
        return;
      }

      startTransition(() => {
        router.replace(`/search?${url.searchParams.toString()}`);
      });
    },
    [defaultValue, pathname, router]
  );

  const debouncedOnChange = useDebouncedCallback(
    handleOnChange,
    [handleOnChange],
    200
  );

  return (
    <div className="relative flex flex-row items-center justify-start w-full">
      <label htmlFor="search" className="absolute left-6">
        <Icon icon="ph:magnifying-glass-duotone" className="size-6" />
      </label>
      <Input
        onChange={(e: { currentTarget: { value: string } }) => {
          const normalizedSearchValue = e.currentTarget.value.trim();

          debouncedOnChange(normalizedSearchValue);
        }}
        id="search"
        type="search"
        placeholder="Search our products..."
        className="ml-4 pr-3 pl-10 appearance-none border w-full outline-none focus:outline-none"
        defaultValue={defaultValue}
      />
      {isPending ? (
        <Icon icon="mdi:loading" className="absolute animate-spin right-10" />
      ) : null}
    </div>
  );
}
