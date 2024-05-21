// @ts-nocheck

import {
  shopify,
  reshapeProduct,
  reshapeProducts,
  removeEdgesAndNodes,
} from "@/lib/shopify";
import { TAGS } from "../utils";
import type {
  Product,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductsOperation,
} from "../types";
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery,
  getProductBySelectedOptionsQuery,
  getProductSeoQuery,
  getProductHandlesQuery,
} from "./queries";

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await shopify.request<ShopifyProductOperation>({
    query: getProductQuery,
    tags: [TAGS.products],
    variables: {
      handle,
    },
  });

  return reshapeProduct(res.body.data.product, false);
}

export async function getProductHandles(): Promise<string[] | undefined> {
  const res = await shopify.request<ShopifyProductsOperation>({
    query: getProductHandlesQuery,
    tags: [TAGS.products],
  });

  return res.body.data.products;
}

export async function getProductRecommendations(
  productId: string,
): Promise<Product[]> {
  const res = await shopify.request<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    tags: [TAGS.products],
    variables: {
      productId,
    },
  });

  return reshapeProducts(res.body.data.productRecommendations);
}

export async function getProducts({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await shopify.request<ShopifyProductsOperation>({
    query: getProductsQuery,
    tags: [TAGS.products],
    variables: {
      query,
      reverse,
      sortKey,
    },
  });

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

export async function getProductWithOptions(
  handle: string,
  selectedOptions: any[],
): Promise<Product | any | undefined> {
  const res = await shopify.request<ShopifyProductOperation>({
    query: getProductBySelectedOptionsQuery,
    variables: {
      handle,
      selectedOptions,
    },
  });

  return {
    product: reshapeProduct(res.body.data.product, false),
    selectedVariant: reshapeProduct(
      res.body.data.product.selectedVariant,
      true,
    ),
  };
}

export async function getProductMetadata(handle: string): Promise<any> {
  const res = await shopify.request<ShopifyProductOperation>({
    query: getProductSeoQuery,
    tags: [TAGS.products],
    variables: {
      handle,
    },
  });

  return res.body.data.product;
}
