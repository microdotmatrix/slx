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
    <div className="grid size-full place-content-center">
      <h2>Under Construction</h2>
    </div>
  );
}
