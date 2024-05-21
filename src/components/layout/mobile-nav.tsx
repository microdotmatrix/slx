"use client";

import { useEffect } from "react";
import { useAnimate, stagger } from "framer-motion";
import { Button } from "../ui/button";
import { NavLinks } from "./nav";
import { useAtom, useAtomValue } from "jotai";
import { mobileNavAtom } from "@/lib/atoms";

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const menuAnimations = isOpen
      ? [
          [
            "nav",
            { transform: "translateY(0%)" },
            { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.6 },
          ],
          [
            "li",
            { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
            { delay: stagger(0.05), at: "-0.1" },
          ],
        ]
      : [
          [
            "li",
            { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
            { delay: stagger(0.05, { from: "last" }), at: "<" },
          ],
          ["nav", { transform: "translateY(-100%)" }, { at: "-0.1" }],
        ];

    animate([
      [
        "path.top",
        { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
        { at: "<" },
      ],
      ["path.middle", { opacity: isOpen ? 0 : 1 }, { at: "<" }],
      [
        "path.bottom",
        { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
        { at: "<" },
      ],
      ...menuAnimations,
    ]);
  }, [isOpen]);

  return scope;
}

const Path = ({ ...props }) => (
  <path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(var(--foreground))"
    strokeLinecap="round"
    {...props}
  />
);

export const MobileNavButton = () => {
  const [isOpen, setIsOpen] = useAtom(mobileNavAtom);
  const scope = useMenuAnimation(isOpen);

  return (
    <Button
      size="icon"
      variant="outline"
      className="z-50"
      onClick={() => setIsOpen(!isOpen)}
    >
      <svg width="23" height="18" viewBox="0 0 23 18" ref={scope}>
        <Path
          d="M 2 2.5 L 20 2.5"
          className="top"
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path d="M 2 9.423 L 20 9.423" opacity="1" className="middle" />
        <Path
          d="M 2 16.346 L 20 16.346"
          className="bottom"
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </Button>
  );
};

export const MobileNav = () => {
  const isOpen = useAtomValue(mobileNavAtom);
  const scope = useMenuAnimation(isOpen);

  return (
    <div
      className="fixed left-0 top-0 z-40 flex h-fit w-full lg:hidden"
      ref={scope}
    >
      <nav className="w-full -translate-x-full transform  bg-background/90 py-24 shadow-lg backdrop-blur-md">
        <ul className="flex flex-col items-center justify-center space-y-4">
          <NavLinks />
        </ul>
      </nav>
    </div>
  );
};
