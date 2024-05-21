"use client";

import Link from "next/link";
import { SearchInput } from "../search/input";
import { cn } from "@/lib/utils";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { Icon } from "../ui/icon";
import { useSetAtom } from "jotai";
import { mobileNavAtom } from "@/lib/atoms";

const NavLink = ({
  href,
  className = "",
  icon,
  children,
  ...props
}: {
  href: string;
  className?: string;
  icon?: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const segment = useSelectedLayoutSegment();

  const isActive =
    pathname === href ? pathname.includes(href) : href.includes(segment!);

  const isOpen = useSetAtom(mobileNavAtom);
  const activeClasses =
    "bg-gray-900 text-white hover:bg-gray-700 dark:bg-slate-50 dark:text-slate-900";
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-3 py-2 font-sans uppercase",
        isActive ? activeClasses : null,
        className,
      )}
      onClick={() => isOpen(false)}
      {...props}
    >
      {icon && <Icon icon={icon} className="mr-2" />}
      {children}
    </Link>
  );
};

export const Navbar = () => {
  return (
    <nav role="navigation-menu" className="flex gap-4">
      <section role="search" className="hidden lg:flex">
        <SearchInput />
      </section>
      <ul
        aria-description="desktop navigation menu"
        className="hidden items-center gap-4 lg:flex"
      >
        <NavLinks />
      </ul>
    </nav>
  );
};

export const NavLinks = () => {
  const isOpen = useSetAtom(mobileNavAtom);
  return (
    <>
      <li>
        <NavLink href="/art" icon="ph:image">
          Art
        </NavLink>
      </li>
      <li>
        <NavLink href="/products" icon="ph:shopping-bag">
          Products
        </NavLink>
      </li>
      <li>
        <NavLink href="/about" icon="ph:info">
          About
        </NavLink>
      </li>
      <li>
        <NavLink href="/contact" icon="ph:envelope">
          Contact
        </NavLink>
      </li>
    </>
  );
};
