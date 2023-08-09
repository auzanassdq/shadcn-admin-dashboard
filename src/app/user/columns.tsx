"use client";

import { User } from "@/db/schema";
import { showDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "birth",
    header: "Birth",
    cell: ({ row }) => <div>{showDate(row.getValue("birth"))}</div>,
  },
];
