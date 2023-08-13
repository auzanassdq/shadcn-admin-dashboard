import { Suspense } from "react";
import { getAllUser } from "../_actions/user";
import { seedUser } from "../_seeder/user";
import { columns } from "./columns";
import { DataTable } from "./data-table";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};


const User = async ({searchParams}: Props) => {
  const query = {
    column: searchParams.column,
    order: searchParams.order,
    limit: searchParams.limit
  }

  console.log(searchParams);
  const result = await getAllUser(query);

  // Generate 100 data user
  // await seedUser()

  return (
    <div className="flex flex-grow flex-col col-span-3 gap-8 p-6">
      <h1 className="font-bold text-3xl">User</h1>
      <div className="w-full">
        <Suspense fallback={<h1>Loading...</h1>}>

         <DataTable columns={columns} data={result.data} />
        </Suspense>
      </div>
    </div>
  );
};

export default User;
