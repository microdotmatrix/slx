import { ReadonlyURLSearchParams } from "next/navigation";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { redirect } from "next/navigation";
// import { getPlaiceholder } from "plaiceholder";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to slugify a string
export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export const getURL = (path: string = "", isProduct = false) => {
  // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL.trim() !== ""
      ? process.env.NEXT_PUBLIC_SITE_URL
      : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
        process?.env?.NEXT_PUBLIC_VERCEL_URL &&
          process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ""
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : // If neither is set, default to localhost for local development.
          "http://localhost:3000/";

  // Trim the URL and remove trailing slash if exists.
  url = url.replace(/\/+$/, "");
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Ensure path starts without a slash to avoid double slashes in the final URL.
  path = path.replace(/^\/+/, "");

  if (isProduct) {
    return path ? `${url}/products/${path}` : url;
  }

  // Concatenate the URL and the path.
  return path ? `${url}/${path}` : url;
};

export function isValidEmail(email: string) {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

export async function redirectToPath(path: string) {
  return redirect(path);
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export function getExcerpt(text: string) {
  const regex = /<p.*>(.*?)<\/p>/;
  const match = regex.exec(text);
  return match?.length ? match[0] : text;
}

export function truncate(str: string, num = 155): string {
  if (typeof str !== "string") return "";
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num - 3) + "...";
}

export function getIdFromURL(addressId: string): { id: string; key: string } {
  const [id, key] = addressId.split("/").pop()?.split("?") ?? ["", ""];
  //@ts-ignore
  return { id, key };
}

export function convertObjectToQueryString(object: Record<string, any>) {
  return new URLSearchParams(object).toString();
}

export const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="0%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="90%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.5s" repeatCount="indefinite"  />
  </svg>
`;

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

// export async function getBase64(url: string) {
//   try {
//     const res = await fetch(url);
//     if (!res.ok) {
//       throw new Error("Failed to fetch image");
//     }
//     const buffer = await res.arrayBuffer();
//     const { base64 } = await getPlaiceholder(Buffer.from(buffer));
//     return base64;
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error(error.stack);
//     }
//   }
// }
