import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useParams, useRouter, useSearchParams, usePathname } from "next/navigation";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const page = searchParams.get('page') ?? 1
  const nextPage = Number(page)+1
  const prevPage = Number(page)-1

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
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
      </Button>
    </div>
  );
}

export default DataTablePagination;
