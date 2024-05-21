import { db } from "@/server/db";
import { unstable_cache as cache } from "next/cache";

/**
 * Retrieves drawings from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of drawings.
 */
export const getDrawings = cache(async () => {
  return await db.query.drawings.findMany();
}, ["drawings"]);

export const getPaintings = cache(async () => {
  return await db.query.paintings.findMany();
}, ["paintings"]);

export const getDigitalArt = cache(async () => {
  return await db.query.digitalArt.findMany();
}, ["digitalArt"]);

export const getDrawingById = cache(
  async (id: string) => {
    return await db.query.drawings.findFirst({
      where: (model, { eq }) => eq(model.id, parseInt(id, 10)),
    });
  },
  ["drawing"],
);

export const getPaintingById = cache(
  async (id: string) => {
    return await db.query.paintings.findFirst({
      where: (model, { eq }) => eq(model.id, parseInt(id, 10)),
    });
  },
  ["painting"],
);

export const getDigitalArtById = cache(
  async (id: string) => {
    return await db.query.digitalArt.findFirst({
      where: (model, { eq }) => eq(model.id, parseInt(id, 10)),
    });
  },
  ["digitalArt"],
);
