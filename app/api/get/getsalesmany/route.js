import { NextResponse } from "next/server";
import prisma from "@/util/prismaClient";

export async function GET(req) {
  try {
    const getsales = await prisma.vente.findMany({
      include: {
        product: {
          select: {
            title: true,
          },
        },
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    const salesWithDetails = getsales.map((sale) => ({
      id: sale.id,
      price: sale.price,
      productTitle: sale.product.title,
      username: sale.user.username,
    }));

    return NextResponse.json(salesWithDetails);
  } catch (error) {
    NextResponse.json({ message: "internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
