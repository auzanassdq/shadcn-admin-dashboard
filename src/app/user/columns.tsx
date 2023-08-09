"use client";

import { User } from "@/db/schema";
import { cn, showDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { LuChevronsUpDown, LuChevronDown, LuChevronUp } from "react-icons/lu";

interface ColHeaderInterface {
  column: any
  title: string
}

const ColHeader: React.FC<ColHeaderInterface> = ({column, title}) => {
  return (
    <div
      onClick={() => column.toggleSorting()}
      className={cn("flex cursor-pointer")}
    >
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
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <ColHeader column={column} title="Id"/>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <ColHeader column={column} title="Name"/>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <ColHeader column={column} title="Email"/>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <ColHeader column={column} title="Username"/>
      );
    },
  },
  {
    accessorKey: "city",
    header: ({ column }) => {
      return (
        <ColHeader column={column} title="City"/>
      );
    },
  },
  {
    accessorKey: "birth",
    header: ({ column }) => {
      return (
        <ColHeader column={column} title="Birth"/>
      );
    },
    cell: ({ row }) => <div>{showDate(row.getValue("birth"))}</div>,
  },
];
