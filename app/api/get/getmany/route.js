import { NextResponse } from "next/server";
import prisma from "@/util/prismaClient";

export async function GET(req) {

  try {
    const getUser = await prisma.user.findMany();
    return NextResponse.json(getUser);
  } catch {
    return NextResponse.status(500).json({ message: "internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
