import { Suspense } from "react";
import { ArtGallery } from "@/components/art/gallery";
import { Orbit } from "@/components/loading";
import { getPaintings } from "@/server/db/query";

export type Props = {
  searchParams: Record<string, string> | null | undefined;
};

export const revalidate = 3600;

export default function Page({ searchParams }: Props) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center">
          <Orbit />
        </div>
      }
    >
      <Artwork searchParams={searchParams} />
    </Suspense>
  );
}

async function Artwork({ searchParams }: Props) {
  const paintings = await getPaintings();

  return (
    <ArtGallery
      items={paintings}
      category="paintings"
      searchParams={searchParams}
    />
  );
}
