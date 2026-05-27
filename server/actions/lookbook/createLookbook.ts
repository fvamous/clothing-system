"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/infra/prisma/client";

export async function createLookbookAction(
  data: any
) {
  await prisma.lookbook.create({
    data,
  });

  revalidatePath("/");

  revalidatePath("/admin/lookbook");
}