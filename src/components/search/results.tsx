"use client";

import { useDeferredValue, memo } from "react";
import { Button } from "../ui/button";
import { Price } from "../product/price";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { atom, useAtom } from "jotai";
import type { Product } from "@/lib/shopify/types";

const resultsAtom = atom(6);

const SearchResults = ({ results }: { results: Product[] }) => {
  const deferredResults = useDeferredValue(results);
  const [showMore, setShowMore] = useAtom(resultsAtom);
  return (
    <>
      <div className="mb-6 grid grid-cols-1 gap-2 lg:grid-cols-2 xl:gap-4 2xl:grid-cols-3">
        {deferredResults?.slice(0, showMore).map((product, i) => {
          const { title, handle, priceRange, featuredImage, images } = product;
          const image = featuredImage ?? product.images[0];
          const caption = product.title;
          const price = priceRange.minVariantPrice;
          return (
            <div
              key={product.id}
              className="animate-in"
              style={{ minBlockSize: "420px" }}
            >
              <figure className="group relative h-full w-full shadow-xl shadow-gray-800/10 transition-shadow duration-300 ease-out hover:shadow-xl hover:shadow-gray-700/40">
                <Image
                  src={image.url}
                  alt={image.altText || title}
                  height="400"
                  width="400"
                  className={clsx(
                    "absolute inset-0 h-full w-full object-cover opacity-50 transition-opacity duration-300 ease-in-out group-hover:opacity-90",
                  )}
                  quality={70}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={image.url}
                />

                {caption && (
                  <figcaption className="absolute bottom-0 flex w-full flex-col items-stretch bg-background/20 px-3 py-2 transition-colors duration-300 group-hover:bg-background/80">
                    <Link
                      href={`/products/${handle}`}
                      className="font-lighters uppercase group-hover:text-muted-foreground"
                    >
                      {caption}
                    </Link>
                    <span className="block origin-right scale-100 text-right transition-transform duration-300 ease-in-out group-hover:scale-105">
                      <Price
                        amount={price.amount}
                        currencyCode={price.currencyCode}
                        className="font-inter text-2xl font-semibold"
                      />
                    </span>
                  </figcaption>
                )}
              </figure>
            </div>
          );
        })}
      </div>
      {deferredResults?.length > showMore && (
        <Button onClick={() => setShowMore(showMore + 6)} className="mx-auto">
          Show More
        </Button>
      )}
    </>
  );
};

export default memo(SearchResults);
