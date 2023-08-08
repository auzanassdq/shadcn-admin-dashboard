import { columns } from "./columns";
import { DataTable } from "./data-table";

const Movie = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = searchParams['page'] ?? 1
  // const per_page = searchParams['per_page'] ?? 5

  const data = await fetch(
    `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}&api_key=${process.env.TMDB_API_KEY}`,
    { cache: "no-store" }
  ).then((res) => res.json());

  return (
    <div className="flex flex-grow flex-col col-span-3 gap-8 p-6">
      <h1 className="font-bold text-3xl">Movies</h1>
      <div className="w-full">
        <DataTable columns={columns} data={data.results} />
      </div>
    </div>
  );
};

export default Movie;
