import { Suspense } from "react";
import { Orbit } from "@/components/loading";
import { getCollectionProducts } from "@/lib/shopify/graphql/collections";
import { HomePageCarousel } from "@/components/carousel";

export default function Home() {
  return (
    <>
      <Suspense
        fallback={
          <div className="grid h-full w-full place-content-center">
            <Orbit />
          </div>
        }
      >
        <Products />
      </Suspense>
    </>
  );
}

const Products = async () => {
  const products = await getCollectionProducts({
    collection: "featured",
    reverse: true,
  });

  return (
    <>
      <HomePageCarousel products={products} />
    </>
  );
};
