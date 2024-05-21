import { redirect } from "next/navigation";

import { Card } from "@/components/ui/card";
import { GalleryImage } from "./image";
import {
  getPaintingById,
  getDrawingById,
  getDigitalArtById,
} from "@/server/db/query";

export const ArtModal = async ({
  id,
  category,
}: {
  id?: string;
  category: string;
}) => {
  if (!id || isNaN(parseInt(id, 10))) {
    redirect(`/art/${category}`);
  }

  let art;

  if (category === "paintings") {
    art = await getPaintingById(id);
  }
  if (category === "drawings") {
    art = await getDrawingById(id);
  }
  if (category === "digital") {
    art = await getDigitalArtById(id);
  }
  if (!category || category === undefined) {
    return null;
  }

  return (
    <Card className="fixed inset-0 z-60 flex items-center justify-center bg-transparent">
      <GalleryImage art={art} category={category} />
    </Card>
  );
};
