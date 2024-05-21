import { Suspense } from "react";
import {
  getCollectionProducts,
  getCollections,
} from "@/lib/shopify/graphql/collections";
import Link from "next/link";

export default async function CollectionPage() {
  const collections = await getCollections();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <pre>{JSON.stringify(collections, null, 2)}</pre>
      <Collection />
    </Suspense>
  );
}

async function Collection() {
  const products = await getCollectionProducts({
    collection: "featured",
    reverse: true,
  });

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h4>
            <Link href={`/products/${product.handle}`}>{product.title}</Link>
          </h4>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
}
