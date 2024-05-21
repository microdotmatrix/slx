"use client";

import { useEffect, useState, useRef } from "react";
import type { EmblaOptionsType } from "embla-carousel";
import clsx from "clsx";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Price } from "@/components/product/price";
import { truncate } from "@/lib/utils";
import { Product } from "@/lib/shopify/types";
import { buttonVariants } from "./ui/button";

const config: EmblaOptionsType = {
  loop: true,
  align: "center",
};

export const HomePageCarousel = ({ products }: { products: Product[] }) => {
  const [isLoading, setLoading] = useState(true);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      console.log("current");
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const plugin = useRef(
    Autoplay({
      delay: 8000,
      stopOnInteraction: true,
    }),
  );

  return (
    <div className="flex flex-col items-center">
      <Carousel
        opts={config}
        setApi={setApi}
        plugins={[plugin.current]}
        className="mx-auto w-full max-w-full overflow-hidden"
      >
        <CarouselContent
          className="relative z-10 ml-0"
          style={{
            backfaceVisibility: "hidden",
            touchAction: "pan-y",
          }}
        >
          {products.map((product, index) => (
            <CarouselItem
              key={index}
              className={clsx(
                "w-full px-0 opacity-50 lg:max-w-6xl lg:px-[4vw]",
                current ? "opacity-100" : "opacity-0",
              )}
            >
              <div className="flex flex-col items-center justify-between lg:flex-row">
                <figure className="relative flex flex-1 items-center">
                  <Image
                    src={product.featuredImage.url}
                    alt={product.title}
                    height="640"
                    width="640"
                    className={clsx(
                      "aspect-square h-full w-full object-cover duration-700 ease-in-out ",
                      isLoading
                        ? "grayscale-50 scale-105 opacity-0 blur-md"
                        : "scale-100 opacity-100 blur-0 grayscale-0",
                    )}
                    onLoad={() => setLoading(false)}
                  />
                  <figcaption className="absolute right-2 top-8">
                    <div className="mr-auto rounded-md bg-primary p-4 text-white">
                      <Price
                        className="text-3xl"
                        amount={product.priceRange.maxVariantPrice.amount}
                        currencyCode={
                          product.priceRange.maxVariantPrice.currencyCode
                        }
                      />
                    </div>
                  </figcaption>
                </figure>
                <div className="flex-1 px-6">
                  <Card>
                    <CardContent>
                      <CardHeader>
                        <Link href={`/products/${product.handle}`}>
                          <h3>{product.title}</h3>
                        </Link>
                      </CardHeader>
                      <CardDescription>
                        {truncate(product.description, 320)}
                      </CardDescription>
                      <CardFooter>
                        <Link
                          href={`/products/${product.handle}`}
                          className={buttonVariants({
                            variant: "default",
                            size: "lg",
                            className: "mt-8",
                          })}
                        >
                          Shop now
                        </Link>
                      </CardFooter>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 z-50 size-12" />
        <CarouselNext className="right-2 z-50 size-12" />
        <ul className="mx-auto mt-6 flex h-4 w-fit items-center gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <li
              key={i}
              className={clsx(
                "size-2 rounded-full transition-all duration-500",
                current === i + 1
                  ? "scale-150 bg-slate-100"
                  : "bg-slate-400/50",
              )}
            />
          ))}
        </ul>
      </Carousel>
    </div>
  );
};
