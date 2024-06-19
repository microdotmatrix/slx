"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Image } from "../image";
import { Card } from "../ui/card";
import { getURL } from "@/lib/utils";

export const GalleryCard = ({
  item,
  category,
}: {
  item: { id: string; url: string; title: string };
  category: string;
}) => {
  // const pathname = headers().get("x-pathname");
  const pathname = usePathname();
  let siteUrl;
  if (process.env.NODE_ENV === "development") {
    siteUrl = "http://localhost:3000";
  } else {
    siteUrl = pathname.toString();
  }
  // const siteUrl = getURL(pathname ? pathname : "", false);
  const url = new URL(`${siteUrl}/art/${category}`);

  url.searchParams.set("modal", "true");
  url.searchParams.set("id", item.id.toString());

  return (
    <Link href={url.toString()} scroll={false}>
      <Card className="mb-1 overflow-hidden" style={{ maxBlockSize: "780px" }}>
        <figure className="relative overflow-hidden">
          <Image
            src={`${item.url}?tr=w-540,h-540`}
            alt={item.title}
            height={540}
            width={540}
            sizes="(min-width: 1024px) 540px, (min-width: 768px) 450px, 100vw"
            className="h-full w-full object-cover"
          />
        </figure>
      </Card>
    </Link>
  );
};
