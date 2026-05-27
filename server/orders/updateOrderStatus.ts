"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/infra/prisma/client";

export async function updateOrderStatusAction(
  id: string,
  status: string
) {
  await prisma.order.update({
    where: {
      id,
    },

    data: {
      status: status as any,
    },
  });

  revalidatePath("/admin/orders");
}