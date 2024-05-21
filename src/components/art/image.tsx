"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { Icon } from "../ui/icon";
import clsx from "clsx";
import { Button, buttonVariants } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShareButtons } from "../social";
import { Image } from "../image";
import { toast } from "sonner";
import { createUrl, getURL } from "@/lib/utils";

const MotionLink = motion(Link);

type ArtProps = {
  id?: string;
  title?: string;
  createdAt?: string;
  url?: string;
  uv?: string;
  description?: string;
  productUrl?: string;
};

export const GalleryImage = ({
  art,
  category,
}: {
  art: ArtProps;
  category: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (art.uv) {
      toast("UV Reactive", {
        description: "Click the Lightbulb to activate UV Light",
        duration: 5000,
        action: {
          label: "View UV",
          onClick: () => {
            setShow(true);
          },
        },
      });
    }
    setIsMounted(true);
  }, []);

  const productUrl = getURL(art.productUrl?.toString(), true);
  return (
    isMounted && (
      <>
        <MotionLink
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.75,
            ease: "easeInOut",
          }}
          className="fixed inset-0 cursor-default bg-black/50 backdrop-blur-md"
          href={`/art/${category}`}
          scroll={false}
        />
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 10,
          }}
          transition={{
            duration: 0.25,
            delay: 0.1,
            ease: "easeIn",
          }}
          className="relative h-fit w-fit max-w-4xl rounded-md shadow-md"
        >
          <div className="flex items-start justify-between">
            <Link
              className="absolute right-2 top-2 z-50 flex size-fit items-center justify-center rounded bg-background pb-0.5 text-foreground"
              href={`/art/${category}`}
              scroll={false}
            >
              <Icon icon="carbon:close" className="size-10" />
              <span className="sr-only">Close Modal</span>
            </Link>
          </div>
          <div className="z-20 m-auto space-y-4 overflow-auto rounded-lg bg-background p-3">
            <div className="group relative w-full">
              {art.productUrl ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="absolute left-4 top-4 z-10">
                      <Link
                        href={productUrl}
                        className={buttonVariants({
                          size: "icon",
                          variant: "secondary",
                          className: "rounded-[0.25rem]",
                        })}
                      >
                        <Icon icon="mdi:shopify" className="size-10" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>View Product in Store</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : null}
              <Image
                src={art.url}
                alt={art.title}
                height={960}
                width={960}
                loading="eager"
                className={clsx(
                  "max-h-[80vh] max-w-full overflow-hidden rounded-lg object-contain transition-opacity duration-300",
                  show ? "opacity-0" : null,
                )}
                sizes="(min-width: 1024px) 960px, (min-width: 768px) 800px, 100vw"
              />
              {art.uv && (
                <>
                  <NextImage
                    src={art.uv}
                    alt={art.title}
                    height={960}
                    width={960}
                    loading="lazy"
                    className={clsx(
                      "absolute left-0 top-0 h-full w-full object-cover opacity-0 transition-opacity duration-300",
                      show ? "opacity-100" : null,
                    )}
                    sizes="(min-width: 1024px) 960px, (min-width: 768px) 800px, 100vw"
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="absolute bottom-4 left-4">
                        <Button
                          onClick={() => setShow(!show)}
                          size="icon"
                          className={clsx(
                            "rounded-[0.25rem]",
                            show
                              ? "bg-primary shadow-xl shadow-white/50"
                              : "bg-secondary",
                          )}
                        >
                          <Icon
                            icon="ph:lightbulb-duotone"
                            className={clsx(
                              show
                                ? "text-background dark:text-foreground"
                                : "text-foreground",
                            )}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Activate UV Light</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              )}
              <div className="absolute bottom-0 right-0 space-y-2 bg-background/75 px-4 py-2">
                <h4 className="max-w-full">{art.title}</h4>
                {art.description && (
                  <p className="border-t py-2">{art.description}</p>
                )}
                <ShareButtons size="size-5" />
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )
  );
};
