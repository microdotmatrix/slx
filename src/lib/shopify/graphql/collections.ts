// @ts-nocheck

import {
  shopify,
  removeEdgesAndNodes,
  reshapeCollection,
  reshapeCollections,
  reshapeProducts,
} from "@/lib/shopify";
import { TAGS } from "../utils";
import type {
  Collection,
  ShopifyCollectionOperation,
  Product,
  ShopifyCollectionProductsOperation,
} from "../types";
import {
  getCollectionQuery,
  getCollectionProductsQuery,
  getCollectionsQuery,
  getCollectionHandlesQuery,
} from "./queries";

export async function getCollection(
  handle: string,
): Promise<Collection | undefined> {
  const res = await shopify.request<ShopifyCollectionOperation>({
    query: getCollectionQuery,
    tags: [TAGS.collections],
    variables: {
      handle,
    },
  });

  return reshapeCollection(res.body.data.collection);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await shopify.request<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: {
      handle: collection,
      reverse,
      sortKey: sortKey === "CREATED_AT" ? "CREATED" : sortKey,
    },
  });

  if (!res.body.data.collection) {
    console.log(`No collection found for \`${collection}\``);
    return [];
  }

  return reshapeProducts(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    removeEdgesAndNodes(res.body.data.collection.products),
  );
}

export async function getCollections(): Promise<Collection[]> {
  const res = await shopify.request<ShopifyCollectionsOperation>({
    query: getCollectionsQuery,
    tags: [TAGS.collections],
  });
  const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections);
  const collections = [
    {
      handle: "",
      title: "All",
      description: "All products",
      seo: {
        title: "All",
        description: "All products",
      },
      path: "/search",
      updatedAt: new Date().toISOString(),
    },
    // Filter out the `hidden` collections.
    // Collections that start with `hidden-*` need to be hidden on the search page.
    ...reshapeCollections(shopifyCollections).filter(
      (collection) => !collection.handle.startsWith("hidden"),
    ),
  ];

  return collections;
}

export async function getCollectionHandles(): Promise<string[] | undefined> {
  const res = await shopify.request<ShopifyProductsOperation>({
    query: getCollectionHandlesQuery,
    tags: [TAGS.collections],
  });

  return res.body.data.collections;
}
