import { Storeitem } from "@prisma/client";
import { prisma } from "@prisma/db";

export type StoreitemBasicDetails = Pick<
  Storeitem,
  "id" | "title" | "author" | "price" | "publisher" | "imgURL" | "avargeRate"
>;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const storeitemIds = searchParams.getAll("id").filter((v) => v); // filters empty id values

  const storeitems: Storeitem[] | StoreitemBasicDetails[] = await prisma.storeitem.findMany({
    where: {
      id: {
        in: storeitemIds,
      },
    },
    select:
      searchParams.get("basic") === "true"
        ? {
            id: true,
            title: true,
            author: true,
            price: true,
            publisher: true,
            imgURL: true,
            avargeRate: true,
          }
        : undefined,
  });

  return new Response(JSON.stringify(storeitems));
}
