"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Movie = {
  id: string
  title: string
  release: string
  rating: number
  // release: string
}

export const columns: ColumnDef<Movie>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "release_date",
    header: "Release",
  },
  {
    accessorKey: "vote_average",
    header: "Rating",
  },
]