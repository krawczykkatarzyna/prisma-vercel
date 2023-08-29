import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  /* Return all memes filtered by title and ordered by create_at */
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title");

  if (!title)
  return NextResponse.json(
    { message: "Missing title" },
    { status: 400 }
  );

  const memes = await prisma.memes.findMany({
    where: { title: { contains: title || "" } },
    orderBy: { created_at: "desc" },
  });

  return NextResponse.json([memes]);
}

export async function POST(request: Request) {
  /* Add new meme into db. Return newly created meme with 201 http status */

  try {
    const { title, url } = await request.json();

    const meme = await prisma.memes.create({ data: { title, image_url: url } });

    if (!title || !url)
    return NextResponse.json(
      { message: "Missing title or url" },
      { status: 400 }
    );

    return NextResponse.json(meme, { status: 201 });
  } catch (error) {
    console.error(error)
  }
}
