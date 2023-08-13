"use client";

import { User } from "@/db/schema";
import { cn, showDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { table } from "console";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useCallback } from "react";
import { LuChevronsUpDown, LuChevronDown, LuChevronUp } from "react-icons/lu";

interface ColHeaderInterface {
  column: any;
  title: string;
}

const ColHeader: React.FC<ColHeaderInterface> = ({ column, title }) => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  // const urlParams = new URLSearchParams(window.location.search);
  // const myParam = urlParams.get('myParam');

  const orderColumn = async () => {
    await column.toggleSorting(column.getIsSorted() === "asc");
    changeQueryParam();
  };

  const changeQueryParam = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    current.set("column", title.toLocaleLowerCase());
    if (column.getIsSorted()) {
      current.set("order", column.getIsSorted());
    } else {
      current.set("order", "");
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  return (
    <div onClick={orderColumn} className={cn("flex cursor-pointer")}>
      {title}
      {column.getIsSorted() === "asc" ? (
        <LuChevronUp className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === "desc" ? (
        <LuChevronDown className="ml-2 h-4 w-4" />
      ) : (
        <LuChevronsUpDown className="ml-2 h-4 w-4" />
      )}
    </div>
  );
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <ColHeader column={column} title="Id" />;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <ColHeader column={column} title="Name" />;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <ColHeader column={column} title="Email" />;
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return <ColHeader column={column} title="Username" />;
    },
  },
  {
    accessorKey: "city",
    header: ({ column }) => {
      return <ColHeader column={column} title="City" />;
    },
  },
  {
    accessorKey: "birth",
    header: ({ column }) => {
      return <ColHeader column={column} title="Birth" />;
    },
    cell: ({ row }) => <div>{showDate(row.getValue("birth"))}</div>,
  },
];
