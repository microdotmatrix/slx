import clsx from "clsx";

import { GalleryCard } from "./card";
import { ArtModal } from "./modal";
import { Suspense } from "react";
import { Orbit } from "../loading";

type ItemProps = {
  id: string;
  title: string;
  url: string;
};

export const ArtGallery = ({
  items,
  category,
  searchParams,
}: {
  items: any;
  category: string;
  searchParams: Record<string, string> | null | undefined;
}) => {
  const showModal = searchParams?.modal === "true";
  const itemId = searchParams?.id;

  return (
    <>
      {items.length > 0 ? (
        <ul
          className={clsx(
            "columns-1 gap-1",
            items.length === 2
              ? `md:columns-1 xl:columns-2`
              : items.length === 3
                ? `md:columns-2 xl:columns-3 min-[2800px]:columns-4`
                : "md:columns-2 xl:columns-3 min-[2800px]:columns-4",
          )}
        >
          {items.map((item: ItemProps, i: number) => (
            <li key={i}>
              <GalleryCard item={item} category={category} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No {category} found</p>
      )}
      {showModal && (
        <Suspense
          fallback={
            <div className="fixed left-0 top-0 z-50 m-auto grid h-full w-full place-content-center">
              <Orbit />
            </div>
          }
        >
          <ArtModal id={itemId} category={category} />
        </Suspense>
      )}
    </>
  );
};
