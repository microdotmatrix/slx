"use client";

import { motion } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";

export const Transition = ({ children }: { children: React.ReactNode }) => {
  const segment = useSelectedLayoutSegment();

  return (
    <motion.div
      key={segment}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.2 }}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
};
