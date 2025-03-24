import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const records = await prisma.record.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(records);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { electricityKwh, gasM3, priceElectricity, priceGas } = body;

  const record = await prisma.record.create({
    data: {
      userId: session.user.id,
      electricityKwh,
      gasM3,
      priceElectricity,
      priceGas,
    },
  });

  return NextResponse.json(record);
}
