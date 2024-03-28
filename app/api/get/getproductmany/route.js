import { NextResponse } from "next/server";

import prisma from "@/util/prismaClient";

export async function GET(req) {
  try {
    const getProduct = await prisma.product.findMany({
      include: {
        user: {
          select: {
            id:true,
            username: true,
            deleted:true
          },
        },
      },
    });
    return NextResponse.json(getProduct);
  } catch (error) {
    return NextResponse.json({ error: "internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
