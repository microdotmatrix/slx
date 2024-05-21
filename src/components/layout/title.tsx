"use client";

import Link from "next/link";
import { Logo } from "../logo";
import { useSetAtom } from "jotai";
import { mobileNavAtom } from "@/lib/atoms";

export const SiteTitle = () => {
  const isOpen = useSetAtom(mobileNavAtom);
  return (
    <>
      <Link
        href="/"
        onClick={() => isOpen(false)}
        className="logo z-50 [--size-logo:10rem] lg:[--size-logo:15rem]"
      >
        <Logo className="z-50 fill-white dark:fill-white/90" />
      </Link>
      <section
        role="site-title"
        className="fixed left-[8vw] top-8 z-50 flex items-center gap-12"
      >
        <Link
          href="/"
          onClick={() => isOpen(false)}
          className="origin-left scale-x-100 scale-y-[85%] font-blacklisted text-2xl text-foreground drop-shadow-[0_10px_13px_hsl(var(--primary))] transition-all duration-300 lg:text-3xl"
        >
          Slayley.com
        </Link>
      </section>
    </>
  );
};
