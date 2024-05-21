"use client";

import type { MoneyV2 } from "@shopify/hydrogen-react/storefront-api-types";
import { Money as MoneyComponent } from "@shopify/hydrogen-react";

export const Money = ({ data, ...props }: { data: MoneyV2 | any }) => {
  return <MoneyComponent data={data} {...props} />;
};
