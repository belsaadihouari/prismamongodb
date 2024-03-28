import {  NextResponse } from "next/server";
import prisma from "@/util/prismaClient";
import crypto from "@/util/cryptDecrypt";
import { validation } from "@/util/validationSchemaZod";
export async function POST(req) {
  try {
    const reqeust = await req.json();

    const verification = validation.safeParse(reqeust);
    if (!verification.success) {
      return NextResponse.json({ validator: verification.error });
    }

    const verify = await prisma.user.findMany({
      where: { email: reqeust.email },
    });
    console.log(verify);
    if (verify && verify.length > 0) {
      return NextResponse.json({ message: "Email already exist" });
    }
    const hachPassword = await crypto(reqeust.password);
    const newUser = await prisma.user.create({
      data: {
        username: reqeust.username,
        email: reqeust.email,
        password: hachPassword,
        isAdmin: reqeust.isAdmin,
      },
    });
    return NextResponse.json({ newUser });
  } catch (error) {
    return NextResponse.json({ error: "internal server error" });
  }
}
