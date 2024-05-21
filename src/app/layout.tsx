import "@/styles/globals.css";

import { Providers } from "@/components/providers";
import { fonts } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Transition } from "@/components/transition";
import { cookies } from "next/headers";
import { ThemeSwitcher } from "@/components/ui/theme";
import { Cart } from "@/components/cart";
import { Icon } from "@/components/ui/icon";
import { Navbar } from "@/components/layout/nav";
import Link from "next/link";
import { MobileNav, MobileNavButton } from "@/components/layout/mobile-nav";
import { SiteTitle } from "@/components/layout/title";
import { Toaster } from "@/components/ui/sonner";
import { meta } from "@/lib/config";
import type { Metadata } from "next";
import { FitText } from "@/components/ui/text";

export const metadata: Metadata = {
  metadataBase: new URL(meta.url),
  title: {
    default: meta.title,
    template: `%s | ${meta.title}`,
  },
  robots: {
    follow: true,
    index: true,
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = cookies().get("customerAccessToken");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          fonts.inter.variable,
          fonts.blacklisted.variable,
          fonts.spaceGrotesk.variable,
          fonts.unisans.variable,
          fonts.lighters.variable,
          fonts.barlow.variable,
          fonts.kanit.variable,
          "bg-background dark:bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] dark:from-gray-800 dark:via-gray-950 dark:to-background",
        )}
      >
        <Providers>
          <header
            role="site-header"
            className="fixed z-60 flex h-32 w-full bg-gradient-to-b from-slate-300 to-transparent dark:from-slate-900"
          >
            <SiteTitle />
            <section
              role="site-navigation"
              className="fixed right-2 top-6 z-50 flex items-center gap-4"
            >
              <Navbar />

              <div className="flex lg:hidden">
                <MobileNavButton />
              </div>

              {accessToken ? (
                <Link href="/account">
                  <Icon icon="carbon:user-avatar-filled" className="size-8" />
                </Link>
              ) : (
                <Link href="/account/login">
                  <Icon icon="carbon:user-avatar" className="size-8" />
                </Link>
              )}
              <Cart />
              <ThemeSwitcher />
            </section>
            <MobileNav />
          </header>
          <main className="flex w-full flex-1 flex-col justify-start py-24">
            <Transition>{children}</Transition>
          </main>
          <FitText className="fixed top-3/4 -z-10 scale-y-75 font-blacklisted tracking-widest opacity-20">
            Slayley.com
          </FitText>
          <footer>
            <div className="flex flex-col items-center justify-center gap-4 p-8">
              <p className="flex items-center gap-2 text-center">
                <Icon icon="mdi:copyright" className="size-4" />{" "}
                <span className="text-xs">
                  {new Date().getFullYear()} Slayley.com
                </span>
              </p>
            </div>
          </footer>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
