export const shopifyConfig = {
  url: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!}`,
  token: process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN!,
  version: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION!,
  country: "US",
  lang: "EN",
};
