"use client";

import { LuHome, LuLayoutGrid, LuUsers } from "react-icons/lu";

import { cn } from "@/lib/utils";
import useSidebar from "@/hooks/useSidebar";

import SidebarItem from "./sidebar-item";
import SidebarToggleBtn from "./sidebar-toggle-btn";

const sidebarNavItem = [
  { title: "Dashboard", href: "/", icon: LuHome },
  { title: "Report", href: "/report", icon: LuLayoutGrid },
  { title: "User", href: "/user", icon: LuUsers },
];

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen } = useSidebar();

  return (
    <nav
      className={cn(
        `pb-12 border-r-2 h-screen duration-500`,
        isOpen ? "w-80" : "w-[74px]",
        className
      )}
    >
      <div className="space-y-4 py-4 relative">
        <div className="px-3 py-2">
          {/* TITLE SIDEBAR */}
          <div className="flex justify-between items-center mb-3 pb-3">
            <h2
              className={cn(
                "px-4 text-2xl font-semibold tracking-tight duration-500",
                !isOpen && "opacity-0"
              )}
            >
              Panel
            </h2>

            <SidebarToggleBtn />
          </div>

          <hr />

          {/* MENU SIDEBAR */}
          <div className="mt-3 space-y-1">
            {sidebarNavItem.map((item) => (
              <SidebarItem
                key={item.href}
                title={item.title}
                href={item.href}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
