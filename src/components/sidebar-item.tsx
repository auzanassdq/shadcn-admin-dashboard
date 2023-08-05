"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

import { cn } from "@/lib/utils";
import useSidebar from "@/hooks/useSidebar";

import { buttonVariants } from "./ui/button";

interface SidebarItemInterface {
  title: string;
  href: string;
  icon: IconType;
}

const SidebarItem: React.FC<SidebarItemInterface> = ({
  title,
  href,
  icon: Icon,
}) => {
  const { isOpen } = useSidebar();
  const pathname = usePathname();

  console.log("tess");

  return (
    <Link
      key={href}
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "flex justify-start w-full relative",
        pathname === href && "bg-muted hover:bg-muted"
      )}
    >
      <Icon className="h-4 w-4" />
      <span
        className={cn("absolute left-10 duration-200", !isOpen && "opacity-0")}
      >
        {title}
      </span>
    </Link>
  );
};

export default SidebarItem;
