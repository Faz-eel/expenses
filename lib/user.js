import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getOrCreateUser() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Not signed in");
  }

  return prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: { id: userId },
  });
}
