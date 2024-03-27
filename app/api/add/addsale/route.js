import { NextResponse } from "next/server";
import prisma from "@/util/prismaClient";

export async function POST(req) {
  const request = await req.json();
  try {
    const addsale = await prisma.vente.create({
      data: {
        price: request.price,
        productIs: request.productIs,
        selBy: request.selBy,
      },
    });

    return NextResponse.json(addsale);
  } catch (error) {
    return NextResponse.json({ message: "internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
