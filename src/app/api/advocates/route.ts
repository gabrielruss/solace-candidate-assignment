import db from "../../../db";
import { getPaginatedAdvocates } from "@/db/advocates";
import { DEFAULT_ADVOCATES_PAGE_SIZE } from "@/db/constants";

export async function GET(req: Request) {
  if (!db) return new Response("Database ain't workin'", { status: 500 });

  const url = new URL(req.url);

  const cursor = url.searchParams.get("cursor");
  // TODO: would be good to eventually allow the user to specify page size
  const pageSize = DEFAULT_ADVOCATES_PAGE_SIZE;

  const parsedCursor = cursor ? parseInt(cursor) : undefined;

  try {
    const { data, nextCursor } = await getPaginatedAdvocates(
      db,
      pageSize,
      parsedCursor
    );

    return Response.json({
      data,
      nextCursor,
    });
  } catch (error: any) {
    return Response.json(
      { error: `Uh oh - ${error.message}` },
      { status: 500 }
    );
  }
}
