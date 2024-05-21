// app/providers.tsx
"use client";

import { Provider as StateProvider, createStore } from "jotai";
import { ThemeProvider } from "next-themes";
import {
  ShopifyProvider,
  createStorefrontClient,
} from "@shopify/hydrogen-react";
import { shopifyConfig } from "@/lib/shopify/config";

export const client = createStorefrontClient({
  storeDomain: shopifyConfig.url as string,
  storefrontApiVersion: shopifyConfig.version as string,
  privateStorefrontToken: process.env.SHOPIFY_PRIVATE_ACCESS_TOKEN!,
  publicStorefrontToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN!!,
});

export const store = createStore();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StateProvider store={store}>
      <ShopifyProvider
        storeDomain={shopifyConfig.url as string}
        storefrontToken={shopifyConfig.token as string}
        storefrontApiVersion={shopifyConfig.version as string}
        countryIsoCode="US"
        languageIsoCode="EN"
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </ShopifyProvider>
    </StateProvider>
  );
}
