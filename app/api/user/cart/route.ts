import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { StoreitemInCart } from "@prisma/client";
import { prisma } from "@prisma/db";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: "User is not logged in." }), { status: 400 });
  }

  const user = await prisma.user.findFirst({
    where: { id: session.user.id },
    include: { Cart: true },
  });
  if (!user) {
    return new Response(JSON.stringify({ message: "Could not find user data." }), { status: 400 });
  }

  return new Response(JSON.stringify(user.Cart));
}

export type PATCH_BODY = StoreitemInCart[];

export async function PATCH(request: Request) {
  console.log("------- patch");

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: "User is not logged in." }), { status: 400 });
  }

  try {
    const currentItemsInCart: PATCH_BODY = await request.json();
    // const lastSavedItemsInCart = await prisma.storeitemInCart.findMany({
    //   where: { userId: session.user.id },
    // });

    console.log("------- patch");
    console.log(currentItemsInCart);

    console.log(
      await prisma.storeitemInCart.findMany({
        where: { userId: session.user.id },
      })
    );

    // TODO fix updating Cart in database

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        Cart: {
          deleteMany: {},
        },
      },
    });

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        Cart: {
          create: currentItemsInCart.map((item) => ({
            quantity: item.quantity,
            Storeitem: { connect: { id: item.storeitemId } },
          })),
        },
      },
    });

    console.log(
      await prisma.storeitemInCart.findMany({
        where: { userId: session.user.id },
      })
    );

    return new Response("{}", { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ message: "Received data is not complete. Some part of it may have been lost." }),
      { status: 400 }
    );
  }
}
