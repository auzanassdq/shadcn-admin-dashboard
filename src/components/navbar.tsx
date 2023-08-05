import Link from "next/link";

import { cn } from "@/lib/utils";
import { MainNav } from "./main-nav";

export function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {/* <TeamSwitcher /> */}
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          {/* <Search />
        <UserNav /> */}
        </div>
      </div>
    </div>
  );
}
