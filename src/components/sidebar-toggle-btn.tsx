"use client";

import { LuChevronRight } from "react-icons/lu";

import useSidebar from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

const SidebarToggleBtn = () => {
  const { isOpen, toggle } = useSidebar();

  return (
    <Button
      onClick={() => toggle()}
      className={cn("absolute right-3", isOpen && "rotate-180")}
    >
      <LuChevronRight className="h-4 w-4" />
    </Button>
  );
};

export default SidebarToggleBtn;
