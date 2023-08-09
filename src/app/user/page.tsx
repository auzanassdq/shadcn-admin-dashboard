import {getAllUser} from "../_actions/user";
import { seedUser } from "../_seeder/user";
import { columns } from "./columns";
import { DataTable } from "./data-table";


const User = async () => {
  // const page = Number(searchParams['page'] ?? 1)
  // const limit = Number(searchParams['limit'] ?? 10)
  const result = await getAllUser()

  // Generate 100 data user
  // await seedUser()

  return (
    <div className="flex flex-grow flex-col col-span-3 gap-8 p-6">
      <h1 className="font-bold text-3xl">User</h1>
      <div className="w-full">
        <DataTable columns={columns} data={result.data} />
      </div>
    </div>
  )
}

export default User