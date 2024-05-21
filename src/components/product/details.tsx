"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ProductDescription } from "./description";
import { Product } from "@/lib/shopify/types";

export const ProductDetails = ({ product }: { product: Product }) => {
  return (
    <div className="mx-auto w-full max-w-3xl px-4">
      <div className="flex flex-col items-start justify-between lg:flex-row">
        <div className="flex-1">
          <Accordion type="single" collapsible defaultValue="Description">
            <AccordionItem value="Description">
              <AccordionTrigger className="text-2xl">
                <span>Description</span>
              </AccordionTrigger>
              <AccordionContent>
                {product.descriptionHtml ? (
                  <ProductDescription
                    className="mb-6 text-sm leading-tight dark:text-white/[60%]"
                    html={product.descriptionHtml}
                  />
                ) : null}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
