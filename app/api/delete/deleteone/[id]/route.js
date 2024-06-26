import { NextRequest, NextResponse } from "next/server";
import prisma from "@/util/prismaClient";
export async function GET(NextRequest, { params }) {
  const Userid = params.id;
  try {
    await prisma.user.update({
      where: {
        id: Userid,
      },
      data: {
        deleted: true,
      },
    });
    return NextResponse.json({ message: "user deleted successfuly" });
  } catch (error) {
    return NextResponse.json({ message: "iternal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
