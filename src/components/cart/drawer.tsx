"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { Cart } from "@/lib/shopify/types";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Icon } from "../ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { CartItems } from "./line-items";
import { Button, buttonVariants } from "../ui/button";
import { resetCart } from "@/lib/shopify/actions";

import Link from "next/link";
import { Price } from "../product/price";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export const CartDrawer = ({ cart }: { cart: Cart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  useEffect(() => {
    if (cart?.totalQuantity !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true);
      }

      // Always update the quantity reference
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="relative flex cursor-pointer items-center gap-1">
          {cart && cart?.totalQuantity > 0 ? (
            <Badge
              variant="destructive"
              className="absolute right-2 top-0 h-3 rounded-full px-1 text-[0.6rem] font-semibold"
            >
              {cart.totalQuantity}
            </Badge>
          ) : null}
          <Icon icon="carbon:shopping-cart" className="size-8" />
        </div>
      </SheetTrigger>
      <SheetContent className="z-100 w-full bg-background/80 backdrop-blur-md sm:max-w-[580px] lg:w-[50vw] lg:max-w-[800px]">
        <div className="flex h-full flex-col space-y-3 overflow-y-auto px-0 py-4 lg:px-8">
          <h4>Shopping Cart</h4>
          <Suspense fallback={<CartSkeleton />}>
            <div className="flex h-full flex-col items-stretch justify-between gap-3">
              {cart?.totalQuantity > 0 ? (
                <>
                  <ul className="w-full">
                    <CartItems cart={cart} />
                  </ul>

                  <div className="py-4 text-neutral-500 dark:text-neutral-400">
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-300 pb-1 dark:border-neutral-800">
                      <p className="text-xs">Taxes</p>
                      <Price
                        className="text-right text-xs text-black dark:text-white"
                        amount={cart.cost.totalTaxAmount.amount}
                        currencyCode={cart.cost.totalTaxAmount.currencyCode}
                      />
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-300 pb-1 pt-1 dark:border-neutral-800">
                      <p className="text-xs">Shipping</p>
                      <p className="text-right text-xs">
                        Calculated at checkout
                      </p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-300 pb-1 pt-1 dark:border-neutral-800">
                      <p className="text-base">Total</p>
                      <Price
                        className="text-right text-base font-semibold text-black dark:text-white"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>
                  </div>

                  <footer>
                    <div className="flex items-center">
                      <Link
                        href={cart.checkoutUrl}
                        className={buttonVariants({
                          variant: "default",
                          size: "lg",
                          className: "w-full",
                        })}
                      >
                        Checkout
                      </Link>
                      <Button
                        variant="secondary"
                        size="lg"
                        className="w-full"
                        onClick={async () => {
                          // Clear cart
                          await resetCart();
                        }}
                      >
                        Clear
                      </Button>
                    </div>
                  </footer>
                </>
              ) : (
                <div>Cart is empty</div>
              )}
            </div>
          </Suspense>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const CartSkeleton = () => {
  return (
    <div className="flex w-full min-w-[350px] max-w-[420px] items-center gap-3">
      <div>
        <Skeleton className="flex h-24 w-24 rounded-md" />
      </div>
      <div className="flex w-full flex-col justify-between gap-2">
        <span className="animate-pulse text-lg text-gray-100/50">
          Loading...
        </span>
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-3/4 rounded-md" />
      </div>
    </div>
  );
};
