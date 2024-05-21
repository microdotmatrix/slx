"use client";

import { useTheme } from "next-themes";
import { Icon } from "@/components/ui/icon";
import clsx from "clsx";

export const useDarkMode = () => {
  const { theme, setTheme } = useTheme();

  const toggleDarkMode = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return { theme, toggleDarkMode };
};

export const ThemeSwitcher = () => {
  const { theme, toggleDarkMode } = useDarkMode();

  return (
    <button
      className="flex items-center justify-center rounded-full p-1"
      onClick={toggleDarkMode}
    >
      <Icon
        key={theme}
        icon={
          theme === "dark"
            ? "line-md:moon-rising-twotone-loop"
            : "line-md:sun-rising-twotone-loop"
        }
        className={clsx(
          "size-8",
          theme === "dark" ? "text-gray-400" : "text-gray-600",
        )}
      />
    </button>
  );
};
