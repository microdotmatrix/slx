"use client";

import { Icon } from "./ui/icon";
import { usePathname, useParams, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/utils";

export const ShareButtons = () => {
  const { slug } = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const twitterUrl = createUrl(
    "https://twitter.com/intent/tweet",
    new URLSearchParams({
      url: createUrl(pathname, searchParams),
      text: `Check out this product on our site!`,
      hashtags: "nextjs,tailwindcss",
    }),
  );

  const facebookUrl = createUrl(
    "https://www.facebook.com/sharer/sharer.php",
    new URLSearchParams({
      u: createUrl(pathname, searchParams),
    }),
  );

  const linkedinUrl = createUrl(
    "https://www.linkedin.com/shareArticle",
    new URLSearchParams({
      url: createUrl(pathname, searchParams),
      title: `Check out this product on our site!`,
    }),
  );

  const emailUrl = createUrl(
    "mailto:",
    new URLSearchParams({
      subject: `Check out this product on our site!`,
      body: `I thought you might like this product! ${createUrl(pathname, searchParams)}`,
    }),
  );

  return (
    <div className="flex items-center">
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className="bg-black p-2 transition-colors duration-200 hover:opacity-90"
      >
        <Icon icon="simple-icons:x" className="size-6 text-white" />
      </a>
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="bg-social-facebook p-2 transition-colors duration-200 hover:opacity-90"
      >
        <Icon icon="simple-icons:facebook" className="size-6 text-white" />
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="bg-social-linkedin p-2 transition-colors duration-200 hover:opacity-90"
      >
        <Icon icon="simple-icons:linkedin" className="size-6 text-white" />
      </a>
      <a
        href={emailUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share via Email"
        className="bg-gray-900 p-2 text-neutral-600 hover:bg-gray-800 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        <Icon icon="ph:envelope" className="size-6 text-white" />
      </a>
    </div>
  );
};
