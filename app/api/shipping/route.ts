import { prisma } from "@prisma/db";

export async function GET() {
  const shippingOption = await prisma.shippingOption.findMany();

  console.log(shippingOption);

  return new Response(JSON.stringify(shippingOption));
}
