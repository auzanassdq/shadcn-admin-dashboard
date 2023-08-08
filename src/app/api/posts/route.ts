import { NextResponse } from "next/server"
import getAllPosts from "@/lib/getAllPost"

export async function GET(request: Request) {
    const quotes = await getAllPosts()

    return NextResponse.json(quotes)
}