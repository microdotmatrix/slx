"use client";

import { Icon as Iconify, type IconProps } from "@iconify/react";

export const Icon = ({ icon, ...props }: IconProps) => {
  return <Iconify icon={icon} {...props} />;
};
