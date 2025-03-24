import { prisma } from "@/lib/prisma";
import type { Records } from "./types/sharedTypes";

// Функція для отримання записів для конкретного користувача
export async function getRecords(userId: string): Promise<Records[]> {
  return await prisma.record.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { user: true }, // якщо потрібно, щоб дані користувача теж були
  });
}
