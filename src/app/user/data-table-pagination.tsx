import {
  useParams,
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = searchParams.get("page") ?? 1;
  const nextPage = Number(page) + 1;
  const prevPage = Number(page) - 1;

  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      {/* SHOW COUNT OF SELECTED DATA */}
      <div className="flex text-sm text-muted-foreground">
        {/* {table.getFilteredSelectedRowModel().rows.length} of{" "} */}
        {table.getFilteredRowModel().rows.length} row(s).
      </div>

      <div className="flex items-center justify-between space-x-6">
        {/* LIMIT ROW */}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* BACK NEXT PAGE */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      {/* <Button
        variant="outline"
        size="sm"
        onClick={() => router.push(`${pathname}?page=${prevPage}`)}
        disabled={page == 1}

        // onClick={() => table.previousPage()}
        // disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push(`${pathname}?page=${nextPage}`)}

        // onClick={() => table.nextPage()}
        // disabled={!table.getCanNextPage()}
      >
        Next
      </Button> */}
    </div>
  );
}

export default DataTablePagination;
