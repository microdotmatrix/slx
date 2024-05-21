import { getProduct } from "@/lib/shopify/graphql/products";
import { Gallery } from "./gallery";
import { Suspense } from "react";
import { ShareButtons } from "../social";
import { Card, CardContent } from "../ui/card";
import { AddToCart } from "./add-to-cart";
import { ProductDetails } from "./details";
import { Price } from "./price";
import { VariantSelector } from "./variant-selector";

export const ProductCard = async ({ handle }: { handle: string }) => {
  const product = await getProduct(handle);
  const firstVariant = product.variants[0];
  const selectedVariant = product.selectedVariant ?? firstVariant;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <figure className="relative mt-0 flex flex-col placeholder:top-0 lg:sticky lg:max-w-[50%] lg:flex-1">
        <Gallery images={product.images} />
      </figure>
      <article className="px-6 lg:flex-1">
        <Card>
          <CardContent className="space-y-4">
            <h4 className="mt-8 lg:text-4xl xl:text-5xl">{product.title}</h4>
            <div className="flex w-full items-baseline justify-end gap-2">
              {product.variants?.length > 1 ? (
                <span className="text-xs">From</span>
              ) : null}
              <Price
                amount={selectedVariant.price.amount}
                currencyCode={selectedVariant.price.currencyCode}
                className="mt-2 font-serif text-4xl"
              />
            </div>
            <Suspense fallback={<div>Loading options...</div>}>
              <VariantSelector
                options={product.options}
                variants={product.variants}
              />
            </Suspense>
            <div className="flex flex-col items-center justify-between gap-4 pt-4 lg:flex-row">
              <AddToCart
                variants={product.variants}
                availableForSale={product?.availableForSale}
              />
              <ShareButtons />
            </div>

            <ProductDetails product={product} />
          </CardContent>
        </Card>
      </article>
    </>
  );
};
