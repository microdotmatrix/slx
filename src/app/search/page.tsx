import { Suspense } from "react";
import { getProducts } from "@/lib/shopify/graphql/products";
import SearchResults from "@/components/search/results";
import { sorting, defaultSort } from "@/lib/shopify/utils";
import { Orbit } from "@/components/loading";
import { Transition } from "@/components/transition";

export const revalidate = 0;

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });

  return (
    <Transition>
      <Suspense
        fallback={
          <div className="grid h-full w-full place-content-center">
            <Orbit />
          </div>
        }
      >
        {searchValue ? (
          <div className="container">
            {products.length === 0
              ? `No products found for "${searchValue}"`
              : `Found ${products.length} products for "${searchValue}"`}
          </div>
        ) : null}
        {products.length > 0 ? (
          <div className="container max-w-none">
            <SearchResults results={products} />
          </div>
        ) : null}
      </Suspense>
    </Transition>
  );
}
