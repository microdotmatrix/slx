"use client";

import { useState } from "react";
import { Cart } from "@/lib/shopify/types";
import { DEFAULT_OPTION } from "@/lib/shopify/utils";
import { createUrl } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { DeleteItemButton } from "./delete";
import { EditItemQuantityButton } from "./edit";
import { Price } from "../product/price";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export const CartItems = ({ cart }: { cart: Cart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeCart = () => setIsOpen(false);

  return (
    <>
      {cart.lines.map((item, i) => {
        const merchandiseSearchParams = {} as MerchandiseSearchParams;

        item.merchandise.selectedOptions.forEach(({ name, value }) => {
          if (value !== DEFAULT_OPTION) {
            merchandiseSearchParams[name.toLowerCase()] = value;
          }
        });

        const merchandiseUrl = createUrl(
          `/products/${item.merchandise.product.handle}`,
          new URLSearchParams(merchandiseSearchParams),
        );

        return (
          <li
            key={i}
            className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
          >
            <div className="relative flex w-full flex-row justify-between px-1 py-4">
              <div className="absolute left-0 top-3 z-40">
                <DeleteItemButton item={item} />
              </div>
              <Link
                href={merchandiseUrl}
                onClick={closeCart}
                className="z-30 flex flex-row space-x-4"
              >
                <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                  <Image
                    className="h-full w-full object-cover"
                    width={64}
                    height={64}
                    alt={
                      item.merchandise.product.featuredImage.altText ||
                      item.merchandise.product.title
                    }
                    src={item.merchandise.product.featuredImage.url}
                  />
                </div>

                <div className="flex flex-1 flex-col text-base">
                  <span className="text-sm leading-tight 2xl:text-xs">
                    {item.merchandise.product.title}
                  </span>
                  {item.merchandise.title !== DEFAULT_OPTION ? (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {item.merchandise.title}
                    </p>
                  ) : null}
                </div>
              </Link>
              <div className="flex h-16 flex-col justify-between">
                <Price
                  className="flex justify-end space-y-2 text-right text-sm 2xl:text-xs"
                  amount={item.cost.totalAmount.amount}
                  currencyCode={item.cost.totalAmount.currencyCode}
                />
                <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-300 dark:border-neutral-700">
                  <EditItemQuantityButton item={item} type="minus" />
                  <p className="w-6 text-center">
                    <span className="w-full text-xs">{item.quantity}</span>
                  </p>
                  <EditItemQuantityButton item={item} type="plus" />
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </>
  );
};
