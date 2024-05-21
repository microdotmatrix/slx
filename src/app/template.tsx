"use client";

import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && <AnimatePresence>{children}</AnimatePresence>;
}
