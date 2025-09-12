"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggleButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));

    const style = document.createElement("style");
    style.innerHTML = `
      .no-transitions * {
        transition: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const toggleTheme = () => {
    document.body.classList.add("no-transitions");

    const isDark = document.documentElement.classList.toggle("dark");
    setIsDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");

    setTimeout(() => {
      document.body.classList.remove("no-transitions");
    }, 100);
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {isDarkMode ? <Sun /> : <Moon />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
