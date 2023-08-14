import { Suspense } from "react";
import { getAllUser, queryParamsSchema } from "../_actions/user";
import { seedUser } from "../_seeder/user";
import { columns } from "./columns";
import { DataTable } from "./data-table";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const User = async ({ searchParams }: Props) => {
  const query = {
    column: searchParams.column,
    order: searchParams.order,
    limit: Number(searchParams.limit) || 0,
    search: searchParams.search,
  };

  const validatedQuery = queryParamsSchema.parse(query);

  const result = await getAllUser(validatedQuery);
  console.log(result);

  // Generate 100 data user
  // await seedUser()

  return (
    <div className="flex flex-grow flex-col col-span-3 gap-8 p-6">
      <h1 className="font-bold text-3xl">User</h1>
      <div className="w-full">
        <Suspense fallback={<h1>Loading...</h1>}>
          <DataTable
            columns={columns}
            data={result.data}
            totalData={result.totalData}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default User;
