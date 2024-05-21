import Link from "next/link";
import { MandalaOne } from "../svg/mandala-one";
import { MandalaThree } from "../svg/mandala-three";
import { MandalaTwo } from "../svg/mandala-two";

export const Categories = () => {
  return (
    <ul className="left-0 top-0 z-10 mx-auto mt-0 grid w-fit flex-none grid-cols-3 flex-col justify-start gap-8 pt-12 lg:sticky lg:flex lg:h-full lg:pl-8 lg:pt-28">
      <li>
        <Link
          href="/art/drawings"
          className="flex flex-col items-center justify-center space-y-2 [&>span]:hover:text-primary"
        >
          <MandalaOne className="size-20 transition-colors duration-200 hover:fill-primary md:size-24 lg:size-32 2xl:size-36" />
          <span className="transition-colors duration-200">Drawings</span>
        </Link>
      </li>
      <li>
        <Link
          href="/art/paintings"
          className="flex flex-col items-center justify-center space-y-2 [&>span]:hover:text-primary"
        >
          <MandalaTwo className="size-20 transition-colors duration-200 hover:fill-primary md:size-24 lg:size-32 2xl:size-36" />
          <span className="transition-colors duration-200">Paintings</span>
        </Link>
      </li>
      <li>
        <Link
          href="/art/digital"
          className="flex flex-col items-center justify-center space-y-2 [&>span]:hover:text-primary"
        >
          <MandalaThree className="size-20 transition-colors duration-200 hover:fill-primary md:size-24 lg:size-32 2xl:size-36" />
          <span className="transition-colors duration-200">Digital Art</span>
        </Link>
      </li>
    </ul>
  );
};
