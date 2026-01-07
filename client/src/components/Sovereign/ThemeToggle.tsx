/**
 * ThemeToggle - Dark/Light Mode Switch
 */

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/themeContext";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-[var(--color-acid)]" />
      ) : (
        <Moon className="h-5 w-5 text-[var(--color-acid)]" />
      )}
    </motion.button>
  );
}
