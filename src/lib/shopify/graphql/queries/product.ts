import {
  imageFragment,
  mediaFragment,
  productFragment,
  variantFragment,
} from "../fragments";

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductsQuery = /* GraphQL */ `
  query getProducts(
    $sortKey: ProductSortKeys
    $reverse: Boolean
    $query: String
  ) {
    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;

export const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts(
    $sortKey: ProductSortKeys
    $reverse: Boolean
    $first: Int
  ) {
    products(sortKey: $sortKey, reverse: $reverse, first: $first) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductRecommendationsQuery = /* GraphQL */ `
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductBySelectedOptionsQuery = /* GraphQL */ `
  query getProductBySelectedOptions(
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) {
    product(handle: $handle) {
      ...product
      selectedVariant: variantBySelectedOptions(
        selectedOptions: $selectedOptions
      ) {
        ...variant
      }
    }
  }
  ${productFragment}
  ${variantFragment}
`;

export const getProductMediaQuery = /* GraphQL */ `
  query getProductMedia($handle: String!) {
    product(handle: $handle) {
      media(first: 10) {
        nodes {
          mediaContentType
          alt
          ...MediaFields
        }
      }
    }
  }
  ${mediaFragment}
`;

export const getProductImagesQuery = /* GraphQL */ `
  query getProductImages($handle: String!) {
    product(handle: $handle) {
      images(first: 25) {
        edges {
          node {
            ...image
          }
        }
      }
    }
  }
  ${imageFragment}
`;

export const getProductSeoQuery = /* GraphQL */ `
  query getProductSEO($handle: String!) {
    product(handle: $handle) {
      title
      description
      seo {
        title
        description
      }
    }
  }
`;

export const getProductHandlesQuery = /* GraphQL */ `
  query getProductHandles {
    products(first: 100) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;
