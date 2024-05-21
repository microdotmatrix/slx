"use client";

import { Icon } from "../ui/icon";
import { GridTileImage } from "./tile";
import { createUrl } from "@/lib/utils";
// import Image from "next/image";
import { Image } from "../image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function Gallery({
  images,
}: {
  images: { url: string; altText: string }[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const imageSearchParam = searchParams.get("image");
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;

  const nextSearchParams = new URLSearchParams(searchParams.toString());
  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  nextSearchParams.set("image", nextImageIndex.toString());
  const nextUrl = createUrl(pathname, nextSearchParams);

  const previousSearchParams = new URLSearchParams(searchParams.toString());
  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;
  previousSearchParams.set("image", previousImageIndex.toString());
  const previousUrl = createUrl(pathname, previousSearchParams);

  const buttonClassName =
    "h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center";

  return (
    <>
      <div className="relative aspect-square h-full max-h-[80vh] w-full overflow-hidden">
        {images[imageIndex] && (
          <Image
            src={images[imageIndex]?.url as string}
            alt={images[imageIndex]?.altText as string}
            height={images[imageIndex]?.height as number}
            width={images[imageIndex]?.width as number}
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="h-full w-full object-contain"
            loading="eager"
          />
        )}

        {images.length > 1 ? (
          <div className="absolute bottom-[5%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
              <Link
                aria-label="Previous product image"
                href={previousUrl}
                className={buttonClassName}
                scroll={false}
              >
                <Icon icon="carbon:arrow-left" className="h-5" />
              </Link>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <Link
                aria-label="Next product image"
                href={nextUrl}
                className={buttonClassName}
                scroll={false}
              >
                <Icon icon="carbon:arrow-right" className="h-5" />
              </Link>
            </div>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="flex flex-col items-center">
          <ul className="my-8 flex max-w-full items-center justify-start gap-2 overflow-auto py-1 lg:mb-0">
            {images.map((image, index) => {
              const isActive = index === imageIndex;
              const imageSearchParams = new URLSearchParams(
                searchParams.toString(),
              );

              imageSearchParams.set("image", index.toString());

              return (
                <li key={image.url} className="aspect-square h-20 w-20">
                  <Link
                    aria-label="Enlarge product image"
                    href={createUrl(pathname, imageSearchParams)}
                    scroll={false}
                    className="h-full w-full"
                  >
                    <GridTileImage
                      alt={image.altText}
                      src={image.url}
                      width={80}
                      height={80}
                      active={isActive}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
}
