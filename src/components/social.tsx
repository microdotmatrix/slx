"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { getURL, createUrl } from "@/lib/utils";
import { Icon } from "./ui/icon";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import clsx from "clsx";

export const ShareButtons = ({ size = "size-6" }: { size?: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = createUrl(getURL(pathname), searchParams);
  const classes = clsx(
    size,
    "text-foreground/80 transition-all duration-200 hover:text-foreground hover:drop-shadow-[0_1px_10px_hsl(var(--primary))]",
  );

  return (
    <div className="flex items-center gap-2">
      <TwitterShareButton
        url={url}
        title="Check out Slayley.com"
        hashtags={["slayley", "fashion", "style"]}
      >
        <Icon icon="simple-icons:x" className={classes} />
      </TwitterShareButton>
      <FacebookShareButton
        url={url}
        hashtag="#slayley"
        title="Check out Slayley.com"
      >
        <Icon icon="simple-icons:facebook" className={classes} />
      </FacebookShareButton>
      <LinkedinShareButton url={url} title="Check out Slayley.com">
        <Icon icon="simple-icons:linkedin" className={classes} />
      </LinkedinShareButton>
      <RedditShareButton url={url} title="Check out Slayley.com">
        <Icon icon="simple-icons:reddit" className={classes} />
      </RedditShareButton>
      <WhatsappShareButton url={url} title="Check out Slayley.com">
        <Icon icon="simple-icons:whatsapp" className={classes} />
      </WhatsappShareButton>
      <TelegramShareButton url={url} title="Check out Slayley.com">
        <Icon icon="simple-icons:telegram" className={classes} />
      </TelegramShareButton>
      <EmailShareButton
        url={url}
        subject="Check out Slayley.com"
        body="I thought you might like this site!"
      >
        <Icon icon="simple-icons:mail-dot-ru" className={classes} />
      </EmailShareButton>
    </div>
  );
};
