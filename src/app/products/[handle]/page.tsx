import { Suspense } from "react";
import {
  getProductHandles,
  getProductMetadata,
} from "@/lib/shopify/graphql/products";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Orbit } from "@/components/loading";
import { ProductCard } from "@/components/product/card";

export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}) {
  const product = await getProductMetadata(params.handle);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      follow: true,
      index: true,
    },
  };
}

export async function generateStaticParams() {
  const products = await getProductHandles();
  return products?.edges?.map((product) => ({
    handle: product.node.handle,
  }));
}

export default function Page({
  params: { handle },
}: {
  params: { handle: string };
}) {
  return (
    <div className="flex w-full flex-col px-8 lg:flex-row lg:items-start lg:justify-between">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductCard handle={handle} />
      </Suspense>
    </div>
  );
}

const ProductSkeleton = () => {
  return (
    <>
      <figure className="flex-1">
        <div className="grid h-96 w-full place-content-center">
          <Orbit />
        </div>
      </figure>
      <article className="flex-1 p-4">
        <Card>
          <CardContent className="space-y-4">
            <CardHeader>
              <h3>Loading...</h3>
            </CardHeader>
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </CardContent>
        </Card>
      </article>
    </>
  );
};
