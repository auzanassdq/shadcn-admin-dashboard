"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { LuEye, LuFilter, LuHourglass, LuSearch } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DataTablePagination from "./data-table-pagination";
import FormUser from "./form-user";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalData: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalData,
}: DataTableProps<TData, TValue>) {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filterColumn, setFilterColumn] = useState("email");

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const setSearchQueryParam = useCallback(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("search", searchInput);

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  }, [searchInput]);

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (!current.get("search") && searchInput.length === 0) return;

    setTimeout(() => {
      setSearchQueryParam();
    }, 1000);
  }, [searchInput]);

  const filterColumnChange = (value: string) => {
    setFilterColumn(value)
    
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("search-column", value);

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  }

  return (
    <div>
      <div className="flex justify-start item-center py-4">
        {/* VISIBILITY */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <LuEye className="mr-2 h-4 w-4" /> View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* FILTERS */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="capitalize">
              <LuSearch className="mr-2 h-4 w-4" /> {filterColumn}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup
              value={filterColumn}
              onValueChange={(value) => filterColumnChange(value)}
            >
              {table.getAllColumns().map((column) => {
                return (
                  <DropdownMenuRadioItem
                    key={column.id}
                    className="capitalize"
                    value={column.id}
                  >
                    {column.id}
                  </DropdownMenuRadioItem>
                );
              })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="relative">
          <Input
            placeholder={`Filter ${filterColumn}...`}
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            className="w-[350px]"
          />
          {searchInput && (
            <Button
              size={"icon"}
              onClick={() => setSearchInput("")}
              className="absolute top-2 right-2 w-6 h-6"
            >
              x
            </Button>
          )}
        </div>

        {/* FORM DIALOG */}
        <Dialog open={open} onOpenChange={setOpen} defaultOpen={false}>
          <DialogTrigger asChild className="ml-auto">
            <Button>Add User</Button>
          </DialogTrigger>
          <FormUser setOpen={setOpen} />
        </Dialog>
      </div>

      {/* TABLE */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      <DataTablePagination table={table} totalData={totalData} />
    </div>
  );
}
