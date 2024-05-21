import { Suspense } from "react";
import { Orbit } from "@/components/loading";
import { getCollectionProducts } from "@/lib/shopify/graphql/collections";

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
    <div>
      <pre>{JSON.stringify(collection, null, 2)}</pre>
    </div>
  );
};
