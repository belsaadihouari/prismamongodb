import { NextResponse } from "next/server";
import prisma from "@/util/prismaClient";

export async function POST(req) {
  try {
    const request = await req.json();
    const addProduct = await prisma.product.create({
      data: {
        title: request.title,
        description: request.description,
        createdBy: request.createdBy,
      },
    });

    return NextResponse.json(addProduct);
  } catch {
    return NextResponse.json({ message: "internal server error" });
  }
}
