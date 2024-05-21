import { Suspense } from "react";
import { CollectionLinks } from "@/components/shop/collection-links";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <section className="w-full py-2">
        <Suspense fallback={<div>Loading...</div>}>
          <CollectionLinks />
        </Suspense>
      </section>
      <section className="w-full py-2">{children}</section>
    </div>
  );
}
