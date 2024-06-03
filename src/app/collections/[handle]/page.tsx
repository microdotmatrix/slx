import { Suspense } from "react";
import { Orbit } from "@/components/loading";
import {
  getCollectionProducts,
  getCollectionHandles,
} from "@/lib/shopify/graphql/collections";

export const revalidate = 3600;

export async function generateStaticParams() {
  const collections = await getCollectionHandles();
  return collections?.edges?.map((collection) => ({
    handle: collection.node.handle,
  }));
}

export default function CollectionPage({
  params: { handle },
}: {
  params: { handle: string };
}) {
  return (
    <Suspense
      fallback={
        <div className="fixed left-0 top-0 z-50 m-auto grid h-full w-full place-content-center">
          <Orbit />
        </div>
      }
    >
      <Collection handle={handle} />
    </Suspense>
  );
}

const Collection = async ({ handle }: { handle: string }) => {
  const collection = await getCollectionProducts({ collection: handle });

  return (
    <div className="grid size-full place-content-center">
      <h2>Under Construction</h2>
    </div>
  );
};
