import { MainNav } from "@/components/main-nav";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import getAllPosts from "@/lib/getAllPost";
import Image from "next/image";
import { QueryClient } from "react-query";

// const queryClient = new QueryClient()

export default async function Home() {
  const posts = await getAllPosts()

  console.log(posts);

  return (
    <div className="flex flex-grow col-span-3 p-6">
      <div>
        Dashboard
      </div>
    </div>
  );
}
