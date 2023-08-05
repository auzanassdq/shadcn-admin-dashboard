"use client";

import useSidebar from "@/app/hooks/useSidebar";
import { Button } from "./ui/button";
import { LuChevronRight } from "react-icons/lu";
import { cn } from "@/lib/utils";

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
