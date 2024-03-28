import { NextRequest, NextResponse } from "next/server";
import prisma from "@/util/prismaClient";

export async function GET(NextRequest, { params }) {
  try {
    const id = params.id;
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        deleted: false,
      },
    });
    return NextResponse.json({ message: "User Restaured" });
  } catch (error) {
    return NextResponse.json({ message: "internal server error" });
  }
}
