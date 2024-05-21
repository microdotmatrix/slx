"use client";

import NextImage from "next/image";
import { useState } from "react";
import { shimmer, toBase64 } from "@/lib/utils";
import clsx from "clsx";

type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  loading?: "eager" | "lazy";
};

export const Image = ({
  src,
  alt,
  width,
  height,
  className = "",
  sizes = "100vw",
  loading = "lazy",
  ...props
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`}
      className={clsx(
        className,
        "duration-700 ease-in-out ",
        isLoading
          ? "grayscale-50 opacity-50 blur-sm"
          : "opacity-100 blur-0 grayscale-0",
      )}
      onLoad={() => setLoading(false)}
      sizes={sizes}
      loading={loading}
      {...props}
    />
  );
};
