"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ChevronRight,
  ChevronLeft,
  Home,
  LayoutGrid,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState } from "react";

const menuSidebar = [
  { title: "Dashboard", path: "/", logo: Home },
  { title: "Report", path: "/report", logo: LayoutGrid },
  { title: "User", path: "/user", logo: Users },
];

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={cn(
        `pb-12 border-r-2 h-screen duration-500 ${isOpen ? "w-80" : "w-[74px]"}`,
        className
      )}
    >
      <div className="space-y-4 py-4 relative">
        <div className="px-3 py-2">

          {/*  */}
          <div className="flex justify-between items-center mb-3 pb-3">
            <h2
              className={`px-4 text-2xl font-semibold tracking-tight duration-500 ${
                isOpen ? "opacity-100" : "opacity-0"
              } transition-opacity`}
            >
              Panel
            </h2>

            <Button
              onClick={() => setIsOpen((prevState) => !prevState)}
              className={`absolute right-3 ${isOpen ? "rotate-180" : ""}`}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <hr />

          <div className="mt-3 space-y-1">
            {menuSidebar.map((menu, idx) => (
              <Button
                key={idx}
                variant="ghost"
                className= {`flex justify-start w-full relative`}
                onClick={() => router.push(menu.path)}
              >
                <menu.logo className="h-4 w-4" />
                <span
                  className={`absolute left-10 duration-500 ${
                    isOpen ? "" : " opacity-0"
                  }`}
                >
                  {menu.title}
                </span>
              </Button>
              
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
