import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = params;
  const record = await prisma.record.findUnique({ where: { id } });
  if (!record || record.userId !== session.user.id) {
    return NextResponse.json(
      { error: "Record not found or unauthorized" },
      { status: 404 }
    );
  }
  return NextResponse.json(record);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = params;
  const body = await request.json();
  const record = await prisma.record.findUnique({ where: { id } });
  if (!record || record.userId !== session.user.id) {
    return NextResponse.json(
      { error: "Record not found or unauthorized" },
      { status: 404 }
    );
  }

  const updatedRecord = await prisma.record.update({
    where: { id },
    data: body, // body має містити поля для оновлення
  });

  return NextResponse.json(updatedRecord);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = params;
  const record = await prisma.record.findUnique({ where: { id } });
  if (!record || record.userId !== session.user.id) {
    return NextResponse.json(
      { error: "Record not found or unauthorized" },
      { status: 404 }
    );
  }

  await prisma.record.delete({ where: { id } });
  return NextResponse.json({ message: "Record deleted" });
}
