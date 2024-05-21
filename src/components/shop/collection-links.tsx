import { getCollections } from "@/lib/shopify/graphql/collections";
import Link from "next/link";

export const CollectionLinks = async () => {
  const collections = await getCollections();
  return (
    <ul className="relative z-20 mt-12 flex flex-row flex-wrap justify-evenly gap-2">
      {collections.map((collection, i) => (
        <li key={i}>
          <Link href={`/collections/${collection.handle}`} className="text-xs">
            {collection.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
