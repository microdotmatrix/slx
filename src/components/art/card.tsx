import Link from "next/link";
// import Image from "next/image";
import { Image } from "../image";
import { Card } from "../ui/card";
import { headers } from "next/headers";

export const GalleryCard = ({
  item,
  category,
}: {
  item: { id: string; url: string; title: string };
  category: string;
}) => {
  const headersList = headers();
  const pathname = headersList.get("x-pathname");
  const url = new URL(
    pathname ? pathname : "",
    `http://localhost:3000/art/${category}`,
  );

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