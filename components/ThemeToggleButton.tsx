"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggleButton() {
  const { setTheme  } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      >
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-light-800  text-primary-500 dark:bg-dark-400
"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 " />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-0 bg-light-850 shadow-lg  dark:bg-dark-300"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer rounded-lg p-2 hover:bg-light-800  hover:dark:bg-dark-200"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer rounded-lg p-2 hover:bg-light-800  hover:dark:bg-dark-200"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer rounded-lg p-2 hover:bg-light-800  hover:dark:bg-dark-200"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
