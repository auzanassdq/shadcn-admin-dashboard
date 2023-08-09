import {getAllUser} from "../_actions/user";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { User } from "@/db/schema"


export default async function User() {
  const users = await getAllUser()

  console.log(users);
  console.log(User);

  return (
    <div className="flex flex-grow flex-col col-span-3 gap-8 p-6">
      <h1 className="font-bold text-3xl">User</h1>
      <div className="w-full">
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  )
}